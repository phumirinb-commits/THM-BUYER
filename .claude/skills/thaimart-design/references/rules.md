# Full rules (แนวทางที่เลือก)

The complete rules behind SKILL.md. Open this file when a task needs more than the core in SKILL.md.

The one design direction of the Thaimart social commerce app, chosen by the CEO. Everything here is generated from the
team's own sources (tokens.css, kit.css, trust.js, the guide, the data file) on 3 พ.ย. 2569. The team link is the reference:
https://thaimart-final.charunmeedate.workers.dev. When this file and the team link disagree, the team link wins; tell the user.

## 1. The direction (read this first)

> **เหมือนเดินห้างที่ไว้ใจได้ แต่สนุกและมีชีวิตชีวา**
> Like walking through a mall you can trust, but fun and lively.

One picture: a mall. Trust is the core, liveliness is everywhere. Every screen must be both, trust first.

| Part | What it means on screen |
| --- | --- |
| ไว้ใจได้ (trust) | ของแท้มาก่อน (genuine first) · ป้ายความมั่นใจ (trust badges, only from real data) · ราคาชัดก่อนจ่าย (clear total before paying) · Thaimart ถือเงินไว้จนได้ของ (Thaimart holds the money until the buyer confirms) · ถามแล้วได้คำตอบ (chat with the shop) |
| มีชีวิตชีวา (lively) | ไลฟ์ (Live) · ครีเอเตอร์ · Reels · posts on Discover · shops decorate their own storefront (Shop Builder) · something new every day |
| หน้าแรก (Home) | stories and lives row · the 4 trust badges · banner · แบรนด์ดี (good brands) · หมวดหมู่ starting at ทั้งหมด · product grid |

The look: white and bright, a soft red top only on the 4 tab pages, red only where it means something, real product
photos and real people as the heroes, plain everyday Thai. Describe the direction by what it is, never as a mix of
earlier concepts or numbered ideas.

## 1b. What must stay, what may change (two tiers)

The prototype was approved for its **concept and its mood and tone**, not as a UI to copy 100%. People may change the UI
when UX research or a usability test gives a reason, as long as the work stays inside the same concept and mood and tone.
The prototype screens are references, not specs.

**ต้องคงไว้ (must keep: concept + mood and tone).** Never trade these for a layout idea.
- The main line: เหมือนเดินห้างที่ไว้ใจได้ แต่สนุกและมีชีวิตชีวา. Trust first, lively everywhere.
- Trust: badges only from real data, ร้านทางการ only for official shops, the price clear before paying, the escrow promise
  (Thaimart holds the money until the buyer confirms).
- Look and feel: tokens only (colours, type, spacing, radius, shadows); red only where it means something; white and
  bright, the soft red top only on the main tab pages; real photos and real people; one icon family; calm motion.
- Thai voice: short everyday Thai, friendly, no hype, no em dash, never say voice search is missing.
- Accessibility basics: 44 x 44 taps, readable contrast, Thai labels on icon buttons.

**ปรับได้ (may change, with a reason from UX research or a usability test).** Layouts; the order and grouping of
sections; flows and steps; which components a screen uses; new components; copy wording (within the voice); the layout of
any page, Live included. Reuse design system components where one fits (consistency); a different arrangement is fine.

**When you change the UI from the prototype,** say in one line what changed and why (the UX reason), and keep tier 1.
Example: "ย้ายปุ่มติดตามขึ้นหัวหน้า เพราะ usability test: 4 ใน 5 คนหาไม่เจอ".

## Mood and tone (keep it every time)

ไว้ใจได้ · สว่าง สะอาด · มีชีวิตชีวา · อบอุ่น เป็นกันเอง. Trust sets the chrome: white, airy, ink text,
red only for meaning. The liveliness lives in the content: real photos, real people, Live, Reels. Copy is
short everyday Thai, calm and friendly. Motion is short and calm. When unsure, choose the calmer option.
Everything about feel, with tokens and DO / DON'T pairs: `references/mood-tone.md`.

**Reference screens** (open one or two only when designing a whole new screen): match their density, spacing and
colour use (they show the mood and tone; their layouts are references, not specs):

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

## 2. The rules AIs break most

Tier 1 unless a rule says **current design**: a current design is the reference, change it only with a UX reason.


1. **Tokens only.** Every colour, size, space, radius, shadow and duration is a CSS variable from `proto/final/tokens.css`
   (`var(--c-red)`, `var(--s-16)`). Never a raw hex or px that a token covers. Full list: `references/tokens.md`, `tokens.json`.
