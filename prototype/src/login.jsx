// เข้าสู่ระบบ / สมัครสมาชิก (#/login). Opens when someone who is not logged in taps ซื้อ / เพิ่มลงตะกร้า
// (or เข้าสู่ระบบ in the login sheet). Phone number → 6-digit OTP (any 6 digits work in the prototype),
// or a social account. After that: logged in, back to where they were, and the cart sheet opens again.
// window.LOGIN_NEXT = { why, cart: { id, mode } } is set by whoever sent them here.

// ── Phone number: what people type or paste, cleaned to a Thai mobile 0XXXXXXXXX ──
// Thai digits ๐–๙ → 0–9; +66 / 66 / 0066 → 0; 9 digits without the 0 (812345678) → add the 0; at most 10 digits.
const THAI_DIGITS = '๐๑๒๓๔๕๖๗๘๙';
const toArabic = (t) => t.replace(/[๐-๙]/g, (c) => String(THAI_DIGITS.indexOf(c)));
function normPhone(raw) {
  let d = toArabic(raw).replace(/\D/g, '');
  if (d.startsWith('0066')) d = '0' + d.slice(4);
  else if (d.startsWith('66') && d.length >= 11) d = '0' + d.slice(2);
  if (/^[689]/.test(d)) d = '0' + d; // typed after +66 without the 0
  return d.slice(0, 10);
}
/** 0812345678 → 081-234-5678, filled in as they type. */
const fmtPhone = (d) => [d.slice(0, 3), d.slice(3, 6), d.slice(6)].filter(Boolean).join('-');
/** null when fine, else what to fix (Thai, short). */
function phoneProblem(d) {
  if (!d) return 'กรุณากรอกหมายเลขโทรศัพท์มือถือ';
  if (!/^0[689]/.test(d)) return 'หมายเลขโทรศัพท์มือถือต้องขึ้นต้นด้วย 06, 08 หรือ 09';
  if (d.length < 10) return `กรุณากรอกหมายเลขโทรศัพท์มือถือให้ครบ 10 หลัก`;
  return null;
}

function OtpBoxes({ value, onChange, bad, off }) {
  const ref = useRef(null);
  useEffect(() => { if (!off) ref.current?.focus(); }, [off]); // focus again once a new code unlocks it
  return (
    <label className={`lg-otp ${bad ? 'bad' : ''} ${off ? 'off' : ''}`}>
      <input ref={ref} inputMode="numeric" autoComplete="one-time-code" aria-label="รหัส OTP 6 หลัก" aria-invalid={bad || undefined} disabled={off}
        value={value} onChange={(e) => onChange(toArabic(e.target.value).replace(/\D/g, '').slice(0, 6))} />
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className={`lg-otp-box ${i === value.length ? 'cur' : ''} ${value[i] ? 'on' : ''}`} aria-hidden="true">{value[i] || ''}</span>
      ))}
    </label>
  );
}

/** Google "G" in its own colours, and the LINE mark (sign-in buttons). */
const GoogleG = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);
const LineMark = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
    <rect width="48" height="48" rx="11" fill="#06C755" />
    <path fill="#fff" d="M24 10c-9.4 0-17 6.1-17 13.7 0 6.8 6 12.4 14.2 13.5.6.1 1.3.4 1.5.9.2.4.1 1.1.1 1.5l-.2 1.5c-.1.4-.3 1.7 1.5.9 1.8-.8 9.9-5.8 13.5-10 2.5-2.7 3.4-5.5 3.4-8.3C41 16.1 33.4 10 24 10z" />
    <text x="24" y="27.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="9" fill="#06C755">LINE</text>
  </svg>
);

