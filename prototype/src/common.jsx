// Shared pieces: formatting, icons, headers, nav, product cards, countdown, sheets, skeleton, footer.

const { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } = React;

const A = (p) => '../' + p; // asset paths in the data are relative to the project root
const grouped = (v) => String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const baht = (v) => '฿' + grouped(v);
/** 950 → 950, 25600 → 25.6K, 1200000 → 1.2M (rounds down). */
const compact = (v) => {
  if (v < 1000) return String(v);
  const [d, s] = v < 1e6 ? [1e3, 'K'] : [1e6, 'M'];
  const t = Math.floor((v * 10) / d), w = Math.floor(t / 10), r = t % 10;
  return r === 0 || w >= 100 ? `${w}${s}` : `${w}.${r}${s}`;
};
/** "−30%" / "−฿200" (U+2212 minus), never "ลด". */
const discountLabel = (d) => (d.type === 'percent' ? `−${d.value}%` : `−${baht(d.value)}`);
const discountSpoken = (d) => (d.type === 'percent' ? `ลด ${d.value}%` : `ลด ${grouped(d.value)} บาท`);

function Icon({ name, fill, size = 24, className = '', style }) {
  return <i className={`${fill ? 'ph-fill' : 'ph'} ph-${name} ${className}`} style={{ fontSize: size, ...style }} aria-hidden="true" />;
}

/** Designer fire icon (assets/icons/fire.svg), painted in the text colour. */
function Fire({ size = 20, className = '' }) {
  return <i className={`fire ${className}`} style={{ width: size, height: size }} aria-hidden="true" />;
}

/** Designer cart icon (assets/icons/cart_v2.svg), painted in the text colour. Used for every cart. */
function CartIcon({ size = 24, className = '' }) {
  const url = `url("${A('assets/icons/cart_v2.svg')}")`;
  return <i className={`o-ic ${className}`} style={{ width: size, height: size, WebkitMaskImage: url, maskImage: url }} aria-hidden="true" />;
}

/** Round grey 40px header button (44px tap area). */
function RoundBtn({ icon, label, onClick, dot, count, size = 22 }) {
  return (
    <button className="round-btn" aria-label={label} onClick={onClick}>
      {icon === 'cart' ? <CartIcon size={size} /> : <Icon name={icon} size={size} />}
      {dot && <span className="rb-dot" />}
      {count != null && <span className="rb-count">{count}</span>}
    </button>
  );
}

function Logo({ height = 32 }) {
  return (
    <span className="logo" style={{ height }}>
      <img src={A('assets/icons/logo_mark.svg')} alt="" style={{ width: height, height }} />
      <img src={A('assets/icons/logo_wordmark.svg')} alt="Thaimart" style={{ height: height * 0.52 }} />
    </span>
  );
}

/** Header cart button: live count, opens the cart (login first when logged out). */
function CartBtn({ app }) {
  useCart();
  const n = cartCount();
  const { loggedIn } = app.cases;
  return <RoundBtn icon="cart" label={loggedIn ? `ตะกร้าสินค้า ${n} ชิ้น` : 'ตะกร้าสินค้า'} count={loggedIn && n ? (n > 99 ? '99+' : n) : null}
    onClick={() => (loggedIn ? app.go('/cart') : app.login('ดูตะกร้าสินค้า'))} />;
}

function HeaderActions({ app, withSearch = true }) {
  const { loggedIn } = app.cases;
  return (
    <>
      {withSearch && <RoundBtn icon="magnifying-glass" label="ค้นหา" />}
      <RoundBtn icon="bell" label={loggedIn ? 'การแจ้งเตือน มีรายการใหม่' : 'การแจ้งเตือน'} dot={loggedIn} />
      <CartBtn app={app} />
    </>
  );
}

/** Mobile header. Home: logo on a soft red fade. Other pages: white, with a back button. */
function MobileHeader({ app, home }) {
  return (
    <header className={`m-hd ${home ? 'mood' : ''}`}>
      <div className="m-hd-row">
        {home ? <Logo /> : <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={24} /></button>}
        {home ? <span className="grow" /> : (
          // White-header pages: a search field instead of the search button.
          <label className="m-search">
            <Icon name="magnifying-glass" size={18} />
            <input type="search" placeholder="ค้นหาสินค้า" aria-label="ค้นหาสินค้า" />
          </label>
        )}
        <HeaderActions app={app} withSearch={!!home} />
        {/* White-header pages (product, campaign): more actions at the end. */}
        {!home && <RoundBtn icon="dots-three-vertical" label="เมนูเพิ่มเติม" size={22} />}
      </div>
    </header>
  );
}

