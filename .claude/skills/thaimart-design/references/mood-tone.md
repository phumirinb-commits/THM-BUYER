# Mood and tone: how Thaimart should feel

Read this before you design anything. Tokens, components and pages say what to use; this file says how it must feel,
so the work never drifts from the direction. Everything here is tier 1 (ต้องคงไว้): the concept and the mood and tone
the prototype was approved for. Layouts may change with a UX reason; this feel may not. Every value below comes from `proto/final/tokens.css` on 3 พ.ย. 2569.

## The metaphor

> **เหมือนเดินห้างที่ไว้ใจได้ แต่สนุกและมีชีวิตชีวา**
> Like walking through a mall you can trust, but fun and lively.

One picture only: a mall you can trust that is fun to walk through.

- **ห้างที่ไว้ใจได้ (a mall you can trust) = the core.** Bright, clean, orderly, honest prices, genuine goods, Thaimart
  holds the money until the buyer confirms. Trust decides colour, spacing and every badge.
- **สนุกและมีชีวิตชีวา (fun and lively) = what makes this mall worth a visit.** Live, creators, Reels, posts, shops that
  decorate their storefront, real people, something new every day. It lives in the content (photos, people, video),
  never in loud chrome.
- When the two pull apart, trust wins: a calm page with lively content, never a loud page.

## The feeling words

- **ไว้ใจได้**: genuine first, clear prices, badges only from real data
- **สว่าง สะอาด**: white, airy, red only where it means something
- **มีชีวิตชีวา**: Live, creators, Reels, something new every day
- **อบอุ่น เป็นกันเอง**: talks like a kind shop assistant, never pushy or loud

If a screen does not feel like all four, it is off. Typical drift: a red, busy, "sale" look (loud, and the trust is gone)
or a cold grey enterprise look (a mall with nobody in it).

## Colour: roles, not decoration

White and bright first; red is kept for meaning. Use the variable, never the hex.

**Surfaces and lines** (พื้นและเส้น)

| Variable | Value | Role |
| --- | --- | --- |
| `--c-white` | `#FFFFFF` | surfaces; text and icons on red and on media |
| `--c-grey` | `#F6F6F7` | page grey, quiet fills and chips, the 8px band between blocks |
| `--c-wash` | `rgba(0, 0, 0, .04)` | ร้านทางการ / ของแท้ / ยืนยันตัวตน pills and the Home badge row |
| `--c-line` | `#ECECEE` | hairlines, dividers, card rings (1px) |
| `--c-control` | `#DBDBDB` | control borders: inputs, line buttons, filter chips, stepper |

**Text and icons** (ตัวอักษรและไอคอน)

| Variable | Value | Role |
| --- | --- | --- |
| `--c-ink` | `#171717` | titles, body text, icons in header bars (17.9:1 on white, 16.6:1 on grey, 16.3:1 on tint) |
| `--c-ink-2` | `#3A3A3C` | secondary icon (search page camera), text in quiet chips (11.3:1 on white, 10.5:1 on grey) |
| `--c-muted` | `#66666B` | meta text, grey icons, struck price, tabs off (5.7:1 on white, 5.3:1 on grey, 5.1:1 on img) |
| `--c-faint` | `#A1A1A6` | icons only: disabled stepper, chevrons, seen story ring. Never text (2.6:1 on white) |

**Red, only for meaning** (แดง ใช้เมื่อมีความหมาย)

| Variable | Value | Role |
| --- | --- | --- |
| `--c-red` | `#E32321` | actions, prices, active tab, Live, trust fills (4.6:1 on white) |
| `--c-red-t` | `#D11F1D` | red text on the tint or on grey; pressed red (4.9:1 on tint, 5.0:1 on grey, 5.4:1 on white) |
| `--c-tint` | `#FFF1F1` | red tint: selected chip, notes, pressed follow, escrow note |
| `--c-red-300` | `#F39E9D` | red tint 300: first stop of the mood top |
| `--c-red-100` | `#FDF2F2` | red tint 100: middle stop of the mood top |

**Status and media** (สถานะและสื่อ)

