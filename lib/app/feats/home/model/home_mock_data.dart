import '../../../shared/constants/app_assets.dart';
import 'home_campaign.dart';
import 'home_models.dart';

/// Content shown in the Figma frame "iPhone 13 & 14 - 78".
abstract final class HomeMockData {
  /// Items in the cart (header count pill).
  static const cartCount = 100;

  /// The Home campaign. To turn it off, set [HomeCampaign.enabled] to false;
  /// to change when it runs, edit startsAt / endsAt (it hides by itself at
  /// endsAt). Preview links can force it: ?campaign=on or ?campaign=off.
  static final brandDay = HomeCampaign(
    enabled: true,
    startsAt: DateTime(2026, 11, 1),
    endsAt: DateTime(2026, 11, 11, 23, 59, 59),
    image: AppImages.campaignBrandDay,
    label: 'Thaimart Brand Day โปรโมชั่นพิเศษจากแบรนด์ชั้นนำ',
    aspectRatio: 1672 / 941,
  );

  static const stories = [
    HomeStory(name: 'สตอรี่ของคุณ', image: AppImages.storyYou, badge: StoryBadge.add),
    HomeStory(name: 'ครามสกล', image: AppImages.avatarKramsakon, badge: StoryBadge.live, shopMark: ShopMark.verified),
    HomeStory(name: 'บ้านกาแฟดอย', image: AppImages.storyBaanKafae, badge: StoryBadge.live, shopMark: ShopMark.mall),
    HomeStory(
      name: 'ป้าแว่น',
      image: AppImages.storyPaWaen,
      zoom: 62 / 56,
      hasStory: false,
      shopMark: ShopMark.verified,
    ),
    HomeStory(name: 'บ้านกาแฟดอย', image: AppImages.storyBaanKafae2, zoom: 62 / 56, shopMark: ShopMark.mall),
    // Small sellers, not Mall and not verified yet: no mark on the ring.
    HomeStory(name: 'ขนมบ้านนุ่น', image: AppImages.productCookies, badge: StoryBadge.live),
    HomeStory(name: 'สวนเล็กของมิ้น', image: AppImages.productMonstera),
    HomeStory(name: 'ตุ๊กตาน้องกระต่าย', image: AppImages.productBunnyPlush, hasStory: false),
  ];

  static const trusts = [
    HomeTrust(icon: AppImages.genuineAward, label: 'ของแท้ต้องไทยมาร์ท', iconSize: 24),
    HomeTrust(icon: AppIcons.moneySecurity, label: 'ปลอมคืนเงิน 2 เท่า'),
  ];

  // The food banner's art is 118 high, shifted 11 up so its copy sits centred.
  static const _foodBanner = HomeBanner(
    label: 'ของกินคุณภาพ จากผู้ประกอบการทั่วไทย ช้อปเลย',
    layers: [AppImages.promoBannerBg, AppImages.promoBannerFg],
    artTop: -11,
    artHeight: 118,
  );
  static const _freeShippingBanner = HomeBanner(
    label: 'จัดส่งฟรี สำหรับคำสั่งซื้อที่ร่วมรายการ',
    layers: [AppImages.bannerFreeShipping],
  );
  static const _affiliateBanner = HomeBanner(
    label: 'Affiliate สร้างรายได้จากการแนะนำสินค้า รับค่าคอมมิชชั่นสูงสุด 10%',
    layers: [AppImages.bannerAffiliate],
  );

  /// Three real banners so far; the food banner fills the other slots until
  /// more campaigns arrive. HomePromoBanner shows at most 5.
  static const banners = [_foodBanner, _freeShippingBanner, _affiliateBanner, _foodBanner, _foodBanner];

  static const brands = [
    HomeBrand(
      name: 'ครามสกล',
      tagline: 'เดรสและผ้าคราม',
      coverImage: AppImages.brand1Main,
      avatar: AppImages.avatarKramsakon,
    ),
    HomeBrand(
      name: 'SIRINTRA Official',
      tagline: 'กระเป๋าสานทำมือ',
      coverImage: AppImages.brand2Main,
      avatar: AppImages.avatarSirintra,
      isMall: true,
    ),
    // The three below reuse existing images as placeholders — swap in each
    // shop's own photos when they exist.
    HomeBrand(
      name: 'Oxford Studio',
      tagline: 'เสื้อเชิ้ตผ้าระบายอากาศ',
      coverImage: AppImages.productShirt,
      avatar: AppImages.storyBaanKafae2,
    ),
    HomeBrand(
      name: 'Green Haven',
      tagline: 'ต้นไม้และของแต่งบ้าน',
      coverImage: AppImages.storyBaanKafae,
      avatar: AppImages.storyBaanKafae,
      isVerified: false,
    ),
    HomeBrand(
      name: 'ป้าแว่น ของใช้ในบ้าน',
      tagline: 'ปลั๊กไฟและของใช้จำเป็น',
      coverImage: AppImages.productPowerStrip,
      avatar: AppImages.storyPaWaen,
    ),
  ];

