// หน้าโปรไฟล์ (Figma 1345:9337): cover photo, avatar, name, bio, counts, edit / share, then tabs
// โพสต์ · Reels · สินค้า · บันทึก. Everything is mock data.

const PI = (n) => `assets/images/profile/${n}`;

// Profile photo: picked one (asset path or blob) or the default.
// '' = removed (no photo), undefined = the demo photo.
const meSrc = () => (ME.photo === '' ? null : ME.photo ? (ME.photo.startsWith('blob:') ? ME.photo : A(ME.photo)) : A('assets/images/story_you_profile.jpg'));
const ME = {
  name: 'nachum.ploy',
  handle: '@Rachel2234',
  bio: 'ชีวิตช้า ๆ ในบ้านเล็กชานเมือง 🌿 ปลูกผักเอง ทำอาหารเอง จัดบ้านแบบมินิมอล แชร์ของใช้ที่ใช้จริงทุกวัน\nและทำให้ชีวิตง่ายขึ้น',
  posts: 236, followers: 120000, following: 1000,
};

// Posts grid, in the Figma order. kind: 'multi' (several photos) or 'video'.
// Text-only posts: `text`, with `bg` (a Discover background) or none (plain).
const RV = (n, t) => `${A(`assets/videos/${n}.mp4`)}#t=${t}`;
// Video post: its clip, a poster frame (assets/images/reels) and the play mark.
const VP = (n, t) => ({ vid: RV(n, t), img: `assets/images/reels/${n}_${t}.jpg`, kind: 'video' });
const MY_GRID = [
  { img: PI('post_6.jpg') }, { img: PI('post_2.jpg'), kind: 'multi' }, { text: 'วันนี้ลองทำแยมสตรอว์เบอร์รี่เองครั้งแรก หวานกำลังดี ใครอยากได้สูตรบอกได้นะ', bg: 'blush' },
  { img: PI('post_1.jpg') }, { img: PI('post_7.jpg'), kind: 'video' }, { img: PI('post_8.jpg') },
  { text: 'ใครมีร้านต้นไม้ฟอกอากาศดี ๆ แนะนำหน่อยค่ะ\nอยากได้ไว้ห้องนอน แสงน้อย' }, { img: PI('post_10.jpg'), kind: 'multi' }, { img: PI('post_3.jpg') },
  VP('live_makeup', 7), { text: 'ปลูกผักเองครบ 1 ปีแล้ว 🌿', bg: 'mint' }, { img: PI('post_4.jpg') },
  { img: PI('post_5.jpg') }, VP('live_fashion', 1), { img: 'assets/images/product_bread.jpg' },
  { img: PI('post_9.jpg') }, { img: 'assets/images/product_monstera.jpg' }, VP('live_makeup', 24),
  { img: 'assets/images/product_cookies.jpg', kind: 'multi' }, VP('live_fashion', 11), { img: 'assets/images/product_coffee_beans.jpg' },
];
/** Posts written in Discover this visit go first. */
const fromMyPosts = () => MY_POSTS.map((m) => {
  const first = m.media && m.media[0];
  const kind = m.media && m.media.length > 1 ? 'multi' : first && first.type === 'video' ? 'video' : null;
  if (first && first.type === 'video' && !first.poster) return { vid: first.url, kind };
  if (first) return { img: first.poster || first.url, raw: true, kind };
  return { text: m.text, bg: m.bg };
});
// Reels: short videos (the two clips in assets/videos, from different moments). t = start second.
const MY_REELS = [
  { vid: RV('live_makeup', 2), img: 'assets/images/reels/live_makeup_2.jpg', views: 48200, likes: 3120, caption: 'แต่งหน้าโทนชมพูน้ำตาล 5 นาทีเสร็จ', product: 46 },
  { vid: RV('live_fashion', 3), img: 'assets/images/reels/live_fashion_3.jpg', views: 120500, likes: 9800, caption: 'ลองชุดผ้าครามทอมือ ใส่สบายมาก', product: 4 },
  { vid: RV('live_makeup', 12), img: 'assets/images/reels/live_makeup_12.jpg', views: 9800, likes: 640, caption: 'เซรั่มที่ใช้ทุกเช้า ผิวชุ่มทั้งวัน', product: 29 },
  { vid: RV('live_fashion', 9), img: 'assets/images/reels/live_fashion_9.jpg', views: 31400, likes: 2210, caption: 'แต่งตัวไปคาเฟ่วันหยุด', product: 22 },
  { vid: RV('live_makeup', 20), img: 'assets/images/reels/live_makeup_20.jpg', views: 5600, likes: 380, caption: 'ลิปสีนี้ทาแล้วหน้าสว่างขึ้น', product: 11 },
  { vid: RV('live_fashion', 6), img: 'assets/images/reels/live_fashion_6.jpg', views: 17300, likes: 1290, caption: 'กระเป๋าสานใบโปรด ใส่ของได้เยอะ', product: 10 },
];
// Products she has pinned in posts (affiliate), then saved posts.
const MY_PRODUCTS = [38, 29, 26, 30, 34, 11, 43, 50];
const MY_SAVED = [
  { img: 'assets/images/product_plant_pot.jpg' }, { img: 'assets/images/product_coffee_beans.jpg' }, { img: 'assets/images/discover/post_plant.png' },
  { img: 'assets/images/product_vase.jpg' }, { img: 'assets/images/product_cushion.jpg' }, { img: 'assets/images/discover/post_fountain.png' },
];

const PF_TABS = [
  { k: 'posts', label: 'โพสต์' },
  { k: 'reels', label: 'Reels' },
  { k: 'products', label: 'สินค้า' },
  { k: 'saved', label: 'บันทึก' },
];

function PfTile({ t, children, label, onClick }) {
  if (t.text != null) {
    const b = t.bg && bgOf(t.bg);
    return (
      <button className={`pf-tile pf-text ${b ? 'on-bg' : ''}`} onClick={onClick} aria-label={`${label}: ${t.text}`} style={b ? { background: b.bg, color: b.ink } : null}>
        <p>{t.text}</p>
      </button>
    );
  }
  return (
    <button className="pf-tile" aria-label={label} onClick={onClick}>
      {t.img ? <img src={t.raw ? t.img : A(t.img)} alt="" loading="lazy" /> : <video src={t.vid} muted playsInline preload="metadata" />}
      {t.kind === 'multi' && <Icon name="copy-simple" fill size={18} className="pf-tile-ic" />}
      {t.kind === 'video' && <Icon name="play" fill size={18} className="pf-tile-ic" />}
      {children}
    </button>
  );
}

// ── Full post view: tap a grid tile → the posts as full Discover posts, starting at that one. ──
const PV_CAPTIONS = [
  'วันนี้ได้ของที่สั่งไว้แล้ว ใช้จริงทุกวัน ชอบมาก',
  'มุมโปรดในบ้าน แสงเช้าสวยทุกวัน',
  'ของใช้ชิ้นนี้ทำให้ชีวิตง่ายขึ้นเยอะเลย',
  'แชร์ของดีที่ใช้อยู่ ใครสนใจถามได้นะ',
  'วันหยุดสบาย ๆ กับของที่ชอบ',
];
const PV_TIMES = ['2 ชั่วโมงที่แล้ว', 'เมื่อวาน', '3 วันที่แล้ว', '1 สัปดาห์ที่แล้ว', '2 สัปดาห์ที่แล้ว'];
/** One grid tile as a Discover post. owner: { key, name, avatar, mine, shop }. */
/** A video post as a Reel: its clip when there is one, else its photo (mock, no clip saved). */
function postToReel(t, i) {
  const likes = 120 + ((i * 53) % 900);
  return { vid: t.vid || null, img: t.img, raw: t.raw, views: likes * 14, likes, caption: PV_CAPTIONS[i % PV_CAPTIONS.length] };
}

