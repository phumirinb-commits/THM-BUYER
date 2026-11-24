// หน้าค้นพบ (Figma 1800:3777): สำหรับคุณ / กำลังติดตาม, compose box, posts with a pinned product.

const DI = (n) => `assets/images/discover/${n}`;

/** Designer icon from assets/icons/discover, painted in the text colour. */
function DisIcon({ name, size = 22 }) {
  const url = `url("../assets/icons/discover/${name}.svg")`;
  return <i className="o-ic" style={{ width: size, height: size, WebkitMaskImage: url, maskImage: url }} aria-hidden="true" />;
}

// Mock posts. `product` points at a real product, so the price and shop come from the data.
const POSTS = [
  { id: 'p1', author: 'ทาสน้องส้มจี๊ด', avatar: DI('avatar_somjeed.jpg'), time: '35 นาทีที่แล้ว', following: false,
    image: DI('post_fountain.png'), crop: { left: '-8.97%', top: '-2.31%', width: '224.1%', height: '112.05%' },
    text: 'วันหยุดกับน้องแมวแบบสบายๆ ใช้ถาดกินน้ำแบบนี้ทุกวัน น้องกินน้ำได้สะดวกมาก', tags: ['ของใช้แมว', 'ถาดกินน้ำแมว'],
    product: 38, badge: 'official', likes: 248, comments: 18 },
  { id: 'p2', author: 'ทาสน้องส้มจี๊ด', avatar: DI('avatar_somjeed.jpg'), time: '2 ชั่วโมงที่แล้ว', following: false,
    image: DI('post_plant.png'),
    text: 'Desk Plant Collection: ต้นไม้ฟอกอากาศขนาด 10–15 ซม.\nเหมาะกับพื้นที่ในร่ม แสงน้อยก็โตได้ พร้อมคู่มือการดูแล', tags: ['ต้นไม้จิ๋ว', 'ทาสต้นไม้'],
    likes: 248, comments: 18 },
  { id: 'p3', author: 'มะปราง ส.', avatar: 'assets/images/live/viewer_2.jpg', time: 'เมื่อวาน', following: true,
    image: 'assets/images/live/live_serum.jpg',
    text: 'ลองเซรั่มไฮยาลูรอนมาสองอาทิตย์ ผิวชุ่มขึ้นจริง เนื้อบาง ซึมไว ไม่เหนียวหน้า', tags: ['สกินแคร์', 'ผิวแห้ง'],
    product: 29, badge: 'mall', likes: 96, comments: 7 },
  // Text only.
  { id: 'p4', author: 'Jane', avatar: 'assets/images/live/viewer_3.jpg', time: '1 ชั่วโมงที่แล้ว', following: true,
    text: 'ใครเคยซื้อหม้อทอดไร้น้ำมันขนาด 5 ลิตรบ้างคะ\nบ้านมี 4 คน ขนาดนี้พอไหม หรือควรเอาใหญ่กว่านี้ แนะนำหน่อยค่ะ', tags: ['ถามหน่อย', 'ของใช้ในบ้าน'],
    likes: 32, comments: 14 },
  // Video: try-on clip from a fashion shop.
  { id: 'p5', author: 'ครามสกล', avatar: 'assets/images/avatar_kramsakon.png', time: '3 ชั่วโมงที่แล้ว', following: false,
    media: [{ type: 'video', url: A('assets/videos/live_fashion.mp4'), poster: A('assets/images/live/live_video2_poster.jpg') }],
    text: 'ลองชุดใหม่ล็อตนี้ให้ดูกันค่ะ ผ้าครามทอมือ เบาใส่สบาย ไม่ร้อน มีไซส์ S ถึง XL', tags: ['แฟชั่น', 'ลองชุด'],
    product: 4, badge: 'mall', shop: 'mall', likes: 512, comments: 41 },
  // Text on a background.
  { id: 'p6', author: 'Ploy', avatar: 'assets/images/live/viewer_4.jpg', time: 'เมื่อวาน', following: false,
    bg: 'blush', text: 'ของถึงแล้ว แพ็กมาดีมาก ตรงปกทุกชิ้น ขอบคุณร้านค้านะคะ', tags: ['รีวิวจริง'],
    likes: 87, comments: 5 },
  // Shop posts: `shop` = the shop's badge: official, mall or verified (ยืนยันตัวตน).
  // Like the story rings on Home: Official / Mall rides the avatar's top edge; verified = the seal after the name.
  { id: 's1', author: 'SIRINTRA Official', avatar: 'assets/images/shop_logo_sirintra.jpg', time: '20 นาทีที่แล้ว', following: false, shop: 'official',
    image: 'assets/images/sirintra/bag_square.jpg',
    text: 'ถือสานกระจูดทรงสี่เหลี่ยม ห้อยพู่ เข้าแล้วนะคะ\nสานมือจากชุมชนภาคใต้ ทรงไม่ยุบ ถือได้ทุกวัน', tags: ['กระเป๋าสาน', 'ของใหม่'],
    product: window.SIRINTRA.square, badge: 'official', likes: 1204, comments: 3 },
  { id: 's2', author: 'ป้าแว่น', avatar: 'assets/images/story_pa_waen.png', time: '4 ชั่วโมงที่แล้ว', following: true, shop: 'mall',
    image: 'assets/images/product_cookies.jpg',
    text: 'คุกกี้ช็อกโกแลตชิปอบใหม่วันนี้ 20 กล่อง อบเนยสดทุกเช้า สั่งก่อนบ่ายสองส่งวันนี้เลยจ้า', tags: ['ขนมทำเอง', 'คุกกี้'],
    product: 9, badge: 'mall', likes: 356, comments: 2 },
  { id: 's3', author: 'บ้านกาแฟดอย', avatar: 'assets/images/story_baan_kafae.png', time: 'เมื่อวาน', following: false, shop: 'official',
    image: 'assets/images/story_baan_kafae_2.png',
    text: 'สาขา 2 เปิดแล้ว แวะมานั่งกันได้นะครับ\nเมล็ดคั่วกลางล็อตใหม่ก็สั่งออนไลน์ได้ ส่งทั่วประเทศ', tags: ['กาแฟ', 'ร้านใหม่'],
    product: 30, badge: 'official', likes: 640, comments: 2 },
  { id: 's4', author: 'สวนเล็กของมิ้น', avatar: 'assets/images/product_monstera.jpg', time: '6 ชั่วโมงที่แล้ว', following: false, shop: 'verified',
    image: 'assets/images/product_plant_pot.jpg',
    text: 'พลูด่างกระถางเซรามิก รอบนี้มี 15 ต้น\nเลี้ยงง่าย แสงน้อยก็โต แพ็กส่งอย่างดีไม่ช้ำ', tags: ['ต้นไม้ในบ้าน', 'พลูด่าง'],
    product: 26, likes: 214, comments: 1 },
];
// Mixed order: people and shops; photo, text, video and background text.
const FEED_ORDER = ['p1', 's1', 'p4', 'p2', 's4', 'p5', 's2', 'p3', 's3', 'p6'];
POSTS.sort((a, b) => FEED_ORDER.indexOf(a.id) - FEED_ORDER.indexOf(b.id));

