// ชำระเงิน (#/checkout): opened by ชำระเงิน in the cart and by ซื้อเลย in the options sheet.
// Address, items per shop with shipping, Thaimart coupon, payment method, price summary, escrow note, order bar.
// The lines come from window.CHECKOUT (set right before opening); without it, the ticked cart lines.

const CO_COUPON = { off: 100, min: 1000, until: '30 พ.ย. 2569' };
const CO_PAY = [
  { k: 'pp', logo: 'assets/images/pay/promptpay.png', name: 'PromptPay', sub: 'สแกนจ่ายผ่านแอปธนาคาร', mark: 'QR', cls: 'pp' },
  { k: 'card', name: 'บัตร Visa •••• 4821', sub: 'บันทึกบัตรไว้แล้ว จ่ายได้ทันที', svg: 'pay_card', cls: 'cod' },
  { k: 'cod', name: 'เก็บเงินปลายทาง', sub: 'ยอดไม่เกิน ฿5,000', svg: 'pay_cod', cls: 'cod', max: 5000 },
];
// Delivery date range: 2–4 days from today, in Thai.
const coDays = (from = 2, to = 4) => {
  const m = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const d = (n) => { const x = new Date(Date.now() + n * 864e5); return [x.getDate(), m[x.getMonth()]]; };
  const [a, am] = d(from), [b, bm] = d(to);
  return am === bm ? `${a}–${b} ${bm}` : `${a} ${am} – ${b} ${bm}`;
};

// Courier per shop (mock): name and the normal fee before any free shipping.
// Couriers (mock): normal fee and delivery days from today. A shop with free shipping pays the fee itself.
const COURIERS = [
  { k: 'flash', logo: 'assets/images/couriers/flash.png', name: 'Flash Express', fee: 45, days: [2, 3] },
  { k: 'kex', logo: 'assets/images/couriers/kex.png', name: 'KEX Express', fee: 50, days: [2, 3] },
  { k: 'jt', logo: 'assets/images/couriers/jt.png', name: 'J&T Express', fee: 40, days: [3, 4] },
  { k: 'post', logo: 'assets/images/couriers/post.png', name: 'Thailand Post', fee: 35, days: [3, 5] },
];
const CO_COURIER_SEL = {}; // shop name → courier key
const courierOf = (shop) => COURIERS.find((c) => c.k === CO_COURIER_SEL[shop]) || COURIERS[0];
const shopFreeShip = (shop) => SHOP_SHIP[shop] === 0;

