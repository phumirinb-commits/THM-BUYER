# Component registry (design system: แนวทางที่เลือก)

Version 2026-11-03.2790b09. pending: the team's design system: until the team ships its Figma design system, React and Flutter packages and the central Storybook, the design system is the prototype's (proto/final tokens.css, kit.css, trust.*) and these 34 components.

One source: the design system sheets (link-tools/fin/ds, Figma page "Design System · เริ่มที่นี่"), counted on 193 real screens. Build in this order: step 0, then 1, 2, 3; a later step is made from the earlier ones. Machine-readable: `registry.json` (same data, plus the mapping hints the audit uses).

**React / Flutter:** every component says "pending: the team's design system" until the team fills in its package, component and prop names. Until then map to the prototype kit (the classes below) and use the provisional names (`suggest`) marked `TODO(ds)`.

Props are the Figma component properties; the **bold** value is the default.

## Step 0 · พื้นฐาน (Foundations)

| # | Foundation | Tokens |
| --- | --- | --- |
| 0.1 | สี (Color) | `--c-white` `--c-ink` `--c-ink-2` `--c-muted` `--c-tab` `--c-faint` `--c-idle` `--c-control` `--c-line` `--c-disabled` `--c-img` `--c-grey` `--c-red` `--c-red-t` and 48 more (registry.json) |
| 0.2 | ตัวอักษร (Type) | `--font-ui` `--fs-12` `--fs-13` `--fs-14` `--fs-16` `--fs-18` `--fs-20` `--fs-24` `--fs-28` `--lh-18` `--lh-20` `--lh-22` `--lh-24` `--lh-26` and 5 more (registry.json) |
| 0.3 | ระยะห่าง (Spacing) | `--s-2` `--s-4` `--s-6` `--s-8` `--s-10` `--s-12` `--s-16` `--s-20` `--s-24` `--s-28` `--s-32` `--s-40` `--s-48` `--s-56` and 1 more (registry.json) |
| 0.4 | มุมโค้ง (Radius) | `--r-4` `--r-6` `--r-8` `--r-10` `--r-12` `--r-16` `--r-20` `--r-24` `--r-pill` |
| 0.5 | เงา (Shadow) | `--sh-card` `--sh-soft` `--sh-float` `--sh-search` `--sh-tab` `--sh-sheet` `--sh-toast` `--ring-white` `--sh-ic` `--sh-pcard` |
| 0.6 | ไอคอน (Icons) | `--ic-12` `--ic-13` `--ic-14` `--ic-16` `--ic-18` `--ic-20` `--ic-22` `--ic-24` `--ic-26` `--ic-28` `--ic-32` |
| 0.7 | โครงหน้า (Grid · Layout) | `--gutter` `--tap` `--w-screen` `--w-content` `--h-status` `--y-root-row` `--h-row` `--h-phd` `--h-shd` `--h-tabbar` `--h-actionbar` |

## Step 1 · ชิ้นหลัก (Core)

| # | Component | id | Prototype classes | Props (Figma) | Screens | React / Flutter |
| --- | --- | --- | --- | --- | --- | --- |
| 1.1 | **Button** ปุ่ม | `button` | `.i-btn` `.i-btns` `.i-btn--primary` `.i-btn--line` `.i-btn--tint` `.i-btn--grey` `.i-btn--outline` `.i-btn--sm` `.i-btn--md` `.i-btn--lg` `.i-btn--block` | Variant: **Primary** / Line / Tint / Grey / Outline<br>Size: **44** / 32 / 42 / 48<br>Width: **Hug** / Fill<br>State: **Default** / Pressed / Disabled<br>Icon: **false** / true | 114 | pending / pending |
| 1.2 | **Icon Button · Count** ปุ่มไอคอน และตัวเลข | `icon-button` | `.i-count` `.i-float` `.i-icbtn` `.i-hd__btn` `.i-phd__btn` `.i-count--plain` | Variant: **Glass** / Plain / Dark<br>State: **Default** / On<br>Count: **None** / Number<br>Icon: **Instance** | 113 | pending / pending |
| 1.3 | **Chip** ชิป | `chip` | `.i-chip` `.g-fchip` `.i-cat` `.i-opt` `.i-subcat` `.i-chips` | Variant: **Filter** / Category / Option<br>State: **Off** / On / Disabled<br>Leading: **None** / Badge icon / Swatch | 63 | pending / pending |
| 1.4 | **Follow Button** ปุ่มติดตาม | `follow-button` | `.i-follow` `.i-follow--lg` `.i-follow--live` | State: **Off** / On<br>Size: **32** / 40<br>Surface: **Default** / Live | 69 | pending / pending |
| 1.5 | **Trust Badge** ป้ายความมั่นใจ | `trust-badge` | `.t-pill` `.t-tag` `.t-ptag` `.t-ics` `.t-badges` `.i-promise` `.t-ic` | Type: **Pill 24** / Tag 32 / Product tag 40 / Icon circle 24<br>Kind: Official / Authentic / **Official + Authentic** / มอก. / อย. / Refund 2x / Free shipping / Verified | 101 | pending / pending |
| 1.6 | **Price · Rating** ราคา และแถวคะแนน | `price` | `.i-price` `.i-was` `.i-tagdisc` `.i-prow` `.i-meta` `.i-sold` `.i-stars` `.i-price--sm` `.i-price--md` `.i-price--lg` `.i-was__line` | Size: 14 / 16 / **20** / 24<br>Was price: **true** / false<br>Discount: **true** / false<br>Rating size: **12** / 14<br>Reviews: true / **false** | 124 | pending / pending |
| 1.7 | **Tabs** แท็บ | `tabs` | `.i-utabs` `.i-ftabs` `.i-utabs--3` `.i-utab` `.i-ftab` | Variant: **Underline** / Equal / Feed<br>Items: 2 / 3 / **4**<br>Selected: **1** / 2 / 3 / 4 | 44 | pending / pending |
| 1.8 | **Search · Input · Switch · Radio · Checkbox** ช่องกรอก และตัวเลือกในฟอร์ม | `form-controls` | `.i-switch` `.i-input` `.i-search` `.i-radio` `.i-check` | Search: **Empty** / Typing<br>Input: **Empty** / Filled / Focus<br>Switch: Off / **On**<br>Radio: Off / **On**<br>Checkbox: Off / **On** / Mixed | 62 | pending / pending |
| 1.9 | **Section Header** หัวข้อส่วน | `section-header` | `.i-sh` `.i-more` `.i-h18r` `.i-more--grey` | Link: **true** / false<br>Surface: **White** / Grey | 75 | pending / pending |
| 1.10 | **Top Bar** หัวหน้า | `top-bar` | `.i-phd` `.i-hd` `.i-shd` `.i-hd__btn` `.i-phd__title` `.i-float` | Variant: **Root** / Pushed / Search / Media<br>Title: **Text**<br>Actions: 0 / 1 / 2 / **3** | 142 | pending / pending |
| 1.11 | **Tab Bar** แท็บบาร์ | `tab-bar` | `.i-tabbar` `.i-tab` `.i-tab__on` `.i-tab__off` | Active: **Home** / Discover / Live / Order / Profile<br>Tab · State: **Off** / On | 65 | pending / pending |
| 1.12 | **Product Card** การ์ดสินค้า | `product-card` | `.i-pc` `.i-rc` `.i-grid2` `.t-mason` `.i-pc__img` `.i-pc__body` `.i-rc--line` | Variant: **Grid 175** / Small 124<br>Shop: **Official** / Other<br>Icons: 0 / 1 / 2 / **3**<br>Discount: **true** / false | 58 | pending / pending |
| 1.13 | **Bottom Sheet** ชีต | `bottom-sheet` | `.i-sheet` `.g-sheet` `.b-sheet` `.d-sheet` `.sb-sheet` `.i-scrim` `.g-scrim` `.i-sheet__grab` `.i-sheet__hd` `.i-sheet__body` `.i-sheet__foot` | Header: **Title** / Product<br>Footer: **true** / false<br>Body: **Slot** | 38 | pending / pending |
| 1.14 | **Toast** โทสต์ | `toast` | `.i-toast` `.i-toast--bar` `.i-toast--top` `.i-toast__txt` | Position: Bottom / **Above bar** / Top<br>Lines: **1** / 2 | 16 | pending / pending |