/** Product pinned under a post: photo, title, shop, price, sold, add to cart. */
function PostProduct({ app, id, badge, shopName }) {
  const p = DATA.products[id];
  // A shop's own post sells from that shop.
  const shop = shopName ? { name: shopName } : DATA.detailFor(id).shop;
  return (
    <div className="ds-prod">
      <a className="ds-prod-main" href={`#/product/${id}`}>
        <img src={A(p.image)} alt="" />
        <span className="ds-prod-mid">
          <b className="clamp2">{(badge || p.shopBadge) && <><ShopTag kind={badge || p.shopBadge} h={18} /> </>}{p.title}</b>
          {shop && <small className="ellipsis">{shop.name}</small>}
          <span className="ds-prod-price">
            <span className="now">{baht(p.price)}</span>
            {p.discount && <s>{baht(p.originalPrice)}</s>}
          </span>
        </span>
      </a>
      <span className="ds-sold">ขายแล้ว {p.soldCount.toLocaleString('en-US')}</span>
      <button className="ds-cart" aria-label="เพิ่มลงในตะกร้า" onClick={() => app.cart(id)}><img src={A('assets/icons/cart_add.svg')} width="20" height="20" alt="" /></button>
    </div>
  );
}

/** Posts written in this session (newest first); blob URLs for media. */
const MY_POSTS = [];
/** Photos picked from the feed's picture button, handed to สร้างโพสต์. */
const PENDING_MEDIA = [];

// Backgrounds for text-only posts. Text colour keeps at least 4.5:1 on the darker end.
const POST_BGS = [
  { k: 'red', bg: 'linear-gradient(135deg, #F0605E, #C81E1C)', ink: '#FFFFFF', name: 'แดง' },
  { k: 'blush', bg: 'linear-gradient(180deg, #FDF2F2, #F6C4C3)', ink: '#171717', name: 'ชมพูอ่อน' },
  { k: 'ink', bg: '#171717', ink: '#FFFFFF', name: 'ดำ' },
  { k: 'sky', bg: 'linear-gradient(135deg, #3F9BE0, #1460A0)', ink: '#FFFFFF', name: 'ฟ้า' },
  { k: 'mint', bg: 'linear-gradient(135deg, #2E9A64, #1A6B3C)', ink: '#FFFFFF', name: 'เขียว' },
  { k: 'sun', bg: 'linear-gradient(135deg, #FFE29A, #FFB067)', ink: '#171717', name: 'ส้มเหลือง' },
  { k: 'grape', bg: 'linear-gradient(135deg, #8C6CEB, #5536B8)', ink: '#FFFFFF', name: 'ม่วง' },
  { k: 'paper', bg: '#F6F6F7', ink: '#171717', name: 'เทาอ่อน' },
];
const bgOf = (k) => POST_BGS.find((b) => b.k === k);

function PrivacyLabel({ v }) {
  return <span className="ds-priv"><Icon name={v === 'private' ? 'lock-simple' : 'globe-hemisphere-west'} size={12} />{v === 'private' ? 'ส่วนตัว' : 'สาธารณะ'}</span>;
}

/** Photos and videos of a post, swiped sideways, with a 1/n count. */
/** Feed video: plays muted while on screen, pauses when scrolled away; tap the speaker for sound. */
function FeedVideo({ m, onOpen }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const v = ref.current;
    if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => (e.intersectionRatio > 0.6 ? v.play().catch(() => {}) : v.pause()), { threshold: [0, 0.6] });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <>
      <video ref={ref} src={m.url} poster={m.poster} playsInline muted={muted} loop preload="metadata" onClick={(e) => (onOpen ? onOpen() : e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause())} />
      <button className="ds-mute" aria-label={muted ? 'เปิดเสียง' : 'ปิดเสียง'} aria-pressed={!muted} onClick={() => setMuted(!muted)}>
        <Icon name={muted ? 'speaker-simple-slash' : 'speaker-simple-high'} fill size={18} />
      </button>
    </>
  );
}

function PostMedia({ media, onVideo }) {
  const [i, setI] = useState(0);
  const onScroll = (e) => { const el = e.currentTarget; setI(Math.round(el.scrollLeft / el.clientWidth)); };
  return (
    <div className="ds-media">
      <div className="ds-media-track hs" onScroll={onScroll}>
        {media.map((m, k) => (
          <div className="ds-media-slide" key={k}>
            {m.type === 'video' ? <FeedVideo m={m} onOpen={onVideo} /> : <img src={m.url} alt="" />}
          </div>
        ))}
      </div>
      {media.length > 1 && <span className="gal-count">{i + 1}/{media.length}</span>}
    </div>
  );
}

// ── Comments ──
const V = (n) => `assets/images/live/viewer_${n}.jpg`;
/** Comments per post: seeded mock ones, plus what the viewer writes in this session (newest first). */
const COMMENTS = {
  s4: [
    { who: 'Mine', avatar: V(1), time: '5 ชม.', text: 'ต้นสวยมาก ส่งต่างจังหวัดได้ไหมคะ', likes: 2, replies: [
      { who: 'สวนเล็กของมิ้น', avatar: 'assets/images/product_monstera.jpg', time: '4 ชม.', text: '@Mine ได้ค่ะ ส่งทั่วประเทศเลย', likes: 1 },
    ] },
  ],
  s1: [
    { who: 'แพรวา', avatar: V(2), time: '10 นาที', text: 'สีสวยมาก มีขายในไลฟ์คืนนี้ไหมคะ', likes: 6, replies: [
      { who: 'SIRINTRA Official', avatar: 'assets/images/shop_logo_sirintra.jpg', time: '8 นาที', text: '@แพรวา มีค่ะ ไลฟ์สองทุ่มนะคะ', likes: 3 },
    ] },
    { who: 'Mine', avatar: V(1), time: '5 นาที', text: 'เนื้อดีมากค่ะ ใช้อยู่', likes: 2 },
  ],
  s2: [
    { who: 'Jane', avatar: V(3), time: '3 ชม.', text: 'อร่อยมาก สั่งรอบที่สามแล้วค่ะ', likes: 9, replies: [
      { who: 'ป้าแว่น', avatar: 'assets/images/story_pa_waen.png', time: '2 ชม.', text: '@Jane ขอบคุณมากจ้า', likes: 2 },
    ] },
  ],
  s3: [
    { who: 'Ploy', avatar: V(4), time: '20 ชม.', text: 'สาขาใหม่อยู่ตรงไหนคะ', likes: 1, replies: [
      { who: 'บ้านกาแฟดอย', avatar: 'assets/images/story_baan_kafae.png', time: '18 ชม.', text: '@Ploy อยู่ถนนนิมมานฯ ซอย 7 ครับ', likes: 1 },
    ] },
  ],
  p1: [
    { who: 'แพรวา', avatar: V(2), time: '20 นาที', text: 'น้องแมวน่ารักมาก ตัวนี้เสียงดังไหมคะ', likes: 12, replies: [
      { who: 'ทาสน้องส้มจี๊ด', avatar: DI('avatar_somjeed.jpg'), time: '18 นาที', text: '@แพรวา เงียบมากค่ะ เปิดทั้งคืนไม่ได้ยินเลย', likes: 5 },
      { who: 'Jane', avatar: V(3), time: '16 นาที', text: '@ทาสน้องส้มจี๊ด จริงค่ะ ของเราก็เงียบ', likes: 1 },
    ] },
    { who: 'Jane', avatar: V(3), time: '15 นาที', text: 'ของเราใช้ตัวเดียวกันเลย ส่งรูปให้ดูค่ะ', media: { type: 'image', url: 'assets/images/product_pet_fountain.jpg' }, likes: 8 },
    { who: 'Ploy', avatar: V(4), time: '5 นาที', text: 'ล้างง่ายไหมคะ', likes: 1 },
  ],
  p2: [
    { who: 'Mine', avatar: V(1), time: '1 ชม.', text: 'พลูด่างเลี้ยงง่ายจริง วางโต๊ะทำงานสวยมาก', likes: 4, replies: [
      { who: 'ทาสน้องส้มจี๊ด', avatar: DI('avatar_somjeed.jpg'), time: '50 นาที', text: '@Mine ใช่ค่ะ รดน้ำอาทิตย์ละครั้งพอ', likes: 2 },
    ] },
    { who: 'Ploy', avatar: V(4), time: '30 นาที', text: 'กระถางสวยมาก ซื้อที่ไหนคะ', likes: 1 },
  ],
  p3: [
    { who: 'แพรวา', avatar: V(2), time: '10 ชม.', text: 'ผิวแพ้ง่ายใช้ได้ไหมคะ', likes: 3, replies: [
      { who: 'มะปราง ส.', avatar: V(2), time: '9 ชม.', text: '@แพรวา ผิวเราแพ้ง่ายก็ใช้ได้ค่ะ ไม่แสบเลย', likes: 2 },
    ] },
    { who: 'Jane', avatar: V(3), time: '6 ชม.', text: 'ใช้คู่กับกันแดดตัวไหนดีคะ', likes: 0 },
  ],
  p4: [
    { who: 'แพรวา', avatar: V(2), time: '50 นาที', text: 'บ้านเรา 4 คนใช้ 5 ลิตรพอดีค่ะ ทอดไก่ได้ทีละครึ่งตัว', likes: 6, replies: [
      { who: 'Jane', avatar: V(3), time: '45 นาที', text: '@แพรวา ขอบคุณค่ะ ใช้ยี่ห้ออะไรคะ', likes: 0 },
      { who: 'แพรวา', avatar: V(2), time: '40 นาที', text: '@Jane ของร้านใน Thaimart เลยค่ะ มีป้ายของแท้ด้วย', likes: 2 },
    ] },
    { who: 'Mine', avatar: V(1), time: '30 นาที', text: 'ถ้าชอบทำเยอะๆ เอา 7 ลิตรดีกว่าค่ะ', likes: 3 },
  ],
  p5: [
    { who: 'Ploy', avatar: V(4), time: '2 ชม.', text: 'ชุดนี้มีสีอื่นไหมคะ', likes: 9, replies: [
      { who: 'ครามสกล', avatar: 'assets/images/avatar_kramsakon.png', time: '2 ชม.', text: '@Ploy มีสีครามอ่อนกับครามเข้มค่ะ', likes: 4 },
    ] },
    { who: 'แพรวา', avatar: V(2), time: '1 ชม.', text: 'สวยมาก ผ้าดูเบาจริง', likes: 5 },
    { who: 'Jane', avatar: V(3), time: '40 นาที', text: 'สูง 160 ใส่ไซส์ไหนดีคะ', likes: 1 },
  ],
  p6: [
    { who: 'มะปราง ส.', avatar: V(2), time: '20 ชม.', text: 'ดีใจด้วยค่ะ ร้านไหนคะ', likes: 2 },
    { who: 'Jane', avatar: V(3), time: '18 ชม.', text: 'ตรงปกแบบนี้ชอบมาก', likes: 1 },
  ],
};
const commentsOf = (id) => (COMMENTS[id] = COMMENTS[id] || []);
/** Comments shown on a post: every comment plus every reply, so the number matches the list. */
const commentCount = (id) => commentsOf(id).reduce((n, c) => n + 1 + (c.replies || []).length, 0);

