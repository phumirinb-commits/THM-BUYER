// กล่องข้อความ (#/tab/inbox): chats with shops and people. Mock list; a chat itself is not in the prototype yet.

const INBOX = [
  { name: 'SIRINTRA Official', shop: true, msg: 'กระเป๋าทรงถังพู่ห้อยมีสีครีมเข้ามาแล้วนะคะ', time: '10:24', unread: 2 },
  { name: 'PetCare Official Store', shop: true, msg: 'คุณ: น้ำพุแมวใช้ไส้กรองรุ่นไหนครับ', time: '09:02' },
  { name: 'ทาสน้องส้มจี๊ด', avatar: 'assets/images/discover/avatar_somjeed.jpg', msg: 'ขอบคุณที่ติดตามนะคะ 🐱', time: 'เมื่อวาน', unread: 1 },
  { name: 'ครามสกล', shop: true, msg: 'ไซส์ M รอบอก 36 นิ้วค่ะ ใส่สบายไม่รัด', time: 'เมื่อวาน' },
  { name: 'บ้านกาแฟดอย', shop: true, msg: 'คุณ: คั่วกลางเหมาะกับดริปไหมครับ', time: 'จ.' },
  { name: 'มะปราง ส.', avatar: 'assets/images/live/viewer_2.jpg', msg: 'เซรั่มตัวนี้ดีจริงค่ะ แนะนำเลย', time: '12 พ.ย.' },
];
const inboxUnread = () => INBOX.reduce((n, c) => n + (c.unread || 0), 0);

function InboxRow({ app, c }) {
  const sh = c.shop ? shopByName(c.name) : null;
  const ring = DATA.storyShops.find((x) => x.name === c.name);
  const av = c.avatar || ring?.image || sh?.avatar || 'assets/images/live/viewer_1.jpg';
  const badge = sh?.badge || ring?.badge;
  return (
    <button className={`ib-row ${c.unread ? 'unread' : ''}`} onClick={() => { c.unread = 0; app.go('/chat/' + encodeURIComponent(c.name)); }}>
      <span className="ib-av">
        <img src={A(av)} alt="" />
        {badge && <span className="mark-top ib-mark"><ShopTag kind={badge} /></span>}
      </span>
      <span className="ib-mid">
        <span className="ib-top"><b className="ellipsis">{c.name}</b><small>{c.time}</small></span>
        <span className="ib-bot"><span className="ellipsis">{c.msg}</span>{c.unread ? <i className="ib-count" aria-label={`ยังไม่อ่าน ${c.unread} ข้อความ`}>{c.unread}</i> : null}</span>
      </span>
    </button>
  );
}

function InboxPage({ app }) {
  const [q, setQ] = useState('');
  const [f, setF] = useState('all');
  const match = { all: () => true, unread: (c) => !!c.unread, shop: (c) => !!c.shop, people: (c) => !c.shop }[f];
  const list = INBOX.filter((c) => match(c) && (!q.trim() || c.name.includes(q.trim())));
  return (
    <>
      <header className="m-hd mood">
        <div className="m-hd-row">
          <Logo />
          <span className="grow" />
          <HeaderActions app={app} withSearch={false} />
        </div>
      </header>
      <div className="m-scroll ib-page">
        <label className="zp-search ib-search">
          <Icon name="magnifying-glass" size={20} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ค้นหาชื่อร้านหรือผู้ใช้" aria-label="ค้นหาแชท" />
        </label>
        <div className="sl-chips hs ib-chips" role="tablist" aria-label="ตัวกรองแชท">
          {[['all', 'ทั้งหมด'], ['unread', 'ยังไม่อ่าน'], ['shop', 'ร้านค้า'], ['people', 'ผู้ใช้']].map(([k, l]) => (
            <button key={k} role="tab" aria-selected={f === k} className={`sl-chip ${f === k ? 'on' : ''}`} onClick={() => setF(k)}>{l}</button>
          ))}
        </div>
        <div className="ib-list">
          {list.map((c) => <InboxRow key={c.name} app={app} c={c} />)}
          {!list.length && <p className="up-empty">ไม่พบแชท</p>}
        </div>
      </div>
      <BottomNav app={app} current="inbox" />
    </>
  );
}