## Step 2 · ซื้อขาย (Commerce)

| # | Component | id | Prototype classes | Props (Figma) | Screens | React / Flutter |
| --- | --- | --- | --- | --- | --- | --- |
| 2.1 | **Product Gallery · Product Info** ส่วนบนหน้าสินค้า | `product-top` | `.f-info` `.f-gal` `.g-info` `.g-gal` `.t-badges` | Gallery: **1 of N**<br>Tags: 2 / 3 / **4**<br>Saved: **false** / true | 16 | pending / pending |
| 2.2 | **Shop Row** แถวร้าน | `shop-row` | `.i-shoprow` `.i-shoprow__who` `.i-shoprow__name` | Badge: **Official** / None<br>Action: **Button** | 15 | pending / pending |
| 2.3 | **Option Sheet · Stepper** ตัวเลือก และจำนวน | `option-sheet` | `.i-qty` `.a-optsheet` `.i-opts` `.i-opt` | Stepper: Min / **Mid** / Max<br>Sheet: **Options + Qty** | 21 | pending / pending |
| 2.4 | **Cart Item · Shop Group** แถวสินค้าในตะกร้า | `cart-item` | `.i-item` `.i-shopgrp` `.i-item--now` `.i-item__opt` `.i-check` `.i-qty` | Selected: **true** / false<br>Stepper: **true** / false<br>Variant: **Cart** / Checkout / Live | 23 | pending / pending |
| 2.5 | **Address · Coupon Row · Payment** ที่อยู่ คูปอง วิธีจ่าย | `checkout-rows` | `.i-coupon` `.i-radios` `.i-pp` `.a-addr` `.i-coupon--off` `.i-radio` `.i-pp--visa` `.i-pp--cod` | Coupon: **On** / Off<br>Payment: **PromptPay** / Card / Cash<br>Selected: **true** / false | 22 | pending / pending |
| 2.6 | **Summary · Pay Bar · Action Bar** สรุปยอด และแถบล่าง | `summary-bars` | `.i-actionbar` `.i-paybar` `.i-kv` `.i-kv--minus` `.i-kv--total` | Bar: **Two buttons** / One button / Total + button<br>Check all: true / **false**<br>Row: **Default** / Minus / Total | 62 | pending / pending |
| 2.7 | **Escrow Note** โน้ตถือเงิน | `escrow-note` | `.i-escrow` `.d-escrow` `.d-foot` `.d-badge` `.d-escrow--white` | Variant: **Tint** / White / Footer<br>Amount: **true** / false | 46 | pending / pending |
| 2.8 | **Order Status Tiles · Order Card** คำสั่งซื้อ | `order-tiles` | `.d-tabs` `.d-ord` `.d-pill` `.d-tab` `.d-cnt` `.d-ord--now` `.d-pill--act` `.d-pill--done` | Tile: **All** / To pay / Preparing / Shipping / Done<br>Tile state: Off / **On**<br>Card status: **To pay** / Preparing / Shipping / Done<br>Card size: **Default** / Now | 23 | pending / pending |
| 2.9 | **Order Status Hero · Tracking** ติดตามพัสดุ | `order-tracking` | `.d-hero` `.d-steps` `.d-tl` `.d-parcel` | Step: Paid / Preparing / **Shipping** / Done<br>Timeline rows: **1 ถึง N** | 7 | pending / pending |
| 2.10 | **Review Clip · Star Rating** รีวิว | `review-clip` | `.f-rv` `.i-rate` `.d-rate` `.f-rvs` `.i-rate__star` `.is-lit` | Stars: 0 / 1 / 2 / 3 / 4 / **5**<br>Clip: **Video** | 13 | pending / pending |

## Step 3 · โซเชียลและไลฟ์ (Social · Live)

| # | Component | id | Prototype classes | Props (Figma) | Screens | React / Flutter |
| --- | --- | --- | --- | --- | --- | --- |
| 3.1 | **Avatar · Story Ring** รูปโปรไฟล์ และสตอรี่ | `avatar` | `.i-story` `.i-av` `.i-stories` `.i-livetag` `.i-av--20` `.i-av--32` `.i-av--40` `.i-av--56` `.i-story--seen` | Size: 20 / 24 / 32 / **40** / 56 / 78<br>Ring: **None** / Story / Live / Seen<br>Shape: **Person** / Shop | 24 | pending / pending |
| 3.2 | **Post Card** โพสต์ | `post-card` | `.i-post` `.i-acts` `.i-act` `.i-post__hd` `.i-post__media` `.i-post__cap` `.i-post__tags` `.i-act--like` | Product: **true** / false<br>Media: **Photo** / Video<br>Liked: **false** / true<br>Saved: **false** / true | 17 | pending / pending |
| 3.3 | **Pinned Product** สินค้าที่แนบ | `pinned-product` | `.i-ptag` `.fx-pc` `.i-ptagwrap` `.i-ptag__cart` `.fx-pc__off` `.i-lcardwrap` | Surface: **Post** / Live<br>Badge: **Official** / None<br>Cart: **Default** / Pressed | 36 | pending / pending |
| 3.4 | **Compose Box · Comment · Comment Bar** ช่องเขียน และความคิดเห็น | `compose-comment` | `.c-cmt` `.fx-wr` `.c-comp` `.c-cgroup` `.c-cmt--reply` `.i-input` | Comment: **Default** / Reply<br>Bar: **Empty** / Typing | 24 | pending / pending |
| 3.5 | **Video Card** การ์ดวิดีโอ | `video-card` | `.i-vid` `.i-vids` `.i-vid__views` `.i-aff` `.i-vid__row` | Affiliate: **true** / false<br>Product: **true** / false | 10 | pending / pending |
| 3.6 | **Live Overlay** ชั้นบนไลฟ์ | `live-overlay` | `.i-live` `.i-lhost` `.i-onair` `.i-views` `.i-lchat` `.i-lmsg` `.i-lcardwrap` `.i-lbar` `.i-lbtn` `.i-lin` | Host: Following / **Not following**<br>Message: **Text** / Sticker / Order / Mine<br>Bag count: 0 / **N** | 21 | pending / pending |
| 3.7 | **Reels Overlay** Reels | `reels-overlay` | `.c-reel` `.c-rail` `.c-rail__btn` `.c-rail__btn--like` `.c-reel__who` `.c-reel__cap` | Liked: **false** / true<br>Product: **true** / false | 4 | pending / pending |
| 3.8 | **Shop Header · Store Card** หัวร้าน และการ์ดร้าน | `shop-header` | `.sbp-hd` `.sbp-pills` `.i-store` `.sbp-cover` `.sbp-id` `.sbp-stats` | Badge: **Official + Verified** / Verified<br>Owner: **false** / true | 24 | pending / pending |
| 3.9 | **Creator Header** หัวโปรไฟล์ครีเอเตอร์ | `creator-header` | `.i-prof` `.i-stats` `.i-stat` | Following: **false** / true<br>Self: **false** / true | 6 | pending / pending |
| 3.10 | **Shop Builder Parts** ชิ้นส่วนแต่งร้าน | `shop-builder-parts` | `.sb-tools` `.sb-status` `.sb-rows` `.sb-row` `.sb-pub` `.sb-tplc` `.sb-tool` `.sb-row--fixed` | Row: **On** / Off / Fixed<br>Template: Off / **On**<br>Status: **Draft** / Scheduled / Live | 15 | pending / pending |