/** เลือกขนส่ง: one card per courier, the current one highlighted; tap to pick. */
function CourierSheet({ app, shop, onPick, onClose }) {
  const cur = courierOf(shop);
  const free = shopFreeShip(shop);
  return (
    <Sheet app={app} onClose={onClose} title="เลือกขนส่ง">
      {(close) => (
        <div className="cs">
          <div className="nt-hd"><b>เลือกขนส่ง</b><button className="gf-close" aria-label="ปิด" onClick={close}><Icon name="x" size={22} /></button></div>
          <div className="cs-list" role="radiogroup" aria-label="ขนส่ง">
            {COURIERS.map((c) => (
              <button key={c.k} role="radio" aria-checked={cur.k === c.k} className={`cs-item ${cur.k === c.k ? 'on' : ''}`} onClick={() => { onPick(c.k); close(); }}>
                <img className="cr-logo" src={A(c.logo)} alt="" />
                <span className="cs-mid"><b>{c.name}</b><small>ได้รับประมาณ {coDays(...c.days)}</small></span>
                <span className="cs-fee">{free ? <><b>ส่งฟรี</b><s>{baht(c.fee)}</s></> : <b>{baht(c.fee)}</b>}</span>
                <i className="co-radio" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}
    </Sheet>
  );
}

const CO_CARD = { added: [], sel: null }; // cards added at checkout this visit, and the picked card id
/** Saved cards for the preview cases, then any added this visit. */
const cardsFor = (cases) => [
  ...(cases.savedCard || cases.manyCards ? [{ id: 'v4821', brand: 'Visa', last4: '4821', exp: '08/28', save: true }] : []),
  ...(cases.manyCards ? [
    { id: 'm5544', brand: 'Mastercard', last4: '5544', exp: '03/27', save: true },
    { id: 'j0031', brand: 'JCB', last4: '0031', exp: '11/29', save: true },
  ] : []),
  ...CO_CARD.added,
];
const CardIc = () => <i className="o-ic" style={{ width: 26, height: 26, WebkitMaskImage: `url("${A('assets/icons/pay_card.svg')}")`, maskImage: `url("${A('assets/icons/pay_card.svg')}")` }} aria-hidden="true" />;

/** เลือกบัตร: saved cards with a radio, the first is the default; เพิ่มบัตรใหม่ at the end. */
function CardSheet({ app, cards, sel, onPick, onAdd, onClose }) {
  return (
    <Sheet app={app} onClose={onClose} title="เลือกบัตร">
      {(close) => (
        <div className="cs">
          <div className="nt-hd"><b>เลือกบัตร</b><button className="gf-close" aria-label="ปิด" onClick={close}><Icon name="x" size={22} /></button></div>
          <div className="cs-list" role="radiogroup" aria-label="บัตรที่บันทึกไว้">
            {cards.map((c, i) => (
              <button key={c.id} role="radio" aria-checked={sel === c.id} className={`cs-item ${sel === c.id ? 'on' : ''}`} onClick={() => { onPick(c.id); close(); }}>
                <span className="co-pay-mk cod"><CardIc /></span>
                <span className="cs-mid">
                  <b>{c.brand} •••• {c.last4}{i === 0 && <span className="cd-def">ค่าเริ่มต้น</span>}</b>
                  <small>{c.exp ? `หมดอายุ ${c.exp}` : c.save ? 'บันทึกไว้แล้ว' : 'ใช้กับคำสั่งซื้อนี้'}</small>
                </span>
                <i className="co-radio" aria-hidden="true" />
              </button>
            ))}
            <button className="cs-item cd-add" onClick={() => { close(); setTimeout(onAdd, 280); }}>
              <span className="co-pay-mk cod"><Icon name="plus" size={22} /></span>
              <span className="cs-mid"><b>เพิ่มบัตรใหม่</b></span>
              <Icon name="caret-right" size={18} className="co-go" />
            </button>
          </div>
        </div>
      )}
    </Sheet>
  );
}

// ── เพิ่มบัตร: card number (brand from the first digits, Luhn check), name, expiry, CVV, save for next time ──
const cardBrand = (d) => (/^4/.test(d) ? 'Visa' : /^(5[1-5]|2[2-7])/.test(d) ? 'Mastercard' : /^35/.test(d) ? 'JCB' : /^3[47]/.test(d) ? 'Amex' : null);
const luhnOk = (d) => {
  let sum = 0;
  for (let i = 0; i < d.length; i++) {
    let n = +d[d.length - 1 - i];
    if (i % 2) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
  }
  return sum % 10 === 0;
};
function AddCardSheet({ app, onAdd, onClose }) {
  const [f, setF] = useState({ num: '', name: '', exp: '', cvv: '', save: true });
  const [tried, setTried] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const id = setTimeout(() => ref.current?.focus(), 300); return () => clearTimeout(id); }, []);
  const num = f.num.replace(/\D/g, '');
  const brand = cardBrand(num);
  const [mm, yy] = [f.exp.slice(0, 2), f.exp.slice(3, 5)];
  const now = new Date();
  const expOk = /^\d{2}\/\d{2}$/.test(f.exp) && +mm >= 1 && +mm <= 12 && (2000 + +yy > now.getFullYear() || (2000 + +yy === now.getFullYear() && +mm >= now.getMonth() + 1));
  const cvvLen = brand === 'Amex' ? 4 : 3;
  const errs = {
    num: !num ? 'กรอกหมายเลขบัตร' : num.length < 15 ? 'หมายเลขบัตรยังไม่ครบ' : !luhnOk(num) ? 'หมายเลขบัตรไม่ถูกต้อง ลองตรวจอีกครั้ง' : !brand ? 'รองรับ Visa, Mastercard, JCB และ Amex' : null,
    name: !f.name.trim() ? 'กรอกชื่อบนบัตร' : null,
    exp: !f.exp ? 'กรอกวันหมดอายุ' : !expOk ? 'วันหมดอายุไม่ถูกต้องหรือบัตรหมดอายุแล้ว' : null,
    cvv: f.cvv.length !== cvvLen ? `CVV มี ${cvvLen} หลัก` : null,
  };
  const show = (k) => (tried ? errs[k] : null);
  const fmtNum = (d) => d.replace(/(\d{4})(?=\d)/g, '$1 ');
  const onExp = (v) => {
    let d = toArabic(v).replace(/\D/g, '').slice(0, 4);
    if (d.length === 1 && +d > 1) d = '0' + d; // 3 → 03
    setF({ ...f, exp: d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d });
  };
  return (
    <Sheet app={app} onClose={onClose} title="เพิ่มบัตรเครดิต/เดบิต"
      footer={(close) => (
        <button className="btn-primary block" onClick={() => {
          if (Object.values(errs).some(Boolean)) return setTried(true);
          onAdd({ id: 'n' + Date.now(), brand, last4: num.slice(-4), exp: f.exp, name: f.name.trim(), save: f.save });
          close();
        }}>ยืนยันบัตร</button>
      )}>
      {(close) => (
        <div className="ac">
          <div className="nt-hd"><b>เพิ่มบัตรเครดิต/เดบิต</b><button className="gf-close" aria-label="ปิด" onClick={close}><Icon name="x" size={22} /></button></div>
          <div className="ac-fields">
            <AdField label="หมายเลขบัตร" error={show('num')}>
              <span className="ad-ctl">
                <input ref={ref} value={fmtNum(num)} onChange={(e) => setF({ ...f, num: toArabic(e.target.value).replace(/\D/g, '').slice(0, 19) })} inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" />
                {brand && <span className="ac-brand">{brand}</span>}
              </span>
            </AdField>
            <AdField label="ชื่อบนบัตร" error={show('name')}>
              <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value.toUpperCase() })} autoComplete="cc-name" placeholder="ชื่อ-นามสกุล ตามที่พิมพ์บนบัตร" />
            </AdField>
            <div className="ac-row">
              <AdField label="วันหมดอายุ" error={show('exp')}>
                <input value={f.exp} onChange={(e) => onExp(e.target.value)} inputMode="numeric" autoComplete="cc-exp" placeholder="ดด/ปป" />
              </AdField>
              <AdField label="CVV" error={show('cvv')}>
                <input type="password" value={f.cvv} onChange={(e) => setF({ ...f, cvv: toArabic(e.target.value).replace(/\D/g, '').slice(0, cvvLen) })} inputMode="numeric" autoComplete="cc-csc" placeholder={cvvLen === 4 ? '0000' : '000'} />
              </AdField>
            </div>
            <button className={`tx-same ac-save ${f.save ? 'on' : ''}`} role="checkbox" aria-checked={f.save} onClick={() => setF({ ...f, save: !f.save })}>
              <i aria-hidden="true">{f.save && <Icon name="check" size={16} />}</i>บันทึกบัตรนี้ไว้ใช้ครั้งต่อไป
            </button>
            <p className="ac-safe"><Icon name="lock-simple" fill size={16} />ข้อมูลบัตรถูกเข้ารหัส Thaimart ไม่เก็บเลข CVV</p>
          </div>
        </div>
      )}
    </Sheet>
  );
}

