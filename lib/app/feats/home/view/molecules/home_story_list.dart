import 'package:flutter/material.dart';

import '../../../../shared/auth/auth_scope.dart';
import '../../../../shared/constants/app_assets.dart';
import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';
import '../../../../shared/widgets/app_svg.dart';
import '../../../../shared/widgets/login_prompt_sheet.dart';
import '../../../../shared/widgets/mall_badge.dart';
import '../../model/home_models.dart';
import 'home_live_badge.dart';
import 'home_live_ring.dart';

/// Horizontal row of creator stories with a red ring.
class HomeStoryList extends StatelessWidget {
  const HomeStoryList({super.key, required this.stories, this.onTap});

  final List<HomeStory> stories;
  final ValueChanged<HomeStory>? onTap;

  @override
  Widget build(BuildContext context) {
    final loggedIn = AuthScope.isLoggedIn(context);
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      // The shop marks stick out above the rings.
      clipBehavior: Clip.none,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        spacing: 16,
        children: [
          for (final s in stories)
            if (s.badge == StoryBadge.add && !loggedIn)
              // Logged out: no own story yet; this asks them to log in instead.
              _GuestStoryItem(onTap: () => LoginPromptSheet.show(context, action: 'ลงสตอรี่ของคุณ'))
            else
              _StoryItem(story: s, onTap: () => onTap?.call(s)),
        ],
      ),
    );
  }
}

class _StoryItem extends StatelessWidget {
  const _StoryItem({required this.story, required this.onTap});

  final HomeStory story;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      // At least the 64px ring; wider names (e.g. "สตอรี่ของคุณ") widen the
      // slot up to 96px before they ellipsize.
      child: ConstrainedBox(
        constraints: const BoxConstraints(minWidth: 64, maxWidth: 96),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          spacing: 8,
          children: [
            SizedBox.square(
              dimension: 64,
              child: Stack(
                clipBehavior: Clip.none,
                children: [
                  HomeLiveRing(
                    enabled: story.badge == StoryBadge.live,
                    child: Container(
                      padding: const EdgeInsets.all(2), // 2px ring + 4px padding minus ring
                      decoration: BoxDecoration(
                        color: AppColors.white,
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: story.hasStory ? AppColors.brand : AppColors.storyRingEmpty,
                          width: 2,
                        ),
                      ),
                      alignment: Alignment.center,
                      // Live: the photo breathes 0.88 ↔ 1.06 (about 49 ↔ 59 of the
                      // ring's 60 inside); the ring itself stays put.
                      child: HomeLivePulse(
                        enabled: story.badge == StoryBadge.live,
                        child: ClipOval(
                          child: SizedBox.square(
                            dimension: 56,
                            child: Transform.scale(
                              scale: story.zoom,
                              child: Image.asset(story.image, fit: BoxFit.cover, width: 56, height: 56),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  if (story.badge == StoryBadge.add)
                    Positioned(
                      right: -2,
                      top: 40,
                      child: Container(
                        width: 22,
                        height: 22,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          color: AppColors.brand,
                          shape: BoxShape.circle,
                          border: Border.all(color: AppColors.white, width: 2),
                        ),
                        child: const AppSvg(AppIcons.plusBadge, size: 12),
                      ),
                    ),
                  if (story.badge == StoryBadge.live) const Positioned(left: 8, top: 50, child: HomeLiveBadge()),
                  // Shop mark centred on the ring's top edge, as on the shop cards.
                  if (story.shopMark == ShopMark.mall)
                    const Positioned(
                      top: -MallBadge.height / 2,
                      left: 0,
                      right: 0,
                      child: Center(child: MallBadge()),
                    )
                  else if (story.shopMark == ShopMark.verified)
                    Positioned(
                      top: -10,
                      left: 0,
                      right: 0,
                      child: Center(
                        child: Semantics(
                          label: 'ร้านตรวจสอบแล้ว',
                          child: Container(
                            width: 20,
                            height: 20,
                            alignment: Alignment.center,
                            decoration: const BoxDecoration(
                              color: AppColors.white,
                              shape: BoxShape.circle,
                              boxShadow: AppShadows.badge,
                            ),
                            child: const AppSvg(AppIcons.checkmarkBadge, size: 16),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
            Text(
              story.name,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.center,
              style: AppTextStyles.heading(14, lineHeight: 18, weight: FontWeight.w400),
            ),
          ],
        ),
      ),
    );
  }
}

/// First story slot when logged out: a grey person in a grey ring, "เข้าสู่ระบบ".
class _GuestStoryItem extends StatelessWidget {
  const _GuestStoryItem({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: 'เข้าสู่ระบบ',
      excludeSemantics: true,
      child: GestureDetector(
        onTap: onTap,
        // Same slot rules as a story: at least 64, wider for the label.
        child: ConstrainedBox(
          constraints: const BoxConstraints(minWidth: 64, maxWidth: 96),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            spacing: 8,
            children: [
              Container(
                width: 64,
                height: 64,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: AppColors.iconButtonBg,
                  shape: BoxShape.circle,
                  border: Border.all(color: AppColors.storyRingEmpty, width: 2),
                ),
                child: const AppSvg(AppIcons.guestUser, size: 28, color: AppColors.textMuted),
              ),
              Text('เข้าสู่ระบบ', maxLines: 1, style: AppTextStyles.heading(14, lineHeight: 18, weight: FontWeight.w400)),
            ],
          ),
        ),
      ),
    );
  }
}