## Details per component

### 1.1 Button · ปุ่ม (`button`)

ทุกการกระทำเริ่มที่ปุ่ม ทำก่อนชิ้นอื่น

- Prototype: `.i-btn`, `.i-btns`, `.i-btn--primary`, `.i-btn--line`, `.i-btn--tint`, `.i-btn--grey`, `.i-btn--outline`, `.i-btn--sm`, `.i-btn--md`, `.i-btn--lg`, `.i-btn--block`; also `[disabled]`
- Props: `Variant` (variant): **Primary** / Line / Tint / Grey / Outline · `Size` (variant): **44** / 32 / 42 / 48 · `Width` (variant): **Hug** / Fill · `State` (state): **Default** / Pressed / Disabled · `Icon` (boolean): **false** / true
- Tokens: `--c-control` `--c-disabled` `--c-grey` `--c-ink` `--c-red` `--c-red-t` `--c-tab` `--c-tint` `--c-white` `--fs-14` `--fs-16` `--ic-18` `--lh-20` `--lh-22` `--lh-24` `--r-10` `--r-8` `--s-12` `--s-16` `--s-20` `--s-6` `--s-8` `--tap`
- Used on 114 screens (phone 104, Desktop 5, Duo 5), e.g. F1 หน้าแรก · ดูสตอรี่, หน้าเสริม · หน้าสินค้า · จากไลฟ์, B2 ซื้อในไลฟ์
- Rules: ปุ่มหลักหนึ่งเดียวต่อจอ · ปุ่มรองตัวหนาเท่าปุ่มหลัก · Outline ใช้กับปุ่มซื้อเล็กในไลฟ์เท่านั้น
- Provisional names: React `Button` · Flutter `TmButton`

### 1.2 Icon Button · Count · ปุ่มไอคอน และตัวเลข (`icon-button`)

ปุ่มในหัวหน้า และปุ่มกลมบนรูป ใช้ซ้ำทุกหน้า

- Prototype: `.i-count`, `.i-float`, `.i-icbtn`, `.i-hd__btn`, `.i-phd__btn`, `.i-count--plain`
- Props: `Variant` (variant): **Glass** / Plain / Dark · `State` (state): **Default** / On · `Count` (variant): **None** / Number · `Icon` (slot): **Instance**
- Tokens: `--bw-15` `--c-glass` `--c-ink` `--c-red` `--c-white` `--e-live-s-5` `--fs-12` `--ic-20` `--lh-18` `--r-pill` `--s-4` `--tap` `--z-1` `--z-5`
- Used on 113 screens (phone 103, Desktop 7, Duo 3), e.g. F1 หน้าแรก, F1 หน้าแรก · หมวดกีฬา, F1 หน้าแรก · ดูสตอรี่
- Rules: ทุกปุ่มแตะได้ 44 × 44 · ตัวเลขเป็น 0 ไม่ต้องแสดง
- Provisional names: React `IconButton`, `Count` · Flutter `TmIconButton`, `TmCount`

### 1.3 Chip · ชิป (`chip`)

ตัวกรอง หมวดหมู่ และตัวเลือกสินค้า ใช้แบบเลือกแล้วเหมือนกัน

- Prototype: `.i-chip`, `.g-fchip`, `.i-cat`, `.i-opt`, `.i-subcat`, `.i-chips`; also `aria-pressed`, `aria-selected`, `aria-checked`
- Props: `Variant` (variant): **Filter** / Category / Option · `State` (state): **Off** / On / Disabled · `Leading` (variant): **None** / Badge icon / Swatch
- Tokens: `--bw-2` `--c-control` `--c-grey` `--c-ink` `--c-line` `--c-muted` `--c-red` `--c-red-t` `--c-tint` `--c-white` `--fs-12` `--fs-14` `--ic-16` `--ic-24` `--ic-26` `--lh-18` `--lh-20` `--r-16` `--r-4` `--r-8` `--r-pill` `--s-12` `--s-16` `--s-2` `--s-4` `--s-6` `--s-8` `--sh-card` `--sh-float` `--tap`
- Used on 63 screens (phone 58, Desktop 3, Duo 2), e.g. F1 หน้าแรก, F1 หน้าแรก · หมวดกีฬา, F1 หน้าแรก · ดูสตอรี่
- Rules: เลือกแล้ว พื้นชมพู ขอบแดง ตัวแดงเข้ม · แถวชิปเลื่อนข้างได้ เริ่มที่ 16
- Provisional names: React `Chip` · Flutter `TmChip`

### 1.4 Follow Button · ปุ่มติดตาม (`follow-button`)

มีทั้งในร้าน โพสต์ ครีเอเตอร์ และไลฟ์

- Prototype: `.i-follow`, `.i-follow--lg`, `.i-follow--live`; also `aria-pressed`, `ไลฟ์เท่านั้น`
- Props: `State` (state): **Off** / On · `Size` (variant): **32** / 40 · `Surface` (variant): **Default** / Live
- Tokens: `--c-grey` `--c-muted` `--c-red` `--c-red-t` `--c-tint` `--c-white` `--e-live-follow-on` `--fs-14` `--lh-20` `--lh-22` `--r-10` `--r-16` `--r-pill` `--s-12` `--s-4`
- Used on 69 screens (phone 60, Desktop 5, Duo 4), e.g. F1 หน้าแรก, F1 หน้าแรก · หมวดกีฬา, F1 หน้าแรก · ดูสตอรี่
- Rules: แบบไลฟ์ใช้เฉพาะในหน้าไลฟ์
- Provisional names: React `FollowButton` · Flutter `TmFollowButton`

### 1.5 Trust Badge · ป้ายความมั่นใจ (`trust-badge`)

หัวใจของแนวทางที่เลือก อยู่บนการ์ดสินค้าแทบทุกใบ

- Prototype: `.t-pill`, `.t-tag`, `.t-ptag`, `.t-ics`, `.t-badges`, `.i-promise`, `.t-ic`; also `trust.js`, `TB`, `TI`
- Props: `Type` (variant): **Pill 24** / Tag 32 / Product tag 40 / Icon circle 24 · `Kind` (variant): Official / Authentic / **Official + Authentic** / มอก. / อย. / Refund 2x / Free shipping / Verified
- Tokens: `--c-control` `--c-ink` `--c-ink-2` `--c-wash` `--c-wash-2` `--c-white` `--fs-12` `--fs-14` `--lh-18` `--r-pill` `--s-12` `--s-16` `--s-32` `--s-4` `--s-6` `--s-8` `--z-2`
- Used on 101 screens (phone 88, Desktop 7, Duo 6), e.g. F1 หน้าแรก, F1 หน้าแรก · หมวดกีฬา, F1 หน้าแรก · ดูสตอรี่
- Rules: ป้ายมาจากข้อมูลจริง ไม่มีข้อมูล ไม่แสดง · ห้ามคิดป้ายใหม่ ห้ามพื้นแดงทึบ · ร้านทางการ เฉพาะร้านทางการ
- Provisional names: React `TrustBadge` · Flutter `TmTrustBadge`

