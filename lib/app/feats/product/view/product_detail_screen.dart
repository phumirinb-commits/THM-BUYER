import 'package:flutter/material.dart';

import '../../../shared/constants/app_assets.dart';
import '../../../shared/theme/app_colors.dart';
import '../../../shared/theme/app_text_styles.dart';
import '../../../shared/utils/number_format_util.dart';
import '../../../shared/widgets/app_svg.dart';
import '../../../shared/widgets/mall_badge.dart';
import '../../home/model/home_models.dart';
import '../model/product_detail.dart';

/// Product page (Figma 1973:362): edge-to-edge photo gallery, title, price,
/// trust tags, description, review videos, the shop, more from the shop,
/// and a fixed "เพิ่มลงในตะกร้า / ซื้อเลย" bar.
class ProductDetailScreen extends StatelessWidget {
  const ProductDetailScreen({super.key, required this.detail});

  final ProductDetail detail;

  static Route<void> route(ProductDetail detail) =>
      MaterialPageRoute(builder: (_) => ProductDetailScreen(detail: detail));

  @override
  Widget build(BuildContext context) {
    final p = detail.product;
    return Scaffold(
      backgroundColor: AppColors.white,
      body: Column(
        children: [
          Expanded(
            child: CustomScrollView(
              slivers: [
                SliverToBoxAdapter(child: _Gallery(images: detail.gallery)),
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
                  sliver: SliverList.list(
                    children: [
                      Text(
                        p.title,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: AppTextStyles.heading(20, lineHeight: 28, color: AppColors.black),
                      ),
                      const SizedBox(height: 4),
                      _Price(product: p),
                      const SizedBox(height: 8),
                      _RatingRow(product: p),
                      const SizedBox(height: 16),
                      _TrustTags(badges: p.badges, fdaNumber: detail.fdaNumber, tisNumber: detail.tisNumber),
                      if (detail.intro.isNotEmpty || detail.highlights.isNotEmpty) ...[
                        const SizedBox(height: 16),
                        _Description(intro: detail.intro, highlights: detail.highlights),
                      ],
                      if (detail.videos.isNotEmpty) ...[
                        const SizedBox(height: 24),
                        _SectionTitle('วิดีโอรีวิวสินค้า'),
                        const SizedBox(height: 12),
                        _Videos(videos: detail.videos),
                      ],
                      if (detail.shop case final shop?) ...[
                        const SizedBox(height: 16),
                        _ShopRow(shop: shop),
                      ],
                      if (detail.related.isNotEmpty) ...[
                        const SizedBox(height: 24),
                        _SectionTitle('สินค้าอื่นๆ ในร้านค้า'),
                        const SizedBox(height: 8),
                        _Related(products: detail.related),
                      ],
                    ],
                  ),
                ),
              ],
            ),
          ),
          const _ActionBar(),
        ],
      ),
    );
  }
}

/// Square photo pager with the close and save buttons on top and a
/// "1/4" counter at the bottom right.
class _Gallery extends StatefulWidget {
  const _Gallery({required this.images});

  final List<ProductPhoto> images;

  @override
  State<_Gallery> createState() => _GalleryState();
}

class _GalleryState extends State<_Gallery> {
  int _page = 0;
  bool _saved = false;