/** Posts with a video → Reels (each keeps its own author). */
function postsToReels(posts) {
  return posts.filter((p) => p.media && p.media.some((m) => m.type === 'video')).map((p) => {
    const m = p.media.find((x) => x.type === 'video');
    const likes = p.likes || 120;
    return { key: p.id, vid: m.url, img: m.poster, raw: true, caption: p.text, likes, views: likes * 14, product: p.product, owner: { name: p.author, avatar: p.avatar } };
  });
}

function tileToPost(t, i, owner) {
  const base = { id: `pv-${owner.key}-${i}`, author: owner.name, avatar: owner.avatar, time: PV_TIMES[i % PV_TIMES.length],
    mine: owner.mine, privacy: 'public', shop: owner.shop, tags: [], likes: 40 + ((i * 37) % 300), following: false };
  if (t.text != null) return { ...base, text: t.text, bg: t.bg || null };
  const text = PV_CAPTIONS[i % PV_CAPTIONS.length];
  if (t.raw || t.vid) return { ...base, text, media: [{ type: t.vid ? 'video' : 'image', url: t.vid || t.img, poster: t.vid && t.img ? (t.raw ? t.img : A(t.img)) : undefined }] };
  return { ...base, text, image: t.img };
}

function PostViewer({ app, posts, start, title, onClose }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [follows, setFollows] = useState({});
  useEffect(() => {
    requestAnimationFrame(() => setOpen(true));
    const el = ref.current?.querySelectorAll('.ds-post')[start];
    if (el) ref.current.scrollTop = el.getBoundingClientRect().top - ref.current.getBoundingClientRect().top;
    document.body.classList.add('peek-open');
    const k = (e) => e.key === 'Escape' && close();
    addEventListener('keydown', k);
    return () => { removeEventListener('keydown', k); document.body.classList.remove('peek-open'); };
  }, []);
  const close = () => { setOpen(false); setTimeout(onClose, 250); };
  // Tap a video: play it as Reels, swipe on through this list's videos (and, on your own profile, your Reels).
  const [reel, setReel] = useState(null);
  const openVideo = (post) => { const reels = [...postsToReels(posts), ...(posts[0]?.mine ? MY_REELS : [])]; setReel({ reels, start: Math.max(0, reels.findIndex((r) => r.key === post.id)) }); };
  const host = (!app.cases.web && document.querySelector('.phone')) || document.body;
  return ReactDOM.createPortal(
    <div className={`pv ${open ? 'open' : ''} ${app.cases.web ? 'web' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
      <header className="m-hd pv-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={close}><Icon name="caret-left" size={24} /></button>
          <b className="pv-title">{title}</b>
          <span className="pv-sp" />
        </div>
      </header>
      <div className="pv-list ds-page" ref={ref}>
        {posts.map((p) => <Post key={p.id} app={app} post={p} following={!!follows[p.author] || p.following} onFollow={() => setFollows((f) => ({ ...f, [p.author]: !f[p.author] }))} onVideo={openVideo} />)}
      </div>
      {reel && <ReelsViewer app={app} reels={reel.reels} start={reel.start} owner={posts[0] ? { name: posts[0].author, avatar: posts[0].avatar } : ME_OWNER} onClose={() => setReel(null)} />}
    </div>,
    host,
  );
}

/** Full-screen Reels: swipe up/down one video at a time; the one on screen plays. */
function ReelSlide({ app, r, owner, active, muted, setMuted }) {
  const v = useRef(null);
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const el = v.current; if (!el) return;
    if (active && !paused) el.play().catch(() => {}); else el.pause();
  }, [active, paused]);
  useEffect(() => { if (!active) setPaused(false); }, [active]);
  const p = r.product != null ? DATA.products[r.product] : null;
  const who = r.owner || owner;
  return (
    <section className="rl-slide">
      {r.vid
        ? <video ref={v} src={r.vid} poster={r.img ? (r.raw ? r.img : A(r.img)) : undefined} muted={muted} loop playsInline preload="metadata" onClick={() => setPaused(!paused)} />
        : <img className={`rl-still ${active && !paused ? 'on' : ''}`} src={r.raw ? r.img : A(r.img)} alt="" onClick={() => setPaused(!paused)} />}
      {paused && <span className="rl-paused" aria-hidden="true"><Icon name="play" fill size={40} /></span>}
      <div className="rl-side">
        <button aria-label={liked ? 'เลิกถูกใจ' : 'ถูกใจ'} aria-pressed={liked} className={liked ? 'on' : ''} onClick={() => setLiked(!liked)}>
          <Icon name="heart" fill size={30} /><span>{compact(r.likes + (liked ? 1 : 0))}</span>
        </button>
        <button aria-label="ความคิดเห็น" onClick={() => app.toast('ความคิดเห็นของ Reels ยังไม่มีในต้นแบบ')}><Icon name="chat-circle" fill size={30} /><span>{Math.round(r.likes / 25)}</span></button>
        <button aria-label="แชร์" onClick={() => app.toast('คัดลอกลิงก์ Reels แล้ว')}><Icon name="paper-plane-tilt" fill size={28} /><span>แชร์</span></button>
        <button aria-label={muted ? 'เปิดเสียง' : 'ปิดเสียง'} onClick={() => setMuted(!muted)}><Icon name={muted ? 'speaker-simple-x' : 'speaker-simple-high'} fill size={26} /></button>
      </div>
      <div className="rl-info">
        <div className="rl-who"><img src={A(who.avatar)} alt="" /><b>{who.name}</b></div>
        <p>{r.caption}</p>
        <small><Icon name="play" fill size={12} /> {compact(r.views)} ครั้ง</small>
        {p && (
          <a className="ds-aff rl-aff" href={`#/product/${r.product}`}>
            <span className="ds-aff-ic solo"><DisIcon name="bag" size={20} /></span>
            <span className="ds-aff-mid"><span className="ellipsis">{p.title}</span><b className="ellipsis">{baht(p.price)}</b></span>
          </a>
        )}
      </div>
    </section>
  );
}

function ReelsViewer({ app, reels, start, owner, onClose }) {
  const ref = useRef(null);
  const [cur, setCur] = useState(start);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const el = ref.current; el.scrollTop = start * el.clientHeight;
    document.body.classList.add('peek-open', 'reels-open');
    const k = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', k);
    return () => { removeEventListener('keydown', k); document.body.classList.remove('peek-open', 'reels-open'); };
  }, []);
  const onScroll = (e) => { const el = e.currentTarget; setCur(Math.round(el.scrollTop / el.clientHeight)); };
  const host = (!app.cases.web && document.querySelector('.phone')) || document.body;
  return ReactDOM.createPortal(
    <div className={`rl ${app.cases.web ? 'web' : ''}`} role="dialog" aria-modal="true" aria-label="Reels">
      <div className="rl-top">
        <button className="rl-back" aria-label="กลับ" onClick={onClose}><Icon name="caret-left" size={26} /></button>
        <b>Reels</b>
        <span style={{ width: 40 }} />
      </div>
      <div className="rl-track" ref={ref} onScroll={onScroll}>
        {reels.map((r, i) => <ReelSlide key={i} app={app} r={r} owner={owner} active={i === cur} muted={muted} setMuted={setMuted} />)}
      </div>
    </div>,
    host,
  );
}

const ME_OWNER = { key: 'me', name: ME.name, avatar: 'assets/images/story_you_profile.jpg', mine: true };