### 1.6 Price · Rating · ราคา และแถวคะแนน (`price`)

ราคาอยู่แทบทุกจอ ต้องเหมือนกันทุกที่

- Prototype: `.i-price`, `.i-was`, `.i-tagdisc`, `.i-prow`, `.i-meta`, `.i-sold`, `.i-stars`, `.i-price--sm`, `.i-price--md`, `.i-price--lg`, `.i-was__line`
- Props: `Size` (variant): 14 / 16 / **20** / 24 · `Was price` (boolean): **true** / false · `Discount` (boolean): **true** / false · `Rating size` (variant): **12** / 14 · `Reviews` (boolean): true / **false**
- Tokens: `--c-control` `--c-muted` `--c-red` `--c-red-t` `--c-star` `--c-star-off` `--c-tint` `--e-live-lh-16` `--fs-12` `--fs-14` `--fs-16` `--fs-20` `--fs-24` `--ic-12` `--ic-14` `--lh-18` `--lh-20` `--lh-22` `--lh-24` `--lh-28` `--lh-34` `--r-4` `--s-2` `--s-4` `--s-6` `--s-8`
- Used on 124 screens (phone 114, Desktop 5, Duo 5), e.g. F1 หน้าแรก, F1 หน้าแรก · หมวดกีฬา, F1 หน้าแรก · ดูสตอรี่
- Rules: ราคาแดงตัวหนา · ราคาเดิมเทา ใช้เส้นที่วาด ไม่ใช้ขีดฆ่าตัวอักษร · ดาวอยู่ติดตัวเลขเสมอ
- Provisional names: React `Price`, `Rating` · Flutter `TmPrice`, `TmRating`

### 1.7 Tabs · แท็บ (`tabs`)

แท็บเนื้อหาในร้าน ครีเอเตอร์ โปรไฟล์ และฟีด

- Prototype: `.i-utabs`, `.i-ftabs`, `.i-utabs--3`, `.i-utab`, `.i-ftab`; also `aria-selected`
- Props: `Variant` (variant): **Underline** / Equal / Feed · `Items` (variant): 2 / 3 / **4** · `Selected` (state): **1** / 2 / 3 / 4
- Tokens: `--c-ink` `--c-line` `--c-muted` `--lh-22` `--s-16` `--s-4` `--s-8`
- Used on 44 screens (phone 38, Desktop 3, Duo 3), e.g. F2 Discover, F2 Discover · แท็บกำลังติดตาม, หน้าเสริม · ผลค้นหา · จากรูป
- Provisional names: React `Tabs` · Flutter `TmTabs`

### 1.8 Search · Input · Switch · Radio · Checkbox · ช่องกรอก และตัวเลือกในฟอร์ม (`form-controls`)

5 ชิ้นเล็กที่ตะกร้า ชำระเงิน รีวิว และแต่งร้านใช้ร่วมกัน

- Prototype: `.i-switch`, `.i-input`, `.i-search`, `.i-radio`, `.i-check`; also `has-value`, `aria-checked`
- Props: `Search` (state): **Empty** / Typing · `Input` (state): **Empty** / Filled / Focus · `Switch` (state): Off / **On** · `Radio` (state): Off / **On** · `Checkbox` (state): Off / **On** / Mixed
- Tokens: `--bw-15` `--bw-6` `--c-control` `--c-faint` `--c-grey` `--c-idle` `--c-ink` `--c-ink-2` `--c-muted` `--c-red` `--c-tab` `--c-tint` `--c-white` `--e-check-top` `--fs-14` `--fs-16` `--ic-14` `--ic-16` `--ic-22` `--lh-20` `--lh-24` `--r-10` `--r-12` `--r-16` `--r-20` `--r-6` `--r-pill` `--s-12` `--s-16` `--s-4` `--s-6` `--s-8` `--sh-search` `--tap`
- Used on 62 screens (phone 62, Desktop 0, Duo 0), e.g. B2 ซื้อในไลฟ์, B2 ซื้อในไลฟ์ · เลือกวิธีชำระเงิน, B2 ซื้อในไลฟ์ · เลือกที่อยู่
- Rules: ทุกชิ้นแตะได้ 44 · ข้อความในช่อง 16 ขึ้นไป แป้นพิมพ์ไม่ซูม
- Provisional names: React `Search`, `Input`, `Switch`, `Radio`, `Checkbox` · Flutter `TmSearch`, `TmInput`, `TmSwitch`, `TmRadio`, `TmCheckbox`

### 1.9 Section Header · หัวข้อส่วน (`section-header`)

ทุกบล็อกในหน้าเปิดด้วยหัวข้อนี้

- Prototype: `.i-sh`, `.i-more`, `.i-h18r`, `.i-more--grey`
- Props: `Link` (boolean): **true** / false · `Surface` (variant): **White** / Grey
- Tokens: `--c-ink` `--c-red` `--c-red-t` `--fs-14` `--fs-16` `--ic-16` `--lh-20` `--lh-22` `--lh-24` `--s-12` `--s-16` `--s-2` `--s-8` `--tap`
- Used on 75 screens (phone 66, Desktop 4, Duo 5), e.g. F1 หน้าแรก, F1 หน้าแรก · หมวดกีฬา, F1 หน้าแรก · ดูสตอรี่
- Provisional names: React `SectionHeader` · Flutter `TmSectionHeader`

### 1.10 Top Bar · หัวหน้า (`top-bar`)

ทุกหน้ามีหัวหน้า 1 ใน 4 แบบ

- Prototype: `.i-phd`, `.i-hd`, `.i-shd`, `.i-hd__btn`, `.i-phd__title`, `.i-float`; also `หน้ามืด`
- Props: `Variant` (variant): **Root** / Pushed / Search / Media · `Title` (slot): **Text** · `Actions` (variant): 0 / 1 / 2 / **3**
- Tokens: `--c-glass-light` `--c-grey` `--c-ink` `--c-line` `--c-red` `--c-white` `--ease-std` `--fs-18` `--h-phd` `--h-shd` `--h-status` `--ic-22` `--ic-24` `--lh-26` `--m-fast` `--r-20` `--r-24` `--s-12` `--s-16` `--s-2` `--s-4` `--s-6` `--sh-float` `--sh-search` `--tap` `--z-1` `--z-3` `--z-header`
- Used on 142 screens (phone 131, Desktop 7, Duo 4), e.g. F1 หน้าแรก, F1 หน้าแรก · หมวดกีฬา, F1 หน้าแรก · ดูสตอรี่
- Rules: แถบสถานะ 62 อยู่บนสุดทุกแบบ · ด้านบนแดงอ่อน เฉพาะ 4 หน้าหลัก
- Provisional names: React `TopBar` · Flutter `TmTopBar`

### 1.11 Tab Bar · แท็บบาร์ (`tab-bar`)

อยู่ล่างจอของทุกหน้าหลัก

- Prototype: `.i-tabbar`, `.i-tab`, `.i-tab__on`, `.i-tab__off`; also `aria-current="page"`
- Props: `Active` (state): **Home** / Discover / Live / Order / Profile · `Tab · State` (state): **Off** / On
- Tokens: `--c-muted` `--c-red` `--c-tab` `--c-white` `--fs-12` `--ic-32` `--lh-18` `--s-12` `--s-8` `--sh-tab` `--z-tabbar`
- Used on 65 screens (phone 65, Desktop 0, Duo 0), e.g. F1 หน้าแรก, F1 หน้าแรก · หมวดกีฬา, F1 หน้าแรก · ดูสตอรี่
- Rules: ไอคอน 32 ชื่อ 12 · แท็บที่เปิด ไอคอนทึบแดง ตัวหนา
- Provisional names: React `TabBar` · Flutter `TmTabBar`

