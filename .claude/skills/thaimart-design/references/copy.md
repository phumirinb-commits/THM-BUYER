# Thai copy

All UI copy is Thai. Write like a friendly shop assistant talking to a neighbour: short, plain, everyday words.

## Rules

1. **ภาษาไทยง่าย สั้น เหมือนคุยกัน.** One idea per line. Words people use every day, not legal or formal Thai.
2. **Say what the user gets, plainly.** "Thaimart ถือเงินไว้ให้ จนคุณได้รับของ" beats "ระบบ Escrow คุ้มครองผู้ซื้อ".
3. **No urgency, no shouting.** No countdowns to push a sale, no "!!!", no ALL CAPS, no "รีบเลย".
4. **Never the em dash.** Use a space, a middle dot ` · ` or a new line. It reads as machine-written.
5. **Thai first.** English only for names (PetCare Official Store, Reels, Live in a badge, PromptPay).
6. **Numbers the way Thai apps show them:** ฿2,499 · ขายแล้ว 8.6K · 4.8 (2,316) · −40% · 31 ต.ค. 2569 · 10:12 น.
7. **Badges say only what the data proves** (see the badge table). Never "ของแท้ 100%", "ถูกที่สุด", "ส่งไวทันใจ".
8. **Do not mention voice search at all,** not even to say it is missing; the keyboard's mic already covers it.
9. **Buttons are verbs, 1 to 3 words:** ซื้อเลย · เพิ่มลงในตะกร้า · ชำระเงิน · ติดตาม · ดูทั้งหมด · ยืนยันรับสินค้า.
10. **Icon buttons get a Thai `aria-label`:** "ย้อนกลับ", "ค้นหาสินค้า", "ตะกร้า 2 ชิ้น", "การแจ้งเตือน ยังไม่อ่าน 3 รายการ".

## Examples

| Do | Don't |
| --- | --- |
| รับรอง มอก. · ปลอมคืนเงิน 2 เท่า · จัดส่งฟรี | Authentic Guarantee รับประกันความถูกต้องของผลิตภัณฑ์ คืนเงินเต็มจำนวน 100%!!! |
| Thaimart ถือเงินไว้ให้ จนคุณได้รับของ | ระบบ Escrow คุ้มครองผู้ซื้อตามเงื่อนไขที่บริษัทกำหนด |
| ชำระภายใน 10:12 น. วันนี้ ร้านจะเริ่มเตรียมของหลังชำระ | รีบเลย! เหลือเวลาอีก 00:04:59 ราคานี้จะไม่มีอีกแล้ว |
| ส่งจาก กรุงเทพฯ · ได้รับ 2 ถึง 3 พ.ย. | จัดส่งฟรี จัดส่งฟรี (repeating a badge in a row) |
| ค้นหาสินค้าหรือร้านค้า | Search products... |
| เขียนโพสต์... | What's on your mind? |
| ร้านทางการ | Official seller · Official Store badge in English |

## Names in the data

Use the people, shops and products of `content/final-bible.json` (sample user ชรัณย์ มีเดช, shops such as PetCare Official
Store, products such as น้ำพุแมวอัตโนมัติ). Do not invent new brands or prices for screens that already exist.