| Variable | Value | Role |
| --- | --- | --- |
| `--c-ok` | `#1B7A3E` | success text and icon (order done, bought) (4.8:1 on ok-tint, 5.4:1 on white) |
| `--c-warn` | `#7A5300` | warning text on --c-warn-tint (6.4:1 on warn-tint) |
| `--c-media` | `#111111` | dark media pages (Live, Reels, story viewer) |
| `--c-glass` | `rgba(23, 23, 23, .48)` | round buttons and pills on photos and video (white icon) |

**Red only where it means something:** the one primary button of a view, prices, trust badge icons, the active tab,
Live, and counts on icons. Never a red header, red secondary buttons, red body text, red page backgrounds or big red
stickers on photos. One red primary action per view; the secondary action is `.i-btn--line`.

**The soft red top** (`--fx-mood`, or `--fx-mood-grey` on Home and Order) belongs to the 4 tab pages only: Home,
Discover, Order (คำสั่งซื้อ), Profile. It fades from `--c-red-300` to `--c-red-100` at 83 px to white at 114 px; text on
it stays ink. Every other page has a white header and a white or grey (`--c-grey`) page. Live and Reels are dark media
pages (`--c-media`) where the video is the hero.

## Type

Sukhumvit Tadmai 400 and 700 through `var(--font-ui)` (provided by the project, licensed for the project only: never
copy, link or embed the font files). Use a size only with one of its line heights; Thai marks above and below need at
least 1.4 x the size or they clip. Bold for titles, prices and names; regular for everything you read.

| Size / line height | Variables | Use |
| --- | --- | --- |
| 12/18 | `var(--fs-12)` / `var(--lh-18)` | caption, meta, chips, tab labels |
| 13/20 | `var(--fs-13)` / `var(--lh-20)` | badge tags on Live and notes |
| 14/20 | `var(--fs-14)` / `var(--lh-20)` | small UI text, one line: list rows, links, md buttons |
| 14/22 | `var(--fs-14)` / `var(--lh-22)` | small reading text, may wrap: Home cards, follow, ดูทั้งหมด, profile tabs |
| 16/24 | `var(--fs-16)` / `var(--lh-24)` | body, field text, buttons |
| 18/26 | `var(--fs-18)` / `var(--lh-26)` | titles in bars and sheets, one line |
| 18/28 | `var(--fs-18)` / `var(--lh-28)` | page section titles (Home แบรนด์ดี, หมวดหมู่) |
| 20/28 | `var(--fs-20)` / `var(--lh-28)` | card price, compact titles |
| 20/30 | `var(--fs-20)` / `var(--lh-30)` | profile name, titles that may wrap |
| 24/34 | `var(--fs-24)` / `var(--lh-34)` | big price, result titles |
| 24/36 | `var(--fs-24)` / `var(--lh-36)` | hero titles that may wrap |
| 28/40 | `var(--fs-28)` / `var(--lh-40)` | hero numbers |

## Spacing, radius, shadow

Airy, not empty: 16 side margins on every page (`--gutter`), 8 grey bands (`--c-grey`) between white blocks, cards 8 apart.

- Space (4 px scale; 2, 6 and 10 only inside controls): `--s-2` `--s-4` `--s-6` `--s-8` `--s-10` `--s-12` `--s-16` `--s-20` `--s-24` `--s-28` `--s-32` `--s-40` `--s-48` `--s-56` `--s-64`
- Radius: `--r-4` 4px (discount tag, small thumbs) · `--r-6` 6px (Live tag, small tags, item option) · `--r-8` 8px (small controls: sm button, stepper, thumbs) · `--r-10` 10px (buttons, inputs, icon tiles) · `--r-12` 12px (cards, notes, rows, toast) · `--r-16` 16px (feature cards, banners, profile boxes) · `--r-20` 20px (sheets (top corners)) · `--r-24` 24px (bottom corners of covers and banners (shop, profile), big cards) · `--r-pill` 999px (pills: chips, follow, count, avatars)
- Shadows are always soft, never coloured: `--sh-pcard` (the product card), `--sh-card` (product cards, category chips (SPEC card shadow)), `--sh-soft` (Home feature cards: store card, profile post cards), `--sh-search` (white boxes on the mood top: search fields, the order status box), `--sh-sheet` (bottom sheet)

## Photography

