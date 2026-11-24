// เลือกตัวเลือกสินค้า: bottom sheet opened by every add-to-cart button (and ซื้อเลย on the product page).

// One order line: at most 20 pieces. Pressing + past that explains why.
const QTY_MAX = 20;
const TooManyModal = ({ app, onClose }) => (
  <Modal app={app} title={`สั่งซื้อได้ไม่เกิน ${QTY_MAX} รายการต่อครั้ง`} text="กรุณาลดจำนวน หรือแยกคำสั่งซื้อ" cancel={null} ok="เข้าใจแล้ว" onClose={onClose} onOk={onClose} />
);
// Pick colour, size and quantity, then add to the cart. Options and stock are mock data.

const SIZES = ['S', 'M', 'L', 'XL'];
const sw = (name, hex, img) => ({ name, hex, img: img && `assets/images/variants/${img}.jpg` });

/** Option groups per product id. Products not listed have no options, only quantity. */
const PRODUCT_OPTIONS = {
  4: [{ label: 'สี', items: [sw('ครามเข้ม', '#22355E', 'p4_dark'), sw('ครามอ่อน', '#5E7FB0', 'p4_light')] }, { label: 'ไซส์', items: SIZES }],
  10: [{ label: 'สี', items: [sw('น้ำตาล', '#8A5A3B', 'p10_brown'), sw('ดำ', '#1E1E1E', 'p10_black'), sw('ครีม', '#E9DCC6', 'p10_cream')] }],
  11: [{ label: 'สี', items: [sw('ชมพูกุหลาบ', '#C9566B', 'p11_rose'), sw('แดงอิฐ', '#A63A2B', 'p11_brick'), sw('นู้ดพีช', '#D99A82', 'p11_peach')] }],
  12: [{ label: 'สี', items: [sw('ยีนส์กลาง', '#5B7DA6', 'p12_mid'), sw('ยีนส์เข้ม', '#2D3E5C', 'p12_dark')] }, { label: 'ไซส์', items: ['26', '27', '28', '29', '30', '32'] }],
  17: [{ label: 'ไซส์', items: ['S', 'M', 'L'] }],
  19: [{ label: 'สี', items: [sw('ขาว', '#F2F2F2', 'p19_white'), sw('ดำ', '#1E1E1E', 'p19_black')] }],
  21: [{ label: 'สี', items: [sw('ขาว', '#FAFAFA', 'p21_white'), sw('ครีม', '#EFE6D6', 'p21_cream')] }, { label: 'ไซส์', items: SIZES }],
  29: [{ label: 'ขนาด', items: [{ name: '30 มล.' }, { name: '50 มล.', add: 150 }] }],
  30: [{ label: 'ระดับการคั่ว', items: ['คั่วอ่อน', 'คั่วกลาง', 'คั่วเข้ม'] }],
  31: [{ label: 'ไซส์', items: ['36', '37', '38', '39', '40', '41', '42'] }],
  33: [{ label: 'สี', items: [sw('ดำ', '#1E1E1E', 'p33_black'), sw('กรมท่า', '#24304A', 'p33_navy')] }, { label: 'ไซส์', items: SIZES }],
  37: [{ label: 'ไซส์', items: ['S', 'M', 'L', 'XL'] }],
  38: [{ label: 'สี', items: [sw('ขาว', '#F4F4F2', 'p38_white'), sw('เทา', '#9A9DA3', 'p38_grey')] }],
  40: [{ label: 'สี', items: [sw('ดำ', '#1E1E1E', 'p40_black'), sw('เงิน', '#C7CBD1', 'p40_silver'), sw('ชมพู', '#E8B4B8', 'p40_pink')] }],
  48: [{ label: 'ไซส์', items: SIZES }],
  49: [{ label: 'ไซส์', items: SIZES }],
  50: [{ label: 'สี', items: [sw('ครีม', '#EFE6D6', 'p50_cream'), sw('ดำ', '#1E1E1E', 'p50_black'), sw('เทา', '#A7A9AC', 'p50_grey')] }, { label: 'ไซส์', items: SIZES }],
  51: [{ label: 'ไซส์', items: SIZES }],
  66: [{ label: 'ไซส์', items: ['S', 'M', 'L'] }],
};
const optionsOf = (id) => (PRODUCT_OPTIONS[id] || []).map((g) => ({ ...g, items: g.items.map((it) => (typeof it === 'string' ? { name: it } : it)) }));

