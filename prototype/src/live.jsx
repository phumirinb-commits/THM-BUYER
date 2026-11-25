// หน้าไลฟ์สด: opened from a live story (Figma 2506:449, adapted to this kit).
// Dark media page: the stream fills the screen, controls float on top.

const fmtCount = (n) => grouped(n);

/** Chat: starts with a few lines, then a new one every 2.6s; your own comments join in. */
function useLiveChat(mine, active, chat = DATA.liveChat) {
  const [lines, setLines] = useState(() => chat.slice(0, 3).map((c, k) => ({ id: k, who: DATA.liveViewers[c[0]], text: c[1] })));
  useEffect(() => {
    if (!active) return;
    let k = 3;
    const t = setInterval(() => {
      const c = chat[k % chat.length];
      setLines((ls) => [...ls.slice(-7), { id: 'a' + k, who: DATA.liveViewers[c[0]], text: c[1] }]);
      k++;
    }, 2600);
    return () => clearInterval(t);
  }, [active]);
  useEffect(() => {
    if (mine) setLines((ls) => [...ls.slice(-7), { id: 'me' + mine.at, who: { name: 'คุณ', avatar: 'assets/images/story_you_profile.jpg' }, text: mine.text, me: true }]);
  }, [mine]);
  return lines;
}

/** Hearts that float up from the like button. */
function Hearts({ list }) {
  return (
    <div className="lv-hearts" aria-hidden="true">
      {list.map((h) => <Icon key={h.id} name="heart" fill size={26} className="lv-heart" style={{ '--dx': `${h.dx}px` }} />)}
    </div>
  );
}

function LiveProductSheet({ app, room, onClose }) {
  return (
    <Sheet app={app} onClose={onClose} title="สินค้าในไลฟ์" height={604} /* same height as the options sheet (สี ไซส์ จำนวน); the list scrolls inside */>
      {(close) => (<>
      <div className="gf-head">
        <h2 className="ts-title lv-sheet-title">สินค้าในไลฟ์ {room.products.length} ชิ้น</h2>
        <button className="gf-close" aria-label="ปิด" onClick={close}><Icon name="x" size={20} /></button>
      </div>
      <div className="lv-list">
        {room.products.map((id) => {
          const p = DATA.products[id];
          return (
            <div className="lv-row" key={id}>
              <a className="lv-row-img" href={`#/product/${id}`}><ProductImage p={p} /></a>
              <a className="lv-row-info" href={`#/product/${id}`}>
                <p className="clamp2">{p.shopBadge && <><ShopTag kind={p.shopBadge} /> </>}{p.title}</p>
                <span className="pc-price sm"><span className="now">{baht(p.price)}</span>{p.discount && <s>{baht(p.originalPrice)}</s>}</span>
              </a>
              <span className="lv-row-btns">
                <button className="lv-add line" aria-label={`เพิ่ม ${p.title} ลงตะกร้า`} onClick={() => app.cart(id)}><i className="o-ic" style={{ width: 22, height: 22, WebkitMaskImage: `url("${A('assets/icons/cart_add.svg')}")`, maskImage: `url("${A('assets/icons/cart_add.svg')}")` }} aria-hidden="true" /></button>
                <button className="lv-buy" aria-label={`ซื้อ ${p.title}`} onClick={() => app.cart(id, 'buy')}>ซื้อ</button>
              </span>
            </div>
          );
        })}
      </div>
      </>)}
    </Sheet>
  );
}