### 1.12 Product Card · การ์ดสินค้า (`product-card`)

ประกอบจาก 1.5 และ 1.6 ทำหลังสองชิ้นนั้นเสร็จ

- Prototype: `.i-pc`, `.i-rc`, `.i-grid2`, `.t-mason`, `.i-pc__img`, `.i-pc__body`, `.i-rc--line`; also `trust.js`
- Props: `Variant` (variant): **Grid 175** / Small 124 · `Shop` (variant): **Official** / Other · `Icons` (variant): 0 / 1 / 2 / **3** · `Discount` (boolean): **true** / false
- Tokens: `--c-grey` `--c-ink` `--c-muted` `--c-white` `--e-live-lh-19` `--ease-std` `--fs-12` `--fs-14` `--fs-20` `--lh-18` `--lh-20` `--lh-28` `--m-base` `--r-12` `--r-6` `--s-12` `--s-16` `--s-2` `--s-4` `--s-8` `--sh-card` `--sh-float` `--sh-pcard` `--z-2`
- Used on 58 screens (phone 52, Desktop 3, Duo 3), e.g. F1 หน้าแรก, F1 หน้าแรก · หมวดกีฬา, F1 หน้าแรก · ดูสตอรี่
- Rules: ตาราง 175 + 8 + 175 ต่อกันห่าง 8 · ชื่อ 2 บรรทัด ตัดด้วยจุด · รูปชนขอบ ไม่บีบ ไม่ยืด
- Provisional names: React `ProductCard` · Flutter `TmProductCard`

### 1.13 Bottom Sheet · ชีต (`bottom-sheet`)

โค้ดมี 5 ชื่อ แต่หน้าตาเดียวกัน ทำเป็นคอมโพเนนต์เดียว

- Prototype: `.i-sheet`, `.g-sheet`, `.b-sheet`, `.d-sheet`, `.sb-sheet`, `.i-scrim`, `.g-scrim`, `.i-sheet__grab`, `.i-sheet__hd`, `.i-sheet__body`, `.i-sheet__foot`
- Props: `Header` (variant): **Title** / Product · `Footer` (boolean): **true** / false · `Body` (slot): **Slot**
- Tokens: `--c-idle` `--c-ink` `--c-line` `--c-muted` `--c-scrim` `--c-white` `--e-live-line` `--fs-14` `--fs-18` `--ic-24` `--lh-20` `--lh-26` `--r-20` `--r-pill` `--s-12` `--s-16` `--s-20` `--s-24` `--s-32` `--s-4` `--s-40` `--s-56` `--s-8` `--sh-sheet` `--tap` `--z-ov-scrim` `--z-ov-sheet` `--z-scrim` `--z-sheet`
- Used on 38 screens (phone 38, Desktop 0, Duo 0), e.g. หน้าเสริม · หน้าสินค้า · จากไลฟ์, B2 ซื้อในไลฟ์, B2 ซื้อในไลฟ์ · เลือกวิธีชำระเงิน
- Rules: เลื่อนขึ้นจากล่าง ม่านดำ 42% · ปุ่มปิดขวาบน แตะได้ 44
- Provisional names: React `BottomSheet` · Flutter `TmBottomSheet`

### 1.14 Toast · โทสต์ (`toast`)

บอกผลหลังกด ใช้ทุกฟลว์

- Prototype: `.i-toast`, `.i-toast--bar`, `.i-toast--top`, `.i-toast__txt`
- Props: `Position` (variant): Bottom / **Above bar** / Top · `Lines` (variant): **1** / 2
- Tokens: `--c-toast` `--c-white` `--fs-14` `--fs-16` `--ic-22` `--lh-20` `--lh-24` `--r-12` `--s-10` `--s-12` `--s-16` `--sh-toast` `--z-toast`
- Used on 16 screens (phone 16, Desktop 0, Duo 0), e.g. B3 กลับเข้าไลฟ์, B4 ไลฟ์จบแล้ว · ตั้งเตือนไลฟ์หน้าแล้ว, F2 Discover · ติดตามครีเอเตอร์
- Rules: หายเอง ไม่มีปุ่มปิด
- Provisional names: React `Toast` · Flutter `TmToast`

### 2.1 Product Gallery · Product Info · ส่วนบนหน้าสินค้า (`product-top`)

หน้าที่คนตัดสินใจซื้อ รวมราคา ป้าย และการส่ง

- Prototype: `.f-info`, `.f-gal`, `.g-info`, `.g-gal`, `.t-badges`; also `หน้าเสริม`
- Props: `Gallery` (slot): **1 of N** · `Tags` (variant): 2 / 3 / **4** · `Saved` (boolean): **false** / true
- Tokens: `--c-glass` `--c-img` `--c-ink` `--c-white` `--fs-12` `--fs-14` `--fs-20` `--ic-24` `--lh-18` `--lh-20` `--lh-28` `--r-6` `--s-12` `--s-16` `--s-2` `--s-20` `--s-4` `--s-6` `--s-8`
- Used on 16 screens (phone 14, Desktop 1, Duo 1), e.g. หน้าเสริม · หน้าสินค้า · จากไลฟ์, F3 หน้าสินค้า, F3 หน้าสินค้า · บันทึกในรายการโปรด
- Rules: การันตีของแท้ เป็นป้ายแรกเสมอ · แถวส่งเริ่มด้วย ส่งจาก ...
- Provisional names: React `ProductGallery`, `ProductInfo` · Flutter `TmProductGallery`, `TmProductInfo`

### 2.2 Shop Row · แถวร้าน (`shop-row`)

บอกว่าใครขาย ใช้ในหน้าสินค้าและหน้าเสริม

- Prototype: `.i-shoprow`, `.i-shoprow__who`, `.i-shoprow__name`
- Props: `Badge` (variant): **Official** / None · `Action` (slot): **Button**
- Tokens: `--c-ink` `--c-line` `--fs-14` `--fs-16` `--lh-20` `--lh-24` `--r-10` `--r-12` `--s-4`
- Used on 15 screens (phone 15, Desktop 0, Duo 0), e.g. หน้าเสริม · หน้าสินค้า · จากไลฟ์, หน้าเสริม · เรื่องเล่า, F3 หน้าสินค้า
- Provisional names: React `ShopRow` · Flutter `TmShopRow`

### 2.3 Option Sheet · Stepper · ตัวเลือก และจำนวน (`option-sheet`)

ก่อนลงตะกร้าทุกครั้ง และในตะกร้าเอง

- Prototype: `.i-qty`, `.a-optsheet`, `.i-opts`, `.i-opt`; also `data-min`, `data-max`
- Props: `Stepper` (state): Min / **Mid** / Max · `Sheet` (slot): **Options + Qty**
- Tokens: `--c-control` `--c-faint` `--c-ink` `--c-line` `--e-live-lh-32` `--fs-14` `--ic-16` `--lh-20` `--r-12` `--r-8` `--s-12` `--s-16` `--s-4` `--s-48` `--s-8`
- Used on 21 screens (phone 19, Desktop 1, Duo 1), e.g. หน้าเสริม · หน้าสินค้า · จากไลฟ์, B2 ซื้อในไลฟ์, B2 ซื้อในไลฟ์ · เลือกวิธีชำระเงิน
- Rules: ปุ่ม − + แตะได้ 44 · ปิดใช้ ไอคอนสีจาง
- Provisional names: React `OptionSheet`, `Stepper` · Flutter `TmOptionSheet`, `TmStepper`