const NAV = [
  { key: 'home', label: 'หน้าแรก', icon: 'house' },
  { key: 'discover', label: 'ค้นพบ', icon: 'compass' },
  { key: 'live', label: 'ไลฟ์', icon: 'broadcast' },
  { key: 'inbox', label: 'กล่องข้อความ', icon: 'chats' },
  { key: 'profile', label: 'โปรไฟล์', icon: 'user' },
];

/** Designer nav icons (Figma 3800:16029), painted in the text colour: red when current, grey otherwise. */
const NAV_FILE = { home: 'home', discover: 'discover', live: 'live', orders: 'order', profile: 'profile' };
function NavIcon({ k, size, on }) {
  // หน้าแรก: filled when current, outline otherwise.
  // กล่องข้อความ: one icon (chatting-01), grey or red.
  if (k === 'inbox' && on) return <img className="nav-ic nav-ic-on" src={A('assets/icons/nav_inbox_active.svg')} width={size} height={size} alt="" aria-hidden="true" />;
  if (k === 'inbox') { const u = `url("../assets/icons/nav_inbox.svg")`; return <i className="nav-ic" style={{ width: size * 0.84, height: size * 0.84, margin: size * 0.08, WebkitMaskImage: u, maskImage: u }} aria-hidden="true" />; }
  const file = k === 'home' && !on ? 'home_outline' : NAV_FILE[k];
  // Current tab (not หน้าแรก): the designer's filled icon, drawn as is (the compass keeps its white needle).
  if (on && k !== 'home') return <img className="nav-ic nav-ic-on" src={A(`assets/icons/nav_${file}_active.svg`)} width={size} height={size} alt="" aria-hidden="true" />;
  const url = `url("../assets/icons/nav_${file}_v2.svg")`;
  return <i className="nav-ic" style={{ width: size, height: size, WebkitMaskImage: url, maskImage: url }} aria-hidden="true" />;
}

function BottomNav({ app, current }) {
  return (
    <nav className="m-nav" aria-label="เมนูหลัก">
      {NAV.map((n) => (
        <button key={n.key} aria-current={current === n.key ? 'page' : undefined} onClick={() => app.openTab(n.key)}>
          <span className="nav-ic-wrap"><NavIcon k={n.key} size={32} on={current === n.key} />{n.key === 'inbox' && app.cases.loggedIn && window.inboxUnread?.() > 0 && <i className="nav-count" aria-label={`ยังไม่อ่าน ${window.inboxUnread()}`}>{window.inboxUnread()}</i>}</span>
          <span>{n.label}</span>
        </button>
      ))}
    </nav>
  );
}

/** Desktop header: logo, long search box, menu, bell, cart. Sticky. */
function WebHeader({ app, current }) {
  return (
    <header className="w-hd">
      <div className="w-hd-in">
        <button className="w-logo" aria-label="หน้าแรก" onClick={() => app.go('/')}><Logo height={36} /></button>
        <label className="w-search">
          <Icon name="magnifying-glass" size={20} />
          <input placeholder="ค้นหาสินค้า ร้านค้า แบรนด์" aria-label="ค้นหา" />
        </label>
        <nav className="w-menu" aria-label="เมนูหลัก">
          {NAV.map((n) => (
            <button key={n.key} aria-current={current === n.key ? 'page' : undefined} onClick={() => app.openTab(n.key)}>
              <NavIcon k={n.key} size={22} on={current === n.key} />
              {n.label}
            </button>
          ))}
        </nav>
        <HeaderActions app={app} withSearch={false} />
      </div>
    </header>
  );
}