- **Real products and real people are the heroes.** Product photos, shop owners, creators, Live hosts. No mascot, no
  elephant character, no cartoon (the only exception: stickers inside the Live chat). The logo mark is not a mascot.
- Natural light, real homes and real shops, warm and honest. No heavy filters, no neon glow, no stock-looking cut-outs
  on gradients, no 3D renders.
- Edge to edge: `object-fit: cover`, top corners follow the card radius (12), a grey well while loading. Never
  stretched, never squashed, never boxed inside a white frame, never `object-fit: contain` for products.
- On photos only small white things: the 24 white icon circles (`.t-ics`, shadow `--sh-ic`), glass buttons
  (`--c-glass`) and the top shade (`--g-shade-top`) so the status bar reads. No text stickers on the photo.

## Iconography

One family per meaning, the same stroke: Phosphor through `proto/shared/icons.js` (`<i data-icon="name">`), the
designer's app icons (`<i data-di="name">`, kit.js) and the designer's badge icons (trust.js `TI`). Header icons are ink
(`--c-ink`), 24 in a 44 tap target; the tab bar is 32, grey, the open tab solid red. No emoji as icons, no Material,
Heroicons or Font Awesome, no filled and outline icons of the same meaning side by side.

## Motion

Calm, short, iPhone-like. Motion helps the user follow what happened; it never decorates. Only the prototype's motion
layer (`proto/final/motion`, on the team link) moves things; Figma frames are always still.

| Variable | Value | Use |
| --- | --- | --- |
| `--m-press` | `140ms` | press feedback (scale .96) |
| `--m-fast` | `200ms` | small state changes: dots, toggles |
| `--m-base` | `250ms` | focus glow, shadow change |
| `--m-push` | `380ms` | page push / pop: the new page slides over from the right, the old one shifts --mv-under and dims |
| `--m-sheet` | `380ms` | sheet up (with --ease-page); down is --m-base |
| `--m-pop` | `420ms` | like / follow / save pop, vertical swipe |
| `--m-fade` | `160ms` | the short cross-fade: end of an edge swipe, and every move under reduced motion |
| `--ease-page` | `cubic-bezier(.32, .72, 0, 1)` | page push / pop, sheet up, edge swipe: the iOS curve, calmer than --ease-out (less of the move in the first frames) |

- Move only position and opacity; never stretch a box or push the page around.
- A small bounce only where it should feel fun: like, add to cart, success. Everything else is still and quick.
- No running light, glow or shimmer on search fields (the tap focus ring stays). The search page field takes focus so
  the keyboard comes up.
- Reduced motion: everything becomes a short fade.
- Live keeps its layout; motion there only adds the chat and the floating hearts.

## Voice: plain everyday Thai

Talk like a kind shop assistant to a neighbour: short, calm, friendly, never salesy. One idea per line. Thai first;
English only for names (PetCare Official Store, Reels, Live, PromptPay). No urgency, no countdowns to push a sale, no
"!!!", no ALL CAPS. Never the em dash: use a space, a middle dot ` · ` or a new line. Never mention voice search.

The left column is real copy from the prototype; the right column is what AIs tend to write instead.