/** Hero: the elephant mark in the middle of two dashed rings, Thaimart's own trust badges floating around it. */
const HERO_BADGES = [
  // [left %, top %, tilt deg, what, size] — mixed sizes so it feels playful
  [16, 14, -10, <img src={A('assets/icons/badge_official.svg')} width="56" height="20" alt="" />, 1.15],
  [72, 8, 8, <img src={A('assets/icons/verified_seal.svg')} width="30" height="30" alt="" />, 0.8],
  [90, 44, 10, <X2Seal size={30} />, 1.0],
  [76, 80, -8, <img src={A('assets/icons/delivery_truck.svg')} width="30" height="30" alt="" />, 0.85],
  [20, 82, 8, <img src={A('assets/icons/genuine_flag.svg')} width="54" height="28" alt="" />, 1.2],
  [6, 46, -8, <img src={A('assets/icons/tis_badge_small.svg')} width="30" height="30" alt="" />, 0.75],
  [48, 96, 6, <img src={A('assets/icons/fda_badge.svg')} width="30" height="30" alt="" />, 0.9],
  [44, 0, -6, <img src={A('assets/icons/badge_mall.svg')} width="40" height="20" alt="" />, 1.05],
];
function LoginHero() {
  return (
    <div className="lg-hero" aria-hidden="true">
      <span className="lg-ring outer" />
      <span className="lg-ring inner" />
      <span className="lg-hero-mark"><img src={A('assets/icons/logo_mark.svg')} alt="" /></span>
      {HERO_BADGES.map(([x, y, r, el, sc = 1], i) => (
        <span key={i} className="lg-float" style={{ left: `${x}%`, top: `${y}%`, '--r': `${r}deg`, '--s': sc, animationDelay: `${(i % 4) * -0.9}s`, animationDuration: `${4 + (i % 3)}s` }}>{el}</span>
      ))}
    </div>
  );
}

// The way they signed in last time on this device (prototype: LINE until they sign in once).
const LAST_LOGIN_KEY = 'thm-last-login';
const lastLogin = () => { try { return localStorage.getItem(LAST_LOGIN_KEY) || 'LINE'; } catch { return 'LINE'; } };
function LastBadge() {
  return <b id="lg-last" className="lg-last">ใช้งานล่าสุด</b>;
}