const CO_NOTES = {}; // shop name → note
const CO_TAX = {}; // shop name → tax invoice request
const CO_TAX_DEFAULT = { v: null }; // ตั้งเป็นค่าเริ่มต้น: fills the form next time

const NOTE_MAX = 150;
const NOTE_IDEAS = ['ฝากไว้ที่ป้อมยาม', 'โทรก่อนส่ง', 'ห่อของขวัญให้ด้วย', 'ไม่ต้องใส่ใบเสร็จในกล่อง'];

/** หมายเหตุถึงร้าน: bottom sheet with a text box, quick ideas, count, and save. */
function NoteSheet({ app, shop, value, onSave, onClose }) {
  const [t, setT] = useState(value);
  const ref = useRef(null);
  useEffect(() => { const id = setTimeout(() => { const el = ref.current; if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }, 300); return () => clearTimeout(id); }, []);
  const add = (x) => setT((v) => (v.includes(x) ? v : (v.trim() ? v.trim() + ' ' : '') + x).slice(0, NOTE_MAX));
  return (
    <Sheet app={app} onClose={onClose} title="หมายเหตุถึงร้าน"
      footer={(close) => <button className="btn-primary block" onClick={() => { onSave(t.trim()); close(); }}>บันทึก</button>}>
      {(close) => (
        <div className="nt">
          <div className="nt-hd">
            <b>หมายเหตุถึงร้าน</b>
            <button className="gf-close" aria-label="ปิด" onClick={close}><Icon name="x" size={22} /></button>
          </div>
          <p className="nt-to">ถึง {shop}</p>
          <div className="nt-box">
            <textarea ref={ref} rows={4} maxLength={NOTE_MAX} value={t} onChange={(e) => setT(e.target.value)} placeholder="ฝากข้อความถึงร้าน เช่น สี ขนาด หรือวิธีส่ง" aria-label={`ข้อความถึง ${shop}`} />
            <span className="nt-count" aria-live="polite">{t.length}/{NOTE_MAX}</span>
          </div>
          <div className="nt-ideas" aria-label="ข้อความที่ใช้บ่อย">
            {NOTE_IDEAS.map((x) => <button key={x} className="nt-idea" onClick={() => add(x)}>{x}</button>)}
          </div>
        </div>
      )}
    </Sheet>
  );
}

