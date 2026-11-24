// SIRINTRA Official's own products (mock): 6 handmade krajood bags, photos in assets/images/sirintra.
// Added to window.MOCK after mock.js and details.js, so data.js builds them like every other product.
// The shop page, shelves, story and Discover post use these ids (SIRINTRA_IDS).

(() => {
  const M = window.MOCK;
  const SHOP = { name: 'SIRINTRA Official', avatar: 'assets/images/shop_logo_sirintra.jpg', mark: 'official' };
  const BAGS = [
    { key: 'bucket', title: 'กระเป๋าสานกระจูด ทรงถัง หูหนัง พู่ห้อย', price: 1190, originalPrice: 1700, off: 30, rating: '4.9', sold: 3200,
      intro: 'กระเป๋าถือสานกระจูด ทรงถังทรงสูง หูหนังสีน้ำตาลคู่ ห้อยพู่กระจูดกับลูกปัดไม้ งานทำมือจากชุมชนภาคใต้',
      hl: ['สานกระจูดธรรมชาติลายสอง แข็งแรง น้ำหนักเบา', 'ขอบปากและหูจับหนัง PU สีน้ำตาล หมุดทองเหลือง', 'ทรงถังสูง ใส่ร่ม ขวดน้ำ และของใช้ประจำวันได้สบาย', 'สูง 25 ซม. กว้าง 22 ซม. · เช็ดด้วยผ้าหมาด เก็บในที่แห้ง'] },
    { key: 'square', title: 'กระเป๋าถือสานกระจูด ทรงสี่เหลี่ยม พู่ห้อย', price: 1032, originalPrice: 1290, off: 20, rating: '4.8', sold: 5100,
      intro: 'กระเป๋าถือสานกระจูด ทรงสี่เหลี่ยมคลาสสิก หูหนังทรงโค้ง ห้อยพู่กระจูดกับลูกปัดไม้ ถือได้ทุกวัน',
      hl: ['สานกระจูดลายสองแน่น ทรงไม่ยุบ', 'หูหนังทรงโค้ง จับถนัดมือ หมุดทองเหลือง', 'ใส่โทรศัพท์ กระเป๋าสตางค์ เครื่องสำอางได้พอดี', 'กว้าง 26 ซม. สูง 20 ซม. ลึก 11 ซม.'] },
    { key: 'clutch', title: 'กระเป๋าคลัตช์สานกระจูด ขอบหนัง กระดุมทอง', price: 690, originalPrice: 690, off: 0, rating: '4.8', sold: 2600,
      intro: 'กระเป๋าคลัตช์สานกระจูด ฝาโค้งขอบหนังสีน้ำตาล ปิดด้วยแถบหนังกระดุมทอง ถือออกงานหรือใส่ในกระเป๋าใบใหญ่ก็ได้',
      hl: ['สานกระจูดลายสองละเอียด ขอบหนังเย็บรอบใบ', 'แถบหนังกระดุมแป๊กสีทอง เปิดปิดง่าย', 'ใส่โทรศัพท์ บัตร และลิปสติกได้พอดี', 'กว้าง 24 ซม. สูง 12 ซม.'] },
    { key: 'moon', title: 'กระเป๋าสะพายข้างสานกระจูด ทรงพระจันทร์', price: 1251, originalPrice: 1390, off: 10, rating: '4.9', sold: 4700,
      intro: 'กระเป๋าสะพายข้างสานกระจูด ทรงพระจันทร์ครึ่งเสี้ยว ขอบหนังสีน้ำตาล แถบหัวเข็มขัดทอง สายปรับความยาวได้',
      hl: ['สานกระจูดธรรมชาติ ขอบหนังเย็บรอบใบ', 'หัวเข็มขัดสีทองด้านหน้า ฝาปิดด้วยแม่เหล็ก', 'สายหนังปรับยาวได้ สะพายไหล่หรือครอสบอดี้', 'กว้าง 25 ซม. สูง 18 ซม.'] },
    { key: 'round', title: 'กระเป๋าสานกระจูด ทรงกลม พู่ห้อย', price: 890, originalPrice: 890, off: 0, rating: '4.8', sold: 3900,
      intro: 'กระเป๋าถือสานกระจูด ทรงกลมลายก้นหอย หูถักกระจูดเส้นใหญ่ ห้อยพู่คู่กับลูกปัดไม้ เข้ากับชุดเที่ยวทะเล',
      hl: ['สานเกลียวก้นหอยทั้งใบ งานทำมือทีละใบ', 'หูถักกระจูด ยึดด้วยแผ่นหนังและหมุดทอง', 'ใส่โทรศัพท์ กระเป๋าสตางค์ และแว่นกันแดดได้', 'เส้นผ่านศูนย์กลาง 25 ซม.'] },
    { key: 'tote', title: 'กระเป๋าโท้ทสานกระจูด สะพายไหล่ หูหนัง', price: 1425, originalPrice: 1500, off: 5, rating: '4.9', sold: 2800,
      intro: 'กระเป๋าโท้ทสานกระจูด ใบใหญ่ หูหนังยาวสะพายไหล่ได้ ขอบปากหนังสีน้ำตาล ใช้ไปทำงานหรือไปเที่ยวก็ได้',
      hl: ['สานกระจูดลายสอง ทรงตั้งได้ ไม่ยุบ', 'หูหนังยาว สะพายไหล่ได้สบาย หมุดทองเหลือง', 'ใส่แท็บเล็ต 11 นิ้ว ร่ม และของใช้ได้ครบ', 'กว้าง 34 ซม. สูง 26 ซม. ลึก 13 ซม.'] },
  ];
  const start = M.products.length;
  const ids = BAGS.map((_, i) => start + i);
  BAGS.forEach((b, i) => {
    const id = start + i;
    const image = `assets/images/sirintra/bag_${b.key}.jpg`;
    M.products.push({
      title: b.title, image, originalPrice: b.originalPrice, price: b.price,
      discount: b.off ? { type: 'percent', value: b.off } : null,
      rating: b.rating, soldCount: b.sold,
      badges: ['assets/icons/money_security_red.svg', 'assets/icons/delivery_truck.svg'],
      mall: true, shopVerified: false, crop: null, badgeInset: 6,
    });
    M.details[id] = {
      gallery: [
        { image, zoom: 1, fx: 0, fy: 0 },
        { image, zoom: 1.6, fx: 0, fy: 0 },
        { image, zoom: 1.9, fx: -0.5, fy: -0.4 },
        { image, zoom: 1.9, fx: 0.5, fy: 0.5 },
      ],
      intro: [b.intro], highlights: b.hl, videos: [],
      shop: SHOP,
      related: ids.filter((x) => x !== id),
      fda: null, tis: null,
    };
    window.PRODUCT_DESC[id] = [b.intro, b.hl];
  });
  // Home สินค้าแนะนำ grid: spread the bags through both columns near the top.
  [[M.leftColumn, [2, 6, 10], [0, 2, 4]], [M.rightColumn, [1, 5, 9], [1, 3, 5]]].forEach(([col, at, pick]) => {
    at.forEach((pos, k) => col.splice(pos, 0, ids[pick[k]]));
  });
  // By key, for the shop page, shelves, story and post.
  window.SIRINTRA = Object.fromEntries(BAGS.map((b, i) => [b.key, start + i]));
  window.SIRINTRA_IDS = ids;
})();