| Real copy (do) | What AIs write (don't) | Why |
| --- | --- | --- |
| Thaimart ถือเงิน ฿2,199 ไว้จนคุณยืนยันรับ | ระบบ Escrow คุ้มครองผู้ซื้อตามเงื่อนไขที่บริษัทกำหนด | say what the buyer gets |
| ชำระภายใน 10:12 น. วันนี้ | รีบเลย! เหลือเวลาอีก 00:04:59 ราคานี้จะไม่มีอีกแล้ว | state the time, never rush |
| ปลอมคืนเงิน 2 เท่า | Authentic Guarantee รับประกันของแท้ 100% คืนเงินเต็มจำนวน!!! | short, Thai, only what is true |
| ค้นหาสินค้าหรือร้านค้า | Search products... | Thai first |
| ยืนยันรับสินค้า | คลิกที่นี่เพื่อดำเนินการยืนยันการรับสินค้า | buttons are short verbs |
| แชทกับร้าน | ติดต่อฝ่ายบริการลูกค้าของร้านค้า | everyday words |
| ยังไม่มีโพสต์ที่บันทึก | ไม่พบข้อมูล (Error 404) | empty states talk like a person |

## DO and DON'T at a glance

The same pairs as the team link's gallery (ใช้กับ AI · ถูกและผิด), where each one is drawn from the real prototype.

| # | Where | DO | DON'T |
| --- | --- | --- | --- |
| 1 | ด้านบนของหน้า | The soft red top (`--fx-mood`, `--fx-mood-grey`) with ink text, only on Home, Discover, Order and Profile; every other page has a white header | A solid red header bar with white text |
| 2 | สีและระยะ | Only `var(--name)` names from tokens.css: `var(--c-red)`, `var(--s-16)`, `var(--r-12)`, a size with its line height | Raw hex and px (`#F44336`, `15px`, `line-height: 1.2`) |
| 3 | ป้ายบนการ์ด | The pill **ร้านทางการ \| ของแท้** for official shops only, icon circles from data | Invented badges: "Official Store", "ขายดี!!", "ของแท้ 100%", red stickers on the photo |
| 4 | ป้ายของร้านทั่วไป | **ของแท้** alone on every shop that is not official | **ร้านทางการ \| ของแท้** on a small shop (only `shops.*.official` may show ร้านทางการ) |
| 5 | ส่วนลด | `−40%` (U+2212) in `.i-tagdisc` right after the struck price | "ลด 40%!!" in a red box before the price, or "-40%" with a hyphen |
| 6 | ค้นหาบนหน้าแรก | A plain search button in the Home top bar before the bell; it opens the search page with the keyboard up | A big search box on Home |
| 7 | ช่องค้นหา | A plain white field; only the tap focus ring | A running light, glow or shimmer round a search field |
| 8 | ปุ่มในช่องค้นหา | Type, or search by photo with the camera | A mic button in the field, or any line about voice search |
| 9 | ภาพ | Real products and real people as the heroes | An elephant mascot or a cartoon character in the UI (stickers in the Live chat are the only exception) |
| 10 | ไอคอน | One icon family, the same stroke: Phosphor (`data-icon`) and the designer's icons (`data-di`) | Emoji or mixed icon sets |
| 11 | เครื่องหมายในข้อความ | A space, a middle dot ` · ` or a new line between two phrases | The em dash (U+2014) between two phrases |
| 12 | ข้อความ | Short everyday Thai that says what the buyer gets: "Thaimart ถือเงิน ฿2,199 ไว้จนคุณยืนยันรับ" | Urgency, hype and system words: "ระบบ Escrow คุ้มครองผู้ซื้อ 100%!! รีบชำระก่อนหมดเวลา" |
| 13 | พื้นที่แตะ | Every tap target at least 44 x 44 (`--tap`), icon buttons with a Thai aria-label | 28 px buttons packed together |
| 14 | รูปสินค้า | `object-fit: cover`, edge to edge, top corners follow the card radius | A white frame round the picture, `object-fit: contain`, or a stretched picture |

## Reference screens

Look at these before designing; match their density, spacing and colour use (all are real screens of the prototype):

- `references/examples/home.jpg`: Home: soft red top, top bar search button, stories, the 4 trust badges, banner, แบรนด์ดี, tab bar
- `references/examples/results.jpg`: Search results: filter chips, the official shop row, product cards with icon circles, price, −NN% and the pill
- `references/examples/product.jpg`: Product page: white header, edge-to-edge gallery, red price, the 4 tags in a 2 column grid, the action bar
- `references/examples/cart.jpg`: Cart: shop groups with the ร้านทางการ pill, items, the coupon hint, the pay bar
- `references/examples/checkout.jpg`: Checkout: the price summary, the total and the escrow note before paying
- `references/examples/orders.jpg`: Order tab: soft red top, the 5 status tiles, order cards
- `references/examples/discover.jpg`: Discover: compose box, posts with and without a pinned product
- `references/examples/live.jpg`: Live (dark; the current layout is the reference): host, viewer count under the Live badge, chat, product card
- `references/examples/shop.jpg`: Shop profile: cover, logo, ร้านทางการ and ยืนยันตัวตน (the only place it shows), banner, products
- `references/examples/profile.jpg`: Profile: soft red top, the user, my shop row, posts grid
- `references/examples/desk-home.jpg`: Desktop Home at 1440: one-row top bar with the search button, the same kit grown for 1440
