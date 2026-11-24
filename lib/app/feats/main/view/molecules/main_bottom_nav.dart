import 'package:flutter/material.dart';

import '../../../../shared/constants/app_assets.dart';
import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';
import '../../../../shared/widgets/app_svg.dart';

class MainNavItem {
  const MainNavItem({required this.icon, required this.label});

  final String icon;
  final String label;
}

const mainNavItems = [
  MainNavItem(icon: AppIcons.navHome, label: 'หน้าแรก'),
  MainNavItem(icon: AppIcons.navDiscover, label: 'ค้นพบ'),
  MainNavItem(icon: AppIcons.navLive, label: 'ไลฟ์'),
  MainNavItem(icon: AppIcons.navOrder, label: 'คำสั่งซื้อ'),
  MainNavItem(icon: AppIcons.navProfile, label: 'โปรไฟล์'),
];

/// 80px bottom bar. Icons are 32 wide with a 40 gap from x=32, so each
/// slot is 72 wide centred on that icon.
class MainBottomNav extends StatelessWidget {
  const MainBottomNav({super.key, required this.selectedIndex, required this.onSelected});

  final int selectedIndex;
  final ValueChanged<int> onSelected;

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.paddingOf(context).bottom;

    return Container(
      height: 80 + bottomInset,
      padding: EdgeInsets.only(bottom: bottomInset),
      decoration: const BoxDecoration(color: AppColors.white, boxShadow: AppShadows.bottomNav),
      child: Padding(
        padding: const EdgeInsets.only(left: 12, bottom: 14),
        child: Row(
          children: [
            for (var i = 0; i < mainNavItems.length; i++)
              _NavSlot(item: mainNavItems[i], selected: i == selectedIndex, onTap: () => onSelected(i)),
          ],
        ),
      ),
    );
  }
}

class _NavSlot extends StatelessWidget {
  const _NavSlot({required this.item, required this.selected, required this.onTap});

  final MainNavItem item;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final style = selected
        ? AppTextStyles.heading(12, lineHeight: 18, color: AppColors.brand)
        : AppTextStyles.heading(12, lineHeight: 18, color: AppColors.navInactive, weight: FontWeight.w400);

    return Semantics(
      button: true,
      selected: selected,
      label: item.label,
      child: InkResponse(
        onTap: onTap,
        radius: 32,
        child: SizedBox(
          width: 72,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // The exported icons carry the active (red) / inactive (grey) colour themselves.
              AppSvg(item.icon, size: 32),
              Text(item.label, style: style, textAlign: TextAlign.center),
            ],
          ),
        ),
      ),
    );
  }
}
