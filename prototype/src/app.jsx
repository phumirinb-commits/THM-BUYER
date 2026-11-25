// App shell: hash routes, preview cases, sheets, phone frame.

const DEFAULT_CASES = { loggedIn: true, campaign: true, hasBrands: true, hasProducts: true, following: true, web: false, affNew: false, affNone: false, savedCard: true, manyCards: false, noAddress: false, newUser: true, maxUnpaid: false, followReq: true, myStory: false };

/** Saved switches, then any ?web=1&campaign=0… in the link on top. */
function readCases() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem('thm-cases') || '{}'); } catch (_) {}
  const q = new URLSearchParams(location.search);
  const fromLink = Object.fromEntries(Object.keys(DEFAULT_CASES).filter((k) => q.has(k)).map((k) => [k, q.get(k) === '1']));
  return { ...DEFAULT_CASES, ...saved, ...fromLink };
}

function useRoute() {
  const parse = () => {
    const [path, q] = (location.hash.slice(1) || '/').split('?');
    return { path, query: new URLSearchParams(q || '') };
  };
  const [route, setRoute] = useState(parse);
  useEffect(() => { const f = () => setRoute(parse()); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f); }, []);
  return route;
}

/** ?h=2400 makes the phone taller, to check content below the fold. */
const PHONE_H = Number(new URLSearchParams(location.search).get('h')) || null;

const NEEDS_LOGIN = { orders: 'ดูคำสั่งซื้อ', inbox: 'ดูกล่องข้อความ', profile: 'ดูโปรไฟล์ของคุณ' };

function TabPlaceholder({ app, tab }) {
  const label = { discover: 'ค้นพบ', live: 'ไลฟ์', orders: 'คำสั่งซื้อ', profile: 'โปรไฟล์' }[tab];
  const body = <div className="tab-empty">{label} · ยังไม่มีดีไซน์</div>;
  if (app.cases.web) return <div className="web"><WebHeader app={app} current={tab} /><main className="wrap">{body}</main><Footer /></div>;
  return (
    <>
      <MobileHeader app={app} home />
      <div className="m-scroll">{body}</div>
      <BottomNav app={app} current={tab} />
    </>
  );
}