  @override
  Widget build(BuildContext context) {
    final top = MediaQuery.paddingOf(context).top;
    return AspectRatio(
      aspectRatio: 1,
      child: Stack(
        children: [
          Positioned.fill(
            child: ColoredBox(
              color: AppColors.iconButtonBg,
              child: PageView.builder(
                itemCount: widget.images.length,
                onPageChanged: (i) => setState(() => _page = i),
                itemBuilder: (_, i) {
                  final photo = widget.images[i];
                  final alignment = Alignment(photo.focusX, photo.focusY);
                  // Zoomed photos are a close-up of one part of the picture.
                  return ClipRect(
                    child: Transform.scale(
                      scale: photo.zoom,
                      alignment: alignment,
                      child: Image.asset(photo.image, fit: BoxFit.cover, alignment: alignment),
                    ),
                  );
                },
              ),
            ),
          ),
          Positioned(
            left: 12,
            top: top + 12,
            child: _PhotoButton(
              icon: AppIcons.close,
              iconSize: 19,
              label: 'ปิด',
              onTap: () => Navigator.of(context).maybePop(),
            ),
          ),
          Positioned(
            right: 12,
            top: top + 12,
            child: _PhotoButton(
              // Saved: a solid red heart; not saved: the white outline.
              icon: _saved ? AppIcons.heartFill : AppIcons.heart,
              iconSize: 20,
              label: _saved ? 'เลิกบันทึกสินค้า' : 'บันทึกสินค้า',
              color: _saved ? AppColors.brand : null,
              // Saved: a white disc behind the solid red heart.
              background: _saved ? AppColors.white : null,
              onTap: () => setState(() => _saved = !_saved),
            ),
          ),
          if (widget.images.length > 1)
            Positioned(
              right: 8,
              bottom: 8,
              child: Semantics(
                label: 'รูปที่ ${_page + 1} จาก ${widget.images.length}',
                excludeSemantics: true,
                child: Container(
                  width: 30,
                  height: 24,
                  alignment: Alignment.center,
                  // Light grey pill, dark text (10.5:1) so it reads on any photo.
                  decoration: BoxDecoration(color: AppColors.iconButtonBg, borderRadius: BorderRadius.circular(24)),
                  child: Text(
                    '${_page + 1}/${widget.images.length}',
                    style: AppTextStyles.heading(12, lineHeight: 18, color: AppColors.textChip, weight: FontWeight.w400),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

/// 36px dark disc on the photo, inside a 44px tap area.
class _PhotoButton extends StatelessWidget {
  const _PhotoButton({
    required this.icon,
    required this.iconSize,
    required this.label,
    required this.onTap,
    this.color,
    this.background,
  });

  final String icon;
  final double iconSize;
  final String label;
  final VoidCallback onTap;
  final Color? color;

  /// Disc colour; null keeps the dark see-through disc.
  final Color? background;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: label,
      excludeSemantics: true,
      child: GestureDetector(
        onTap: onTap,
        behavior: HitTestBehavior.opaque,
        child: SizedBox.square(
          dimension: 44,
          child: Center(
            child: Container(
              width: 36,
              height: 36,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: background ?? const Color(0x59000000),
                shape: BoxShape.circle,
                boxShadow: background == null ? null : AppShadows.badge,
              ),
              child: AppSvg(icon, size: iconSize, color: color),
            ),
          ),
        ),
      ),
    );
  }
}

class _Price extends StatelessWidget {
  const _Price({required this.product});

  final HomeProduct product;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.center,
      spacing: 5,
      children: [
        Text(
          NumberFormatUtil.baht(product.price),
          style: AppTextStyles.bold(24, lineHeight: 34, color: AppColors.brand),
        ),
        if (product.hasDiscount)
          Text(
            NumberFormatUtil.baht(product.originalPrice),
            style: AppTextStyles.regular(16, lineHeight: 24, color: AppColors.textMuted).copyWith(
              decoration: TextDecoration.lineThrough,
              decorationColor: AppColors.textMuted,
            ),
          ),
      ],
    );
  }
}

class _RatingRow extends StatelessWidget {
  const _RatingRow({required this.product});

  final HomeProduct product;

  @override
  Widget build(BuildContext context) {
    final muted = AppTextStyles.regular(14, lineHeight: 18, color: AppColors.textMuted);
    return Row(
      spacing: 8,
      children: [
        Row(spacing: 4, children: [const AppSvg(AppIcons.star, size: 12), Text(product.rating, style: muted)]),
        Container(width: 1, height: 12, color: AppColors.divider),
        Text('ขายแล้ว ${NumberFormatUtil.compact(product.soldCount)} ชิ้น', style: muted),
      ],
    );
  }
}

/// Grey pills, each a trust badge from the product's data with its icon on a
/// white disc: รับรอง มอก. / อย., ปลอมคืนเงิน 2 เท่า, จัดส่งฟรี.
class _TrustTags extends StatelessWidget {
  const _TrustTags({required this.badges, this.fdaNumber, this.tisNumber});

  final List<String> badges;

  /// Shown under "รับรอง อย." / "รับรอง มอก." when known.
  final String? fdaNumber;
  final String? tisNumber;

  static const _labels = {
    AppIcons.tisBadgeSmall: 'รับรอง มอก.',
    AppIcons.fdaBadge: 'รับรอง อย.',
    AppIcons.moneySecurityRed: 'ปลอมคืนเงิน 2 เท่า',
    AppIcons.deliveryTruck: 'จัดส่งฟรี',
  };

  @override
  Widget build(BuildContext context) {
    final tags = [for (final b in badges) if (_labels[b] case final label?) (b, label)];
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [
        for (final (icon, label) in tags)
          Container(
            padding: const EdgeInsets.fromLTRB(4, 4, 12, 4),
            decoration: BoxDecoration(color: AppColors.iconButtonBg, borderRadius: BorderRadius.circular(999)),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              spacing: 8,
              children: [
                Container(
                  width: 32,
                  height: 32,
                  alignment: Alignment.center,
                  decoration: const BoxDecoration(color: AppColors.white, shape: BoxShape.circle),
                  child: AppSvg(icon, size: 24),
                ),
                Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(label, style: AppTextStyles.heading(14, lineHeight: 18, color: AppColors.black, weight: FontWeight.w400)),
                    if (switch (icon) {
                      AppIcons.fdaBadge when fdaNumber != null => 'เลข อย. $fdaNumber',
                      AppIcons.tisBadgeSmall when tisNumber != null => 'เลข มอก. $tisNumber',
                      _ => null,
                    }
                        case final number?)
                      Text(
                        number,
                        style: AppTextStyles.regular(12, lineHeight: 16, color: AppColors.textSecondary)
                            .copyWith(fontFeatures: const [FontFeature.tabularFigures()]),
                      ),
                  ],
                ),
              ],
            ),
          ),
      ],
    );
  }
}

