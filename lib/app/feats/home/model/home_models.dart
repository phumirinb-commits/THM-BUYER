import 'package:flutter/widgets.dart';

enum StoryBadge { none, add, live }

/// The shop's mark on a story avatar's top edge.
enum ShopMark { none, mall, verified }

class HomeStory {
  const HomeStory({
    required this.name,
    required this.image,
    this.badge = StoryBadge.none,
    this.zoom = 1,
    this.hasStory = true,
    this.shopMark = ShopMark.none,
  });

  final String name;
  final String image;
  final StoryBadge badge;

  /// Mall or verified shops get their mark centred on the ring's top edge.
  final ShopMark shopMark;

  /// False draws a grey ring instead of the red "new story" ring.
  final bool hasStory;

  /// The Figma frame scales some avatars past the 56px circle (62/56).
  final double zoom;
}

class HomeTrust {
  const HomeTrust({required this.icon, required this.label, this.iconSize = 20});

  final String icon;
  final String label;

  /// Drawn size of the icon; art with room around it can be drawn larger.
  final double iconSize;
}

/// One promo banner slide: image layers stacked bottom to top.
class HomeBanner {
  const HomeBanner({required this.label, required this.layers, this.artTop = 0, this.artHeight});

  /// Read aloud by screen readers (the copy that is drawn into the art).
  final String label;
  final List<String> layers;

  /// Where the art sits in the 96px slot. By default it fills the slot
  /// (cover, centred); art drawn taller than the slot can be shifted with
  /// [artTop] and sized with [artHeight].
  final double artTop;
  final double? artHeight;
}

class HomeBrand {
  const HomeBrand({
    required this.name,
    required this.tagline,
    required this.coverImage,
    required this.avatar,
    this.isVerified = true,
    this.isMall = false,
  });

  final String name;
  final String tagline;
  /// Wide cover photo behind the avatar.
  final String coverImage;
  final String avatar;
  final bool isVerified;

  /// Shows the red "Mall" tag on the avatar instead of the check mark.
  final bool isMall;
}

class HomeCategory {
  const HomeCategory({required this.icon, required this.label});

  /// SVG asset of a Phosphor (regular) icon, drawn red at 24px.
  final String icon;
  final String label;
}

/// Places an image inside a box as the Figma frame does, in units of a
/// reference box width (scaled to the real width at layout time).
class ImageCrop {
  const ImageCrop({required this.left, required this.top, required this.width, required this.height});

  final double left;
  final double top;
  final double width;
  final double height;

  Rect scaled(double factor) => Rect.fromLTWH(left * factor, top * factor, width * factor, height * factor);
}

/// How a product's price is reduced from [HomeProduct.originalPrice].
sealed class ProductDiscount {
  const ProductDiscount();

  int apply(int originalPrice);
}

/// Seller-set baht amount, e.g. ลด 500 บาท. Shown as a "ลด 500 บาท" badge.
class AmountDiscount extends ProductDiscount {
  const AmountDiscount(this.baht);

  final int baht;

  @override
  int apply(int originalPrice) => (originalPrice - baht).clamp(0, originalPrice);
}

/// Percentage off, e.g. ลด 50%. Shown as a "-50%" badge on the card.
class PercentDiscount extends ProductDiscount {
  const PercentDiscount(this.percent);

  final int percent;

  @override
  int apply(int originalPrice) => (originalPrice * (100 - percent) / 100).round();
}

class HomeProduct {
  const HomeProduct({
    required this.title,
    required this.image,
    required this.originalPrice,
    this.discount,
    required this.rating,
    required this.soldCount,
    required this.badges,
    this.isVerified = false,
    this.isShopVerified = false,
    this.imageCrop,
    this.badgeInset = 6,
  });

  /// Left offset of the badge row (Figma uses 6 or 8 depending on the tile).
  final double badgeInset;

  final String title;
  final String image;
  /// Price before discount, in baht; shown struck through when discounted.
  final int originalPrice;

  /// Null means no discount.
  final ProductDiscount? discount;

  /// Selling price in baht.
  int get price => discount?.apply(originalPrice) ?? originalPrice;

  bool get hasDiscount => discount != null && price < originalPrice;
  final String rating;
  final int soldCount;

  /// Small trust icons overlapping the image's bottom edge.
  final List<String> badges;

  /// Sold by a Mall (official) shop: the red "Mall" tag leads the title.
  final bool isVerified;

  /// Sold by a shop with a verified identity (not Mall): the red check mark
  /// leads the title instead. Ignored when [isVerified] is true.
  final bool isShopVerified;
  final ImageCrop? imageCrop;
}
