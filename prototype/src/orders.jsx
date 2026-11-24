// หน้าคำสั่งซื้อ (Figma 2518:250): status tiles that filter, then one card per order.

const ORDER_TABS = [
  { key: 'all', label: 'ทั้งหมด', icon: 'tile_all' },
  { key: 'pay', label: 'ต้องชำระ', icon: 'tile_pay' },
  { key: 'prep', label: 'เตรียมส่ง', icon: 'tile_prep' },
  { key: 'ship', label: 'กำลังส่ง', icon: 'tile_ship' },
  { key: 'done', label: 'สำเร็จ', icon: 'tile_done' },
];

const OI = (n) => `assets/images/orders/${n}.jpg`;

// Mock orders, newest first (from the Figma frame). badge: the shop's Official / Mall tag; every shop here is verified.
const ORDERS = [
  { id: 'TM691031-0912', genuine: true, status: 'pay', shop: 'Luxe Beauty', badge: 'mall', logo: OI('shop_luxe'), title: 'Luxe Matte Lip Color ไม่ติดแมสก์ เฉด Ruby Signature', image: OI('lipstick'), variant: 'Ruby Signature', qty: 1, price: 289, ship: 40,
    note: { kind: 'pay', text: 'ชำระภายใน 10:12 น. วันนี้ ร้านจะเริ่มเตรียมของหลังชำระ' }, actions: ['ยกเลิก', 'ชำระเงิน'] },
  // One order, several products and several pieces each (prices from the product data).
  { id: 'TM691030-1124', status: 'prep', shop: 'Beauty Corner', badge: 'official', logo: 'assets/images/product_serum.jpg', ship: 0,
    items: [
      { pid: 29, title: 'เซรั่มไฮยาลูรอน ผิวชุ่มชื้น 30 มล.', image: 'assets/images/product_serum.jpg', qty: 2, price: 312 },
      { pid: 8, title: 'กันแดดทาหน้า SPF50+ PA++++ เนื้อบางเบา 50 มล.', image: 'assets/images/product_sunscreen.jpg', qty: 3, price: 254 },
      { pid: 11, title: 'ลิปสติกเนื้อแมตต์ สีชมพูกุหลาบ', image: 'assets/images/product_lipstick.jpg', variant: 'ชมพูกุหลาบ', qty: 1, price: 261 },
      { pid: 44, title: 'คลีนซิ่งมิลค์ล้างหน้า สูตรอ่อนโยน 200 มล.', image: 'assets/images/product_cleanser.jpg', qty: 1, price: 259 },
    ],
    note: { kind: 'prep', text: 'ร้านจะส่งภายใน 1 พ.ย. ได้รับ 3–4 พ.ย.' }, actions: ['แชทกับร้าน', 'ดูรายละเอียด'], quiet: true },
  { id: 'TM691030-2031', status: 'prep', shop: 'Bag-a-Boo', logo: OI('shop_bagaboo'), title: 'Structured Top Handle Bag หนัง Saffiano สีเบจ', image: OI('bag'), qty: 1, price: 1499, ship: 40,
    note: { kind: 'prep', text: 'ร้านจะส่งภายใน 1 พ.ย. ได้รับ 3–4 พ.ย.' }, actions: ['แชทกับร้าน', 'ดูรายละเอียด'], quiet: true },
  { id: 'TM691028-1408', status: 'ship', shop: 'Green Haven', logo: OI('shop_greenhaven'), title: 'Desk Plant Collection: ต้นไม้ฟอกอากาศขนาด 10–15 ซม.', image: OI('plant'), variant: 'พลูด่าง', qty: 1, price: 595, ship: 0,
    track: { title: 'พนักงานออกจากสาขาบางนาแล้ว', sub: '31 ต.ค. · 08:50 น. · ถึงวันนี้ก่อน 18:00 น.' }, escrow: true, actions: ['ติดตามพัสดุ', 'ยืนยันรับสินค้า'] },
  { id: 'TM691017-1955', genuine: true, status: 'done', shop: 'PetCare Official Store', badge: 'official', logo: OI('shop_petcare'), title: 'แปรงหวีขนแมว ปุ่มกดดันขนออก อัตโนมัติ หัวเข็มปลายมน ไม่ทำร้ายผิว', image: OI('brush'), qty: 1, price: 290, ship: 35,
    note: { kind: 'reward', text: 'ได้รับแล้ว 21 ต.ค. รีวิวได้ถึง 20 พ.ย. 2569 รับ 10 แต้ม' }, actions: ['ซื้ออีกครั้ง', 'เขียนรีวิว'] },
  { id: 'TM691002-0840', genuine: true, status: 'done', shop: 'LOTPLUS', badge: 'mall', logo: OI('shop_lotplus'), title: 'Travel Mug สแตนเลส 2 ชั้น เก็บเย็น 24 ชม. ปลอด BPA รับประกัน 1 ปี', image: OI('mug'), variant: 'เขียวเสจ', qty: 1, price: 999, ship: 40,
    summary: 'ได้รับ 5 ต.ค. · รีวิวแล้ว', actions: ['ดูรีวิว', 'ซื้ออีกครั้ง'], quiet: true },
  { id: 'TM690918-2110', genuine: true, status: 'done', shop: 'PureCotton Official Store', badge: 'official', logo: OI('shop_purecotton'), title: 'สำลีเช็ดหน้า Cotton 100% ไม่เป็นขุย ไม่ทิ้งเส้นใยบนผิว', image: OI('cotton'), variant: 'ผิวเรียบ', qty: 1, price: 390, ship: 0,
    summary: 'ได้รับ 21 ก.ย. · รีวิวแล้ว', actions: ['ดูรีวิว', 'ซื้ออีกครั้ง'], quiet: true },
];