function ProfileTab({ tab, onOpen, onReel, onSavedPost }) {
  const [savedTab, setSavedTab] = useState('posts');
  const savedProds = window.SAVED_PRODUCTS || [];
  const savedPosts = window.SAVED_POSTS || [];
  if (tab === 'posts') {
    const tiles = [...fromMyPosts(), ...MY_GRID];
    // Video posts play like Reels (full screen, swipe between this profile's video posts).
    const vids = tiles.map((t, i) => (t.kind === 'video' || t.vid ? i : -1)).filter((i) => i >= 0);
    const reels = [...vids.map((i) => postToReel(tiles[i], i)), ...MY_REELS]; // then keep swiping into her Reels
    const open = (t, i) => (vids.includes(i) ? onReel(vids.indexOf(i), reels) : onOpen(tiles, i, ME_OWNER, 'โพสต์'));
    return <div className="pf-grid">{tiles.map((t, i) => <PfTile key={i} t={t} label={`โพสต์ ${i + 1}${vids.includes(i) ? ' วิดีโอ' : ''}`} onClick={() => open(t, i)} />)}</div>;
  }
  if (tab === 'reels') {
    return (
      <div className="pf-grid reels">
        {MY_REELS.map((t, i) => (
          <PfTile key={i} t={t} label={`Reels ${i + 1} ดู ${compact(t.views)} ครั้ง`} onClick={() => onReel(i)}>
            <span className="pf-views"><Icon name="play" fill size={14} />{compact(t.views)}</span>
          </PfTile>
        ))}
      </div>
    );
  }
  if (tab === 'products') {
    return (
      <div className="pf-products">
        <Masonry ids={MY_PRODUCTS} cols={2} />
      </div>
    );
  }
  return (
    <>
      {/* Only what was actually saved. Two sub-tabs, side by side: โพสต์ (left) · สินค้า (right). */}
      <p className="pf-note pad"><Icon name="lock-simple" size={14} />เห็นได้เฉพาะคุณ</p>
      <div className="pf-seg" role="tablist" aria-label="ที่บันทึกไว้">
        <button role="tab" aria-selected={savedTab === 'posts'} className={savedTab === 'posts' ? 'on' : ''} onClick={() => setSavedTab('posts')}>โพสต์ที่บันทึก{savedPosts.length ? ` (${savedPosts.length})` : ''}</button>
        <button role="tab" aria-selected={savedTab === 'products'} className={savedTab === 'products' ? 'on' : ''} onClick={() => setSavedTab('products')}>สินค้าที่บันทึก{savedProds.length ? ` (${savedProds.length})` : ''}</button>
      </div>
      {savedTab === 'posts' ? (
        savedPosts.length
          ? <div className="pf-grid">{savedPosts.map((x, i) => <PfTile key={x.id} t={postTile(x)} label={`โพสต์ที่บันทึก ${i + 1}`} onClick={() => onSavedPost(savedPosts, i)} />)}</div>
          : <div className="ad-empty pf-saved-empty"><span className="ad-empty-ic"><Icon name="bookmark-simple" size={32} /></span><b>ยังไม่มีโพสต์ที่บันทึก</b><p>กดไอคอนบันทึกใต้โพสต์ในหน้าค้นพบ แล้วจะมาอยู่ที่นี่</p></div>
      ) : (
        savedProds.length
          ? <div className="pf-products pf-saved-prods"><Masonry ids={savedProds} cols={2} /></div>
          : <div className="ad-empty pf-saved-empty"><span className="ad-empty-ic"><Icon name="bookmark-simple" size={32} /></span><b>ยังไม่มีสินค้าที่บันทึก</b><p>กดไอคอนบันทึกบนรูปสินค้า แล้วจะมาอยู่ที่นี่</p></div>
      )}
    </>
  );
}

function ProfileBody({ app, web }) {
  const [tab, setTab] = useState('posts');
  const [viewer, setViewer] = useState(null);
  const [reel, setReel] = useState(null);
  const openPosts = (tiles, i, owner, title) => setViewer({ posts: tiles.map((t, k) => tileToPost(t, k, owner)), start: i, title });
  const share = async () => {
    const url = location.href.split('#')[0] + '#/tab/profile';
    try { if (navigator.share) return await navigator.share({ title: ME.name, url }); } catch (_) { return; }
    try { await navigator.clipboard.writeText(url); } catch (_) {}
    app.toast('คัดลอกลิงก์โปรไฟล์แล้ว');
  };
  return (
    <>
      <div className="pf-top">
        <div className="pf-cover"><img src={A(PI('cover.jpg'))} alt="" /></div>
        {!web && <button className="pf-set" aria-label="ตั้งค่า" onClick={() => app.go('/settings')}><Icon name="gear-six" size={22} /></button>}
        {/* Same layout as the shop profile: photo left, name and handle beside it, then bio and one line of counts. */}
        <div className="sh-who3 pf-who3">
          <div className="pf-av-wrap">
            <img className="pf-mascot" src={A(PI('mascot.png'))} alt="" />
            <div className={`pf-av ${app.cases.myStory ? 'has-story' : ''}`}><div className="pf-av-in">{meSrc() ? <img src={meSrc()} alt={`รูปโปรไฟล์ ${ME.name}`} /> : <span className="pf-av-none"><Icon name="user" size={36} /></span>}</div></div>
          </div>
          <div className="sh-who3-txt">
            <h1 className="pf-name">{ME.name}</h1>
            <p className="sh-handle">{ME.handle}</p>
          </div>
        </div>
        <p className="pf-bio sh-bio3">{ME.bio}</p>
        <p className="sh-stats1 pf-stats1">
          <span><b>{ME.posts}</b> โพสต์</span>
          <button className="pf-stat-btn" onClick={() => app.go('/follow/followers')}><b>{compact(ME.followers)}</b> ผู้ติดตาม</button>
          <button className="pf-stat-btn" onClick={() => app.go('/follow/following')}><b>{compact(ME.following)}</b> กำลังติดตาม</button>
        </p>
        <div className="pf-btns">
          <button className="pf-btn" onClick={() => app.go('/settings/profile')}><img src={A(PI('edit.svg'))} width="16" height="16" alt="" />แก้ไขโปรไฟล์</button>
          <button className="pf-btn primary" onClick={() => app.go('/tab/orders')}><i className="o-ic" style={{ width: 24, height: 24, margin: -4, WebkitMaskImage: `url("${A('assets/icons/nav_order.svg')}")`, maskImage: `url("${A('assets/icons/nav_order.svg')}")` }} aria-hidden="true" />ดูคำสั่งซื้อ</button>
        </div>
        <AffiliateCard app={app} />
      </div>
      <div className="ds-tabs pf-tabs" role="tablist" aria-label="เนื้อหาในโปรไฟล์">
        {PF_TABS.map((t) => (
          <button key={t.k} role="tab" aria-selected={tab === t.k} className={tab === t.k ? 'on' : ''} onClick={() => setTab(t.k)}>{t.label}</button>
        ))}
      </div>
      <ProfileTab tab={tab} onOpen={openPosts} onReel={(i, list) => setReel({ i, list: list || MY_REELS })} onSavedPost={(posts, i) => setViewer({ posts, start: i, title: 'ที่บันทึกไว้' })} />
      {reel != null && <ReelsViewer app={app} reels={reel.list} start={reel.i} owner={ME_OWNER} onClose={() => setReel(null)} />}
      {viewer && <PostViewer app={app} {...viewer} onClose={() => setViewer(null)} />}
    </>
  );
}