function LoginPage({ app }) {
  const next = window.LOGIN_NEXT || {};
  const [step, setStep] = useState('phone'); // phone | otp
  const [phone, setPhone] = useState('');
  const last = useMemo(lastLogin, []);
  const [otp, setOtp] = useState('');
  const [wait, setWait] = useState(0);
  const [tried, setTried] = useState(false);
  const [otpErr, setOtpErr] = useState('');
  const [fails, setFails] = useState(0);
  // Each code works for 5 minutes. After that (or 111111 in the prototype) it is expired: ask for a new one.
  const OTP_LIFE = 5 * 60 * 1000;
  const [sentAt, setSentAt] = useState(0);
  const [expired, setExpired] = useState(false);
  useEffect(() => { if (!sentAt) return; const t = setTimeout(() => setExpired(true), OTP_LIFE); return () => clearTimeout(t); }, [sentAt]);
  // Reference code shown with the OTP (matches the one in the SMS); new one on every send.
  const newRef = () => Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 24)]).join('');
  const [ref, setRef] = useState(newRef);
  useEffect(() => { if (wait <= 0) return; const t = setTimeout(() => setWait(wait - 1), 1000); return () => clearTimeout(t); }, [wait]);

  const digits = normPhone(phone);
  const problem = phoneProblem(digits);
  const phoneOk = !problem;
  const shown = fmtPhone(digits);

  // One flow for both: an unknown number gets an account made for it (mock).
  const done = (how) => {
    try { localStorage.setItem(LAST_LOGIN_KEY, how || 'phone'); } catch {}
    app.setCase('loggedIn', true, false);
    window.LOGIN_NEXT = null;
    // First sign-up: make a profile first (replaces the login page, so back skips it).
    if (app.cases.newUser) { window.SETUP_NEXT = { ...next, how }; location.replace('#/profile/setup'); return; }
    app.toast(`เข้าสู่ระบบแล้ว${how ? ' ด้วย ' + how : ''}`);
    app.back();
    if (next.cart) setTimeout(() => app.sheet('cart', next.cart), 350); // carry on with the purchase
  };
  // OTP (prototype): any 6 digits pass, except 000000 = wrong code and 111111 = expired code. 5 wrong → ask for a new code.
  useEffect(() => {
    if (otp.length < 6) return;
    const t = setTimeout(() => {
      if (otp === '111111' || Date.now() - sentAt > OTP_LIFE) { setExpired(true); setOtp(''); return; }
      if (otp !== '000000') return done();
      const n = fails + 1;
      setFails(n);
      setOtpErr(n >= 5 ? 'กรอกรหัสไม่ถูกต้องเกินจำนวนครั้งที่กำหนด กรุณาขอรหัสใหม่' : `รหัสไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง (เหลือ ${5 - n} ครั้ง)`);
      setOtp('');
    }, 300);
    return () => clearTimeout(t);
  }, [otp]);
  const send = () => { setTried(true); if (!phoneOk) return; setStep('otp'); setOtp(''); setOtpErr(''); setFails(0); setWait(30); setRef(newRef()); setSentAt(Date.now()); setExpired(false); };
  const resend = () => { setWait(30); setOtp(''); setOtpErr(''); setFails(0); setRef(newRef()); setSentAt(Date.now()); setExpired(false); app.toast('ส่งรหัสใหม่แล้ว'); };
  const locked = fails >= 5 || expired; // only a new code helps now
  const legal = (what) => (e) => { e.preventDefault(); app.toast(`${what}ยังไม่มีในต้นแบบ`); };

  return (
    <div className="lg-wrap">
      <header className="lg-hd">
        {step === 'otp'
          ? <button className="round-btn ghost" aria-label="กลับไปแก้เบอร์" onClick={() => setStep('phone')}><Icon name="caret-left" size={24} /></button>
          : <span />}
        <button className="round-btn ghost" aria-label="ปิด" onClick={() => app.back()}><Icon name="x" size={24} /></button>
      </header>
      <div className="lg-page">
        {step === 'phone' ? (
          <div className="lg">
            <LoginHero />
            <h1 className="lg-title">เข้าสู่ระบบหรือสมัครสมาชิก</h1>
            <p className="lg-sub">ยังไม่มีบัญชี? ระบบจะสร้างให้อัตโนมัติ</p>

            <label className={`lg-phone ${tried && !phoneOk ? 'bad' : ''}`}>
              {last === 'phone' && <LastBadge />}
              <b>+66</b>
              {/* Cleaned and formatted as they type or paste: 081-234-5678. */}
              <input type="tel" value={phone} onChange={(e) => setPhone(fmtPhone(normPhone(e.target.value)))} inputMode="tel" autoComplete="tel-national"
                placeholder="หมายเลขโทรศัพท์ของคุณ" aria-label="หมายเลขโทรศัพท์มือถือ" aria-invalid={(tried && !phoneOk) || undefined} aria-describedby="lg-err"
                onKeyDown={(e) => e.key === 'Enter' && send()} />
              {phone && <button type="button" className="lg-clear" aria-label="ล้างเบอร์" onClick={() => { setPhone(''); setTried(false); }}><Icon name="x-circle" fill size={20} /></button>}
            </label>
            {tried && problem && <p id="lg-err" className="lg-err" role="alert">{problem}</p>}
            <button className="btn-primary block lg-go" onClick={send}>ขอรหัสยืนยัน OTP</button>

            <p className="lg-or"><span>หรือ</span></p>
            <div className="lg-social">
              <button onClick={() => done('Google')} aria-describedby={last === 'Google' ? 'lg-last' : undefined}><GoogleG /><span>เข้าใช้งานด้วย Google</span>{last === 'Google' && <LastBadge />}</button>
              <button onClick={() => done('LINE')} aria-describedby={last === 'LINE' ? 'lg-last' : undefined}><LineMark /><span>เข้าใช้งานด้วย Line</span>{last === 'LINE' && <LastBadge />}</button>
              <button onClick={() => done('Apple')} aria-describedby={last === 'Apple' ? 'lg-last' : undefined}><Icon name="apple-logo" fill size={24} /><span>เข้าใช้งานด้วย Apple</span>{last === 'Apple' && <LastBadge />}</button>
            </div>

            <p className="lg-legal">
              เมื่อดำเนินการต่อแสดงว่าคุณยอมรับ<a href="#/login" onClick={legal('เงื่อนไขการใช้บริการ')}>เงื่อนไขการใช้บริการ</a>ของ Thaimart
              และยืนยันว่าคุณได้อ่านและเข้าใจ<a href="#/login" onClick={legal('นโยบายความเป็นส่วนตัว')}>นโยบายความเป็นส่วนตัว</a>ของเราแล้ว
            </p>
          </div>
        ) : (
          <div className="lg">
            <img className="lg-mark" src={A('assets/icons/logo_mark.svg')} alt="Thaimart" />
            <h1 className="lg-title">ใส่รหัสยืนยัน OTP</h1>
            <p className="lg-sub">ส่งรหัส 6 หลักไปที่ <b>{shown}</b> แล้ว</p>
            <p className="lg-ref">รหัสอ้างอิง <b>{ref}</b> · ใช้ได้ภายใน 5 นาที</p>
            <OtpBoxes value={otp} onChange={(v) => { setOtp(v); if (v) setOtpErr(''); }} bad={!!otpErr && !locked} off={locked} />
            {expired
              ? <p className="lg-err center lg-expired" role="alert"><Icon name="clock-countdown" size={18} />รหัสนี้หมดอายุแล้ว ขอรหัส OTP ใหม่เพื่อเข้าสู่ระบบ</p>
              : otpErr && <p className="lg-err center" role="alert">{otpErr}</p>}
            {wait > 0 && !locked
              ? <p className="lg-resend">หากยังไม่ได้รับ SMS กรุณารออีก <b>{wait}</b> วินาที เพื่อขอ OTP ใหม่</p>
              : (locked
                ? <button className="btn-primary block lg-resend-btn" onClick={resend}>ส่งรหัสใหม่</button>
                : <button className="lg-resend-link" onClick={resend}>ขอรหัส OTP อีกครั้ง</button>)}
          </div>
        )}
      </div>
    </div>
  );
}

