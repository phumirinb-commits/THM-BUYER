// Trust badges, drawn here as SVG (no source files were attached).

const ELEPHANT = "M13.9124 8C15.4784 8 17.0085 8.589 18.221 9.65951C19.7279 9.43409 21.7088 10.0685 23.3961 11.3171L23.3974 11.319C25.5652 12.9238 26.8088 15.1928 26.8089 17.5443C26.8089 22.3113 24.6454 23.7337 24.3981 23.8802C24.2656 23.9586 24.1136 24 23.9593 24H17.5543C17.1013 24 16.725 23.6454 16.6963 23.1934C16.6745 22.9137 16.4888 21.5156 14.9638 21.5156C14.2611 21.5156 13.7815 21.7598 13.4977 22.2624C13.2569 22.6883 13.2333 23.1454 13.2327 23.1647C13.2232 23.6329 12.8456 24 12.3733 24H10.3401C9.86585 24 9.47946 23.6139 9.47946 23.1393C9.47958 22.6649 9.86592 22.2786 10.3401 22.2786H11.6481C11.724 21.9997 11.8279 21.735 11.9567 21.4928C12.5393 20.3974 13.6076 19.7943 14.9638 19.7943C17.2716 19.7943 18.0386 21.5132 18.2653 22.2786H23.6572C24.0948 21.8594 25.0882 20.572 25.0882 17.5443C25.0881 15.744 24.0986 13.9791 22.374 12.7025C21.517 12.0685 20.5533 11.6192 19.6533 11.4329C20.1038 12.2443 20.3414 13.0915 20.3414 13.8861C20.3413 15.8726 19.2003 17.4798 17.3642 18.0814C16.9137 18.2282 16.4271 17.9814 16.2796 17.5306C16.2081 17.3121 16.2258 17.0785 16.3297 16.8737C16.4337 16.6682 16.6113 16.5163 16.8297 16.4447C17.9687 16.0716 18.622 15.1389 18.622 13.8854C18.622 12.2282 16.7432 9.72266 13.9131 9.72266C10.8047 9.72272 9.14939 12.2482 9.14939 14.0716C9.14939 14.7161 9.15213 15.3829 9.15524 15.9707C9.16085 17.121 9.16633 18.3075 9.15264 19.474C9.12835 21.544 8.12527 23.0199 6.32842 23.6309C6.23817 23.6614 6.14506 23.6771 6.05108 23.6771C5.6828 23.677 5.35621 23.4422 5.23728 23.0931C5.16321 22.8758 5.17879 22.6417 5.28024 22.4355C5.38172 22.2289 5.55727 22.0754 5.77504 22.0013C6.87424 21.6276 7.41703 20.7939 7.43259 19.4531C7.44628 18.2993 7.44014 17.1199 7.43454 15.9792C7.43143 15.3882 7.42803 14.7186 7.42803 14.071C7.42803 12.6666 8.06001 11.1538 9.11814 10.0247C10.3418 8.71882 12.0446 8.00004 13.9124 8ZM11.54 15.056C12.1113 15.0561 12.5752 15.5208 12.5752 16.0924C12.575 16.6633 12.1112 17.1281 11.54 17.1283C10.9687 17.1283 10.5043 16.664 10.5042 16.0924C10.5042 15.5207 10.9686 15.056 11.54 15.056Z";

/** Scalloped seal outline: n bumps around (c, c). */
function scallop(c, rIn, rOut, n) {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const m = ((i - 0.5) / n) * Math.PI * 2 - Math.PI / 2;
    const p = [c + rIn * Math.cos(a), c + rIn * Math.sin(a)].map((v) => v.toFixed(2));
    const q = [c + rOut * Math.cos(m), c + rOut * Math.sin(m)].map((v) => v.toFixed(2));
    d += i === 0 ? `M${p[0]} ${p[1]}` : ` Q${q[0]} ${q[1]} ${p[0]} ${p[1]}`;
  }
  return d + 'Z';
}

let gid = 0;
const useGid = () => React.useMemo(() => 'g' + ++gid, []);

function RedGrad({ id }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#E32321" />
      <stop offset="1" stopColor="#980806" />
    </linearGradient>
  );
}

/** Official (red) / Mall (pale pink, red edge): designer files, drawn at height h (20 or 14). */
function ShopTag({ kind, h = 14 }) {
  if (!kind) return null;
  const w = kind === 'official' ? 56 : 40;
  return (
    <img className="shoptag" src={`../assets/icons/badge_${kind}.svg`} width={(w * h) / 20} height={h}
      alt={kind === 'official' ? 'Official ร้านค้าทางการ' : 'Mall ตัวแทนจำหน่าย'} />
  );
}

/** Blue scalloped seal with a white tick. */
function VerifiedSeal({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d={scallop(12, 10, 12.4, 10)} fill="#1D8FE1" />
      <path d="M7.5 12.3l3 3 6-6.3" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "ยืนยันตัวตน" capsule, 87 x 20 (designer file): only in the shop name row. */
function VerifiedPill() {
  return <img className="verified-pill" src="../assets/icons/badge_verified.svg" width="87" height="20" alt="ยืนยันตัวตน" />;
}

/** Red seal with the white Thaimart elephant: "ของแท้ต้องไทยมาร์ท". */
function ElephantSeal({ size = 24 }) {
  const id = useGid();
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label="ของแท้ต้องไทยมาร์ท">
      <defs><RedGrad id={id} /></defs>
      <circle cx="16" cy="16" r="16" fill={`url(#${id})`} />
      <path d={ELEPHANT} fill="#fff" />
    </svg>
  );
}

/** Scalloped red seal "x2": ปลอมคืนเงิน 2 เท่า. */
function X2Seal({ size = 24 }) {
  const id = useGid();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="ปลอมคืนเงิน 2 เท่า">
      <defs><RedGrad id={id} /></defs>
      <path d={scallop(12, 10.2, 12.4, 12)} fill={`url(#${id})`} />
      <text x="12" y="15.6" textAnchor="middle" fill="#fff" fontFamily="'Sukhumvit Tadmai', sans-serif" fontWeight="700" fontSize="10">x2</text>
    </svg>
  );
}

/** "ของแท้ต้องไทยมาร์ท" flag, 62 x 32 (designer file assets/icons/genuine_flag.svg). */
function GenuineFlag({ scale = 1 }) {
  return <img className="genuine-flag" src="../assets/icons/genuine_flag.svg" width={62 * scale} height={32 * scale} alt="ของแท้ต้องไทยมาร์ท" />;
}

/** One trust icon by key: tis / fda (blue), x2 (red seal), truck (red). */
function TrustIcon({ k, size = 16 }) {
  if (k === 'x2') return <X2Seal size={size} />;
  const src = { tis: 'tis_badge_small.svg', fda: 'fda_badge.svg', truck: 'delivery_truck.svg' }[k];
  const alt = { tis: 'มอก.', fda: 'อย.', truck: 'จัดส่งฟรี' }[k];
  return <img src={`../assets/icons/${src}`} width={size} height={size} alt={alt} />;
}

Object.assign(window, { ShopTag, VerifiedSeal, VerifiedPill, ElephantSeal, X2Seal, GenuineFlag, TrustIcon });