function Footer() {
  const cols = [
    ['ช้อปกับไทยมาร์ท', ['วิธีสั่งซื้อ', 'การชำระเงิน', 'การจัดส่ง', 'คืนสินค้าและคืนเงิน']],
    ['ความมั่นใจ', ['ของแท้ต้องไทยมาร์ท', 'ปลอมคืนเงิน 2 เท่า', 'ป้ายร้านค้า', 'มอก. และ อย.']],
    ['ขายกับไทยมาร์ท', ['เปิดร้านค้า', 'สมัคร Official และ Mall', 'Affiliate', 'ศูนย์ช่วยเหลือผู้ขาย']],
    ['เกี่ยวกับเรา', ['รู้จักไทยมาร์ท', 'ร่วมงานกับเรา', 'ข้อตกลงการใช้งาน', 'นโยบายความเป็นส่วนตัว']],
  ];
  return (
    <footer className="w-ft">
      <div className="w-promises">
        <div><ElephantSeal size={40} /><b>ของแท้ต้องไทยมาร์ท</b><span>ตรวจแหล่งที่มาและเอกสารทุกชิ้น</span></div>
        <div><X2Seal size={40} /><b>ปลอมคืนเงิน 2 เท่า</b><span>เจอของปลอม รับเงินคืน 2 เท่า*</span></div>
        <div><span className="truck-disc"><TrustIcon k="truck" size={26} /></span><b>จัดส่งฟรี</b><span>สำหรับสินค้าที่ร่วมรายการ</span></div>
      </div>
      <div className="w-links">
        {cols.map(([h, items]) => (
          <div key={h}><h3>{h}</h3>{items.map((i) => <a key={i} href="#/" onClick={(e) => e.preventDefault()}>{i}</a>)}</div>
        ))}
      </div>
      <p className="w-copy">© 2569 Thaimart · ข้อมูลในหน้านี้เป็นข้อมูลจำลอง</p>
    </footer>
  );
}

// ── Product cards ──

function DiscountPill({ d, lg }) {
  return <span className={`disc-pill ${lg ? 'lg' : ''}`} aria-label={discountSpoken(d)}>{discountLabel(d)}</span>;
}

function ProductImage({ p }) {
  if (!p.crop) return <img src={A(p.image)} alt="" loading="lazy" />;
  const [l, t, w, h] = p.crop.map((v) => (v / 175) * 100);
  return <img src={A(p.image)} alt="" loading="lazy" style={{ position: 'absolute', left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%` }} />;
}

/** มาตรฐาน 808 badge (Figma 3989:17520): green pill, leaf icon, white text. */
function Std808({ small }) {
  return <span className={'std808' + (small ? ' sm' : '')} aria-label="มาตรฐาน 808"><img src={A('assets/icons/badge_808_leaf_fill.svg')} alt="" />808</span>;
}
window.Std808 = Std808;

/** Product card for the 2-column (mobile) / 5-column (desktop) grid. */
function ProductCard({ id, app, from }) {
  const p = DATA.products[id];
  return (
    <a className="pc" href={`#/product/${id}${from ? '?from=' + from : ''}`}>
      <div className="pc-media">
        <div className="pc-img"><ProductImage p={p} /></div>
        {p.genuine && <span className="pc-flag"><GenuineFlag /></span>}
        {p.discount && <span className="pc-disc"><DiscountPill d={p.discount} /></span>}
        {p.trust.length > 0 && (
          <div className="pc-trust">
            {p.trust.map((k) => <span key={k} className="tdisc"><TrustIcon k={k} /></span>)}
          </div>
        )}
      </div>
      <div className="pc-info">
        <p className="pc-title clamp2">{p.shopBadge && <><ShopTag kind={p.shopBadge} /> </>}{p.title}</p>
        <div className="pc-price">
          <span className="now">{baht(p.price)}</span>
          {p.discount && <s>{baht(p.originalPrice)}</s>}
        </div>
        <Meta p={p} />
      </div>
    </a>
  );
}

function Meta({ p, size = 12 }) {
  return (
    <div className="meta" style={{ fontSize: size }}>
      <span className="rate"><img src={A('assets/icons/star.svg')} alt="คะแนน" />{p.rating}</span>
      <span className="sep" />
      <span className="ellipsis">ขายแล้ว {compact(p.soldCount)} ชิ้น</span>
    </div>
  );
}

/** Horizontal deal card, 246 x 105: square photo with the discount, then title, price, rating. */
function DealCard({ id }) {
  const p = DATA.products[id];
  return (
    <a className="deal" href={`#/product/${id}?from=campaign`}>
      <div className="deal-img">
        <ProductImage p={p} />
        {p.discount && <span className="pc-disc"><DiscountPill d={p.discount} /></span>}
      </div>
      <div className="deal-info">
        <p className="pc-title clamp2">{p.shopBadge && <><ShopTag kind={p.shopBadge} /> </>}{p.title}</p>
        <div className="pc-price sm">
          <span className="now">{baht(p.price)}</span>
          {p.discount && <s>{baht(p.originalPrice)}</s>}
        </div>
        <Meta p={p} />
      </div>
    </a>
  );
}

function Masonry({ ids, cols, from }) {
  const columns = Array.from({ length: cols }, () => []);
  ids.forEach((id, i) => columns[i % cols].push(id));
  return (
    <div className="grid">
      {columns.map((c, i) => <div className="col" key={i}>{c.map((id) => <ProductCard key={id} id={id} from={from} />)}</div>)}
    </div>
  );
}

// ── Countdown: flip tiles on a dark plate ──

function useNow(ms = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), ms); return () => clearInterval(t); }, [ms]);
  return now;
}