### 2.4 Cart Item · Shop Group · แถวสินค้าในตะกร้า (`cart-item`)

ตะกร้า ชำระเงิน และตะกร้าในไลฟ์ใช้แถวเดียวกัน

- Prototype: `.i-item`, `.i-shopgrp`, `.i-item--now`, `.i-item__opt`, `.i-check`, `.i-qty`
- Props: `Selected` (boolean): **true** / false · `Stepper` (boolean): **true** / false · `Variant` (variant): **Cart** / Checkout / Live
- Tokens: `--c-grey` `--c-ink` `--c-line` `--c-muted` `--c-red` `--c-red-t` `--c-tab` `--c-tint` `--c-white` `--e-check-top` `--e-live-lh-19` `--fs-12` `--fs-14` `--ic-12` `--ic-14` `--ic-16` `--lh-18` `--lh-20` `--r-10` `--r-6` `--s-10` `--s-12` `--s-16` `--s-2` `--s-20` `--s-4` `--s-6` `--s-8` `--tap`
- Used on 23 screens (phone 21, Desktop 1, Duo 1), e.g. B2 ซื้อในไลฟ์, B2 ซื้อในไลฟ์ · เลือกวิธีชำระเงิน, B2 ซื้อในไลฟ์ · เลือกที่อยู่
- Rules: จัดกลุ่มตามร้าน หัวกลุ่มติ๊กได้ทั้งร้าน
- Provisional names: React `CartItem`, `ShopGroup` · Flutter `TmCartItem`, `TmShopGroup`

### 2.5 Address · Coupon Row · Payment · ที่อยู่ คูปอง วิธีจ่าย (`checkout-rows`)

3 แถวในหน้าชำระเงิน ที่คนต้องเลือกก่อนจ่าย

- Prototype: `.i-coupon`, `.i-radios`, `.i-pp`, `.a-addr`, `.i-coupon--off`, `.i-radio`, `.i-pp--visa`, `.i-pp--cod`
- Props: `Coupon` (state): **On** / Off · `Payment` (variant): **PromptPay** / Card / Cash · `Selected` (boolean): **true** / false
- Tokens: `--c-brand-pp` `--c-brand-visa` `--c-control` `--c-faint` `--c-ink-2` `--c-muted` `--c-red` `--c-red-200` `--c-tint` `--c-white` `--fs-12` `--ic-20` `--lh-18` `--r-10` `--r-12` `--s-10` `--s-12` `--s-6` `--s-8`
- Used on 22 screens (phone 20, Desktop 1, Duo 1), e.g. B2 ซื้อในไลฟ์, B2 ซื้อในไลฟ์ · เลือกวิธีชำระเงิน, B2 ซื้อในไลฟ์ · เลือกที่อยู่
- Provisional names: React `Address`, `CouponRow`, `Payment` · Flutter `TmAddress`, `TmCouponRow`, `TmPayment`

### 2.6 Summary · Pay Bar · Action Bar · สรุปยอด และแถบล่าง (`summary-bars`)

ทำครั้งเดียว ใช้ทุกหน้าที่มีปุ่มซื้อหรือปุ่มจ่าย

- Prototype: `.i-actionbar`, `.i-paybar`, `.i-kv`, `.i-kv--minus`, `.i-kv--total`
- Props: `Bar` (variant): **Two buttons** / One button / Total + button · `Check all` (boolean): true / **false** · `Row` (variant): **Default** / Minus / Total
- Tokens: `--c-ink` `--c-line` `--c-red-t` `--c-white` `--fs-14` `--fs-16` `--lh-22` `--lh-24` `--r-10` `--s-12` `--s-16` `--s-2` `--s-4` `--s-6` `--s-8` `--z-bar`
- Used on 62 screens (phone 61, Desktop 0, Duo 1), e.g. หน้าเสริม · หน้าสินค้า · จากไลฟ์, B2 ซื้อในไลฟ์, B2 ซื้อในไลฟ์ · เลือกวิธีชำระเงิน
- Rules: แสดงค่าส่งก่อนกดซื้อเสมอ · ส่วนลดใช้ −฿ สีแดงเข้ม
- Provisional names: React `Summary`, `PayBar`, `ActionBar` · Flutter `TmSummary`, `TmPayBar`, `TmActionBar`

### 2.7 Escrow Note · โน้ตถือเงิน (`escrow-note`)

บอกว่าเงินปลอดภัย จนกว่าจะได้ของ

- Prototype: `.i-escrow`, `.d-escrow`, `.d-foot`, `.d-badge`, `.d-escrow--white`
- Props: `Variant` (variant): **Tint** / White / Footer · `Amount` (boolean): **true** / false
- Tokens: `--c-ink` `--c-red` `--c-tint` `--c-white` `--fs-14` `--ic-22` `--ic-28` `--lh-20` `--r-12` `--r-16` `--r-pill` `--s-12` `--s-16` `--s-20` `--s-8`
- Used on 46 screens (phone 42, Desktop 2, Duo 2), e.g. หน้าเสริม · หน้าสินค้า · จากไลฟ์, C5 ข้อมูลร้าน, A7 ชำระเงิน
- Provisional names: React `EscrowNote` · Flutter `TmEscrowNote`

### 2.8 Order Status Tiles · Order Card · คำสั่งซื้อ (`order-tiles`)

หน้าคำสั่งซื้อ และสถานะที่คนกลับมาดูบ่อย

- Prototype: `.d-tabs`, `.d-ord`, `.d-pill`, `.d-tab`, `.d-cnt`, `.d-ord--now`, `.d-pill--act`, `.d-pill--done`
- Props: `Tile` (variant): **All** / To pay / Preparing / Shipping / Done · `Tile state` (state): Off / **On** · `Card status` (variant): **To pay** / Preparing / Shipping / Done · `Card size` (variant): **Default** / Now
- Tokens: `--c-grey` `--c-ink` `--c-line` `--c-muted` `--c-ok` `--c-ok-tint` `--c-red-t` `--c-tint` `--c-white` `--fs-12` `--fs-14` `--fs-16` `--lh-18` `--lh-20` `--lh-24` `--r-10` `--r-16` `--r-6` `--r-pill` `--s-10` `--s-12` `--s-16` `--s-4` `--s-8` `--sh-card` `--sh-search`
- Used on 23 screens (phone 21, Desktop 1, Duo 1), e.g. D1 คำสั่งซื้อ, D1 คำสั่งซื้อ · แท็บต้องชำระ, D1 คำสั่งซื้อ · แท็บเตรียมส่ง
- Rules: แตะช่องแล้วกรองในหน้าเดิม · ตัวเลขเป็น 0 ไม่แสดง
- Provisional names: React `OrderStatusTiles`, `OrderCard` · Flutter `TmOrderStatusTiles`, `TmOrderCard`

### 2.9 Order Status Hero · Tracking · ติดตามพัสดุ (`order-tracking`)

หน้ารายละเอียดคำสั่งซื้อ ทุกสถานะใช้ส่วนนี้

- Prototype: `.d-hero`, `.d-steps`, `.d-tl`, `.d-parcel`
- Props: `Step` (variant): Paid / Preparing / **Shipping** / Done · `Timeline rows` (slot): **1 ถึง N**
- Tokens: `--bw-2` `--bw-3` `--c-idle` `--c-ink` `--c-line` `--c-muted` `--c-red` `--c-red-200` `--c-red-t` `--c-tint` `--c-white` `--fs-12` `--fs-14` `--ic-14` `--lh-18` `--lh-20` `--r-12` `--r-pill` `--s-12` `--s-16` `--s-4` `--s-8` `--z-1`
- Used on 7 screens (phone 6, Desktop 0, Duo 1), e.g. หน้าเสริม · รายละเอียดคำสั่งซื้อ, D2 ติดตามพัสดุ, D2 ติดตามพัสดุ · คัดลอกเลขพัสดุแล้ว
- Provisional names: React `OrderStatusHero`, `Tracking` · Flutter `TmOrderStatusHero`, `TmTracking`

