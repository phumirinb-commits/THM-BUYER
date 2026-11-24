// หน้า Brand Day Deal.

/** Brand logos in pages of cols x 2, turning by itself every 3 seconds, with page dots. */
function BrandPager({ cols }) {
  const per = cols * 2;
  const pages = [];
  for (let i = 0; i < DATA.campaignBrands.length; i += per) pages.push(DATA.campaignBrands.slice(i, i + per));
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (pages.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setPage((p) => (p + 1) % pages.length), 3000);
    return () => clearInterval(t);
  }, [pages.length]);
  return (
    <div className="bp">
      <div className="bp-view">
        <div className="bp-track" style={{ transform: `translateX(${-page * 100}%)` }}>
          {pages.map((pg, k) => (
            <div className="bp-page" key={k} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }} aria-hidden={k !== page}>
              {pg.map((b, i) => <span key={i} className="logo60"><img src={A(b.image)} alt={b.name} /></span>)}
            </div>
          ))}
        </div>
      </div>
      {pages.length > 1 && (
        <div className="bp-dots" role="tablist" aria-label="หน้าของแบรนด์">
          {pages.map((_, k) => <button key={k} role="tab" aria-selected={k === page} aria-label={`หน้า ${k + 1}`} onClick={() => setPage(k)}><i /></button>)}
        </div>
      )}
    </div>
  );
}

function CampaignBody({ app, web }) {
  const { hasBrands, hasProducts } = app.cases;
  const c = DATA.campaign;
  return (
    <>
      <div className={`cp-hero ${web ? 'web' : ''}`} style={{ aspectRatio: c.aspectRatio }}>
        <img src={A(c.image)} alt={c.label} />
        <div className="cd-wrap" style={{ bottom: c.countdownBottom }}><Countdown endsAt={c.endsAt} /></div>
      </div>
      <section className={`cp-panel ${hasBrands ? '' : 'short'}`}>
        <h1><Fire size={20} />Brand Day Deal<Fire size={20} /></h1>
        {hasBrands && (
          <>
            <p className="cp-sub">แบรนด์ดังที่ร่วมรายการ</p>
            <BrandPager cols={web ? 10 : 5} />
          </>
        )}
      </section>
      <a className="cp-promo" href="#/campaign" aria-label="Thaimart Brand Day ลดสูงสุด 70%"><img src={A(c.promo)} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = A(c.promoFallback); }} /></a>
      {hasProducts && <Masonry ids={DATA.dealIds} cols={web ? 5 : 2} from="campaign" />}
    </>
  );
}

function CampaignPage({ app }) {
  if (app.cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="home" />
        <main className="wrap w-cp"><CampaignBody app={app} web /></main>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <MobileHeader app={app} />
      <div className="m-scroll cp"><CampaignBody app={app} /></div>
    </>
  );
}

window.CampaignPage = CampaignPage;