  /// Recommended shops shown above the products of a category, by index in
  /// [categories]. Sample shops; covers and logos reuse their product photos.
  static const categoryBrands = <int, List<HomeBrand>>{
    // อาหารและเครื่องดื่ม: logos from the shops; covers reuse product photos
    // (Jeedjard has no product photo yet, so its logo is the cover too).
    1: [
      HomeBrand(
        name: 'อสร.',
        tagline: 'อาหารสำเร็จรูป ตั้งแต่ 2498',
        coverImage: AppImages.productGranola,
        avatar: AppImages.logoPfo,
        isMall: true,
      ),
      HomeBrand(
        name: 'Santipanich Roaster Company',
        tagline: 'โรงคั่วกาแฟ คั่วสดทุกสัปดาห์',
        coverImage: AppImages.productCoffeeBeans,
        avatar: AppImages.logoSantipanich,
      ),
      HomeBrand(
        name: 'Sosoulful Cafe and Restaurant',
        tagline: 'คาเฟ่และร้านอาหาร',
        coverImage: AppImages.productGreenTea,
        avatar: AppImages.logoSosoulful,
        isVerified: false,
      ),
      HomeBrand(
        name: 'ซินซินหม่าล่าทั่ง',
        tagline: 'หม่าล่าทั่งและน้ำซุปหม่าล่า',
        coverImage: AppImages.productCookies,
        avatar: AppImages.logoXinxin,
      ),
      HomeBrand(
        name: 'Jeedjard',
        tagline: 'ขนมรสจี๊ดจ๊าด',
        coverImage: AppImages.logoJeedjard,
        avatar: AppImages.logoJeedjard,
      ),
      HomeBrand(
        name: 'Honey Jar',
        tagline: 'น้ำผึ้งแท้และแยมผลไม้',
        coverImage: AppImages.productHoney,
        avatar: AppImages.logoHoneyJar,
        isMall: true,
      ),
      HomeBrand(
        name: 'Bread & Brew',
        tagline: 'ขนมปังอบใหม่และกาแฟ',
        coverImage: AppImages.productBread,
        avatar: AppImages.logoBreadAndBrew,
      ),
      HomeBrand(
        name: 'Fresh Spoon',
        tagline: 'นมสดและอาหารเช้า',
        coverImage: AppImages.productMilk,
        avatar: AppImages.logoFreshSpoon,
        isVerified: false,
      ),
      HomeBrand(
        name: 'Snack Story',
        tagline: 'ขนมขบเคี้ยวและเครื่องดื่ม',
        coverImage: AppImages.productPotatoChips,
        avatar: AppImages.logoSnackStory,
      ),
      HomeBrand(
        name: 'Fruit Pop',
        tagline: 'น้ำผลไม้และแยมสด',
        coverImage: AppImages.productStrawberryJam,
        avatar: AppImages.logoFruitPop,
      ),
    ],
    // สุขภาพและความงาม: sample shops; logos are their product photos for now.
    2: [
      HomeBrand(
        name: 'Glow Lab',
        tagline: 'เซรั่มและสกินแคร์',
        coverImage: AppImages.productSerum,
        avatar: AppImages.productSerum,
        isMall: true,
      ),
      HomeBrand(
        name: 'Sunday Skin',
        tagline: 'กันแดดสำหรับทุกวัน',
        coverImage: AppImages.productSunscreen,
        avatar: AppImages.productSunscreen,
      ),
      HomeBrand(
        name: 'Rose Lip Studio',
        tagline: 'ลิปสติกและเมคอัพ',
        coverImage: AppImages.productLipstick,
        avatar: AppImages.productLipstick,
      ),
      HomeBrand(
        name: 'Pure Clean',
        tagline: 'คลีนซิ่งและเช็ดเครื่องสำอาง',
        coverImage: AppImages.productMicellarWater,
        avatar: AppImages.productMicellarWater,
        isVerified: false,
      ),
      HomeBrand(
        name: 'Silky Hair',
        tagline: 'ดูแลเส้นผม',
        coverImage: AppImages.productHairOil,
        avatar: AppImages.productHairOil,
      ),
    ],
    // แฟชั่น: sample shops; logos are their product photos for now.
    3: [
      HomeBrand(
        name: 'Daily Fashion',
        tagline: 'เสื้อผ้าใส่ได้ทุกวัน',
        coverImage: AppImages.productOversizedTee,
        avatar: AppImages.productOversizedTee,
        isMall: true,
      ),
      HomeBrand(
        name: 'Denim House',
        tagline: 'ยีนส์ทุกทรง',
        coverImage: AppImages.productJeans,
        avatar: AppImages.productJeans,
      ),
      HomeBrand(
        name: 'Moon Bag',
        tagline: 'กระเป๋าหนัง',
        coverImage: AppImages.productShoulderBag,
        avatar: AppImages.productShoulderBag,
      ),
      HomeBrand(
        name: 'Pleat & Co.',
        tagline: 'กระโปรงและเดรส',
        coverImage: AppImages.productPleatedSkirt,
        avatar: AppImages.productPleatedSkirt,
        isVerified: false,
      ),
      HomeBrand(
        name: 'Step Up',
        tagline: 'รองเท้าผ้าใบ',
        coverImage: AppImages.productSneakers,
        avatar: AppImages.productSneakers,
      ),
    ],
    // บ้านและสวน: sample shops; logos are their product photos for now.
    4: [
      HomeBrand(
        name: 'บ้านสวนน่าอยู่',
        tagline: 'ต้นไม้และกระถาง',
        coverImage: AppImages.productMonstera,
        avatar: AppImages.productMonstera,
        isMall: true,
      ),
      HomeBrand(
        name: 'Cozy Cushion',
        tagline: 'หมอนอิงและผ้าแต่งบ้าน',
        coverImage: AppImages.productCushion,
        avatar: AppImages.productCushion,
      ),
      HomeBrand(
        name: 'Rattan Craft',
        tagline: 'ตะกร้าสานทำมือ',
        coverImage: AppImages.productRattanBasket,
        avatar: AppImages.productRattanBasket,
      ),
      HomeBrand(
        name: 'Solar Garden',
        tagline: 'ไฟสนามโซลาร์',
        coverImage: AppImages.productSolarLight,
        avatar: AppImages.productSolarLight,
        isVerified: false,
      ),
      HomeBrand(
        name: 'Clean Home',
        tagline: 'ของใช้ซักตาก',
        coverImage: AppImages.productDryingRack,
        avatar: AppImages.productDryingRack,
      ),
    ],
    // แม่และเด็ก: sample shops; logos are their product photos for now.
    5: [
      HomeBrand(
        name: 'Mom & Baby Store',
        tagline: 'รถเข็นและคาร์ซีท',
        coverImage: AppImages.productStroller,
        avatar: AppImages.productStroller,
        isMall: true,
      ),
      HomeBrand(
        name: 'Little Sleep',
        tagline: 'เตียงและที่นอนเด็ก',
        coverImage: AppImages.productCrib,
        avatar: AppImages.productCrib,
      ),
      HomeBrand(
        name: 'Bunny Friends',
        tagline: 'ตุ๊กตาผ้านุ่ม',
        coverImage: AppImages.productBunnyPlush,
        avatar: AppImages.productBunnyPlush,
      ),
      HomeBrand(
        name: 'Wood Toy Lab',
        tagline: 'ของเล่นไม้',
        coverImage: AppImages.productWoodenToys,
        avatar: AppImages.productWoodenToys,
        isVerified: false,
      ),
      HomeBrand(
        name: 'Baby Care',
        tagline: 'สบู่และแชมพูเด็ก',
        coverImage: AppImages.productBabyWash,
        avatar: AppImages.productBabyWash,
      ),
    ],
    // สินค้าสัตว์เลี้ยง: sample shops; logos are their product photos for now.
    6: [
      HomeBrand(
        name: 'PetCare Official Store',
        tagline: 'น้ำพุและของใช้สัตว์เลี้ยง',
        coverImage: AppImages.productPetFountain,
        avatar: AppImages.productPetFountain,
        isMall: true,
      ),
      HomeBrand(
        name: 'Cat Condo',
        tagline: 'คอนโดและเสาลับเล็บ',
        coverImage: AppImages.productCatTree,
        avatar: AppImages.productCatTree,
      ),
      HomeBrand(
        name: 'Pet Bed Co.',
        tagline: 'ที่นอนสัตว์เลี้ยง',
        coverImage: AppImages.productPetBed,
        avatar: AppImages.productPetBed,
      ),
      HomeBrand(
        name: 'Happy Paws',
        tagline: 'สายจูงและสายรัดอก',
        coverImage: AppImages.productDogHarness,
        avatar: AppImages.productDogHarness,
        isVerified: false,
      ),
      HomeBrand(
        name: 'Pet Food Plus',
        tagline: 'อาหารสุนัขและแมว',
        coverImage: AppImages.productPetFood,
        avatar: AppImages.productPetFood,
      ),
    ],
    // เครื่องใช้ไฟฟ้าและไอที: sample shops; logos are their product photos for now.
    7: [
      HomeBrand(
        name: 'IT & Gadget Hub',
        tagline: 'โน้ตบุ๊กและอุปกรณ์',
        coverImage: AppImages.productLaptop,
        avatar: AppImages.productLaptop,
        isMall: true,
      ),
      HomeBrand(
        name: 'Sound Lab',
        tagline: 'หูฟังและลำโพง',
        coverImage: AppImages.productEarbuds,
        avatar: AppImages.productEarbuds,
      ),
      HomeBrand(
        name: 'Smart Home TH',
        tagline: 'อุปกรณ์บ้านอัจฉริยะ',
        coverImage: AppImages.productSmartSpeaker,
        avatar: AppImages.productSmartSpeaker,
      ),
      HomeBrand(
        name: 'Power Up',
        tagline: 'พาวเวอร์แบงก์และที่ชาร์จ',
        coverImage: AppImages.productPowerBank,
        avatar: AppImages.productPowerBank,
        isVerified: false,
      ),
      HomeBrand(
        name: 'Kitchen Tech',
        tagline: 'เครื่องใช้ในครัว',
        coverImage: AppImages.productBlender,
        avatar: AppImages.productBlender,
      ),
    ],
  };

