# Components: exact anatomy

Source of truth: `proto/final/kit.css` (prefix `i-`), `proto/final/trust.css` + `trust.js` (prefix `t-`, the badges),
page CSS (`d.css` orders, `fx-post.css` Discover, `a.css` search). Load order on every page: `../shared/base.css`,
`../shared/u390.css`, `tokens.css`, `kit.css`, page CSS, `gap.css`, `trust.css`. Sizes below are px at 390 wide.

## Product card `.i-pc` (the most copied component)

Static markup (what a page writes):

~~~html
<a class="i-pc" href="f3-product.html" data-t-pid="P1">
  <img class="i-pc__img" src="img/p-fountain.jpg" width="175" height="175" alt="(full product name)">
  <span class="i-pc__body i-blk">
    <span class="i-pc__name i-blk">Smart Pet Fountain แจ้งเตือนน้ำหมดผ่านแอป รับประกัน 1 ปี</span>
    <span class="i-prow"><span class="i-price i-price--md">฿2,499</span><span class="i-was i-was--md">฿4,190<span class="i-was__line"></span></span></span>
    <span class="i-meta"><span class="i-meta__star"><i data-di="star" data-size="12"></i><span>4.8</span></span><span class="i-meta__div"></span><span>ขายแล้ว 8.6K</span></span>
  </span>
</a>
~~~

`trust.js` then adds, from the product's data (`data-t-pid`):

~~~html
<!-- after the picture: white 24 circles, 8 from the left, bottom of the picture: cert (if any), refund, free shipping (if any) -->
<span class="t-ics" role="img" aria-label="รับรอง มอก., คืนเงิน 2 เท่า, จัดส่งฟรี"><span class="t-ic">(TI.tis)</span><span class="t-ic">(TI.refund)</span><span class="t-ic">(TI.ship)</span></span>
<!-- at the end of the price row -->
<span class="i-tagdisc">−40%</span>
<!-- before the rating row: official shop -->
<span class="t-pill t-pill--duo" aria-label="ร้านทางการ สินค้าของแท้">(TI.official)<span>ร้านทางการ</span><i class="t-pill__div"></i>(red shield-check fill)<span>ของแท้</span></span>
<!-- before the rating row: every other shop -->
<span class="t-pill t-pill--auth" aria-label="สินค้าของแท้">(red shield-check fill)<span>ของแท้</span></span>
~~~

Anatomy, top to bottom:

| Part | Spec |
| --- | --- |
| Card | 175 wide, white, radius 12, shadow `--sh-pcard`, 8 padding at the bottom; about 316 tall |
| Picture | 175 x 175, `object-fit: cover`, top corners radius 12, edge to edge, grey `--c-grey` while loading |
| Icon circles | `.t-ics`: white 24 circles with 16 icons, shadow `--sh-ic`, 4 apart, 8 from the left, sitting on the picture's bottom |
| Body | 8 padding, 8 gap between rows |
| Name | 14/20 ink, 2 lines max (clamped, fixed 41 tall) |
| Price row | price bold 20/28 `--c-red`, struck price 14/20 `--c-muted` with a drawn line (`.i-was__line`, not text-decoration), then `−NN%` in `.i-tagdisc` (18 tall, radius 4, `--c-tint` fill, `--c-red-t` bold 12/18). If the row is too long the struck price hides, the % stays |
| Pill | `.t-pill`, 24 tall, `--c-wash` grey, 12/18 `--c-ink-2`, 16 icons. **ร้านทางการ \| ของแท้** (1 x 12 divider `.t-pill__div`) only for official shops; **ของแท้** alone for every other shop |
| Meta | 12/18 `--c-muted`: star 12 + rating, a 1 x 12 divider, ขายแล้ว 8.6K |

Grid: `.i-grid2` = 175 + 8 + 175 columns, 16 side margins, 8 gaps, masonry (trust.js sets the row span) so cards of
different heights stay 8 apart. Small card `.i-rc` (124 wide) is for Home สินค้าแนะนำ and "สินค้าอื่นๆ ในร้านค้า".

Official shops (the only ones that may show ร้านทางการ): PetCare Official Store, PureCotton Official Store, Timeless Watch Official, Wear Me Happy, 4U2 Cosmetics, JBL_official, SRICHAND_official, Urban Trail.

## Trust badges: one set for the whole app

| Badge | Label | Shown when | Where |
| --- | --- | --- | --- |
| ร้านทางการ | ร้านทางการ | official shops only (`shops.*.official`) | card pill (joined to ของแท้), Home row, shop header, shop rows (cart, orders, product page shop row, posts), brand cards. Agents and other shops show nothing |
| ของแท้ | ของแท้ / การันตีของแท้ | every product | every card (alone, or joined to ร้านทางการ); the first tag on the product page |
| ยืนยันตัวตน | ยืนยันตัวตน | every shop | the shop profile header only |
| มอก. | มอก. / รับรอง มอก. | `products.*.cert` is มอก. | Home row (as a link), card icon circle, product page tag |
| อย. | อย. / รับรอง อย. | `products.*.cert` is อย. | Home row (as a link), card icon circle, product page tag |
| คืนเงิน 2 เท่า | คืนเงิน 2 เท่า / ปลอมคืนเงิน 2 เท่า | every product | Home row, card icon circle, product page tag |
| จัดส่งฟรี | จัดส่งฟรี | `products.*.freeShipping` is true | card icon circle, product page tag |