// First sign-up: photo, display name and username. Nothing prefilled: they fill it in themselves.
function ProfileSetupPage({ app }) {
  const next = window.SETUP_NEXT || {};
  const draft = next.draft || {};
  const [name, setName] = useState(draft.name ?? '') // empty: they type their own;
  const [user, setUser] = useState(draft.user || '');
  const [photo, setPhoto] = useState(!!draft.photo); // no photo until they pick one
  const [tried, setTried] = useState(false);
  const fileRef = useRef(null);
  const [pic, setPic] = useState(draft.pic || '');
  const [gallery, setGallery] = useState(false); // in-app gallery (not the system picker)
  const [crop, setCrop] = useState(null); // picked photo, waiting in the circle
  const [kb, setKb] = useState(null); // mock phone keyboard: 'name' | 'user' (prototype frame only)
  const userRef = useRef(null);
  const kbOn = (f) => () => { if (!app.cases.web && !matchMedia('(pointer: coarse)').matches) setKb(f); };
  const handle = user.toLowerCase().replace(/[^a-z0-9._]/g, '');
  const userBad = handle && handle.length < 3;
  const taken = ['thaimart', 'admin', 'sirintra'].includes(handle);
  const nameOk = name.trim().length > 0;
  // Next: pick interests (then the welcome page).
  const finish = () => {
    setTried(true); if (!nameOk || !handle || userBad || taken) return;
    ME.name = name.trim(); ME.handle = '@' + handle;
    ME.photo = photo ? pic : '';
    window.SETUP_NEXT = { ...next, draft: { name, user, photo, pic } };
    location.replace('#/profile/interests');
  };
  // Back: not signed up yet, so return to the login page (signed out) with the same reason.
  const goBack = () => {
    app.setCase('loggedIn', false, false);
    const { how, ...rest } = next;
    window.LOGIN_NEXT = rest; window.SETUP_NEXT = null;
    location.replace('#/login');
  };
  const onFile = (e) => { const f = e.target.files && e.target.files[0]; if (f) { setCrop(URL.createObjectURL(f)); setGallery(false); } e.target.value = ''; };
  return (
    <div className="lg-wrap ps-wrap mood">
      <header className="lg-hd">
        <button className="round-btn ghost" aria-label="กลับ" onClick={goBack}><Icon name="caret-left" size={24} /></button>
        <span />
      </header>
      <div className="lg-page">
        <div className="lg ps">
          <h1 className="lg-title">สร้างโปรไฟล์ของคุณ</h1>
          <p className="lg-sub">ชื่อจะแสดงให้คนอื่นเห็นบนโปรไฟล์<br />ส่วนชื่อผู้ใช้งานใช้ระบุตัวตนและจะไม่ซ้ำกับผู้ใช้อื่น</p>

          <button className="ps-av" aria-label="เลือกรูปโปรไฟล์" onClick={() => setGallery(true)}>
            {photo
              ? <img src={pic.startsWith('blob:') ? pic : A(pic)} alt="" />
              : <Icon name="user" size={44} />}
            <img className="ps-mascot" src={A('assets/images/profile/mascot.png')} alt="" />
            <span className="ps-cam"><Icon name="camera" size={18} /></span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" capture="user" hidden onChange={onFile} />
          {gallery && (
            <GalleryPicker app={app} max={1} photosOnly title="เลือกรูปโปรไฟล์" doneLabel="ใช้รูปนี้" onClose={() => setGallery(false)}
              onCamera={() => fileRef.current && fileRef.current.click()}
              onDone={([g]) => { setGallery(false); if (g) setCrop(g.path); }} />
          )}
          {crop && <PhotoCrop app={app} src={crop} onClose={() => setCrop(null)} onSave={(v) => { setCrop(null); setPic(v); setPhoto(true); }} />}

          <label className={`ad-field ps-field ${tried && !nameOk ? 'bad' : ''}`}>
            <span className="ad-field-lb">ชื่อโปรไฟล์<em className="ps-req" aria-label="จำเป็น">*</em></span>
            <div className="ps-user ps-name">
              <input value={name} maxLength={30} onChange={(e) => setName(e.target.value)} onFocus={kbOn('name')} onBlur={() => setKb(null)} enterKeyHint="next" placeholder="กรอกชื่อโปรไฟล์" autoComplete="name" />
              {name && <button type="button" className="lg-clear" aria-label="ลบชื่อโปรไฟล์ทั้งหมด" onClick={(e) => { e.preventDefault(); setName(''); e.currentTarget.parentNode.querySelector('input').focus(); }}><Icon name="x-circle" fill size={20} /></button>}
            </div>
            {tried && !nameOk && <small>กรุณากรอกชื่อโปรไฟล์</small>}
          </label>

          <label className={`ad-field ps-field ${userBad || taken || (tried && !handle) ? 'bad' : ''}`}>
            <span className="ad-field-lb">ชื่อผู้ใช้งาน<em className="ps-req" aria-label="จำเป็น">*</em></span>
            <div className="ps-user">
              <b>@</b>
              <input ref={userRef} value={handle} maxLength={20} onChange={(e) => setUser(e.target.value)} onFocus={kbOn('user')} onBlur={() => setKb(null)} enterKeyHint="done" placeholder="กรอกชื่อผู้ใช้งาน" autoCapitalize="none" autoComplete="username" inputMode="email" />
              {handle && !userBad && !taken && <Icon name="check-circle" fill size={20} />}
              {handle && <button type="button" className="lg-clear ps-clear" aria-label="ลบชื่อผู้ใช้งานทั้งหมด" onMouseDown={(e) => e.preventDefault()} onClick={(e) => { e.preventDefault(); setUser(''); userRef.current && userRef.current.focus(); }}><Icon name="x-circle" fill size={20} /></button>}
            </div>
            {tried && !handle ? <small>กรุณากรอกชื่อผู้ใช้งาน</small>
              : userBad ? <small>กรุณากรอกอย่างน้อย 3 ตัวอักษร</small>
              : taken ? <small>ชื่อผู้ใช้งานนี้ถูกใช้แล้ว กรุณาเลือกชื่ออื่น</small>
              : <span className="ps-hint">ใช้ a-z 0-9 . และ _ ได้</span>}
          </label>
        </div>
      </div>
      <div className={`ps-foot ${kb ? 'kb-up' : ''}`}>
        <button className="btn-primary block" onMouseDown={(e) => kb && e.preventDefault()} onClick={finish}>ถัดไป</button>
      </div>
      {kb === 'name' && <MockKeyboard key="name" onKey={(ch) => setName((t) => (t + ch).slice(0, 30))} onBack={() => setName((t) => [...t].slice(0, -1).join(''))} onSend={() => userRef.current && userRef.current.focus()} doneLabel="ถัดไป" />}
      {kb === 'user' && <MockKeyboard key="user" startLang="en" onKey={(ch) => setUser((t) => (t + ch).slice(0, 20))} onBack={() => setUser((t) => [...t].slice(0, -1).join(''))} onSend={() => document.activeElement && document.activeElement.blur()} doneLabel="เสร็จ" />}
    </div>
  );
}