// ── Gifts: stickers (one big sticker floats up) and animations (fill the screen) ──
const MASCOT = 'assets/images/live/live_mascot.png';
const GIFTS = {
  sticker: [
    // Animated sticker from gilfbox.gif (320x320, 5s), black cut out into a transparent WebP.
    { id: 'elephantHearts', name: 'ช้างส่งหัวใจ', img: 'assets/images/live/gift_elephant_hearts.png', gif: 'assets/images/live/gift_elephant_hearts.webp', price: 10 },
    { id: 'mascot', name: 'น้องช้างทักทาย', img: MASCOT, price: 5 },
    { id: 'heart', name: 'หัวใจ', icon: 'heart', color: '#FF4D6D', price: 1 },
    { id: 'thumb', name: 'ปังมาก', icon: 'thumbs-up', color: '#FFB020', price: 2 },
    { id: 'fire', name: 'ไฟลุก', icon: 'fire', color: '#FF7A45', price: 3 },
    { id: 'star', name: 'ดาว', icon: 'star', color: '#FFC531', price: 5 },
    { id: 'flower', name: 'ดอกบัว', icon: 'flower-lotus', color: '#FF6FA8', price: 5 },
    { id: 'gift', name: 'กล่องของขวัญ', icon: 'gift', color: '#E32321', price: 10 },
    { id: 'crown', name: 'มงกุฎ', icon: 'crown', color: '#FFC531', price: 20 },
  ],
  anim: [
    { id: 'hearts', name: 'ฝนหัวใจ', icon: 'heart', color: '#FF4D6D', price: 30, fx: 'rain' },
    { id: 'stars', name: 'ดาวระยิบ', icon: 'sparkle', color: '#FFD166', price: 40, fx: 'burst' },
    { id: 'confetti', name: 'พลุกระดาษ', icon: 'confetti', color: '#FF7A45', price: 50, fx: 'burst' },
    { id: 'party', name: 'ช้างฉลอง', img: MASCOT, price: 60, fx: 'rain' },
    { id: 'crowns', name: 'มงกุฎทอง', icon: 'crown', color: '#FFC531', price: 80, fx: 'rain' },
    { id: 'rocket', name: 'จรวด', icon: 'rocket-launch', color: '#E32321', price: 100, fx: 'rocket' },
  ],
};

window.GIFTS = GIFTS;
function GiftArt({ g, size }) {
  return g.img
    ? <img src={A(g.img)} alt="" style={{ width: size, height: size, objectFit: 'contain' }} />
    : <Icon name={g.icon} fill size={size} style={{ color: g.color }} />;
}

