# Audit rules

The same rules as the thaimart-design checklist (`references/checklist.md` of that skill; the team link's เช็กลิสต์), numbered for the audit report, plus the design system rules S1 to S4. Do not add rules of your own.

**Two tiers.** ต้องคงไว้ (keep: the concept, the mood and tone, consistency): a problem here is **ต้องแก้** and FAILs the audit. ปรับได้ (flex): the UI may differ from the prototype when UX research or a usability test gives a reason; it is listed under **ต่างจากต้นแบบ** and never FAILs; the MR carries the reason.

"script" = `scripts/audit.mjs` checks it (the AI still reads the findings); "look" = the AI checks it by reading and writes the result in the report.

| Rule | Tier | Group | Rule (Thai) | Rule (English) | Checked by |
| --- | --- | --- | --- | --- | --- |
| H1 | ต้องคงไว้ | สี ตัวอักษร ระยะ · Colour, type, spacing | ใช้แต่โทเคน ไม่มีค่าสีหรือ px ที่เขียนเอง | Tokens only: no raw hex or px that a token covers | script (tokens) |
| H2 | ต้องคงไว้ | สี ตัวอักษร ระยะ · Colour, type, spacing | แดงแค่ปุ่มหลัก ราคา ป้ายความมั่นใจ แท็บที่เลือก ไลฟ์ และตัวเลขบนไอคอน | Red only on the primary action, prices, trust icons, the active tab, Live and counts | look |
| H3 | ต้องคงไว้ | สี ตัวอักษร ระยะ · Colour, type, spacing | ด้านบนแดงอ่อนมีแค่ หน้าแรก Discover คำสั่งซื้อ โปรไฟล์ หน้าอื่นหัวขาว | Soft red top only on Home, Discover, Order, Profile; a white header everywhere else; Live and Reels dark | script (mood) |
| H4 | ต้องคงไว้ | สี ตัวอักษร ระยะ · Colour, type, spacing | ขนาดตัวอักษรคู่กับระยะบรรทัดในตาราง สระไม่ถูกตัด | Font sizes with their line heights from the type table; Thai marks never clip | look |
| H5 | ต้องคงไว้ | สี ตัวอักษร ระยะ · Colour, type, spacing | ขอบซ้ายขวา 16 ระยะเพิ่มทีละ 4 | 16 side margins on every page; spacing on the 4 px scale | look |
| H6 | ต้องคงไว้ | ป้ายและข้อมูล · Badges and data | ป้ายทุกอันมาจากข้อมูลจริง ไม่มีป้ายที่คิดเอง | Every badge comes from the data; no invented badges | script (invented) |
| H7 | ต้องคงไว้ | ป้ายและข้อมูล · Badges and data | ร้านทางการ \| ของแท้ เฉพาะร้านทางการ ร้านอื่นมีแค่ ของแท้ | ร้านทางการ \| ของแท้ only for official shops; ของแท้ alone for every other shop | look |
| H8 | ต้องคงไว้ | ป้ายและข้อมูล · Badges and data | ยืนยันตัวตน อยู่หัวหน้าร้านเท่านั้น มอก. อย. ตามข้อมูลสินค้า | ยืนยันตัวตน only on the shop profile header; มอก. and อย. only from the product's cert | look |
| H9 | ต้องคงไว้ | ป้ายและข้อมูล · Badges and data | ส่วนลดเขียน −NN% ต่อจากราคาเดิมที่ขีดฆ่า | Discount as −NN% (U+2212) right after the struck price | script (discount) |
| H10 | ต้องคงไว้ | ป้ายและข้อมูล · Badges and data | ร้าน ราคา สินค้า คน มาจากไฟล์ข้อมูล ไม่แต่งเอง | Shops, prices, products and people from content/final-bible.json, never invented | look |
| H11 | ต้องคงไว้ | ข้อความ · Copy | ไทยง่าย สั้น บรรทัดละเรื่อง | Short everyday Thai, one idea per line | look |
| H12 | ต้องคงไว้ | ข้อความ · Copy | ไม่เร่ง ไม่ตะโกน ไม่มีนับถอยหลังขายของ | No urgency, no shouting, no sales countdowns | script (urgency) |
| H13 | ต้องคงไว้ | ข้อความ · Copy | ไม่มีขีดยาว ใช้เว้นวรรค · หรือขึ้นบรรทัดใหม่ | No em dash: a space, a middle dot or a new line | script (emdash) |
| H14 | ต้องคงไว้ | ข้อความ · Copy | ไม่พูดถึงการค้นด้วยเสียง ไม่มีปุ่มไมค์ | Nothing about voice search, no mic button | script (voice) |
| H15 | ต้องคงไว้ | รูป · Pictures | รูปเต็มขอบ ไม่บีบ ไม่ยืด ไม่มีกรอบขาว | Pictures edge to edge with object-fit: cover; never stretched or boxed | script (pictures) |
| H16 | ต้องคงไว้ | รูป · Pictures | สินค้าจริง คนจริง ไม่มีมาสคอต | Real products and real people; no mascot | script (mascot) |
| H17 | ต้องคงไว้ | ไอคอน · Icons | ไอคอนชุดเดียว เส้นหนาเท่ากัน ไม่ใช้อีโมจิ | One icon family, the same stroke, no emoji as icons | script (icons) |
| H18 | ต้องคงไว้ | ไอคอน · Icons | ปุ่มแตะได้ 44 × 44 ปุ่มไอคอนมีชื่อไทย | Tap targets at least 44 x 44; icon buttons carry a Thai aria-label | script (aria) |
| H19 | ต้องคงไว้ | หน้าตาและ Device · Layout and devices | มือถือกว้าง 390 ไม่เลื่อนด้านข้าง Desktop เรียบร้อยที่ 1440 และ 1280 | Phone 390 wide with no sideways scroll; Desktop clean at 1440 and 1280 | look |
| H20 | ปรับได้ | หน้าตาและ Device · Layout and devices | หน้าตาต่างจากต้นแบบได้ บอกว่าเปลี่ยนอะไร เพราะผล UX ไหน | The layout may differ from the prototype: say what changed and the UX reason | look |
| S1 | ต้องคงไว้ | Design system | ใช้ชิ้นจาก design system ไม่ทำชิ้นซ้ำของเดิม | Uses design system components: no hand-made copy of a part the design system has | script (components) |
| S2 | ปรับได้ | Design system | ชิ้นที่ยังไม่มี อยู่ในรายการ component ใหม่ | Parts the design system does not have are listed as new-component requests | script (requests) |
| S3 | ต้องคงไว้ | Design system | ไม่มีชิ้นที่เอาออกแล้ว | No removed parts (they were cut on purpose) | script (banned) |
| S4 | ต้องคงไว้ | Design system | ไม่มีไฟล์ฟอนต์ หรือลิงก์ฟอนต์ | No font files or font links: var(--font-ui) only (Sukhumvit Tadmai is licensed for the project) | script (fonts) |

## How the script maps a hand-made part (S1)

| Hint | Looks for | Maps to | Props | Sure? |
| --- | --- | --- | --- | --- |
| btn-buy | hand-made buy or main action button | 1.1 Button | Variant=Primary | yes |
| btn-red | hand-made red button | 1.1 Button | Variant=Primary | yes |
| btn-any | hand-made button | 1.1 Button | decide | check |
| icon-btn | hand-made icon button | 1.2 Icon Button · Count › Icon Button | decide | check |
| price | hand-made price | 1.6 Price · Rating › Price | decide | yes |
| discount | hand-made discount | 1.6 Price · Rating › Price | Discount=true | yes |
| rating | hand-made rating | 1.6 Price · Rating › Rating | decide | yes |
| b-official | hand-made ร้านทางการ / Official badge | 1.5 Trust Badge | Kind=Official | yes |
| b-auth | hand-made ของแท้ badge | 1.5 Trust Badge | Kind=Authentic | yes |
| b-tis | hand-made มอก. badge | 1.5 Trust Badge | Kind=มอก. | yes |
| b-fda | hand-made อย. badge | 1.5 Trust Badge | Kind=อย. | yes |
| b-refund | hand-made refund badge | 1.5 Trust Badge | Kind=Refund 2x | yes |
| b-ship | hand-made free shipping badge | 1.5 Trust Badge | Kind=Free shipping | yes |
| b-verified | hand-made ยืนยันตัวตน badge | 1.5 Trust Badge | Kind=Verified | yes |
| search | hand-made search field | 1.8 Search · Input · Switch · Radio · Checkbox › Search | decide | yes |
| input | hand-made text field | 1.8 Search · Input · Switch · Radio · Checkbox › Input | decide | yes |
| switch | hand-made switch | 1.8 Search · Input · Switch · Radio · Checkbox › Switch | decide | yes |
| checkbox | hand-made checkbox | 1.8 Search · Input · Switch · Radio · Checkbox › Checkbox | decide | yes |
| radio | hand-made radio | 1.8 Search · Input · Switch · Radio · Checkbox › Radio | decide | yes |
| tabs | hand-made tabs | 1.7 Tabs | decide | check |
| tabbar | hand-made bottom navigation | 1.11 Tab Bar | decide | yes |
| sheet | hand-made bottom sheet or modal | 1.13 Bottom Sheet | decide | yes |
| toast | hand-made toast | 1.14 Toast | decide | yes |
| follow | hand-made follow button | 1.4 Follow Button | decide | yes |
| qty | hand-made quantity stepper | 2.3 Option Sheet · Stepper › Stepper | decide | yes |
| avatar | hand-made avatar | 3.1 Avatar · Story Ring › Avatar | decide | yes |
| pcard | hand-made product card | 1.12 Product Card | decide | yes |
| see-all | hand-made section header | 1.9 Section Header | decide | yes |
| header | hand-made top bar | 1.10 Top Bar | decide | check |
| chip | hand-made chip | 1.3 Chip | decide | check |
| escrow | hand-made escrow note | 2.7 Escrow Note | decide | yes |
| order | hand-made order status | 2.8 Order Status Tiles · Order Card | decide | check |
| summary | hand-made order summary or pay bar | 2.6 Summary · Pay Bar · Action Bar | decide | check |
| coupon | coupon (closest: the coupon row) | 2.5 Address · Coupon Row · Payment › Coupon Row | decide | check |
| comment | hand-made comment or compose box | 3.4 Compose Box · Comment · Comment Bar | decide | check |
| post | hand-made post card | 3.2 Post Card | decide | check |
| shoprow | hand-made shop row | 2.2 Shop Row | decide | check |

Invented badge words (H rule "every badge from data"): ขายดี, ลดแรง, แนะนำ, มาแรง, ส่งด่วน, ของใหม่, ใหม่, ยอดนิยม, Best seller, Hot, Flash, Mall, Top, Premium, Sale, New, Trending, LazMall, Preferred. The real set: ร้านทางการ, ของแท้ (การันตีของแท้ on the product page), ยืนยันตัวตน, มอก., อย., คืนเงิน 2 เท่า (ปลอมคืนเงิน 2 เท่า on the product page), จัดส่งฟรี.
