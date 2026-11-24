import 'package:flutter/material.dart';

import '../../../../shared/constants/app_assets.dart';
import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';
import '../../../../shared/widgets/app_svg.dart';
import '../../../../shared/widgets/mall_badge.dart';
import '../../model/home_models.dart';

/// Compact shop card for a category's "ร้าน/แบรนด์แนะนำ": the shop's logo
/// only (no cover photo), with its name underneath. The shop's mark sits
/// centred on the logo's top edge: the red "Mall" tag for Mall shops, the
/// red check mark for verified shops.
class HomeBrandLogoCard extends StatelessWidget {
  const HomeBrandLogoCard({super.key, required this.brand, this.onTap});

  final HomeBrand brand;
  final VoidCallback? onTap;

  static const width = 72.0;
  static const _logoSize = 64.0;

  /// The verified mark: a red check on a white disc, centred on the logo's
  /// bottom edge like the Mall tag.
  static const _markSize = 20.0;

  @override
  Widget build(BuildContext context) {
    final name = Text(
      brand.name,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
      textAlign: TextAlign.center,
      style: AppTextStyles.heading(12, lineHeight: 18, weight: FontWeight.w400),
    );

    return Semantics(
      button: true,
      label: brand.name,
      excludeSemantics: true,
      child: InkWell(
        onTap: onTap ?? () {},
        borderRadius: BorderRadius.circular(12),
        child: SizedBox(
          width: width,
          // Room above for the mark sticking out over the logo's top edge.
          child: Column(
            spacing: 6,
            children: [
              const SizedBox(height: _markSize / 2 - 6),
              Stack(
                clipBehavior: Clip.none,
                alignment: Alignment.topCenter,
                children: [
                  Container(
                    width: _logoSize,
                    height: _logoSize,
                    clipBehavior: Clip.antiAlias,
                    // Rounded square logo, 12px corners.
                    decoration: BoxDecoration(
                      color: AppColors.white,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: AppShadows.card,
                    ),
                    // Grey edge drawn over the logo, so the photo never covers it.
                    foregroundDecoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.controlBorder),
                    ),
                    child: Image.asset(brand.avatar, fit: BoxFit.cover),
                  ),
                  if (brand.isMall)
                    const Positioned(top: -MallBadge.height / 2, child: MallBadge())
                  else if (brand.isVerified)
                    Positioned(
                      top: -_markSize / 2,
                      child: Container(
                        width: _markSize,
                        height: _markSize,
                        alignment: Alignment.center,
                        decoration: const BoxDecoration(
                          color: AppColors.white,
                          shape: BoxShape.circle,
                          boxShadow: AppShadows.badge,
                        ),
                        child: const AppSvg(AppIcons.checkmarkBadge, size: 16),
                      ),
                    ),
                ],
              ),
              name,
            ],
          ),
        ),
      ),
    );
  }
}
