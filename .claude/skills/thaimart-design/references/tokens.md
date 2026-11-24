# Tokens (every CSS variable of proto/final/tokens.css)

Always write `var(--name)`; never the raw value. Colours carry their WCAG contrast in the role. The soft red top
`--fx-mood` (and `--fx-mood-grey` for Home and Order) is for the 4 tab pages only (Home, Discover, Order, Profile).
Section 11 holds one-component sizes: use one only in the component its role names. Live tokens (`--e-live-*`) belong
to the Live page. The same list as JSON: `tokens.json`. The font stack lives in `proto/shared/base.css`: `--font-ui` = `"Sukhumvit Tadmai", "Noto Sans Thai Looped", Thonburi, sans-serif`.

## 1 · colour

| Variable | Value | Role |
| --- | --- | --- |
| `--c-white` | `#FFFFFF` | surfaces; text and icons on red and on media |
| `--c-ink` | `#171717` | titles, body text, icons in header bars (17.9:1 on white, 16.6:1 on grey, 16.3:1 on tint) |
| `--c-ink-2` | `#3A3A3C` | secondary icon (search page camera), text in quiet chips (11.3:1 on white, 10.5:1 on grey) |
| `--c-muted` | `#66666B` | meta text, grey icons, struck price, tabs off (5.7:1 on white, 5.3:1 on grey, 5.1:1 on img) |
| `--c-tab` | `#6B6B6B` | tab bar label when off, disabled button text (5.3:1 on white, 4.6:1 on disabled) |
| `--c-faint` | `#A1A1A6` | icons only: disabled stepper, chevrons, seen story ring. Never text (2.6:1 on white) |
| `--c-idle` | `#D4D4D4` | idle indicators: sheet grab, pager dots, switch track off |
| `--c-control` | `#DBDBDB` | control borders: inputs, line buttons, filter chips, stepper |
| `--c-line` | `#ECECEE` | hairlines, dividers, card rings (1px) |
| `--c-disabled` | `#EDEDED` | disabled button fill (text --c-tab) |
| `--c-img` | `#F1F1F2` | image well behind a picture while it loads |
| `--c-grey` | `#F6F6F7` | page grey, quiet fills and chips, the 8px band between blocks |
| `--c-red` | `#E32321` | actions, prices, active tab, Live, trust fills (4.6:1 on white) |
| `--c-red-t` | `#D11F1D` | red text on the tint or on grey; pressed red (4.9:1 on tint, 5.0:1 on grey, 5.4:1 on white) |
| `--c-red-50` | `#FFF1F1` | red tint 50 = --c-tint: selected chip, notes, pressed follow, escrow note |
| `--c-red-100` | `#FDF2F2` | red tint 100: middle stop of the mood top |
| `--c-red-200` | `#F3B9B8` | red tint 200: dashed coupon edge, red-tinted rule on the tint |
| `--c-red-300` | `#F39E9D` | red tint 300: first stop of the mood top |
| `--c-star` | `#F5B400` | rating star (decorative, always next to the number) |
| `--c-star-off` | `#E5E5EA` | empty rating star |
| `--c-ok` | `#1B7A3E` | success text and icon (order done, bought) (4.8:1 on ok-tint, 5.4:1 on white) |
| `--c-ok-tint` | `#E7F6EC` | success tint behind --c-ok |
| `--c-warn` | `#7A5300` | warning text on --c-warn-tint (6.4:1 on warn-tint) |
| `--c-warn-tint` | `#FFF7E6` | warning tint |
| `--c-warn-fill` | `#F5A524` | warning dot or fill (never text) |
| `--c-media` | `#111111` | dark media pages (Live, Reels, story viewer) |
| `--c-brand-line` | `#06C755` | LINE mark (share sheet) |
| `--c-brand-fb` | `#1877F2` | Facebook mark |
| `--c-brand-ms` | `#0A7CFF` | Messenger mark |
| `--c-brand-ig` | `#D62976` | Instagram mark |
| `--c-brand-pp` | `#113566` | PromptPay mark |
| `--c-brand-visa` | `#1A1F71` | Visa mark |
| `--c-bank-kb` | `#138F2D` | bank marks in the "open your bank app" sheet: กสิกรไทย |
| `--c-bank-scb` | `#4E2A84` | ไทยพาณิชย์ |
| `--c-bank-ktb` | `#1BA5E1` | กรุงไทย |
| `--c-bank-bbl` | `#1E3A8A` | กรุงเทพ |
| `--c-bank-bay` | `#6B5B2E` | กรุงศรี |
| `--c-bank-ttb` | `#0050F0` | ทีทีบี |
| `--c-cert-tis` | `#2400ED` | มอก. mark (the designer's icon, trust.js TI.tis) |
| `--c-cert-fda` | `#275098` | อย. mark (TI.fda) |
| `--c-tint` | `var(--c-red-50)` = `#FFF1F1` | red tint: selected chip, notes, pressed follow, escrow note |
| `--c-glass` | `rgba(23, 23, 23, .48)` | round buttons and pills on photos and video (white icon) |
| `--c-glass-light` | `rgba(255, 255, 255, .72)` | root header button circle on the mood top (ink icon, 10:1) |
| `--c-glass-white` | `rgba(255, 255, 255, .92)` | light pill on media: tips, captions, host pill |
| `--c-shade` | `rgba(0, 0, 0, .38)` | top shade on photos so the status bar reads |
| `--c-scrim` | `rgba(0, 0, 0, .42)` | behind sheets |
| `--c-toast` | `rgba(23, 23, 23, .92)` | toast |
| `--c-track` | `rgba(255, 255, 255, .35)` | progress track on media: story bars, clip and replay scrub, the Reels bar, the shop intro clip bar |

## 2 · mood: the soft red top of the 4 tab pages only

| Variable | Value | Role |
| --- | --- | --- |
| `--fx-mood` | `linear-gradient(180deg, var(--c-red-300) 0, var(--c-red-100) 83px, var(--c-white) 114px)` = `linear-gradient(180deg, #F39E9D 0, #FDF2F2 83px, #FFFFFF 114px)` | the soft red top: Discover, Profile (.i--mood) |
| `--fx-mood-grey` | `linear-gradient(180deg, var(--c-red-300) 0, var(--c-red-100) 83px, var(--c-white) 114px, var(--c-white) 220px, var(--c-grey) 490px)` = `linear-gradient(180deg, #F39E9D 0, #FDF2F2 83px, #FFFFFF 114px, #FFFFFF 220px, #F6F6F7 490px)` | the soft red top on a grey page: Home, Order (.i--mood-grey) |
| `--g-shade-top` | `linear-gradient(180deg, var(--c-shade) 0, transparent 100%)` = `linear-gradient(180deg, rgba(0, 0, 0, .38) 0, transparent 100%)` | top shade on a photo |

## 3 · type: Sukhumvit Tadmai, 400 / 700 (base.css)

| Variable | Value | Role |
| --- | --- | --- |
| `--fs-12` | `12px` |  |
| `--fs-13` | `13px` |  |
| `--fs-14` | `14px` |  |
| `--fs-16` | `16px` |  |
| `--fs-18` | `18px` |  |
| `--fs-20` | `20px` |  |
| `--fs-24` | `24px` |  |
| `--fs-28` | `28px` |  |
| `--lh-18` | `18px` |  |
| `--lh-20` | `20px` |  |
| `--lh-22` | `22px` |  |
| `--lh-24` | `24px` |  |
| `--lh-26` | `26px` |  |
| `--lh-28` | `28px` |  |
| `--lh-30` | `30px` |  |
| `--lh-34` | `34px` |  |
| `--lh-36` | `36px` |  |
| `--lh-40` | `40px` |  |

## 4 · space: 4 px base; 2, 6, 10 only inside controls

| Variable | Value | Role |
| --- | --- | --- |
| `--s-2` | `2px` | control only: icon-to-label in tight pills, hairline offsets |
| `--s-4` | `4px` | icon to label, tight stacks |
| `--s-6` | `6px` | control only: chip inset, gap in pills |
| `--s-8` | `8px` | gap between chips and cards, band between blocks |
| `--s-10` | `10px` | control only: button and note insets |
| `--s-12` | `12px` | card inset, gap between rows |
| `--s-16` | `16px` | page gutter, card stacks |
| `--s-20` | `20px` | big control inset |
| `--s-24` | `24px` | section spacing |
| `--s-28` | `28px` | section spacing |
| `--s-32` | `32px` | large section spacing |
| `--s-40` | `40px` | block spacing |
| `--s-48` | `48px` | block spacing |
| `--s-56` | `56px` | block spacing |
| `--s-64` | `64px` | block spacing |

## 5 · radius

| Variable | Value | Role |
| --- | --- | --- |
| `--r-4` | `4px` | discount tag, small thumbs |
| `--r-6` | `6px` | Live tag, small tags, item option |
| `--r-8` | `8px` | small controls: sm button, stepper, thumbs |
| `--r-10` | `10px` | buttons, inputs, icon tiles |
| `--r-12` | `12px` | cards, notes, rows, toast |
| `--r-16` | `16px` | feature cards, banners, profile boxes |
| `--r-20` | `20px` | sheets (top corners) |
| `--r-24` | `24px` | bottom corners of covers and banners (shop, profile), big cards |
| `--r-pill` | `999px` | pills: chips, follow, count, avatars |

## 6 · elevation

| Variable | Value | Role |
| --- | --- | --- |
| `--sh-card` | `0 2px 10px rgba(0, 0, 0, .06)` | product cards, category chips (SPEC card shadow) |
| `--sh-soft` | `0 4px 16px rgba(23, 23, 23, .06), 0 1px 2px rgba(23, 23, 23, .04)` | Home feature cards: store card, profile post cards |
| `--sh-float` | `0 4px 16px rgba(0, 0, 0, .10)` | floating controls over content |
| `--sh-search` | `0 6px 18px rgba(0, 0, 0, .08)` | white boxes on the mood top: search fields, the order status box |
| `--sh-tab` | `0 -2px 12px rgba(0, 0, 0, .06)` | tab bar |
| `--sh-sheet` | `0 -8px 32px rgba(0, 0, 0, .14)` | bottom sheet |
| `--sh-toast` | `0 6px 18px rgba(0, 0, 0, .2)` | toast |
| `--ring-white` | `0 0 0 2px var(--c-white)` = `0 0 0 2px #FFFFFF` | white ring that lifts a chip off a picture |

## 7 · icon sizes (the icon draws inside a 44 tap target)

| Variable | Value | Role |
| --- | --- | --- |
| `--ic-12` | `12px` |  |
| `--ic-13` | `13px` |  |
| `--ic-14` | `14px` |  |
| `--ic-16` | `16px` |  |
| `--ic-18` | `18px` |  |
| `--ic-20` | `20px` |  |
| `--ic-22` | `22px` |  |
| `--ic-24` | `24px` |  |
| `--ic-26` | `26px` |  |
| `--ic-28` | `28px` |  |
| `--ic-32` | `32px` |  |

## 8 · border widths (1px hairlines are written as 1px)

| Variable | Value | Role |
| --- | --- | --- |
| `--bw-15` | `1.5px` | focusable control edge: checkbox, radio, count ring |
| `--bw-2` | `2px` | ring around avatars and chips on a picture, focus ring |
| `--bw-3` | `3px` | thick selection ring |
| `--bw-6` | `6px` | selected radio: the 6 red ring leaves an 8 white dot in the 20 circle (kit .i-radio, D5, Shop Builder .sb-radio) |

## 9 · tap target, layout, z layers, motion

| Variable | Value | Role |
| --- | --- | --- |
| `--w-screen` | `390px` | screen width |
| `--w-content` | `358px` | content width inside the 16 gutters |
| `--gutter` | `16px` | page gutter (= --s-16) |
| `--tap` | `44px` | minimum tap target |
| `--h-status` | `62px` | status bar |
| `--y-root-row` | `60px` | root header row top (Home, Discover, Order, Profile) |
| `--h-row` | `44px` | header row |
| `--h-phd` | `110px` | pushed header incl. status bar |
| `--h-shd` | `118px` | search header incl. status bar |
| `--h-tabbar` | `80px` | tab bar |
| `--h-actionbar` | `80px` | bottom action bar |
| `--pb-root` | `112px` | root page bottom padding (tab bar 80 + 32) |
| `--z-1` | `1` | above a picture |
| `--z-2` | `2` | above a fade or a sibling card |
| `--z-3` | `3` | header over page content |
| `--z-5` | `5` | floating buttons on media |
| `--z-header` | `30` | fixed pushed / search header |
| `--z-bar` | `40` | fixed bottom action / pay bar |
| `--z-tabbar` | `50` | tab bar |
| `--z-scrim` | `90` | kit sheet scrim |
| `--z-sheet` | `91` | kit sheet |
| `--z-toast` | `95` | toast |
| `--z-ov-scrim` | `100` | overlay scrim above kit sheets (gap.js) |
| `--z-ov-sheet` | `101` | overlay sheet (gap.js) |
| `--z-story` | `110` | full-screen story viewer |
| `--m-press` | `140ms` | press feedback (scale .96) |
| `--m-fast` | `200ms` | small state changes: dots, toggles |
| `--m-base` | `250ms` | focus glow, shadow change |
| `--m-page-out` | `220ms` | old page leaves |
| `--m-page-in` | `320ms` | new page arrives |
| `--m-tab` | `350ms` | active tab eases in |
| `--m-pop` | `420ms` | like / follow / save pop, vertical swipe |
| `--m-slow` | `700ms` | drop feedback |
| `--m-spin` | `800ms` | loader turn |
| `--m-fly` | `1600ms` | hearts float up (Live) |
| `--m-live` | `1800ms` | Live badge breathes |
| `--m-story` | `5s` | one story card |
| `--m-intro` | `12s` | shop intro video bar |
| `--ease-std` | `ease` | default |
| `--ease-out` | `cubic-bezier(.2, .8, .2, 1)` | page in, sheet up |
| `--ease-pop` | `cubic-bezier(.3, 1.6, .5, 1)` | pop with overshoot |
| `--ease-swipe` | `cubic-bezier(.3, .7, .2, 1)` | vertical swipe (Reels, Live) |
| `--ease-linear` | `linear` | progress bars, spinners |

## 11 · search, product, cart, checkout

| Variable | Value | Role |
| --- | --- | --- |
| `--g-rv-fade` | `linear-gradient(180deg, transparent 0, rgba(0, 0, 0, .64) 50%, rgba(0, 0, 0, .64) 100%)` | review video card (f3, a5): the bottom 96 behind the white 14/20 caption; both lines sit on .64 black, so white text keeps 7:1 even on a white fountain (--c-shade .38 gives 3:1 there) |

## 11 · shop, Shop Builder, post, Reels, compose

| Variable | Value | Role |
| --- | --- | --- |
| `--cmt-indent` | `44px` | comments: the text starts after the 32 avatar and its 12 gap (C1, C2 sheet, gap post); page rows add the 16 gutter |
| `--shop-logo-ring` | `4px` | shop page: the white ring around the 84 logo where it overlaps the cover (Figma 1432:7639) |
| `--sbm-frame` | `6px` | Shop Builder preview: the dark phone frame around the miniature storefront |
| `--sbm-9` | `9px` | Shop Builder preview: the storefront at about half size, stat labels |
| `--sbm-10` | `10px` | Shop Builder preview: pills in miniature |
| `--sbm-11` | `11px` | Shop Builder preview: meta, tabs, small labels in miniature |
| `--sbm-lh-12` | `12px` | Shop Builder preview: line under 9 |
| `--sbm-lh-16` | `16px` | Shop Builder preview: line under 10, 11 and 12 |
| `--g-reel-shade` | `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .12) 20%, rgba(0, 0, 0, .4) 45%, rgba(0, 0, 0, .62) 70%, rgba(0, 0, 0, .75) 100%)` | Reels: the shade under the name, caption and product tag so white text reads on any video |
| `--g-shop-clip` | `linear-gradient(180deg, rgba(227, 35, 33, .6) 2%, rgba(102, 102, 102, 0) 44%, rgba(0, 0, 0, .6) 100%)` | shop intro clip card (Figma 1432:7639): red at the top, dark at the foot under the views and title |
| `--g-clip-view` | `linear-gradient(180deg, rgba(0, 0, 0, .45) 0, rgba(0, 0, 0, 0) 22%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, .7) 100%)` | shop intro clip, full screen: shade under the bar and close, and under the shop and title |
| `--g-ban-sale` | `linear-gradient(120deg, var(--c-red) 0%, var(--c-red) 66%, #FF5B4F 100%)` = `linear-gradient(120deg, #E32321 0%, #E32321 66%, #FF5B4F 100%)` | shop banner ลดราคา: solid red under the text (white 4.6:1), lighter only behind the picture |
| `--g-ban-new` | `linear-gradient(120deg, var(--c-red-50) 0%, #FFD9D9 100%)` = `linear-gradient(120deg, #FFF1F1 0%, #FFD9D9 100%)` | shop banner สินค้าใหม่: red tint, red title, ink line |
| `--g-ban-live` | `linear-gradient(120deg, var(--c-ink) 0%, #B71C1A 100%)` = `linear-gradient(120deg, #171717 0%, #B71C1A 100%)` | shop banner ไลฟ์: ink to deep red, white text |
| `--g-flash` | `linear-gradient(160deg, var(--c-red-50), #FFE1E1)` = `linear-gradient(160deg, #FFF1F1, #FFE1E1)` | shop Flash Sale box (and its builder miniature) |

## 11 · kit, gap views, trust layer

| Variable | Value | Role |
| --- | --- | --- |
| `--e-ring-gap` | `3px` | white gap between an avatar ring and its picture: story 68 ring (2px line) round 58, own profile 88 round 78, creator 84 round 78: (box - 2 x line - picture) / 2 |
| `--e-check-top` | `18px` | cart row checkbox centred on the 80 picture: (80 - 44) / 2 |
| `--e-dot-top` | `6px` | unread dot centred on the first 20 line of a notification: (20 - 8) / 2 |
| `--e-play-badge` | `48px` | play badge on a video card (Discover, product page reviews): a badge drawing, not an icon of the set |
| `--e-live-s-3` | `3px` | Live: onair and views tag start inset |
| `--e-live-s-5` | `5px` | Live: onair and views tag end inset, product tag text top |
| `--e-live-s-15` | `15px` | Live: gap between chat lines |
| `--e-live-lh-16` | `16px` | Live: 12/16 compact meta (chat names, host sub line, was price, sold) |
| `--e-live-lh-19` | `19px` | Live: 14/19 compact names (chat lines, product tag, basket rows, ended-live cards) |
| `--e-live-lh-21` | `21px` | Live: 16/21 host name |
| `--e-live-lh-32` | `32px` | Live: B2 stepper value centred in 32 |
| `--e-live-stage` | `#2A2622` | Live: stage colour while the photo loads |
| `--e-live-fade-34` | `rgba(0, 0, 0, .34)` | Live: bottom fade, middle stop |
| `--e-live-fade-50` | `rgba(0, 0, 0, .5)` | Live: bottom fade, end stop |
| `--e-live-glass-40` | `rgba(0, 0, 0, .4)` | Live: views pill |
| `--e-live-replay` | `rgba(0, 0, 0, .6)` | Live: replay badge (gap Live view) |
| `--e-live-follow-on` | `rgba(255, 255, 255, .9)` | Live: pressed follow pill |
| `--e-live-mine` | `#FFE3E2` | Live: your own chat line |
| `--e-live-order` | `rgba(227, 35, 33, .88)` | Live: your order line in the chat |
| `--e-live-line` | `#EDEDED` | Live: B2 sheet foot hairline |

## 11 · component tokens (wave 2)

| Variable | Value | Role |
| --- | --- | --- |
| `--m-push` | `380ms` | page push / pop: the new page slides over from the right, the old one shifts --mv-under and dims |
| `--m-sheet` | `380ms` | sheet up (with --ease-page); down is --m-base |
| `--m-fade` | `160ms` | the short cross-fade: end of an edge swipe, and every move under reduced motion |
| `--m-busy` | `420ms` | spinner on ซื้อเลย / ชำระเงิน before the next page |
| `--m-confirm` | `600ms` | PromptPay: กำลังตรวจสอบการชำระเงิน before the check |
| `--m-check` | `400ms` | the success check draws itself |
| `--m-skeleton` | `320ms` | a lazy-loaded card shows its grey shapes this long (plus 40 per card in a row) |
| `--ease-page` | `cubic-bezier(.32, .72, 0, 1)` | page push / pop, sheet up, edge swipe: the iOS curve, calmer than --ease-out (less of the move in the first frames) |
| `--m-shimmer` | `1100ms` | one sweep of light across a skeleton card |
| `--m-refresh` | `900ms` | pull to refresh: the spinner turns this long while the page holds 56 down |
| `--m-cart` | `560ms` | the product picture flies to the cart |
| `--m-hold` | `220ms` | press and hold this long to pause a story |
| `--mv-under` | `30%` | how far the page under a push shifts left (back: comes in from there) |
| `--mv-rise` | `12px` | toasts and new chat lines rise this far as they come in |
| `--c-wash` | `rgba(0, 0, 0, .04)` | ร้านทางการ / ของแท้ / ยืนยันตัวตน pills and the Home badge row |
| `--c-wash-2` | `#F5F5F5` | product page badge tags, order status tiles |
| `--sh-ic` | `0 1px 1.55px rgba(0, 0, 0, .09)` | the white 24 icon circles on a card picture (drop shadow) |
| `--sh-pcard` | `0 1px 4px 1px rgba(0, 0, 0, .1)` | the product card |
| `--c-red-wash` | `rgba(227, 35, 33, .13)` | the Discover compose button behind the pencil (Figma 2518:4605) |

## Type pairs

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
