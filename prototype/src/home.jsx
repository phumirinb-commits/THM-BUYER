// หน้าแรก: mobile (390) and desktop (1440).

function Stories({ app }) {
  const { loggedIn, following } = app.cases;
  const [followed, setFollowed] = useState({});
  const [create, setCreate] = useState(false);
  return (
    <div className="stories hs" role="list">
      {loggedIn ? (
        <div className="story" role="listitem">
          {/* + : same สร้าง sheet as the profile's floating button (โพสต์ · สตอรี่ · ถ่ายทอดสด). */}
          <div className="story-ring" role="button" tabIndex={0} aria-label="สร้าง โพสต์ สตอรี่ หรือถ่ายทอดสด" aria-haspopup="dialog" onClick={() => setCreate(true)} onKeyDown={(e) => e.key === 'Enter' && setCreate(true)}>
            <div className="ring seen"><div className="photo"><img src={A('assets/images/story_you_profile.jpg')} alt="" /></div></div>
            <span className="story-add" aria-hidden="true"><Icon name="plus" size={12} /></span>
          </div>
          <button className="story-name" aria-haspopup="dialog" onClick={() => setCreate(true)}>คุณ</button>
          {create && <CreateSheet app={app} onClose={() => setCreate(false)} />}
        </div>
      ) : (
        <div className="story" role="listitem">
          <button className="guest-ring" aria-label="เข้าสู่ระบบ" onClick={() => app.login('ลงสตอรี่ของคุณ')}><Icon name="user" size={28} /></button>
          <span className="story-name">เข้าสู่ระบบ</span>
        </div>
      )}
      {DATA.storyShops.map((s, i) => {
        // Not following anyone yet: recommended shops, each with a follow button (not while live).
        const canFollow = !following && !s.live && !followed[i];
        return (
          <div className="story" role="listitem" key={i}>
            <div className="story-ring" role="button" tabIndex={0} aria-label={s.live ? `ดูไลฟ์ ${s.name}` : `ดูสตอรี่ ${s.name}`} style={{ cursor: 'pointer' }}
              onClick={() => app.go((s.live ? '/live/' : '/story/') + i)} onKeyDown={(e) => e.key === 'Enter' && app.go((s.live ? '/live/' : '/story/') + i)}>
              <div className={`ring ${s.live ? 'live' : s.seen ? 'seen' : ''}`}>
                <div className="photo"><img src={A(s.image)} alt="" style={s.zoom ? { transform: `scale(${s.zoom})` } : null} /></div>
              </div>
              {s.badge && <span className="mark-top"><ShopTag kind={s.badge} /></span>}
              {s.live && <span className="live-badge" role="img" aria-label="กำลังไลฟ์"><Icon name="broadcast" size={14} /></span>}
            </div>
            <div className="story-name-row">
              <span className="story-name ellipsis">{s.name}</span>
              {canFollow && (
                <button className="follow-btn" aria-label={`ติดตาม ${s.name}`} onClick={() => setFollowed({ ...followed, [i]: true })}>
                  <Icon name="user-plus" size={12} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TrustBar({ app }) {
  return (
    <button className="trust" onClick={() => app.sheet('trust')} aria-haspopup="dialog">
      <span className="trust-item"><ElephantSeal size={24} />ของแท้ต้องไทยมาร์ท</span>
      <span className="trust-sep" />
      <span className="trust-item"><X2Seal size={24} />ปลอมคืนเงิน 2 เท่า</span>
    </button>
  );
}

function CampaignImage({ app }) {
  const c = DATA.campaign;
  return (
    <a className="camp camp-home" href="#/campaign" aria-label={c.label} style={{ aspectRatio: c.aspectRatio }}>
      <img src={A(c.image)} alt="" />
      <div className="cd-wrap" style={{ bottom: c.countdownBottom }}>
        <Countdown endsAt={c.endsAt} onEnded={() => app.setCampaignEnded(true)} />
      </div>
    </a>
  );
}

function DealHead() {
  return (
    <div className="deal-hd">
      <h2><Fire size={20} className="red" />Brand Day Deal</h2>
      <a className="see-all-red" href="#/campaign">ดูทั้งหมด<span className="arrow"><Icon name="arrow-right" size={14} /></span></a>
    </div>
  );
}

/** The deal box: products as horizontal cards, or (brands only) white logo slots. */
function DealBox({ app, grid }) {
  const { hasProducts, hasBrands } = app.cases;
  const ids = DATA.dealIds.slice(0, grid ? 6 : 10);
  return (
    <section className={`deal-box ${grid ? 'grid-mode' : ''}`} aria-label="Brand Day Deal">
      <DealHead />
      {hasProducts ? (
        <div className={grid ? 'deal-grid' : 'deals hs'}>{ids.map((id) => <DealCard key={id} id={id} />)}</div>
      ) : hasBrands ? (
        <>
          <p className="deal-sub">แบรนด์ดังที่ร่วมรายการ</p>
          <div className={grid ? 'logo-grid' : 'logos90 hs'}>
            {DATA.campaignBrands.slice(0, grid ? 12 : 10).map((b, i) => <span key={i} className="logo90"><img src={A(b.image)} alt={b.name} /></span>)}
          </div>
        </>
      ) : null}
    </section>
  );
}

function PromoCarousel() {
  const slides = DATA.banners;
  const [i, setI] = useState(0);
  const drag = useRef(null);
  const [dx, setDx] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => !drag.current && setI((v) => (v + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);
  const down = (e) => { drag.current = { x: e.clientX, w: e.currentTarget.offsetWidth }; e.currentTarget.setPointerCapture(e.pointerId); };
  const move = (e) => drag.current && setDx(e.clientX - drag.current.x);
  const up = () => {
    if (!drag.current) return;
    if (Math.abs(dx) > drag.current.w * 0.15) setI((v) => (v + (dx < 0 ? 1 : -1) + slides.length) % slides.length);
    drag.current = null;
    setDx(0);
  };
  return (
    <div className="promo">
      <div className="promo-view" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        <div className="promo-track" style={{ transform: `translateX(calc(${-i * 100}% + ${dx}px))`, transition: dx ? 'none' : undefined }}>
          {slides.map((b, k) => (
            <div className="promo-slide" key={k} aria-hidden={k !== i}>
              <PromoArt b={b} />
            </div>
          ))}
        </div>
      </div>
      <div className="dots" role="img" aria-label={`แบนเนอร์ ${i + 1} จาก ${slides.length}`}>
        {slides.map((_, k) => <i key={k} className={k === i ? 'on' : ''} />)}
      </div>
    </div>
  );
}

function PromoArt({ b }) {
  return (
    <div className="promo-card" role="img" aria-label={b.label}>
      {b.layers.map((l) => <img key={l} src={A(l)} alt="" draggable="false" style={{ top: 0, height: '100%', objectPosition: b.pos || '50% 50%' }} />)}
    </div>
  );
}

function SectionHead({ title, onAll }) {
  return (
    <div className="sec">
      <h2>{title}</h2>
      {onAll && <a className="see-all" href="#/" onClick={(e) => { e.preventDefault(); onAll(); }}>ดูทั้งหมด<Icon name="caret-right" size={14} /></a>}
    </div>
  );
}

function BrandCard({ b, i }) {
  return (
    <a className="brand" href={`#/shop/${i}`} aria-label={`ดูร้าน ${b.name}`}>
      <div className="brand-cover"><img src={A(b.cover)} alt="" /></div>
      <div className="brand-body">
        <div className="brand-logo">
          <img src={A(b.avatar)} alt="" />
          {b.badge && <span className="mark-top"><ShopTag kind={b.badge} /></span>}
        </div>
        <span className="brand-name-row">
          <span className="brand-name ellipsis">{b.name}</span>
          {b.idVerified && <img className="id-seal" src={A('assets/icons/verified_seal.svg')} width="16" height="16" alt="ยืนยันตัวตน" />}
        </span>
      </div>
    </a>
  );
}

const SORTS = [
  { key: 'best', label: 'ขายดี' },
  { key: 'high', label: 'ราคา มากไปน้อย' },
  { key: 'low', label: 'ราคา น้อยไปมาก' },
];

/** Category bar (+ sort chips for every category but สินค้าแนะนำ), pinned together at the top. */
function CategoryBar({ sel, setSel, sort, setSort, top }) {
  const ref = useRef(null);
  const [docked, setDocked] = useState(false);
  const [popped, setPopped] = useState(false); // only a selection the user made pops
  useEffect(() => {
    const el = ref.current;
    const root = el.closest('.m-scroll') || null;
    const io = new IntersectionObserver(([e]) => setDocked(e.intersectionRatio < 1), { root, threshold: 1, rootMargin: `-${top + 1}px 0px 0px 0px` });
    io.observe(el);
    return () => io.disconnect();
  }, [top]);
  return (
    <div ref={ref} className={`cat-pin ${docked ? 'docked' : ''}`} style={{ top }}>
      <div className="cats hs" role="tablist" aria-label="หมวดหมู่">
        {DATA.categories.slice(0, 8).map((c, i) => (
          i === sel ? (
            <button key={'on' + i} role="tab" aria-selected="true" className={`cat on ${popped ? 'pop' : ''}`}>
              <span className="cat-disc"><Icon name={c.icon} size={24} /></span>
              {c.label}
            </button>
          ) : (
            <button key={i} role="tab" aria-selected="false" className="cat" onClick={() => { setPopped(true); setSel(i); }}>
              <Icon name={c.icon} size={24} className="red" />
              {c.label}
            </button>
          )
        ))}
      </div>
      {sel !== 0 && (
        <div className="sorts hs" role="group" aria-label="เรียงสินค้า">
          {SORTS.map((o) => (
            <button key={o.key} className="sort-chip" aria-pressed={sort === o.key} onClick={() => setSort(sort === o.key ? null : o.key)}>
              <span>{o.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** ร้าน/แบรนด์แนะนำ: logo cards, 72 wide; the shop's tag rides the logo's top edge. */
function BrandLogos({ sel, web }) {
  const list = DATA.categoryBrands[sel];
  if (!sel || !list?.length) return null;
  return (
    <section className="cb">
      <h2 className="cb-title">ร้าน/แบรนด์แนะนำ</h2>
      <div className={web ? 'cb-wrap' : 'cb-row hs'}>
        {list.map((b, i) => (
          <a key={i} className="cb-card" href="#/" aria-label={b.name} onClick={(e) => e.preventDefault()}>
            <span className="cb-logo">
              <img src={A(b.avatar)} alt="" />
              {b.badge && <span className="mark-top"><ShopTag kind={b.badge} /></span>}
            </span>
            <span className="cb-name ellipsis">{b.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/** Products of the category, up to 10, read left-right-left-right; sorted when a chip is on. */
function categoryIds(sel, sort) {
  const [l, r] = DATA.columns[sel] || DATA.columns[0];
  let ids = [];
  for (let k = 0; k < Math.max(l.length, r.length); k++) { if (l[k] != null) ids.push(l[k]); if (r[k] != null) ids.push(r[k]); }
  if (sel !== 0) ids = ids.slice(0, 10);
  const P = DATA.products;
  if (sort === 'best') ids = [...ids].sort((a, b) => P[b].soldCount - P[a].soldCount);
  if (sort === 'high') ids = [...ids].sort((a, b) => P[b].price - P[a].price);
  if (sort === 'low') ids = [...ids].sort((a, b) => P[a].price - P[b].price);
  return ids;
}

function HomeSkeleton({ web }) {
  const n = web ? 5 : 2;
  return (
    <div className="skeleton" aria-busy="true" aria-label="กำลังโหลด">
      <div className="sk-row center-w" style={{ gap: 16, padding: '12px 16px 0' }}>
        {Array.from({ length: web ? 10 : 5 }, (_, i) => <div key={i} className="sk-col"><Sk w={64} h={64} r={32} /><Sk w={56} h={12} /></div>)}
      </div>
      <div style={{ padding: '12px 16px 0', display: 'flex', justifyContent: 'center' }}><Sk w={300} h={24} r={12} /></div>
      <div className={web ? 'wrap sk-camp' : ''} style={{ marginTop: 12 }}>
        <Sk w="100%" h={web ? 340 : 219} r={web ? 16 : 0} style={{ display: 'block' }} />
        {web && <Sk w="100%" h={340} r={16} style={{ display: 'block' }} />}
      </div>
      <div className={web ? 'wrap' : ''} style={{ padding: web ? '16px 0 0' : '16px 16px 0' }}><Sk w="100%" h={96} r={16} style={{ display: 'block' }} /></div>
      <div className={web ? 'wrap' : ''} style={{ padding: web ? '20px 0 0' : '20px 16px 0', display: 'flex', gap: 12 }}>
        {Array.from({ length: web ? 7 : 3 }, (_, i) => <Sk key={i} w={150} h={140} r={12} />)}
      </div>
      <div className={web ? 'wrap' : ''} style={{ padding: web ? '20px 0' : '20px 16px', display: 'grid', gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 8 }}>
        {Array.from({ length: n * 2 }, (_, i) => <div key={i} className="sk-col" style={{ alignItems: 'stretch' }}><Sk w="100%" h={web ? 220 : 175} r={12} /><Sk w="90%" h={14} /><Sk w="50%" h={18} /></div>)}
      </div>
    </div>
  );
}

/** Skeleton time for the main tab pages: 1 second each time the page opens. */
function useLoading(key, ms = 1000) {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), ms); return () => clearTimeout(t); }, [key]);
  return loading;
}

function HomePage({ app }) {
  const { cases, campaignEnded } = app;
  // ?cat=1 opens a category straight away (for checking).
  const [sel, setCat] = useState(() => Number(new URLSearchParams(location.search).get('cat')) || 0);
  const [sort, setSort] = useState(null);
  const setSel = (i) => { setCat(i); setSort(null); }; // a new category starts unsorted
  const loading = useLoading(app.restartKey);
  const showCampaign = cases.campaign && !campaignEnded;
  const hasDealBox = showCampaign && (cases.hasProducts || cases.hasBrands);
  const ids = categoryIds(sel, sort);

  if (cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="home" />
        {loading ? <HomeSkeleton web /> : (
          <main className="wrap w-home">
            <Stories app={app} />
            <TrustBar app={app} />
            {showCampaign && (
              <div className={`w-camp ${hasDealBox ? '' : 'solo'}`}>
                <CampaignImage app={app} />
                {hasDealBox && <DealBox app={app} grid />}
              </div>
            )}
            <div className="w-promos">{DATA.banners.map((b, i) => <PromoArt key={i} b={b} />)}</div>
            <section className="w-sec">
              <SectionHead title="ร้านดีแนะนำ" onAll={() => app.go('/shops')} />
              <div className="brands hs">{DATA.brands.map((b, i) => <BrandCard key={i} b={b} i={i} />)}</div>
            </section>
            <section className="w-sec">
              <h2 className="cat-title">หมวดหมู่</h2>
              <CategoryBar sel={sel} setSel={setSel} sort={sort} setSort={setSort} top={72} />
              <BrandLogos sel={sel} web />
              <Masonry ids={ids} cols={5} />
            </section>
          </main>
        )}
        {!loading && <Footer />}
      </div>
    );
  }

  return (
    <>
      <MobileHeader app={app} home />
      <div className="m-scroll">
        {loading ? <HomeSkeleton /> : (
          <>
            <Stories app={app} />
            <TrustBar app={app} />
            {showCampaign && (
              <div className="m-camp">
                <CampaignImage app={app} />
                {hasDealBox && <DealBox app={app} />}
              </div>
            )}
            <PromoCarousel />
            <SectionHead title="ร้านดีแนะนำ" onAll={() => app.go('/shops')} />
            <div className="brands hs">{DATA.brands.map((b, i) => <BrandCard key={i} b={b} i={i} />)}</div>
            <h2 className="cat-title">หมวดหมู่</h2>
            <CategoryBar sel={sel} setSel={setSel} sort={sort} setSort={setSort} top={0} />
            <BrandLogos sel={sel} />
            <Masonry ids={ids} cols={2} />
          </>
        )}
      </div>
      <BottomNav app={app} current="home" />
    </>
  );
}

Object.assign(window, { HomePage, DealHead, PromoArt, SectionHead, useLoading });
