import '../../../shared/constants/app_assets.dart';
import '../../../shared/utils/number_format_util.dart';
import '../../home/model/home_mock_data.dart';
import '../../home/model/home_models.dart';
import 'product_detail.dart';

/// Mock product pages. The pet fountain has the full Figma page (1973:362);
/// other products show their photo, price and badges only, for now.
abstract final class ProductDetailMock {
  static const fountain = ProductDetail(
    product: HomeMockData.petFountain,
    gallery: [
      ProductPhoto(AppImages.fountain1),
      ProductPhoto(AppImages.productPetFountain),
      ProductPhoto(AppImages.fountain2),
      ProductPhoto(AppImages.fountain3),
    ],
    intro: [
      'น้ำพุแมวอัตโนมัติ ความจุ 2.5 ลิตร ไส้กรอง 4 ชั้น เสียงเงียบ',
      'น้ำไหลเวียนตลอดเวลา ช่วยให้น้ำสะอาดและสดใหม่ กระตุ้นให้แมวดื่มน้ำมากขึ้นกว่าชามน้ำแบบนิ่ง เหมาะกับบ้านที่เลี้ยงแมว 1–3 ตัว',
    ],
    highlights: [
      'ไส้กรอง 4 ชั้น ดักขนแมว เศษอาหาร และช่วยลดกลิ่นในน้ำ',
      'ปั๊มเสียงเงียบต่ำกว่า 30 dB วางในห้องนอนได้ไม่รบกวน',
      'ความจุ 2.5 ลิตร เติมน้ำครั้งเดียวใช้ได้ประมาณ 5–7 วัน (สำหรับแมว 1 ตัว)',
      'ตัดไฟอัตโนมัติเมื่อน้ำใกล้หมด ป้องกันปั๊มเสียหาย',
      'ถอดล้างได้ทุกชิ้น วัสดุปลอด BPA',
    ],
    videos: [
      ProductVideo(
        thumbnail: AppImages.fountainVideo1,
        caption: 'น้องแมวไม่ค่อยกินน้ำใช่ไหม? ลองให้น้องเจอน้ำพุที่ไหลวนเหมือนน้ำตกจิ๋ว',
      ),
      ProductVideo(
        thumbnail: AppImages.fountainVideo2,
        caption: 'น้องจะเดินมาดื่มเองบ่อยขึ้น เสียงเงียบกริบ ทาสนอนหลับสบาย',
      ),
      ProductVideo(
        thumbnail: AppImages.fountainVideo3,
        caption: 'น้ำพุแมวอัตโนมัติ ความจุ 2.5 ลิตร ไส้กรอง 4 ชั้น เสียงเงียบ',
      ),
    ],
    tisNumber: '1195-2561', // mock
    shop: ProductShop(name: 'PetCare Official Store', avatar: AppImages.shopPetCare, mark: ShopMark.verified),
    related: [
      HomeProduct(
        title: 'แปรงหวีขนแมว ปุ่มกดดันขนออกอัตโนมัติ หัวเข็มปลายมน ไม่ทำร้ายผิว',
        image: AppImages.relatedBrush,
        originalPrice: 1450,
        discount: AmountDiscount(200),
        rating: '4.8',
        soldCount: 120,
        badges: [],
      ),
      HomeProduct(
        title: 'กระเป๋าใส่แมว เป้สะพายหลัง ระบายอากาศ 360° รับน้ำหนักได้ 8 กก.',
        image: AppImages.relatedCarrier,
        originalPrice: 3500,
        discount: AmountDiscount(300),
        rating: '4.7',
        soldCount: 64,
        badges: [],
      ),
      HomeProduct(
        title: 'Smart Pet Fountain น้ำพุแมวสแตนเลส 3 ลิตร เชื่อมต่อแอป แจ้งเตือนน้ำหมด',
        image: AppImages.relatedFountain,
        originalPrice: 2999,
        discount: AmountDiscount(1000),
        rating: '4.9',
        soldCount: 210,
        badges: [],
      ),
    ],
  );

  /// The page for a product tapped in the Home feed. The fountain has its
  /// full Figma page; every other product gets a page built from its own
  /// data: what its badges promise, its shop, and more from its category.
  static ProductDetail forProduct(HomeProduct p) {
    if (p == HomeMockData.petFountain) return fountain;
    final category = _categoryOf(p);
    return ProductDetail(
      product: p,
      gallery: _mockGallery(p.image),
      intro: [p.title],
      highlights: _highlights(p),
      shop: ProductShop(
        name: _shopNames[category] ?? 'ร้านค้าบนไทยมาร์ท',
        avatar: p.image,
        mark: p.isVerified ? ShopMark.mall : (p.isShopVerified ? ShopMark.verified : ShopMark.none),
      ),
      related: _relatedTo(p, category),
      fdaNumber: p.badges.contains(AppIcons.fdaBadge) ? _mockFdaNumber(p, cosmetic: category == 2) : null,
      tisNumber: p.badges.contains(AppIcons.tisBadgeSmall) ? _mockTisNumber(p) : null,
    );
  }