function GiftSheet({ app, coins, onSend, onClose }) {
  const [pick, setPick] = useState(null);
  const list = GIFTS.sticker;
  const g = list.find((x) => x.id === pick);
  const short = g && g.price > coins;
  return (
    <Sheet app={app} onClose={onClose} title="ส่งของขวัญ"
      footer={(close) => (
        <div className="gf-foot">
          <span className="gf-coins"><Icon name="coins" fill size={18} />เหรียญของคุณ <b>{coins}</b></span>
          <button className="btn-primary" disabled={!g || short} onClick={() => { onSend(g); close(); }}>
            {short ? 'เหรียญไม่พอ' : g ? `ส่ง · ${g.price} เหรียญ` : 'เลือกของขวัญ'}
          </button>
        </div>
      )}>
      {(close) => (
        <>
          <div className="gf-head">
            <h2 className="ts-title">ส่งของขวัญ</h2>
            <button className="gf-close" aria-label="ปิด" onClick={close}><Icon name="x" size={20} /></button>
          </div>
          <div className="gf-grid">
            {list.map((x) => (
              <button key={x.id} className={`gf-item ${pick === x.id ? 'on' : ''}`} aria-pressed={pick === x.id} onClick={() => setPick(pick === x.id ? null : x.id)}>
                <span className="gf-art"><GiftArt g={x} size={40} /></span>
                <span className="gf-name ellipsis">{x.name}</span>
                <span className="gf-price"><Icon name="coins" fill size={12} />{x.price}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </Sheet>
  );
}

/** What everyone sees after a gift is sent. */
function GiftFx({ fx }) {
  if (!fx) return null;
  const { g, key } = fx;
  if (g.gif) {
    return (
      <React.Fragment key={key}>
        {/* ?k= makes the GIF start from its first frame on every send. */}
        <img className="gx-vid" src={`${A(g.gif)}?k=${key}`} alt={g.name} />
        <span className="gx-vid-label">คุณส่ง {g.name}</span>
      </React.Fragment>
    );
  }
  if (!g.fx) {
    return <div className="gx-sticker" key={key}><GiftArt g={g} size={120} /><span>คุณส่ง {g.name}</span></div>;
  }
  const n = g.fx === 'rocket' ? 1 : 18;
  return (
    <div className={`gx-${g.fx}`} key={key} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="gx-p" style={{ '--x': `${(i * 53) % 100}%`, '--d': `${(i % 6) * 0.12}s`, '--r': `${(i * 47) % 360}deg`, '--s': 0.7 + ((i * 7) % 6) / 10 }}>
          <GiftArt g={g} size={g.fx === 'rocket' ? 96 : 36} />
        </span>
      ))}
      <div className="gx-banner"><GiftArt g={g} size={28} />คุณส่ง {g.name}</div>
    </div>
  );
}

function LiveStage({ app, room, web, active = true }) {
  const [following, setFollowing] = useState(false);
  const [mine, setMine] = useState(null);
  const [draft, setDraft] = useState('');
  const [hearts, setHearts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [pinHidden, setPinHidden] = useState(false); // ✕ on the pinned product hides it (the bag button still lists every product)
  const [giftOpen, setGiftOpen] = useState(false);
  const [fx, setFx] = useState(null);
  const [coins, setCoins] = useState(120); // mock balance
  const sendGift = (g) => {
    setCoins((c) => c - g.price);
    setFx({ g, key: Date.now() });
    setMine({ text: `ส่ง ${g.name}`, at: Date.now() });
    setTimeout(() => setFx((f) => (f && f.g === g ? null : f)), g.gif ? 5300 : g.fx ? 3200 : 2400);
  };
  const [viewers, setViewers] = useState(room.viewers);
  const lines = useLiveChat(mine, active, room.chat === 'fashion' ? DATA.fashionChat : DATA.liveChat);
  const videoRef = useRef(null);
  // Only the room on screen plays; the others wait, paused.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) v.play().catch(() => {}); else v.pause();
  }, [active]);
  const chatRef = useRef(null);
  const p = DATA.products[room.pinned];

  useEffect(() => { const el = chatRef.current; if (el) el.scrollTop = el.scrollHeight; }, [lines]);
  useEffect(() => {
    const t = setInterval(() => setViewers((v) => v + Math.round(Math.random() * 9) - 3), 3000);
    return () => clearInterval(t);
  }, []);

  const like = () => {
    setLiked(true);
    const h = { id: Date.now() + Math.random(), dx: Math.round(Math.random() * 40 - 20) };
    setHearts((hs) => [...hs.slice(-10), h]);
    setTimeout(() => setHearts((hs) => hs.filter((x) => x.id !== h.id)), 1600);
  };
  const send = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    if (!app.cases.loggedIn) return app.login('พูดคุยในไลฟ์');
    setMine({ text, at: Date.now() });
    setDraft('');
  };

  return (
    <div className={`lv ${web ? 'web' : ''}`}>
      {room.video
        ? <video ref={videoRef} className="lv-bg" src={A(room.video)} poster={A(room.bg)} autoPlay={active} muted loop playsInline preload={active ? 'auto' : 'metadata'} aria-label={`ไลฟ์สดจาก ${room.name}`} style={{ objectPosition: room.videoPos }} />
        : <img className="lv-bg" src={A(room.bg)} alt="" />}
      <div className="lv-shade" />

      {/* Host: avatar with the Live badge and viewer count under it, name, follow. */}
      <div className="lv-top">
        <div className="lv-host">
          <div className="lv-av-col">
            <span className="lv-av"><img src={A(room.avatar)} alt="" style={room.avatarPos ? { objectPosition: room.avatarPos, transform: `scale(${room.avatarZoom || 1})`, transformOrigin: room.avatarPos } : null} /></span>
            <img className="lv-mascot" src={A('assets/images/live/live_mascot.png')} alt="" />
            <span className="lv-badge"><Icon name="broadcast" size={12} />ไลฟ์</span>
            <span className="lv-viewers" aria-label={`กำลังดู ${fmtCount(viewers)} คน`}><Icon name="eye" size={12} />{fmtCount(viewers)}</span>
          </div>
          <div className="lv-name">
            <b className="ellipsis">{room.badge && <><ShopTag kind={room.badge} /> </>}{room.name}</b>
            <span>ผู้ติดตาม {fmtCount(room.followers + (following ? 1 : 0))}</span>
          </div>
          <button className={`lv-follow round ${following ? 'on' : ''}`} aria-pressed={following} aria-label={following ? 'กำลังติดตาม แตะเพื่อเลิกติดตาม' : 'ติดตาม'} onClick={() => (app.cases.loggedIn ? setFollowing(!following) : app.login('ติดตามร้านนี้'))}>
            {following ? <i className="o-ic" style={{ width: 18, height: 18, WebkitMaskImage: `url("${A('assets/icons/user_check.svg')}")`, maskImage: `url("${A('assets/icons/user_check.svg')}")` }} aria-hidden="true" /> : <><Icon name="plus" size={12} className="ic-bold" />ติดตาม</>}
          </button>
        </div>
        {/* Opened from the ไลฟ์ tab it is a main page (the tab bar is there), so no ✕. From a story ring or a post: ✕ goes back. */}
        {!window.LIVE_FROM_TAB && <button className="lv-close" aria-label="ปิดไลฟ์" onClick={() => app.back()}><Icon name="x" size={20} /></button>}
      </div>

      {/* Chat, newest at the bottom, fading out at the top. */}
      <div className={`lv-chat ${pinHidden ? 'no-pin' : ''}`} ref={chatRef} aria-live="polite">
        {lines.map((l) => (
          <div className={`lv-msg ${l.me ? 'me' : ''}`} key={l.id}>
            <img src={A(l.who.avatar)} alt="" />
            <div><small>{l.who.name}</small><p>{l.text}</p></div>
          </div>
        ))}
      </div>

      {/* Pinned product. */}
      {!pinHidden && <div className="lv-pin">
        <button className="lv-pin-x" aria-label="ปิดสินค้าที่ปักไว้" onClick={() => setPinHidden(true)}><Icon name="x" size={14} /></button>
        <span className="lv-free"><span className="lv-free-ic"><TrustIcon k="truck" size={14} /></span>ส่งฟรี</span>
        <a className="lv-pin-img" href={`#/product/${room.pinned}`}><img src={A(room.pinnedImage || p.image)} alt="" /></a>
        <a className="lv-pin-info" href={`#/product/${room.pinned}`}>
          <p className="clamp2">{p.shopBadge && <><ShopTag kind={p.shopBadge} /> </>}{p.title}</p>
          <small>{room.name}</small>
          <span className="lv-pin-price"><span className="now">{baht(p.price)}</span>{p.discount && <s>{baht(p.originalPrice)}</s>}</span>
          <span className="lv-sold">ขายแล้ว {compact(p.soldCount)}</span>
        </a>
        <button className="lv-cart lv-cart-buy" aria-label={`ซื้อเลย ${p.title}`} onClick={() => app.cart(room.pinned, 'buy')}>ซื้อเลย</button>
      </div>}

      {/* Bottom bar: products, comment, like, share, more. */}
      <form className="lv-bar" onSubmit={send}>
        <button type="button" className="lv-ic bag" aria-label={`สินค้าในไลฟ์ ${room.products.length} ชิ้น`} onClick={() => setSheet(true)}>
          <i className="lv-bag-ic" aria-hidden="true" /><span className="lv-count">{room.products.length}</span>
        </button>
        <label className="lv-input">
          <Icon name="chat-circle" size={16} />
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="แสดงความคิดเห็น..." aria-label="แสดงความคิดเห็น" enterKeyHint="send" />
        </label>
        {draft.trim()
          ? <button type="submit" className="lv-ic send" aria-label="ส่งความคิดเห็น"><Icon name="paper-plane-right" fill size={18} /></button>
          : <button type="button" className={`lv-ic ${liked ? 'liked' : ''}`} aria-label="กดถูกใจ" onClick={like}><Icon name="heart" fill size={20} /></button>}
        <button type="button" className="lv-ic" aria-label="แชร์ไลฟ์"><Icon name="share-fat" fill size={20} /></button>
        <button type="button" className="lv-ic gift" aria-label="ส่งของขวัญ" onClick={() => (app.cases.loggedIn ? setGiftOpen(true) : app.login('ส่งของขวัญ'))}><img src={A('assets/icons/live_gift.svg')} width="40" height="40" alt="" /></button>
      </form>
      <Hearts list={hearts} />
      {sheet && <LiveProductSheet app={app} room={room} onClose={() => setSheet(false)} />}
      <GiftFx fx={fx} />
      {giftOpen && <GiftSheet app={app} coins={coins} onSend={sendGift} onClose={() => setGiftOpen(false)} />}
    </div>
  );
}