### 2.10 Review Clip · Star Rating · รีวิว (`review-clip`)

รีวิวจริงช่วยตัดสินใจ และคนเขียนรีวิวหลังได้ของ

- Prototype: `.f-rv`, `.i-rate`, `.d-rate`, `.f-rvs`, `.i-rate__star`, `.is-lit`
- Props: `Stars` (variant): 0 / 1 / 2 / 3 / 4 / **5** · `Clip` (slot): **Video**
- Tokens: `--c-control` `--c-img` `--c-red-t` `--c-star` `--c-white` `--e-play-badge` `--fs-14` `--fs-16` `--g-rv-fade` `--ic-32` `--lh-20` `--lh-24` `--r-12` `--s-4` `--s-8` `--tap`
- Used on 13 screens (phone 11, Desktop 1, Duo 1), e.g. F3 หน้าสินค้า, F3 หน้าสินค้า · บันทึกในรายการโปรด, F3 หน้าสินค้า · รูปถัดไป
- Provisional names: React `ReviewClip`, `StarRating` · Flutter `TmReviewClip`, `TmStarRating`

### 3.1 Avatar · Story Ring · รูปโปรไฟล์ และสตอรี่ (`avatar`)

คน ร้าน และไลฟ์ ใช้รูปวงกลมชุดเดียว

- Prototype: `.i-story`, `.i-av`, `.i-stories`, `.i-livetag`, `.i-av--20`, `.i-av--32`, `.i-av--40`, `.i-av--56`, `.i-story--seen`; also `is-live`
- Props: `Size` (variant): 20 / 24 / 32 / **40** / 56 / 78 · `Ring` (variant): **None** / Story / Live / Seen · `Shape` (variant): **Person** / Shop
- Tokens: `--bw-15` `--bw-2` `--c-img` `--c-ink` `--c-line` `--c-red` `--c-white` `--e-ring-gap` `--fs-12` `--ic-12` `--lh-18` `--r-6` `--s-12` `--s-16` `--s-2` `--s-4` `--s-6` `--s-8`
- Used on 24 screens (phone 13, Desktop 7, Duo 4), e.g. F1 หน้าแรก, F1 หน้าแรก · หมวดกีฬา, F1 หน้าแรก · ดูสตอรี่
- Rules: คนเป็นวงกลม · ร้านเป็นสี่เหลี่ยมมุมมน
- Provisional names: React `Avatar`, `StoryRing` · Flutter `TmAvatar`, `TmStoryRing`

### 3.2 Post Card · โพสต์ (`post-card`)

ฟีด Discover โพสต์ และโปรไฟล์ มีหรือไม่มีสินค้าก็ได้

- Prototype: `.i-post`, `.i-acts`, `.i-act`, `.i-post__hd`, `.i-post__media`, `.i-post__cap`, `.i-post__tags`, `.i-act--like`; also `aria-pressed`
- Props: `Product` (boolean): **true** / false · `Media` (variant): **Photo** / Video · `Liked` (boolean): **false** / true · `Saved` (boolean): **false** / true
- Tokens: `--c-glass` `--c-ink` `--c-muted` `--c-red` `--c-white` `--fs-12` `--fs-14` `--fs-16` `--gutter` `--ic-16` `--ic-18` `--ic-22` `--lh-18` `--lh-20` `--lh-22` `--lh-24` `--r-6` `--r-8` `--r-pill` `--s-12` `--s-16` `--s-4` `--s-56` `--s-8` `--tap`
- Used on 17 screens (phone 15, Desktop 1, Duo 1), e.g. F2 Discover, F2 Discover · แท็บกำลังติดตาม, F2 Discover · ติดตามครีเอเตอร์
- Rules: ไม่มีสินค้า ไม่มีการ์ด ไม่มีที่ว่าง
- Provisional names: React `PostCard` · Flutter `TmPostCard`

### 3.3 Pinned Product · สินค้าที่แนบ (`pinned-product`)

ทางจากโพสต์ Reels และไลฟ์ ไปสู่การซื้อ

- Prototype: `.i-ptag`, `.fx-pc`, `.i-ptagwrap`, `.i-ptag__cart`, `.fx-pc__off`, `.i-lcardwrap`; also `ไลฟ์`
- Props: `Surface` (variant): **Post** / Live · `Badge` (variant): **Official** / None · `Cart` (state): **Default** / Pressed
- Tokens: `--c-ink` `--c-line` `--c-muted` `--c-red` `--c-red-t` `--c-white` `--e-live-lh-16` `--e-live-lh-19` `--e-live-s-5` `--fs-12` `--fs-14` `--ic-20` `--lh-18` `--lh-20` `--r-10` `--r-12` `--r-pill` `--s-12` `--s-16` `--s-2` `--s-20` `--s-4` `--s-56` `--s-8`
- Used on 36 screens (phone 32, Desktop 2, Duo 2), e.g. B2 ซื้อในไลฟ์, B2 ซื้อในไลฟ์ · เลือกวิธีชำระเงิน, B2 ซื้อในไลฟ์ · เลือกที่อยู่
- Provisional names: React `PinnedProduct` · Flutter `TmPinnedProduct`

### 3.4 Compose Box · Comment · Comment Bar · ช่องเขียน และความคิดเห็น (`compose-comment`)

คนเริ่มคุยกันที่นี่ ทั้งฟีด โพสต์ และ Reels

- Prototype: `.c-cmt`, `.fx-wr`, `.c-comp`, `.c-cgroup`, `.c-cmt--reply`, `.i-input`
- Props: `Comment` (variant): **Default** / Reply · `Bar` (state): **Empty** / Typing
- Tokens: `--c-disabled` `--c-faint` `--c-grey` `--c-ink` `--c-line` `--c-muted` `--c-red` `--c-red-wash` `--c-white` `--cmt-indent` `--fs-12` `--fs-14` `--gutter` `--ic-16` `--ic-18` `--ic-20` `--lh-18` `--lh-20` `--lh-22` `--r-24` `--r-pill` `--s-12` `--s-16` `--s-4` `--s-48` `--s-8` `--sh-soft` `--tap` `--w-screen` `--z-bar`
- Used on 24 screens (phone 23, Desktop 0, Duo 1), e.g. F2 Discover, F2 Discover · แท็บกำลังติดตาม, F2 Discover · ติดตามครีเอเตอร์
- Provisional names: React `ComposeBox`, `Comment`, `CommentBar` · Flutter `TmComposeBox`, `TmComment`, `TmCommentBar`

### 3.5 Video Card · การ์ดวิดีโอ (`video-card`)

วิดีโอรีวิวในฟีด พร้อมสินค้าใต้คลิป

- Prototype: `.i-vid`, `.i-vids`, `.i-vid__views`, `.i-aff`, `.i-vid__row`
- Props: `Affiliate` (boolean): **true** / false · `Product` (boolean): **true** / false
- Tokens: `--c-glass` `--c-ink-2` `--c-white` `--e-play-badge` `--fs-12` `--fs-14` `--ic-16` `--lh-18` `--lh-20` `--r-12` `--r-6` `--r-8` `--s-12` `--s-16` `--s-4` `--s-6` `--s-8` `--sh-card`
- Used on 10 screens (phone 8, Desktop 1, Duo 1), e.g. F2 Discover, F2 Discover · แท็บกำลังติดตาม, F2 Discover · ติดตามครีเอเตอร์
- Provisional names: React `VideoCard` · Flutter `TmVideoCard`