  /// The 15 categories, in this order. HomeCategoryBar shows at most 15.
  static const categories = [
    HomeCategory(icon: AppIcons.catRecommended, label: 'สินค้าแนะนำ'),
    HomeCategory(icon: AppIcons.catFood, label: 'อาหารและเครื่องดื่ม'),
    HomeCategory(icon: AppIcons.catBeauty, label: 'สุขภาพและความงาม'),
    HomeCategory(icon: AppIcons.catFashion, label: 'แฟชั่น'),
    HomeCategory(icon: AppIcons.catHome, label: 'บ้านและสวน'),
    HomeCategory(icon: AppIcons.catBaby, label: 'แม่และเด็ก'),
    HomeCategory(icon: AppIcons.catPet, label: 'สินค้าสัตว์เลี้ยง'),
    HomeCategory(icon: AppIcons.catElectronics, label: 'เครื่องใช้ไฟฟ้าและไอที'),
    HomeCategory(icon: AppIcons.catAuto, label: 'อุปกรณ์ยานยนต์'),
    HomeCategory(icon: AppIcons.catTools, label: 'เครื่องมือช่าง'),
    HomeCategory(icon: AppIcons.catSports, label: 'กีฬาและกิจกรรม'),
    HomeCategory(icon: AppIcons.catHobby, label: 'งานอดิเรกและของสะสม'),
    HomeCategory(icon: AppIcons.catStationery, label: 'เครื่องเขียนและสำนักงาน'),
    HomeCategory(icon: AppIcons.catHerbal, label: 'สมุนไพร'),
    HomeCategory(icon: AppIcons.catOther, label: 'อื่นๆ'),
  ];

  /// Largest discount any mock product shows, in baht.
  static const maxDiscountBaht = 20000;

  // Trust icons: อย. on food and cosmetics, มอก. on electrics.
  static const _food = [AppIcons.fdaBadge, AppIcons.moneySecurityRed, AppIcons.deliveryTruck];
  static const _general = [AppIcons.moneySecurityRed, AppIcons.deliveryTruck];
  static const _tis = [AppIcons.tisBadgeSmall, AppIcons.moneySecurityRed, AppIcons.deliveryTruck];

  // ── From the Figma frame (names now match their photos) ──

  static const _cottonPads = HomeProduct(
    title: 'สำลีแผ่นรีดขอบ เนื้อนุ่มพิเศษ 120 แผ่น',
    image: AppImages.productCottonPads,
    originalPrice: 89,
    discount: PercentDiscount(30), // ฿62
    rating: '4.8',
    soldCount: 1200000,
    isVerified: true,
    badgeInset: 8,
    badges: _food,
  );