class _Description extends StatelessWidget {
  const _Description({required this.intro, required this.highlights});

  final List<String> intro;
  final List<String> highlights;

  @override
  Widget build(BuildContext context) {
    final body = AppTextStyles.regular(14, lineHeight: 20, color: AppColors.textHeading);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (final para in intro) Text(para, style: body),
        if (highlights.isNotEmpty) ...[
          const SizedBox(height: 20),
          Text('จุดเด่น', style: body),
          for (final h in highlights)
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(width: 21, child: Text('•', textAlign: TextAlign.center, style: body)),
                Expanded(child: Text(h, style: body)),
              ],
            ),
        ],
      ],
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle(this.text);

  final String text;

  @override
  Widget build(BuildContext context) =>
      Text(text, style: AppTextStyles.heading(14, lineHeight: 20, color: AppColors.textHeading));
}

/// Review video cards, scrolling sideways past the right edge.
class _Videos extends StatelessWidget {
  const _Videos({required this.videos});

  final List<ProductVideo> videos;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      clipBehavior: Clip.none,
      child: Row(
        spacing: 8,
        children: [for (final v in videos) _VideoCard(video: v)],
      ),
    );
  }
}

class _VideoCard extends StatelessWidget {
  const _VideoCard({required this.video});

  final ProductVideo video;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: 'เล่นวิดีโอ ${video.caption}',
      excludeSemantics: true,
      child: Container(
        width: 148,
        height: 192,
        clipBehavior: Clip.antiAlias,
        decoration: BoxDecoration(borderRadius: BorderRadius.circular(16), boxShadow: AppShadows.soft),
        child: Stack(
          fit: StackFit.expand,
          children: [
            Image.asset(video.thumbnail, fit: BoxFit.cover),
            // Dark fade at the bottom so the caption reads on any photo.
            const DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Color(0x00666666), Color(0x99000000)],
                  stops: [0.47, 1],
                ),
              ),
            ),
            const Center(child: AppSvg(AppIcons.playCircle, size: 48)),
            Positioned(
              left: 8,
              right: 8,
              bottom: 8,
              child: Text(
                video.caption,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: AppTextStyles.regular(14, lineHeight: 18, color: const Color(0xFFFAFAFA)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ShopRow extends StatelessWidget {
  const _ShopRow({required this.shop});

  final ProductShop shop;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        ClipOval(child: Image.asset(shop.avatar, width: 56, height: 56, fit: BoxFit.cover)),
        const SizedBox(width: 8),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            spacing: 4,
            children: [
              Text(
                shop.name,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: AppTextStyles.heading(16, lineHeight: 18, color: AppColors.black),
              ),
              switch (shop.mark) {
                ShopMark.mall => const MallBadge(),
                ShopMark.verified => Container(
                    height: 24,
                    padding: const EdgeInsets.only(left: 6, right: 8),
                    decoration: BoxDecoration(color: AppColors.chipFill, borderRadius: BorderRadius.circular(999)),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      spacing: 4,
                      children: [
                        const AppSvg(AppIcons.checkmarkBadge, size: 16),
                        Text(
                          'ตรวจสอบแล้ว',
                          style: AppTextStyles.heading(12, lineHeight: 18, color: AppColors.textChip, weight: FontWeight.w400),
                        ),
                      ],
                    ),
                  ),
                ShopMark.none => const SizedBox.shrink(),
              },
            ],
          ),
        ),
        const SizedBox(width: 8),
        OutlinedButton(
          onPressed: () {},
          style: OutlinedButton.styleFrom(
            foregroundColor: AppColors.brand,
            side: const BorderSide(color: AppColors.brand),
            minimumSize: const Size(106, 44),
            padding: const EdgeInsets.symmetric(horizontal: 12),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            textStyle: AppTextStyles.heading(14, lineHeight: 18, weight: FontWeight.w400),
          ),
          child: const Text('ดูร้านค้า >'),
        ),
      ],
    );
  }
}