2. **Red only where it means something:** the one primary button, prices, trust badge icons, the active tab, Live, counts
   on icons. Never red headers, red secondary buttons, red body text or big red stickers on photos.
3. **Soft red top (`--fx-mood`) only on the 4 tab pages:** Home, Discover, Order (คำสั่งซื้อ), Profile. Every other page
   has a white header and a white or grey page. Live and Reels are dark media pages.
4. **Trust badges come from data, never invented.** The set: ร้านทางการ, ของแท้ (การันตีของแท้ on the product page), ยืนยันตัวตน, มอก., อย., คืนเงิน 2 เท่า (ปลอมคืนเงิน 2 เท่า on the product page), จัดส่งฟรี.
   - Product card pill: **ร้านทางการ | ของแท้** only for official shops, **ของแท้** alone for every other shop.
   - ยืนยันตัวตน appears only on the shop profile header.
   - มอก. and อย. only when the product's cert data says so (`products.*.cert` in `content/final-bible.json`).
   - Home badge row (under the stories): ร้านทางการ, มอก., อย., คืนเงิน 2 เท่า.
   - Product page tags: การันตีของแท้ · รับรอง มอก. or รับรอง อย. · ปลอมคืนเงิน 2 เท่า · จัดส่งฟรี, in a 2 column grid.
5. **Home search (current design):** a plain search button in the top bar, before the bell, no search box on Home.
   Tier 1: no running light, glow or shimmer on any search field. The search page field takes focus on open so the keyboard comes up.
6. **Discount:** `−NN%` (minus sign U+2212) in `.i-tagdisc` right after the struck price. Never "-40%", "ลด 40%" or a red sticker.
7. **Order status (current design):** 5 tiles with the designer's icons: ทั้งหมด · ต้องชำระ · เตรียมส่ง · กำลังส่ง · สำเร็จ. ให้คะแนน lives inside สำเร็จ.
8. **Layout:** phone 390 wide, 16 px side margins on every page, spacing on the 4 px scale, every tap target at least 44 x 44,
   icon buttons carry a Thai `aria-label`.
9. **One icon family per meaning:** Phosphor through `proto/shared/icons.js` (`<i data-icon="name">`), the designer's app
   icons (`<i data-di="name">`, kit.js) and the designer's badge icons (trust.js `TI`). No other icon set, no emoji as icons.
10. **No mascot.** No elephant character or cartoon in the UI (the only exception: stickers in the Live chat). The
    Thaimart logo mark is not a mascot: use the logo files as they are.
11. **Copy:** short everyday Thai, one idea per line, no urgency or shouting, never the em dash. Use a space, a middle dot
    `·` or a new line. Details: `references/copy.md`.
12. **Never write that voice search is missing.** Voice input is the keyboard's own mic; we simply do not mention it.
    Do not add a mic button to search fields.
13. **Live (current design):** the current Live layout is the reference; change it only with a UX reason. Today the
    viewer count sits under the Live badge, both centred under the host avatar; the chat sits 24 above the product card.
14. **Font:** Sukhumvit Tadmai, provided by the project and licensed for this project only. Use `var(--font-ui)`; never
    copy, link or embed font files or font URLs anywhere else, and never swap in a web font from a CDN.
15. **Pictures:** `object-fit: cover`, edge to edge, top corners follow the card radius. Never stretched, never boxed with a white frame.

## 3. Tokens at a glance