  static const _blouse = HomeProduct(
    title: 'เสื้อเบลาส์ระบาย แขนยาว สีขาว',
    image: AppImages.productShirt,
    originalPrice: 590,
    discount: AmountDiscount(100), // ฿490
    rating: '4.8',
    soldCount: 25600,
    isVerified: true,
    badges: _general,
  );

  static const _powerStrip = HomeProduct(
    title: 'ปลั๊กพ่วง 3 ช่อง 2 USB สายยาว 3 เมตร',
    image: AppImages.productPowerStrip,
    originalPrice: 459,
    discount: PercentDiscount(15), // ฿390
    rating: '4.8',
    soldCount: 3450000,
    imageCrop: ImageCrop(left: -131, top: -157, width: 498, height: 332),
    isShopVerified: true,
    badges: _tis,
  );

  // ── 10 more, each with its own photo ──

  static const _indigoDress = HomeProduct(
    title: 'เดรสผ้าครามแขนพอง ทอมือ สกลนคร',
    image: AppImages.brand1Main,
    originalPrice: 1890,
    discount: PercentDiscount(20),
    rating: '4.9',
    soldCount: 860,
    isVerified: true,
    badges: _general,
  );

  static const _wovenBag = HomeProduct(
    title: 'กระเป๋าสานกระจูด หูหนังแท้',
    image: AppImages.brand2Main,
    originalPrice: 1290,
    discount: AmountDiscount(200),
    rating: '4.7',
    soldCount: 4300,
    isVerified: true,
    badges: _general,
  );

  static const _indigoFabric = HomeProduct(
    title: 'ผ้าครามทอมือ ย้อมสีธรรมชาติ ยาว 2 เมตร',
    image: AppImages.brandSideTop,
    originalPrice: 950,
    rating: '4.8',
    soldCount: 312,
    isShopVerified: true,
    badges: _general,
  );

  /// Short title — the one-line case.
  static const _tieDyeScarf = HomeProduct(
    title: 'ผ้าพันคอมัดย้อมคราม',
    image: AppImages.brandSideBottom,
    originalPrice: 390,
    discount: PercentDiscount(10),
    rating: '4.6',
    soldCount: 1500,
    badges: _general,
  );

  static const _plantPot = HomeProduct(
    title: 'ต้นพลูด่างในกระถางเซรามิก',
    image: AppImages.productPlantPot,
    originalPrice: 459,
    discount: AmountDiscount(60),
    rating: '4.9',
    soldCount: 2100,
    badges: _general,
  );

  // ── Food and drink: the 9 products under อาหารและเครื่องดื่ม ──

  static const _honey = HomeProduct(
    title: 'น้ำผึ้งดอกลำไยแท้ 100% ขวดแก้ว 250 ก.',
    image: AppImages.productHoney,
    originalPrice: 189,
    discount: PercentDiscount(15),
    rating: '4.9',
    soldCount: 12400,
    isVerified: true,
    badgeInset: 8,
    badges: _food,
  );

  static const _strawberryJam = HomeProduct(
    title: 'แยมสตรอว์เบอร์รี่ เนื้อผลไม้แน่น 270 ก.',
    image: AppImages.productStrawberryJam,
    originalPrice: 129,
    discount: AmountDiscount(20),
    rating: '4.8',
    soldCount: 5300,
    badgeInset: 8,
    isShopVerified: true,
    badges: _food,
  );

  static const _greenTea = HomeProduct(
    title: 'ใบชาเขียวอบแห้ง ชงร้อนหรือเย็น กล่อง 100 ก.',
    image: AppImages.productGreenTea,
    originalPrice: 259,
    rating: '4.7',
    soldCount: 2100,
    isVerified: true,
    badgeInset: 8,
    badges: _food,
  );

  static const _bread = HomeProduct(
    title: 'ขนมปังแซนด์วิชแผ่น นุ่มพิเศษ อบใหม่ทุกวัน',
    image: AppImages.productBread,
    originalPrice: 45,
    rating: '4.6',
    soldCount: 88000,
    badgeInset: 8,
    badges: _food,
  );

  static const _potatoChips = HomeProduct(
    title: 'มันฝรั่งแผ่นทอดกรอบ รสออริจินัล 150 ก.',
    image: AppImages.productPotatoChips,
    originalPrice: 79,
    discount: PercentDiscount(10),
    rating: '4.5',
    soldCount: 156000,
    badgeInset: 8,
    isShopVerified: true,
    badges: _food,
  );

  static const _granola = HomeProduct(
    title: 'กราโนล่าธัญพืชรวม ผสมแครนเบอร์รี่ 400 ก.',
    image: AppImages.productGranola,
    originalPrice: 219,
    discount: AmountDiscount(30),
    rating: '4.8',
    soldCount: 9700,
    isVerified: true,
    badgeInset: 8,
    badges: _food,
  );

  static const _milk = HomeProduct(
    title: 'นมสดพาสเจอร์ไรส์ รสจืด 830 มล.',
    image: AppImages.productMilk,
    originalPrice: 52,
    rating: '4.9',
    soldCount: 230000,
    badgeInset: 8,
    badges: _food,
  );

  static const _coffeeBeans = HomeProduct(
    title: 'เมล็ดกาแฟอาราบิก้า คั่วกลาง 250 ก.',
    image: AppImages.productCoffeeBeans,
    originalPrice: 350,
    discount: PercentDiscount(20),
    rating: '4.8',
    soldCount: 18700,
    isVerified: true,
    badgeInset: 8,
    badges: _food,
  );

  static const _cookies = HomeProduct(
    title: 'คุกกี้ช็อกโกแลตชิป อบเนยสด 200 ก.',
    image: AppImages.productCookies,
    originalPrice: 149,
    rating: '4.7',
    soldCount: 4600,
    badgeInset: 8,
    badges: _food,
  );

  // ── Health and beauty: the 10 products under สุขภาพและความงาม (อย. on
  // the cosmetics, not on the electric brush) ──

