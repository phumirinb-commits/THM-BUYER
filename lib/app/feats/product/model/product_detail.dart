import '../../home/model/home_models.dart';

/// Everything the product page shows. Only [product] and [gallery] are
/// required; the other sections hide when empty.
class ProductDetail {
  const ProductDetail({
    required this.product,
    required this.gallery,
    this.intro = const [],
    this.highlights = const [],
    this.videos = const [],
    this.shop,
    this.related = const [],
    this.fdaNumber,
    this.tisNumber,
  });

  /// The product's มอก. standard, shown on the "รับรอง มอก." tag as
  /// "เลข มอก. 2432-2555" (standard number - Buddhist year). Null hides it.
  final String? tisNumber;

  /// The product's อย. registration number, shown on the "รับรอง อย." tag
  /// (e.g. 10-1-12345-1-0001 for food). Null hides the number.
  final String? fdaNumber;

  /// Title, price, rating, sold count and trust badges.
  final HomeProduct product;

  /// Photos in the swipeable gallery at the top.
  final List<ProductPhoto> gallery;

  /// Description paragraphs, then "จุดเด่น" bullet points.
  final List<String> intro;
  final List<String> highlights;

  final List<ProductVideo> videos;
  final ProductShop? shop;

  /// "สินค้าอื่นๆ ในร้านค้า".
  final List<HomeProduct> related;
}

/// One gallery photo. [zoom] above 1 shows a close-up of the part of the
/// picture at [focus] (-1..1 on each axis; 0,0 is the centre).
class ProductPhoto {
  const ProductPhoto(this.image, {this.zoom = 1, this.focusX = 0, this.focusY = 0});

  final String image;
  final double zoom;
  final double focusX;
  final double focusY;
}

class ProductVideo {
  const ProductVideo({required this.thumbnail, required this.caption});

  final String thumbnail;
  final String caption;
}

class ProductShop {
  const ProductShop({required this.name, required this.avatar, this.mark = ShopMark.none});

  final String name;
  final String avatar;
  final ShopMark mark;
}
