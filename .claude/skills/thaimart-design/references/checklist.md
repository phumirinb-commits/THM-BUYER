# DO and DON'T, checklist, where things live

## The team's rules (กติกาของทีม, from the team link)

1. **แดง เฉพาะที่มีความหมาย**: หน้าขาวสว่าง แดงจึงชี้ได้ว่าอะไรสำคัญ
2. **ป้ายความมั่นใจ ใช้ชุดเดียวทั้งแอป**: ป้ายมาจากข้อมูลจริงเสมอ ห้ามคิดป้ายใหม่
3. **รูปเต็มขอบ ไม่บีบ ไม่ยืด**: รูปชนขอบการ์ด มุมบนโค้งตามการ์ด
4. **ขอบซ้ายขวา 16 ทุกหน้า**: หัวข้อ การ์ด ชิป และแถวเลื่อน เริ่มที่เส้นเดียวกัน
5. **ภาษาไทยง่าย สั้น เหมือนคุยกัน**: บรรทัดละเรื่องเดียว คำที่คนทั่วไปใช้
6. **ทุกคนใช้ได้**: แตะได้ 44 × 44 · ตัวอักษร 4.5 : 1 · ปุ่มไอคอนมีชื่อไทย
7. **ไลฟ์ และ Reels เป็นหน้ามืด**: ภาพเต็มจอ ไม่มีด้านบนแดงอ่อน · หน้าไลฟ์ปัจจุบันคือแบบอ้างอิง
8. **ชุดเดียว ห้ามปน**: ไอคอนชุดเดียวต่อความหมาย · ไม่มีช้างหรือมาสคอต

## DO / DON'T: the mistakes AIs make

These are about the mood and tone and the trust rules, not about copying the prototype's layout pixel for pixel.