/** One shop's order: items, courier, shop discount, note to the shop, tax invoice, subtotal. */
function CoShop({ app, g, onCourier }) {
  const [shipOpen, setShipOpen] = useState(false);
  const cr = courierOf(g.shop.name);
  const when = coDays(...cr.days);
  const [noteOpen, setNoteOpen] = useState(false);
  // Kept outside the page so they survive a trip to the address or tax-invoice page.
  const [note, setNoteState] = useState(CO_NOTES[g.shop.name] || '');
  const setNote = (t) => { CO_NOTES[g.shop.name] = t; setNoteState(t); };
  const tax = CO_TAX[g.shop.name];
  const pieces = g.lines.reduce((n, l) => n + l.qty, 0);
  return (
    <section className="co-shop" aria-label={`สินค้าจาก ${g.shop.name}`}>
      <header className="co-shop-hd">
        {g.shop.badge && <ShopTag kind={g.shop.badge} h={20} />}
        <b className="ellipsis">{g.shop.name}</b>
      </header>
      {g.lines.map((l) => {
        const p = DATA.products[l.id];
        const orig = p.discount ? p.originalPrice + (l.price - p.price) : null;
        return (
          <div className="co-line" key={l.key}>
            <span className="co-line-img"><ProductImage p={p} /></span>
            <div className="co-line-mid">
              <span className="co-line-title ellipsis">{p.title}</span>
              {l.options.length > 0 && <small className="ellipsis">{l.options.join(', ')}</small>}
              <span className="co-line-row">
                <span className="co-line-price"><b>{baht(l.price)}</b>{orig && <s>{baht(orig)}</s>}</span>
                <span className="co-line-qty">x{l.qty}</span>
              </span>
            </div>
          </div>
        );
      })}
      <button className="co-ship" aria-haspopup="dialog" onClick={() => setShipOpen(true)} aria-label={`ขนส่ง ${cr.name} ได้รับประมาณ ${when} ${g.ship ? baht(g.ship) : 'ส่งฟรี'} แตะเพื่อเปลี่ยน`}>
        <img className="cr-logo" src={A(cr.logo)} alt="" />
        <span className="co-ship-mid"><span>{cr.name}</span><small>ได้รับประมาณ {when}</small></span>
        <span className="co-ship-fee">{g.ship ? <b>{baht(g.ship)}</b> : <><b>ส่งฟรี</b><s>{baht(cr.fee)}</s></>}</span>
        <Icon name="caret-right" size={18} className="co-go" />
      </button>
      {shipOpen && <CourierSheet app={app} shop={g.shop.name} onPick={(k) => { CO_COURIER_SEL[g.shop.name] = k; onCourier(); }} onClose={() => setShipOpen(false)} />}
      <div className="co-rows">
        <button className="co-row" onClick={() => app.toast('เลือกโค้ดร้านยังไม่มีในต้นแบบ')}>
          <span>ส่วนลดร้านค้า</span>
          {g.coupon ? <em>ลด {baht(g.coupon)}</em> : <span className="co-row-hint">เลือกโค้ดส่วนลด</span>}
          <Icon name="caret-right" size={18} className="co-go" />
        </button>
        <button className="co-row" aria-haspopup="dialog" onClick={() => setNoteOpen(true)}>
          <span>หมายเหตุ</span>
          <span className={`ellipsis ${note ? 'co-row-val co-note-on' : 'co-row-hint'}`}>{note || 'ฝากข้อความถึงร้าน'}</span>
          <Icon name="caret-right" size={18} className="co-go" />
        </button>
        {noteOpen && <NoteSheet app={app} shop={g.shop.name} value={note} onSave={setNote} onClose={() => setNoteOpen(false)} />}
        <button className="co-row" onClick={() => { window.TAX_SHOP = g.shop.name; app.go('/tax'); }}>
          <span>ใบกำกับภาษี</span>
          {tax ? <span className="co-row-val ellipsis">ส่งคำขอแล้ว</span> : <span className="co-row-hint">ขอใบกำกับภาษี</span>}
          <Icon name="caret-right" size={18} className="co-go" />
        </button>
      </div>
      <p className="co-shop-sum"><span>สินค้ารวม {pieces} ชิ้น</span><b>{baht(g.sub + g.ship - g.coupon)}</b></p>
    </section>
  );
}

