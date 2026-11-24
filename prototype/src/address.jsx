// ที่อยู่จัดส่ง: pick one (#/address), add (#/address/new) or edit (#/address/edit/:i).
// Opened from the address row on ชำระเงิน. Saved addresses are mock data kept for this visit.

const ADDRS = [
  { name: 'ภูมิ ใจดี', phone: '0999999999', detail: '88/12 ซอยสุขุมวิท 50', prov: 'กรุงเทพมหานคร', dist: 'พระโขนง', sub: 'บางจาก', zip: '10260', label: 'บ้าน', def: true },
  { name: 'ภูมิ ใจดี', phone: '0999999999', detail: '555 อาคารเอสเอสพี ทาวเวอร์ สุขุมวิท 63 เอกมัย', prov: 'กรุงเทพมหานคร', dist: 'วัฒนา', sub: 'คลองตันเหนือ', zip: '10110', label: 'ที่ทำงาน' },
  { name: 'มาลี ใจดี', phone: '0812345678', detail: '45/3 หมู่ 2 ถนนเชียงใหม่-ลำปาง', prov: 'เชียงใหม่', dist: 'เมืองเชียงใหม่', sub: 'ป่าตัน', zip: '50300', label: 'อื่นๆ' },
];
window.ADDRS = ADDRS;
let ADDR_SEL = 0;
const ADDR_LABELS = [['บ้าน', 'house-line'], ['ที่ทำงาน', 'briefcase'], ['อื่นๆ', 'map-pin']];

/** Mock Thai areas: province → district → [sub-district, postcode]. Enough for the prototype's search and pickers. */
const GEO = {
  'กรุงเทพมหานคร': {
    'คลองเตย': [['คลองเตย', '10110'], ['คลองตัน', '10110'], ['พระโขนง', '10110']],
    'วัฒนา': [['คลองเตยเหนือ', '10110'], ['คลองตันเหนือ', '10110'], ['พระโขนงเหนือ', '10110']],
    'พระโขนง': [['บางจาก', '10260'], ['พระโขนงใต้', '10260']],
    'ห้วยขวาง': [['ห้วยขวาง', '10310'], ['บางกะปิ', '10310'], ['สามเสนนอก', '10310']],
    'บางรัก': [['สีลม', '10500'], ['สุริยวงศ์', '10500'], ['มหาพฤฒาราม', '10500']],
  },
  'นนทบุรี': {
    'เมืองนนทบุรี': [['บางกระสอ', '11000'], ['ตลาดขวัญ', '11000'], ['บางเขน', '11000']],
    'ปากเกร็ด': [['ปากเกร็ด', '11120'], ['บางตลาด', '11120'], ['คลองเกลือ', '11120']],
  },
  'ชลบุรี': {
    'เมืองชลบุรี': [['บางปลาสร้อย', '20000'], ['เสม็ด', '20000']],
    'บางละมุง': [['หนองปรือ', '20150'], ['นาเกลือ', '20150']],
  },
  'เชียงใหม่': {
    'เมืองเชียงใหม่': [['ป่าตัน', '50300'], ['ศรีภูมิ', '50200'], ['ช้างคลาน', '50100']],
    'สันทราย': [['สันทรายหลวง', '50210'], ['หนองหาร', '50290']],
  },
  'ขอนแก่น': {
    'เมืองขอนแก่น': [['ในเมือง', '40000'], ['ศิลา', '40000']],
  },
};
const isBkk = (prov) => prov === 'กรุงเทพมหานคร';
/** Every [prov, dist, sub] with this postcode. */
const geoByZip = (zip) => Object.entries(GEO).flatMap(([p, ds]) => Object.entries(ds).flatMap(([d, ss]) => ss.filter((x) => x[1] === zip).map((x) => [p, d, x[0]])));
/** Case ยังไม่มีที่อยู่: empty the list (kept aside), and put it back when the case is turned off. */
const ADDR_CASE = { empty: false, kept: [] };
function syncAddrCase(cases) {
  if (cases.noAddress && !ADDR_CASE.empty) { ADDR_CASE.kept = ADDRS.splice(0); ADDR_CASE.empty = true; ADDR_SEL = 0; }
  else if (!cases.noAddress && ADDR_CASE.empty) { ADDRS.splice(0, ADDRS.length, ...ADDR_CASE.kept); ADDR_CASE.empty = false; ADDR_SEL = 0; }
}
const addrPicked = () => (ADDRS[ADDR_SEL] ? { ...ADDRS[ADDR_SEL], phone: fmtPhone(ADDRS[ADDR_SEL].phone) } : null);
const addrLine = (a) => `${a.detail} ${isBkk(a.prov) ? 'แขวง' : 'ตำบล'}${a.sub} ${isBkk(a.prov) ? 'เขต' : 'อำเภอ'}${a.dist} ${a.prov} ${a.zip}`;

