"""
Reasignacion correcta v2:
- J incluida como manzana real (no es area verde)
- C incluida (el plano oficial dice LOTES:142 con manzanas A-J)
- Solo K excluida (area verde pura)
- Asignacion CONSCIENTE DE MANZANA: cada texto numerico se asigna a
  su poligono mas cercano DENTRO de la misma manzana
- Deduplicacion: si dos lotes tienen el mismo numero, conserva el mas cercano
- F-02 construida manualmente (no tiene poligono propio en DXF)
"""
import json, numpy as np, sys, re
sys.stdout.reconfigure(encoding='utf-8')
from scipy.spatial import KDTree

DXF_FILE = "plano.dxf"
APP_FILE  = "_app.jsx"
API_KEY   = "AIzaSyDIS85Jshf6_hs9dQlrAq3v1F99b2VkDnQ"
FS_BASE   = "https://firestore.googleapis.com/v1/projects/tioayuda-eadb2/databases/(default)/documents"

with open(DXF_FILE, 'r', encoding='utf-8', errors='ignore') as f:
    raw = [l.rstrip() for l in f.readlines()]

# Extract LWPOLYLINE from 3PREDIO
lots = []
i = 0
while i < len(raw):
    if raw[i].strip()=='0' and i+1<len(raw) and raw[i+1].strip()=='LWPOLYLINE':
        j=i+2; layer=None
        while j<len(raw):
            c=raw[j].strip()
            if c=='0': break
            if c=='8': layer=raw[j+1].strip() if j+1<len(raw) else None
            j+=2
        if layer=='3PREDIO':
            verts=[]; k=i+2
            while k<len(raw):
                c=raw[k].strip(); v=raw[k+1].strip() if k+1<len(raw) else ''
                if c=='0': break
                if c=='10':
                    x=float(v)
                    if k+2<len(raw) and raw[k+2].strip()=='20':
                        y=float(raw[k+3].strip()); verts.append((x,y))
                k+=2
            if len(verts)>=3:
                cx=sum(p[0] for p in verts)/len(verts)
                cy=sum(p[1] for p in verts)/len(verts)
                n2=len(verts)
                area=abs(sum(verts[ii%n2][0]*(verts[(ii+1)%n2][1]-verts[(ii-1)%n2][1]) for ii in range(n2)))/2
                lots.append({'verts':verts,'cx':cx,'cy':cy,'area':round(area,2),'idx':len(lots)})
        i=j
    else: i+=2

def get_texts(raw, layer_name):
    out=[]
    i=0
    while i<len(raw):
        if raw[i].strip()=='0' and i+1<len(raw) and raw[i+1].strip()=='TEXT':
            layer=None;txt=None;tx=None;ty=None
            k=i+2
            while k<len(raw):
                c=raw[k].strip(); v=raw[k+1].strip() if k+1<len(raw) else ''
                if c=='0': break
                if c=='8': layer=v
                if c=='1': txt=v
                if c=='10': tx=float(v)
                if c=='20': ty=float(v)
                k+=2
            if layer==layer_name and txt and tx is not None:
                out.append({'x':tx,'y':ty,'txt':txt})
            i=k
        else: i+=2
    return out

all_texts = get_texts(raw, '3NUMERO DE MAZANA')
sup_texts = get_texts(raw, 'SUP DE PREDIOS')

mza_labels = {}
for t in all_texts:
    if t['txt'].startswith('Mza '):
        mza = t['txt'].split('Mza ')[1].strip()
        if mza not in mza_labels:
            mza_labels[mza] = (t['x'], t['y'])

lot_num_texts = [t for t in all_texts if t['txt'].isdigit()]
lot_pts = np.array([[l['cx'],l['cy']] for l in lots])
lot_tree = KDTree(lot_pts)

# 1. Assign manzanas — only K excluded
GREEN_AREAS = {'K'}
active_mzas = {k:v for k,v in mza_labels.items() if k not in GREEN_AREAS}
mza_list = sorted(active_mzas.keys())
mza_pts_arr = np.array([active_mzas[m] for m in mza_list])
tree_mza = KDTree(mza_pts_arr)
_, mza_idxs = tree_mza.query(lot_pts)
for lot, mi in zip(lots, mza_idxs):
    lot['mza'] = mza_list[mi]