// ════════ แชท (#/chat/:name): one conversation. Type and send, photos, videos, camera, stickers ════════
// Messages: { me, type: 'text' | 'image' | 'video' | 'sticker', text, url, sticker, time }. Kept for this visit.
const CHAT_LOG = {};
const nowTime = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
function chatSeed(c) {
  const mine = c.msg.startsWith('คุณ: ');
  const last = { me: mine, type: 'text', text: mine ? c.msg.slice(5) : c.msg, time: /:/.test(c.time) ? c.time : '10:00' };
  if (c.name === 'SIRINTRA Official') return [
    { me: true, type: 'text', text: 'สวัสดีค่ะ กระเป๋าทรงถังพู่ห้อยมีสีอื่นไหมคะ', time: '09:41', day: 'วันนี้' },
    { me: false, type: 'text', text: 'สวัสดีค่ะ ตอนนี้มีสีธรรมชาติค่ะ สีครีมกำลังจะเข้าวันนี้', time: '09:45' },
    { me: false, type: 'image', url: A(window.SIRINTRA ? DATA.products[window.SIRINTRA.bucket].image : 'assets/images/product_bag.jpg'), time: '10:23' },
    last,
  ];
  return [{ ...last, day: /:/.test(c.time) ? 'วันนี้' : c.time }];
}
const chatOf = (c) => (CHAT_LOG[c.name] = CHAT_LOG[c.name] || chatSeed(c));
const STICKERS = () => (window.GIFTS ? window.GIFTS.sticker : []);
const AUTO_REPLY = ['ได้เลยค่ะ เดี๋ยวแอดมินเช็กให้นะคะ', 'ขอบคุณค่ะ 🙏', 'รับทราบค่ะ', 'สักครู่นะคะ'];

// ── Mock phone keyboard (Thai / English), shown while typing in the prototype frame. A real phone shows its own. ──
const KB_ROWS = {
  th: [['ๅ', '/', '-', 'ภ', 'ถ', 'ุ', 'ึ', 'ค', 'ต', 'จ'], ['ไ', 'ำ', 'พ', 'ะ', 'ั', 'ี', 'ร', 'น', 'ย', 'บ'], ['ฟ', 'ห', 'ก', 'ด', 'เ', '้', '่', 'า', 'ส', 'ว'], ['ผ', 'ป', 'แ', 'อ', 'ิ', 'ื', 'ท', 'ม', 'ใ']],
  en: [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['z', 'x', 'c', 'v', 'b', 'n', 'm']],
};
const realKeyboard = () => matchMedia('(pointer: coarse)').matches; // phones and tablets have their own keyboard
function MockKeyboard({ onKey, onBack, onSend, doneLabel = 'ส่ง', startLang = 'th' }) {
  const [lang, setLang] = useState(startLang);
  const rows = KB_ROWS[lang];
  const k = (ch) => <button key={ch} className="kb-k" onMouseDown={(e) => { e.preventDefault(); onKey(ch); }}>{ch}</button>;
  return (
    <div className="kb" aria-hidden="true">
      {rows.slice(0, -1).map((r, i) => <div className="kb-row" key={i}>{r.map(k)}</div>)}
      <div className="kb-row">
        <button className="kb-k kb-fn" onMouseDown={(e) => e.preventDefault()}><Icon name="arrow-fat-up" size={18} /></button>
        {rows[rows.length - 1].map(k)}
        <button className="kb-k kb-fn" onMouseDown={(e) => { e.preventDefault(); onBack(); }}><Icon name="backspace" size={20} /></button>
      </div>
      <div className="kb-row">
        <button className="kb-k kb-fn kb-wide" onMouseDown={(e) => e.preventDefault()}>123</button>
        <button className="kb-k kb-fn" onMouseDown={(e) => { e.preventDefault(); setLang(lang === 'th' ? 'en' : 'th'); }}><Icon name="globe" size={18} /></button>
        <button className="kb-k kb-space" onMouseDown={(e) => { e.preventDefault(); onKey(' '); }}>{lang === 'th' ? 'ไทย' : 'space'}</button>
        <button className="kb-k kb-fn kb-wide kb-go" onMouseDown={(e) => { e.preventDefault(); onSend(); }}>{doneLabel}</button>
      </div>
    </div>
  );
}

