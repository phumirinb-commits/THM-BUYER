import 'package:flutter/widgets.dart';

import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';
import 'app_svg.dart';

enum TrustChipSize {
  /// 32 high, icon in a white 24px disc, 14px label — home trust row.
  large,

  /// 24 high, bare 16px icon, 12px label — inside cards.
  small,

  /// 24 high, bare 12px icon, 10px label — compact brand card.
  compact,
}

/// Pill chip with an icon and a short trust label (e.g. "ร้านทางการ").
class TrustChip extends StatelessWidget {
  const TrustChip({super.key, required this.icon, required this.label, this.size = TrustChipSize.small});

  final String icon;
  final String label;
  final TrustChipSize size;

  @override
  Widget build(BuildContext context) {
    final isLarge = size == TrustChipSize.large;
    final isCompact = size == TrustChipSize.compact;
    final iconWidget = AppSvg(icon, size: isCompact ? 12 : 16);

    return Container(
      height: switch (size) {
        TrustChipSize.large => 32,
        TrustChipSize.small => 24,
        // Matches the brand card's 24px follow button.
        TrustChipSize.compact => 24,
      },
      padding: isCompact ? const EdgeInsets.only(left: 4, right: 6) : const EdgeInsets.only(left: 6, right: 8),
      decoration: BoxDecoration(color: AppColors.chipFill, borderRadius: BorderRadius.circular(999)),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        spacing: isCompact ? 3 : 4,
        children: [
          if (isLarge)
            Container(
              width: 24,
              height: 24,
              alignment: Alignment.center,
              decoration: const BoxDecoration(color: AppColors.white, shape: BoxShape.circle),
              child: iconWidget,
            )
          else
            iconWidget,
          Text(
            label,
            style: AppTextStyles.regular(
              switch (size) {
                TrustChipSize.large => 14,
                TrustChipSize.small => 12,
                TrustChipSize.compact => 10,
              },
              lineHeight: isCompact ? 14 : 18,
              color: AppColors.textChip,
            ),
          ),
        ],
      ),
    );
  }
}