/** Profile while loading: cover, photo, name, stats, buttons, Affiliate card, tabs, grid. */
function ProfileSkeleton() {
  // Same layout as the profile: cover, photo left with name and handle beside it, bio, one row of counts.
  return (
    <div className="skeleton" aria-busy="true" aria-label="กำลังโหลด">
      <Sk w="100%" h={149} r={0} style={{ display: 'block', borderRadius: 0, background: 'linear-gradient(90deg, #C9C9CF 0, #D6D6DB 40%, #C9C9CF 80%) 0 0 / 200% 100%' }} /> {/* darker, so the white clock on this page still shows */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '0 16px', marginTop: -30 }}>
        <Sk w={84} h={84} r={42} style={{ flex: 'none', border: '3px solid #fff' }} />
        <div className="sk-col" style={{ alignItems: 'flex-start', gap: 8, paddingTop: 38 }}><Sk w={140} h={22} /><Sk w={96} h={14} /></div>
      </div>
      <div className="sk-col" style={{ alignItems: 'flex-start', gap: 8, padding: '12px 16px 0' }}><Sk w="100%" h={14} /><Sk w="70%" h={14} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', justifyItems: 'center', padding: '14px 16px 0' }}>{[0, 1, 2].map((i) => <Sk key={i} w={84} h={16} />)}</div>
      <div style={{ display: 'flex', gap: 16, padding: '24px 16px 0' }}><Sk w="50%" h={44} r={12} /><Sk w="50%" h={44} r={12} /></div>
      <div style={{ padding: '12px 16px' }}><Sk w="100%" h={68} r={16} style={{ display: 'block' }} /></div>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 16px 14px' }}>{[0, 1, 2, 3].map((i) => <Sk key={i} w={52} h={18} />)}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>{Array.from({ length: 9 }, (_, i) => <Sk key={i} w="100%" h={162} r={0} style={{ display: 'block' }} />)}</div>
    </div>
  );
}

/** สร้าง: floating button, bottom right of the profile. Opens a sheet: โพสต์ · สตอรี่ · ไลฟ์สด. */
const CREATE_OPTS = [
  { k: 'post', icon: 'note-pencil', title: 'โพสต์', sub: 'แชร์รูป วิดีโอ หรือรีวิวสินค้าลงหน้าค้นพบ' },
  { k: 'story', icon: 'circle-dashed', title: 'สตอรี่', sub: 'ลงรูปหรือวิดีโอสั้น อยู่ได้ 24 ชั่วโมง' },
  { k: 'live', icon: 'broadcast', title: 'ถ่ายทอดสด', sub: 'ไลฟ์ขายของ คุยกับผู้ติดตามแบบเรียลไทม์' },
];
/** The สร้าง sheet: โพสต์ opens the new-post page; สตอรี่ and ไลฟ์ are not in the prototype yet. */
function CreateSheet({ app, onClose }) {
  const pick = (k, close) => {
    close();
    setTimeout(() => {
      if (k === 'post') app.go('/discover/new');
      else app.toast(k === 'story' ? 'ลงสตอรี่ยังไม่มีในต้นแบบ' : 'เริ่มไลฟ์ยังไม่มีในต้นแบบ');
    }, 260);
  };
  return (
    <Sheet app={app} onClose={onClose} title="สร้าง">
      {(close) => (
        <div className="cs">
          <div className="nt-hd"><b>สร้าง</b><button className="gf-close" aria-label="ปิด" onClick={close}><Icon name="x" size={22} /></button></div>
          <div className="cs-list">
            {CREATE_OPTS.map((o) => (
              <button key={o.k} className="cs-item cr-item" onClick={() => pick(o.k, close)}>
                <span className={`cr-ic ${o.k}`}><Icon name={o.icon} size={24} /></span>
                <span className="cs-mid"><b>{o.title}</b><small>{o.sub}</small></span>
                <Icon name="caret-right" size={18} className="co-go" />
              </button>
            ))}
          </div>
        </div>
      )}
    </Sheet>
  );
}

function CreateFab({ app }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="pf-fab" aria-label="สร้าง" aria-haspopup="dialog" onClick={() => (app.cases.loggedIn ? setOpen(true) : app.login('สร้างโพสต์'))}><Icon name="plus" size={28} /></button>
      {open && <CreateSheet app={app} onClose={() => setOpen(false)} />}
    </>
  );
}

