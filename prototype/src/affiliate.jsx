// Affiliate: a card on the profile page, and its detail page (#/affiliate).
// Earnings, how the links did, products being promoted, recent commissions. All mock data.

const AFF = {
  month: 'พฤศจิกายน 2569',
  thisMonth: 4860,
  pending: 1320,   // orders not yet confirmed by the buyer
  available: 3540, // can be withdrawn
  total: 28750,
  clicks: 12480,
  orders: 186,
  // Products she promotes: product id, commission %, clicks, orders this month.
  products: [
    { id: 38, rate: 8, clicks: 4210, orders: 62 },
    { id: 29, rate: 10, clicks: 2980, orders: 48 },
    { id: 26, rate: 6, clicks: 1870, orders: 27 },
    { id: 30, rate: 7, clicks: 1460, orders: 21 },
    { id: 34, rate: 6, clicks: 1120, orders: 16 },
    { id: 43, rate: 10, clicks: 840, orders: 12 },
  ],
  // Recent commissions: product, buyer status, amount.
  recent: [
    { id: 38, when: 'วันนี้ 10:24', status: 'pending', amount: 240 },
    { id: 29, when: 'วันนี้ 08:15', status: 'pending', amount: 31 },
    { id: 26, when: 'เมื่อวาน 21:40', status: 'done', amount: 24 },
    { id: 38, when: 'เมื่อวาน 19:02', status: 'done', amount: 240 },
    { id: 30, when: '14 พ.ย. 13:30', status: 'done', amount: 20 },
    { id: 43, when: '13 พ.ย. 09:12', status: 'cancel', amount: 40 },
  ],
};
const AFF_STATUS = { pending: 'รอผู้ซื้อยืนยันรับ', done: 'ได้รับแล้ว', cancel: 'ยกเลิก' };

/** Card on the profile page: this month's earnings and a way in. */
function AffiliateCard({ app }) {
  // Not a member yet: the same calm card as the others (logo, one line each), red only on สมัครเลย.
  if (app.cases.affNone) {
    return (
      <button className="af-card" onClick={() => app.go('/affiliate')} aria-label="สร้างรายได้กับ Thaimart Affiliate สมัครเลย">
        <img className="af-card-ic" src={A('assets/icons/aff.svg')} width="40" height="40" alt="" />
        <span className="af-card-mid">
          <b>สร้างรายได้กับ Affiliate</b>
          <small className="ellipsis">แชร์สินค้า รับค่าคอมสูงสุด <em>50%</em></small>
        </span>
        <span className="af-card-start">สมัครเลย</span>
      </button>
    );
  }
  // Just started (no earnings yet): invite, never show ฿0.
  if (app.cases.affNew) {
    return (
      <button className="af-card" onClick={() => app.go('/affiliate')} aria-label="Affiliate เริ่มหารายได้จากโพสต์ของคุณ">
        <img className="af-card-ic" src={A('assets/icons/aff.svg')} width="40" height="40" alt="" />
        <span className="af-card-mid">
          <b>Affiliate</b>
          <small className="ellipsis">ปักสินค้าในโพสต์ รับค่าคอมสูงสุด <em>10%</em></small>
        </span>
        <span className="af-card-start">เริ่มเลย</span>
      </button>
    );
  }
  return (
    <button className="af-card" onClick={() => app.go('/affiliate')} aria-label={`Affiliate รายได้เดือนนี้ ${baht(AFF.thisMonth)} ดูรายละเอียด`}>
      <img className="af-card-ic" src={A('assets/icons/aff.svg')} width="40" height="40" alt="" />
      <span className="af-card-mid">
        <b>Affiliate</b>
        <small className="ellipsis">เดือนนี้ <em>{baht(AFF.thisMonth)}</em> · {AFF.orders} คำสั่งซื้อ</small>
      </span>
      <span className="af-card-go" aria-hidden="true"><Icon name="caret-right" size={20} /></span>
    </button>
  );
}