function App() {
  const route = useRoute();
  const [cases, setCases] = useState(readCases);
  const [campaignEnded, setCampaignEnded] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  // ?sheet=trust opens the explainer straight away (for checking it).
  const [sheet, setSheet] = useState(() => (new URLSearchParams(location.search).get('sheet') === 'trust' ? { kind: 'trust' } : null));

  const [toast, setToast] = useState('');
  const toastTimer = useRef(0);
  useEffect(() => { try { localStorage.setItem('thm-cases', JSON.stringify(cases)); } catch (_) {} }, [cases]);

  const app = {
    cases,
    campaignEnded,
    restartKey,
    setCampaignEnded,
    go: (path) => { location.hash = path; },
    back: () => (history.length > 1 ? history.back() : (location.hash = '/')),
    /** Change a preview case; restart=true goes back to a freshly loading Home. */
    setCase: (k, v, restart) => {
      setCases((c) => ({ ...c, [k]: v }));
      if (restart) { setCampaignEnded(false); setRestartKey((n) => n + 1); location.hash = '/'; }
    },
    sheet: (kind, arg) => setSheet({ kind, arg }),
    login: (action) => setSheet({ kind: 'login', arg: action }),
    // Add-to-cart (and ซื้อเลย): opens the options sheet for colour, size and quantity.
    // Not logged in: the login page first; the sheet opens again once they are in.
    cart: (id, mode = 'cart') => {
      if (!cases.loggedIn) { window.LOGIN_NEXT = { why: mode === 'buy' ? 'สั่งซื้อสินค้านี้' : 'เพิ่มสินค้าลงตะกร้า', cart: { id, mode } }; location.hash = '/login'; return; }
      setSheet({ kind: 'cart', arg: { id, mode } });
    },
    /** The login / register page, with why they need it. */
    loginPage: (why) => { window.LOGIN_NEXT = { why }; location.hash = '/login'; },
    toast: (text) => { clearTimeout(toastTimer.current); setToast(text); toastTimer.current = setTimeout(() => setToast(''), 2200); },
    openTab: (key) => {
      if (key === 'home') return (location.hash = '/');
      // ไลฟ์ tab: opens the first room that is live now.
      if (key === 'live') { const i = DATA.storyShops.findIndex((st) => st.live); if (i >= 0) { window.LIVE_FROM_TAB = true; return (location.hash = '/live/' + i); } }
      if (NEEDS_LOGIN[key] && !cases.loggedIn) return setSheet({ kind: 'login', arg: NEEDS_LOGIN[key] });
      location.hash = '/tab/' + key;
    },
  };

  let page;
  const m = route.path.match(/^\/product\/(\d+)/);
  if (m && DATA.products[+m[1]] && !DATA.products[+m[1]].hidden) page = <ProductPage key={m[1]} app={app} id={+m[1]} from={route.query.get('from')} />;
  else if (route.path.match(/^\/live\/(\d+)/) && DATA.liveRoomFor(+route.path.split('/')[2])) page = <LivePage key={route.path} app={app} index={+route.path.split('/')[2]} />;
  else if (route.path.match(/^\/story\/(\d+)$/) && DATA.storyShops[+route.path.split('/')[2]] && !DATA.storyShops[+route.path.split('/')[2]].live) page = <StoryPage app={app} index={+route.path.split('/')[2]} />;
  else if (route.path.match(/^\/shop\/(\d+)$/) && DATA.brands[+route.path.split('/')[2]]) page = <ShopPage key={route.path} app={app} index={+route.path.split('/')[2]} />;
  else if (route.path.startsWith('/shop/n/')) page = <ShopPage key={route.path} app={app} name={decodeURIComponent(route.path.slice(8))} />;
  else if (route.path === '/campaign') page = <CampaignPage app={app} />;
  else if (route.path === '/tab/orders') page = <OrdersPage app={app} />;
  else if (route.path.match(/^\/pay\/[^/]+\/qr$/)) page = <PayQrPage app={app} id={decodeURIComponent(route.path.split('/')[2])} />;
  else if (route.path.startsWith('/pay/')) page = <PayPage app={app} id={decodeURIComponent(route.path.slice(5))} />;
  else if (route.path === '/tab/inbox' && cases.loggedIn) page = <InboxPage app={app} />;
  else if (route.path.startsWith('/chat/')) page = <ChatPage key={route.path} app={app} name={decodeURIComponent(route.path.slice(6))} />;
  else if (route.path === '/tab/discover') page = <DiscoverPage app={app} />;
  else if (route.path === '/discover/new') page = <ComposePage app={app} />;
  else if (route.path === '/cart') page = <CartPage app={app} />;
  else if (route.path === '/checkout') page = <CheckoutPage app={app} />;
  else if (route.path.startsWith('/u/')) page = <UserProfilePage key={route.path} app={app} name={decodeURIComponent(route.path.slice(3))} />;
  else if (route.path === '/tax') page = <TaxPage app={app} />;
  else if (route.path === '/address') page = <AddressPage app={app} />;
  else if (route.path === '/address/new' || /^\/address\/edit\/\d+$/.test(route.path)) page = <AddressForm key={route.path} app={app} index={route.path.startsWith('/address/edit/') ? +route.path.split('/')[3] : null} />;
  else if (route.path === '/affiliate') page = <AffiliatePage app={app} />;
  else if (route.path === '/shops') page = <ShopsPage app={app} />;
  else if (route.path === '/login') page = <LoginPage app={app} />;
  else if (route.path === '/settings') page = <SettingsPage app={app} />;
  else if (/^\/follow\/(followers|following)$/.test(route.path)) page = <FollowPage key={route.path} app={app} tab={route.path.split('/')[2]} />;
  else if (route.path === '/settings/privacy') page = <PrivacyPage app={app} />;
  else if (route.path === '/settings/linked') page = <LinkedAccountsPage app={app} />;
  else if (route.path === '/settings/delete') page = <DeleteAccountPage app={app} />;
  else if (route.path === '/settings/profile') page = <EditProfilePage app={app} />;
  else if (/^\/settings\/profile\/(name|user|bio)$/.test(route.path)) page = <EditFieldPage key={route.path} app={app} field={route.path.split('/')[3]} />;
  else if (route.path === '/profile/setup') page = <ProfileSetupPage app={app} />;
  else if (route.path === '/profile/interests') page = <InterestsPage app={app} />;
  else if (route.path === '/welcome') page = <WelcomePage app={app} />;
  else if (route.path === '/tab/profile' && cases.loggedIn) page = <ProfilePage app={app} />;
  else if (route.path.startsWith('/tab/')) page = <TabPlaceholder app={app} tab={route.path.slice(5)} />;
  else page = <HomePage key={restartKey} app={app} />;

  const sheets = sheet && (sheet.kind === 'trust'
    ? <TrustSheet app={app} onClose={() => setSheet(null)} />
    : sheet.kind === 'cart'
      ? <CartSheet key={sheet.arg.id + sheet.arg.mode} app={app} id={sheet.arg.id} mode={sheet.arg.mode} onClose={() => setSheet(null)} />
      : <LoginSheet app={app} action={sheet.arg} onClose={() => setSheet(null)} />);

  // Real phone: tint the browser's top bar to match the page top (soft red, dark media, or white).
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    const c = cases.web ? '#FFFFFF' : /^\/(live|story)\//.test(route.path) ? '#111111' : document.querySelector('.phone .m-hd.mood') ? '#F29B9A' : '#FFFFFF';
    if (meta.content !== c) meta.content = c;
  });

  if (cases.web) {
    return <>{page}{sheets}<Toast text={toast} />{!sheet && !/^\/story\//.test(route.path) && <CasePanel app={app} />}</>;
  }
  return (
    <>
      <div className="stage">
        <div className="bezel">
          <div className="phone" style={PHONE_H ? { height: PHONE_H } : null}>
            {page}
            {sheets}
            <Toast text={toast} />
            <div className={`statusbar ${/^\/(live|story|shop)\/|^\/tab\/profile$/.test(route.path) ? 'dark' : ''}`} aria-hidden="true"><span className="time">9:41</span><img src={A('assets/icons/status_right.svg')} alt="" /></div>
          </div>
        </div>
      </div>
      {/* Hidden on Live: it would sit on the live controls. */}
      {!sheet && !/^\/(live|story)\//.test(route.path) && <CasePanel app={app} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