function ProfilePage({ app }) {
  const loading = useLoading('profile');
  if (app.cases.web) {
    return (
      <div className="web">
        <WebHeader app={app} current="profile" />
        <main className="wrap w-profile">{loading ? <ProfileSkeleton /> : <ProfileBody app={app} web />}</main>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <div className="m-scroll pf-page">{loading ? <ProfileSkeleton /> : <ProfileBody app={app} />}</div>
      {!loading && <CreateFab app={app} />}
      <BottomNav app={app} current="profile" />
    </>
  );
}

window.ProfilePage = ProfilePage;
window.CreateSheet = CreateSheet;

Object.assign(window, { PfTile, PostViewer, tileToPost, ReelsViewer, postsToReels });

// ════════ โปรไฟล์คนอื่น (#/u/:name): a person (not a shop), opened from their avatar or name on a post ════════
// Their posts from ค้นพบ plus a few more mock posts; follow and message; tap a tile to read the posts.
const PEOPLE = {
  'ทาสน้องส้มจี๊ด': { handle: '@somjeed.cat', bio: 'ทาสแมวส้มชื่อจี๊ด 🐱 รีวิวของใช้น้องแมวที่ใช้จริงทุกชิ้น\nชอบต้นไม้ แต่น้องชอบกัดต้นไม้มากกว่า', followers: 8420, following: 312, cover: 'assets/images/product_cat_tree.jpg',
    more: [
      { image: 'assets/images/product_cat_tree.jpg', text: 'คอนโดใหม่ของจี๊ด ขึ้นไปนอนชั้นบนสุดทุกวัน', product: 67 },
      { image: 'assets/images/product_cat_toys.jpg', text: 'ของเล่นชุดนี้เล่นได้ทั้งวัน ไม้ตกแมวคือที่สุด', product: 18 },
      { bg: 'blush', text: 'วันนี้จี๊ดยอมให้ตัดเล็บแล้ว เป็นวันประวัติศาสตร์ 🎉' },
      { image: 'assets/images/product_pet_bed.jpg', text: 'ที่นอนนุ่มมาก แต่จี๊ดยังเลือกนอนบนกล่องอยู่ดี', product: 17 },
      { image: 'assets/images/product_monstera.jpg', text: 'มอนสเตอร่าต้นใหม่ ต้องวางให้สูงกว่าแมวเอื้อมถึง', product: 34 },
      { image: 'assets/images/product_cat_scratcher.jpg', text: 'เสาลับเล็บต้นนี้ช่วยโซฟาไว้ได้จริง', product: 68 },
      { image: 'assets/images/product_pet_feeder.jpg', text: 'ตั้งเวลาให้อาหารได้ ไปทำงานก็ไม่ห่วง', product: 64 },
    ] },
};
const personOf = (name) => {
  const p = PEOPLE[name] || {};
  const own = POSTS.filter((x) => x.author === name && !x.shop);
  const av = own[0]?.avatar || 'assets/images/live/viewer_2.jpg';
  const extra = (p.more || []).map((m, i) => ({ id: `u-${name}-${i}`, author: name, avatar: av, time: PV_TIMES[(i + 1) % PV_TIMES.length], following: false, tags: [], likes: 30 + ((i * 53) % 260), comments: (i * 7) % 30, ...m }));
  const posts = [...own, ...extra];
  return { name, avatar: av, handle: p.handle || '@' + name.replace(/\s+/g, '').toLowerCase(), bio: p.bio || '', followers: p.followers || 1240, following: p.following || 180, cover: p.cover || own.find((x) => x.image)?.image || PI('cover.jpg'), posts,
    products: [...new Set(posts.map((x) => x.product).filter((id) => id != null && DATA.products[id] && !DATA.products[id].hidden))] };
};
/** A Discover post as a grid tile. */
const postTile = (x) => x.image ? { img: x.crop && x.product != null ? DATA.products[x.product].image : x.image } /* a cropped post photo: use its product photo for the square tile */ : x.media?.[0] ? (x.media[0].type === 'video' ? { vid: x.media[0].url, img: x.media[0].poster, raw: true, kind: 'video' } : { img: x.media[0].url, raw: true }) : { text: x.text, bg: x.bg };

function UserProfilePage({ app, name }) {
  const u = useMemo(() => personOf(name), [name]);
  const [following, setFollowing] = useState(!!POSTS.find((x) => x.author === name)?.following);
  const [viewer, setViewer] = useState(null);
  const [tab, setTab] = useState('posts');
  const follow = () => {
    if (!app.cases.loggedIn) return app.login('ติดตาม ' + name);
    setFollowing(!following);
    if (!following) app.toast(`ติดตาม ${name} แล้ว`);
  };
  return (
    <>
      <div className="m-scroll pf-page up-page">
        <div className="pf-top">
          <div className="pf-cover"><img src={A(u.cover)} alt="" /></div>
          <button className="pf-set up-back" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={22} /></button>
          <button className="pf-set" aria-label="เพิ่มเติม" onClick={() => app.toast('รายงานหรือบล็อกยังไม่มีในต้นแบบ')}><Icon name="dots-three-vertical" size={22} /></button>
          <div className="pf-who">
            <div className="pf-av-wrap">
              <PfAvatar app={app} name={name} src={u.avatar} alt={`รูปโปรไฟล์ ${name}`} className="up-av" />
            </div>
            <h1 className="pf-name">{name}</h1>
            <p className="pf-handle">{u.handle}</p>
            {u.bio && <p className="pf-bio">{u.bio}</p>}
          </div>
          <div className="pf-stats">
            <div><b>{u.posts.length}</b><span>โพสต์</span></div>
            <i aria-hidden="true" />
            <div><b>{compact(u.followers + (following ? 1 : 0))}</b><span>ผู้ติดตาม</span></div>
            <i aria-hidden="true" />
            <div><b>{compact(u.following)}</b><span>กำลังติดตาม</span></div>
          </div>
          {/* Same as the shop page: message first; following shrinks follow to an icon and the message button takes the rest. */}
          <div className={`pf-btns ${following ? 'sh-following' : ''}`}>
            <button className="pf-btn" onClick={() => openChat(app, name, false)}><Icon name="chat-circle-dots" size={18} />ส่งข้อความ</button>
            <button className={`pf-btn ${following ? 'sh-follow-ic' : 'primary'}`} aria-pressed={following} aria-label={following ? 'กำลังติดตาม แตะเพื่อเลิกติดตาม' : 'ติดตาม'} onClick={follow}>
              {following
                ? <i className="o-ic" style={{ width: 18, height: 18, WebkitMaskImage: `url("${A('assets/icons/user_check.svg')}")`, maskImage: `url("${A('assets/icons/user_check.svg')}")` }} aria-hidden="true" />
                : <Icon name="plus" size={14} className="ic-bold" />}{following ? null : 'ติดตาม'}
            </button>
          </div>
        </div>
        <div className="ds-tabs pf-tabs" role="tablist" aria-label="เนื้อหาในโปรไฟล์">
          {[['posts', 'โพสต์'], ['products', 'สินค้า']].map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>
        {tab === 'products' ? (
          // สินค้า: the products pinned (ปักตะกร้า) in their posts, newest first, each once.
          u.products.length ? <div className="pf-products"><Masonry ids={u.products} cols={2} /></div> : <p className="up-empty">ยังไม่มีสินค้าที่ปักตะกร้า</p>
        ) : u.posts.length ? (
          <div className="pf-grid">
            {u.posts.map((x, i) => <PfTile key={x.id} t={postTile(x)} label={`โพสต์ที่ ${i + 1}`} onClick={() => setViewer({ posts: u.posts, start: i, title: name })} />)}
          </div>
        ) : <p className="up-empty">ยังไม่มีโพสต์</p>}
      </div>
      {viewer && <PostViewer app={app} {...viewer} onClose={() => setViewer(null)} />}
    </>
  );
}
window.UserProfilePage = UserProfilePage;

/** Profile picture (shop or person): when they are live now, the story-style live ring + broadcast pill; tap opens the live room. */
const liveIndexOf = (name) => DATA.storyShops.findIndex((x) => x.live && x.name === name);
function PfAvatar({ app, name, src, alt, className = '' }) {
  const i = liveIndexOf(name);
  if (i < 0) return <div className={`pf-av ${className}`}><div className="pf-av-in"><img src={A(src)} alt={alt} /></div></div>;
  return (
    <button className="pf-av-live" aria-label={`${name} กำลังไลฟ์อยู่ แตะเพื่อดูไลฟ์`} onClick={() => app.go('/live/' + i)}>
      <div className="ring live pf-ring"><div className="photo"><img src={A(src)} alt={alt} /></div></div>
      <span className="live-badge pf-lb" aria-hidden="true"><Icon name="broadcast" size={16} /></span>
    </button>
  );
}
window.PfAvatar = PfAvatar;
window.CreateFab = CreateFab;

// ── ตั้งค่า (from the gear on โปรไฟล์): grouped white cards on grey. ──
function SettingsPage({ app }) {
  const soon = (what) => () => app.toast(`${what}ยังไม่มีในต้นแบบ`);
  const groups = [
    ['บัญชีผู้ใช้', [
      ['user', 'ข้อมูลส่วนตัว', () => app.go('/settings/profile')],
      ['lock-simple', 'ความเป็นส่วนตัว', () => app.go('/settings/privacy')],
      ['link-simple', 'การเชื่อมต่อบัญชี', () => app.go('/settings/linked')],
    ]],
    ['ที่อยู่และการรับเงิน', [
      ['map-pin', 'ที่อยู่ของฉัน', () => app.go('/address')],
      ['bank', 'บัญชีธนาคาร', soon('หน้าบัญชีธนาคาร')],
    ]],
    ['การใช้งานแอป', [
      ['bell', 'การแจ้งเตือน', soon('หน้าการแจ้งเตือน')],
      ['monitor', 'การแสดงผล', soon('หน้าการแสดงผล')],
    ]],
  ];
  const logout = () => { app.setCase('loggedIn', false, false); app.toast('ออกจากระบบแล้ว'); location.replace('#/'); };
  return (
    <>
      <header className="m-hd ct-hd o-sub-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="arrow-left" size={24} /></button>
          <b className="ct-title">ตั้งค่า</b>
          <span className="st-gap" />
        </div>
      </header>
      <div className="m-scroll st-page">
        {groups.map(([h, rows]) => (
          <section key={h} className="st-card">
            <h2>{h}</h2>
            {rows.map(([ic, label, go]) => (
              <button key={label} className="st-row" onClick={go}>
                <Icon name={ic} size={24} /><span>{label}</span><Icon name="caret-right" size={20} className="st-chev" />
              </button>
            ))}
          </section>
        ))}
        <section className="st-card">
          <h2>ติดต่อเรา</h2>
          <a className="st-row" href="mailto:support@thaimart.com"><Icon name="envelope-simple" size={24} /><span>support@thaimart.com</span></a>
          <a className="st-row" href="tel:020877777"><Icon name="device-mobile" size={24} /><span>02-087-7777</span></a>
          <button className="st-row" onClick={soon('การเปิด LINE')}><span className="st-line"><LineMark /></span><span>@thaimart.com</span></button>
        </section>
        <section className="st-card">
          <h2>นโยบายและเงื่อนไข</h2>
          <button className="st-row" onClick={soon('หน้าข้อกำหนดและเงื่อนไข')}><Icon name="article" size={24} /><span>ข้อกำหนดและเงื่อนไขการใช้บริการ</span><Icon name="caret-right" size={20} className="st-chev" /></button>
          <button className="st-row" onClick={soon('หน้านโยบายความเป็นส่วนตัว')}><Icon name="shield-check" size={24} /><span>นโยบายความเป็นส่วนตัว</span><Icon name="caret-right" size={20} className="st-chev" /></button>
        </section>
        <button className="st-logout" onClick={logout}>ออกจากระบบ</button>
      </div>
    </>
  );
}
window.SettingsPage = SettingsPage;


// After picking a photo: shows the circle it will appear in. Drag to move, slider or wheel to zoom.
function PhotoCrop({ app, src, onClose, onSave }) {
  const [p, setP] = useState({ x: 0, y: 0 });
  const [z, setZ] = useState(1);
  const drag = useRef(null);
  const url = src.startsWith('blob:') ? src : A(src);
  const down = (e) => { drag.current = { sx: e.clientX, sy: e.clientY, x: p.x, y: p.y }; e.currentTarget.setPointerCapture(e.pointerId); };
  const move = (e) => { const d = drag.current; if (d) setP({ x: d.x + e.clientX - d.sx, y: d.y + e.clientY - d.sy }); };
  const up = () => { drag.current = null; };
  const host = (!app.cases.web && document.querySelector('.phone')) || document.body;
  return ReactDOM.createPortal(
    <div className="pc-layer" role="dialog" aria-modal="true" aria-label="ปรับรูปโปรไฟล์">
      <header className="pc-hd">
        <button className="pc-x" aria-label="ยกเลิก" onClick={onClose}><Icon name="x" size={24} /></button>
        <b>ปรับรูปโปรไฟล์</b>
        <span />
      </header>
      <div className="pc-stage" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
        onWheel={(e) => setZ((v) => Math.min(3, Math.max(1, v - e.deltaY * 0.002)))}>
        <img src={url} alt="" draggable="false" style={{ transform: `translate(${p.x}px, ${p.y}px) scale(${z})` }} />
        <div className="pc-ring" aria-hidden="true" />
      </div>
      <div className="pc-zoom">
        <Icon name="minus" size={18} />
        <input type="range" min="1" max="3" step="0.01" value={z} onChange={(e) => setZ(+e.target.value)} aria-label="ซูมรูป" />
        <Icon name="plus" size={18} />
      </div>
      <div className="pc-foot"><button className="btn-primary block" onClick={() => onSave(src)}>บันทึก</button></div>
    </div>,
    host,
  );
}
window.PhotoCrop = PhotoCrop;

// ── ข้อมูลส่วนตัว: shows the photo and each field; tap a row to edit that one field. ──
const BIO_MAX = 150;
const SubHeader = ({ app, title }) => (
  <header className="m-hd ct-hd o-sub-hd">
    <div className="m-hd-row">
      <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="arrow-left" size={24} /></button>
      <b className="ct-title">{title}</b>
      <span className="st-gap" />
    </div>
  </header>
);
function EditProfilePage({ app }) {
  const [, bump] = useState(0);
  const [gallery, setGallery] = useState(false);
  const [menu, setMenu] = useState(false); // เปลี่ยนรูปโปรไฟล์: gallery, camera or remove
  const [crop, setCrop] = useState(null); // picked photo, waiting in the circle
  const camRef = useRef(null);
  // Photo changes save straight away.
  const setPhoto = (v, msg) => { ME.photo = v; bump((n) => n + 1); app.toast(msg); };
  const src = meSrc();
  const rows = [
    ['name', 'ชื่อโปรไฟล์', ME.name],
    ['user', 'ชื่อผู้ใช้งาน', ME.handle],
    ['bio', 'เกี่ยวกับฉัน', ME.bio || 'ยังไม่ได้เขียน'],
  ];
  return (
    <>
      <SubHeader app={app} title="ข้อมูลส่วนตัว" />
      <div className="m-scroll ep-page">
        <button className="ps-av ep-av" aria-label="เปลี่ยนรูปโปรไฟล์" onClick={() => setMenu(true)}>
          {src ? <img src={src} alt="" /> : <Icon name="user" size={44} />}
          <span className="ps-cam"><Icon name="pencil-simple" size={18} /></span>
        </button>
        <input ref={camRef} type="file" accept="image/*" capture="user" hidden onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) setCrop(URL.createObjectURL(f)); e.target.value = ''; }} />
        <div className="ep-list">
          {rows.map(([k, label, val]) => (
            <button key={k} className="ep-row" onClick={() => app.go('/settings/profile/' + k)}>
              <span className="ep-row-txt"><span className="ep-lb">{label}</span><span className={`ep-val ${k === 'bio' && !ME.bio ? 'empty' : ''}`}>{val}</span></span>
              <Icon name="caret-right" size={20} className="st-chev" />
            </button>
          ))}
        </div>
      </div>
      {menu && (
        <Sheet app={app} title="เปลี่ยนรูปโปรไฟล์" onClose={() => setMenu(false)}>
          {(close) => (
            <div className="cs">
              <div className="nt-hd"><b>เปลี่ยนรูปโปรไฟล์</b><button className="gf-close" aria-label="ปิด" onClick={close}><Icon name="x" size={22} /></button></div>
              <button className="ep-opt" onClick={() => { close(); setTimeout(() => setGallery(true), 260); }}><Icon name="image" size={28} />เลือกจากคลังรูป</button>
              <button className="ep-opt" onClick={() => { close(); camRef.current && camRef.current.click(); }}><Icon name="camera" size={28} />ถ่ายรูป</button>
              {src && <button className="ep-opt ep-del" onClick={() => { close(); setPhoto('', 'ลบรูปโปรไฟล์แล้ว'); }}><Icon name="trash" size={28} />ลบรูปโปรไฟล์</button>}
            </div>
          )}
        </Sheet>
      )}
      {gallery && (
        <GalleryPicker app={app} max={1} photosOnly title="เลือกรูปโปรไฟล์" doneLabel="ใช้รูปนี้" onClose={() => setGallery(false)}
          onCamera={() => camRef.current && camRef.current.click()}
          onDone={([g]) => { setGallery(false); if (g) setCrop(g.path); }} />
      )}
      {crop && <PhotoCrop app={app} src={crop} onClose={() => setCrop(null)} onSave={(v) => { setCrop(null); setPhoto(v, 'เปลี่ยนรูปโปรไฟล์แล้ว'); }} />}
    </>
  );
}
window.EditProfilePage = EditProfilePage;