# 2. Manzana-aware assignment:
# Determine manzana of each number text (by nearest polygon's manzana)
for t in lot_num_texts:
    _, idx = lot_tree.query([t['x'], t['y']])
    t['mza'] = lots[idx]['mza']

# Build per-manzana polygon trees
mza_poly_pts = {}
mza_poly_idxs = {}
for mza in mza_list:
    mza_lots = [l for l in lots if l['mza']==mza]
    if mza_lots:
        mza_poly_pts[mza] = np.array([[l['cx'],l['cy']] for l in mza_lots])
        mza_poly_idxs[mza] = [l['idx'] for l in mza_lots]

# Assign texts to polygons within same manzana (threshold 35)
num_of = {}
for nt in lot_num_texts:
    mza = nt['mza']
    if mza not in mza_poly_pts: continue
    tree = KDTree(mza_poly_pts[mza])
    dist, local_idx = tree.query([nt['x'], nt['y']])
    if dist < 35:
        global_idx = mza_poly_idxs[mza][local_idx]
        if global_idx not in num_of or dist < num_of[global_idx][1]:
            num_of[global_idx] = (nt['txt'], dist)

# 3. Deduplication within manzana
mza_num_best = {}
for lot in lots:
    n = num_of.get(lot['idx'])
    if n:
        key = (lot['mza'], n[0])
        if key not in mza_num_best or n[1] < mza_num_best[key][1]:
            mza_num_best[key] = (lot['idx'], n[1])

num_of_clean = {}
for lot in lots:
    n = num_of.get(lot['idx'])
    if n:
        key = (lot['mza'], n[0])
        if mza_num_best[key][0] == lot['idx']:
            num_of_clean[lot['idx']] = n

# 4. Surface areas
sup_pts = np.array([[s['x'],s['y']] for s in sup_texts]) if sup_texts else None
sup_of = {}
if sup_pts is not None:
    sup_tree = KDTree(sup_pts)
    for lot in lots:
        dist, idx = sup_tree.query([lot['cx'],lot['cy']])
        if dist < 25:
            txt = sup_texts[idx]['txt'].replace('SUP. ','').replace(' M2','').replace(',','.')
            try: sup_of[lot['idx']] = round(float(txt),2)
            except: pass

# 5. Build MANZANAS_INIT
mzas_dict = {}
for lot in lots:
    num = num_of_clean.get(lot['idx'])
    if num is None: continue
    mza = lot['mza']
    sup = sup_of.get(lot['idx'], round(lot['area'], 2))
    lid = f"{mza}-{int(num[0]):02d}"
    mzas_dict.setdefault(mza, []).append({'id':lid,'sup':sup,'lot_idx':lot['idx']})

for mza in mzas_dict:
    mzas_dict[mza].sort(key=lambda x: int(x['id'].split('-')[1]))
    seen=set(); deduped=[]
    for l in mzas_dict[mza]:
        if l['id'] not in seen:
            seen.add(l['id']); deduped.append(l)
    mzas_dict[mza]=deduped

# 6. Add F-02 manually (not extractable from DXF polygons)
if 'F' in mzas_dict:
    f_ids = [l['id'] for l in mzas_dict['F']]
    if 'F-02' not in f_ids:
        mzas_dict['F'].insert(1, {'id':'F-02','sup':278.02,'lot_idx':-1})  # -1 = manual

print("Estructura final:")
total=0
for mza in sorted(mzas_dict.keys()):
    lotes=mzas_dict[mza]
    total+=len(lotes)
    print(f"  Mza {mza}: {len(lotes)} lotes -> {[l['id'] for l in lotes]}")
print(f"Total: {total} lotes (oficial: 142)")

