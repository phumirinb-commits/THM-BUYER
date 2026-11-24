// หน้ารายละเอียดสินค้า.

const TRUST_LABEL = { tis: 'รับรอง มอก.', fda: 'รับรอง อย.', x2: 'ปลอมคืนเงิน 2 เท่า', truck: 'จัดส่งฟรี' };

function Gallery({ app, id, p, d, fromCampaign, web }) {
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const n = d.gallery.length;
  const goTo = (k) => { const el = ref.current; el.scrollTo({ left: k * el.clientWidth, behavior: 'smooth' }); };
  const onScroll = () => { const el = ref.current; setI(Math.round(el.scrollLeft / el.clientWidth)); };
  return (
    <div className={`gal ${web ? 'web' : ''}`}>
      <div className="gal-track hs" ref={ref} onScroll={onScroll}>
        {d.gallery.map((g, k) => {
          const ox = ((g.fx + 1) / 2) * 100, oy = ((g.fy + 1) / 2) * 100;
          return (
            <div className="gal-slide" key={k}>
              <img src={A(g.image)} alt={k === 0 ? p.title : ''} style={{ objectPosition: `${ox}% ${oy}%`, transform: `scale(${g.zoom})`, transformOrigin: `${ox}% ${oy}%` }} />
            </div>
          );
        })}
      </div>
      {p.genuine && <span className="gal-flag"><GenuineFlag /></span>}
      {app && <span className="gal-save"><SaveBtn app={app} id={id} /></span>}
      {app && <span className="gal-share"><ShareBtn app={app} id={id} p={p} /></span>}
      {web && n > 1 && (
        <>
          <button className="gal-arrow l" aria-label="รูปก่อนหน้า" disabled={i === 0} onClick={() => goTo(i - 1)}><Icon name="caret-left" size={22} /></button>
          <button className="gal-arrow r" aria-label="รูปถัดไป" disabled={i === n - 1} onClick={() => goTo(i + 1)}><Icon name="caret-right" size={22} /></button>
        </>
      )}
      {n > 1 && <span className="gal-count" aria-label={`รูปที่ ${i + 1} จาก ${n}`}>{i + 1}/{n}</span>}
      {fromCampaign && <img className="gal-camp" src={A('assets/icons/campaign_tab.svg')} width="124" height="32" alt="Brand Day" />}
    </div>
  );
}

/** What each product-page badge means (opens in a bottom sheet when tapped). */
const BADGE_INFO = {
  std808: { title: 'มาตรฐาน 808', text: 'สินค้านี้ผ่านการตรวจตามมาตรฐาน 808 ร้านส่งเอกสารให้ Thaimart ตรวจแล้ว', points: ['ผลิตจากวัตถุดิบที่ผ่านการคัดเลือก', 'ตรวจคุณภาพก่อนวางขาย', 'ดูเอกสารรับรองได้จากร้าน'] },
  x2: { title: 'ปลอมคืนเงิน 2 เท่า', terms: true },
  truck: { title: 'จัดส่งฟรี', text: 'สำหรับสินค้าที่ร่วมรายการ' },
  tis: { title: 'มอก.', text: 'มาตรฐานผลิตภัณฑ์อุตสาหกรรม' },
  official: { title: 'ร้านค้าทางการ', text: 'ร้านนี้เป็นเจ้าของแบรนด์ ผู้นำเข้า หรือผู้จัดจำหน่าย แต่เพียงผู้เดียวในประเทศไทย' },
  mall: { title: 'ตัวแทนจำหน่าย', text: 'ร้านนี้เป็นเจ้าของแบรนด์ ผู้นำเข้า หรือผู้จัดจำหน่าย แต่เพียงผู้เดียวในประเทศไทย' },
  fda: { title: 'อย.', text: 'อาหารและยา' },
};

