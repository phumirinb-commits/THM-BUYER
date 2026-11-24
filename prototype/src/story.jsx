// ดูสตอรี่ (#/story/:index): opens from a shop's ring on Home (shops that are not live).
// Dark media page: progress bars, shop row, photo, optional product card, reply bar.

const ST_MS = 5000; // each frame
const STORY_FRAMES = {
  'SIRINTRA Official': [
    { image: 'assets/images/sirintra/bag_bucket.jpg', caption: 'ทรงถังพู่ห้อย ลด 30% วันนี้', product: window.SIRINTRA.bucket, time: '2 ชม.' },
    { image: 'assets/images/sirintra/bag_moon.jpg', caption: 'ทรงพระจันทร์ สะพายข้างได้ทุกวัน', product: window.SIRINTRA.moon, time: '2 ชม.' },
    { image: 'assets/images/sirintra/bag_round.jpg', caption: 'ทรงกลมลายก้นหอย สานมือทีละใบ', product: window.SIRINTRA.round, time: '1 ชม.' },
  ],
  'บ้านกาแฟดอย สาขา 2': [
    { image: 'assets/images/story_baan_kafae_2.png', caption: 'สาขาใหม่เปิดแล้ว แวะมานั่งกันได้นะ', time: '5 ชม.' },
    { image: 'assets/images/product_coffee_beans.jpg', caption: 'เมล็ดคั่วใหม่ล็อตนี้ หอมมาก', product: 30, time: '4 ชม.' },
  ],
  'สวนเล็กของมิ้น': [
    { image: 'assets/images/product_monstera.jpg', caption: 'มอนสเตอร่าต้นใหม่มาแล้ว', product: 34, time: '3 ชม.' },
    { image: 'assets/images/product_plant_pot.jpg', caption: 'พลูด่างกระถางเซรามิก เลี้ยงง่ายมาก', product: 26, time: '3 ชม.' },
    { image: 'assets/images/product_pruning_shears.jpg', caption: 'ของที่ใช้ทุกวันในสวน', product: 54, time: '1 ชม.' },
  ],
  'ป้าแว่น': [
    { image: 'assets/images/story_pa_waen.png', caption: 'ขนมทำเองทุกเช้า', time: '8 ชม.' },
    { image: 'assets/images/product_cookies.jpg', caption: 'คุกกี้อบใหม่ วันนี้มี 20 กล่อง', product: 9, time: '7 ชม.' },
  ],
  'ตุ๊กตาน้องกระต่าย': [
    { image: 'assets/images/product_bunny_plush.jpg', caption: 'น้องกระต่ายหูยาว ผูกโบว์ นุ่มมาก', product: 36, time: '10 ชม.' },
  ],
};
const framesFor = (s) => STORY_FRAMES[s.name] || [{ image: s.image, time: '1 ชม.' }];
/** Story order: every shop that is not live, as on Home. */
const storyIndexes = () => DATA.storyShops.map((s, i) => (s.live ? -1 : i)).filter((i) => i >= 0);