function CommentMedia({ m, mine }) {
  const src = mine ? m.url : A(m.url);
  return m.type === 'video'
    ? <video className="cmt-media" src={src} controls playsInline muted preload="metadata" />
    : <img className="cmt-media" src={src} alt="รูปในความคิดเห็น" />;
}

/** Comment text with @names (people in this thread) picked out. */
function MentionText({ text, names }) {
  if (!names.length) return text;
  const esc = names.slice().sort((x, y) => y.length - x.length).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(@(?:${esc.join('|')}))`, 'g');
  return text.split(re).map((part, i) => (i % 2 ? <b key={i} className="cmt-at">{part}</b> : part));
}

function CommentRow({ c, names, onReply, small }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className={`cmt ${small ? 'reply' : ''}`}>
      <img className="cmt-av" src={A(c.avatar)} alt="" />
      <div className="cmt-mid">
        <div className="cmt-top"><b>{c.who}</b><span>{c.time}</span></div>
        {c.text && <p><MentionText text={c.text} names={names} /></p>}
        {c.media && <CommentMedia m={c.media} mine={c.mine} />}
        <button className="cmt-reply" onClick={onReply}>ตอบกลับ</button>
      </div>
      <button className={`cmt-like ${liked ? 'on' : ''}`} aria-pressed={liked} aria-label="ถูกใจความคิดเห็น" onClick={() => setLiked(!liked)}>
        <Icon name="heart" fill={liked} size={small ? 16 : 18} />{c.likes + (liked ? 1 : 0) || ''}
      </button>
    </div>
  );
}

/** A top-level comment with its replies (one level deep, folded until opened). */
function CommentThread({ c, k, names, onReply, open, setOpen }) {
  const replies = c.replies || [];
  return (
    <div className="cmt-thread">
      <CommentRow c={c} names={names} onReply={() => onReply(k, c.who)} />
      {replies.length > 0 && (
        <div className="cmt-replies">
          {open && replies.map((r, j) => <CommentRow key={j} c={r} names={names} small onReply={() => onReply(k, r.who)} />)}
          <button className="cmt-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className="cmt-line" aria-hidden="true" />{open ? 'ซ่อนการตอบกลับ' : `ดูการตอบกลับ ${replies.length} รายการ`}
          </button>
        </div>
      )}
    </div>
  );
}

function CommentSheet({ app, post, onAdded, onClose }) {
  const [list, setList] = useState(() => commentsOf(post.id));
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);
  const [replyTo, setReplyTo] = useState(null); // { k: thread index, who }
  const [opened, setOpened] = useState({});
  const [caret, setCaret] = useState(0);
  const fileIn = useRef(null);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const loggedIn = app.cases.loggedIn;
  const count = list.reduce((n, c) => n + 1 + (c.replies || []).length, 0);

  // People who can be @mentioned: the post's author and everyone in the thread (not you).
  const names = [...new Set([post.author, ...list.flatMap((c) => [c.who, ...(c.replies || []).map((r) => r.who)])])].filter((n) => n && n !== 'คุณ');
  // The @word being typed right before the caret, if any.
  const at = (() => { const m = text.slice(0, caret).match(/@([^@\n]*)$/); return m && m[1].length <= 20 ? { q: m[1], start: caret - m[0].length } : null; })();
  const suggest = at ? names.filter((n) => n.toLowerCase().startsWith(at.q.toLowerCase())) : [];

  const focusEnd = (v) => requestAnimationFrame(() => { const el = inputRef.current; if (el) { el.focus(); el.setSelectionRange(v.length, v.length); setCaret(v.length); } });
  const mention = (name) => {
    const v = text.slice(0, at.start) + '@' + name + ' ' + text.slice(caret);
    setText(v); focusEnd(text.slice(0, at.start) + '@' + name + ' ');
  };
  const reply = (k, who) => {
    if (!loggedIn) return app.login('ตอบกลับความคิดเห็น');
    setReplyTo({ k, who });
    const v = who === 'คุณ' ? '' : '@' + who + ' ';
    setText(v); focusEnd(v);
  };
  const pick = (e) => {
    const f = e.target.files[0];
    if (f) setMedia({ type: f.type.startsWith('video') ? 'video' : 'image', url: URL.createObjectURL(f) });
    e.target.value = '';
  };
  const send = () => {
    if (!text.trim() && !media) return;
    const c = { who: 'คุณ', avatar: 'assets/images/story_you_profile.jpg', time: 'เมื่อสักครู่', text: text.trim(), media, likes: 0, mine: true };
    const cur = commentsOf(post.id);
    let next;
    if (replyTo) {
      next = cur.map((t, i) => (i === replyTo.k ? { ...t, replies: [...(t.replies || []), c] } : t));
      setOpened((o) => ({ ...o, [replyTo.k]: true }));
    } else next = [...cur, c];
    COMMENTS[post.id] = next;
    setList(next);
    setText(''); setMedia(null); setCaret(0);
    const wasReply = replyTo;
    setReplyTo(null); onAdded();
    if (!wasReply) setTimeout(() => { const el = bodyRef.current?.closest('.sheet-body'); if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }); }, 50);
  };
  const onType = (e) => { setText(e.target.value); setCaret(e.target.selectionStart); };

  return (
    <Sheet app={app} onClose={onClose} title="ความคิดเห็น" footer={() => (loggedIn ? (
      <div className="cmt-bar">
        {suggest.length > 0 && (
          <ul className="cmt-suggest" role="listbox" aria-label="เลือกคนที่จะกล่าวถึง">
            {suggest.slice(0, 5).map((n) => {
              const who = list.find((c) => c.who === n) || list.flatMap((c) => c.replies || []).find((r) => r.who === n);
              return (
                <li key={n}><button role="option" onMouseDown={(e) => e.preventDefault()} onClick={() => mention(n)}>
                  <img src={A(who ? who.avatar : post.avatar)} alt="" /><b>{n}</b>{n === post.author && <small>เจ้าของโพสต์</small>}
                </button></li>
              );
            })}
          </ul>
        )}
        {replyTo && (
          <div className="cmt-replying">
            <span>กำลังตอบกลับ <b>{replyTo.who}</b></span>
            <button aria-label="ยกเลิกการตอบกลับ" onClick={() => { setReplyTo(null); setText(''); }}><Icon name="x" size={16} /></button>
          </div>
        )}
        {media && (
          <div className="cmt-preview">
            {media.type === 'video' ? <video src={media.url} muted playsInline preload="metadata" /> : <img src={media.url} alt="" />}
            {media.type === 'video' && <span className="cm-vid"><Icon name="play" fill size={10} /></span>}
            <button className="cm-rm" aria-label="เอาไฟล์แนบออก" onClick={() => setMedia(null)}><Icon name="x" size={12} /></button>
          </div>
        )}
        <div className="cmt-row">
          <img className="cmt-me" src={A('assets/images/story_you_profile.jpg')} alt="" />
          <label className="cmt-input">
            <input ref={inputRef} value={text} onChange={onType} onSelect={(e) => setCaret(e.target.selectionStart)} onKeyDown={(e) => e.key === 'Enter' && !suggest.length && send()}
              placeholder={replyTo ? `ตอบกลับ ${replyTo.who}...` : 'แสดงความคิดเห็น...'} aria-label="แสดงความคิดเห็น" />
            <button className="cmt-attach" aria-label="แนบรูปหรือวิดีโอ" onClick={() => fileIn.current.click()}><Icon name="image" size={22} /></button>
          </label>
          <button className="cmt-send" aria-label="ส่งความคิดเห็น" disabled={!text.trim() && !media} onClick={send}><Icon name="paper-plane-right" fill size={20} /></button>
          <input ref={fileIn} type="file" accept="image/*,video/*" hidden onChange={pick} />
        </div>
      </div>
    ) : (
      <button className="btn-primary block" onClick={() => app.login('แสดงความคิดเห็น')}>เข้าสู่ระบบเพื่อแสดงความคิดเห็น</button>
    ))}>
      {(close) => (
        <div className="cmt-sheet" ref={bodyRef}>
          <div className="gf-head">
            <h2 className="ts-title lv-sheet-title">ความคิดเห็น {count}</h2>
            <button className="gf-close" aria-label="ปิด" onClick={close}><Icon name="x" size={20} /></button>
          </div>
          {list.length ? list.map((c, k) => (
            <CommentThread key={k} c={c} k={k} names={names} onReply={reply} open={!!opened[k]} setOpen={(v) => setOpened((o) => ({ ...o, [k]: v }))} />
          )) : <p className="o-empty">ยังไม่มีความคิดเห็น<br />เป็นคนแรกที่แสดงความคิดเห็น</p>}
        </div>
      )}
    </Sheet>
  );
}

/** Product peek from a post's product tag: a bottom sheet with the product page inside.
 *  Scrolling the content (or dragging the handle up) makes it full screen; drag down or ✕ closes. */
function ProductPeek({ app, id, onClose }) {
  const p = DATA.products[id];
  const d = useMemo(() => DATA.detailFor(id), [id]);
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef(null);
  useEffect(() => { requestAnimationFrame(() => setOpen(true)); document.body.classList.add('peek-open'); return () => document.body.classList.remove('peek-open'); }, []);
  const close = () => { setOpen(false); setTimeout(onClose, 280); };
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && close();
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, []);
  const onScroll = (e) => { if (!full && e.currentTarget.scrollTop > 4) setFull(true); };
  // Wheel / touch upward on the half sheet also opens it full (content may not scroll yet).
  const onWheel = (e) => { if (!full && e.deltaY > 0) setFull(true); };
  const down = (e) => { start.current = e.clientY; };
  const move = (e) => { if (start.current != null) setDrag(e.clientY - start.current); };
  const up = () => {
    if (start.current == null) return;
    if (drag < -40) setFull(true);
    else if (drag > 80) (full ? setFull(false) : close());
    start.current = null; setDrag(0);
  };
  const host = (!app.cases.web && document.querySelector('.phone')) || document.body;
  return ReactDOM.createPortal(
    <div className={`pk-layer ${app.cases.web ? 'web' : ''} ${open ? 'open' : ''} ${full ? 'full' : ''}`}>
      <div className="scrim" onClick={close} />
      <div className="pk-sheet" role="dialog" aria-modal="true" aria-label={p.title}
        style={drag ? { transform: `translateY(${Math.max(drag, full ? 0 : -60)}px)`, transition: 'none' } : null}>
        <div className="pk-grab" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
          {full ? (
            // Full screen = the product page's own header, with ✕ (back to Discover) in place of the back arrow.
            <header className="m-hd pk-hd">
              <div className="m-hd-row">
                <button className="round-btn ghost" aria-label="ปิด กลับไปหน้าค้นพบ" onClick={close}><Icon name="x" size={24} /></button>
                <label className="m-search">
                  <Icon name="magnifying-glass" size={18} />
                  <input type="search" placeholder="ค้นหาสินค้า" aria-label="ค้นหาสินค้า" />
                </label>
                <HeaderActions app={app} withSearch={false} />
                <RoundBtn icon="dots-three-vertical" label="เมนูเพิ่มเติม" size={22} />
              </div>
            </header>
          ) : <div className="handle" />}
        </div>
        <div className="pk-body pd" onScroll={onScroll} onWheel={onWheel} onTouchMove={() => !full && setFull(true)}>
          <Gallery p={p} d={d} />
          <div className="pd-body">
            <Summary p={p} d={d} />
            <Description d={d} />
            <Reviews p={p} d={d} />
            {d.shop && <ShopRow shop={d.shop} />}
            <Videos d={d} />
            <Related d={d} />
          </div>
        </div>
        <div className="m-actions pk-actions"><Buttons app={app} id={id} /></div>
      </div>
    </div>,
    host,
  );
}

/** Shop page index for a post author (exact name, or a shop whose name starts with it). */
const shopIndexOf = (name) => {
  const i = DATA.brands.findIndex((b) => b.name === name);
  return i >= 0 ? i : DATA.brands.findIndex((b) => b.name.startsWith(name + ' '));
};

function Post({ app, post, following, onFollow, onVideo }) {
  const [showComments, setShowComments] = useState(false);
  const [, bump] = useState(0);
  const [liked, setLiked] = useState(false);
  // Saved posts (prototype: kept for this visit). The profile's บันทึก tab lists them.
  const SAVED_POSTS = (window.SAVED_POSTS = window.SAVED_POSTS || []);
  const [saved, setSavedState] = useState(() => SAVED_POSTS.some((x) => x.id === post.id));
  const setSaved = (v) => {
    const i = SAVED_POSTS.findIndex((x) => x.id === post.id);
    if (v && i < 0) SAVED_POSTS.unshift(post);
    if (!v && i >= 0) SAVED_POSTS.splice(i, 1);
    setSavedState(v);
    app.toast(v ? 'บันทึกโพสต์แล้ว ดูได้ที่โปรไฟล์ แท็บบันทึก' : 'เอาออกจากที่บันทึกแล้ว');
  };
  // Like, save and follow need an account: logged out → the login page.
  const need = (why, fn) => () => (app.cases.loggedIn ? fn() : app.loginPage(why));
  const p = post.product != null ? DATA.products[post.product] : null;
  const shop = p && (post.shop ? { name: post.author } : DATA.detailFor(post.product).shop);
  // Product tag on the photo or video: bag icon, product name, shop. Same for people and shops.
  const [peek, setPeek] = useState(false);
  // Shop posts: the avatar and the name open the shop's profile page.
  const openShop = () => { const i = shopIndexOf(post.author); i >= 0 ? app.go('/shop/' + i) : app.toast('หน้าร้านนี้ยังไม่มีในต้นแบบ'); };
  // People: the avatar and the name open their profile (yours: your own profile tab).
  // Live now (same rooms as the live rings on Home): red ring + live badge on the avatar; the avatar opens the live room.
  const liveIdx = post.mine ? -1 : DATA.storyShops.findIndex((x) => x.live && x.name === post.author); // never on your own posts
  const openAuthor = () => (post.shop ? openShop() : post.mine ? app.go('/tab/profile') : app.go('/u/' + encodeURIComponent(post.author)));
  const aff = p && (
    <button className="ds-aff" aria-label={`ดูรายละเอียด ${p.title}`} onClick={() => setPeek(true)}>
      <span className="ds-aff-ic solo"><DisIcon name="bag" size={20} /></span>
      <span className="ds-aff-mid"><span className="ellipsis">{p.title}</span>{shop && <b className="ellipsis">{shop.name}</b>}</span>
    </button>
  );
  return (
    <article className="ds-post">
      {peek && <ProductPeek app={app} id={post.product} onClose={() => setPeek(false)} />}
      <header className="ds-author">
        {/* Shop posts: the avatar opens the shop's profile page. */}
        <button className={`ds-av-wrap ${liveIdx >= 0 ? 'live' : ''}`} aria-label={liveIdx >= 0 ? `${post.author} กำลังไลฟ์อยู่ แตะเพื่อดูไลฟ์` : post.shop ? `ดูหน้าร้าน ${post.author}` : `โปรไฟล์ ${post.author}`}
          onClick={() => (liveIdx >= 0 ? app.go('/live/' + liveIdx) : openAuthor())}>
          {liveIdx >= 0 ? (
            // Same as a live ring in the Home stories: spinning red-orange ring + broadcast pill.
            <>
              <div className="ring live ds-ring"><div className="photo"><img src={A(post.avatar)} alt="" /></div></div>
              <span className="live-badge ds-lb" aria-hidden="true"><Icon name="broadcast" size={12} /></span>
            </>
          ) : <img className="ds-av" src={A(post.avatar)} alt="" />}
          {(post.shop === 'official' || post.shop === 'mall') && <span className="mark-top"><ShopTag kind={post.shop} /></span>}
        </button>
        <span className="ds-author-mid">
          <b className="ds-name">{post.shop
            ? <button className="ds-name-btn ellipsis" onClick={() => openShop()}>{post.author}</button>
            : <button className="ds-name-btn ellipsis" onClick={() => openAuthor()}>{post.author}</button>}{post.shop === 'verified' && <img className="id-seal" src={A('assets/icons/verified_seal.svg')} width="16" height="16" alt="ยืนยันตัวตน" />}</b>
          <small>{post.time}{post.mine && <> · <PrivacyLabel v={post.privacy} /></>}</small>
        </span>
        {!post.mine && (
          <button className={`ds-follow ${following ? 'on' : ''}`} aria-pressed={following} aria-label={following ? 'กำลังติดตาม แตะเพื่อเลิกติดตาม' : 'ติดตาม'} onClick={need('ติดตาม', onFollow)}>
            {/* Following: icon only (same as the shop page). */}
            {following ? <i className="o-ic" style={{ width: 20, height: 20, WebkitMaskImage: `url("${A('assets/icons/user_check.svg')}")`, maskImage: `url("${A('assets/icons/user_check.svg')}")` }} aria-hidden="true" /> : '+ ติดตาม'}
          </button>
        )}
        <button className="ds-more" aria-label="ตัวเลือกเพิ่มเติม"><DisIcon name="ellipsis" size={18} /></button>
      </header>

      {post.media && post.media.length > 0 && <div className="ds-media-wrap"><PostMedia media={post.media} onVideo={onVideo && (() => onVideo(post))} />{aff}</div>}
      {post.bg && !(post.media && post.media.length) && (
        <div className="ds-bgpost" style={{ background: bgOf(post.bg).bg, color: bgOf(post.bg).ink }}><p>{post.text}</p></div>
      )}
      {post.image && (
      <div className="ds-photo">
        <img src={A(post.image)} alt="" style={post.crop ? { ...post.crop, objectFit: 'cover' } : null} className={post.crop ? 'crop' : ''} />
        {aff}
      </div>
      )}

      {(post.text && !(post.bg && !(post.media && post.media.length)) || post.tags.length > 0) && (
      <div className="ds-text">
        {!(post.bg && !(post.media && post.media.length)) && post.text.split('\n').map((t, i) => <p key={i}>{t}</p>)}
        {post.tags.length > 0 && <p className="ds-tags">{post.tags.map((t) => <a key={t} href="#/tab/discover">#{t}</a>)}</p>}
      </div>
      )}


      <div className="ds-acts">
        <button className={`ds-act ${liked ? 'liked' : ''}`} aria-pressed={liked} aria-label="ถูกใจ" onClick={need('กดถูกใจโพสต์', () => setLiked(!liked))}>
          {liked ? <img className="ds-heart" src={A('assets/icons/discover/heart.svg')} width="22" height="22" alt="" /> : <Icon name="heart" size={22} />}{(post.likes + (liked ? 1 : 0)).toLocaleString('en-US')}
        </button>
        <button className="ds-act" aria-label="ความคิดเห็น" onClick={() => setShowComments(true)}><DisIcon name="comment" />{commentCount(post.id)}</button>
        <button className="ds-act"><i className="o-ic" style={{ width: 24, height: 24, margin: -1, WebkitMaskImage: `url("../assets/icons/share.svg")`, maskImage: `url("../assets/icons/share.svg")` }} aria-hidden="true" />แชร์</button>
        <span className="grow" />
        <button className={`ds-act ds-save ${saved ? 'on' : ''}`} aria-pressed={saved} aria-label={saved ? 'เลิกบันทึกโพสต์' : 'บันทึกโพสต์'} onClick={need('บันทึกโพสต์', () => setSaved(!saved))}>{saved ? <Icon name="bookmark-simple" fill size={22} /> : <DisIcon name="bookmark" size={21} />}</button>
      </div>
      {showComments && <CommentSheet app={app} post={post} onAdded={() => bump((n) => n + 1)} onClose={() => setShowComments(false)} />}
    </article>
  );
}

// ── Mock phone gallery (picture button on ค้นพบ) ──
const GP = (n) => `assets/images/${n}`;
const GALLERY = [
  ...['discover/post_plant.png', 'product_pet_fountain.jpg', 'product_monstera.jpg', 'product_cookies.jpg', 'product_bread.jpg', 'product_coffee_beans.jpg',
    'product_black_dress.jpg', 'product_linen_blouse.jpg', 'product_serum.jpg', 'product_lipstick.jpg', 'product_cat_tree.jpg', 'product_plant_pot.jpg',
    'product_bunny_plush.jpg', 'product_honey.jpg', 'product_granola.jpg', 'product_desk_lamp.jpg', 'product_rattan_basket.jpg', 'product_shoulder_bag.jpg',
    'product_green_tea.jpg', 'product_cushion.jpg', 'product_side_table.jpg', 'product_pet_bed.jpg', 'product_jeans.jpg', 'product_eyeshadow.jpg']
    .map((n, i) => ({ id: 'g' + i, type: 'image', thumb: GP(n), url: GP(n), fav: [1, 2, 8, 13, 19].includes(i) })),
];
// Two clips, slotted near the top like recent videos.
GALLERY.splice(2, 0, { id: 'v1', type: 'video', thumb: GP('live/live_video2_poster.jpg'), url: 'assets/videos/live_fashion.mp4', dur: '0:12' });
GALLERY.splice(7, 0, { id: 'v2', type: 'video', thumb: GP('live/live_video_poster.jpg'), url: 'assets/videos/live_makeup.mp4', dur: '0:27', fav: true });
const GP_ALBUMS = [['all', 'ล่าสุด'], ['video', 'วิดีโอ'], ['fav', 'รายการโปรด']];
const GP_MAX = 10;

// Selfies and people shots at the top when picking a profile photo.
const GP_PEOPLE = ['profile/avatar.jpg', 'story_you_profile.jpg', 'live/viewer_1.jpg', 'live/viewer_2.jpg', 'live/viewer_3.jpg', 'live/viewer_4.jpg']
  .map((n, i) => ({ id: 'p' + i, type: 'image', thumb: GP(n), url: GP(n), fav: i < 2 }));
function GalleryPicker({ app, onClose, onDone, onCamera, startAlbum = 'all', max = GP_MAX, photosOnly = false, title, doneLabel = 'ถัดไป' }) {
  const [album, setAlbum] = useState(startAlbum);
  const [picked, setPicked] = useState([]); // ids in the order chosen
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setOpen(true)); }, []);
  const close = () => { setOpen(false); setTimeout(onClose, 250); };
  const pool = photosOnly ? [...GP_PEOPLE, ...GALLERY.filter((g) => g.type === 'image')] : GALLERY;
  const items = pool.filter((g) => (album === 'video' ? g.type === 'video' : album === 'fav' ? g.fav : true));
  const toggle = (id) => setPicked((p) => {
    if (p.includes(id)) return p.filter((x) => x !== id);
    if (max === 1) return [id]; // single pick: tap another to swap
    if (p.length >= max) { setFull(true); setTimeout(() => setFull(false), 1800); return p; }
    return [...p, id];
  });
  const done = () => onDone(picked.map((id) => {
    const g = pool.find((x) => x.id === id);
    return { url: A(g.url), type: g.type, name: id, path: g.url };
  }));
  const host = (!app.cases.web && document.querySelector('.phone')) || document.body;
  return ReactDOM.createPortal(
    <div className={`gp-layer ${app.cases.web ? 'web' : ''} ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="เลือกรูปภาพ">
      <div className="gp">
        <header className="gp-hd">
          <button className="round-btn ghost" aria-label="ปิด" onClick={close}><Icon name="x" size={24} /></button>
          <h2>{title || (startAlbum === 'video' ? 'เลือกวิดีโอ' : 'เลือกรูปภาพ')}</h2>
          {max > 1 ? <span className="gp-count">{picked.length}/{max}</span> : <span className="gp-count" />}
        </header>
        <div className="gp-albums" role="tablist" aria-label="อัลบั้ม">
          {GP_ALBUMS.filter(([k]) => !photosOnly || k !== 'video').map(([k, label]) => (
            <button key={k} role="tab" aria-selected={album === k} className={album === k ? 'on' : ''} onClick={() => setAlbum(k)}>{label}</button>
          ))}
        </div>
        <div className="gp-grid">
          {album === 'all' && (
            <button className="gp-cam" onClick={onCamera}><Icon name="camera" size={28} /><span>ถ่ายรูป</span></button>
          )}
          {items.map((g) => {
            const n = picked.indexOf(g.id) + 1;
            return (
              <button key={g.id} className={`gp-tile ${n ? 'on' : ''}`} aria-pressed={!!n} aria-label={`${g.type === 'video' ? 'วิดีโอ' : 'รูป'} ${n ? 'เลือกแล้ว ลำดับที่ ' + n : ''}`} onClick={() => toggle(g.id)}>
                <img src={A(g.thumb)} alt="" loading="lazy" />
                {g.type === 'video' && <span className="gp-dur"><Icon name="play" fill size={10} />{g.dur}</span>}
                <span className="gp-check" aria-hidden="true">{max === 1 ? (n ? <Icon name="check" size={12} /> : '') : (n || '')}</span>
              </button>
            );
          })}
        </div>
        {full && <p className="gp-toast" role="status">เลือกได้สูงสุด {max} รายการ</p>}
        <footer className={`gp-foot ${picked.length ? 'show' : ''}`}>
          <div className="gp-picked hs">
            {picked.map((id) => {
              const g = pool.find((x) => x.id === id);
              return (
                <span key={id} className="gp-mini">
                  <img src={A(g.thumb)} alt="" />
                  <button aria-label="เอาออก" onClick={() => toggle(id)}><Icon name="x" size={10} /></button>
                </span>
              );
            })}
          </div>
          <button className="btn-primary" disabled={!picked.length} onClick={done}>{doneLabel}{picked.length && max > 1 ? ` (${picked.length})` : ''}</button>
        </footer>
      </div>
    </div>,
    host,
  );
}