function AddrTag({ label }) {
  const ic = (ADDR_LABELS.find((l) => l[0] === label) || ADDR_LABELS[2])[1];
  return <span className="ad-tag"><Icon name={ic} size={14} />{label}</span>;
}

function AddressPage({ app }) {
  syncAddrCase(app.cases);
  const [sel, setSel] = useState(ADDR_SEL);
  const pick = (i) => {
    setSel(i);
    ADDR_SEL = i;
    setTimeout(() => app.back(), 180);
  };
  return (
    <>
      <header className="m-hd ct-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={24} /></button>
          <b className="ct-title">เลือกที่อยู่จัดส่ง</b>
          <span className="round-btn ghost" aria-hidden="true" />
        </div>
      </header>
      <div className="m-scroll ad-page">
        {!ADDRS.length && (
          <div className="ad-empty">
            <span className="ad-empty-ic"><Icon name="map-pin" size={36} /></span>
            <b>ยังไม่มีที่อยู่จัดส่ง</b>
            <p>เพิ่มที่อยู่ครั้งเดียว ใช้ได้ทุกคำสั่งซื้อ</p>
          </div>
        )}
        {ADDRS.length > 0 && <div className="ad-list" role="radiogroup" aria-label="ที่อยู่จัดส่ง">
          {ADDRS.map((a, i) => (
            <div key={i} className={`ad-card ${sel === i ? 'on' : ''}`}>
              <button className="ad-pick" role="radio" aria-checked={sel === i} onClick={() => pick(i)}>
                <span className="ad-mid">
                  <span className="ad-top"><AddrTag label={a.label} />{a.def && <span className="ad-def">ค่าเริ่มต้น</span>}{sel === i && <span className="ad-using"><Icon name="check-circle" fill size={16} />จัดส่งที่นี่</span>}</span>
                  <b>{a.name}<span> · {fmtPhone(a.phone)}</span></b>
                  <span className="ad-line">{addrLine(a)}</span>
                </span>
              </button>
              <button className="ad-edit" onClick={() => app.go('/address/edit/' + i)} aria-label={`แก้ไขที่อยู่ ${a.label}`}>แก้ไข</button>
            </div>
          ))}
        </div>}
        <button className="ad-add" onClick={() => app.go('/address/new')}><Icon name="plus" size={20} />เพิ่มที่อยู่ใหม่</button>
      </div>
    </>
  );
}

function AdField({ label, error, children }) {
  return (
    <label className={`ad-field ${error ? 'bad' : ''}`}>
      <span className="ad-field-lb">{label}</span>
      {children}
      {error && <small role="alert">{error}</small>}
    </label>
  );
}

/** ที่อยู่ · รหัสไปรษณีย์ (search fills the rest) · จังหวัด · เขต/อำเภอ · แขวง/ตำบล. Shared by the address form and the tax invoice page.
 *  f: { detail, zip, prov, dist, sub }, setF(fn | obj), show(key) → error text. */
/** Every area as [sub, dist, prov, zip], for the postcode search. */
const GEO_ALL = Object.entries(GEO).flatMap(([p, ds]) => Object.entries(ds).flatMap(([d, ss]) => ss.map(([n, z]) => [n, d, p, z])));