### 3.6 Live Overlay · ชั้นบนไลฟ์ (`live-overlay`)

หน้าไลฟ์ปัจจุบันคือแบบอ้างอิง ปรับได้ถ้ามีเหตุผล UX

- Prototype: `.i-live`, `.i-lhost`, `.i-onair`, `.i-views`, `.i-lchat`, `.i-lmsg`, `.i-lcardwrap`, `.i-lbar`, `.i-lbtn`, `.i-lin`
- Props: `Host` (variant): Following / **Not following** · `Message` (variant): **Text** / Sticker / Order / Mine · `Bag count` (variant): 0 / **N**
- Tokens: `--bw-3` `--c-glass` `--c-glass-white` `--c-ink` `--c-red` `--c-shade` `--c-white` `--e-live-fade-34` `--e-live-fade-50` `--e-live-glass-40` `--e-live-lh-16` `--e-live-lh-19` `--e-live-lh-21` `--e-live-mine` `--e-live-order` `--e-live-s-15` `--e-live-s-3` `--e-live-s-5` `--e-live-stage` `--fs-12` `--fs-13` `--fs-14` `--fs-16` `--ic-16` `--lh-18` `--lh-20` `--r-12` `--r-20` `--r-6` `--r-pill` `--s-10` `--s-12` `--s-16` `--s-2` `--s-20` `--s-4` `--s-48` `--s-6` `--s-8` `--tap` `--z-1`
- Used on 21 screens (phone 18, Desktop 1, Duo 2), e.g. B2 ซื้อในไลฟ์, B2 ซื้อในไลฟ์ · เลือกวิธีชำระเงิน, B2 ซื้อในไลฟ์ · เลือกที่อยู่
- Rules: พื้นมืดและป้ายความมั่นใจต้องอยู่ครบ · สติกเกอร์มาสคอต เฉพาะในแชทไลฟ์
- Provisional names: React `LiveOverlay` · Flutter `TmLiveOverlay`

### 3.7 Reels Overlay · Reels (`reels-overlay`)

วิดีโอเต็มจอ ปุ่มด้านขวาและสินค้าด้านล่าง

- Prototype: `.c-reel`, `.c-rail`, `.c-rail__btn`, `.c-rail__btn--like`, `.c-reel__who`, `.c-reel__cap`
- Props: `Liked` (boolean): **false** / true · `Product` (boolean): **true** / false
- Tokens: `--bw-2` `--c-glass` `--c-media` `--c-red-50` `--c-track` `--c-white` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--g-reel-shade` `--g-shade-top` `--ic-16` `--ic-26` `--lh-18` `--lh-20` `--lh-24` `--lh-26` `--r-pill` `--s-12` `--s-2` `--s-4` `--s-8` `--tap`
- Used on 4 screens (phone 4, Desktop 0, Duo 0), e.g. C2 วิดีโอรีวิว (Reels), C2 วิดีโอรีวิว (Reels) · ความคิดเห็น, C2 วิดีโอรีวิว (Reels) · ส่งความคิดเห็นแล้ว
- Provisional names: React `ReelsOverlay` · Flutter `TmReelsOverlay`

### 3.8 Shop Header · Store Card · หัวร้าน และการ์ดร้าน (`shop-header`)

หน้าร้าน แบรนด์ดี และร้านในตัวแต่งร้าน

- Prototype: `.sbp-hd`, `.sbp-pills`, `.i-store`, `.sbp-cover`, `.sbp-id`, `.sbp-stats`
- Props: `Badge` (variant): **Official + Verified** / Verified · `Owner` (boolean): **false** / true
- Tokens: `--bw-2` `--c-ink` `--c-line` `--c-muted` `--c-white` `--fs-12` `--fs-16` `--lh-18` `--lh-24` `--r-12` `--r-16` `--s-12` `--s-16` `--s-2` `--s-24` `--s-4` `--s-6` `--s-8` `--sh-soft` `--tap`
- Used on 24 screens (phone 20, Desktop 2, Duo 2), e.g. F1 หน้าแรก, F1 หน้าแรก · หมวดกีฬา, F1 หน้าแรก · ดูสตอรี่
- Provisional names: React `ShopHeader`, `StoreCard` · Flutter `TmShopHeader`, `TmStoreCard`

### 3.9 Creator Header · หัวโปรไฟล์ครีเอเตอร์ (`creator-header`)

หน้าครีเอเตอร์และโปรไฟล์ ใช้หัวแบบเดียวกัน

- Prototype: `.i-prof`, `.i-stats`, `.i-stat`
- Props: `Following` (boolean): **false** / true · `Self` (boolean): **false** / true
- Tokens: `--bw-3` `--c-ink` `--c-muted` `--c-red` `--c-red-300` `--c-white` `--e-ring-gap` `--fs-14` `--fs-20` `--ic-18` `--lh-20` `--lh-30` `--r-24` `--s-12` `--s-16` `--s-4` `--s-64` `--s-8` `--tap` `--z-1` `--z-2`
- Used on 6 screens (phone 6, Desktop 0, Duo 0), e.g. หน้าเสริม · โปรไฟล์, หน้าเสริม · โปรไฟล์ · ติดตามแล้ว, F5 หน้าครีเอเตอร์
- Provisional names: React `CreatorHeader` · Flutter `TmCreatorHeader`

### 3.10 Shop Builder Parts · ชิ้นส่วนแต่งร้าน (`shop-builder-parts`)

ให้เจ้าของร้านแต่งหน้าร้านเอง ทำหลังหน้าร้านเสร็จ

- Prototype: `.sb-tools`, `.sb-status`, `.sb-rows`, `.sb-row`, `.sb-pub`, `.sb-tplc`, `.sb-tool`, `.sb-row--fixed`
- Props: `Row` (state): **On** / Off / Fixed · `Template` (state): Off / **On** · `Status` (variant): **Draft** / Scheduled / Live
- Tokens: `--bw-2` `--c-faint` `--c-grey` `--c-img` `--c-ink` `--c-line` `--c-muted` `--c-red` `--c-red-200` `--c-red-t` `--c-star-off` `--c-tint` `--c-white` `--fs-12` `--fs-14` `--fs-16` `--ic-18` `--ic-20` `--lh-18` `--lh-20` `--lh-24` `--r-10` `--r-12` `--r-16` `--r-4` `--r-6` `--r-pill` `--s-12` `--s-16` `--s-2` `--s-4` `--s-6` `--s-8` `--sh-card` `--sh-float` `--sh-tab` `--z-5`
- Used on 15 screens (phone 15, Desktop 0, Duo 0), e.g. SB แต่งหน้าร้าน (Shop Builder), SB แต่งหน้าร้าน (Shop Builder) · เลือกแบบเน้นสินค้าเด่น, SB แต่งหน้าร้าน (Shop Builder) · ลำดับ
- Provisional names: React `ShopBuilderParts` · Flutter `TmShopBuilderParts`

## Removed parts (never bring back)

- `.i-off`: ป้าย Official แดงทึบ เอาออกแล้ว ใช้ Trust Badge Kind=Official
- `.i-ship`: สติกเกอร์รถส่งฟรีบนรูป เอาออกแล้ว ใช้วงไอคอนบนรูปการ์ด
- `.i-phd--red`: หัวหน้าแดง เอาออกแล้ว หน้าลูกหัวขาว