function Countdown({ endsAt, onEnded }) {
  const now = useNow();
  const left = Math.max(0, endsAt - now);
  useEffect(() => { if (left === 0) onEnded?.(); }, [left === 0]);
  const s = Math.floor(left / 1000);
  const days = Math.floor(s / 86400), h = Math.floor(s / 3600) % 24, m = Math.floor(s / 60) % 60, sec = s % 60;
  const two = (n) => String(n).padStart(2, '0');
  const seg = (v, unit) => (
    <div className="cd-seg" key={unit}>
      <div className="cd-digits">{two(v).split('').map((d, i) => <span className="flip" key={i}>{d}</span>)}</div>
      <span className="cd-unit">{unit}</span>
    </div>
  );
  const colon = (k) => <span className="cd-colon" key={k}><i /><i /></span>;
  const spoken = `สิ้นสุดใน ${days ? days + ' วัน ' : ''}${h} ชั่วโมง ${m} นาที`;
  return (
    <div className="cd" role="timer" aria-label={spoken}>
      {days > 0 && [seg(days, 'วัน'), colon('a')]}
      {seg(h, 'ชั่วโมง')}{colon('b')}{seg(m, 'นาที')}{colon('c')}{seg(sec, 'วินาที')}
    </div>
  );
}

// ── Modal: centred alert with two buttons (quiet + primary) ──
function Modal({ app, title, text, cancel = 'ยกเลิก', ok = 'ตกลง', onClose, onOk }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setOpen(true)); }, []);
  const close = () => { setOpen(false); setTimeout(onClose, 200); };
  const host = (!app.cases.web && document.querySelector('.phone')) || document.body;
  return ReactDOM.createPortal(
    <div className={`md-layer ${open ? 'open' : ''}`}>
      <div className="scrim" onClick={close} />
      <div className={`md ${cancel ? '' : 'center'}`} role="alertdialog" aria-modal="true" aria-labelledby="md-t" aria-describedby="md-d">
        <h2 id="md-t">{title}</h2>
        <p id="md-d">{text}</p>
        <div className={`md-btns ${cancel ? '' : 'one'}`}>
          {cancel && <button className="btn-line" onClick={close}>{cancel}</button>}
          <button className="btn-primary" onClick={() => (onOk === onClose ? close() : onOk())}>{ok}</button>
        </div>
      </div>
    </div>,
    host,
  );
}

// ── Sheet (mobile) / centred dialog (desktop) ──

function Sheet({ app, onClose, children, footer, title, height: fixed }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(null);
  useEffect(() => { requestAnimationFrame(() => setOpen(true)); }, []);
  // Keep the height it opened at: expanding content scrolls inside instead of growing the sheet.
  useLayoutEffect(() => { if (ref.current && height == null) setHeight(ref.current.getBoundingClientRect().height); }, []);
  const close = () => { setOpen(false); setTimeout(onClose, 250); };
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && close();
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, []);
  // Portal to the phone (or the page on desktop), so a sheet opened from inside a scrolling list still covers the screen.
  const host = (!app.cases.web && document.querySelector('.phone')) || document.body;
  return ReactDOM.createPortal(
    <div className={`sheet-layer ${app.cases.web ? 'web' : ''} ${open ? 'open' : ''}`}>
      <div className="scrim" onClick={close} />
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title} ref={ref} style={fixed ? { height: fixed } : height ? { height } : null}>
        {!app.cases.web && <div className="handle" />}
        <div className="sheet-body">{typeof children === 'function' ? children(close) : children}</div>
        {footer && <div className="sheet-foot">{footer(close)}</div>}
      </div>
    </div>,
    host,
  );
}