function ChatPage({ app, name }) {
  const c = INBOX.find((x) => x.name === name) || { name, msg: 'สวัสดีค่ะ', time: 'วันนี้' };
  const sh = c.shop ? shopByName(c.name) : null;
  const ring = DATA.storyShops.find((x) => x.name === c.name);
  const av = c.avatar || ring?.image || sh?.avatar || 'assets/images/live/viewer_1.jpg';
  const badge = sh?.badge || ring?.badge;
  const [msgs, setMsgs] = useState(() => chatOf(c));
  const [text, setText] = useState('');
  const [panel, setPanel] = useState(null); // null | 'more' | 'sticker'
  const [typing, setTyping] = useState(false);
  const [kb, setKb] = useState(false); // mock keyboard up
  const [view, setView] = useState(null); // full-screen photo or video
  const listRef = useRef(null);
  const imgIn = useRef(null), vidIn = useRef(null), camIn = useRef(null), inputRef = useRef(null);

  useEffect(() => { const el = listRef.current; if (el) el.scrollTop = el.scrollHeight; }, [msgs.length, panel, typing, kb]);
  const push = (m) => {
    const next = [...CHAT_LOG[c.name], { me: true, time: nowTime(), ...m }];
    CHAT_LOG[c.name] = next;
    setMsgs(next);
    c.msg = 'คุณ: ' + (m.type === 'text' ? m.text : m.type === 'image' ? 'ส่งรูปภาพ' : m.type === 'video' ? 'ส่งวิดีโอ' : 'ส่งสติ๊กเกอร์');
    c.time = nowTime();
    // Mock reply from the other side, so the conversation feels alive.
    setTimeout(() => setTyping(true), 700);
    setTimeout(() => {
      setTyping(false);
      const r = { me: false, type: 'text', text: AUTO_REPLY[next.length % AUTO_REPLY.length], time: nowTime() };
      CHAT_LOG[c.name] = [...CHAT_LOG[c.name], r];
      setMsgs(CHAT_LOG[c.name]);
    }, 2200);
  };
  const sendText = () => { const t = text.trim(); if (!t) return; push({ type: 'text', text: t }); setText(''); inputRef.current?.focus(); };
  const onFiles = (type) => (e) => {
    [...e.target.files].forEach((f) => push({ type: f.type.startsWith('video') ? 'video' : type, url: URL.createObjectURL(f) }));
    e.target.value = '';
    setPanel(null);
  };
  const toggle = (k) => { setPanel(panel === k ? null : k); if (panel !== k) { document.activeElement?.blur(); setKb(false); } };

  return (
    <div className="cht">
      <header className="m-hd ct-hd cht-hd">
        <div className="m-hd-row">
          <button className="round-btn ghost" aria-label="กลับ" onClick={() => app.back()}><Icon name="caret-left" size={24} /></button>
          <button className="cht-who" onClick={() => app.go(c.shop ? shopHref(c.name) : '/u/' + encodeURIComponent(c.name))}>
            <span className="cht-av"><img src={A(av)} alt="" /></span>
            <span className="cht-who-mid">
              <b className="ellipsis">{badge && <><ShopTag kind={badge} h={16} /> </>}{c.name}</b>
              <small>{c.shop ? 'ปกติตอบกลับภายใน 1 ชั่วโมง' : 'ออนไลน์เมื่อสักครู่'}</small>
            </span>
          </button>
          <button className="round-btn ghost" aria-label="เพิ่มเติม" onClick={() => app.toast('ตั้งค่าแชทยังไม่มีในต้นแบบ')}><Icon name="dots-three-vertical" size={22} /></button>
        </div>
      </header>

      <div className="cht-list" ref={listRef} onClick={() => panel && setPanel(null)}>
        {msgs.map((m, i) => (
          <React.Fragment key={i}>
            {m.day && <p className="cht-day">{m.day}</p>}
            <div className={`cht-row ${m.me ? 'me' : ''}`}>
              {!m.me && <img className="cht-row-av" src={A(av)} alt="" />}
              {m.type === 'text' && <p className="cht-bub">{m.text}</p>}
              {m.type === 'image' && <button className="cht-media" onClick={() => setView(m)} aria-label="ดูรูป"><img src={m.url} alt="รูปที่ส่ง" /></button>}
              {m.type === 'video' && <button className="cht-media" onClick={() => setView(m)} aria-label="เล่นวิดีโอ"><video src={m.url} muted playsInline preload="metadata" /><Icon name="play-circle" fill size={44} className="cht-play" /></button>}
              {m.type === 'sticker' && <span className="cht-sticker" role="img" aria-label={m.sticker.name}><GiftArt g={{ ...m.sticker, img: m.sticker.gif || m.sticker.img }} size={110} /></span>}
              <span className="cht-meta">{m.me && i === msgs.length - 1 && !typing ? 'อ่านแล้ว · ' : ''}{m.time}</span>
            </div>
          </React.Fragment>
        ))}
        {typing && <div className="cht-row"><img className="cht-row-av" src={A(av)} alt="" /><p className="cht-bub cht-typing" aria-label="กำลังพิมพ์"><i /><i /><i /></p></div>}
      </div>

      <div className="cht-bar">
        <button className={`cht-ic ${panel === 'more' ? 'on' : ''}`} aria-label="แนบรูป วิดีโอ หรือถ่ายรูป" aria-expanded={panel === 'more'} onClick={() => toggle('more')}><Icon name="plus-circle" size={26} /></button>
        <label className="cht-input">
          <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} onFocus={() => { setPanel(null); if (!realKeyboard() && !app.cases.web) setKb(true); }} onBlur={() => setKb(false)} onKeyDown={(e) => e.key === 'Enter' && sendText()} placeholder="พิมพ์ข้อความ..." aria-label="พิมพ์ข้อความ" />
          <button type="button" className={`cht-ic sm ${panel === 'sticker' ? 'on' : ''}`} aria-label="สติ๊กเกอร์" aria-expanded={panel === 'sticker'} onClick={(e) => { e.preventDefault(); toggle('sticker'); }}><Icon name="smiley" size={24} /></button>
        </label>
        {text.trim()
          ? <button className="cht-send" aria-label="ส่ง" onClick={sendText}><Icon name="paper-plane-right" fill size={20} /></button>
          : <button className="cht-ic" aria-label="ถ่ายรูป" onClick={() => camIn.current.click()}><Icon name="camera" size={26} /></button>}
      </div>

      {kb && !panel && <MockKeyboard onKey={(ch) => setText((t) => t + ch)} onBack={() => setText((t) => [...t].slice(0, -1).join(''))} onSend={sendText} />}
      {panel === 'more' && (
        <div className="cht-panel cht-more">
          <button onClick={() => imgIn.current.click()}><span className="cht-more-ic img"><Icon name="image" size={26} /></span>รูปภาพ</button>
          <button onClick={() => vidIn.current.click()}><span className="cht-more-ic vid"><Icon name="video-camera" size={26} /></span>วิดีโอ</button>
          <button onClick={() => camIn.current.click()}><span className="cht-more-ic cam"><Icon name="camera" size={26} /></span>ถ่ายรูป</button>
        </div>
      )}
      {panel === 'sticker' && (
        <div className="cht-panel cht-stickers" role="list" aria-label="สติ๊กเกอร์">
          {STICKERS().map((g) => (
            <button key={g.id} role="listitem" aria-label={`ส่งสติ๊กเกอร์ ${g.name}`} onClick={() => { push({ type: 'sticker', sticker: g }); setPanel(null); }}>
              <GiftArt g={g} size={56} /><span>{g.name}</span>
            </button>
          ))}
        </div>
      )}

      <input ref={imgIn} type="file" accept="image/*" multiple hidden onChange={onFiles('image')} />
      <input ref={vidIn} type="file" accept="video/*" hidden onChange={onFiles('video')} />
      <input ref={camIn} type="file" accept="image/*" capture="environment" hidden onChange={onFiles('image')} />

      {view && (
        <div className="cht-view" role="dialog" aria-modal="true" aria-label={view.type === 'video' ? 'วิดีโอ' : 'รูปภาพ'} onClick={() => setView(null)}>
          <button className="cht-view-x" aria-label="ปิด" onClick={() => setView(null)}><Icon name="x" size={24} /></button>
          {view.type === 'video' ? <video src={view.url} controls autoPlay playsInline onClick={(e) => e.stopPropagation()} /> : <img src={view.url} alt="" />}
        </div>
      )}
    </div>
  );
}

/** Open the chat with a shop or a person (from their page). Starts a new chat if there is none yet. */
function openChat(app, name, shop) {
  if (!app.cases.loggedIn) return app.login(shop ? 'พูดคุยกับร้าน' : 'ส่งข้อความ');
  if (!INBOX.find((x) => x.name === name)) {
    const pe = !shop && POSTS.find((x) => x.author === name);
    INBOX.unshift({ name, shop, avatar: pe ? pe.avatar : undefined, msg: shop ? 'สวัสดีค่ะ ยินดีให้บริการ สอบถามได้เลยนะคะ' : 'สวัสดีค่ะ', time: nowTime() });
  }
  app.go('/chat/' + encodeURIComponent(name));
}

Object.assign(window, { InboxPage, inboxUnread, ChatPage, openChat, MockKeyboard });