/** รหัสไปรษณีย์: bottom sheet search by postcode or area name; picking fills postcode, province, district and sub-district. */
function ZipSheet({ app, start, onPick, onClose }) {
  const [q, setQ] = useState(start || '');
  const ref = useRef(null);
  useEffect(() => { const id = setTimeout(() => ref.current?.focus(), 300); return () => clearTimeout(id); }, []);
  const t = toArabic(q).trim();
  const hits = !t ? [] : /^\d+$/.test(t) ? GEO_ALL.filter((x) => x[3].startsWith(t)) : GEO_ALL.filter((x) => x.slice(0, 3).some((v) => v.includes(t)));
  return (
    <Sheet app={app} onClose={onClose} title="รหัสไปรษณีย์">
      {(close) => (
        <div className="zp">
          <div className="zp-hd">
            <b>รหัสไปรษณีย์</b>
            <button className="gf-close zp-x" aria-label="ปิด" onClick={close}><Icon name="x" size={22} /></button>
          </div>
          <label className="zp-search">
            <Icon name="magnifying-glass" size={22} />
            <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} inputMode="search" placeholder="ค้นหารหัสไปรษณีย์ แขวง/ตำบล เขต/อำเภอ" aria-label="ค้นหารหัสไปรษณีย์" />
            {q && <button className="lg-clear" aria-label="ล้าง" onClick={(e) => { e.preventDefault(); setQ(''); ref.current?.focus(); }}><Icon name="x-circle" fill size={20} /></button>}
          </label>
          <div className="zp-list" role="listbox" aria-label="ผลการค้นหา">
            {hits.map(([n, d, p, z]) => (
              <button key={p + d + n} role="option" aria-selected="false" className="zp-item" onClick={() => { onPick({ sub: n, dist: d, prov: p, zip: z }); close(); }}>
                <b>{n} &gt; {d} &gt; {p}</b>
                <span>{z}</span>
              </button>
            ))}
            {t && !hits.length && <p className="zp-empty">ไม่พบ “{q}” ลองค้นด้วยชื่อแขวง/ตำบล หรือเขต/อำเภอ</p>}
            {!t && <p className="zp-empty">พิมพ์รหัสไปรษณีย์ หรือชื่อแขวง/ตำบล เขต/อำเภอ</p>}
          </div>
        </div>
      )}
    </Sheet>
  );
}

/** ที่อยู่ · รหัสไปรษณีย์ (opens the search sheet) · จังหวัด · เขต/อำเภอ · แขวง/ตำบล. Shared by the address form and the tax invoice page.
 *  f: { detail, zip, prov, dist, sub }, setF(obj), show(key) → error text. */