  /// MOCK อย. number, the same every time for a product. Real numbers must
  /// come from the product's own registration data.
  /// Food: เลขสารบบอาหาร 10-1-12345-1-0001; cosmetics: เลขที่ใบรับจดแจ้ง
  /// 10-1-6012345678.
  static String _mockFdaNumber(HomeProduct p, {required bool cosmetic}) {
    var h = 7;
    for (final c in p.title.codeUnits) {
      h = (h * 31 + c) % 1000000007;
    }
    String digits(int n) => (h % _pow10(n)).toString().padLeft(n, '0');
    return cosmetic ? '10-1-60${digits(8)}' : '10-1-${digits(5)}-1-${(h % 9000 + 1000)}';
  }

  /// MOCK มอก. number (standard-year), the same every time for a product.
  /// Real numbers must come from the product's certificate.
  static String _mockTisNumber(HomeProduct p) {
    var h = 11;
    for (final c in p.title.codeUnits) {
      h = (h * 37 + c) % 1000000007;
    }
    return '${1000 + h % 2000}-25${50 + h % 17}';
  }

  static int _pow10(int n) => [for (var i = 0; i < n; i++) 10].fold(1, (a, b) => a * b);

  /// MOCK gallery from the product's one photo: the whole shot, then three
  /// close-ups of different parts, so the swipe and the 1/4 counter can be
  /// tried. Swap in the shop's real photos when they exist.
  static List<ProductPhoto> _mockGallery(String image) => [
        ProductPhoto(image),
        ProductPhoto(image, zoom: 1.6),
        ProductPhoto(image, zoom: 1.9, focusX: -0.7, focusY: -0.5),
        ProductPhoto(image, zoom: 1.9, focusX: 0.7, focusY: 0.6),
      ];

  /// Index in HomeMockData.categories of the first category listing [p];
  /// null when it is only in the สินค้าแนะนำ mix.
  static int? _categoryOf(HomeProduct p) {
    for (final MapEntry(:key, value: (left, right)) in HomeMockData.categoryColumns.entries) {
      if (left.contains(p) || right.contains(p)) return key;
    }
    return null;
  }

  /// Up to 6 other products from the same category (or the mix).
  static List<HomeProduct> _relatedTo(HomeProduct p, int? category) {
    final (left, right) = HomeMockData.categoryColumns[category] ?? (HomeMockData.leftColumn, HomeMockData.rightColumn);
    return [...left, ...right].where((o) => o != p).take(6).toList();
  }

  /// Only facts the product's data already shows: price, sales, badges.
  static List<String> _highlights(HomeProduct p) => [
        if (p.hasDiscount)
          'ราคาพิเศษ ${NumberFormatUtil.baht(p.price)} จากปกติ ${NumberFormatUtil.baht(p.originalPrice)}',
        'คะแนนรีวิว ${p.rating} · ขายแล้ว ${NumberFormatUtil.compact(p.soldCount)} ชิ้น',
        if (p.isVerified) 'ขายโดยร้านทางการของแบรนด์ (Mall)',
        if (!p.isVerified && p.isShopVerified) 'ร้านผ่านการตรวจสอบทะเบียนพาณิชย์กับไทยมาร์ทแล้ว',
        if (p.badges.contains(AppIcons.tisBadgeSmall)) 'ผ่านการรับรอง มอก.',
        if (p.badges.contains(AppIcons.fdaBadge)) 'ผ่านการรับรอง อย.',
        if (p.badges.contains(AppIcons.moneySecurityRed)) 'ของแท้ ถ้าปลอมคืนเงิน 2 เท่า',
        if (p.badges.contains(AppIcons.deliveryTruck)) 'จัดส่งฟรี',
      ];

  /// Mock shop names by category.
  static const _shopNames = {
    1: 'ครัวไทยมาร์ท อาหารและเครื่องดื่ม',
    2: 'Beauty Corner',
    3: 'Daily Fashion',
    4: 'บ้านสวนน่าอยู่',
    5: 'Mom & Baby Store',
    6: 'PetCare Official Store',
    7: 'IT & Gadget Hub',
  };
}