function BadgeSheet({ app, k, d, onClose }) {
  const info = BADGE_INFO[k];
  const num = k === 'tis' && d.tis ? `เลข มอก. ${d.tis}` : k === 'fda' && d.fda ? `เลข อย. ${d.fda}` : null;
  return (
    <Sheet app={app} onClose={onClose} title={info.title} footer={(close) => <button className="btn-primary block" onClick={close}>เข้าใจแล้ว</button>}>
      <div className="bi-head">
        <span className={'bi-ic' + (k === 'official' || k === 'mall' ? ' wide' : '')}>{k === 'official' || k === 'mall' ? <ShopTag kind={k} h={24} /> : k === 'std808' ? <img src={A('assets/icons/badge_808_leaf_fill.svg')} width="32" height="32" alt="" /> : <TrustIcon k={k} size={36} />}</span>
        <h2 className="ts-title bi-title">{info.title}</h2>
        {num && <p className="bi-num">{num}</p>}
      </div>
      {info.text && <p className="bi-text">{info.text}</p>}
      {info.terms && (
        <div className="ts-terms bi-terms">
          <div className="ts-term"><Icon name="check-circle" size={20} /><div><b>ได้รับสิทธิ์เมื่อ</b><ul><li>สั่งซื้อสินค้าที่มีสถานะ ของแท้ต้องไทยมาร์ท</li><li>Thaimart ตรวจสอบและยืนยันว่าสินค้าไม่ใช่ของแท้</li></ul></div></div>
          <div className="ts-term"><Icon name="coin" size={20} /><div><b>สิ่งที่จะได้รับ</b><p>รับคืนเป็นเงินมูลค่า 2 เท่าของมูลค่าสินค้า</p></div></div>
          <div className="ts-term"><Icon name="clipboard-text" size={20} /><div><b>ขั้นตอนการขอรับสิทธิ์</b><ol><li>แจ้งปัญหาผ่านรายละเอียดคำสั่งซื้อ</li><li>ส่งหลักฐานและคืนสินค้าตามขั้นตอนที่กำหนด</li><li>รอ Thaimart ตรวจสอบและแจ้งผล</li></ol></div></div>
          <p className="ts-fine">* สิทธิ์และการคืนเงินเป็นไปตามเงื่อนไขที่กำหนด</p>
        </div>
      )}
      {info.points && <ul className="bi-list">{info.points.map((t) => <li key={t}><Icon name="check-circle" size={20} /><span>{t}</span></li>)}</ul>}
      {info.fine && <p className="ts-fine">{info.fine}</p>}
    </Sheet>
  );
}

function TrustTags({ app, p, d }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="ttags">
      {p.trust.map((k) => {
        const num = k === 'tis' && d.tis ? `เลข มอก. ${d.tis}` : k === 'fda' && d.fda ? `เลข อย. ${d.fda}` : null;
        return (
          <button className="ttag" key={k} onClick={() => setOpen(k)}>
            <span className="ttag-ic"><TrustIcon k={k} size={22} /></span>
            <span><b>{TRUST_LABEL[k]}</b>{num && <small>{num}</small>}</span>
          </button>
        );
      })}
      {open && app && <BadgeSheet app={app} k={open} d={d} onClose={() => setOpen(null)} />}
    </div>
  );
}

/** Description: over 6 lines it fades out, with ดูเพิ่มเติม / ย่อ. */
function Description({ d, lines = 6 }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [long, setLong] = useState(false);
  useLayoutEffect(() => { const el = ref.current; setLong(el.scrollHeight > el.clientHeight + 2); }, []);
  return (
    <div className="desc">
      <h2 className="p-sec">รายละเอียดสินค้า</h2>
      <div ref={ref} className={`desc-body ${open ? 'open' : ''} ${long && !open ? 'fade' : ''}`} style={{ '--lines': lines }}>
        {d.intro.map((t, i) => <p key={i}>{t}</p>)}
        {d.highlights.length > 0 && (
          <>
            <p className="gap">จุดเด่น</p>
            <ul>{d.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>
          </>
        )}
      </div>
      {long && <button className="more-btn" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'ย่อ' : 'ดูเพิ่มเติม'}<Icon name={open ? 'caret-up' : 'caret-down'} size={14} /></button>}
    </div>
  );
}

function Stars({ n, size = 12 }) {
  return <span className="stars" role="img" aria-label={`${n} ดาว`}>{[1, 2, 3, 4, 5].map((k) => <Icon key={k} name="star" fill size={size} className={k <= n ? 'on' : ''} />)}</span>;
}