function CheckoutBody({ app }) {
  syncAddrCase(app.cases);
  const CO_ADDR = addrPicked();
  const lines = useMemo(() => (window.CHECKOUT?.lines || CART.filter((l) => l.on)).map((l) => ({ ...l })), []);
  const [pay, setPay] = useState('pp');
  const [addCard, setAddCard] = useState(false);
  // Saved card: one added this visit, else the mock saved card (case บันทึกบัตรไว้แล้ว).
  const [cardPick, setCardPick] = useState(false);
  const [, bumpCard] = useState(0);
  const cards = cardsFor(app.cases);
  const card = cards.find((c) => c.id === CO_CARD.sel) || cards[0] || null;
  useEffect(() => { if (pay === 'card' && !card) setPay('pp'); }, [card]);

  const shopOf = (l) => { const n = DATA.detailFor(l.id).shop?.name; return n ? shopByName(n) : { name: 'Thaimart' }; };
  const groups = [];
  lines.forEach((l) => {
    const sh = shopOf(l);
    let g = groups.find((x) => x.shop.name === sh.name);
    if (!g) groups.push((g = { shop: sh, lines: [] }));
    g.lines.push(l);
  });
  groups.forEach((g) => {
    g.sub = g.lines.reduce((n, l) => n + l.price * l.qty, 0);
    g.ship = shopFreeShip(g.shop.name) ? 0 : courierOf(g.shop.name).fee;
    const c = SHOP_COUPON[g.shop.name];
    g.coupon = c && g.sub >= c.min ? c.off : 0;
  });

  const items = groups.reduce((n, g) => n + g.sub, 0);
  const ship = groups.reduce((n, g) => n + g.ship, 0);
  const shopOff = groups.reduce((n, g) => n + g.coupon, 0);
  const tmOff = 0; // Thaimart coupon card removed
  const total = items + ship - shopOff - tmOff;
  // ประหยัด: sale prices vs the struck prices, coupons, and the courier fee a free-shipping shop pays.
  const saved = lines.reduce((n, l) => { const p = DATA.products[l.id]; return n + (p.discount ? (p.originalPrice - p.price) * l.qty : 0); }, 0)
    + shopOff + tmOff + groups.reduce((n, g) => n + (g.ship ? 0 : courierOf(g.shop.name).fee), 0);
  const [, bump] = useState(0); // re-total after a courier change

  // COD has a cap: switch away from it when the total goes over.
  useEffect(() => { if (pay === 'cod' && total > 5000) setPay('pp'); }, [total]);

  if (!lines.length) {
    return (
      <div className="ct-empty">
        <b>ยังไม่ได้เลือกสินค้า</b>
        <p>เลือกสินค้าในตะกร้าก่อนแล้วกดชำระเงิน</p>
        <button className="btn-primary" onClick={() => app.go('/cart')}>ไปที่ตะกร้า</button>
      </div>
    );
  }

  const order = () => {
    if (!CO_ADDR) return app.go('/address/new'); // no address yet: add it first
    const m = CO_PAY.find((p) => p.k === pay);
    // Bought from the cart: those lines leave the cart.
    if (!window.CHECKOUT) { for (let i = CART.length - 1; i >= 0; i--) if (CART[i].on) CART.splice(i, 1); cartChanged(); }
    window.CHECKOUT = null;
    app.toast(`สั่งซื้อแล้ว ${baht(total)} · ${m.name}`);
    location.replace('#/tab/orders'); // replace checkout: back must not land on an empty checkout
  };

  return (
    <>
      {CO_ADDR ? (
        <button className="co-addr" onClick={() => app.go('/address')} aria-label={`ที่อยู่จัดส่ง ${CO_ADDR.name} แตะเพื่อเปลี่ยน`}>
          <span className="co-addr-ic"><Icon name="map-pin" fill size={22} /></span>
          <span className="co-addr-mid">
            <b>{CO_ADDR.name}<span> · {CO_ADDR.phone}</span></b>
            <span className="clamp2">{addrLine(CO_ADDR)}</span>
          </span>
          <Icon name="caret-right" size={18} className="co-go" />
        </button>
      ) : (
        // First order: no address yet. Add one before ordering.
        <button className="co-addr co-addr-none" onClick={() => app.go('/address/new')}>
          <span className="co-addr-ic"><Icon name="plus" size={22} /></span>
          <span className="co-addr-mid">
            <b>เพิ่มที่อยู่จัดส่ง</b>
            <span>ยังไม่มีที่อยู่ เพิ่มเพื่อให้ร้านส่งของถึงคุณ</span>
          </span>
          <Icon name="caret-right" size={18} className="co-go" />
        </button>
      )}

      {groups.map((g) => <CoShop key={g.shop.name} app={app} g={g} onCourier={() => bump((n) => n + 1)} />)}

      <section className="co-sec">
        <h2 className="co-h">วิธีชำระเงิน</h2>
        <div className="co-pays" role="radiogroup" aria-label="วิธีชำระเงิน">
          {CO_PAY.map((m0) => {
            // Card: the saved card, or (none saved yet) a row that opens the add-card sheet.
            const noCard = m0.k === 'card' && !card;
            const m = m0.k === 'card' ? (card ? { ...m0, name: 'บัตรเครดิต/บัตรเดบิต', sub: `${card.brand} •••• ${card.last4}` } : { ...m0, name: 'บัตรเครดิต/บัตรเดบิต', sub: 'เพิ่มบัตรเพื่อจ่ายด้วยบัตร' }) : m0;
            const off = m.max && total > m.max;
            if (noCard) {
              return (
                <button key={m.k} className="co-pay" aria-haspopup="dialog" onClick={() => setAddCard(true)}>
                  <span className={`co-pay-mk ${m.cls}`}><i className="o-ic" style={{ width: 26, height: 26, WebkitMaskImage: `url("${A('assets/icons/pay_card.svg')}")`, maskImage: `url("${A('assets/icons/pay_card.svg')}")` }} aria-hidden="true" /></span>
                  <span className="co-pay-mid"><b>{m.name}</b><small>{m.sub}</small></span>
                  <span className="co-pay-add"><Icon name="plus" size={16} />เพิ่มบัตร</span>
                </button>
              );
            }
            if (m.k === 'card') {
              // Saved card: tap the row to pay by card, เปลี่ยน to pick another card or add one.
              return (
                <div key={m.k} className={`co-pay co-pay-card ${pay === 'card' ? 'on' : ''}`}>
                  <button className="co-pay-hit" role="radio" aria-checked={pay === 'card'} onClick={() => setPay('card')}>
                    <span className={`co-pay-mk ${m.cls}`}><CardIc /></span>
                    <span className="co-pay-mid"><b>{m.name}</b><small>{m.sub}</small></span>
                  </button>
                  <button className="co-pay-add" aria-haspopup="dialog" onClick={() => setCardPick(true)}>เปลี่ยน</button>
                  <button className="co-radio-hit" aria-hidden="true" tabIndex={-1} onClick={() => setPay('card')}><i className="co-radio" /></button>
                </div>
              );
            }
            return (
              <button key={m.k} role="radio" aria-checked={pay === m.k} disabled={off} className={`co-pay ${pay === m.k ? 'on' : ''}`} onClick={() => setPay(m.k)}>
                {m.logo ? <img className="co-pay-mk co-pay-img" src={A(m.logo)} alt="" /> : <span className={`co-pay-mk ${m.cls}`}>{m.svg ? <i className="o-ic" style={{ width: 26, height: 26, WebkitMaskImage: `url("${A(`assets/icons/${m.svg}.svg`)}")`, maskImage: `url("${A(`assets/icons/${m.svg}.svg`)}")` }} aria-hidden="true" /> : m.icon ? <Icon name={m.icon} size={26} /> : m.mark}</span>}
                <span className="co-pay-mid"><b>{m.name}</b><small>{off ? 'ยอดเกิน ฿5,000 ใช้วิธีนี้ไม่ได้' : m.sub}</small></span>
                <i className="co-radio" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </section>

      {addCard && <AddCardSheet app={app} onAdd={(c) => { CO_CARD.added.push(c); CO_CARD.sel = c.id; setPay('card'); bumpCard((n) => n + 1); app.toast(`เพิ่มบัตร ${c.brand} •••• ${c.last4} แล้ว`); }} onClose={() => setAddCard(false)} />}
      {cardPick && <CardSheet app={app} cards={cards} sel={card && card.id} onPick={(id) => { CO_CARD.sel = id; setPay('card'); bumpCard((n) => n + 1); }} onAdd={() => setAddCard(true)} onClose={() => setCardPick(false)} />}

      <section className="co-sec co-sum" aria-label="สรุปราคา">
        <p><span>ราคาสินค้า</span><span>{baht(items)}</span></p>
        <p><span>ค่าส่ง</span><span>{ship ? baht(ship) : 'จัดส่งฟรี'}</span></p>
        {shopOff > 0 && <p><span>คูปองร้าน</span><em>−{baht(shopOff)}</em></p>}
        {tmOff > 0 && <p><span>คูปอง Thaimart</span><em>−{baht(tmOff)}</em></p>}
        <p className="co-total"><b>ยอดชำระ</b><b>{baht(total)}</b></p>
      </section>

      <p className="co-terms">เมื่อกด "สั่งซื้อสินค้า" แล้ว แสดงว่าคุณได้อ่านและยอมรับ <a href="#/checkout" onClick={(e) => { e.preventDefault(); app.toast('เงื่อนไขการให้บริการยังไม่มีในต้นแบบ'); }}>เงื่อนไขการให้บริการ</a> ของ Thaimart เรียบร้อยแล้ว</p>

      <div className="co-bar">
        <div className="co-bar-sum">
          <b>{baht(total)}</b>
          {saved > 0 && <small>ประหยัด {baht(saved)}</small>}
        </div>
        <button className="btn-primary co-order" onClick={order}>สั่งซื้อสินค้า</button>
      </div>
    </>
  );
}

function CheckoutPage({ app }) {
  const back = () => app.back();
  if (app.cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="home" />
        <main className="wrap w-co"><h1 className="w-cart-title">ชำระเงิน</h1><CheckoutBody app={app} /></main>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <header className="m-hd ct-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={back}><Icon name="caret-left" size={24} /></button>
          <b className="ct-title">ชำระเงิน</b>
          <span className="round-btn ghost" aria-hidden="true" />
        </div>
      </header>
      <div className="m-scroll co-page"><CheckoutBody app={app} /></div>
    </>
  );
}

// ════════ ใบกำกับภาษี (#/tax) ════════
// From the ใบกำกับภาษี row on ชำระเงิน (window.TAX_SHOP = the shop). Person or company, tax ID, name, email, phone.

/** Thai 13-digit ID / tax ID check digit. */
const taxIdOk = (d) => {
  if (!/^\d{13}$/.test(d)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += +d[i] * (13 - i);
  return (11 - (sum % 11)) % 10 === +d[12];
};
const fmtTaxId = (d) => [d.slice(0, 1), d.slice(1, 5), d.slice(5, 10), d.slice(10, 12), d.slice(12)].filter(Boolean).join('-');

function TaxPage({ app }) {
  const shop = window.TAX_SHOP;
  const prev = (shop && CO_TAX[shop]) || CO_TAX_DEFAULT.v || Object.values(CO_TAX).slice(-1)[0];
  const [f, setF] = useState(() => prev ? { ...prev, phone: fmtPhone(prev.phone) } : { kind: 'person', id: '', name: '', branch: 'hq', branchNo: '', email: '', phone: '', same: false, def: true, detail: '', zip: '', prov: '', dist: '', sub: '' });
  const [tried, setTried] = useState(false);
  const co = f.kind === 'company';
  const idDigits = f.id.replace(/\D/g, '');
  const ph = normPhone(f.phone);
  const errs = {
    id: !idDigits ? 'กรอกหมายเลขประจำตัวผู้เสียภาษี' : idDigits.length < 13 ? `มี 13 หลัก ตอนนี้ใส่ไป ${idDigits.length} หลัก` : !taxIdOk(idDigits) ? 'หมายเลขนี้ไม่ถูกต้อง ลองตรวจอีกครั้ง' : null,
    name: !f.name.trim() ? (co ? 'กรอกชื่อบริษัท' : 'กรอกชื่อ-นามสกุล') : !co && f.name.trim().split(/\s+/).length < 2 ? 'ใส่ทั้งชื่อและนามสกุล' : null,
    branchNo: co && f.branch === 'branch' && !/^\d{5}$/.test(f.branchNo) ? 'รหัสสาขามี 5 หลัก เช่น 00001' : null,
    email: !f.email.trim() ? 'กรอกอีเมลสำหรับรับใบกำกับภาษี' : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()) ? 'รูปแบบอีเมลไม่ถูกต้อง' : null,
    phone: phoneProblem(ph),
    detail: !f.detail.trim() ? 'ใส่บ้านเลขที่ อาคาร ซอย ถนน' : null,
    zip: !/^\d{5}$/.test(f.zip) ? 'รหัสไปรษณีย์มี 5 หลัก' : null,
    prov: !f.prov ? 'เลือกจังหวัด' : null,
    dist: !f.dist ? 'เลือกเขต/อำเภอ' : null,
    sub: !f.sub ? 'เลือกแขวง/ตำบล' : null,
  };
  const show = (k) => (tried ? errs[k] : null);
  // เหมือนที่อยู่จัดส่ง: copy the checkout's delivery address and lock the fields.
  const toggleSame = () => {
    if (f.same) return setF({ ...f, same: false });
    const a = addrPicked();
    if (!a) return app.toast('ยังไม่มีที่อยู่จัดส่ง กรอกที่อยู่ด้านล่างได้เลย');
    setF({ ...f, same: true, detail: a.detail, zip: a.zip, prov: a.prov, dist: a.dist, sub: a.sub });
  };
  const submit = () => {
    if (Object.values(errs).some(Boolean)) return setTried(true);
    const r = { ...f, id: idDigits, name: f.name.trim(), email: f.email.trim(), phone: ph };
    if (shop) CO_TAX[shop] = r;
    if (r.def) CO_TAX_DEFAULT.v = r; else if (CO_TAX_DEFAULT.v && CO_TAX_DEFAULT.v.id === r.id) CO_TAX_DEFAULT.v = null;
    app.toast('ส่งคำขอใบกำกับภาษีแล้ว');
    app.back();
  };
  const digitsOnly = (v, n) => toArabic(v).replace(/\D/g, '').slice(0, n);

  return (
    <>
      <header className="m-hd ct-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={24} /></button>
          <b className="ct-title">ใบกำกับภาษี</b>
          <span className="round-btn ghost" aria-hidden="true" />
        </div>
      </header>
      <div className="m-scroll ad-page ad-form tx-page">
        <section className="ad-sec">
          <h2 className="tx-h">ข้อมูลเบื้องต้น</h2>
          <div className="tx-kinds" role="radiogroup" aria-label="ประเภทผู้ขอ">
            {[['person', 'บุคคลธรรมดา'], ['company', 'นิติบุคคล']].map(([k, l]) => (
              <button key={k} role="radio" aria-checked={f.kind === k} className={`tx-kind ${f.kind === k ? 'on' : ''}`} onClick={() => setF({ ...f, kind: k })}><i aria-hidden="true" />{l}</button>
            ))}
          </div>
          <AdField label="หมายเลขประจำตัวผู้เสียภาษี" error={show('id')}>
            <input value={fmtTaxId(idDigits)} onChange={(e) => setF({ ...f, id: digitsOnly(e.target.value, 13) })} inputMode="numeric" placeholder="กรอกหมายเลขประจำตัวผู้เสียภาษี 13 หลัก" />
          </AdField>
          <AdField label={co ? 'ชื่อบริษัท' : 'ชื่อ-นามสกุล'} error={show('name')}>
            <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete={co ? 'organization' : 'name'} placeholder={co ? 'กรอกชื่อบริษัทตามที่จดทะเบียน' : 'กรอกชื่อ-นามสกุล'} />
          </AdField>
          {co && (
            <div className="tx-branch">
              <span className="ad-field-lb">สาขา</span>
              <div className="tx-kinds" role="radiogroup" aria-label="สาขา">
                {[['hq', 'สำนักงานใหญ่'], ['branch', 'สาขา']].map(([k, l]) => (
                  <button key={k} role="radio" aria-checked={f.branch === k} className={`tx-kind ${f.branch === k ? 'on' : ''}`} onClick={() => setF({ ...f, branch: k })}><i aria-hidden="true" />{l}</button>
                ))}
              </div>
              {f.branch === 'branch' && (
                <AdField label="รหัสสาขา" error={show('branchNo')}>
                  <input value={f.branchNo} onChange={(e) => setF({ ...f, branchNo: digitsOnly(e.target.value, 5) })} inputMode="numeric" placeholder="เช่น 00001" />
                </AdField>
              )}
            </div>
          )}
          <AdField label="อีเมล" error={show('email')}>
            <input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" inputMode="email" placeholder="กรอกอีเมลสำหรับรับใบกำกับภาษี" />
          </AdField>
          <AdField label="หมายเลขโทรศัพท์" error={show('phone')}>
            <span className="lg-phone ad-phone">
              <b>+66</b>
              <input type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: fmtPhone(normPhone(e.target.value)) })} inputMode="tel" autoComplete="tel-national" placeholder="หมายเลขโทรศัพท์ของคุณ" />
              {f.phone && <button type="button" className="lg-clear" aria-label="ล้างเบอร์" onClick={(e) => { e.preventDefault(); setF({ ...f, phone: '' }); }}><Icon name="x-circle" fill size={20} /></button>}
            </span>
          </AdField>
        </section>

        <section className="ad-sec">
          <div className="tx-hd2">
            <h2 className="tx-h">ข้อมูลภาษี</h2>
            <button className={`tx-same ${f.same ? 'on' : ''}`} role="checkbox" aria-checked={f.same} onClick={toggleSame}>
              <i aria-hidden="true">{f.same && <Icon name="check" size={16} />}</i>เหมือนที่อยู่จัดส่ง
            </button>
          </div>
          <AddrFields app={app} f={f} setF={setF} show={show} disabled={f.same} />
          <div className="ad-def-row tx-def">
            <span>ตั้งเป็นค่าเริ่มต้นในการออกใบกำกับภาษี</span>
            <button className={`co-switch ${f.def ? 'on' : ''}`} role="switch" aria-checked={!!f.def} aria-label="ตั้งเป็นค่าเริ่มต้นในการออกใบกำกับภาษี" onClick={() => setF({ ...f, def: !f.def })}><i /></button>
          </div>
        </section>

        <section className="tx-notes" aria-label="หมายเหตุ">
          <b>หมายเหตุ</b>
          <ul>
            <li>การออกใบกำกับภาษีอยู่ในขอบข่ายความรับผิดชอบของผู้ขาย หากต้องการสอบถามข้อมูลเพิ่มเติมใดๆ ไม่ว่าจะเป็นวิธีส่งใบกำกับภาษี หรือระยะเวลาที่ใช้ กรุณาสอบถามกับผู้ขายโดยตรง</li>
            <li>ผู้ขายบางรายที่เป็นร้านค้าขนาดเล็กหรือบุคคลธรรมดาที่ไม่ได้จดทะเบียนภาษีมูลค่าเพิ่ม (VAT) อาจไม่ได้ออกใบกำกับภาษีให้กับผู้ซื้อ เนื่องจากผู้ขายรายนั้นๆ อาจยังไม่อยู่ในเกณฑ์การออกใบกำกับภาษี หรือสินค้าและบริการนั้นๆ ได้รับการยกเว้นภาษี เช่น สินค้าเกษตรกรรม เป็นต้น</li>
            <li>Thaimart มีหน้าที่ในการรวบรวมคำขอรับใบกำกับภาษีจากผู้ซื้อและส่งต่อให้ผู้ขายเท่านั้น</li>
            <li>ไม่สามารถออกใบกำกับภาษีให้กับสินค้าที่ได้รับการยกเว้นภาษีได้</li>
            <li>กรุณาอ่าน <a href="#/tax" onClick={(e) => { e.preventDefault(); app.toast('นโยบายความเป็นส่วนตัวยังไม่มีในต้นแบบ'); }}>นโยบายความเป็นส่วนตัว</a> โดยละเอียดเพื่อทำความเข้าใจว่า Thaimart สามารถจัดเก็บ รวบรวม ใช้งาน และส่งต่อข้อมูลของคุณอย่างไร และคุณมีสิทธิ์ดำเนินการใดกับข้อมูลนั้นได้ อย่างไรก็ตาม Thaimart ถือสิทธิ์ขาดในการแก้ไขนโยบายความเป็นส่วนตัวโดยไม่จำเป็นต้องแจ้งให้ทราบล่วงหน้า</li>
          </ul>
        </section>
        <div className="co-bar ad-bar">
          <button className="btn-primary block" onClick={submit}>ส่งคำขอ</button>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { CheckoutPage, TaxPage });