| Variable | Value | Role |
| --- | --- | --- |
| `--c-white` | `#FFFFFF` | surfaces; text and icons on red and on media |
| `--c-ink` | `#171717` | titles, body text, icons in header bars (17.9:1 on white, 16.6:1 on grey, 16.3:1 on tint) |
| `--c-ink-2` | `#3A3A3C` | secondary icon (search page camera), text in quiet chips (11.3:1 on white, 10.5:1 on grey) |
| `--c-muted` | `#66666B` | meta text, grey icons, struck price, tabs off (5.7:1 on white, 5.3:1 on grey, 5.1:1 on img) |
| `--c-line` | `#ECECEE` | hairlines, dividers, card rings (1px) |
| `--c-control` | `#DBDBDB` | control borders: inputs, line buttons, filter chips, stepper |
| `--c-grey` | `#F6F6F7` | page grey, quiet fills and chips, the 8px band between blocks |
| `--c-red` | `#E32321` | actions, prices, active tab, Live, trust fills (4.6:1 on white) |
| `--c-red-t` | `#D11F1D` | red text on the tint or on grey; pressed red (4.9:1 on tint, 5.0:1 on grey, 5.4:1 on white) |
| `--c-tint` | `var(--c-red-50)` = `#FFF1F1` | red tint: selected chip, notes, pressed follow, escrow note |
| `--c-wash` | `rgba(0, 0, 0, .04)` | ร้านทางการ / ของแท้ / ยืนยันตัวตน pills and the Home badge row |
| `--c-wash-2` | `#F5F5F5` | product page badge tags, order status tiles |
| `--c-media` | `#111111` | dark media pages (Live, Reels, story viewer) |
| `--fx-mood` | `linear-gradient(180deg, var(--c-red-300) 0, var(--c-red-100) 83px, var(--c-white) 114px)` = `linear-gradient(180deg, #F39E9D 0, #FDF2F2 83px, #FFFFFF 114px)` | the soft red top: Discover, Profile (.i--mood) |
| `--sh-pcard` | `0 1px 4px 1px rgba(0, 0, 0, .1)` | the product card |
| `--sh-card` | `0 2px 10px rgba(0, 0, 0, .06)` | product cards, category chips (SPEC card shadow) |
| `--sh-search` | `0 6px 18px rgba(0, 0, 0, .08)` | white boxes on the mood top: search fields, the order status box |
| `--sh-sheet` | `0 -8px 32px rgba(0, 0, 0, .14)` | bottom sheet |
| `--gutter` | `16px` | page gutter (= --s-16) |
| `--tap` | `44px` | minimum tap target |

Space (4 px base; 2, 6 and 10 only inside controls): `--s-2` `--s-4` `--s-6` `--s-8` `--s-10` `--s-12` `--s-16` `--s-20` `--s-24` `--s-28` `--s-32` `--s-40` `--s-48` `--s-56` `--s-64`

Radius: `--r-4` 4px · `--r-6` 6px · `--r-8` 8px · `--r-10` 10px · `--r-12` 12px · `--r-16` 16px · `--r-20` 20px · `--r-24` 24px · `--r-pill` 999px

Type: Sukhumvit Tadmai 400 and 700 through `var(--font-ui)` (`"Sukhumvit Tadmai", "Noto Sans Thai Looped", Thonburi, sans-serif`). Use a size with one of its
line heights (Thai marks need at least 1.4 x):

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

Everything else (all colours with their contrast notes, shadows, icon sizes, z layers, motion, component tokens):
`references/tokens.md`. Machine-readable: `tokens.json`.

## 4. Components and pages

- Product card `.i-pc`, trust badges (`.t-pill`, `.t-tag`, `.t-ptag`, `.t-ics`), headers (`.i-hd`, `.i-phd`, `.i-shd`),
  buttons, order tiles, Discover compose, Live: exact anatomy and markup in `references/components.md`.
- Page structures for phone, Desktop 1440 and iPhone Duo, the page list and where each page lives: `references/pages.md`.
- Thai copy rules with examples: `references/copy.md`.
- DO and DON'T with the mistakes AIs make, a review checklist, where things live and how to check: `references/checklist.md`.
- How it must feel (colour roles, type, photos, icons, motion, voice) with DO / DON'T pairs: `references/mood-tone.md`.
- Ready prompts for common jobs (for the person working with you): `references/prompts.md`.

## 5. How to work

1. Find the closest existing page or component in `proto/final/` (or open it on the team link) and reuse its classes and
   markup. Extend the kit; do not restyle it per page. The layout may differ from the prototype with a UX reason: say
   what changed and why in one line.
2. Take data from `content/final-bible.json` (products, shops, prices, certs, people). Do not invent shops, prices or badges.
3. Write CSS with tokens only. If a value is missing from the scale, ask; a one-off component size goes into the lane
   block of section 11 in `tokens.css` with a role comment.
4. Compare with `references/examples/` and check against `references/checklist.md`, then run the checks there (lint must
   show 0 P1/P2).
5. If something is not covered here, build it from tier 1 (tokens, voice, trust rules), say it is new, and list it as a
   new component for the design system team (the skill thaimart-storybook prepares that request).

Team link: https://thaimart-final.charunmeedate.workers.dev · Figma: https://www.figma.com/design/PoSOBYzXkrIeF6slJxbcEY/?node-id=2081-11 · Repo paths: `references/checklist.md`.

In Figma (Figma Make / Figma Agent, the AI inside Figma design files): the team's file is https://www.figma.com/design/PoSOBYzXkrIeF6slJxbcEY/. Take the
components from its page "Design System · เริ่มที่นี่" and the mood and tone from the page "แนวทางที่เลือก-Final"; the same
two tiers apply (concept and mood and tone stay, the UI may change with a UX reason).