function Reviews({ p, d }) {
  return (
    <section className="reviews">
      <div className="rv-hd">
        <h2 className="p-sec">รีวิวจากผู้ซื้อ</h2>
        <span className="rv-sum"><Icon name="star" fill size={16} className="on" /><b>{p.rating}</b> / 5 · {d.reviews.length} รีวิว</span>
      </div>
      {d.reviews.map((r, i) => (
        <article className="rv" key={i}>
          <img className="rv-av" src={A(r.avatar)} alt="" />
          <div className="rv-main">
            <div className="rv-top"><b>{r.name}</b><span>{r.date}</span></div>
            <Stars n={r.stars} />
            <p>{r.text}</p>
            {r.media.length > 0 && (
              <div className="rv-media">
                {r.media.map((m, k) => (
                  <span key={k} className="rv-m" role={m.video ? 'button' : undefined} aria-label={m.video ? 'เล่นวิดีโอรีวิว' : undefined}>
                    <img src={A(m.image)} alt="" />
                    {m.video && <Icon name="play" fill size={18} className="rv-play" />}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}

function ShopRow({ shop }) {
  return (
    <div className="shop-row">
      <img className="shop-av" src={A(shop.avatar)} alt="" />
      <div className="shop-mid">
        <b className="ellipsis">{shop.name}</b>
        <div className="shop-tags">
          {shop.badge && <ShopTag kind={shop.badge} h={20} />}
          {shop.verified && <VerifiedPill />}
        </div>
      </div>
      <button className="btn-line-red" aria-label={`ดูร้านค้า ${shop.name}`} onClick={() => { location.hash = '#' + window.shopHref(shop.name); }}>ดูร้านค้า<Icon name="caret-right" size={14} /></button>
    </div>
  );
}

function Videos({ d }) {
  if (!d.videos.length) return null;
  return (
    <section>
      <h2 className="p-sec">วิดีโอรีวิวสินค้า</h2>
      <div className="vids hs">
        {d.videos.map((v, i) => (
          <button className="vid" key={i} aria-label={`เล่นวิดีโอ ${v.caption}`}>
            <img src={A(v.thumbnail)} alt="" />
            <Icon name="play-circle" fill size={44} className="vid-play" />
            <span className="clamp2">{v.caption}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Related({ d }) {
  if (!d.related.length) return null;
  return (
    <section>
      <h2 className="p-sec">สินค้าแนะนำ</h2>
      <div className="rel hs">
        {d.related.map((id) => {
          const r = DATA.products[id];
          return (
            <a className="rel-card" key={id} href={`#/product/${id}`}>
              <div className="rel-img"><ProductImage p={r} /></div>
              <div className="rel-info">
                <p className="clamp2">{r.title}</p>
                <span className="now">{baht(r.price)}</span>
                {r.discount && <s>{baht(r.originalPrice)}</s>}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function Buttons({ app, id, chat }) {
  const shop = chat && DATA.detailFor(id).shop;
  return (
    <>
      {shop && (
        <button className="pd-chat" aria-label={`แชทกับร้าน ${shop.name}`} onClick={() => openChat(app, shop.name, true)}>
          <i className="o-ic" style={{ width: 24, height: 24, WebkitMaskImage: `url("${A('assets/icons/nav_inbox.svg')}")`, maskImage: `url("${A('assets/icons/nav_inbox.svg')}")` }} aria-hidden="true" />
          <span>แชท</span>
        </button>
      )}
      <button className="btn-line" onClick={() => app.cart(id)}>เพิ่มลงในตะกร้า</button>
      <button className="btn-primary" onClick={() => app.cart(id, 'buy')}>ซื้อเลย</button>
    </>
  );
}

/** Saved products (prototype: kept for this visit). The profile's บันทึก tab lists them. */
const SAVED_PRODUCTS = window.SAVED_PRODUCTS = window.SAVED_PRODUCTS || [];
function SaveBtn({ app, id }) {
  const [on, setOn] = useState(SAVED_PRODUCTS.includes(id));
  const toggle = () => {
    if (!app.cases.loggedIn) return app.login('บันทึกสินค้า');
    const i = SAVED_PRODUCTS.indexOf(id);
    if (i >= 0) SAVED_PRODUCTS.splice(i, 1); else SAVED_PRODUCTS.unshift(id);
    setOn(i < 0);
    app.toast(i < 0 ? 'บันทึกสินค้าแล้ว ดูได้ที่โปรไฟล์ แท็บบันทึก' : 'เอาออกจากที่บันทึกแล้ว');
  };
  return (
    <button className={`p-save ${on ? 'on' : ''}`} aria-pressed={on} aria-label={on ? 'บันทึกแล้ว แตะเพื่อเอาออก' : 'บันทึกสินค้า'} onClick={toggle}>
      <Icon name="bookmark-simple" fill={on} size={24} />
    </button>
  );
}

/** Affiliate members (logged in, signed up) see what they earn per sale. Rate from AFF, or a mock rate. */
const affOf = (app, id, price) => {
  if (!app || !app.cases.loggedIn || app.cases.affNone) return null;
  const a = typeof AFF !== 'undefined' && AFF.products.find((x) => x.id === id);
  const rate = a ? a.rate : [5, 6, 8, 10][id % 4];
  return { rate, per: Math.round((price * rate) / 100) };
};

function AffRow({ app, id, p, aff }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="pd-aff" onClick={() => setOpen(true)} aria-label={`ค่าคอมมิชชั่น ${aff.rate}% ได้ ${aff.per} บาทต่อชิ้น แชร์สินค้า`}>
        <img src={A('assets/icons/aff.svg')} width="24" height="24" alt="" />
        <span className="pd-aff-mid"><b>ค่าคอมมิชชั่น {aff.rate}%</b><span>ได้ {baht(aff.per)} ต่อชิ้น เมื่อมีคนซื้อผ่านลิงก์ของคุณ</span></span>
        <span className="pd-aff-share"><i className="o-ic" style={{ width: 20, height: 20, WebkitMaskImage: `url("${A('assets/icons/share.svg')}")`, maskImage: `url("${A('assets/icons/share.svg')}")` }} aria-hidden="true" /></span>
      </button>
      {open && <ShareSheet app={app} id={id} p={p} onClose={() => setOpen(false)} />}
    </>
  );
}

/** Share sheet: social apps, copy link, more (the phone's own share). */
const SHARE_TO = [
  { k: 'line', label: 'LINE' },
  { k: 'facebook', label: 'Facebook', icon: 'facebook-logo', bg: '#1877F2' },
  { k: 'messenger', label: 'Messenger', icon: 'messenger-logo', bg: '#0866FF' },
  { k: 'instagram', label: 'Instagram', icon: 'instagram-logo', bg: 'linear-gradient(45deg, #F9CE34, #EE2A7B 50%, #6228D7)' },
  { k: 'tiktok', label: 'TikTok', icon: 'tiktok-logo', bg: '#111' },
  { k: 'x', label: 'X', icon: 'x-logo', bg: '#111' },
  { k: 'copy', label: 'คัดลอกลิงก์', icon: 'link-simple', bg: 'var(--round)', ink: true },
  { k: 'more', label: 'อื่นๆ', icon: 'dots-three', bg: 'var(--round)', ink: true },
];

function ShareSheet({ app, id, p, onClose }) {
  const url = location.href;
  const aff = affOf(app, id, p.price);
  const pick = async (t, close) => {
    if (t.k === 'copy') {
      try { await navigator.clipboard.writeText(url); } catch (_) {}
      close(); return app.toast('คัดลอกลิงก์แล้ว');
    }
    if (t.k === 'more') {
      try { if (navigator.share) { close(); return await navigator.share({ title: p.title, url }); } } catch (_) { return; }
      close(); return app.toast('เครื่องนี้ยังเปิดเมนูแชร์ไม่ได้');
    }
    close(); app.toast(`แชร์ไปที่ ${t.label} แล้ว`);
  };
  return (
    <Sheet app={app} onClose={onClose} title="แชร์สินค้า">
      {(close) => (
        <div className="cs">
          <div className="nt-hd"><b>แชร์สินค้า</b><button className="gf-close" aria-label="ปิด" onClick={close}><Icon name="x" size={22} /></button></div>
          {aff ? (
            <div className="shs-com shs-com-card">
              <img src={A('assets/icons/aff.svg')} width="28" height="28" alt="Affiliate" />
              <span className="shs-com-rate">อัตราค่าคอม <em>{aff.rate}%</em></span>
              <span className="shs-com-per"><b>{baht(aff.per)}</b> / ชิ้น</span>
            </div>
          ) : (
            <div className="shs-item">
              <img src={A(p.image)} alt="" />
              <div><p className="clamp2">{p.title}</p><b>{baht(p.price)}</b></div>
            </div>
          )}
          {aff && <p className="shs-note">ลิงก์ที่แชร์มีรหัส Affiliate ของคุณ ได้ค่าคอมเมื่อผู้ซื้อยืนยันรับสินค้า</p>}
          <div className="shs-grid">
            {SHARE_TO.map((t) => (
              <button key={t.k} className="shs-btn" onClick={() => pick(t, close)}>
                {t.k === 'line'
                  ? <span className="shs-ic line"><LineMark /></span>
                  : <span className="shs-ic" style={{ background: t.bg, color: t.ink ? 'var(--ink)' : '#fff' }}><Icon name={t.icon} fill={!t.ink} size={26} /></span>}
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </Sheet>
  );
}

function ShareBtn({ app, id, p }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="p-save" aria-label="แชร์สินค้า" onClick={() => setOpen(true)}>
        <i className="o-ic" style={{ width: 22, height: 22, WebkitMaskImage: `url("${A('assets/icons/share.svg')}")`, maskImage: `url("${A('assets/icons/share.svg')}")` }} aria-hidden="true" />
      </button>
      {open && <ShareSheet app={app} id={id} p={p} onClose={() => setOpen(false)} />}
    </>
  );
}

function Summary({ app, id, p, d }) {
  const [shopInfo, setShopInfo] = useState(false);
  return (
    <>
      <h1 className="p-title">{p.shopBadge && <><button className="shoptag-btn" aria-label={`${p.shopBadge === 'official' ? 'ร้านค้าทางการ' : 'ตัวแทนจำหน่าย'} ดูรายละเอียด`} onClick={() => setShopInfo(true)}><ShopTag kind={p.shopBadge} h={20} /></button> </>}{p.title}</h1>
      {shopInfo && <BadgeSheet app={app} k={p.shopBadge} d={d} onClose={() => setShopInfo(false)} />}
      <div className="p-price">
        <span className="now">{baht(p.price)}</span>
        {p.discount && <s>{baht(p.originalPrice)}</s>}
        {p.discount && <DiscountPill d={p.discount} lg />}
      </div>
      <Meta p={p} size={14} />
      <TrustTags app={app} p={p} d={d} />
    </>
  );
}

function ProductPage({ app, id, from }) {
  const p = DATA.products[id];
  const d = useMemo(() => DATA.detailFor(id), [id]);
  const fromCampaign = from === 'campaign' && app.cases.campaign;
  useEffect(() => { document.querySelector('.m-scroll, .web')?.scrollTo?.(0, 0); scrollTo(0, 0); }, [id]);

  if (app.cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="home" />
        <main className="wrap w-pd">
          <div className="w-pd-top">
            <Gallery app={app} id={id} p={p} d={d} fromCampaign={fromCampaign} web />
            <div className="w-pd-side">
              <Summary app={app} id={id} p={p} d={d} />
              <Description d={d} lines={5} />
              <div className="w-pd-btns"><Buttons app={app} id={id} /></div>
            </div>
          </div>
          <div className="w-pd-below">
            <Reviews p={p} d={d} />
            {d.shop && <ShopRow shop={d.shop} />}
            <Videos d={d} />
            <Related d={d} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <MobileHeader app={app} />
      <div className="m-scroll pd">
        <Gallery app={app} id={id} p={p} d={d} fromCampaign={fromCampaign} />
        <div className="pd-body">
          <Summary app={app} id={id} p={p} d={d} />
          <Description d={d} />
          <Reviews p={p} d={d} />
          {d.shop && <ShopRow shop={d.shop} />}
          <Videos d={d} />
          <Related d={d} />
        </div>
      </div>
      <div className="m-actions has-chat"><Buttons app={app} id={id} chat /></div>
    </>
  );
}

window.ProductPage = ProductPage;