function StoryViewer({ app, index, web }) {
  const shop = DATA.storyShops[index];
  const frames = framesFor(shop);
  const [f, setF] = useState(0);
  const [t, setT] = useState(0); // 0..1 of the current frame
  const [held, setHeld] = useState(false);
  const [typing, setTyping] = useState(false);
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [msg, setMsg] = useState('');
  const [toast, setToast] = useState('');
  const paused = held || typing || !!toast;
  const order = storyIndexes();
  const pos = order.indexOf(index);

  useEffect(() => { shop.seen = true; }, [index]);
  useEffect(() => { setF(0); setT(0); setLiked(false); }, [index]);

  const close = () => app.go('/');
  const goShop = (d) => {
    const next = order[pos + d];
    if (next == null) return d > 0 ? close() : (setF(0), setT(0));
    location.replace('#/story/' + next);
  };
  const step = (d) => {
    setT(0);
    if (f + d >= frames.length) return goShop(1);
    if (f + d < 0) return goShop(-1);
    setF(f + d);
  };

  // Progress clock.
  useEffect(() => {
    if (paused) return;
    let raf, last = performance.now();
    const tick = (now) => {
      const dt = now - last; last = now;
      setT((v) => {
        const nv = v + dt / ST_MS;
        if (nv >= 1) { requestAnimationFrame(() => step(1)); return 1; }
        return nv;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, f, index]);

  // Hold to pause, tap left third for back, the rest for next.
  const down = useRef(0);
  const onDown = () => { down.current = Date.now(); setHeld(true); };
  const onUp = (e) => {
    setHeld(false);
    if (Date.now() - down.current > 250) return;
    const r = e.currentTarget.getBoundingClientRect();
    step(e.clientX - r.left < r.width / 3 ? -1 : 1);
  };
  useEffect(() => {
    const k = (e) => { if (typing) return; if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'Escape') close(); };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  });

  const fr = frames[f];
  const p = fr.product != null ? DATA.products[fr.product] : null;
  const send = () => {
    if (!msg.trim()) return;
    setMsg(''); setTyping(false); document.activeElement?.blur();
    setToast(`ส่งข้อความถึง ${shop.name} แล้ว`);
    setTimeout(() => setToast(''), 1600);
  };

  return (
    <div className={`st ${web ? 'web' : ''}`}>
      <img key={fr.image} className="st-img" src={A(fr.image)} alt={fr.caption || ''} />
      <div className="st-shade top" aria-hidden="true" />
      <div className="st-shade bottom" aria-hidden="true" />

      <div className="st-tap" onPointerDown={onDown} onPointerUp={onUp} onPointerLeave={() => setHeld(false)} aria-hidden="true" />

      <div className="st-top">
        <div className="st-bars" role="progressbar" aria-label={`สตอรี่ ${f + 1} จาก ${frames.length}`}>
          {frames.map((_, k) => <span key={k}><i style={{ transform: `scaleX(${k < f ? 1 : k === f ? t : 0})` }} /></span>)}
        </div>
        <div className="st-head">
          <img className="st-av" src={A(shop.image)} alt="" style={shop.zoom ? { transform: `scale(${shop.zoom})` } : null} />
          <div className="st-who">
            <b className="ellipsis">{shop.badge && <><ShopTag kind={shop.badge} h={16} /> </>}{shop.name}</b>
            <span>{fr.time}</span>
          </div>
          <button className={`lv-follow ${following ? 'on' : ''}`} aria-pressed={following} aria-label={following ? 'กำลังติดตาม แตะเพื่อเลิกติดตาม' : 'ติดตาม'} onClick={() => (app.cases.loggedIn ? setFollowing(!following) : app.login('ติดตามร้านนี้'))}>
            {following ? <i className="o-ic" style={{ width: 18, height: 18, WebkitMaskImage: `url("${A('assets/icons/user_check.svg')}")`, maskImage: `url("${A('assets/icons/user_check.svg')}")` }} aria-hidden="true" /> : <><Icon name="plus" size={14} />ติดตาม</>}
          </button>
          <button className="st-ic" aria-label="ปิด" onClick={close}><Icon name="x" size={24} /></button>
        </div>
      </div>

      {fr.caption && <p className="st-cap">{fr.caption}</p>}

      <div className="st-bottom">
        {p && (
          <a className="st-prod" href={`#/product/${fr.product}`}>
            <img src={A(p.image)} alt="" />
            <span className="st-prod-mid">
              <b className="clamp2">{p.title}</b>
              <span className="st-prod-price"><span className="now">{baht(p.price)}</span>{p.discount && <s>{baht(p.originalPrice)}</s>}</span>
            </span>
            <span className="st-prod-go">ดูสินค้า</span>
          </a>
        )}
        <div className="st-reply">
          <label className="st-input">
            <input value={msg} onChange={(e) => setMsg(e.target.value)} onFocus={() => setTyping(true)} onBlur={() => setTyping(false)}
              onKeyDown={(e) => e.key === 'Enter' && send()} placeholder={`ส่งข้อความถึง ${shop.name}...`} aria-label={`ส่งข้อความถึง ${shop.name}`} />
          </label>
          {msg.trim() ? (
            <button className="st-ic send" aria-label="ส่งข้อความ" onClick={send}><Icon name="paper-plane-right" fill size={22} /></button>
          ) : (
            <>
              <button className={`st-ic ${liked ? 'liked' : ''}`} aria-pressed={liked} aria-label="ถูกใจสตอรี่" onClick={() => setLiked(!liked)}><Icon name="heart" fill={liked} size={26} /></button>
              <button className="st-ic" aria-label="แชร์สตอรี่"><i className="o-ic" style={{ width: 24, height: 24, WebkitMaskImage: `url("../assets/icons/share.svg")`, maskImage: `url("../assets/icons/share.svg")` }} aria-hidden="true" /></button>
            </>
          )}
        </div>
      </div>

      {toast && <p className="st-toast" role="status">{toast}</p>}
    </div>
  );
}

function StoryPage({ app, index }) {
  if (app.cases.web) {
    const order = storyIndexes();
    const pos = order.indexOf(index);
    return (
      <div className="st-web">
        <button className="st-web-close" aria-label="ปิด" onClick={() => app.go('/')}><Icon name="x" size={28} /></button>
        <button className="st-web-nav l" aria-label="สตอรี่ก่อนหน้า" disabled={pos <= 0} onClick={() => location.replace('#/story/' + order[pos - 1])}><Icon name="caret-left" size={24} /></button>
        <StoryViewer key={index} app={app} index={index} web />
        <button className="st-web-nav r" aria-label="สตอรี่ถัดไป" disabled={pos >= order.length - 1} onClick={() => location.replace('#/story/' + order[pos + 1])}><Icon name="caret-right" size={24} /></button>
      </div>
    );
  }
  return <StoryViewer key={index} app={app} index={index} />;
}

window.StoryPage = StoryPage;
