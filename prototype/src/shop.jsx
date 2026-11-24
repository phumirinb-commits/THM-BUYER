// หน้าโปรไฟล์ร้านค้า (#/shop/:i): opens from a "ร้านดีแนะนำ" card on Home.
// Layout follows the kit's shop page: cover, logo, name, follow, counts, trust pills, tabs หน้าหลัก · สินค้า.
// Products, counts and the promo are mock data per shop.

const SHOP_MOCK = {
  'ครามสกล': { products: [4, 6, 24, 21, 33, 49, 51, 12], followers: 48200, rating: 4.9, promo: { tag: 'ลดราคา', title: 'ลดสูงสุด 20% ผ้าครามทอมือ', sub: 'ถึง 30 พ.ย. เท่านั้น', product: 4 } },
  'SIRINTRA Official': { promoImg: 'assets/images/shop_promo_sirintra.jpg', cover: 'assets/images/shop_cover_sirintra.jpg', banner: 'assets/images/shop_banner_bags.jpg', banners2: ['assets/images/shop_banner_tote.jpg', 'assets/images/shop_banner_hobo.jpg', 'assets/images/shop_banner_reeds.jpg', 'assets/images/shop_banner_weaver.jpg'], bannersFull: ['assets/images/shop_banner_model_hobo.jpg', 'assets/images/shop_banner_model_tote.jpg'], shelf: [
    [{ img: 'bag_361', key: 'bucket' }, { img: 'bag_360', key: 'square' }, { img: 'bag_359', key: 'clutch' }],
    [{ img: 'bag_364', key: 'moon' }, { img: 'bag_363', key: 'round' }, { img: 'bag_362', key: 'tote' }],
  ], products: window.SIRINTRA_IDS, followers: 126400, rating: 4.9, promo: { tag: 'ของใหม่', title: 'กระเป๋าสานกระจูด ทรงถัง พู่ห้อย', sub: 'ส่งฟรีเมื่อซื้อครบ ฿500', product: window.SIRINTRA.bucket } },
  'Oxford Studio': { products: [21, 50, 51, 48, 12, 49, 31], followers: 15300, rating: 4.8, promo: { tag: 'ลดราคา', title: 'เสื้อเชิ้ตผ้าระบายอากาศ ลด 15%', sub: 'ถึง 25 พ.ย. เท่านั้น', product: 21 } },
  'Green Haven': { products: [26, 34, 53, 54, 56, 14, 35], followers: 8900, rating: 4.7, promo: { tag: 'ลดราคา', title: 'ต้นไม้ฟอกอากาศ ซื้อ 2 ลด 10%', sub: 'ถึงสิ้นเดือนนี้', product: 34 } },
  'ป้าแว่น ของใช้ในบ้าน': { products: [2, 57, 52, 55, 35, 41, 20], followers: 21700, rating: 4.8, promo: { tag: 'ลดราคา', title: 'ปลั๊กพ่วงและของใช้ ลดสูงสุด 25%', sub: 'ถึง 20 พ.ย. เท่านั้น', product: 2 } },
};
// Shops without their own mock: their products are the ones whose detail names this shop.
const productsOfShop = (name) => DATA.products.map((p, i) => i).filter((i) => !DATA.products[i].hidden && DATA.detailFor(i).shop?.name === name);
const shopMock = (b) => SHOP_MOCK[b.name] || { products: (productsOfShop(b.name).length ? productsOfShop(b.name) : DATA.columns[0][0]).slice(0, 12), followers: 5000 + b.name.length * 731, rating: 4.8, promo: null };

