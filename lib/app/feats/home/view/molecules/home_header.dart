import 'package:flutter/material.dart';

import '../../../../shared/auth/auth_scope.dart';
import '../../../../shared/constants/app_assets.dart';
import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';
import '../../../../shared/widgets/app_svg.dart';

/// Logo + search / notification / cart, over a pink-to-white gradient that
/// also sits behind the status bar.
class HomeHeader extends StatelessWidget {
  const HomeHeader({super.key, this.hasUnreadNotification = true, this.cartCount = 0});

  final bool hasUnreadNotification;

  /// Items in the cart; 0 hides the count, over 99 shows "99+".
  final int cartCount;

  @override
  Widget build(BuildContext context) {
    final topInset = MediaQuery.paddingOf(context).top;
    // Logged out: nothing of theirs to count yet.
    final loggedIn = AuthScope.isLoggedIn(context);
    final cartCount = loggedIn ? this.cartCount : 0;

    return DecoratedBox(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: const [AppColors.brandTint, AppColors.white],
          // Figma: white is reached at 63.178% of the 112px header.
          stops: [0, 0.63178 * 112 / (topInset + 56)],
        ),
      ),
      child: Padding(
        padding: EdgeInsets.only(top: topInset, left: 16, right: 16),
        child: SizedBox(
          height: 56,
          child: Row(
            children: [
              const AppSvg(AppIcons.logoMark, size: 32),
              const SizedBox(width: 4),
              const AppSvg(AppIcons.logoWordmark, size: 94.6666, height: 16.6678),
              const Spacer(),
              _CircleIconButton(icon: AppIcons.search, iconSize: 22, tooltip: 'ค้นหา', onTap: () {}),
              const SizedBox(width: 12),
              _CircleIconButton(
                icon: AppIcons.notification,
                tooltip: 'การแจ้งเตือน',
                showDot: loggedIn && hasUnreadNotification,
                onTap: () {},
              ),
              const SizedBox(width: 12),
              _CircleIconButton(
                icon: AppIcons.cart,
                tooltip: cartCount > 0 ? 'ตะกร้าสินค้า $cartCount ชิ้น' : 'ตะกร้าสินค้า',
                count: cartCount,
                onTap: () {},
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _CircleIconButton extends StatelessWidget {
  const _CircleIconButton({
    required this.icon,
    required this.tooltip,
    required this.onTap,
    this.iconSize = 24,
    this.showDot = false,
    this.count = 0,
  });

  /// Red count pill at the top-right; "99+" past 99.
  static String countLabel(int count) => count > 99 ? '99+' : '$count';

  final String icon;
  final String tooltip;
  final VoidCallback onTap;
  final double iconSize;
  final bool showDot;
  final int count;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: tooltip,
      child: Material(
        color: AppColors.iconButtonBg,
        shape: const CircleBorder(),
        child: InkWell(
          customBorder: const CircleBorder(),
          onTap: onTap,
          child: SizedBox.square(
            dimension: 40,
            child: Stack(
              // The count pill sticks out past the 40px circle.
              clipBehavior: Clip.none,
              alignment: Alignment.center,
              children: [
                AppSvg(icon, size: iconSize),
                if (count > 0)
                  Positioned(
                    top: -4,
                    right: -6,
                    child: ExcludeSemantics(
                      child: Container(
                        height: 18,
                        constraints: const BoxConstraints(minWidth: 18),
                        padding: const EdgeInsets.symmetric(horizontal: 4),
                        decoration: BoxDecoration(
                          color: AppColors.brand,
                          borderRadius: BorderRadius.circular(999),
                          // White ring so it reads on the soft red top too.
                          border: Border.all(color: AppColors.white, width: 1.5),
                        ),
                        child: Center(
                          widthFactor: 1,
                          child: Text(
                            countLabel(count),
                            style: AppTextStyles.bold(10, lineHeight: 12, color: AppColors.white),
                          ),
                        ),
                      ),
                    ),
                  ),
                if (showDot)
                  const Positioned(
                    left: 22,
                    top: 6,
                    child: SizedBox.square(
                      dimension: 10,
                      child: DecoratedBox(
                        decoration: BoxDecoration(color: AppColors.brand, shape: BoxShape.circle),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
