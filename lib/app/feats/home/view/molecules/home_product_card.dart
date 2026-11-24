import 'package:flutter/material.dart';

import '../../../../shared/constants/app_assets.dart';
import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';
import '../../../../shared/utils/number_format_util.dart';
import '../../../../shared/widgets/app_svg.dart';
import '../../../../shared/widgets/mall_badge.dart';
import '../../model/home_models.dart';

/// Product tile in the masonry feed.
class HomeProductCard extends StatelessWidget {
  const HomeProductCard({super.key, required this.product, this.onTap});

  final HomeProduct product;
  final VoidCallback? onTap;

  /// Width the Figma frame was drawn at; crops are expressed in these units.
  static const _designWidth = 175.0;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final imageHeight = width; // square

        return Container(
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            color: AppColors.white,
            borderRadius: BorderRadius.circular(12),
            boxShadow: AppShadows.soft,
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: onTap,
              child: Stack(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: Column(
                      spacing: 8,
                      children: [
                        SizedBox(
                          width: width,
                          height: imageHeight,
                          child: _ProductImage(product: product, factor: width / _designWidth),
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 8),
                          child: _ProductInfo(product: product),
                        ),
                      ],
                    ),
                  ),
                  // Trust badges straddle the bottom edge of the image, on the
                  // right.
                  Positioned(
                    right: product.badgeInset,
                    top: imageHeight - 16,
                    child: Row(
                      spacing: 4,
                      children: [for (final b in product.badges) _BadgeDisc(icon: b)],
                    ),
                  ),
                  if (product.hasDiscount)
                    // Red pill on the photo's top-right corner (Figma 3567:3498).
                    Positioned(top: 4, right: 3, child: _DiscountBadge(discount: product.discount!)),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class _ProductImage extends StatelessWidget {
  const _ProductImage({required this.product, required this.factor});

  final HomeProduct product;
  final double factor;

  @override
  Widget build(BuildContext context) {
    final crop = product.imageCrop;
    if (crop == null) return Image.asset(product.image, fit: BoxFit.cover);

    final r = crop.scaled(factor);
    return ClipRect(
      child: Stack(
        clipBehavior: Clip.hardEdge,
        children: [
          Positioned(
            left: r.left,
            top: r.top,
            width: r.width,
            height: r.height,
            child: Image.asset(product.image, fit: BoxFit.cover),
          ),
        ],
      ),
    );
  }
}

class _ProductInfo extends StatelessWidget {
  const _ProductInfo({required this.product});

  final HomeProduct product;

  @override
  Widget build(BuildContext context) {
    final muted = AppTextStyles.regular(12, lineHeight: 18, color: AppColors.textMuted);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      spacing: 8,
      children: [
        // Height follows the text: a one-line title pulls the price up
        // instead of reserving a second line.
        Padding(
          padding: const EdgeInsets.only(top: 2.5),
          // The shop's mark leads the first line of the title, the text wraps
          // after it: the red "Mall" tag (Figma 3431:1830) for Mall shops, the
          // red check mark for verified shops, nothing for the others.
          child: Text.rich(
            TextSpan(children: [
              if (product.isVerified) ...const [
                WidgetSpan(alignment: PlaceholderAlignment.middle, child: MallBadge()),
                TextSpan(text: ' '),
              ] else if (product.isShopVerified) ...[
                WidgetSpan(
                  alignment: PlaceholderAlignment.middle,
                  child: Semantics(
                    label: 'ร้านตรวจสอบแล้ว',
                    child: const AppSvg(AppIcons.checkmarkBadge, size: 16),
                  ),
                ),
                const TextSpan(text: ' '),
              ],
              TextSpan(text: product.title),
            ]),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: AppTextStyles.heading(14, lineHeight: 18, color: AppColors.black, weight: FontWeight.w400),
          ),
        ),
        // Wrap, not Row: a seven-digit price leaves no room beside it, so the
        // struck-through price moves to the next line instead of being cut.
        Wrap(
          crossAxisAlignment: WrapCrossAlignment.center,
          spacing: 5,
          runSpacing: 4,
          children: [
            Text(
              NumberFormatUtil.baht(product.price),
              style: AppTextStyles.bold(20, lineHeight: 18, color: AppColors.brand),
            ),
            if (product.hasDiscount)
              Text(
                NumberFormatUtil.baht(product.originalPrice),
                maxLines: 1,
                style: AppTextStyles.regular(14, lineHeight: 16, color: AppColors.textMuted).copyWith(
                  decoration: TextDecoration.lineThrough,
                  decorationColor: AppColors.textMuted,
                ),
              ),
          ],
        ),
        Row(
          spacing: 8,
          children: [
            Row(
              spacing: 4,
              children: [const AppSvg(AppIcons.star, size: 12), Text(product.rating, style: muted)],
            ),
            Container(width: 1, height: 12, color: AppColors.divider),
            Flexible(
              child: Text(
                'ขายแล้ว ${NumberFormatUtil.compact(product.soldCount)} ชิ้น',
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: muted,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

/// "ลด 30%" / "ลด ฿100" on a red pill, white Sukhumvit bold text (Figma 3567:3498).
class _DiscountBadge extends StatelessWidget {
  const _DiscountBadge({required this.discount});

  final ProductDiscount discount;

  @override
  Widget build(BuildContext context) {
    final (text, spoken) = switch (discount) {
      PercentDiscount(:final percent) => ('ลด $percent%', 'ลด $percent%'),
      AmountDiscount(:final baht) => ('ลด ${NumberFormatUtil.baht(baht)}', 'ลด ${NumberFormatUtil.grouped(baht)} บาท'),
    };

    return Semantics(
      label: spoken,
      excludeSemantics: true,
      child: Container(
        height: 20,
        padding: const EdgeInsets.symmetric(horizontal: 4),
        alignment: Alignment.center,
        decoration: BoxDecoration(color: AppColors.brand, borderRadius: BorderRadius.circular(12)),
        child: Text(text, style: AppTextStyles.heading(12, lineHeight: 18, color: AppColors.white)),
      ),
    );
  }
}

class _BadgeDisc extends StatelessWidget {
  const _BadgeDisc({required this.icon});

  final String icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 24,
      height: 24,
      alignment: Alignment.center,
      decoration: const BoxDecoration(color: AppColors.white, shape: BoxShape.circle, boxShadow: AppShadows.badge),
      child: AppSvg(icon, size: 16),
    );
  }
}