// One field at a time: /settings/profile/name | user | bio
function EditFieldPage({ app, field }) {
  const start = field === 'name' ? ME.name : field === 'user' ? ME.handle.replace(/^@/, '') : ME.bio;
  const [v, setV] = useState(start);
  const [tried, setTried] = useState(false);
  const ref = useRef(null);
  useEffect(() => { ref.current && ref.current.focus(); }, []);
  const title = { name: 'ชื่อโปรไฟล์', user: 'ชื่อผู้ใช้งาน', bio: 'เกี่ยวกับฉัน' }[field];
  const handle = v.toLowerCase().replace(/[^a-z0-9._]/g, '');
  let err = '';
  if (field === 'name' && tried && !v.trim()) err = 'กรุณากรอกชื่อโปรไฟล์';
  if (field === 'user') {
    if (tried && !handle) err = 'กรุณากรอกชื่อผู้ใช้งาน';
    else if (handle && handle.length < 3) err = 'กรุณากรอกอย่างน้อย 3 ตัวอักษร';
    else if (['thaimart', 'admin', 'sirintra'].includes(handle) && handle !== start.toLowerCase()) err = 'ชื่อผู้ใช้งานนี้ถูกใช้แล้ว กรุณาเลือกชื่ออื่น';
  }
  const value = field === 'user' ? handle : v;
  const changed = field === 'user' ? handle !== start.toLowerCase() : v !== start;
  const save = () => {
    setTried(true);
    if (field === 'name' && !v.trim()) return;
    if (field === 'user' && (!handle || handle.length < 3 || err)) return;
    if (field === 'name') ME.name = v.trim();
    if (field === 'user') ME.handle = '@' + handle;
    if (field === 'bio') ME.bio = v.trim();
    app.toast('บันทึกแล้ว');
    app.back();
  };
  const clear = (e) => { e.preventDefault(); setV(''); ref.current && ref.current.focus(); };
  return (
    <>
      <SubHeader app={app} title={title} />
      <div className="m-scroll ep-page">
        <label className={`ad-field ps-field ${err ? 'bad' : ''}`}>
          <span className="ad-field-lb">{title}{field !== 'bio' && <em className="ps-req" aria-label="จำเป็น">*</em>}</span>
          {field === 'bio' ? (
            <textarea ref={ref} rows={5} value={v} maxLength={BIO_MAX} onChange={(e) => setV(e.target.value)} placeholder="เล่าเรื่องของคุณสั้นๆ" />
          ) : (
            <div className={`ps-user ${field === 'name' ? 'ps-name' : ''}`}>
              {field === 'user' && <b>@</b>}
              <input ref={ref} value={value} maxLength={field === 'user' ? 20 : 30} onChange={(e) => setV(e.target.value)}
                placeholder={field === 'user' ? 'กรอกชื่อผู้ใช้งาน' : 'กรอกชื่อโปรไฟล์'} autoCapitalize={field === 'user' ? 'none' : undefined} />
              {field === 'user' && handle && !err && <Icon name="check-circle" fill size={20} />}
              {value && <button type="button" className="lg-clear ps-clear" aria-label={`ลบ${title}ทั้งหมด`} onMouseDown={(e) => e.preventDefault()} onClick={clear}><Icon name="x-circle" fill size={20} /></button>}
            </div>
          )}
          {err ? <small>{err}</small>
            : field === 'user' ? <span className="ps-hint">ใช้ a-z 0-9 . และ _ ได้</span>
            : field === 'bio' ? <span className="ps-hint ep-count">{[...v].length}/{BIO_MAX}</span> : null}
        </label>
      </div>
      <div className="ps-foot ep-foot">
        <button className="btn-primary block" disabled={!changed} onMouseDown={(e) => e.preventDefault()} onClick={save}>บันทึก</button>
      </div>
    </>
  );
}
window.EditFieldPage = EditFieldPage;