Sizes: `.t-pill` 24 tall (cards, rows) · `.t-tag` 32 tall with a white 24 circle (Home row, shop header) · `.t-ptag` 40
tall with a white 32 circle (product page) · `.t-ics` the white 24 circles on a card picture. Icons: the designer's own
(`window.TI` in trust.js: `official`, `tis`, `fda`, `refund`, `ship`, `edit`, `cart-add`, `search`, `camera`, `o-all`, `o-pay`, `o-pack`, `o-ship`, `o-done`); ของแท้ uses the red Phosphor `shield-check` fill; ยืนยันตัวตน the red Phosphor
`identification-card`. `TB.card(shopId)`, `TB.tag(kind)`, `TB.ptag(kind)` build them; prefer these builders over hand markup.

Cert data: มอก.: product.cert = มอก.: electrical products (petcare fountains, jbl). อย.: product.cert = อย.: cosmetics, skin care, cotton and soap, coffee.

Gone, never bring back: the solid red การันตีของแท้ chip, the seal stamp on pictures, the red strip under the price on the
product page, "Official seller" red tags, big red จัดส่งฟรี truck stickers on pictures.

### Home badge row `.i-promise`

Right under the stories: 4 `.t-tag` links, 9 apart, 16 side margins, scrolls sideways only:
ร้านทางการ · มอก. · อย. · คืนเงิน 2 เท่า.

~~~html
<div class="i-promise" aria-label="ความมั่นใจในการซื้อ"><a class="t-tag t-tag--official" href="#" data-t-tag="official" aria-label="ดูสินค้าร้านทางการ"><span>ร้านทางการ</span></a> (then tis, fda, refund)</div>
~~~

### Product page tags `.t-badges`

Under the rating row: การันตีของแท้ · รับรอง มอก. or รับรอง อย. · ปลอมคืนเงิน 2 เท่า · จัดส่งฟรี (มอก./อย. only from cert, จัดส่งฟรี only with free shipping). A 2 column grid, every
tag the cell's width, 8 gaps, 12 above and 16 below. No red strip, no seal. The delivery row starts with "ส่งจาก ..." and
does not repeat จัดส่งฟรี.

## Headers

| Header | Class | Where | Look |
| --- | --- | --- | --- |
| Root header | `.i-hd` inside `.i-page--tab` | the 4 tab pages only: Home, Discover, Order, Profile | on the soft red top (`.i--mood` or `.i--mood-grey` on `main.screen`); red logo left (30 mark + 96 x 17 word); buttons right: 44 tap, 40 light-glass circle (`--c-glass-light`), 22 ink icon |
| Pushed header | `.i-phd` | every other page | white, fixed, 110 tall incl. status bar; back 24 ink, centred title bold 18/26, actions right |
| Search header | `.i-shd` | search and results | white (pages override the legacy red), field 40 tall inside |
| Media | none / overlay | Live, Reels, story viewer | dark page (`--c-media`), dark 36 circles with white 20 icons, top shade `--g-shade-top` |

Home top bar, right side, in this order: **search button** (opens the search page), bell (with count), cart (with count).
The search, bell and cart are line icons with stroke 2, the same family. No search box on Home. The legacy `.i-phd--red`
and a red `.i-shd` exist in kit.css for old pages: never use them for new work.

## Buttons `.i-btn`

44 tall (`--tap`), radius 10, 16/24 bold. `.i-btn--primary` red (one per view), `.i-btn--line` white with a hairline
(secondary, same weight), `.i-btn--grey` quiet, `.i-btn--tint` red tint. Sizes `.i-btn--sm` 32 (radius 8, 14/20),
`.i-btn--md` 42, `.i-btn--lg` 48, `.i-btn--block` full width. Disabled: `--c-disabled` fill, `--c-tab` text. Bottom action bar 80 tall
(`--h-actionbar`): เพิ่มลงในตะกร้า (line) + ซื้อเลย (primary).

## Order status tiles (Order tab, `d1-orders.html`)

A white box (radius 16, `--sh-search`) with 5 tiles, each 70 wide: a 44 tile (radius 12, `--c-wash-2`, the designer's
icon in `--c-ink-2`) over a label. Selected: red tile with a white icon, label bold `--c-red-t`. Labels, in order:
ทั้งหมด · ต้องชำระ · เตรียมส่ง · กำลังส่ง · สำเร็จ. They filter the list in place (`#tab=all|topay|preparing|shipping|done`). ให้คะแนน is folded into สำเร็จ.