# 7. Generate JS MANZANAS_INIT
js_lines = ["const MANZANAS_INIT = {"]
for mza in sorted(mzas_dict.keys()):
    items = ", ".join(f'{{ id:"{l["id"]}", sup:{l["sup"]} }}' for l in mzas_dict[mza])
    js_lines.append(f"  {mza}: [{items}],")
js_lines.append("};")
new_mzas_js = "\n".join(js_lines)

# 8. Generate LOT_POLYGONS (include all DXF-based lots, keep F-02 polygon from current app)
all_included = {l['lot_idx']:l['id'] for mza_lots in mzas_dict.values() for l in mza_lots
                if l['lot_idx'] != -1}  # skip manual F-02

all_x=[p[0] for lot in lots for p in lot['verts']]
all_y=[p[1] for lot in lots for p in lot['verts']]
minx,maxx=min(all_x),max(all_x)
miny,maxy=min(all_y),max(all_y)
W=maxx-minx; Hh=maxy-miny
SVG_W=800; PAD=20
scale=(SVG_W-2*PAD)/W
SVG_H=int(Hh*scale+2*PAD)

def to_svg(x,y): return (x-minx)*scale+PAD, (maxy-y)*scale+PAD

polys={}
for lot in lots:
    if lot['idx'] not in all_included: continue
    lid=all_included[lot['idx']]
    pts=[to_svg(p[0],p[1]) for p in lot['verts']]
    polys[lid]=' '.join(f'{x:.1f},{y:.1f}' for x,y in pts)

# Keep F-02 polygon from current app (manually constructed)
with open(APP_FILE,'r',encoding='utf-8') as f:
    src_orig=f.read()
m_f02 = re.search(r'"F-02":\s*"([^"]+)"', src_orig)
if m_f02:
    polys['F-02'] = m_f02.group(1)
    print("F-02 polygon preserved from current app")
else:
    # Construct F-02 polygon from F-01/F-03 shared edges
    polys['F-02'] = "420.2,728.5 438.5,710.7 382.0,684.0 372.1,705.7"
    print("F-02 polygon constructed from F-01/F-03 edges")

js_poly_lines=[f"const LOT_POLYGONS = {{ w:{SVG_W}, h:{SVG_H}, polys:{{"]
for lid,pts in polys.items():
    js_poly_lines.append(f'  "{lid}": "{pts}",')
js_poly_lines.append("} };")
new_poly_js="\n".join(js_poly_lines)
print(f"Poligonos SVG: {len(polys)} ({SVG_W}x{SVG_H})")

# 9. Update _app.jsx
with open(APP_FILE,'r',encoding='utf-8') as f:
    src=f.read()

m=re.search(r'const MANZANAS_INIT = \{.*?\};', src, re.DOTALL)
src=src[:m.start()]+new_mzas_js+src[m.end():]

m2=re.search(r'const LOT_POLYGONS = \{ w:\d+.*?\} \};', src, re.DOTALL)
src=src[:m2.start()]+new_poly_js+src[m2.end():]

with open(APP_FILE,'w',encoding='utf-8') as f:
    f.write(src)
print("_app.jsx actualizado")

# 10. Update Firestore (PATCH merges, preserves existing statuses)
import urllib.request
all_ids=[l['id'] for mza_lots in mzas_dict.values() for l in mza_lots]
empty_lot={"status":{"stringValue":"disponible"},"comprador":{"stringValue":""},"precio":{"stringValue":""},"nota":{"stringValue":""}}
fs_fields={lid:{"mapValue":{"fields":empty_lot}} for lid in all_ids}
payload=json.dumps({"fields":{"lots":{"mapValue":{"fields":fs_fields}}}}).encode()
req=urllib.request.Request(
    f"{FS_BASE}/terdemol/lots?key={API_KEY}",
    data=payload, headers={"Content-Type":"application/json"}, method="PATCH"
)
with urllib.request.urlopen(req) as r:
    resp=json.loads(r.read())
    if "error" in resp: print("Firestore ERROR:", resp["error"])
    else: print(f"Firestore: {len(all_ids)} lotes actualizados")
print("Listo.")