/** Swipe up / down between the rooms that are live now (one full screen each, snapping). */
function LiveFeed({ app, index, web, onChange }) {
  const rooms = DATA.liveIndexes;
  const start = Math.max(0, rooms.indexOf(index));
  const [cur, setCur] = useState(start);
  const [hint, setHint] = useState(rooms.length > 1);
  const ref = useRef(null);
  useLayoutEffect(() => { const el = ref.current; el.scrollTop = start * el.clientHeight; }, []);
  useEffect(() => { const t = setTimeout(() => setHint(false), 2600); return () => clearTimeout(t); }, []);
  const onScroll = () => {
    const el = ref.current;
    const k = Math.round(el.scrollTop / el.clientHeight);
    if (k !== cur && rooms[k] != null) {
      setCur(k);
      setHint(false);
      history.replaceState(null, '', '#/live/' + rooms[k]); // the link follows the room on screen
      onChange?.(rooms[k]);
    }
  };
  const go = (d) => { const el = ref.current; el.scrollTo({ top: (cur + d) * el.clientHeight, behavior: 'smooth' }); };
  return (
    <div className={`lv-feed-wrap ${web ? 'web' : ''}`}>
      <div className="lv-feed" ref={ref} onScroll={onScroll} aria-label="ไลฟ์สด ปัดขึ้นลงเพื่อเปลี่ยนไลฟ์">
        {rooms.map((i, k) => (
          <div className="lv-slide" key={i} aria-hidden={k !== cur}>
            {Math.abs(k - cur) <= 1 && <LiveStage app={app} room={DATA.liveRoomFor(i)} web={web} active={k === cur} />}
          </div>
        ))}
      </div>
      {hint && <div className="lv-hint" aria-hidden="true"><Icon name="caret-up" size={20} />ปัดขึ้นเพื่อดูไลฟ์ถัดไป</div>}
      {web && (
        <div className="lv-nav">
          <button aria-label="ไลฟ์ก่อนหน้า" disabled={cur === 0} onClick={() => go(-1)}><Icon name="caret-up" size={22} /></button>
          <button aria-label="ไลฟ์ถัดไป" disabled={cur === rooms.length - 1} onClick={() => go(1)}><Icon name="caret-down" size={22} /></button>
        </div>
      )}
    </div>
  );
}