/** Mock stock for a full choice: stable per product and choice, with the odd one sold out. */
function stockOf(id, picks) {
  const key = id + ':' + picks.join('|');
  let h = 7;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  if (picks.length && h % 7 === 0) return 0;
  return 3 + (h % 38);
}

/** The cart (prototype only, kept for this visit). Seeded with a few items; the add sheet adds more.
 *  line: { key, id, options[], qty, price, on }. Changes fire 'cart-change' so the header count updates. */
const CART = [
  { key: 'c1', id: 38, options: ['ขาว'], qty: 1, price: 2999, on: true },
  { key: 'c2', id: 29, options: ['30 มล.'], qty: 2, price: 312, on: true },
  { key: 'c3', id: 8, options: [], qty: 1, price: 254, on: true },
  { key: 'c4', id: 30, options: ['คั่วกลาง'], qty: 1, price: 280, on: false },
  { key: 'c5', id: 21, options: ['ขาว', 'M'], qty: 1, price: 490, on: false },
];
window.CART = CART;
/** Items that can't be bought any more: 'gone' = listing removed, 'out' = sold out. */
const CART_UNAVAIL = [
  { key: 'u1', id: 25, options: [], reason: 'gone' },
  { key: 'u2', id: 50, options: ['ครีม', 'M'], reason: 'out' },
];
const cartChanged = () => dispatchEvent(new Event('cart-change'));
const cartCount = () => CART.reduce((n, l) => n + l.qty, 0);
/** Re-render on cart changes. */
function useCart() {
  const [, bump] = useState(0);
  useEffect(() => { const f = () => bump((n) => n + 1); addEventListener('cart-change', f); return () => removeEventListener('cart-change', f); }, []);
  return CART;
}

/** Size chart picture for a size group: shoes (36–42), jeans (waist 26–32) or clothes (S–XL). */
const sizeChartOf = (items) => {
  const n = items.map((it) => parseFloat(it.name));
  if (n.every((x) => !isNaN(x))) return n[0] >= 34 ? 'shoes' : 'pants';
  return 'clothes';
};
const SIZE_CHART_ALT = {
  clothes: 'ตารางขนาดเสื้อผ้า หน่วยนิ้ว S รอบอก 32–34 M 34–36 L 36–38 XL 38–40',
  pants: 'ตารางขนาดกางเกงยีนส์ ไซส์ 26 ถึง 32 ตามรอบเอวเป็นนิ้ว',
  shoes: 'ตารางขนาดรองเท้า EU 36 ถึง 42 ความยาวเท้า 22.5 ถึง 26.5 ซม.',
};

/** ตารางขนาดสินค้า: the size chart picture, over everything, tap ✕ or outside to close. */
function SizeChart({ app, kind, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, []);
  const host = (!app.cases.web && document.querySelector('.phone')) || document.body;
  return ReactDOM.createPortal(
    <div className={`szc ${app.cases.web ? 'web' : ''}`} role="dialog" aria-modal="true" aria-label="ตารางขนาดสินค้า" onClick={onClose}>
      <div className="szc-card" onClick={(e) => e.stopPropagation()}>
        <div className="szc-hd">
          <b>ตารางขนาดสินค้า</b>
          <button className="gf-close" aria-label="ปิด" onClick={onClose}><Icon name="x" size={20} /></button>
        </div>
        <img src={A(`assets/images/sizechart/${kind}.png`)} alt={SIZE_CHART_ALT[kind]} />
      </div>
    </div>,
    host,
  );
}

