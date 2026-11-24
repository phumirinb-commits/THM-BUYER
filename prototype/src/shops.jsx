// ร้านดีแนะนำ: every recommended shop (#/shops), opened from ดูทั้งหมด on Home.
// Category chips, then one card per shop: cover, logo with its badge, name + seal, what it sells,
// rating · followers, follow, and 3 of its products. Mock data: the Home shops, then the shops behind the products.

const SHOPS_CATS = [
  { k: 'all', label: 'ทั้งหมด', icon: 'squares-four' },
  { k: 'fashion', label: 'แฟชั่น', icon: 'dress' },
  { k: 'beauty', label: 'ความงาม', icon: 'flower-lotus' },
  { k: 'home', label: 'บ้านและสวน', icon: 'house-line' },
  { k: 'food', label: 'อาหาร', icon: 'fork-knife' },
  { k: 'baby', label: 'แม่และเด็ก', icon: 'baby' },
  { k: 'pet', label: 'สัตว์เลี้ยง', icon: 'paw-print' },
  { k: 'it', label: 'ไอที', icon: 'laptop' },
];
// name → category, and a short line for shops built from products (the Home shops have their own tagline).
const SHOPS_INFO = {
  'ครามสกล': ['fashion'],
  'SIRINTRA Official': ['fashion'],
  'Oxford Studio': ['fashion'],
  'Green Haven': ['home'],
  'ป้าแว่น ของใช้ในบ้าน': ['home'],
  'Daily Fashion': ['fashion', 'เสื้อผ้า กระเป๋า ใส่ได้ทุกวัน'],
  'Beauty Corner': ['beauty', 'สกินแคร์และเมคอัพของแท้'],
  'บ้านสวนน่าอยู่': ['home', 'ของแต่งบ้านและต้นไม้'],
  'ครัวไทยมาร์ท อาหารและเครื่องดื่ม': ['food', 'ของกินของใช้ในครัว ส่งไว'],
  'Mom & Baby Store': ['baby', 'ของใช้แม่และเด็ก ปลอดภัย'],
  'PetCare Official Store': ['pet', 'อาหารและของใช้สัตว์เลี้ยง'],
  'IT & Gadget Hub': ['it', 'อุปกรณ์ไอทีและแกดเจ็ต'],
};
const shopsAll = () => Object.keys(SHOPS_INFO).map((name) => {
  const b = shopByName(name);
  const m = shopMock(b);
  return { ...b, tagline: SHOPS_INFO[name][1] || b.tagline, cat: SHOPS_INFO[name][0], rating: m.rating, followers: m.followers, ids: m.products.filter((id) => !DATA.products[id].hidden).slice(0, 3) };
});

function ShopListCard({ s, following, onFollow }) {
  const href = '#' + shopHref(s.name);
  return (
    <article className="sl-card">
      <div className="sl-body">
        <div className="sl-top">
          <a className="sl-logo" href={href} tabIndex={-1} aria-hidden="true">
            <img src={A(s.avatar)} alt="" />
            {s.badge && <span className="mark-top"><ShopTag kind={s.badge} /></span>}
          </a>
          <a className="sl-mid" href={href}>
            <span className="sl-name-row">
              <b className="ellipsis">{s.name}</b>
              {s.idVerified && <img className="id-seal" src={A('assets/icons/verified_seal.svg')} width="16" height="16" alt="ยืนยันตัวตน" />}
            </span>
            <span className="sl-tag ellipsis">{s.tagline}</span>
            <span className="sl-meta"><Icon name="star" fill size={14} className="sl-star" />{s.rating} · ผู้ติดตาม {compact(s.followers)}</span>
          </a>
          <button className={`sl-follow ${following ? 'on' : ''}`} aria-pressed={following} aria-label={following ? `กำลังติดตาม ${s.name} แตะเพื่อเลิกติดตาม` : `ติดตาม ${s.name}`} onClick={onFollow}>
            {following ? <i className="o-ic" style={{ width: 20, height: 20, WebkitMaskImage: `url("${A('assets/icons/user_check.svg')}")`, maskImage: `url("${A('assets/icons/user_check.svg')}")` }} aria-hidden="true" /> : 'ติดตาม'}
          </button>
        </div>
        {s.ids.length > 0 && (
          <div className="sl-prods">
            {s.ids.map((id) => {
              const p = DATA.products[id];
              return (
                <a key={id} className="sl-prod" href={`#/product/${id}`} aria-label={p.title}>
                  <span className="sl-prod-img"><img src={A(p.image)} alt="" loading="lazy" /></span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}

function ShopsBody({ app }) {
  const [cat, setCat] = useState('all');
  const [follows, setFollows] = useState({});
  const all = useMemo(shopsAll, []);
  const list = cat === 'all' ? all : all.filter((s) => s.cat === cat);
  const follow = (name) => {
    if (!app.cases.loggedIn) return app.login('ติดตามร้าน');
    setFollows((f) => ({ ...f, [name]: !f[name] }));
    if (!follows[name]) app.toast(`ติดตาม ${name} แล้ว`);
  };
  return (
    <>
      <div className="sl-chips hs" role="tablist" aria-label="หมวดร้านค้า">
        {SHOPS_CATS.map((c) => (
          <button key={c.k} role="tab" aria-selected={cat === c.k} className={`sl-chip ${cat === c.k ? 'on' : ''}`} onClick={() => setCat(c.k)}><Icon name={c.icon} size={18} className="sl-chip-ic" />{c.label}</button>
        ))}
      </div>
      <p className="sl-count">{list.length} ร้าน</p>
      <div className="sl-list">
        {list.map((s) => <ShopListCard key={s.name} s={s} following={!!follows[s.name]} onFollow={() => follow(s.name)} />)}
      </div>
    </>
  );
}

function ShopsPage({ app }) {
  if (app.cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="home" />
        <main className="wrap w-shops"><h1 className="sl-title">ร้านดีแนะนำ</h1><ShopsBody app={app} /></main>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <header className="m-hd sl-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={24} /></button>
          <b className="sl-hd-title">ร้านดีแนะนำ</b>
          <button className="round-btn ghost" aria-label="ค้นหาร้าน" onClick={() => app.toast('ค้นหาร้านยังไม่มีในต้นแบบ')}><Icon name="magnifying-glass" size={22} /></button>
        </div>
      </header>
      <div className="m-scroll sl-page"><ShopsBody app={app} /></div>
    </>
  );
}

Object.assign(window, { ShopsPage });