  static const _serum = HomeProduct(
    title: 'เซรั่มไฮยาลูรอน ผิวชุ่มชื้น 30 มล.',
    image: AppImages.productSerum,
    originalPrice: 390,
    discount: PercentDiscount(20),
    rating: '4.9',
    soldCount: 45200,
    isVerified: true,
    badgeInset: 8,
    badges: _food,
  );

  static const _nightCream = HomeProduct(
    title: 'ครีมบำรุงผิวหน้า สูตรกลางคืน 50 ก.',
    image: AppImages.productCream,
    originalPrice: 450,
    discount: AmountDiscount(50),
    rating: '4.8',
    soldCount: 8300,
    badgeInset: 8,
    isShopVerified: true,
    badges: _food,
  );

  static const _sunscreen = HomeProduct(
    title: 'กันแดดทาหน้า SPF50+ PA++++ เนื้อบางเบา 50 มล.',
    image: AppImages.productSunscreen,
    originalPrice: 299,
    discount: PercentDiscount(15),
    rating: '4.8',
    soldCount: 126000,
    isVerified: true,
    badgeInset: 8,
    badges: _food,
  );

  static const _cleansingMilk = HomeProduct(
    title: 'คลีนซิ่งมิลค์ล้างหน้า สูตรอ่อนโยน 200 มล.',
    image: AppImages.productCleanser,
    originalPrice: 259,
    rating: '4.7',
    soldCount: 6100,
    badgeInset: 8,
    badges: _food,
  );

  static const _sheetMask = HomeProduct(
    title: 'มาสก์หน้าแผ่น สูตรผิวกระจ่างใส',
    image: AppImages.productSheetMask,
    originalPrice: 39,
    rating: '4.6',
    soldCount: 310000,
    badgeInset: 8,
    badges: _food,
  );

  static const _micellarWater = HomeProduct(
    title: 'ไมเซลลาร์วอเตอร์ เช็ดเครื่องสำอาง 100 มล.',
    image: AppImages.productMicellarWater,
    originalPrice: 159,
    discount: AmountDiscount(20),
    rating: '4.8',
    soldCount: 27400,
    badgeInset: 8,
    isShopVerified: true,
    badges: _food,
  );

  static const _lipstick = HomeProduct(
    title: 'ลิปสติกเนื้อแมตต์ สีชมพูกุหลาบ',
    image: AppImages.productLipstick,
    originalPrice: 290,
    discount: PercentDiscount(10),
    rating: '4.7',
    soldCount: 15800,
    isVerified: true,
    badgeInset: 8,
    badges: _food,
  );

  static const _eyeshadow = HomeProduct(
    title: 'พาเลตต์อายแชโดว์ 9 สี โทนชมพูน้ำตาล',
    image: AppImages.productEyeshadow,
    originalPrice: 490,
    discount: AmountDiscount(100),
    rating: '4.8',
    soldCount: 3900,
    badgeInset: 8,
    badges: _food,
  );