| # | DON'T (what AIs tend to write) | DO |
| --- | --- | --- |
| 1 | `color: #E32321; padding: 15px; border-radius: 10px;` | `color: var(--c-red); padding: var(--s-16); border-radius: var(--r-10);` |
| 2 | Invented badges: "ขายดี!!", "Best seller", "Official seller", "ของแท้ 100%" stickers on the photo | Only the badge set, only from data, drawn by `TB` in trust.js |
| 3 | ร้านทางการ on a small seller's card; ยืนยันตัวตน on cards or rows | ร้านทางการ \| ของแท้ only for official shops, ของแท้ for the rest; ยืนยันตัวตน only on the shop profile header |
| 4 | มอก. on a lipstick, อย. on a cat fountain, both on everything | มอก. or อย. only when `products.*.cert` says so |
| 5 | A big red "จัดส่งฟรี" truck or a red seal on the product photo; a red strip under the price | White 24 icon circles on the photo's bottom left; tags in a 2 column grid on the product page |
| 6 | A solid red header on the product, cart or checkout page; the soft red top on every page | White header on every page except the 4 tab pages (Home, Discover, Order, Profile) |
| 7 | A big search box on Home; a glowing or running light around search fields; a mic button | A plain search button in the Home top bar before the bell; plain white fields; the search page field takes focus |
| 8 | "ยังไม่รองรับการค้นหาด้วยเสียง" or any note about voice search | Say nothing about voice |
| 9 | An em dash (U+2014) between two phrases, as in "ของแท้ [em dash] ส่งฟรี" | "ของแท้ · ส่งฟรี" or two lines |
| 10 | English or formal Thai, urgency, countdowns, "!!!" | Short everyday Thai, calm (see `copy.md`) |
| 11 | Material icons, Heroicons, Font Awesome or emoji mixed in | Phosphor (`data-icon`), the designer's icons (`data-di`, `TI`) only, one icon per meaning |
| 12 | An elephant mascot waving on Home or in empty states | No mascot; real products and real people. Stickers only in the Live chat |
| 13 | Side margins 12, 20 or 24; gaps of 10, 14 or 18 between blocks | 16 side margins everywhere; the 4 px scale (2, 6, 10 only inside controls) |
| 14 | 32 px icon buttons with no label | 44 x 44 tap target, Thai `aria-label` |
| 15 | Stretched pictures, white frames inside cards, `object-fit: contain` on products | `object-fit: cover`, edge to edge, top corners follow the card |
| 16 | Light grey reading text (`--c-faint`, #999) | Reading text at least `--c-muted` (5.7:1); `--c-faint` is for icons only |
| 17 | Thai text at line-height 1.2 (marks clip) | The size and line-height pairs of the type scale |
| 18 | Red outline buttons next to a red primary; red full lines of text | One red primary per view; secondary `.i-btn--line` |
| 19 | "-40%" with a hyphen, or "ลด 40%" before the price | `−40%` (U+2212) in `.i-tagdisc` after the struck price |
| 20 | 4 or 6 order statuses, a separate ให้คะแนน tab | 5 tiles: ทั้งหมด, ต้องชำระ, เตรียมส่ง, กำลังส่ง, สำเร็จ |
| 21 | Rearranging the Live screen with no UX reason, or losing its dark stage | The current Live layout is the reference: change it with a UX reason and say why |
| 22 | Linking Google Fonts or copying the Tadmai font files | `font-family: var(--font-ui)`; the project provides the font |
| 23 | Inventing shops, prices or ratings | `content/final-bible.json` |
| 24 | New one-off classes that restyle a kit component per page | Reuse the kit class; add a modifier in kit.css when it is truly new |
| 25 | Describing the direction as a combination of earlier concepts | Describe it as itself: trust first, lively everywhere |

## Review checklist (before you say "done")

The same list as the team link's เช็กลิสต์ (ใช้กับ AI). Thai first (as the team reads it), English after it. Every item is
tier 1 (concept, mood and tone: must pass) unless it is marked **ปรับได้**: those may differ from the prototype when UX
research or a usability test gives a reason (write the reason). Also check the old `--i-*` aliases: never in new CSS.

**สี ตัวอักษร ระยะ** (Colour, type, spacing)

- [ ] ใช้แต่โทเคน ไม่มีค่าสีหรือ px ที่เขียนเอง · Tokens only: no raw hex or px that a token covers
- [ ] แดงแค่ปุ่มหลัก ราคา ป้ายความมั่นใจ แท็บที่เลือก ไลฟ์ และตัวเลขบนไอคอน · Red only on the primary action, prices, trust icons, the active tab, Live and counts
- [ ] ด้านบนแดงอ่อนมีแค่ หน้าแรก Discover คำสั่งซื้อ โปรไฟล์ หน้าอื่นหัวขาว · Soft red top only on Home, Discover, Order, Profile; a white header everywhere else; Live and Reels dark
- [ ] ขนาดตัวอักษรคู่กับระยะบรรทัดในตาราง สระไม่ถูกตัด · Font sizes with their line heights from the type table; Thai marks never clip
- [ ] ขอบซ้ายขวา 16 ระยะเพิ่มทีละ 4 · 16 side margins on every page; spacing on the 4 px scale

**ป้ายและข้อมูล** (Badges and data)

- [ ] ป้ายทุกอันมาจากข้อมูลจริง ไม่มีป้ายที่คิดเอง · Every badge comes from the data; no invented badges
- [ ] ร้านทางการ | ของแท้ เฉพาะร้านทางการ ร้านอื่นมีแค่ ของแท้ · ร้านทางการ | ของแท้ only for official shops; ของแท้ alone for every other shop
- [ ] ยืนยันตัวตน อยู่หัวหน้าร้านเท่านั้น มอก. อย. ตามข้อมูลสินค้า · ยืนยันตัวตน only on the shop profile header; มอก. and อย. only from the product's cert
- [ ] ส่วนลดเขียน −NN% ต่อจากราคาเดิมที่ขีดฆ่า · Discount as −NN% (U+2212) right after the struck price
- [ ] ร้าน ราคา สินค้า คน มาจากไฟล์ข้อมูล ไม่แต่งเอง · Shops, prices, products and people from content/final-bible.json, never invented

**ข้อความ** (Copy)

- [ ] ไทยง่าย สั้น บรรทัดละเรื่อง · Short everyday Thai, one idea per line
- [ ] ไม่เร่ง ไม่ตะโกน ไม่มีนับถอยหลังขายของ · No urgency, no shouting, no sales countdowns
- [ ] ไม่มีขีดยาว ใช้เว้นวรรค · หรือขึ้นบรรทัดใหม่ · No em dash: a space, a middle dot or a new line
- [ ] ไม่พูดถึงการค้นด้วยเสียง ไม่มีปุ่มไมค์ · Nothing about voice search, no mic button

**รูป** (Pictures)

- [ ] รูปเต็มขอบ ไม่บีบ ไม่ยืด ไม่มีกรอบขาว · Pictures edge to edge with object-fit: cover; never stretched or boxed
- [ ] สินค้าจริง คนจริง ไม่มีมาสคอต · Real products and real people; no mascot

**ไอคอน** (Icons)

- [ ] ไอคอนชุดเดียว เส้นหนาเท่ากัน ไม่ใช้อีโมจิ · One icon family, the same stroke, no emoji as icons
- [ ] ปุ่มแตะได้ 44 × 44 ปุ่มไอคอนมีชื่อไทย · Tap targets at least 44 x 44; icon buttons carry a Thai aria-label

**หน้าตาและ Device** (Layout and devices)

- [ ] มือถือกว้าง 390 ไม่เลื่อนด้านข้าง Desktop เรียบร้อยที่ 1440 และ 1280 · Phone 390 wide with no sideways scroll; Desktop clean at 1440 and 1280
- [ ] หน้าตาต่างจากต้นแบบได้ บอกว่าเปลี่ยนอะไร เพราะผล UX ไหน · The layout may differ from the prototype: say what changed and the UX reason **(ปรับได้: may differ with a UX reason)**

## Where things live (repo)

| What | Path |
| --- | --- |
| Phone pages | `proto/final/*.html` |
| Tokens (the one source) | `proto/final/tokens.css` |
| Components | `proto/final/kit.css`, `kit.js` |
| Trust badges | `proto/final/trust.js` (`TB`, `TI`), `trust.css` |
| Font and base | `proto/shared/base.css` (`--font-ui`), Phosphor icons `proto/shared/icons.js` |
| Data | `content/final-bible.json` (`rules.badges`, products, shops, people) |
| Desktop | `proto/final-desk/` (from `link-tools/fin/desk/gen.mjs`) |
| iPhone Duo | `proto/final-duo/` (from `link-tools/fin/duo/gen.mjs`) |
| Design guide | `proto/final-guide/` (the guide on the team link) |
| Mood board | `proto/final-mood/` |
| Motion | `proto/final/motion`, `link-tools/fin/motion-inject.mjs` |
| Team link front door | `link-tools/fin/hub-final.html` |
| This AI kit | made by `link-tools/fin/ai/gen.mjs` from `link-tools/fin/ai/template/` |

Team link: https://thaimart-final.charunmeedate.workers.dev (ต้นแบบ, Mood board, แนวทางการออกแบบ, ใช้กับ AI). Figma: https://www.figma.com/design/PoSOBYzXkrIeF6slJxbcEY/?node-id=2081-11.

## How to check your work

~~~sh
node link-tools/fin/build-final.mjs        # build the team set
node link-tools/fin/assemble-final.mjs     # make the team site (also rebuilds this AI kit)
node link-tools/fin/site-check/run-final.mjs   # every page: no 404, no console error, phone 390 wide
node link-tools/fin/lint/run.mjs           # tokens, tap targets, Thai clipping, gutters: must show 0 P1/P2
~~~

Open the page on the team link and compare it side by side with the closest existing page before you finish.