function TrustSheet({ app, onClose }) {
  const [terms, setTerms] = useState(false);
  return (
    <Sheet app={app} onClose={onClose} title="มั่นใจทุกการสั่งซื้อกับไทยมาร์ท" footer={(close) => <button className="btn-primary block" onClick={close}>เข้าใจแล้ว</button>}>
      <h2 className="ts-title ts-head">มั่นใจทุกการสั่งซื้อกับไทยมาร์ท</h2>

      <div className="ts-row">
        <div className="ts-mark stack"><ElephantSeal size={32} /><GenuineFlag scale={0.9} /></div>
        <div>
          <b>ของแท้ต้องไทยมาร์ท</b>
          <p>สินค้านี้ผ่านการตรวจสอบหลักฐานแหล่งที่มาและเอกสารที่เกี่ยวข้องโดย Thaimart<br />หากพบของปลอม คืนเงิน 2 เท่า*</p>
        </div>
      </div>

      <div className="ts-row">
        <div className="ts-mark"><X2Seal size={32} /></div>
        <div>
          <b>ปลอมคืนเงิน 2 เท่า</b>
          <button className="ts-link" aria-expanded={terms} onClick={() => setTerms(!terms)}>
            <span>ดูเงื่อนไขการคืนเงิน 2 เท่า</span><i className="o-ic ts-chev" style={{ width: 20, height: 20, WebkitMaskImage: `url("${A('assets/icons/chevron_left.svg')}")`, maskImage: `url("${A('assets/icons/chevron_left.svg')}")`, transform: `rotate(${terms ? 90 : -90}deg)` }} aria-hidden="true" />
          </button>
          {terms && (
            <div className="ts-terms">
              <div className="ts-term"><Icon name="check-circle" size={20} /><div><b>ได้รับสิทธิ์เมื่อ</b><ul><li>สั่งซื้อสินค้าที่มีสถานะ ของแท้ต้องไทยมาร์ท</li><li>Thaimart ตรวจสอบและยืนยันว่าสินค้าไม่ใช่ของแท้</li></ul></div></div>
              <div className="ts-term"><Icon name="coin" size={20} /><div><b>สิ่งที่จะได้รับ</b><p>รับคืนเป็นเงินมูลค่า 2 เท่าของมูลค่าสินค้า</p></div></div>
              <div className="ts-term"><Icon name="clipboard-text" size={20} /><div><b>ขั้นตอนการขอรับสิทธิ์</b><ol><li>แจ้งปัญหาผ่านรายละเอียดคำสั่งซื้อ</li><li>ส่งหลักฐานและคืนสินค้าตามขั้นตอนที่กำหนด</li><li>รอ Thaimart ตรวจสอบและแจ้งผล</li></ol></div></div>
              <p className="ts-fine">* สิทธิ์และการคืนเงินเป็นไปตามเงื่อนไขที่กำหนด</p>
            </div>
          )}
        </div>
      </div>

      <div className="ts-div" />
      <h3 className="ts-h ts-head">ป้ายร้านค้า</h3>
      <div className="ts-row">
        <div className="ts-mark"><ShopTag kind="official" h={20} /></div>
        <div><b>ร้านค้าทางการ</b><p>ร้านนี้เป็นเจ้าของแบรนด์ ผู้นำเข้า หรือผู้จัดจำหน่าย แต่เพียงผู้เดียวในประเทศไทย</p></div>
      </div>
      <div className="ts-row">
        <div className="ts-mark"><ShopTag kind="mall" h={20} /></div>
        <div><b>ตัวแทนจำหน่าย</b><p>ร้านนี้เป็นเจ้าของแบรนด์ ผู้นำเข้า หรือผู้จัดจำหน่าย แต่เพียงผู้เดียวในประเทศไทย</p></div>
      </div>
      <div className="ts-row">
        <div className="ts-mark"><img src={A('assets/icons/verified_seal.svg')} width="24" height="24" alt="" /></div>
        <div><b>ยืนยันตัวตน</b><p>ร้านค้านี้ผ่านการตรวจสอบตัวตนและเอกสารตามเกณฑ์ของ Thaimart<br />* สถานะนี้ไม่ใช่การรับรองสินค้า</p></div>
      </div>

      <div className="ts-div" />
      <h3 className="ts-h ts-head">รองรับ มอก. และ อย.</h3>
      <p className="ts-note">สินค้าที่ต้องมีเครื่องหมายรับรอง จะแสดงสัญลักษณ์บนรูปสินค้า</p>
      <div className="ts-certs">
        <div className="ts-cert"><TrustIcon k="tis" size={32} /><div><b>มอก.</b><span>มาตรฐานผลิตภัณฑ์อุตสาหกรรม</span></div></div>
        <div className="ts-cert"><TrustIcon k="fda" size={32} /><div><b>อย.</b><span>อาหารและยา</span></div></div>
      </div>
    </Sheet>
  );
}