/** A shop by name: one of the ร้านดีแนะนำ shops, else built from a product's shop data (cart, orders…). */
function shopByName(name) {
  const b = DATA.brands.find((x) => x.name === name);
  if (b) return b;
  const id = DATA.products.findIndex((p, i) => DATA.detailFor(i).shop?.name === name);
  const sh = id >= 0 ? DATA.detailFor(id).shop : { name, avatar: 'assets/images/story_you_profile.jpg' };
  return { name, tagline: 'สินค้าคุณภาพ ส่งไว', cover: id >= 0 ? DATA.products[id].image : sh.avatar, avatar: sh.avatar, badge: sh.badge || null, idVerified: !!sh.verified };
}
/** Link to a shop's page from its name. */
const shopHref = (name) => { const i = DATA.brands.findIndex((x) => x.name === name); return i >= 0 ? '/shop/' + i : '/shop/n/' + encodeURIComponent(name); };

const SHOP_CHIPS = [
  { k: 'rec', label: 'สินค้าแนะนำ', icon: 'thumbs-up' },
  { k: 'best', label: 'สินค้าขายดี', icon: 'fire' },
  { k: 'new', label: 'สินค้าใหม่', icon: 'sparkle' },
];

/** Horizontal card for "สินค้ายอดนิยมของร้าน". */
function ShopHCard({ id }) {
  const p = DATA.products[id];
  return (
    <a className="sh-hcard" href={`#/product/${id}`}>
      <span className="sh-hcard-img"><ProductImage p={p} /></span>
      <span className="sh-hcard-body">
        <span className="clamp2">{p.title}</span>
        <span className="sh-hcard-price"><b>{baht(p.price)}</b>{p.discount && <s>{baht(p.originalPrice)}</s>}</span>
      </span>
    </a>
  );
}

/** สินค้าแนะนำ: products standing on shelves (Figma 3903:16766). 3 per shelf, ‹ › pages through the shelf. */
function ShopShelves({ rows }) {
  return (
    <section className="sh-shelves" aria-label="สินค้าแนะนำ">
      <h2>สินค้าแนะนำ</h2>
      {rows.map((row, r) => <ShopShelfRow key={r} items={[...row, ...rows[(r + 1) % rows.length]]} />)}
    </section>
  );
}

