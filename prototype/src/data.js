// Data for the prototype, built on window.MOCK (src/mock.js, exported from the Flutter mocks).
// Everything here is mock data.

(() => {
  const M = window.MOCK;
  const ICON = {
    'assets/icons/tis_badge_small.svg': 'tis',
    'assets/icons/fda_badge.svg': 'fda',
    'assets/icons/money_security_red.svg': 'x2',
    'assets/icons/delivery_truck.svg': 'truck',
  };

  // Products: prices stay at or under ฿100,000 (the old ฿1.45M demo is dropped).
  const products = M.products.map((p, id) => {
    const trust = p.badges.map((b) => ICON[b]).filter(Boolean);
    const genuine = trust.includes('x2'); // x2 only ever sits on genuine goods
    return {
      id,
      title: p.title,
      image: p.image,
      crop: p.crop,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount && p.price < p.originalPrice ? p.discount : null,
      rating: p.rating,
      soldCount: p.soldCount,
      trust,
      genuine,
      std808: !!p.std808, // มาตรฐาน 808 (green leaf badge)
      // Official = the brand's own shop; Mall = an authorised reseller; or neither.
      shopBadge: p.mall ? 'official' : p.shopVerified ? 'mall' : null,
      hidden: p.price > 100000,
    };
  });
  const ok = (ids) => ids.filter((i) => !products[i].hidden);

  const columns = {
    0: [ok(M.leftColumn), ok(M.rightColumn)],
    ...Object.fromEntries(Object.entries(M.categoryColumns).map(([k, [l, r]]) => [k, [ok(l), ok(r)]])),
  };

  const CAT_ICONS = ['thumbs-up', 'fork-knife', 'flower-lotus', 'dress', 'house-line', 'baby', 'paw-print', 'laptop', 'car', 'wrench', 'soccer-ball', 'puzzle-piece', 'note-pencil', 'leaf', 'squares-four'];
  const categories = M.categories.map((c, i) => ({ label: c.label, icon: CAT_ICONS[i] }));

  // Shops for the "ร้านดีแนะนำ" cards.
  const shopBadgeOf = (b) => (b.mall ? 'official' : b.verified ? 'mall' : null);
  // idVerified (mock): shops that passed Thaimart's identity check show the blue seal by their name.
  const brands = M.brands.map((b, i) => ({ ...b, badge: shopBadgeOf(b), idVerified: [0, 1, 2, 4].includes(i) }));
  const categoryBrands = Object.fromEntries(Object.entries(M.categoryBrands).map(([k, list]) => [k, list.map((b) => ({ ...b, badge: shopBadgeOf(b) }))]));

  // Stories: live first, then not yet seen, then seen (grey ring).
  const storyShops = [
    // Live room from Figma 2506:449 (mock host).
    { name: 'nachum.ploy', image: 'assets/images/live/live_bg.jpg', live: true, seen: false, badge: null, room: 'ploy' },
    { name: 'ครามสกล', image: 'assets/images/avatar_kramsakon.png', live: true, seen: false, badge: 'mall', room: 'kram' },
    { name: 'บ้านกาแฟดอย', image: 'assets/images/story_baan_kafae.png', live: true, seen: false, badge: 'official' },
    { name: 'ขนมบ้านนุ่น', image: 'assets/images/product_cookies.jpg', live: true, seen: false, badge: null },
    { name: 'SIRINTRA Official', image: 'assets/images/shop_logo_sirintra.jpg', live: false, seen: false, badge: 'official' },
    { name: 'บ้านกาแฟดอย สาขา 2', image: 'assets/images/story_baan_kafae_2.png', live: false, seen: false, badge: 'official', zoom: 62 / 56 },
    { name: 'สวนเล็กของมิ้น', image: 'assets/images/product_monstera.jpg', live: false, seen: false, badge: null },
    { name: 'ป้าแว่น', image: 'assets/images/story_pa_waen.png', live: false, seen: true, badge: 'mall', zoom: 62 / 56 },
    { name: 'ตุ๊กตาน้องกระต่าย', image: 'assets/images/product_bunny_plush.jpg', live: false, seen: true, badge: null },
  ];
  const rank = (s) => (s.live ? 0 : s.seen ? 2 : 1);

  // Live rooms opened from a live story. 'ploy' is the Figma room; the others reuse
  // the shop's own story photo and its category's products (mock).
  const catIds = (c) => [...columns[c][0], ...columns[c][1]];
  const liveRooms = {
    // Stream: assets/videos/live_makeup.mp4 (1280x720, 27s loop); the avatar is the host from its first frame.
    ploy: { name: 'nachum.ploy', avatar: 'assets/images/live/live_video_poster.jpg', avatarPos: '48% 27%', avatarZoom: 3.2, bg: 'assets/images/live/live_video_poster.jpg', video: 'assets/videos/live_makeup.mp4', videoPos: '50% 50%', followers: 1240, viewers: 2431, products: catIds(2).slice(0, 8), pinned: 29, pinnedImage: 'assets/images/live/live_serum.jpg' },
    // Second room: assets/videos/live_fashion.mp4 (1280x720, 12s loop), fashion products.
    kram: { chat: 'fashion', name: 'ครามสกล', avatar: 'assets/images/live/live_video2_poster.jpg', avatarPos: '42% 30%', avatarZoom: 2.6, bg: 'assets/images/live/live_video2_poster.jpg', video: 'assets/videos/live_fashion.mp4', videoPos: '45% 50%', followers: 3520, viewers: 1187, products: catIds(3).slice(0, 8), pinned: catIds(3)[0] },
  };
  /** Story indexes of every room that is live now, in story order (the Live feed). */
  const liveIndexes = storyShops.map((s, i) => (s.live ? i : -1)).filter((i) => i >= 0);
  const LIVE_CAT = { 'ครามสกล': 3, 'บ้านกาแฟดอย': 1, 'ขนมบ้านนุ่น': 1 };
  const liveRoomFor = (i) => {
    const s = storyShops[i];
    if (!s || !s.live) return null;
    if (s.room) return { ...liveRooms[s.room], badge: s.badge };
    const ids = catIds(LIVE_CAT[s.name] || 1).slice(0, 8);
    return { name: s.name, avatar: s.image, bg: s.image, followers: 860 + i * 137, viewers: 512 + i * 211, products: ids, pinned: ids[0], badge: s.badge };
  };
  const liveViewers = [
    { name: 'Mine', avatar: 'assets/images/live/viewer_1.jpg' },
    { name: 'Ploy', avatar: 'assets/images/live/viewer_4.jpg' },
    { name: 'แพรวา', avatar: 'assets/images/live/viewer_2.jpg' },
    { name: 'Jane', avatar: 'assets/images/live/viewer_3.jpg' },
  ];
  const fashionChat = [
    [0, 'ตัวสีส้มมีไซส์ M ไหมคะ?'],
    [2, 'ผ้าเป็นผ้าอะไรคะ ใส่ร้อนไหม'],
    [1, 'ขอดูตัวเสื้อเชิ้ตสีฟ้าใกล้ๆ หน่อยค่ะ'],
    [3, 'กระเป๋าใบนั้นยังมีไหมคะ'],
    [0, 'สั่งไปสองตัวแล้วค่ะ'],
    [2, 'ส่งต่างจังหวัดกี่วันคะ?'],
    [1, 'ร้านนี้ผ้าดีจริง ซื้อประจำ'],
    [3, 'รอของเลยค่ะ'],
  ];
  const liveChat = [
    [0, 'ผิวแพ้ง่ายใช้ได้ไหมคะ ใช้คู่กับวิตามินซีได้หรือเปล่า?'],
    [2, 'เหมาะกับผิวมันไหมคะ?'],
    [1, 'ใช้มา 3 สัปดาห์ หน้าดูชุ่มชื้นขึ้นจริง เนื้อบางซึมไว'],
    [3, 'ขอดูเนื้อเซรั่มใกล้ๆ หน่อยค่ะ'],
    [0, 'สั่งแล้วค่ะ ส่งไวมาก'],
    [2, 'ราคานี้ถึงกี่โมงคะ?'],
    [1, 'ของแท้แน่นอน เคยซื้อร้านนี้แล้ว'],
    [3, 'กดตะกร้าแล้ว รอของเลย'],
  ];
  storyShops.sort((a, b) => rank(a) - rank(b));

  // Brand Day campaign. It ends three days after today starts, so the preview always has time left.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const campaign = {
    image: 'assets/images/campaign_brand_day_v3.jpg',
    label: 'Thaimart Brand Day โปรโมชั่นพิเศษจากแบรนด์ชั้นนำ',
    aspectRatio: 1343 / 1171,
    // Where the countdown sits: over the empty space above the podium (from the art's bottom).
    countdownBottom: '20.5%',
    endsAt: new Date(today.getTime() + 3 * 86400000 - 1000),
    // The campaign's own banner (save it here); falls back to the free-shipping banner until then.
    promo: 'assets/images/campaign_brand_day_promo.png',
    promoFallback: 'assets/images/banner_free_shipping.png',
  };

  // Brands taking part: the shops' logos (some reuse product photos for now).
  const logo = (name, image) => ({ name, image });
  // Brands from Figma 3782:15397 (logos only). Mock: the 10 repeat over 4 pages, like the Figma pager.
  const FIGMA_BRANDS = ["POND'S", 'SRICHAND', 'Oriental Princess', 'bsc cosmetology', 'VISTRA', 'Euro Cake', 'MAMA', 'ดอยคำ', 'Birdy', 'Scotch'];
  const brandLogos = FIGMA_BRANDS.map((name, i) => logo(name, `assets/images/brands/brand_${i + 1}.png`));
  const campaignBrands = [0, 1, 2, 3].flatMap(() => brandLogos);

  // Deal products: discounted goods, the biggest cut first.
  const cut = (p) => (p.originalPrice - p.price) / p.originalPrice;
  const dealIds = products.filter((p) => !p.hidden && p.discount).sort((a, b) => cut(b) - cut(a)).slice(0, 12).map((p) => p.id);

  // ส่งฟรีไม่อั้น ทุกออเดอร์ (year-end campaign) first, then the kit banners.
  const freeShip = { label: 'แฟดไทยมาร์ท มอบความสุขส่งท้ายปี ส่งฟรีไม่อั้น ทุกออเดอร์ ถึงวันที่ 31 ธันวาคม 2569', layers: ['assets/images/promo_freeship.png'], artTop: 0, artHeight: '100%', pos: '50% 50%' };
  const banners = [freeShip, { ...M.banners[0], pos: '0% 50%' }, M.banners[1], M.banners[2]];

  // Reviews (mock): the same three buyers, with photos from the product's own gallery.
  const reviewers = [
    { name: 'มะปราง ส.', avatar: 'assets/images/story_you_profile.jpg' },
    { name: 'คุณต้น', avatar: 'assets/images/avatar_kramsakon.png' },
    { name: 'Nok Bangkok', avatar: 'assets/images/avatar_sirintra.png' },
  ];
  const reviewsFor = (id) => {
    const d = M.details[id];
    const pics = d.gallery.map((g) => g.image);
    const video = d.videos[0]?.thumbnail;
    return [
      { ...reviewers[0], stars: 5, date: '8 พ.ย. 2569', text: 'ของตรงปก แพ็กมาดีมาก ส่งไวกว่าที่คิด ใช้ไปหนึ่งอาทิตย์แล้วยังโอเค', media: [{ image: pics[0] }, video ? { image: video, video: true } : { image: pics[1] }] },
      { ...reviewers[1], stars: 4, date: '2 พ.ย. 2569', text: 'คุณภาพดีเกินราคา ถามร้านแล้วตอบไว แนะนำเลยครับ', media: [] },
      { ...reviewers[2], stars: 5, date: '28 ต.ค. 2569', text: 'ซื้อรอบที่สองแล้ว ของแท้แน่นอน', media: [{ image: pics[2] }] },
    ];
  };

  const detailFor = (id) => {
    const d = M.details[id];
    const p = products[id];
    return {
      gallery: d.gallery,
      // Written description per product (src/details.js) when there is one.
      intro: (window.PRODUCT_DESC && window.PRODUCT_DESC[id]) ? [window.PRODUCT_DESC[id][0]] : d.intro,
      highlights: (window.PRODUCT_DESC && window.PRODUCT_DESC[id]) ? window.PRODUCT_DESC[id][1] : d.highlights,
      videos: d.videos,
      shop: d.shop && { name: d.shop.name, avatar: d.shop.avatar, badge: p.shopBadge, verified: p.shopBadge !== null || id % 3 === 0 },
      related: ok(d.related).filter((r) => r !== id),
      fda: d.fda,
      tis: d.tis,
      reviews: reviewsFor(id),
    };
  };

  window.DATA = { fashionChat, liveIndexes, liveRoomFor, liveViewers, liveChat, products, columns, categories, brands, categoryBrands, storyShops, campaign, campaignBrands, dealIds, banners, detailFor, fountainId: M.fountainId };
})();