// ── ความเป็นส่วนตัว: private account switch, delete account. ──
function PrivacyPage({ app }) {
  const [priv, setPriv] = useState(!!ME.private);
  const toggle = () => { const v = !priv; ME.private = v; setPriv(v); app.toast(v ? 'เปิดบัญชีส่วนตัวแล้ว' : 'ปิดบัญชีส่วนตัวแล้ว'); };
  return (
    <>
      <SubHeader app={app} title="ความเป็นส่วนตัว" />
      <div className="m-scroll pv-page">
        <section className="pv-card">
          <div className="pv-row">
            <b id="pv-priv">บัญชีส่วนตัว</b>
            <button className={`pv-sw ${priv ? 'on' : ''}`} role="switch" aria-checked={priv} aria-labelledby="pv-priv" onClick={toggle}><i /></button>
          </div>
          <p className="pv-note">เมื่อเปิดใช้งาน เฉพาะผู้ติดตามที่อนุมัติเท่านั้นที่สามารถดู โปรไฟล์และโพสต์ของคุณได้</p>
        </section>
        <button className="pv-card pv-del" onClick={() => app.go('/settings/delete')}>
          <Icon name="trash" size={24} /><b>ลบบัญชีผู้ใช้งาน</b><Icon name="caret-right" size={20} className="st-chev" />
        </button>
      </div>
    </>
  );
}
window.PrivacyPage = PrivacyPage;

// ── ลบบัญชีผู้ใช้งาน: what happens, 30 days to change your mind, then confirm. ──
function DeleteAccountPage({ app }) {
  const [ask, setAsk] = useState(false);
  const del = () => {
    app.setCase('loggedIn', false, false);
    app.toast('ส่งคำขอลบบัญชีแล้ว');
    location.replace('#/');
  };
  return (
    <>
      <SubHeader app={app} title="ลบบัญชีผู้ใช้งาน" />
      <div className="m-scroll pv-page">
        <section className="pv-card">
          <h2 className="da-h">สิ่งที่จะเกิดขึ้นเมื่อลบบัญชี</h2>
          <ul className="da-list">
            <li><Icon name="article" size={24} />โปรไฟล์ โพสต์ และความคิดเห็นของคุณจะถูกลบ</li>
            <li><Icon name="user" size={24} />รายชื่อผู้ติดตามและคนที่คุณติดตามจะหายไป</li>
            <li><Icon name="x" size={24} />เข้าสู่ระบบด้วยบัญชีนี้ไม่ได้อีก หลังลบถาวร</li>
          </ul>
        </section>
        <section className="pv-card da-undo">
          <Icon name="clock" size={24} />
          <div><b>เปลี่ยนใจได้ภายใน 30 วัน</b><p>หากเข้าสู่ระบบภายใน 30 วัน บัญชีจะกลับมาใช้งานได้ตามปกติ หลังจากนั้นบัญชีจะถูกลบถาวร</p></div>
        </section>
      </div>
      <div className="ps-foot da-foot">
        <button className="btn-primary block" onClick={() => setAsk(true)}>ดำเนินการต่อ</button>
      </div>
      {ask && (
        <Sheet app={app} title="ยืนยันลบบัญชี" onClose={() => setAsk(false)}>
          {(close) => (
            <div className="cs">
              <h2 className="ts-title center" style={{ marginTop: 8 }}>ยืนยันลบบัญชีผู้ใช้งาน</h2>
              <p className="ts-note center">บัญชีจะถูกปิดทันที และลบถาวรหลัง 30 วัน</p>
              <button className="btn-primary block" style={{ marginTop: 20 }} onClick={() => { close(); setTimeout(del, 260); }}>ลบบัญชี</button>
              <button className="btn-quiet block" onClick={close}>ยกเลิก</button>
            </div>
          )}
        </Sheet>
      )}
    </>
  );
}
window.DeleteAccountPage = DeleteAccountPage;