function DiscoverBody({ app }) {
  const [tab, setTab] = useState('foryou');
  const [follows, setFollows] = useState(() => Object.fromEntries(POSTS.map((p) => [p.author, p.following])));
  const all = [...MY_POSTS, ...POSTS];
  const list = tab === 'foryou' ? all : all.filter((p) => p.mine || follows[p.author]);
  // Tap a video in the feed: play it as Reels, then swipe on through the feed's other videos.
  const [reel, setReel] = useState(null);
  const openVideo = (post) => { const reels = postsToReels(list); setReel({ reels, start: Math.max(0, reels.findIndex((r) => r.key === post.id)) }); };
  const compose = () => (app.cases.loggedIn ? app.go('/discover/new') : app.loginPage('เขียนโพสต์'));
  // Picture button: straight to the device gallery, then to สร้างโพสต์ with the photos in.
  const photoIn = useRef(null);
  const [gallery, setGallery] = useState(false);
  const pickPhotos = () => (app.cases.loggedIn ? setGallery(true) : app.loginPage('ลงรูปภาพ'));
  const onPhotos = (e) => {
    const files = [...e.target.files].slice(0, 10);
    e.target.value = '';
    if (!files.length) return;
    PENDING_MEDIA.splice(0, PENDING_MEDIA.length, ...files.map((f) => ({ url: URL.createObjectURL(f), type: 'image', name: f.name })));
    app.go('/discover/new');
  };
  return (
    <>
      <div className="ds-tabs" role="tablist" aria-label="ฟีด">
        {[['foryou', 'สำหรับคุณ'], ['following', 'กำลังติดตาม']].map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>

      {/* Compose box removed: the floating + (bottom right) creates a post, story or live, as on the profile. */}
      {gallery && (
        <GalleryPicker app={app} onClose={() => setGallery(false)} onCamera={() => photoIn.current.click()}
          onDone={(items) => { PENDING_MEDIA.splice(0, PENDING_MEDIA.length, ...items); app.go('/discover/new'); }} />
      )}

      <div className="ds-feed">
        {list.length ? list.map((p) => (
          <Post key={p.id} app={app} post={p} following={follows[p.author]} onFollow={() => setFollows((f) => ({ ...f, [p.author]: !f[p.author] }))} onVideo={openVideo} />
        )) : <p className="o-empty">ยังไม่ได้ติดตามใคร<br />กด + ติดตาม ที่โพสต์ที่ชอบ แล้วโพสต์จะมาอยู่ที่นี่</p>}
      </div>
      {reel && <ReelsViewer app={app} reels={reel.reels} start={reel.start} owner={{ name: '', avatar: '' }} onClose={() => setReel(null)} />}
    </>
  );
}

/** Discover while loading: tabs, compose box, two posts. */
function DiscoverSkeleton() {
  return (
    <div className="skeleton" aria-busy="true" aria-label="กำลังโหลด">
      <div style={{ display: 'flex', gap: 24, padding: '12px 16px' }}><Sk w={64} h={20} /><Sk w={64} h={20} /></div>
      <div style={{ padding: '4px 16px 12px' }}><Sk w="100%" h={72} r={36} style={{ display: 'block' }} /></div>
      {[0, 1].map((i) => (
        <div key={i} style={{ borderTop: '8px solid #F6F6F7', padding: '12px 0' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '0 16px' }}>
            <Sk w={40} h={40} r={20} />
            <div className="sk-col" style={{ alignItems: 'flex-start', gap: 6 }}><Sk w={120} h={14} /><Sk w={80} h={12} /></div>
          </div>
          <div style={{ padding: '12px 16px', display: 'grid', gap: 6 }}><Sk w="90%" h={14} /><Sk w="60%" h={14} /></div>
          <Sk w="100%" h={300} r={0} style={{ display: 'block' }} />
          <div style={{ display: 'flex', gap: 20, padding: '12px 16px 0' }}><Sk w={48} h={20} /><Sk w={48} h={20} /><Sk w={48} h={20} /></div>
        </div>
      ))}
    </div>
  );
}

function DiscoverPage({ app }) {
  const loading = useLoading('discover');
  if (app.cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="discover" />
        <main className="wrap w-discover">{loading ? <DiscoverSkeleton /> : <DiscoverBody app={app} />}</main>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <header className="m-hd mood">
        <div className="m-hd-row">
          <Logo />
          <span className="grow" />
          <HeaderActions app={app} withSearch />
        </div>
      </header>
      <div className="m-scroll ds-page">{loading ? <DiscoverSkeleton /> : <DiscoverBody app={app} />}</div>
      {!loading && <CreateFab app={app} />}
      <BottomNav app={app} current="discover" />
    </>
  );
}

window.DiscoverPage = DiscoverPage;

// ════════ สร้างโพสต์ (#/discover/new) ════════

const PRIVACY = [
  { k: 'public', label: 'สาธารณะ', icon: 'globe-hemisphere-west', sub: 'ทุกคนเห็นโพสต์นี้ในหน้าค้นพบ' },
  { k: 'private', label: 'ส่วนตัว', icon: 'lock-simple', sub: 'เห็นแค่คุณ' },
];
const BG_MAX = 150; // longer text goes back to a plain post

function PrivacySheet({ app, value, onPick, onClose }) {
  // Same layout as the other pickers (เลือกขนส่ง, เลือกบัตร): centred title, plain rows with dividers, radio on the right.
  return (
    <Sheet app={app} onClose={onClose} title="ใครเห็นโพสต์นี้ได้บ้าง">
      {(close) => (
        <div className="cs">
          <div className="nt-hd"><b>ใครเห็นโพสต์นี้ได้บ้าง</b><button className="gf-close" aria-label="ปิด" onClick={close}><Icon name="x" size={22} /></button></div>
          <div className="cs-list" role="radiogroup" aria-label="ใครเห็นโพสต์นี้ได้บ้าง">
            {PRIVACY.map((o) => (
              <button key={o.k} role="radio" aria-checked={value === o.k} className={`cs-item ${value === o.k ? 'on' : ''}`} onClick={() => { onPick(o.k); close(); }}>
                <span className="co-pay-mk cod"><Icon name={o.icon} size={22} /></span>
                <span className="cs-mid"><b>{o.label}</b><small>{o.sub}</small></span>
                <i className="co-radio" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}
    </Sheet>
  );
}

function DiscardSheet({ app, onDiscard, onClose }) {
  return (
    <Sheet app={app} onClose={onClose} title="ทิ้งโพสต์นี้ไหม" footer={(close) => (
      <div className="cm-discard-btns">
        <button className="btn-line" onClick={close}>เขียนต่อ</button>
        <button className="btn-primary" onClick={onDiscard}>ทิ้งโพสต์</button>
      </div>
    )}>
      <h2 className="ts-title">ทิ้งโพสต์นี้ไหม</h2>
      <p className="cm-note">ข้อความ รูป และวิดีโอที่ใส่ไว้จะหายไป</p>
    </Sheet>
  );
}

function ComposeBody({ app, web }) {
  const [kb, setKb] = useState(false); // mock phone keyboard while typing (prototype frame only)
  const kbOn = () => { if (!web && !matchMedia('(pointer: coarse)').matches) setKb(true); };
  const [text, setText] = useState('');
  const [bg, setBg] = useState(null);
  const [media, setMedia] = useState(() => PENDING_MEDIA.splice(0));
  const [privacy, setPrivacy] = useState('public');
  const [palette, setPalette] = useState(false);
  const [pick, setPick] = useState(null); // in-app gallery: 'all' (รูปภาพ) | 'video' (วิดีโอ)
  const [sheet, setSheet] = useState(null);
  const imgIn = useRef(null);
  const vidIn = useRef(null);
  const taRef = useRef(null);
  const hasMedia = media.length > 0;
  const onBg = !!bg && !hasMedia && text.length <= BG_MAX;
  const ready = text.trim().length > 0 || hasMedia;
  const dirty = text.length > 0 || hasMedia;

  // Plain textarea grows with its text.
  useLayoutEffect(() => { const el = taRef.current; if (el && !onBg) { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; } }, [text, onBg]);
  useEffect(() => { taRef.current?.focus(); }, []);

  const add = (e, type) => {
    const files = [...e.target.files].slice(0, 10 - media.length);
    setMedia((m) => [...m, ...files.map((f) => ({ url: URL.createObjectURL(f), type, name: f.name }))]);
    setPalette(false);
    e.target.value = '';
  };
  const remove = (k) => setMedia((m) => m.filter((_, i) => i !== k));
  const leave = () => app.go('/tab/discover'); // after posting: show it on ค้นพบ
  const goBack = () => app.back(); // ✕ / discard: back to wherever they came from (Home, profile, ค้นพบ)
  const close = () => (dirty ? setSheet('discard') : goBack());
  const post = () => {
    if (!ready) return;
    const tags = (text.match(/#[^\s#]+/g) || []).map((t) => t.slice(1));
    const body = text.replace(/#[^\s#]+/g, '').replace(/[ \t]+\n/g, '\n').trim();
    MY_POSTS.unshift({ id: 'me' + Date.now(), mine: true, author: 'คุณ', avatar: 'assets/images/story_you_profile.jpg', time: 'เมื่อสักครู่',
      text: body, tags, bg: onBg ? bg : null, media, privacy, likes: 0, comments: 0 });
    leave();
  };
  const priv = PRIVACY.find((o) => o.k === privacy);
  const b = onBg ? bgOf(bg) : null;

  const head = (
    <header className={web ? 'cm-hd web' : 'm-hd'}>
      <div className="m-hd-row">
        <button className="round-btn ghost" aria-label="ปิด" onClick={close}><Icon name="x" size={24} /></button>
        <h1 className="cm-title">สร้างโพสต์</h1>
        <button className="cm-post" disabled={!ready} onClick={post}>โพสต์</button>
      </div>
    </header>
  );

  const body = (
    <div className="cm-body">
      <div className="cm-author">
        <img src={A('assets/images/story_you_profile.jpg')} alt="" />
        <span>
          <b>คุณ</b>
          <button className="cm-priv" aria-haspopup="dialog" onClick={() => setSheet('privacy')}>
            <Icon name={priv.icon} size={14} />{priv.label}<Icon name="caret-down" size={12} />
          </button>
        </span>
      </div>

      {onBg ? (
        <div className="cm-bgcard" style={{ background: b.bg, color: b.ink }}>
          <textarea ref={taRef} value={text} onChange={(e) => setText(e.target.value)} onFocus={kbOn} onBlur={() => setKb(false)} placeholder="อยากเล่าอะไรวันนี้" aria-label="ข้อความโพสต์" style={{ '--ph': b.ink }} />
        </div>
      ) : (
        <textarea ref={taRef} className="cm-ta" value={text} onChange={(e) => setText(e.target.value)} onFocus={kbOn} onBlur={() => setKb(false)} placeholder="อยากเล่าอะไรวันนี้ ใส่ #แฮชแท็ก ได้" aria-label="ข้อความโพสต์" rows={3} />
      )}
      {bg && !hasMedia && text.length > BG_MAX && <p className="cm-note">ข้อความยาวเกิน {BG_MAX} ตัวอักษร โพสต์นี้จะไม่มีพื้นหลัง</p>}

      {hasMedia && (
        <div className="cm-media">
          {media.map((m, k) => (
            <div className="cm-thumb" key={m.url}>
              {m.type === 'video' ? <video src={m.url} muted playsInline preload="metadata" /> : <img src={m.url} alt="" />}
              {m.type === 'video' && <span className="cm-vid"><Icon name="play" fill size={12} />วิดีโอ</span>}
              <button className="cm-rm" aria-label={`ลบ${m.type === 'video' ? 'วิดีโอ' : 'รูป'}ที่ ${k + 1}`} onClick={() => remove(k)}><Icon name="x" size={14} /></button>
            </div>
          ))}
          {media.length < 10 && <button className="cm-thumb cm-addmore" aria-label="เพิ่มรูป" onClick={() => setPick('all')}><Icon name="plus" size={24} /></button>}
        </div>
      )}
    </div>
  );

  const tools = (
    <div className="cm-tools">
      {palette && !hasMedia && (
        <div className="cm-palette hs" role="radiogroup" aria-label="พื้นหลัง">
          <button role="radio" aria-checked={!bg} aria-label="ไม่มีพื้นหลัง" className={`cm-sw none ${!bg ? 'on' : ''}`} onClick={() => setBg(null)}>Aa</button>
          {POST_BGS.map((o) => (
            <button key={o.k} role="radio" aria-checked={bg === o.k} aria-label={`พื้นหลัง${o.name}`} className={`cm-sw ${bg === o.k ? 'on' : ''}`} style={{ background: o.bg, color: o.ink }} onClick={() => setBg(o.k)}>Aa</button>
          ))}
        </div>
      )}
      <div className="cm-toolrow">
        <button onClick={() => setPick('all')}><i className="o-ic ic-photo" style={{ width: 22, height: 22, WebkitMaskImage: `url("${A('assets/icons/cm_image.svg')}")`, maskImage: `url("${A('assets/icons/cm_image.svg')}")` }} aria-hidden="true" />รูปภาพ</button>
        <button onClick={() => setPick('video')}><i className="o-ic ic-video" style={{ width: 22, height: 22, WebkitMaskImage: `url("${A('assets/icons/cm_video.svg')}")`, maskImage: `url("${A('assets/icons/cm_video.svg')}")` }} aria-hidden="true" />วิดีโอ</button>
        <button aria-pressed={palette} disabled={hasMedia} onClick={() => setPalette(!palette)} className={palette ? 'on' : ''}><i className="o-ic ic-bg" style={{ width: 22, height: 22, WebkitMaskImage: `url("${A('assets/icons/cm_bg.svg')}")`, maskImage: `url("${A('assets/icons/cm_bg.svg')}")` }} aria-hidden="true" />พื้นหลัง</button>
      </div>
      {hasMedia && <p className="cm-note small">ใส่พื้นหลังได้เฉพาะโพสต์ที่มีแต่ข้อความ</p>}
      <input ref={imgIn} type="file" accept="image/*" multiple hidden onChange={(e) => add(e, 'image')} />
      <input ref={vidIn} type="file" accept="video/*" hidden onChange={(e) => add(e, 'video')} />
    </div>
  );

  const sheets = sheet === 'privacy'
    ? <PrivacySheet app={app} value={privacy} onPick={setPrivacy} onClose={() => setSheet(null)} />
    : sheet === 'discard' ? <DiscardSheet app={app} onDiscard={goBack} onClose={() => setSheet(null)} /> : null;
  // รูปภาพ / วิดีโอ: the app's own gallery (not the phone's file picker). Up to 10 in the post.
  const picker = pick && (
    <GalleryPicker app={app} startAlbum={pick} max={Math.max(1, 10 - media.length)} onClose={() => setPick(null)} onCamera={() => imgIn.current.click()}
      onDone={(items) => { setMedia((m) => [...m, ...items]); setPalette(false); setPick(null); }} />
  );

  if (web) return <div className="cm-card">{head}{body}{tools}{sheets}{picker}</div>;
  // Typing: the keyboard sits under the tool row, as on a phone.
  const keyboard = kb && <MockKeyboard onKey={(ch) => setText((t) => t + ch)} onBack={() => setText((t) => [...t].slice(0, -1).join(''))} onSend={() => taRef.current?.blur()} doneLabel="เสร็จ" />;
  return <>{head}<div className="m-scroll cm-page">{body}</div>{tools}{keyboard}{sheets}{picker}</>;
}

function ComposePage({ app }) {
  if (app.cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="discover" />
        <main className="wrap w-compose"><ComposeBody app={app} web /></main>
        <Footer />
      </div>
    );
  }
  return <ComposeBody app={app} />;
}

window.ComposePage = ComposePage;

window.Post = Post;
window.GalleryPicker = GalleryPicker;