  static const _faceBrush = HomeProduct(
    title: 'แปรงล้างหน้าไฟฟ้า ขนซิลิโคน กันน้ำ',
    image: AppImages.productFaceBrush,
    originalPrice: 890,
    discount: PercentDiscount(25),
    rating: '4.6',
    soldCount: 2700,
    isVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _hairOil = HomeProduct(
    title: 'ออยล์บำรุงผม สำหรับผมแห้งเสีย 50 มล.',
    image: AppImages.productHairOil,
    originalPrice: 220,
    rating: '4.8',
    soldCount: 11200,
    badgeInset: 8,
    badges: _food,
  );

  // ── Fashion: the 8 products under แฟชั่น ──

  static const _shoulderBag = HomeProduct(
    title: 'กระเป๋าสะพายไหล่หนัง ทรงพระจันทร์ สีน้ำตาล',
    image: AppImages.productShoulderBag,
    originalPrice: 790,
    discount: PercentDiscount(20),
    rating: '4.8',
    soldCount: 6800,
    isVerified: true,
    badges: _general,
  );

  static const _oversizedTee = HomeProduct(
    title: 'เสื้อยืดโอเวอร์ไซซ์ ผ้าคอตตอน 100% สีครีม',
    image: AppImages.productOversizedTee,
    originalPrice: 290,
    rating: '4.7',
    soldCount: 52300,
    isShopVerified: true,
    badges: _general,
  );

  static const _slacks = HomeProduct(
    title: 'กางเกงสแล็คขากระบอก เอวสูง สีเทาเข้ม',
    image: AppImages.productSlacks,
    originalPrice: 590,
    discount: AmountDiscount(100),
    rating: '4.6',
    soldCount: 9100,
    badges: _general,
  );

  static const _linenBlouse = HomeProduct(
    title: 'เสื้อเบลาส์ผ้าลินิน คอวี แขนพอง สีชมพู',
    image: AppImages.productLinenBlouse,
    originalPrice: 450,
    discount: PercentDiscount(10),
    rating: '4.8',
    soldCount: 3400,
    badges: _general,
  );

  static const _pleatedSkirt = HomeProduct(
    title: 'กระโปรงพลีทยาว เอวสูง สีเบจ',
    image: AppImages.productPleatedSkirt,
    originalPrice: 690,
    rating: '4.7',
    soldCount: 2800,
    isShopVerified: true,
    badges: _general,
  );

  static const _jeans = HomeProduct(
    title: 'กางเกงยีนส์ขาตรง เอวสูง สียีนส์กลาง',
    image: AppImages.productJeans,
    originalPrice: 890,
    discount: PercentDiscount(15),
    rating: '4.8',
    soldCount: 14600,
    isVerified: true,
    badges: _general,
  );

  static const _blackDress = HomeProduct(
    title: 'เดรสยาวแขนกุด ทรงเอ สีดำ',
    image: AppImages.productBlackDress,
    originalPrice: 1290,
    discount: AmountDiscount(200),
    rating: '4.9',
    soldCount: 1900,
    isVerified: true,
    badges: _general,
  );

  static const _sneakers = HomeProduct(
    title: 'รองเท้าผ้าใบหนัง พื้นหนา สีขาว',
    image: AppImages.productSneakers,
    originalPrice: 1190,
    discount: PercentDiscount(25),
    rating: '4.7',
    soldCount: 21500,
    badges: _general,
  );

  // ── Home and garden: the 10 products under บ้านและสวน ──

  static const _cushion = HomeProduct(
    title: 'หมอนอิงผ้าบูเคล่ ลายตาราง สีครีม 45x45 ซม.',
    image: AppImages.productCushion,
    originalPrice: 390,
    discount: PercentDiscount(20),
    rating: '4.8',
    soldCount: 7400,
    isVerified: true,
    badges: _general,
  );

  static const _wallClock = HomeProduct(
    title: 'นาฬิกาแขวนผนัง ดีไซน์มินิมอล เดินเงียบ 30 ซม.',
    image: AppImages.productWallClock,
    originalPrice: 490,
    rating: '4.7',
    soldCount: 3200,
    isShopVerified: true,
    badges: _general,
  );

  static const _sideTable = HomeProduct(
    title: 'เก้าอี้สตูลไม้ยางพารา 2 ชั้น วางของได้',
    image: AppImages.productSideTable,
    originalPrice: 690,
    discount: AmountDiscount(100),
    rating: '4.8',
    soldCount: 1800,
    badges: _general,
  );

  static const _solarLight = HomeProduct(
    title: 'โคมไฟสนามโซลาร์เซลล์ ปักดิน เปิดเองตอนกลางคืน',
    image: AppImages.productSolarLight,
    originalPrice: 350,
    discount: PercentDiscount(15),
    rating: '4.6',
    soldCount: 12600,
    isVerified: true,
    badges: _general,
  );

  static const _wateringCan = HomeProduct(
    title: 'บัวรดน้ำต้นไม้ เหล็กพ่นสี สีเขียวเซจ 5 ลิตร',
    image: AppImages.productWateringCan,
    originalPrice: 290,
    rating: '4.7',
    soldCount: 4100,
    badges: _general,
  );

  static const _rattanBasket = HomeProduct(
    title: 'ตะกร้าสานหวาย มีหูจับ ใส่ผ้าหรือของเล่น',
    image: AppImages.productRattanBasket,
    originalPrice: 450,
    discount: AmountDiscount(50),
    rating: '4.9',
    soldCount: 2600,
    isShopVerified: true,
    badges: _general,
  );

  static const _monstera = HomeProduct(
    title: 'ต้นมอนสเตอร่า ในกระถางเซรามิกสีขาว',
    image: AppImages.productMonstera,
    originalPrice: 890,
    discount: PercentDiscount(10),
    rating: '4.8',
    soldCount: 950,
    isVerified: true,
    badges: _general,
  );

  static const _vase = HomeProduct(
    title: 'แจกันเซรามิกเนื้อทราย พร้อมดอกหญ้าแห้ง',
    image: AppImages.productVase,
    originalPrice: 590,
    rating: '4.7',
    soldCount: 1400,
    badges: _general,
  );

  static const _pruningShears = HomeProduct(
    title: 'กรรไกรตัดกิ่งไม้ ใบมีดสแตนเลส ด้ามจับกันลื่น',
    image: AppImages.productPruningShears,
    originalPrice: 259,
    discount: PercentDiscount(20),
    rating: '4.8',
    soldCount: 8900,
    badges: _general,
  );

  static const _dryingRack = HomeProduct(
    title: 'ราวตากผ้าสแตนเลส พับเก็บได้ มีปีกสองข้าง',
    image: AppImages.productDryingRack,
    originalPrice: 790,
    discount: AmountDiscount(150),
    rating: '4.6',
    soldCount: 5300,
    isVerified: true,
    badges: _general,
  );

  // ── Mother and baby: the 10 products under แม่และเด็ก (อย. on the
  // diapers and the baby wash) ──

  static const _stroller = HomeProduct(
    title: 'รถเข็นเด็ก พับเก็บง่าย มีหลังคากันแดด',
    image: AppImages.productStroller,
    originalPrice: 4590,
    discount: PercentDiscount(20),
    rating: '4.8',
    soldCount: 2300,
    isVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _carSeat = HomeProduct(
    title: 'คาร์ซีทเด็ก เบาะนุ่ม เข็มขัด 5 จุด',
    image: AppImages.productCarSeat,
    originalPrice: 3290,
    discount: AmountDiscount(500),
    rating: '4.9',
    soldCount: 1700,
    isVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _crib = HomeProduct(
    title: 'เตียงเด็กไม้ พร้อมโมบายดาว',
    image: AppImages.productCrib,
    originalPrice: 2890,
    rating: '4.7',
    soldCount: 640,
    badgeInset: 8,
    badges: _general,
  );

  static const _bottleSterilizer = HomeProduct(
    title: 'เครื่องนึ่งขวดนม ใส่ได้ 2 ขวด',
    image: AppImages.productBottleSterilizer,
    originalPrice: 1290,
    discount: PercentDiscount(15),
    rating: '4.8',
    soldCount: 5400,
    badgeInset: 8,
    isShopVerified: true,
    badges: _general,
  );

  static const _diapers = HomeProduct(
    title: 'ผ้าอ้อมสำเร็จรูป แบบเทป ไซซ์ M 40 ชิ้น',
    image: AppImages.productDiapers,
    originalPrice: 359,
    discount: AmountDiscount(40),
    rating: '4.9',
    soldCount: 182000,
    isVerified: true,
    badgeInset: 8,
    badges: _food,
  );

  static const _babyTableware = HomeProduct(
    title: 'ชุดจานชามเด็ก ลายหมี พร้อมแก้วหัดดื่ม',
    image: AppImages.productBabyTableware,
    originalPrice: 390,
    rating: '4.8',
    soldCount: 8900,
    badgeInset: 8,
    badges: _general,
  );

  static const _breastPump = HomeProduct(
    title: 'เครื่องปั๊มนมไฟฟ้า ปรับแรงดูดได้',
    image: AppImages.productBreastPump,
    originalPrice: 1890,
    discount: PercentDiscount(25),
    rating: '4.7',
    soldCount: 3600,
    isVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _babyWash = HomeProduct(
    title: 'สบู่เหลวและแชมพูเด็ก สูตรอ่อนโยน ชุด 2 ขวด',
    image: AppImages.productBabyWash,
    originalPrice: 259,
    discount: PercentDiscount(10),
    rating: '4.8',
    soldCount: 23400,
    badgeInset: 8,
    badges: _food,
  );

  static const _bunnyPlush = HomeProduct(
    title: 'ตุ๊กตากระต่ายผ้านุ่ม หูยาว ผูกโบว์',
    image: AppImages.productBunnyPlush,
    originalPrice: 350,
    rating: '4.9',
    soldCount: 12100,
    badgeInset: 8,
    isShopVerified: true,
    badges: _general,
  );

  static const _woodenToys = HomeProduct(
    title: 'ของเล่นไม้เสริมพัฒนาการ ห่วงเรียงสีและลูกปัด',
    image: AppImages.productWoodenToys,
    originalPrice: 490,
    discount: AmountDiscount(60),
    rating: '4.8',
    soldCount: 4700,
    badgeInset: 8,
    badges: _general,
  );

  // ── Pet supplies: the 10 products under สินค้าสัตว์เลี้ยง ──

  static const _petBed = HomeProduct(
    title: 'ที่นอนสัตว์เลี้ยง ทรงกลม ขนนุ่ม ขนาด M',
    image: AppImages.productPetBed,
    originalPrice: 590,
    discount: PercentDiscount(20),
    rating: '4.9',
    soldCount: 8700,
    isVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _catTree = HomeProduct(
    title: 'คอนโดแมว 3 ชั้น มีบ้านและเสาลับเล็บ',
    image: AppImages.productCatTree,
    originalPrice: 1290,
    discount: AmountDiscount(200),
    rating: '4.8',
    soldCount: 2400,
    isShopVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _petFeeder = HomeProduct(
    title: 'เครื่องให้อาหารสัตว์อัตโนมัติ ตั้งเวลาได้ 4 ลิตร',
    image: AppImages.productPetFeeder,
    originalPrice: 1590,
    discount: PercentDiscount(15),
    rating: '4.7',
    soldCount: 3100,
    isVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  /// Also the full product page mock (Figma 1973:362).
  static const petFountain = HomeProduct(
    title: 'น้ำพุแมวอัตโนมัติ ความจุ 2.5 ลิตร Smart Pet Fountain แจ้งเตือนน้ำหมดผ่านแอป รับประกัน 1 ปี',
    image: AppImages.productPetFountain,
    originalPrice: 4190,
    discount: AmountDiscount(1191), // ฿2,999
    rating: '4.8',
    soldCount: 30,
    isShopVerified: true,
    badgeInset: 8,
    badges: _tis,
  );

  static const _petCarrier = HomeProduct(
    title: 'กระเป๋าใส่สัตว์เลี้ยง ระบายอากาศ หิ้วได้สะพายได้',
    image: AppImages.productPetCarrier,
    originalPrice: 790,
    discount: AmountDiscount(100),
    rating: '4.7',
    soldCount: 4200,
    isShopVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _catScratcher = HomeProduct(
    title: 'เสาลับเล็บแมว เชือกป่าน พร้อมลูกบอล',
    image: AppImages.productCatScratcher,
    originalPrice: 290,
    rating: '4.8',
    soldCount: 15300,
    badgeInset: 8,
    badges: _general,
  );

  static const _dogHarness = HomeProduct(
    title: 'สายรัดอกสุนัข ปรับขนาดได้ สีแดง',
    image: AppImages.productDogHarness,
    originalPrice: 350,
    discount: PercentDiscount(10),
    rating: '4.8',
    soldCount: 7800,
    badgeInset: 8,
    badges: _general,
  );

  static const _groomingSet = HomeProduct(
    title: 'ชุดแปรงหวีขนและกรรไกรตัดเล็บสัตว์เลี้ยง',
    image: AppImages.productGroomingSet,
    originalPrice: 259,
    rating: '4.7',
    soldCount: 11400,
    isShopVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _petFood = HomeProduct(
    title: 'อาหารสุนัขและแมว สูตรเนื้อไก่ 1.5 กก.',
    image: AppImages.productPetFood,
    originalPrice: 420,
    discount: AmountDiscount(50),
    rating: '4.9',
    soldCount: 36500,
    isVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _catToys = HomeProduct(
    title: 'ชุดของเล่นแมว ไม้ตกแมว ลูกบอล และหนูผ้า',
    image: AppImages.productCatToys,
    originalPrice: 199,
    discount: PercentDiscount(25),
    rating: '4.6',
    soldCount: 21800,
    badgeInset: 8,
    badges: _general,
  );

  // ── Electronics and IT: the 9 products under เครื่องใช้ไฟฟ้าและไอที (มอก.
  // on the mains and charging appliances) ──

  static const _smartSpeaker = HomeProduct(
    title: 'ลำโพงอัจฉริยะ สั่งงานด้วยเสียง ไฟวงแหวน',
    image: AppImages.productSmartSpeaker,
    originalPrice: 1890,
    discount: PercentDiscount(20),
    rating: '4.7',
    soldCount: 5200,
    isVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _smartwatch = HomeProduct(
    title: 'สมาร์ทวอทช์ จอ AMOLED วัดชีพจร กันน้ำ',
    image: AppImages.productSmartwatch,
    originalPrice: 2490,
    discount: AmountDiscount(300),
    rating: '4.8',
    soldCount: 18400,
    isVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _earbuds = HomeProduct(
    title: 'หูฟังไร้สาย ตัดเสียงรบกวน พร้อมเคสชาร์จ',
    image: AppImages.productEarbuds,
    originalPrice: 1590,
    discount: PercentDiscount(25),
    rating: '4.7',
    soldCount: 42600,
    isShopVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _powerBank = HomeProduct(
    title: 'พาวเวอร์แบงก์ 20000 mAh ชาร์จเร็ว 2 พอร์ต',
    image: AppImages.productPowerBank,
    originalPrice: 690,
    discount: AmountDiscount(100),
    rating: '4.8',
    soldCount: 96300,
    badgeInset: 8,
    badges: _tis,
  );

  static const _keyboard = HomeProduct(
    title: 'คีย์บอร์ดเกมมิ่ง ไฟ RGB สวิตช์ Mechanical',
    image: AppImages.productKeyboard,
    originalPrice: 1290,
    rating: '4.6',
    soldCount: 7100,
    isShopVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _airPurifier = HomeProduct(
    title: 'เครื่องฟอกอากาศ ไส้กรอง HEPA ห้อง 20 ตร.ม.',
    image: AppImages.productAirPurifier,
    originalPrice: 2990,
    discount: PercentDiscount(15),
    rating: '4.8',
    soldCount: 3800,
    isVerified: true,
    badgeInset: 8,
    badges: _tis,
  );

  static const _deskLamp = HomeProduct(
    title: 'โคมไฟตั้งโต๊ะ LED ถนอมสายตา ปรับแสงได้',
    image: AppImages.productDeskLamp,
    originalPrice: 590,
    rating: '4.7',
    soldCount: 12900,
    badgeInset: 8,
    badges: _tis,
  );

  static const _laptop = HomeProduct(
    title: 'โน้ตบุ๊ก 14 นิ้ว บางเบา SSD 512 GB',
    image: AppImages.productLaptop,
    originalPrice: 18990,
    discount: AmountDiscount(2000),
    rating: '4.8',
    soldCount: 860,
    isVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  static const _blender = HomeProduct(
    title: 'เครื่องปั่นน้ำผลไม้ โถแก้ว 1.5 ลิตร',
    image: AppImages.productBlender,
    originalPrice: 1290,
    discount: PercentDiscount(10),
    rating: '4.7',
    soldCount: 6400,
    isShopVerified: true,
    badgeInset: 8,
    badges: _tis,
  );

  // ── Layout demo: a discount in the millions, to see the longest tab and
  // price the card has to fit (bulk order of 50 laptops). ──

  static const bigDealDemo = HomeProduct(
    title: 'โน้ตบุ๊ก 14 นิ้ว ชุดสำนักงาน 50 เครื่อง พร้อมติดตั้ง',
    image: AppImages.productLaptop,
    originalPrice: 2450000,
    discount: AmountDiscount(1000000), // ฿1,450,000
    rating: '4.9',
    soldCount: 12,
    isVerified: true,
    badgeInset: 8,
    badges: _general,
  );

  /// Masonry columns for สินค้าแนะนำ: 42 different products, none repeated.
  static const leftColumn = [
    _cottonPads,
    bigDealDemo,
    _powerStrip,
    _honey,
    _indigoDress,
    _potatoChips,
    _indigoFabric,
    _milk,
    _sunscreen,
    _cookies,
    _shoulderBag,
    _lipstick,
    _jeans,
    _cushion,
    _solarLight,
    _stroller,
    _woodenToys,
    _petBed,
    _catToys,
    _earbuds,
    _airPurifier,
  ];
  static const rightColumn = [
    _blouse,
    _wovenBag,
    _strawberryJam,
    _tieDyeScarf,
    _greenTea,
    _plantPot,
    _bread,
    _granola,
    _serum,
    _coffeeBeans,
    _sneakers,
    _sheetMask,
    _blackDress,
    _monstera,
    _rattanBasket,
    _bunnyPlush,
    _diapers,
    petFountain,
    _petFood,
    _smartwatch,
    _powerBank,
  ];

  /// Masonry columns (left, right) for the categories that have their own
  /// products, by index in [categories]. The others show the สินค้าแนะนำ mix.
  static const categoryColumns = <int, (List<HomeProduct>, List<HomeProduct>)>{
    // อาหารและเครื่องดื่ม
    1: ([_honey, _greenTea, _potatoChips, _milk, _cookies], [_strawberryJam, _bread, _granola, _coffeeBeans]),
    // สุขภาพและความงาม
    2: (
      [_serum, _sunscreen, _sheetMask, _lipstick, _faceBrush],
      [_nightCream, _cleansingMilk, _micellarWater, _eyeshadow, _hairOil],
    ),
    // แฟชั่น: the 8 new ones plus the fashion items already in สินค้าแนะนำ
    3: (
      [_shoulderBag, _blouse, _slacks, _wovenBag, _pleatedSkirt, _tieDyeScarf, _blackDress],
      [_oversizedTee, _indigoDress, _linenBlouse, _indigoFabric, _jeans, _sneakers],
    ),
    // บ้านและสวน: the 10 new ones plus the plant pot already in สินค้าแนะนำ
    4: (
      [_cushion, _sideTable, _wateringCan, _monstera, _pruningShears, _plantPot],
      [_wallClock, _solarLight, _rattanBasket, _vase, _dryingRack],
    ),
    // แม่และเด็ก
    5: (
      [_stroller, _crib, _diapers, _breastPump, _bunnyPlush],
      [_carSeat, _bottleSterilizer, _babyTableware, _babyWash, _woodenToys],
    ),
    // สินค้าสัตว์เลี้ยง
    6: (
      [_petBed, _petFeeder, _petCarrier, _dogHarness, _petFood],
      [_catTree, petFountain, _catScratcher, _groomingSet, _catToys],
    ),
    // เครื่องใช้ไฟฟ้าและไอที: the 9 new ones plus the power strip already in
    // สินค้าแนะนำ
    7: (
      [_smartSpeaker, _earbuds, _keyboard, _deskLamp, _blender],
      [_smartwatch, _powerBank, _airPurifier, _laptop, _powerStrip],
    ),
  };
}