/// Small product cards from the same shop, scrolling sideways.
class _Related extends StatelessWidget {
  const _Related({required this.products});

  final List<HomeProduct> products;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      clipBehavior: Clip.none,
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          spacing: 8,
          children: [for (final p in products) _RelatedCard(product: p)],
        ),
      ),
    );
  }
}

class _RelatedCard extends StatelessWidget {
  const _RelatedCard({required this.product});

  final HomeProduct product;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 126,
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE9E9E9)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.asset(product.image, width: 124, height: 124, fit: BoxFit.cover),
          Padding(
            padding: const EdgeInsets.all(8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              spacing: 4,
              children: [
                Text(
                  product.title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: AppTextStyles.heading(14, lineHeight: 16, color: const Color(0xFF030712), weight: FontWeight.w400),
                ),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.baseline,
                  textBaseline: TextBaseline.alphabetic,
                  spacing: 4,
                  children: [
                    Text(NumberFormatUtil.baht(product.price), style: AppTextStyles.bold(14, lineHeight: 20, color: AppColors.brand)),
                    if (product.hasDiscount)
                      Flexible(
                        child: Text(
                          NumberFormatUtil.baht(product.originalPrice),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: AppTextStyles.regular(12, lineHeight: 16, color: AppColors.textSecondary).copyWith(
                            decoration: TextDecoration.lineThrough,
                            decorationColor: AppColors.textSecondary,
                          ),
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Fixed bottom bar: a line button and the one primary button.
class _ActionBar extends StatelessWidget {
  const _ActionBar();

  @override
  Widget build(BuildContext context) {
    final shape = RoundedRectangleBorder(borderRadius: BorderRadius.circular(12));
    return DecoratedBox(
      decoration: const BoxDecoration(
        color: AppColors.white,
        border: Border(top: BorderSide(color: AppColors.iconButtonBg)),
      ),
      child: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            spacing: 12,
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () {},
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color(0xFF282828),
                    side: const BorderSide(color: AppColors.controlBorder),
                    minimumSize: const Size.fromHeight(48),
                    shape: shape,
                    textStyle: AppTextStyles.heading(16, lineHeight: 18, weight: FontWeight.w400),
                  ),
                  child: const Text('เพิ่มลงในตะกร้า'),
                ),
              ),
              Expanded(
                child: FilledButton(
                  onPressed: () {},
                  style: FilledButton.styleFrom(
                    backgroundColor: AppColors.brand,
                    foregroundColor: AppColors.white,
                    minimumSize: const Size.fromHeight(48),
                    shape: shape,
                    textStyle: AppTextStyles.heading(16, lineHeight: 18),
                  ),
                  child: const Text('ซื้อเลย'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