// ── การเชื่อมต่อบัญชี: phone, Google, LINE, Apple ID. Tap a row to link or unlink (mock). ──
const LINKED = { phone: '', google: 'a*****b@gmail.com', line: '', apple: '' };
const LINK_MOCK = { phone: '081-***-5678', google: 'a*****b@gmail.com', line: 'สมใจ', apple: 's*****j@icloud.com' };
function LinkedAccountsPage({ app }) {
  const [v, setV] = useState({ ...LINKED });
  const rows = [['phone', 'เบอร์โทรศัพท์'], ['google', 'Google'], ['line', 'LINE'], ['apple', 'Apple ID']];
  const tap = (k, label) => {
    if (v[k] && Object.values(v).filter(Boolean).length === 1) return app.toast('ต้องเชื่อมต่ออย่างน้อย 1 บัญชี');
    const next = { ...v, [k]: v[k] ? '' : LINK_MOCK[k] };
    Object.assign(LINKED, next); setV(next);
    app.toast(next[k] ? `เชื่อมต่อ ${label} แล้ว` : `ยกเลิกการเชื่อมต่อ ${label} แล้ว`);
  };
  return (
    <>
      <SubHeader app={app} title="การเชื่อมต่อบัญชี" />
      <div className="m-scroll pv-page">
        <section className="pv-card la-card">
          {rows.map(([k, label]) => (
            <button key={k} className="la-row" onClick={() => tap(k, label)} aria-label={`${label} ${v[k] ? 'เชื่อมต่อแล้ว ' + v[k] : 'ยังไม่ได้เชื่อมต่อ'}`}>
              <span className="la-lb">{label}</span>
              <span className={`la-val ${v[k] ? '' : 'empty'}`}>{v[k] || 'ยังไม่มีข้อมูล'}</span>
              <Icon name={v[k] ? 'link' : 'link-break'} size={26} className={v[k] ? 'la-on' : 'la-off'} />
            </button>
          ))}
        </section>
      </div>
    </>
  );
}
window.LinkedAccountsPage = LinkedAccountsPage;

// ── ผู้ติดตาม / กำลังติดตาม (from the counts on โปรไฟล์): two tabs, search, people and shops. ──
const FOLLOW_PEOPLE = [
  { name: 'ทาสน้องส้มจี๊ด', handle: '@somjeed.cat', avatar: 'assets/images/discover/avatar_somjeed.jpg' },
  { name: 'Jane', handle: '@jane.daily', avatar: 'assets/images/live/viewer_3.jpg' },
  { name: 'มะปราง ส.', handle: '@maprang.s', avatar: 'assets/images/live/viewer_2.jpg' },
  { name: 'Ploy', handle: '@ploy.home', avatar: 'assets/images/live/viewer_4.jpg' },
  { name: 'ต้นกล้า', handle: '@tonkla.garden', avatar: 'assets/images/live/viewer_1.jpg' },
  { name: 'Sirintra', handle: '@sirintra', avatar: 'assets/images/avatar_sirintra.png' },
];
const FOLLOW_REQ = [
  { name: 'น้ำหวาน', handle: '@namwhan.k', avatar: 'assets/images/story_pa_waen.png' },
  { name: 'Mint', handle: '@mint.minimal', avatar: 'assets/images/story_you.png' },
];
function FollowPage({ app, tab: start }) {
  const [tab, setTab] = useState(start === 'following' ? 'following' : 'followers');
  const [q, setQ] = useState('');
  const shops = DATA.storyShops.filter((x) => x.image && x.name !== ME.name).slice(0, 6).map((x) => ({ name: x.name, handle: '@' + x.name.toLowerCase().replace(/\s+/g, ''), avatar: x.image, badge: x.badge, shop: true }));
  // Followers: people (some you follow back). Following: shops and people you follow.
  const [on, setOn] = useState(() => ({ ...Object.fromEntries(FOLLOW_PEOPLE.map((p, i) => [p.name, i % 2 === 0])), ...Object.fromEntries(shops.map((x) => [x.name, true])) }));
  const [more, setMore] = useState(null); // ⋮ menu for this person or shop
  const [reqs, setReqs] = useState(() => (app.cases.followReq ? FOLLOW_REQ.slice() : []));
  const [accepted, setAccepted] = useState([]); // requests accepted: now followers
  const [gone, setGone] = useState([]); // followers removed
  const list = tab === 'followers' ? [...accepted, ...FOLLOW_PEOPLE].filter((p) => !gone.includes(p.name)) : [...shops, ...FOLLOW_PEOPLE].filter((p) => on[p.name]);
  const shown = list.filter((p) => !q || (p.name + p.handle).toLowerCase().includes(q.toLowerCase()));
  const open = (p) => app.go(p.shop ? '/shop/n/' + encodeURIComponent(p.name) : '/u/' + encodeURIComponent(p.name));
  const toggle = (p) => setOn((o) => ({ ...o, [p.name]: !o[p.name] }));
  return (
    <>
      <header className="m-hd ct-hd o-sub-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="arrow-left" size={24} /></button>
          <b className="ct-title">{ME.name}</b>
          <span className="st-gap" />
        </div>
      </header>
      <div className="ds-tabs fl-tabs" role="tablist" aria-label="ผู้ติดตามและกำลังติดตาม">
        {[['followers', `${compact(ME.followers)} ผู้ติดตาม`], ['following', `${compact(ME.following)} กำลังติดตาม`]].map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>
      <div className="m-scroll fl-page">
        <label className="fl-search">
          <Icon name="magnifying-glass" size={20} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ค้นหา" aria-label="ค้นหารายชื่อ" />
          {q && <button type="button" className="lg-clear" aria-label="ล้างคำค้น" onClick={() => setQ('')}><Icon name="x-circle" fill size={20} /></button>}
        </label>
        {tab === 'followers' && reqs.length > 0 && !q && (
          <section className="fl-req">
            <h2>คำขอติดตาม <span>{reqs.length}</span></h2>
            {reqs.map((p) => (
              <div key={p.name} className="fl-row">
                <button className="fl-who" onClick={() => open(p)}>
                  <img src={A(p.avatar)} alt="" />
                  <span><b>{p.name}</b><small>{p.handle}</small></span>
                </button>
                <button className="fl-btn primary fl-sm" onClick={() => { setReqs((r) => r.filter((x) => x !== p)); setAccepted((a) => [p, ...a]); app.toast(`ยอมรับคำขอของ ${p.name} แล้ว`); }}>ยอมรับ</button>
                <button className="fl-btn fl-sm" onClick={() => { setReqs((r) => r.filter((x) => x !== p)); app.toast('ลบคำขอแล้ว'); }}>ลบ</button>
              </div>
            ))}
          </section>
        )}
        {shown.map((p) => (
          <div key={p.name} className="fl-row">
            <button className="fl-who" onClick={() => open(p)}>
              <img src={A(p.avatar)} alt="" />
              <span><b>{p.badge && <ShopTag kind={p.badge} h={16} />}<span className="fl-nm">{p.name}</span></b><small>{p.handle}</small></span>
            </button>
            {on[p.name]
              ? <button className="fl-btn" onClick={() => openChat(app, p.name, !!p.shop)}>ส่งข้อความ</button>
              : <button className="fl-btn primary" onClick={() => toggle(p)}>{tab === 'followers' ? 'ติดตามกลับ' : 'ติดตาม'}</button>}
            <button className="fl-more" aria-label={`ตัวเลือกเพิ่มเติม ${p.name}`} onClick={() => setMore(p)}><Icon name="dots-three-vertical" size={22} /></button>
          </div>
        ))}
        {!shown.length && <p className="fl-empty">ไม่พบรายชื่อที่ค้นหา</p>}
      </div>
      {more && (
        <Sheet app={app} title={more.name} onClose={() => setMore(null)}>
          {(close) => (
            <div className="cs">
              <div className="nt-hd"><b>{more.name}</b><button className="gf-close" aria-label="ปิด" onClick={close}><Icon name="x" size={22} /></button></div>
              {on[more.name] && <button className="ep-opt ep-del" onClick={() => { toggle(more); app.toast(`เลิกติดตาม ${more.name} แล้ว`); close(); }}><Icon name="user-minus" size={28} />เลิกติดตาม</button>}
              {tab === 'followers' && <button className="ep-opt ep-del" onClick={() => { setGone((g) => [...g, more.name]); app.toast(`ลบ ${more.name} ออกจากผู้ติดตามแล้ว`); close(); }}><Icon name="user-circle-minus" size={28} />ลบผู้ติดตาม</button>}
            </div>
          )}
        </Sheet>
      )}
    </>
  );
}
window.FollowPage = FollowPage;