function ShopShelfRow({ items }) {
  const track = useRef(null);
  const pages = [];
  for (let i = 0; i < items.length; i += 3) pages.push(items.slice(i, i + 3));
  // Endless loop: a copy of the last shelf sits before the first and a copy of the first after the last.
  // When the scroll settles on a copy, jump (no animation) to the real shelf, so swipes and ‹ › never end.
  const loop = [pages[pages.length - 1], ...pages, pages[0]];
  const settle = useRef(0);
  useLayoutEffect(() => { const el = track.current; if (el) el.scrollLeft = el.clientWidth; }, []);
  const onScroll = () => {
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const el = track.current; if (!el) return;
      const w = el.clientWidth;
      const n = Math.round(el.scrollLeft / w);
      if (n === 0) el.scrollLeft = pages.length * w;
      else if (n === loop.length - 1) el.scrollLeft = w;
    }, 120);
  };
  // One swipe or one arrow tap moves the whole shelf (board and its 3 products).
  const page = (dir) => {
    const el = track.current; if (!el) return;
    const w = el.clientWidth;
    el.scrollTo({ left: (Math.round(el.scrollLeft / w) + dir) * w, behavior: 'smooth' });
  };
  return (
    <div className="sh-shelf">
      <div className="sh-shelf-pages" ref={track} onScroll={onScroll}>
        {loop.map((pg, k) => (
          <div key={k} className="sh-shelf-page" aria-hidden={k === 0 || k === loop.length - 1 ? true : undefined}>
            <img className="sh-shelf-board" src={A('assets/images/shelf/shelf_board.svg')} alt="" />
            <div className="sh-shelf-row">
              {pg.map((it, i) => {
                const id = window.SIRINTRA[it.key];
                const p = DATA.products[id];
                const off = p.discount ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
                return (
                  <a key={i} className="sh-shelf-item" href={`#/product/${id}`} aria-label={`${p.title} ${baht(p.price)}${off ? ` ลด ${off}%` : ''}`}>
                    <span className="sh-shelf-img"><img src={A(`assets/images/shelf/${it.img}.png`)} alt="" /></span>
                    {off > 0 && <span className="sh-shelf-tag">ลด {off}%</span>}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button className="sh-shelf-arrow prev" aria-label="ชั้นก่อนหน้า" onClick={() => page(-1)}><i /></button>
      <button className="sh-shelf-arrow next" aria-label="ชั้นถัดไป" onClick={() => page(1)}><i /></button>
    </div>
  );
}

/** ร้านค้า tab: about the shop (mock): intro, how it serves, Thaimart's promises, a few reviews. */
function ShopAbout({ b, m, ids }) {
  const reviews = [
    { who: 'แพรวา', avatar: 'assets/images/live/viewer_2.jpg', stars: 5, text: 'ของตรงปก แพ็กมาดีมาก ส่งไวกว่าที่คิด' },
    { who: 'Mine', avatar: 'assets/images/live/viewer_1.jpg', stars: 5, text: 'ร้านตอบแชทไว แนะนำดี จะกลับมาซื้ออีก' },
  ];
  return (
    <div className="sh-about">
      <section className="sh-card sh-intro">
        <h2>เกี่ยวกับร้าน</h2>
        <p>{b.name} ขาย{b.tagline} ของทุกชิ้นร้านคัดเอง ถ่ายรูปจากของจริง มีคำถามทักแชทได้เลย</p>
      </section>
      {m.banner && (
        <section className="sh-banner" aria-label="แบนเนอร์ร้าน">
          <img src={A(m.banner)} alt={`สินค้าของ ${b.name}`} />
          {/* Two square banners side by side, under the wide one. */}
          {m.banners2 && (
            <div className="sh-banner-2">
              {m.banners2.map((src, i) => <img key={src} src={A(src)} alt={`โปรโมชันของ ${b.name} ${i + 1}`} />)}
            </div>
          )}
          {/* Full-width photos, stacked top to bottom. */}
          {m.bannersFull && m.bannersFull.map((src, i) => <img key={src} className="sh-banner-full" src={A(src)} alt={`ภาพสินค้าของ ${b.name} ${i + 1}`} />)}
        </section>
      )}
      <section className="sh-card">
        <h2>ซื้อกับร้านนี้อุ่นใจ</h2>
        <ul className="sh-promises">
          {/* The shop's own badge, explained (Official / Mall); shops without one keep the x2 promise. */}
          {b.badge === 'official' ? (
            <li><span className="sh-prom-tag"><ShopTag kind="official" h={18} /></span><span><b>ร้านทางการของแบรนด์</b><small>เจ้าของแบรนด์ขายเอง ของแท้ส่งตรงจากแบรนด์</small></span></li>
          ) : b.badge === 'mall' ? (
            <li><span className="sh-prom-tag"><ShopTag kind="mall" h={18} /></span><span><b>ตัวแทนจำหน่ายที่แบรนด์แต่งตั้ง</b><small>รับของจากแบรนด์โดยตรง ของแท้ทุกชิ้น</small></span></li>
          ) : (
            <li><span className="sh-prom-tag"><TrustIcon k="x2" size={24} /></span><span><b>ปลอมคืนเงิน 2 เท่า</b><small>ถ้าพบว่าเป็นของปลอม</small></span></li>
          )}
          <li><span className="sh-prom-tag"><TrustIcon k="truck" size={24} /></span><span><b>จัดส่งฟรี</b><small>เมื่อซื้อครบตามเงื่อนไขของร้าน</small></span></li>
          {b.idVerified ? (
            <li><span className="sh-prom-tag"><img src={A('assets/icons/verified_seal.svg')} width="24" height="24" alt="" /></span><span><b>ร้านยืนยันตัวตนแล้ว</b><small>Thaimart ตรวจตัวตนและเอกสารของร้านแล้ว</small></span></li>
          ) : (
            <li><span className="sh-prom-tag"><Icon name="shield-check" fill size={24} className="red" /></span><span><b>Thaimart ถือเงินไว้ให้</b><small>ร้านได้เงินเมื่อคุณยืนยันรับของ</small></span></li>
          )}
        </ul>
      </section>
      <section className="sh-card">
        <h2 className="sh-card-row">รีวิวร้าน<span><Icon name="star" fill size={16} className="sh-star" /> {m.rating} / 5</span></h2>
        {reviews.map((r) => (
          <div className="sh-review" key={r.who}>
            <img src={A(r.avatar)} alt="" />
            <div><b>{r.who}</b><span className="sh-stars">{'★'.repeat(r.stars)}</span><p>{r.text}</p></div>
          </div>
        ))}
      </section>
    </div>
  );
}

/** Rank medal (the designer's rank.svg: a medal with ribbons), in gold / silver / bronze, with the number. */
const RANK_COLORS = ['#D4A017', '#9AA1A9', '#B87333'];
function RankMedal({ n }) {
  const c = RANK_COLORS[n - 1] || RANK_COLORS[2];
  return (
    <svg className="sh-medal" width="26" height="32" viewBox="0 0 18.5 22.64" aria-hidden="true">
      <path fill={c} d="M17.9116 18.3123C17.8316 18.0723 17.6816 17.7823 17.5416 17.4823L15.4116 13.1123C16.4116 11.8023 17.0116 10.1723 17.0116 8.40234C17.0116 4.12234 13.5416 0.652344 9.26158 0.652344C4.98158 0.652344 1.50158 4.11234 1.50158 8.39234C1.50158 10.1623 2.10158 11.8023 3.10158 13.1023L0.971578 17.4723C0.821578 17.7723 0.681578 18.0623 0.601578 18.3023C0.521578 18.5223 0.411577 18.9323 0.641577 19.3323C0.691577 19.4323 0.771578 19.5123 0.861578 19.5723C1.13158 19.7623 1.48158 19.8323 1.78158 19.8323C2.11158 19.8423 2.48158 19.7923 2.90158 19.6823C3.25158 19.5923 3.46158 19.5323 3.62158 19.5023C3.72158 19.4823 3.77158 19.4923 3.78158 19.4923L3.84158 19.5223C3.84158 19.5223 3.88158 19.5723 3.92158 19.6523C4.00158 19.7923 4.08158 20.0023 4.20158 20.3223C4.36158 20.7323 4.51158 21.1123 4.66158 21.3823C4.79158 21.6223 5.06158 22.0423 5.59158 22.1223C5.67158 22.1323 5.74158 22.1323 5.82158 22.1223C6.27158 22.0523 6.58158 21.7123 6.76158 21.4523C6.97158 21.1523 7.16158 20.7623 7.33158 20.3023L8.91158 16.1323C9.03158 16.1323 9.14158 16.1323 9.26158 16.1323C9.38158 16.1323 9.49158 16.1323 9.61158 16.1323L11.1916 20.3023C11.3516 20.7123 11.4916 21.0923 11.6316 21.3723C11.7616 21.6123 12.0216 22.0423 12.5516 22.1323C12.6316 22.1423 12.7016 22.1423 12.7816 22.1323C13.2516 22.0623 13.5716 21.7023 13.7516 21.4423C13.9616 21.1423 14.1616 20.7423 14.3516 20.2823L14.5116 19.8923C14.5516 19.7923 14.5916 19.7123 14.6216 19.6423C14.6816 19.5323 14.7016 19.5323 14.6816 19.5423C14.7016 19.5323 14.7216 19.5223 14.7516 19.5123H14.7716C14.7716 19.5123 14.8416 19.5123 14.9116 19.5223C15.0716 19.5523 15.2816 19.6023 15.6316 19.7023C16.0416 19.8123 16.4216 19.8623 16.7516 19.8523C17.0516 19.8523 17.4016 19.7823 17.6716 19.5923C17.6716 19.5923 17.7116 19.5623 17.7416 19.5423C17.7416 19.5423 17.7616 19.5323 17.7716 19.5223C17.7716 19.5223 17.8116 19.4823 17.8516 19.4323C17.8616 19.4223 17.9316 19.3323 17.9816 19.2023C17.9916 19.1623 18.0116 19.0923 18.0216 18.9923C18.0616 18.7223 17.9916 18.4723 17.9416 18.3123H17.9116Z" />
      <path fill="#fff" d="M5.69146 22.6406C5.63146 22.6406 5.57146 22.6406 5.51146 22.6306C4.97146 22.5506 4.54146 22.2206 4.22146 21.6306C4.06146 21.3406 3.91146 20.9606 3.75146 20.5506C3.66146 20.3306 3.60145 20.1706 3.55146 20.0506C3.41145 20.0806 3.25146 20.1206 3.04146 20.1806C2.59145 20.3006 2.15146 20.3606 1.77146 20.3506C1.29146 20.3406 0.891455 20.2206 0.571455 19.9906C0.421455 19.8806 0.291455 19.7406 0.211455 19.5806C-0.0285449 19.1606 -0.0485449 18.6806 0.131455 18.1406C0.221455 17.8906 0.361455 17.5906 0.521455 17.2706L2.53146 13.1506C1.54146 11.7506 1.01146 10.1106 1.01146 8.38062C1.00146 3.84062 4.70146 0.140625 9.25146 0.140625C13.8015 0.140625 17.5015 3.84062 17.5015 8.39062C17.5015 10.1206 16.9815 11.7606 15.9815 13.1606L17.9815 17.2606C18.1515 17.6106 18.2915 17.9006 18.3815 18.1506C18.4915 18.4806 18.5315 18.7806 18.4815 19.0706C18.4815 19.1606 18.4515 19.2806 18.4215 19.3506C18.3515 19.5406 18.2615 19.6806 18.2115 19.7406C18.1515 19.8206 18.0915 19.8706 18.0815 19.8806L17.9415 19.9906C17.6315 20.2106 17.2215 20.3306 16.7415 20.3506C16.3515 20.3506 15.9315 20.3006 15.4815 20.1806C15.2615 20.1206 15.1015 20.0806 14.9715 20.0506C14.9715 20.0606 14.9615 20.0706 14.9515 20.0906L14.7915 20.4806C14.5815 21.0006 14.3615 21.4206 14.1415 21.7406C13.7715 22.2606 13.3315 22.5606 12.8415 22.6306C12.7115 22.6506 12.5815 22.6506 12.4515 22.6306C11.9115 22.5406 11.4815 22.2006 11.1815 21.6106C11.0215 21.3206 10.8815 20.9306 10.7315 20.5206L9.26146 16.6406H9.25146L7.80146 20.4806C7.60146 21.0106 7.39146 21.4306 7.17146 21.7406C6.81146 22.2406 6.39146 22.5406 5.90146 22.6206C5.83146 22.6306 5.77146 22.6406 5.70146 22.6406H5.69146ZM3.75146 19.0106C3.75146 19.0106 3.81146 19.0106 3.84145 19.0106L4.09146 19.1006L4.22146 19.2206C4.22146 19.2206 4.28146 19.3006 4.35146 19.4306C4.43146 19.5906 4.52146 19.8006 4.66146 20.1506C4.82146 20.5606 4.96146 20.9206 5.09146 21.1506C5.26146 21.4606 5.43146 21.6106 5.65146 21.6406C5.94146 21.6006 6.15146 21.4506 6.34146 21.1706C6.51146 20.9306 6.69146 20.5806 6.85146 20.1306L8.55146 15.6206L8.91146 15.6406C9.12146 15.6406 9.34146 15.6406 9.56146 15.6406L9.92146 15.6206L11.6315 20.1306C11.7915 20.5506 11.9215 20.9006 12.0515 21.1406C12.2115 21.4506 12.3815 21.6006 12.6015 21.6406C12.8915 21.6106 13.1015 21.4506 13.3115 21.1506C13.4915 20.9006 13.6715 20.5406 13.8515 20.1006L14.0115 19.7006C14.0615 19.5706 14.1115 19.4806 14.1515 19.4006C14.1915 19.3306 14.2715 19.1706 14.4215 19.0906L14.4515 19.0706C14.4515 19.0706 14.4815 19.0606 14.5015 19.0506L14.6915 19.0006C14.7615 19.0006 14.8315 19.0006 14.9515 19.0206C15.1215 19.0506 15.3415 19.1106 15.7215 19.2106C16.0715 19.3106 16.4115 19.3606 16.6915 19.3406C16.9715 19.3406 17.1915 19.2706 17.3415 19.1706L17.4215 19.0706L17.4715 18.9006C17.5015 18.7306 17.4515 18.5706 17.4115 18.4606C17.3415 18.2506 17.2115 17.9906 17.0815 17.7206L14.7915 13.0306L14.9815 12.7806C15.9615 11.5006 16.4815 9.98062 16.4815 8.37062C16.4815 4.37062 13.2315 1.12063 9.23145 1.12063C5.23145 1.12063 2.00146 4.39062 2.00146 8.39062C2.00146 10.0006 2.52146 11.5206 3.50146 12.8006L3.69146 13.0506L1.42146 17.7006C1.28146 17.9906 1.15146 18.2606 1.07146 18.4806C0.981455 18.7506 0.981455 18.9406 1.07146 19.1006C1.09146 19.1306 1.11146 19.1606 1.14146 19.1806C1.29146 19.2806 1.51146 19.3406 1.79146 19.3506C2.08146 19.3706 2.41146 19.3106 2.76146 19.2206C3.13145 19.1206 3.36145 19.0606 3.53146 19.0306C3.61145 19.0206 3.68146 19.0106 3.75146 19.0106Z" />
      <circle cx="9.25" cy="8.06" r="7.56" fill={c} stroke="#fff" strokeWidth="1" />
      <text x="9.25" y="8.1" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="9.5" fontWeight="700" fontFamily="'Sukhumvit Tadmai', sans-serif">{n}</text>
    </svg>
  );
}

function ShopHome({ m, ids }) {
  const [chip, setChip] = useState('rec');
  const [popped, setPopped] = useState(false); // only a chip the user picks pops
  const order = {
    rec: ids,
    best: [...ids].sort((a, b) => DATA.products[b].soldCount - DATA.products[a].soldCount),
    new: [...ids].reverse(),
  }[chip];
  const pp = m.promo && DATA.products[m.promo.product];
  return (
    <div className="sh-home">
      <div className="sh-sec-head"><h2>สินค้ายอดนิยมของร้าน</h2></div>
      {/* Top 3 by sales, full product cards like สินค้าทั้งหมด, with a 1–3 rank badge. */}
      <div className="sh-pop hs">
        {[...ids].sort((a, b) => DATA.products[b].soldCount - DATA.products[a].soldCount).slice(0, 3).map((id, i) => (
          <div key={id} className="sh-pop-item" aria-label={`อันดับ ${i + 1}`} role="group">
            <ProductCard id={id} />
            <RankMedal n={i + 1} />
          </div>
        ))}
      </div>
      {/* Shop's own promo artwork when it has one, else the red promo card. */}
      {m.promoImg ? (
        <button className="sh-promo-img-banner" aria-label="สินค้าใหม่มาแล้ว ดูสินค้าทั้งหมด" onClick={(e) => e.currentTarget.closest('.sh-home').querySelector('.sh-all')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          <img src={A(m.promoImg)} alt="สินค้าใหม่มาแล้ว อัปเดตไอเทมใหม่ในร้าน พร้อมให้ช้อป" />
        </button>
      ) : pp && (
        <a className="sh-promo" href={`#/product/${m.promo.product}`}>
          <span className="sh-promo-mid">
            <span className="sh-promo-tag">{m.promo.tag}</span>
            <b>{m.promo.title}</b>
            <small>{m.promo.sub}</small>
          </span>
          <span className="sh-promo-img"><img src={A(pp.image)} alt="" /></span>
        </a>
      )}
      {m.shelf && <ShopShelves rows={m.shelf} />}
      <div className="sh-sec-head sh-all"><h2>สินค้าทั้งหมด</h2></div>
      <div className="sh-grid"><Masonry ids={order} cols={2} /></div>
    </div>
  );
}

/** โพสต์: the shop's posts as a grid (same tiles as the profile page): photos, video, text posts. Mock. */
function ShopPosts({ app, b, m, ids }) {
  const [viewer, setViewer] = useState(null);
  const imgs = ids.map((id) => DATA.products[id].image);
  const tiles = [
    ...(imgs.includes(b.cover) ? [] : [{ img: b.cover, kind: 'multi' }]), // no repeat when the cover is a product photo
    { text: m.promo ? `${m.promo.title}\n${m.promo.sub}` : 'ของเข้าใหม่ทุกสัปดาห์ กดติดตามไว้ได้เลย', bg: 'red' },
    { img: imgs[0] },
    { img: imgs[1], kind: 'video' },
    { img: imgs[2] },
    { text: `ขอบคุณลูกค้าทุกคนที่อุดหนุน ${b.name} นะคะ แพ็กของส่งทุกวัน` },
    { img: imgs[3], kind: 'multi' },
    { img: imgs[4] },
    { text: 'รีวิวจากลูกค้าจริง ⭐ 4.9', bg: 'blush' },
    ...imgs.slice(5).map((img) => ({ img })),
  ];
  const owner = { key: 'shop-' + b.name, name: b.name, avatar: b.avatar, shop: b.badge || (b.idVerified ? 'verified' : null) };
  return (
    <>
      <div className="pf-grid sh-posts">{tiles.map((t, i) => <PfTile key={i} t={t} label={`โพสต์ของร้าน ${i + 1}`} onClick={() => setViewer({ posts: tiles.map((x, k) => tileToPost(x, k, owner)), start: i, title: b.name })} />)}</div>
      {viewer && <PostViewer app={app} {...viewer} onClose={() => setViewer(null)} />}
    </>
  );
}


function ShopBody({ app, b, web }) {
  const m = shopMock(b);
  const ids = m.products.filter((id) => DATA.products[id] && !DATA.products[id].hidden);
  const [tab, setTab] = useState('products');
  const [following, setFollowing] = useState(false);
  const follow = () => (app.cases.loggedIn ? setFollowing(!following) : app.login('ติดตามร้านนี้'));
  const share = async () => {
    try { if (navigator.share) return await navigator.share({ title: b.name, url: location.href }); } catch (_) { return; }
    try { await navigator.clipboard.writeText(location.href); } catch (_) {}
    app.toast('คัดลอกลิงก์ร้านแล้ว');
  };
  return (
    <>
      <div className="sh-top">
        <div className="sh-cover"><img src={A(m.cover || b.cover)} alt="" /></div>
        {!web && (
          <div className="sh-bar">
            <button className="round-btn sh-rb" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={22} /></button>
            <span className="grow" />
            <button className="round-btn sh-rb" aria-label="ค้นหาในร้าน"><Icon name="magnifying-glass" size={20} /></button>
          </div>
        )}
        {/* Same layout as the profile page: centred logo over the cover, name, intro, counts, two buttons. */}
        {/* Logo on the left over the cover; name and @handle beside it; intro below. */}
        <div className="sh-who3">
          <div className="pf-av-wrap">
            <PfAvatar app={app} name={b.name} src={b.avatar} alt={`โลโก้ร้าน ${b.name}`} className="sh-av" />
            {b.badge && <span className="mark-top"><ShopTag kind={b.badge} h={18} /></span>}
          </div>
          <div className="sh-who3-txt">
            <h1 className="pf-name">{b.name}{b.idVerified && <img className="id-seal" src={A('assets/icons/verified_seal.svg')} width="18" height="18" alt="ยืนยันตัวตน" />}</h1>
            <p className="sh-handle">@{b.name.toLowerCase().replace(/[^a-z0-9ก-๙]+/g, '.').replace(/^\.|\.$/g, '')}</p>
          </div>
        </div>
        <p className="pf-bio sh-bio3">{b.tagline} · ของทุกชิ้นร้านคัดเอง ถ่ายจากของจริง</p>
        <p className="sh-stats1 pf-stats1">
          <span><b>{compact(m.followers + (following ? 1 : 0))}</b> ผู้ติดตาม</span>
          <span><Icon name="star" fill size={14} className="sh-star" /><b>{m.rating}</b> คะแนนร้าน</span>
          <span><b>{ids.length}</b> สินค้า</span>
        </p>
        {/* Following: the follow button shrinks to its label and แชทกับร้าน takes the rest. */}
        <div className={`pf-btns ${following ? 'sh-following' : ''}`}>
          <button className="pf-btn" onClick={() => openChat(app, b.name, true)}><Icon name="chat-circle-dots" size={18} />พูดคุยกับร้าน</button>
          <button className={`pf-btn ${following ? 'sh-follow-ic' : 'primary'}`} aria-pressed={following} aria-label={following ? 'กำลังติดตาม แตะเพื่อเลิกติดตาม' : 'ติดตาม'} onClick={follow}>
            {following
              ? <i className="o-ic" style={{ width: 18, height: 18, WebkitMaskImage: `url("${A('assets/icons/user_check.svg')}")`, maskImage: `url("${A('assets/icons/user_check.svg')}")` }} aria-hidden="true" />
              : <Icon name="plus" size={18} />}{following ? null : 'ติดตาม'}
          </button>
        </div>
      </div>
      <div className="ds-tabs sh-tabs" role="tablist" aria-label="เนื้อหาร้าน">
        {[['products', 'สินค้า'], ['posts', 'โพสต์'], ['home', 'เกี่ยวกับร้าน']].map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'home' && <ShopAbout b={b} m={m} ids={ids} />}
      {tab === 'posts' && <ShopPosts app={app} b={b} m={m} ids={ids} />}
      {tab === 'products' && <ShopHome m={m} ids={ids} />}
    </>
  );
}

function ShopPage({ app, index, name }) {
  const b = name ? shopByName(name) : DATA.brands[index];
  const [pinned, setPinned] = useState(false);
  // Status bar text: white over the cover, black on the white strip.
  useEffect(() => { document.body.classList.toggle('sh-pinned', pinned); return () => document.body.classList.remove('sh-pinned'); }, [pinned]);
  useEffect(() => { document.querySelector('.m-scroll')?.scrollTo?.(0, 0); scrollTo(0, 0); }, [index]);
  if (app.cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="home" />
        <main className="wrap w-shop"><ShopBody app={app} b={b} web /></main>
        <Footer />
      </div>
    );
  }
  return (
    <>
      {/* Once the cover scrolls away, a white strip fills the status bar area and the tabs pin just under the time. */}
      <div className={`m-scroll sh-page ${pinned ? 'pinned' : ''}`} onScroll={(e) => setPinned(e.currentTarget.scrollTop > 100)}>
        <div className="sh-statusfill" aria-hidden={!pinned}>
          <button className="round-btn ghost" aria-label="กลับ" tabIndex={pinned ? 0 : -1} onClick={() => app.back()}><Icon name="caret-left" size={24} /></button>
          <b className="ellipsis">{b.name}</b>
          <button className="round-btn" aria-label="ค้นหาในร้าน" tabIndex={pinned ? 0 : -1}><Icon name="magnifying-glass" size={20} /></button>
        </div>
        <ShopBody app={app} b={b} />
      </div>
    </>
  );
}

Object.assign(window, { ShopPage, shopHref, shopByName });