function AddrFields({ app, f, setF, show, disabled }) {
  const [zipOpen, setZipOpen] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const dists = f.prov ? Object.keys(GEO[f.prov]) : [];
  const subs = f.prov && f.dist ? GEO[f.prov][f.dist] : [];
  const bkk = isBkk(f.prov);
  return (
    <fieldset className="ad-fields" disabled={disabled}>
          <AdField label="ที่อยู่" error={show('detail')}>
            <input value={f.detail} onChange={set('detail')} placeholder="บ้านเลขที่ อาคาร ซอย ถนน" autoComplete="address-line1" />
          </AdField>
          <AdField label="รหัสไปรษณีย์" error={show('zip')}>
            <span className="ad-ctl">
              <button type="button" className={`ad-zip ${f.zip ? '' : 'empty'}`} aria-haspopup="dialog" onClick={(e) => { e.preventDefault(); setZipOpen(true); }}>{f.zip || 'ค้นหารหัสไปรษณีย์'}</button>
              <Icon name="magnifying-glass" size={22} className="ad-ctl-ic" />
            </span>
            {zipOpen && <ZipSheet app={app} start={f.zip} onPick={(v) => setF({ ...f, ...v })} onClose={() => setZipOpen(false)} />}
          </AdField>
          <AdField label="จังหวัด" error={show('prov')}>
            <span className="ad-ctl">
              <select value={f.prov} onChange={(e) => setF({ ...f, prov: e.target.value, dist: '', sub: '' })} className={f.prov ? '' : 'empty'}>
                <option value="" disabled>เลือกจังหวัด</option>
                {Object.keys(GEO).map((p) => <option key={p}>{p}</option>)}
              </select>
              <Icon name="caret-down" size={20} className="ad-ctl-ic" />
            </span>
          </AdField>
          <AdField label={bkk ? 'เขต' : f.prov ? 'อำเภอ' : 'เขต/อำเภอ'} error={show('dist')}>
            <span className="ad-ctl">
              <select value={f.dist} disabled={!f.prov} onChange={(e) => setF({ ...f, dist: e.target.value, sub: '' })} className={f.dist ? '' : 'empty'}>
                <option value="" disabled>{f.prov ? `เลือก${bkk ? 'เขต' : 'อำเภอ'}` : 'เลือกจังหวัดก่อน'}</option>
                {dists.map((d) => <option key={d}>{d}</option>)}
              </select>
              <Icon name="caret-down" size={20} className="ad-ctl-ic" />
            </span>
          </AdField>
          <AdField label={bkk ? 'แขวง' : f.prov ? 'ตำบล' : 'แขวง/ตำบล'} error={show('sub')}>
            <span className="ad-ctl">
              <select value={f.sub} disabled={!f.dist} onChange={(e) => { const x = subs.find((v) => v[0] === e.target.value); setF({ ...f, sub: x[0], zip: x[1] }); }} className={f.sub ? '' : 'empty'}>
                <option value="" disabled>{f.dist ? `เลือก${bkk ? 'แขวง' : 'ตำบล'}` : `เลือก${bkk ? 'เขต' : 'อำเภอ'}ก่อน`}</option>
                {subs.map(([n]) => <option key={n}>{n}</option>)}
              </select>
              <Icon name="caret-down" size={20} className="ad-ctl-ic" />
            </span>
          </AdField>
    </fieldset>
  );
}