## Discover compose `.fx-wr` (top of Discover)

A white card 358 x 72, 16 margins: your 40 avatar, the placeholder "เขียนโพสต์..." (14/22 `--c-muted`), and a 40 round
button with the pencil icon in `--c-red` on `--c-red-wash`. It opens the compose page. The feed below mixes posts with a
pinned product card (`.i-ptag`) and posts without one.

## Live (the current layout is the reference)

Change it only with a UX reason; keep the dark stage, the trust rules and the calm motion.

Dark full-screen stage. Host pill top left with the avatar; the red Live badge (`.i-onair`, white dot, "ไลฟ์") and the
viewer count under it, both centred under the avatar. Chat lines (`.i-lchat`) anchored 24 above the product card. Round
dark 36 buttons with white 20 icons. Mascot stickers are allowed only inside the Live chat.

## Notes, escrow, toasts

Escrow note: `--c-tint` box, red `hand-coins` 22 icon, copy like "Thaimart ถือเงิน ฿2,690 ไว้จนคุณยืนยันรับ". Toast `--c-toast`, radius 12, rises
`--mv-rise`. Sheets: radius 20 top corners, `--sh-sheet`, scrim `--c-scrim`.

## Icons by meaning (one icon per meaning)

| Meaning | Icon | Size |
| --- | --- | --- |
| ย้อนกลับ (back) | `<i data-icon="caret-left" data-weight="bold">` | header 24 · on a photo 20 |
| ปิด (close page or sheet) | `<i data-icon="x" data-weight="bold">` | header 24 · sheet 24 · on a photo 20 |
| ล้างช่อง ลบชิป (clear) | `<i data-icon="x" data-weight="bold">` | 16 grey in a 44 tap |
| ค้นหา (search) | `<i data-di="search-line">` | header 24 · root header 22 · on a photo 20 (the Home top bar draws the same line icon, stroke 2) |
| ค้นด้วยรูป (photo search) | `<i data-icon="camera" data-weight="regular">` | 24 in a 44 tap · --c-ink-2 |
| ไปตะกร้า (cart) | `<i data-di="cart-line">` | header 24 · root header 22 · on a photo 20 |
| ใส่ตะกร้า (add to cart) | `<i data-di="cart-add">` | 20 white on a 40 red button |
| แจ้งเตือน (notifications) | `<i data-di="bell-line">` | root header 22 |
| แชร์ (share) | `<i data-di="send">` `<i data-di="send-w">` | header 24 · action row 22 · on a photo 20 |
| ส่งข้อความ (send) | `<i data-icon="paper-plane-tilt" data-weight="fill">` | 20 in a 44 circle · grey, red while typing |
| ตัวเลือกเพิ่ม (more) | `<i data-di="dots">` | 20 · ink, or white on a photo |
| ถูกใจ (like) | `<i data-di="heart">` `<i data-di="heart-red">` | action row 22 · header 24 · comments 16 |
| บันทึก (save) | `<i data-di="bookmark">` | 22 · Reels 26 white |
| ความคิดเห็น (comments) | `<i data-di="comment">` | 22 · Reels 26 white |
| แชทกับร้าน (chat with the shop) | `<i data-di="chat">` | header 24 · in a button 18 |
| คะแนน (rating) | `<i data-di="star">` | meta row 12 · shop 14 · rating input 32 |
| ไปต่อ ดูทั้งหมด (next) | `<i data-icon="caret-right" data-weight="bold">` | 16 · red in links, grey in rows |
| ถือเงินไว้ให้ (escrow) | `<i data-icon="hand-coins" data-weight="bold">` | 22 red in the tint note |
| ยืนยันตัวตน (verified shop) | `<i data-icon="identification-card" data-weight="regular">` | 16 red, shop profile header only |
| ของแท้ (genuine) | `<i data-icon="shield-check" data-weight="fill">` | 16 red in the card pill |
| แท็บบาร์ (tab bar) | `<i data-di="home-on">` `<i data-di="discover">` `<i data-di="live">` `<i data-di="order">` `<i data-di="profile">` | 32 grey · the open tab solid red |

Phosphor: `<i data-icon="name" data-weight="regular|bold|fill" data-size="16">` (proto/shared/icons.js). Designer app
icons: `<i data-di="name" data-size="24">` (proto/final/kit.js). Badge icons: trust.js `TI`. Colour comes from
`currentColor` on the `<i>` or its parent. The icon draws inside a 44 tap target.

## Capture-safe CSS (pages are captured into Figma)

No `text-shadow`, `mask-image`, `clip-path`, `conic-gradient` or gradient text. Rings are real borders. Two line clamps
carry a `max-height`. Struck prices use the drawn `.i-was__line`. Pictures carry `width` and `height`.