// First sign-up, step 2: what they like (categories). Optional: ข้าม goes straight to the welcome page.
function InterestsPage({ app }) {
  const cats = DATA.categories.slice(1).filter((c) => c.label !== 'อื่นๆ');
  const [on, setOn] = useState(() => new Set((window.SETUP_NEXT || {}).interests || []));
  const toggle = (l) => setOn((s) => { const n = new Set(s); n.has(l) ? n.delete(l) : n.add(l); return n; });
  const go = (list) => { window.SETUP_NEXT = { ...(window.SETUP_NEXT || {}), interests: list }; location.replace('#/welcome'); };
  return (
    <div className="lg-wrap ps-wrap mood">
      <header className="lg-hd">
        <button className="round-btn ghost" aria-label="กลับ" onClick={() => { window.SETUP_NEXT = { ...(window.SETUP_NEXT || {}), interests: [...on] }; location.replace('#/profile/setup'); }}><Icon name="caret-left" size={24} /></button>
        <span />
      </header>
      <div className="lg-page">
        <div className="lg">
          <h1 className="lg-title">เลือกสิ่งที่คุณสนใจ</h1>
          <p className="lg-sub">เราจะแนะนำสินค้าที่ตรงใจคุณ เลือกได้หลายหมวด</p>
          <div className="it-grid" role="group" aria-label="หมวดหมู่ที่สนใจ">
            {cats.map((c) => {
              const sel = on.has(c.label);
              return (
                <button key={c.label} className={`it-tile ${sel ? 'on' : ''}`} aria-pressed={sel} onClick={() => toggle(c.label)}>
                  {sel && <span className="it-check"><Icon name="check" size={12} /></span>}
                  <span className="it-ic"><Icon name={c.icon} size={28} /></span>
                  <span className="it-lb">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="ps-foot">
        <button className="btn-primary block" disabled={!on.size} onClick={() => go([...on])}>ถัดไป</button>
        <button className="btn-quiet block" onClick={() => go([])}>ข้าม</button>
      </div>
    </div>
  );
}

// Celebration burst on the welcome page: confetti pops from behind the photo, then drifts down. Calm, once.
function Confetti({ n = 44 }) {
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bits = useMemo(() => Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + Math.random() * 0.4;
    const d = 90 + Math.random() * 110;
    return {
      x: Math.cos(a) * d, y: Math.sin(a) * d * 0.8 - 40, fall: 160 + Math.random() * 160,
      r: Math.round(Math.random() * 720 - 360), delay: Math.random() * 0.25, dur: 1.6 + Math.random() * 0.8,
      c: ['#E32321', '#F39E9D', '#FFC94D', '#FF7A59', '#FFFFFF', '#E32321'][i % 6], w: 6 + Math.random() * 5, round: i % 3 === 0,
    };
  }), [n]);
  if (reduce) return null;
  return (
    <div className="cf" aria-hidden="true">
      {bits.map((b, i) => (
        <i key={i} style={{ '--x': b.x + 'px', '--y': b.y + 'px', '--f': b.fall + 'px', '--r': b.r + 'deg', animationDelay: b.delay + 's', animationDuration: b.dur + 's', background: b.c, width: b.w, height: b.round ? b.w : b.w * 0.5, borderRadius: b.round ? '50%' : 2, boxShadow: b.c === '#FFFFFF' ? '0 0 0 1px #F6C9C8' : 'none' }} />
      ))}
    </div>
  );
}

// First sign-up, step 3: welcome. เริ่มใช้งาน goes to Home.
function WelcomePage({ app }) {
  const next = window.SETUP_NEXT || {};
  const start = () => {
    app.setCase('newUser', false, false);
    window.SETUP_NEXT = null;
    location.replace('#/');
  };
  return (
    <div className="lg-wrap ps-wrap mood">
      <header className="lg-hd"><span /></header>
      <div className="lg-page">
        <div className="lg wc">
          <div className="wc-burst"><Confetti /><Confetti key="b" n={30} /></div>
          <div className="ps-av wc-av" aria-hidden="true">
            <img className="ps-mascot" src={A('assets/images/profile/mascot.png')} alt="" />
            {ME.photo ? <img src={ME.photo.startsWith('blob:') ? ME.photo : A(ME.photo)} alt="" /> : <Icon name="user" size={44} />}
          </div>
          <h1 className="lg-title"><span className="wc-hi">ยินดีต้อนรับคุณ</span><span className="wc-h2">{ME.name}</span></h1>
          <p className="lg-sub">เริ่มค้นหาสินค้าที่ชอบ คอนเทนต์ที่ใช่ได้เลย</p>
          <div className="wc-perks">
            <div><span className="wc-ic"><ElephantSeal size={28} /></span><p><b>ของแท้ต้องไทยมาร์ท</b><span>สินค้าผ่านการตรวจสอบหลักฐานแหล่งที่มาและเอกสารที่เกี่ยวข้องโดย Thaimart</span></p></div>
            <div><span className="wc-ic"><X2Seal size={28} /></span><p><b>ปลอมคืนเงิน 2 เท่า</b><span>เจอของปลอม รับเงินคืน 2 เท่า*</span></p></div>
            <div><span className="wc-ic"><TrustIcon k="truck" size={26} /></span><p><b>จัดส่งฟรี</b><span>สำหรับสินค้าที่ร่วมรายการ</span></p></div>
          </div>
        </div>
      </div>
      <div className="ps-foot">
        <button className="btn-primary block" onClick={start}>เริ่มใช้งาน</button>
      </div>
    </div>
  );
}

Object.assign(window, { LoginPage, LineMark, ProfileSetupPage, InterestsPage, WelcomePage });