function AddressForm({ app, index }) {
  syncAddrCase(app.cases);
  const editing = index != null && ADDRS[index];
  const start = editing || { name: '', phone: '', detail: '', prov: '', dist: '', sub: '', zip: '', label: 'บ้าน', def: !ADDRS.length };
  const [f, setF] = useState({ ...start, phone: fmtPhone(start.phone) });
  const [tried, setTried] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });


  const digits = normPhone(f.phone);
  const errs = {
    name: !f.name.trim() ? 'ใส่ชื่อผู้รับก่อนนะ' : f.name.trim().split(/\s+/).length < 2 ? 'ใส่ทั้งชื่อและนามสกุล' : null,
    phone: phoneProblem(digits),
    detail: !f.detail.trim() ? 'ใส่บ้านเลขที่ อาคาร ซอย ถนน' : null,
    zip: !/^\d{5}$/.test(f.zip) ? 'รหัสไปรษณีย์มี 5 หลัก' : null,
    prov: !f.prov ? 'เลือกจังหวัด' : null,
    dist: !f.dist ? 'เลือกเขต/อำเภอ' : null,
    sub: !f.sub ? 'เลือกแขวง/ตำบล' : null,
  };
  const ok = Object.values(errs).every((e) => !e);
  const show = (k) => (tried ? errs[k] : null);

  const save = () => {
    if (!ok) return setTried(true);
    const a = { name: f.name.trim(), phone: digits, detail: f.detail.trim(), prov: f.prov, dist: f.dist, sub: f.sub, zip: f.zip, label: f.label, def: f.def };
    if (a.def) ADDRS.forEach((x) => (x.def = false));
    if (editing) ADDRS[index] = a;
    else { ADDRS.push(a); ADDR_SEL = ADDRS.length - 1; }
    if (!ADDRS.some((x) => x.def)) ADDRS[0].def = true;
    app.toast(editing ? 'บันทึกที่อยู่แล้ว' : 'เพิ่มที่อยู่แล้ว');
    app.back();
  };
  const remove = () => {
    const wasDef = ADDRS[index].def;
    ADDRS.splice(index, 1);
    if (wasDef && ADDRS.length) ADDRS[0].def = true;
    if (ADDR_SEL >= index) ADDR_SEL = Math.max(0, ADDR_SEL - 1);
    app.toast('ลบที่อยู่แล้ว');
    app.back();
  };

  return (
    <>
      <header className="m-hd ct-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={24} /></button>
          <b className="ct-title">{editing ? 'แก้ไขที่อยู่' : 'เพิ่มที่อยู่ใหม่'}</b>
          {editing && ADDRS.length > 1
            ? <button className="round-btn ghost ad-trash" aria-label="ลบที่อยู่นี้" onClick={() => setConfirmDel(true)}><Icon name="trash" size={24} /></button>
            : <span className="round-btn ghost" aria-hidden="true" />}
        </div>
      </header>
      <div className="m-scroll ad-page ad-form">
        <section className="ad-sec">
          <AdField label="ชื่อ-นามสกุล" error={show('name')}>
            <input value={f.name} onChange={set('name')} placeholder="เช่น สมใจ ใจดี" autoComplete="name" />
          </AdField>
          <AdField label="เบอร์มือถือ" error={show('phone')}>
            {/* Same field as the login page: +66, formatted as they type, clear button. */}
            <span className="lg-phone ad-phone">
              <b>+66</b>
              <input type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: fmtPhone(normPhone(e.target.value)) })} inputMode="tel" autoComplete="tel-national" placeholder="หมายเลขโทรศัพท์ของคุณ" />
              {f.phone && <button type="button" className="lg-clear" aria-label="ล้างเบอร์" onClick={(e) => { e.preventDefault(); setF({ ...f, phone: '' }); }}><Icon name="x-circle" fill size={20} /></button>}
            </span>
          </AdField>
        </section>

        <section className="ad-sec">
          <AddrFields app={app} f={f} setF={setF} show={show} />
        </section>

        <section className="ad-sec">
          <h2 className="ad-h">ตั้งชื่อที่อยู่</h2>
          <div className="ad-labels" role="radiogroup" aria-label="ตั้งชื่อที่อยู่">
            {ADDR_LABELS.map(([l, ic]) => (
              <button key={l} role="radio" aria-checked={f.label === l} className={`ad-lb ${f.label === l ? 'on' : ''}`} onClick={() => setF({ ...f, label: l })}><Icon name={ic} size={18} />{l}</button>
            ))}
          </div>
          <div className="ad-def-row">
            <span>ตั้งเป็นที่อยู่เริ่มต้น</span>
            <button className={`co-switch ${f.def ? 'on' : ''}`} role="switch" aria-checked={f.def} aria-label="ตั้งเป็นที่อยู่เริ่มต้น" disabled={editing && editing.def} onClick={() => setF({ ...f, def: !f.def })}><i /></button>
          </div>
        </section>


        <div className="co-bar ad-bar">
          <button className="btn-primary block" onClick={save}>บันทึกที่อยู่</button>
        </div>
      </div>

      {confirmDel && (
        <Sheet app={app} onClose={() => setConfirmDel(false)} title="ลบที่อยู่"
          footer={(close) => (
            <div className="ct-del-btns">
              <button className="btn-line" onClick={close}>ยกเลิก</button>
              <button className="btn-primary" onClick={() => { close(); setTimeout(remove, 260); }}>ลบ</button>
            </div>
          )}>
          <h2 className="ct-del-title">ลบที่อยู่นี้ไหม</h2>
          <p className="ct-del-sub">{addrLine(editing)}</p>
        </Sheet>
      )}
    </>
  );
}

Object.assign(window, { AddressPage, AddressForm, AddrFields, addrPicked, addrLine, syncAddrCase });