/** Just started: how it works in 3 steps, a first action, and products worth promoting. */
function AffiliateStart({ app }) {
  const join = !!app.cases.affNone; // not a member yet: the same page, with สมัครเลย
  const signUp = () => { app.setCase('affNone', false); app.setCase('affNew', true); app.toast('สมัคร Affiliate แล้ว เริ่มปักสินค้าในโพสต์ได้เลย'); };
  const copy = async (id) => {
    try { await navigator.clipboard.writeText(`${location.href.split('#')[0]}#/product/${id}?ref=nachum.ploy`); } catch (_) {}
    app.toast('คัดลอกลิงก์แล้ว');
  };
  const steps = [
    { icon: 'magnifying-glass', t: 'เลือกสินค้าที่ชอบ', s: 'ของที่ใช้จริง เล่าได้จริง' },
    { icon: 'note-pencil', t: 'ปักสินค้าในโพสต์', s: 'รูป วิดีโอ หรือรีวิวสั้น ๆ ก็ได้' },
    { icon: 'coins', t: 'รับค่าคอมเมื่อมีคนซื้อ', s: 'ถอนได้หลังผู้ซื้อยืนยันรับของ' },
  ];
  return (
    <div className="af">
      <section className="af-hero">
        <span className="af-hero-ic"><DisIcon name="bag" size={28} /></span>
        <h2>{join ? 'สร้างรายได้กับ Thaimart Affiliate' : 'เริ่มหารายได้จากโพสต์ของคุณ'}</h2>
        <p>{join ? 'แชร์สินค้าที่คุณชอบ รับค่าคอมสูงสุด 50% ทุกครั้งที่มีคนซื้อผ่านลิงก์ของคุณ สมัครฟรี' : 'แนะนำของที่คุณชอบ รับค่าคอมสูงสุด 10% ทุกครั้งที่มีคนซื้อผ่านลิงก์ของคุณ'}</p>
        <ol className="af-steps">
          {steps.map((st, i) => (
            <li key={st.t}><span className="af-step-n">{i + 1}</span><Icon name={st.icon} size={20} /><span><b>{st.t}</b><small>{st.s}</small></span></li>
          ))}
        </ol>
        {join
          ? <button className="btn-primary block" onClick={signUp}>สมัครเลย</button>
          : <button className="btn-primary block" onClick={() => app.go('/discover/new')}>เขียนโพสต์แรก</button>}
      </section>

      <div className="af-sec-head"><h2>สินค้าแนะนำให้โปรโมต</h2><small>ค่าคอมสูง ขายดีช่วงนี้</small></div>
      <ul className="af-list">
        {AFF.products.map((a) => {
          const p = DATA.products[a.id];
          return (
            <li key={a.id} className="af-row">
              <a className="af-row-img" href={`#/product/${a.id}`}><ProductImage p={p} /></a>
              <div className="af-row-mid">
                <a className="clamp2" href={`#/product/${a.id}`}>{p.title}</a>
                <span className="af-rate">ค่าคอม {a.rate}% · ได้ {baht(Math.round((p.price * a.rate) / 100))}/ชิ้น</span>
              </div>
              <button className="af-copy" aria-label={`คัดลอกลิงก์ ${p.title}`} onClick={() => copy(a.id)}><Icon name="link-simple" size={20} /></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AffiliateBody({ app }) {
  if (app.cases.affNew || app.cases.affNone) return <AffiliateStart app={app} />;
  const [tab, setTab] = useState('products');
  const conv = ((AFF.orders / AFF.clicks) * 100).toFixed(1);
  const withdraw = () => app.toast(`ส่งคำขอถอน ${baht(AFF.available)} แล้ว · เข้าบัญชีภายใน 1–2 วันทำการ`);
  const copy = async (p) => {
    try { await navigator.clipboard.writeText(`${location.href.split('#')[0]}#/product/${p.id}?ref=nachum.ploy`); } catch (_) {}
    app.toast('คัดลอกลิงก์แล้ว');
  };
  return (
    <div className="af">
      <section className="af-earn">
        <small>รายได้เดือน{AFF.month}</small>
        <b>{baht(AFF.thisMonth)}</b>
        <div className="af-earn-row">
          <div><span>ถอนได้</span><b>{baht(AFF.available)}</b></div>
          <i aria-hidden="true" />
          <div><span>รอยืนยัน</span><b>{baht(AFF.pending)}</b></div>
          <i aria-hidden="true" />
          <div><span>รวมทั้งหมด</span><b>{baht(AFF.total)}</b></div>
        </div>
        <button className="btn-primary block" onClick={withdraw}>ถอนเงิน {baht(AFF.available)}</button>
        <p className="af-note"><Icon name="shield-check" fill size={16} />ค่าคอมมิชชันจะถอนได้หลังผู้ซื้อยืนยันรับสินค้า</p>
      </section>

      <section className="af-stats" aria-label="ผลลัพธ์เดือนนี้">
        <div><Icon name="cursor-click" size={20} /><b>{compact(AFF.clicks)}</b><span>คลิกลิงก์</span></div>
        <div><Icon name="shopping-bag" size={20} /><b>{AFF.orders}</b><span>คำสั่งซื้อ</span></div>
        <div><Icon name="chart-line-up" size={20} /><b>{conv}%</b><span>อัตราการซื้อ</span></div>
      </section>

      <div className="ds-tabs af-tabs" role="tablist" aria-label="รายละเอียด Affiliate">
        {[['products', 'สินค้าที่โปรโมต'], ['history', 'ประวัติรายได้']].map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'products' ? (
        <ul className="af-list">
          {AFF.products.map((a) => {
            const p = DATA.products[a.id];
            const per = Math.round((p.price * a.rate) / 100);
            return (
              <li key={a.id} className="af-row">
                <a className="af-row-img" href={`#/product/${a.id}`}><ProductImage p={p} /></a>
                <div className="af-row-mid">
                  <a className="clamp2" href={`#/product/${a.id}`}>{p.title}</a>
                  <span className="af-rate">ค่าคอม {a.rate}% · ได้ {baht(per)}/ชิ้น</span>
                  <small>{compact(a.clicks)} คลิก · {a.orders} คำสั่งซื้อ</small>
                </div>
                <button className="af-copy" aria-label={`คัดลอกลิงก์ ${p.title}`} onClick={() => copy(a)}><Icon name="link-simple" size={20} /></button>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="af-list">
          {AFF.recent.map((r, i) => {
            const p = DATA.products[r.id];
            return (
              <li key={i} className="af-row">
                <span className="af-row-img"><ProductImage p={p} /></span>
                <div className="af-row-mid">
                  <span className="ellipsis af-row-title">{p.title}</span>
                  <small>{r.when}</small>
                  <span className={`af-st ${r.status}`}>{AFF_STATUS[r.status]}</span>
                </div>
                <b className={`af-amt ${r.status}`}>{r.status === 'cancel' ? '' : '+'}{baht(r.amount)}</b>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function AffiliatePage({ app }) {
  if (app.cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="profile" />
        <main className="wrap w-aff"><h1 className="af-title">Affiliate</h1><AffiliateBody app={app} /></main>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <header className="m-hd af-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={24} /></button>
          <b className="af-hd-title">Affiliate</b>
          <button className="round-btn ghost af-help" aria-label="วิธีใช้ Affiliate" onClick={() => app.toast('ปักสินค้าในโพสต์ แล้วรับค่าคอมเมื่อมีคนซื้อผ่านลิงก์ของคุณ')}><Icon name="question" size={22} /></button>
        </div>
      </header>
      <div className="m-scroll af-page"><AffiliateBody app={app} /></div>
    </>
  );
}

Object.assign(window, { AffiliateCard, AffiliatePage });