function LivePage({ app, index }) {
  const [shown, setShown] = useState(index);
  // Leaving the live page ends the "opened from the ไลฟ์ tab" mode (a story ring later shows ✕ again).
  useEffect(() => () => { if (!/^#\/live\//.test(location.hash)) window.LIVE_FROM_TAB = false; }, []);
  const room = DATA.liveRoomFor(shown);
  if (app.cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="live" />
        <main className="wrap w-live">
          <LiveFeed app={app} index={index} web onChange={setShown} />
          <aside className="w-live-side">
            <h2 className="p-sec">สินค้าในไลฟ์ {room.products.length} ชิ้น</h2>
            <div className="lv-list">
              {room.products.map((id) => {
                const p = DATA.products[id];
                return (
                  <a className="lv-row" key={id} href={`#/product/${id}`}>
                    <span className="lv-row-img"><ProductImage p={p} /></span>
                    <span className="lv-row-info">
                      <p className="clamp2">{p.shopBadge && <><ShopTag kind={p.shopBadge} /> </>}{p.title}</p>
                      <span className="pc-price sm"><span className="now">{baht(p.price)}</span>{p.discount && <s>{baht(p.originalPrice)}</s>}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </aside>
        </main>
      </div>
    );
  }
  return (
    <>
      <LiveFeed app={app} index={index} onChange={setShown} />
      {/* Tab bar only when opened from the ไลฟ์ tab; from a story ring, a post or a profile it is full screen (✕ to go back). */}
      {window.LIVE_FROM_TAB && <BottomNav app={app} current="live" />}
    </>
  );
}

window.LivePage = LivePage;
window.GiftArt = GiftArt;
