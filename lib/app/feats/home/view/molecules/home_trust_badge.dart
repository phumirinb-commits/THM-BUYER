import 'package:flutter/material.dart';

import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';
import '../../../../shared/widgets/app_svg.dart';
import '../../model/home_models.dart';

/// One pill holding every trust promise (e.g. "ของแท้ต้องไทยมาร์ท | ปลอมคืนเงิน 2 เท่า"),
/// with a thin divider between the items. Tapping anywhere on it calls [onTap].
class HomeTrustBadge extends StatelessWidget {
  const HomeTrustBadge({super.key, required this.items, this.onTap});

  final List<HomeTrust> items;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppColors.white, // plain white, no edge: blends into the page
      shape: const StadiumBorder(),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Container(
          height: 32,
          padding: const EdgeInsets.symmetric(horizontal: 8),
          // Full-width pill; the promises sit together as one group in the
          // middle, 12px either side of each divider.
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              for (var i = 0; i < items.length; i++) ...[
                if (i > 0)
                  Container(
                    width: 1,
                    height: 16,
                    margin: const EdgeInsets.symmetric(horizontal: 12),
                    color: AppColors.divider,
                  ),
                _Item(trust: items[i]),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _Item extends StatelessWidget {
  const _Item({required this.trust});

  final HomeTrust trust;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      spacing: 4,
      children: [
        // Icon on its own (20px by default): the pill is white now, so a white disc behind
        // it would not show anyway.
        AppSvg(trust.icon, size: trust.iconSize),
        Text(trust.label, style: AppTextStyles.heading(14, lineHeight: 18, color: AppColors.textChip)),
      ],
    );
  }
}
