import 'package:flutter/material.dart';

import '../../../../shared/constants/app_assets.dart';
import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';
import '../../../../shared/widgets/app_svg.dart';
import '../../../../shared/widgets/mall_badge.dart';
import '../../model/home_models.dart';

/// "ร้านดีแนะนำ" card: one cover photo, shop avatar and name.
///
/// Compact version: every box is 70% of the Figma card (261 → 183 wide).
/// Text is reduced less than that so it stays readable.
class HomeBrandCard extends StatelessWidget {
  const HomeBrandCard({super.key, required this.brand});

  final HomeBrand brand;

  static const width = 150.0; // 390 screen: 16 + 150 + 12 + 150 + 12 + a third of the next card
  static const _coverHeight = 97.0;
  static const _avatarSize = 44.0;
  static const _avatarOverlap = _avatarSize / 2; // half the avatar sits on the cover photo

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      clipBehavior: Clip.antiAlias,
      padding: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.cardBorder),
        boxShadow: AppShadows.card,
      ),
      child: Column(
        // Stretch: the name and tagline start at the left edge, not centred.
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // The avatar overlaps the cover photo: lay the cover photo out shorter and
          // let it overflow under the content painted after it.
          SizedBox(
            height: _coverHeight - _avatarOverlap,
            child: OverflowBox(
              alignment: Alignment.topCenter,
              maxHeight: _coverHeight,
              child: _Cover(brand: brand),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              spacing: 3,
              children: [
                _Avatar(image: brand.avatar, mark: brand.isMall ? ShopMark.mall : (brand.isVerified ? ShopMark.verified : ShopMark.none)),
                Text(
                  brand.name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: AppTextStyles.heading(14, lineHeight: 20),
                ),
                Text(
                  brand.tagline,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: AppTextStyles.regular(11, lineHeight: 14, color: AppColors.textSecondary),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// One cover photo across the card's full width (inside its 1px border).
/// The photo is cropped to the strip, keeping its upper middle; the lower part
/// sits behind the avatar anyway.
class _Cover extends StatelessWidget {
  const _Cover({required this.brand});

  final HomeBrand brand;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: HomeBrandCard.width - 2,
      height: HomeBrandCard._coverHeight,
      color: AppColors.bannerBg,
      child: Image.asset(brand.coverImage, fit: BoxFit.cover, alignment: const Alignment(0, -0.5)),
    );
  }
}

class _Avatar extends StatelessWidget {
  const _Avatar({required this.image, required this.mark});

  final String image;

  /// Centred on the logo's top edge: the red "Mall" tag, or the red check
  /// mark on a white disc for verified shops.
  final ShopMark mark;

  @override
  Widget build(BuildContext context) {
    final avatar = Container(
      width: HomeBrandCard._avatarSize,
      height: HomeBrandCard._avatarSize,
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppColors.white, width: 1.5),
        boxShadow: AppShadows.avatar,
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(8.5),
        child: Image.asset(image, fit: BoxFit.cover),
      ),
    );
    if (mark == ShopMark.none) return avatar;

    return Semantics(
      label: mark == ShopMark.mall ? MallBadge.label : 'ร้านตรวจสอบแล้ว',
      child: Stack(
        clipBehavior: Clip.none,
        alignment: Alignment.topCenter,
        children: [
          avatar,
          if (mark == ShopMark.mall)
            const Positioned(top: -MallBadge.height / 2, child: ExcludeSemantics(child: MallBadge()))
          else
            Positioned(
              top: -10,
              child: Container(
                width: 20,
                height: 20,
                alignment: Alignment.center,
                decoration: const BoxDecoration(color: AppColors.white, shape: BoxShape.circle, boxShadow: AppShadows.badge),
                child: const AppSvg(AppIcons.checkmarkBadge, size: 16),
              ),
            ),
        ],
      ),
    );
  }
}
