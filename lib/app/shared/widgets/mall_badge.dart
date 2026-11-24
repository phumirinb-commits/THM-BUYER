import 'package:flutter/widgets.dart';

import '../constants/app_assets.dart';
import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';
import 'app_svg.dart';

/// Red "Mall" tag for official shops, set in front of the product title —
/// Figma 3431:1830: a slanted red pill (44 x 16) with "Mall" in bold white.
class MallBadge extends StatelessWidget {
  const MallBadge({super.key});

  /// What screen readers say for the official-shop mark.
  static const label = 'Mall';

  static const width = 44.0;
  static const height = 16.0;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: label,
      excludeSemantics: true,
      child: SizedBox(
        width: width,
        height: height,
        child: Stack(
          alignment: Alignment.center,
          children: [
            // The shape is 40.5 wide, centred in the 44 box (inset 4% each side).
            const AppSvg(AppIcons.thmMallTag, size: 40.5, height: height),
            Text('Mall', style: AppTextStyles.bold(12, lineHeight: 16, color: AppColors.white)),
          ],
        ),
      ),
    );
  }
}