function LoginSheet({ app, action, onClose }) {
  return (
    <Sheet app={app} onClose={onClose} title="เข้าสู่ระบบ">
      {(close) => (
        <>
          <button className="gf-close lgs-x" aria-label="ปิด" onClick={close}><Icon name="x" size={22} /></button>
          <h2 className="ts-title center">เข้าสู่ระบบเพื่อใช้งานต่อ</h2>
          <p className="ts-note center">ติดตามร้าน เพิ่มของใส่ตะกร้า และดูคำสั่งซื้อได้</p>
          <button className="btn-primary block" style={{ marginTop: 20 }} onClick={() => { close(); setTimeout(() => app.loginPage(action), 260); }}>เข้าสู่ระบบ / สมัครสมาชิก</button>
          <button className="btn-quiet block" onClick={close}>ไว้ก่อน</button>
        </>
      )}
    </Sheet>
  );
}

// ── Skeleton: grey shapes with a moving shine ──
const Sk = ({ w, h, r = 8, style }) => <span className="sk" style={{ width: w, height: h, borderRadius: r, ...style }} />;

// ── Preview: case switches, bottom-left ──
function CasePanel({ app }) {
  const [open, setOpen] = useState(false);
  const rows = [
    ['loggedIn', 'ล็อกอินแล้ว'],
    ['newUser', 'สมัครครั้งแรก (สร้างโปรไฟล์)'],
    ['campaign', 'มีแคมเปญ'],
    ['hasBrands', 'มีแบรนด์ร่วมรายการ'],
    ['hasProducts', 'มีสินค้าร่วมแคมเปญ'],
    ['following', 'ติดตามร้านแล้ว'],
    ['web', 'แบบเว็บ (จอคอม)'],
    ['noAddress', 'ยังไม่มีที่อยู่จัดส่ง'],
    ['maxUnpaid', 'ค้างชำระครบ 5 คำสั่งซื้อ'],
    ['followReq', 'มีคำขอติดตาม'],
    ['savedCard', 'บันทึกบัตรไว้แล้ว'],
    ['manyCards', 'บันทึกไว้หลายบัตร'],
    ['affNone', 'ยังไม่สมัคร Affiliate'],
    ['affNew', 'Affiliate เพิ่งเริ่ม (ยังไม่มีรายได้)'],
  ];
  return (
    <div className={`cases ${open ? 'open' : ''}`}>
      <button className="cases-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        <Icon name="sliders-horizontal" size={18} /> {open ? 'ปิด' : 'สลับกรณี'}
      </button>
      {open && (
        <div className="cases-list">
          {rows.map(([k, label]) => (
            <label key={k} className="sw">
              <span>{label}</span>
              <input type="checkbox" role="switch" checked={app.cases[k]} onChange={(e) => app.setCase(k, e.target.checked, k !== 'newUser' && k !== 'maxUnpaid' && k !== 'followReq' && k !== 'affNew' && k !== 'affNone' && k !== 'savedCard' && k !== 'manyCards' && k !== 'noAddress')} />
              <i aria-hidden="true" />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Modal, Fire, CartIcon, A, baht, grouped, compact, discountLabel, Icon, RoundBtn, Logo, MobileHeader, BottomNav, WebHeader, Footer, DiscountPill, ProductImage, ProductCard, DealCard, Masonry, Meta, Countdown, Sheet, TrustSheet, LoginSheet, Sk, CasePanel });