const STATUS_LABEL = { pay: 'ต้องชำระ', prep: 'เตรียมส่ง', ship: 'กำลังส่ง', done: 'สำเร็จ' };

function OrderIcon({ name, size = 24, className = '' }) {
  const url = `url("../assets/icons/orders/${name}.svg")`;
  return <i className={`o-ic ${className}`} style={{ width: size, height: size, WebkitMaskImage: url, maskImage: url }} aria-hidden="true" />;
}

function StatusTiles({ tab, setTab }) {
  const count = (k) => ORDERS.filter((o) => o.status === k).length;
  return (
    <div className="o-tiles" role="tablist" aria-label="สถานะคำสั่งซื้อ">
      {ORDER_TABS.map((t) => {
        const n = t.key === 'all' ? 0 : count(t.key);
        return (
          <button key={t.key} role="tab" aria-selected={tab === t.key} className={`o-tile ${tab === t.key ? 'on' : ''}`} onClick={() => setTab(t.key)}>
            <span className="o-tile-box">
              <OrderIcon name={t.icon} />
              {n > 0 && <span className="o-tile-n" aria-label={`${n} รายการ`}>{n}</span>}
            </span>
            <span className="o-tile-label">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** ของแท้: from the product data when the item links a product, else the order's own flag (mock). */
const isGenuine = (it) => (it.pid != null ? !!DATA.products[it.pid]?.genuine : !!it.genuine);

function OrderItem({ it }) {
  return (
    <div className="o-item">
      <span className="o-item-img">
        <img src={A(it.image)} alt="" />
        {isGenuine(it) && <span className="o-flag"><GenuineFlag scale={0.62} /></span>}
      </span>
      <div className="o-item-mid">
        <p className="clamp2">{it.title}</p>
        <span className="o-variant">{it.variant ? `${it.variant} · ` : ''}x{it.qty}</span>
      </div>
      <span className="o-price">{baht(it.price)}</span>
    </div>
  );
}

const SHOW_ITEMS = 2; // more than this folds under "ดูอีก n รายการ"

function OrderCard({ o }) {
  const [open, setOpen] = useState(false);
  const items = o.items || [{ title: o.title, image: o.image, variant: o.variant, qty: o.qty, price: o.price, genuine: o.genuine }];
  const pieces = items.reduce((n, it) => n + it.qty, 0);
  const total = items.reduce((n, it) => n + it.price * it.qty, 0) + o.ship;
  const paid = o.status !== 'pay';
  const shown = open ? items : items.slice(0, SHOW_ITEMS);
  const hidden = items.length - SHOW_ITEMS;
  return (
    <article className="o-card">
      <header className="o-shop">
        <img className="o-logo" src={A(o.logo)} alt="" />
        {/* Official / Mall before the name, the ยืนยันตัวตน seal (icon only) after it. */}
        {o.badge && <ShopTag kind={o.badge} h={16} />}
        <b className="ellipsis">{o.shop}</b>
        <img className="id-seal" src={A('assets/icons/verified_seal.svg')} width="16" height="16" alt="ยืนยันตัวตน" />
        <span className={`o-status ${o.status}`}>{STATUS_LABEL[o.status]}</span>
      </header>

      <div className="o-items">
        {shown.map((it, k) => <OrderItem key={k} it={it} />)}
        {hidden > 0 && (
          <button className="o-more" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? 'ย่อ' : `ดูอีก ${hidden} รายการ`}<Icon name={open ? 'caret-up' : 'caret-down'} size={14} />
          </button>
        )}
      </div>
      <small className="o-id">คำสั่งซื้อ {o.id}</small>

      <div className="o-sum">
        <span>{o.summary || `${items.length > 1 ? items.length + ' รายการ · ' : ''}รวม ${pieces} ชิ้น · ${o.ship ? 'ค่าส่ง ' + baht(o.ship) : 'จัดส่งฟรี'}`}</span>
        <span className="o-total"><small>{paid ? 'จ่ายแล้ว' : 'ยอดชำระ'}</small>{baht(total)}</span>
      </div>

      {o.note && (
        <div className={`o-note ${o.note.kind}`}>
          <OrderIcon name={o.note.kind === 'pay' ? 'clock' : o.note.kind === 'prep' ? 'prep_note' : 'reward'} size={o.note.kind === 'reward' ? 24 : 16} />
          <span>{o.note.text}</span>
        </div>
      )}
      {o.track && (
        <button className="o-track">
          <span className="o-dot" aria-hidden="true" />
          <span className="o-track-mid"><b>{o.track.title}</b><small>{o.track.sub}</small></span>
          <Icon name="caret-right" size={18} />
        </button>
      )}
      {o.escrow && (
        <div className="o-note escrow">
          <OrderIcon name="escrow" size={24} />
          <span>Thaimart ถือเงิน {baht(total)} ไว้จนคุณยืนยันรับ</span>
        </div>
      )}

      <div className="o-actions">
        {o.actions.map((a, i) => (
          <button key={a} className={i === o.actions.length - 1 && !o.quiet ? 'o-btn primary' : 'o-btn'} onClick={a === 'ชำระเงิน' ? () => (location.hash = '/pay/' + o.id) : undefined}>{a}</button>
        ))}
      </div>
    </article>
  );
}

/** Orders while loading: the 5 status tiles, a heading, three order cards. */
function OrdersSkeleton() {
  return (
    <div className="skeleton" aria-busy="true" aria-label="กำลังโหลด">
      <div style={{ padding: '12px 16px' }}><Sk w="100%" h={84} r={16} style={{ display: 'block' }} /></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px 4px', borderTop: '8px solid #F6F6F7' }}><Sk w={130} h={18} /><Sk w={56} h={14} /></div>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ padding: '12px 16px', borderBottom: '8px solid #F6F6F7', display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><Sk w={140} h={16} /><Sk w={70} h={16} /></div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Sk w={72} h={72} r={10} />
            <div style={{ flex: 1, display: 'grid', gap: 8, alignContent: 'start' }}><Sk w="90%" h={14} /><Sk w="40%" h={12} /><Sk w="30%" h={16} /></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><Sk w={96} h={36} r={10} /><Sk w={96} h={36} r={10} /></div>
        </div>
      ))}
    </div>
  );
}

function OrdersPage({ app }) {
  const loading = useLoading('orders');
  const [tab, setTab] = useState(() => { const t = window.ORDERS_TAB || 'all'; window.ORDERS_TAB = null; return t; });
  const list = tab === 'all' ? ORDERS : ORDERS.filter((o) => o.status === tab);
  const title = tab === 'all' ? 'คำสั่งซื้อทั้งหมด' : `คำสั่งซื้อที่${STATUS_LABEL[tab]}`;
  const body = (
    <>
      <StatusTiles tab={tab} setTab={setTab} />
      <div className="o-head">
        <h1>{title}</h1>
        <span>{list.length} รายการ</span>
      </div>
      <div className="o-list">
        {list.length ? list.map((o) => <OrderCard key={o.id} o={o} />) : (
          <div className="o-empty">
            <span className="o-empty-ic"><Icon name="package" size={40} /></span>
            <b>ยังไม่มีคำสั่งซื้อในสถานะนี้</b>
            <p>เลือกดูสินค้าของแท้จากร้านทางการได้เลย</p>
            <button className="btn-primary o-empty-btn" onClick={() => (location.hash = '/')}>ไปเลือกซื้อสินค้า</button>
          </div>
        )}
      </div>
    </>
  );
  if (app.cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="orders" />
        <main className="wrap w-orders">{loading ? <OrdersSkeleton /> : body}</main>
        <Footer />
      </div>
    );
  }
  return (
    <>
      {/* Its own page (from โปรไฟล์ ดูคำสั่งซื้อ): white header with back, no tab bar. */}
      <header className="m-hd ct-hd o-sub-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={24} /></button>
          <b className="ct-title">คำสั่งซื้อของฉัน</b>
          <button className="round-btn ghost" aria-label="กล่องข้อความ" onClick={() => app.openTab('inbox')}><i className="o-ic" style={{ width: 24, height: 24, WebkitMaskImage: `url("${A('assets/icons/nav_inbox.svg')}")`, maskImage: `url("${A('assets/icons/nav_inbox.svg')}")` }} aria-hidden="true" /></button>
        </div>
      </header>
      <div className="m-scroll o-page o-sub">{loading ? <OrdersSkeleton /> : body}</div>
    </>
  );
}

/** A QR-looking pattern for the prototype (not a real PromptPay code): fixed noise plus the three corner squares. */
function MockQR({ size = 200, seed = 7 }) {
  const n = 25, cells = [];
  let x = seed;
  const rnd = () => ((x = (x * 9301 + 49297) % 233280) / 233280);
  const finder = (r, c) => [[0, 0], [0, n - 7], [n - 7, 0]].some(([fr, fc]) => r >= fr && r < fr + 7 && c >= fc && c < fc + 7);
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (!finder(r, c) && rnd() > 0.52) cells.push(<rect key={r * n + c} x={c} y={r} width="1" height="1" />);
  const eye = (r, c) => <g key={`e${r}${c}`}><rect x={c} y={r} width="7" height="7" /><rect x={c + 1} y={r + 1} width="5" height="5" fill="#fff" /><rect x={c + 2} y={r + 2} width="3" height="3" /></g>;
  return <svg width={size} height={size} viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">{cells}{eye(0, 0)}{eye(0, n - 7)}{eye(n - 7, 0)}</svg>;
}

/** ชำระเงิน for an order that is waiting (#/pay/:id): amount and deadline, PromptPay or card, then pay. */
function PayPage({ app, id }) {
  const o = ORDERS.find((x) => x.id === id);
  const cards = cardsFor(app.cases);
  const card = cards.find((c) => c.id === CO_CARD.sel) || cards[0] || null;
  const [pay, setPay] = useState('pp');
  if (!o) return null;
  const items = o.items || [{ qty: o.qty, price: o.price }];
  const total = items.reduce((n, it) => n + it.price * it.qty, 0) + o.ship;
  const done = () => {
    o.status = 'prep';
    o.note = { kind: 'prep', text: 'ชำระแล้ว ร้านกำลังเตรียมของ' };
    o.actions = ['แชทกับร้าน', 'ดูรายละเอียด']; o.quiet = true;
    app.toast(`ชำระเงินแล้ว ${baht(total)}`);
    app.back();
  };
  const go = () => (pay === 'pp' ? app.go(`/pay/${encodeURIComponent(o.id)}/qr`) : done());
  const methods = [
    { k: 'pp', logo: 'assets/images/pay/promptpay.png', name: 'PromptPay', sub: 'สแกนจ่ายผ่านแอปธนาคาร' },
    card && { k: 'card', name: 'บัตรเครดิต/บัตรเดบิต', sub: `${card.brand} •••• ${card.last4}` },
  ].filter(Boolean);
  return (
    <>
      <header className="m-hd ct-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={24} /></button>
          <b className="ct-title">ชำระเงิน</b>
          <span className="round-btn ghost" aria-hidden="true" />
        </div>
      </header>
      <div className="m-scroll co-page">
        <section className="co-sec py-amt">
          <span>ยอดที่ต้องชำระ</span>
          <b>{baht(total)}</b>
          <p className="py-due"><Icon name="clock" size={18} />{o.note ? o.note.text.split(' ร้าน')[0] : 'ชำระภายในวันนี้'}</p>
          <small>คำสั่งซื้อ {o.id} · {o.shop}</small>
        </section>
        <section className="co-sec">
          <h2 className="co-h">วิธีชำระเงิน</h2>
          <div className="co-pays" role="radiogroup" aria-label="วิธีชำระเงิน">
            {methods.map((m) => (
              <button key={m.k} role="radio" aria-checked={pay === m.k} className={`co-pay ${pay === m.k ? 'on' : ''}`} onClick={() => setPay(m.k)}>
                {m.logo ? <img className="co-pay-mk co-pay-img" src={A(m.logo)} alt="" /> : <span className="co-pay-mk cod"><CardIc /></span>}
                <span className="co-pay-mid"><b>{m.name}</b><small>{m.sub}</small></span>
                <i className="co-radio" aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>
        <div className="co-bar">
          <button className="btn-primary block" onClick={go}>ชำระเงิน</button>
        </div>
      </div>
    </>
  );
}

window.OrdersPage = OrdersPage;
window.PayPage = PayPage;

/** PromptPay QR page (#/pay/:id/qr): scan with a bank app, then ชำระแล้ว. */
function PayQrPage({ app, id }) {
  const o = ORDERS.find((x) => x.id === id);
  if (!o) return null;
  const items = o.items || [{ qty: o.qty, price: o.price }];
  const total = items.reduce((n, it) => n + it.price * it.qty, 0) + o.ship;
  const paid = () => {
    o.status = 'prep';
    o.note = { kind: 'prep', text: 'ชำระแล้ว ร้านกำลังเตรียมของ' };
    o.actions = ['แชทกับร้าน', 'ดูรายละเอียด']; o.quiet = true;
    app.toast(`ชำระเงินแล้ว ${baht(total)}`);
    // Back past the pay and QR pages to the orders list they came from (no paid QR page left behind).
    if (history.length > 2) history.go(-2); else location.replace('#/tab/orders');
  };
  return (
    <>
      <header className="m-hd ct-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={24} /></button>
          <b className="ct-title">สแกนจ่ายด้วย PromptPay</b>
          <span className="round-btn ghost" aria-hidden="true" />
        </div>
      </header>
      <div className="m-scroll co-page">
        <section className="co-sec py-qr py-qr-page">
          <img className="py-pp" src={A('assets/images/pay/promptpay.png')} alt="PromptPay" />
          <div className="py-code" aria-label="คิวอาร์โค้ดสำหรับชำระเงิน"><MockQR size={220} /></div>
          <span className="py-qr-lbl">ยอดที่ต้องชำระ</span>
          <b className="py-qr-amt">{baht(total)}</b>
          <p className="py-due"><Icon name="clock" size={18} />{o.note ? o.note.text.split(' ร้าน')[0] : 'ชำระภายในวันนี้'}</p>
          <p className="py-qr-note">เปิดแอปธนาคาร สแกนคิวอาร์นี้ แล้วกลับมาที่ Thaimart</p>
          <small className="py-qr-id">คำสั่งซื้อ {o.id} · {o.shop}</small>
        </section>
        <div className="co-bar py-qr-bar">
          <button className="btn-line" onClick={() => app.toast('บันทึกคิวอาร์ลงเครื่องแล้ว')}>บันทึกคิวอาร์</button>
          <button className="btn-primary" onClick={paid}>ชำระแล้ว</button>
        </div>
      </div>
    </>
  );
}
window.PayQrPage = PayQrPage;