function CartSheet({ app, id, mode = 'cart', onClose }) {
  const [chart, setChart] = useState(null);
  const p = DATA.products[id];
  const groups = optionsOf(id);
  const [picks, setPicks] = useState(() => groups.map((g) => (g.items.length === 1 ? 0 : null)));
  const [qty, setQty] = useState(1);
  const [hint, setHint] = useState(false);

  const chosen = picks.every((k) => k != null);
  const names = picks.map((k, gi) => (k == null ? null : groups[gi].items[k].name));
  const stock = chosen ? stockOf(id, names) : null;
  const add = picks.reduce((n, k, gi) => n + (k == null ? 0 : groups[gi].items[k].add || 0), 0);
  const price = p.price + add;
  const orig = p.discount ? p.originalPrice + add : null;
  const missing = groups.filter((_, gi) => picks[gi] == null).map((g) => g.label);
  const max = stock ?? 99;
  const [tooMany, setTooMany] = useState(false);
  // Photo on top: the picked option's photo, else the product photo.
  const pickedImg = picks.map((k, gi) => (k == null ? null : groups[gi].items[k].img)).find(Boolean);

  // Would this item still have stock with the other choices made so far?
  const soldOut = (gi, k) => {
    const test = picks.map((v, j) => (j === gi ? k : v));
    if (test.some((v) => v == null)) return false;
    return stockOf(id, test.map((v, j) => groups[j].items[v].name)) === 0;
  };
  const pick = (gi, k) => {
    setPicks((ps) => ps.map((v, j) => (j === gi ? (v === k ? null : k) : v)));
    setHint(false);
  };
  useEffect(() => { if (stock != null && qty > stock) setQty(Math.max(1, stock)); }, [stock]);

  const confirm = (close) => {
    if (!chosen) return setHint(true);
    if (stock === 0) return;
    if (!app.cases.loggedIn) { close(); window.LOGIN_NEXT = { why: mode === 'buy' ? 'สั่งซื้อสินค้านี้' : 'เพิ่มสินค้าลงตะกร้า', cart: { id, mode } }; return setTimeout(() => app.go('/login'), 260); }
    if (mode === 'cart') {
      const same = CART.find((l) => l.id === id && l.options.join('|') === names.join('|'));
      if (same) same.qty += qty; else CART.unshift({ key: 'c' + Date.now(), id, options: names, qty, price, on: true });
      cartChanged();
    }
    close();
    if (mode === 'buy') { window.CHECKOUT = { lines: [{ key: 'b' + Date.now(), id, options: names, qty, price }] }; return setTimeout(() => app.go('/checkout'), 260); }
    app.toast('เพิ่มลงตะกร้าแล้ว');
  };

  const label = mode === 'buy' ? 'ซื้อเลย' : 'เพิ่มลงตะกร้า';
  return (
    <Sheet app={app} onClose={onClose} title={`เลือกตัวเลือก ${p.title}`} height={604} /* one height for every product, same as สินค้าในไลฟ์ */
      footer={(close) => (
        <div className="ct-foot">
          {hint && <p className="ct-hint" role="alert">เลือก{missing.join(' และ ')}ก่อนนะ</p>}
          <button className="btn-primary block" disabled={stock === 0} onClick={() => confirm(close)}>
            {stock === 0 ? 'สินค้าหมด' : `${label} · ${baht(price * qty)}`}
          </button>
        </div>
      )}>
      {(close) => (
        <>
          <div className="ct-head">
            <img key={pickedImg || p.image} className="ct-photo" src={A(pickedImg || p.image)} alt={names.filter(Boolean).join(' ') || ''} />
            <div className="ct-head-mid">
              {/* Price; struck price + discount tag; free shipping; picked options (or what to pick) and stock. */}
              <span className="ct-price"><span className="now">{baht(price)}</span></span>
              {orig && <span className="ct-was"><s>{baht(orig)}</s>{p.discount && <span className="ct-disc">{discountLabel(p.discount)}</span>}</span>}
              {p.trust.includes('truck') && <span className="ct-shipline free"><span className="ct-truck"><img src={A('assets/icons/delivery_truck.svg')} width="16" height="16" alt="" /></span>จัดส่งฟรี</span>}
              <span className="ct-picked ellipsis">
                {names.some(Boolean) ? names.filter(Boolean).join(', ') : `เลือก${missing.join(' ')}`}
                {stock != null && <span className="ct-stock"> · {stock === 0 ? 'ตัวเลือกนี้หมดแล้ว' : `เหลือ ${stock} ชิ้น`}</span>}
              </span>
            </div>
            <button className="gf-close ct-x" aria-label="ปิด" onClick={close}><Icon name="x" size={20} /></button>
          </div>

          {groups.map((g, gi) => (
            <section className="ct-group" key={g.label} aria-label={g.label}>
              <h3>{g.label}{g.label === 'ไซส์' && <button className="ct-szc" onClick={() => setChart(sizeChartOf(g.items))}>ตารางขนาดสินค้า<Icon name="caret-right" size={14} /></button>}</h3>
              <div className="ct-chips" role="radiogroup" aria-label={g.label}>
                {g.items.map((it, k) => {
                  const out = soldOut(gi, k);
                  return (
                    <button key={it.name} role="radio" aria-checked={picks[gi] === k} disabled={out}
                      className={`ct-chip ${it.img ? 'img' : ''} ${picks[gi] === k ? 'on' : ''} ${hint && picks[gi] == null ? 'need' : ''}`} onClick={() => pick(gi, k)}>
                      {it.img ? (
                        // Photo option: the photo as big as the one in the header, the name under it.
                        <>
                          <img src={A(it.img)} alt="" />
                          <span className="ct-chip-name">{it.name}{out && <small>หมด</small>}</span>
                        </>
                      ) : (
                        <>
                          {it.hex && <i className="ct-sw" style={{ background: it.hex }} aria-hidden="true" />}
                          {it.name}
                          
                          {out && <small>หมด</small>}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          <section className="ct-group ct-qty-row">
            <h3>จำนวน</h3>
            <div className="ct-stepper">
              <button aria-label="ลดจำนวน" disabled={qty <= 1} onClick={() => setQty(qty - 1)}><Icon name="minus" size={18} /></button>
              <output aria-live="polite" aria-label={`จำนวน ${qty} ชิ้น`}>{qty}</output>
              <button aria-label="เพิ่มจำนวน" disabled={qty >= max || stock === 0} onClick={() => (qty >= QTY_MAX ? setTooMany(true) : setQty(qty + 1))}><Icon name="plus" size={18} /></button>
            </div>
          </section>
          {stock != null && stock > 0 && qty >= stock && <p className="ct-max">ซื้อได้สูงสุด {stock} ชิ้น</p>}
          {chart && <SizeChart app={app} kind={chart} onClose={() => setChart(null)} />}
          {tooMany && <TooManyModal app={app} onClose={() => setTooMany(false)} />}
        </>
      )}
    </Sheet>
  );
}

/** App-wide short message at the bottom of the screen. */
function Toast({ text }) {
  return text ? <p className="app-toast" role="status">{text}</p> : null;
}

Object.assign(window, { CartSheet, Toast, PRODUCT_OPTIONS, useCart, cartCount, cartChanged });

// ════════ ตะกร้า (#/cart) ════════
// Kit cart: shop groups with a select box, items with options + stepper, coupon hint, pay bar.

const SHOP_SHIP = { 'PetCare Official Store': 0, 'Beauty Corner': 0, 'Daily Fashion': 0 }; // others ฿35
const SHOP_COUPON = { 'PetCare Official Store': { off: 200, min: 2000 }, 'Beauty Corner': { off: 50, min: 500 } };

function Check({ on, mixed, onChange, label }) {
  return (
    <button className={`ck ${on ? 'on' : ''} ${mixed ? 'mixed' : ''}`} role="checkbox" aria-checked={mixed ? 'mixed' : on} aria-label={label} onClick={onChange}>
      {(on || mixed) && <Icon name={mixed ? 'minus' : 'check'} size={16} />}
    </button>
  );
}

function CartBody({ app }) {
  const cart = useCart();
  const [confirmDel, setConfirmDel] = useState(null);
  const [tooMany, setTooMany] = useState(false); // tried to go over 20 pieces
  const [unpaid, setUnpaid] = useState(false); // 5 orders waiting for payment: pay those first
  // Same shop data as its shop page (badge included), so the cart and the page agree.
  const shopOf = (l) => { const n = DATA.detailFor(l.id).shop?.name; return n ? shopByName(n) : { name: 'Thaimart' }; };
  const groups = [];
  cart.forEach((l) => {
    const sh = shopOf(l);
    let g = groups.find((x) => x.shop.name === sh.name);
    if (!g) groups.push((g = { shop: sh, lines: [] }));
    g.lines.push(l);
  });
  const set = (fn) => { fn(); cartChanged(); };
  const picked = cart.filter((l) => l.on);
  const total = picked.reduce((n, l) => n + l.price * l.qty, 0);
  const pieces = picked.reduce((n, l) => n + l.qty, 0);
  // Savings on the ticked items (struck price − price), and shipping for shops that have a ticked item.
  const saved = picked.reduce((n, l) => { const p = DATA.products[l.id]; return n + (p.discount ? (p.originalPrice - p.price) * l.qty : 0); }, 0);
  const shipAll = [...new Set(picked.map((l) => shopOf(l).name))].reduce((n, name) => n + (SHOP_SHIP[name] ?? 35), 0);
  const all = cart.length > 0 && picked.length === cart.length;
  const some = picked.length > 0 && !all;

  if (!cart.length) {
    return (
      <div className="ct-empty">
        <span className="ct-empty-ic"><CartIcon size={40} /></span>
        <b>ตะกร้ายังว่างอยู่</b>
        <p>เลือกของที่ชอบแล้วกดเพิ่มลงตะกร้าได้เลย</p>
        <button className="btn-primary" onClick={() => app.go('/')}>เลือกซื้อสินค้า</button>
      </div>
    );
  }

  return (
    <>
      {groups.map((g) => {
        const gOn = g.lines.every((l) => l.on), gSome = !gOn && g.lines.some((l) => l.on);
        const coupon = SHOP_COUPON[g.shop.name];
        const gTotal = g.lines.filter((l) => l.on).reduce((n, l) => n + l.price * l.qty, 0);
        return (
          <section className="ct-shop" key={g.shop.name}>
            <header className="ct-shop-hd">
              <Check on={gOn} mixed={gSome} label={`เลือกทั้งร้าน ${g.shop.name}`} onChange={() => set(() => g.lines.forEach((l) => (l.on = !gOn)))} />
              {/* Badge + name + › open the shop's profile page. */}
              <a className="ct-shop-go" href={'#' + shopHref(g.shop.name)} aria-label={`ดูหน้าร้าน ${g.shop.name}`}>
                {g.shop.badge && <ShopTag kind={g.shop.badge} h={16} />}
                <b className="ellipsis">{g.shop.name}</b>
                <Icon name="caret-right" size={16} />
              </a>
            </header>
            {g.lines.map((l) => {
              const p = DATA.products[l.id];
              const orig = p.discount ? p.originalPrice + (l.price - p.price) : null;
              return (
                <div className="ct-line" key={l.key}>
                  <Check on={l.on} label={`เลือก ${p.title}`} onChange={() => set(() => (l.on = !l.on))} />
                  <a className="ct-line-img" href={`#/product/${l.id}`}><ProductImage p={p} /></a>
                  <div className="ct-line-mid">
                    <a className="clamp2" href={`#/product/${l.id}`}>{p.title}</a>
                    {l.options.length > 0 && <button className="ct-opt" onClick={() => app.cart(l.id)}>{l.options.join(' · ')}<Icon name="caret-down" size={14} /></button>}
                    <div className="ct-line-row">
                      <span className="ct-line-price">
                        <b>{baht(l.price)}</b>
                        {orig && <span className="ct-was"><s>{baht(orig)}</s>{p.discount && <span className="ct-disc" aria-label={`ลด ${discountLabel(p.discount)}`}>{discountLabel(p.discount)}</span>}</span>}
                      </span>
                      <div className="ct-step">
                        <button aria-label={l.qty === 1 ? `ลบ ${p.title}` : 'ลดจำนวน'} onClick={() => (l.qty === 1 ? setConfirmDel(l) : set(() => l.qty--))}>
                          <Icon name="minus" size={18} />
                        </button>
                        <output aria-label={`จำนวน ${l.qty}`}>{l.qty}</output>
                        <button aria-label="เพิ่มจำนวน" onClick={() => (l.qty >= QTY_MAX ? setTooMany(true) : set(() => l.qty++))}><Icon name="plus" size={18} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {coupon && (
              <p className={`ct-coupon ${gTotal >= coupon.min ? 'ok' : ''}`}>
                <i className="o-ic ct-coupon-ic" style={{ width: 20, height: 20, WebkitMaskImage: `url("${A('assets/icons/coupon_percent.svg')}")`, maskImage: `url("${A('assets/icons/coupon_percent.svg')}")` }} aria-hidden="true" />
                {gTotal >= coupon.min
                  ? <span>ใช้คูปองร้าน ลด <em>−{baht(coupon.off)}</em> แล้ว</span>
                  : <span>ซื้ออีก {baht(coupon.min - gTotal)} รับคูปองร้าน ลด <em>−{baht(coupon.off)}</em></span>}
              </p>
            )}
          </section>
        );
      })}

      {CART_UNAVAIL.length > 0 && (
        <section className="ct-shop ct-na" aria-label="สินค้าที่ไม่พร้อมจำหน่าย">
          <header className="ct-na-hd">
            <b>สินค้าที่ไม่พร้อมจำหน่าย ({CART_UNAVAIL.length})</b>
            <button className="ct-na-all" onClick={() => set(() => CART_UNAVAIL.splice(0))}>ลบทั้งหมด</button>
          </header>
          {CART_UNAVAIL.map((u) => {
            const p = DATA.products[u.id];
            return (
              <div className="ct-line ct-na-line" key={u.key}>
                <span className="ct-ck-sp" aria-hidden="true" />
                <span className="ct-line-img"><ProductImage p={p} /><span className="ct-na-tag">{u.reason === 'gone' ? 'ไม่พบสินค้า' : 'สินค้าหมด'}</span></span>
                <div className="ct-line-mid">
                  <span className="clamp2">{p.title}</span>
                  {u.options.length > 0 && <small>{u.options.join(' · ')}</small>}
                  <div className="ct-line-row">
                    {u.reason === 'out' ? <b className="ct-na-price">{baht(p.price)}</b> : <span />}
                    <button className="ct-na-del" aria-label={`ลบ ${p.title}`} onClick={() => set(() => CART_UNAVAIL.splice(CART_UNAVAIL.indexOf(u), 1))}>ลบ</button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      <div className="ct-bar">
        <label className="ct-all"><Check on={all} mixed={some} label="เลือกทั้งหมด" onChange={() => set(() => cart.forEach((l) => (l.on = !all)))} /><span>ทั้งหมด</span></label>
        <div className="ct-sum">
          <b>{baht(total)}</b>
          {saved > 0 && <span className="ct-save">ส่วนลด {baht(saved)}</span>}
          {pieces > 0 && (shipAll ? <span className="ct-shipline">ค่าส่ง {baht(shipAll)}</span> : <span className="ct-shipline free"><span className="ct-truck"><img src={A('assets/icons/delivery_truck.svg')} width="16" height="16" alt="" /></span>จัดส่งฟรี</span>)}
        </div>
        <button className="btn-primary ct-pay" disabled={!pieces} onClick={() => { if (app.cases.maxUnpaid) return setUnpaid(true); window.CHECKOUT = null; app.go('/checkout'); }}>ชำระเงิน</button>
      </div>

      {tooMany && <TooManyModal app={app} onClose={() => setTooMany(false)} />}
      {unpaid && (
        <Modal app={app} title="มีคำสั่งซื้อรอชำระ 5 คำสั่งซื้อ" onClose={() => setUnpaid(false)}
          text="ระบบจำกัดการค้างชำระสูงสุด 5 คำสั่งซื้อ โปรดชำระยอดเดิมก่อนทำรายการถัดไป"
          cancel="ไว้ทีหลัง" ok="ไปที่ต้องชำระ" onOk={() => { setUnpaid(false); window.ORDERS_TAB = 'pay'; app.go('/tab/orders'); }} />
      )}
      {confirmDel && (
        <Sheet app={app} onClose={() => setConfirmDel(null)} title="ลบสินค้าออกจากตะกร้า"
          footer={(close) => (
            <div className="ct-del-btns">
              <button className="btn-line" onClick={close}>ยกเลิก</button>
              <button className="btn-primary" onClick={() => { const i = CART.indexOf(confirmDel); if (i >= 0) CART.splice(i, 1); cartChanged(); close(); }}>ลบ</button>
            </div>
          )}>
          <h2 className="ct-del-title">ลบสินค้านี้ออกจากตะกร้าไหม</h2>
          <p className="ct-del-sub">{DATA.products[confirmDel.id].title}</p>
        </Sheet>
      )}
    </>
  );
}

function CartPage({ app }) {
  const cart = useCart();
  if (app.cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="home" />
        <main className="wrap w-cart"><h1 className="w-cart-title">ตะกร้า ({cart.length})</h1><CartBody app={app} /></main>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <header className="m-hd ct-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={24} /></button>
          <b className="ct-title">ตะกร้า ({cart.length})</b>
          <button className="round-btn ghost ct-chat" aria-label="กล่องข้อความ" onClick={() => app.openTab('inbox')}><i className="o-ic" style={{ width: 24, height: 24, WebkitMaskImage: `url("${A('assets/icons/nav_inbox.svg')}")`, maskImage: `url("${A('assets/icons/nav_inbox.svg')}")` }} aria-hidden="true" /></button>
        </div>
      </header>
      <div className="m-scroll ct-page"><CartBody app={app} /></div>
    </>
  );
}

window.CartPage = CartPage;
