import 'package:flutter/material.dart';

import '../../../../shared/constants/app_assets.dart';
import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';
import '../../../../shared/widgets/app_svg.dart';

/// Section title with an optional "ดูทั้งหมด >" link.
class HomeSectionHeader extends StatelessWidget {
  const HomeSectionHeader({super.key, required this.title, this.onSeeAll});

  final String title;
  final VoidCallback? onSeeAll;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: AppTextStyles.heading(14, lineHeight: 20)),
          if (onSeeAll != null)
            InkWell(
              onTap: onSeeAll,
              borderRadius: BorderRadius.circular(4),
              child: Row(
                spacing: 2,
                children: [
                  Text('ดูทั้งหมด', style: AppTextStyles.heading(12, lineHeight: 18, color: AppColors.textSubtle, weight: FontWeight.w400)),
                  const AppSvg(AppIcons.chevronRight, size: 16),
                ],
              ),
            ),
        ],
      ),
    );
  }
}
