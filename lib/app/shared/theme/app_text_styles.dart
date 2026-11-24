import 'package:flutter/painting.dart';

import 'app_colors.dart';

/// Text styles. Headings (section, sheet and page titles) use Sukhumvit
/// Tadmai; everything else (content) uses Google Sans. Figma line-heights
/// are kept by converting them to Flutter's `height` multiplier.
abstract final class AppTextStyles {
  /// Content font: body text, labels, prices, buttons.
  static const fontFamily = 'GoogleSans';

  /// Heading font.
  static const headingFamily = 'SukhumvitTadmai';

  static TextStyle regular(double size, {double? lineHeight, Color color = AppColors.neutralBlack}) =>
      _style(fontFamily, size, FontWeight.w400, lineHeight, color);

  static TextStyle bold(double size, {double? lineHeight, Color color = AppColors.neutralBlack}) =>
      _style(fontFamily, size, FontWeight.w700, lineHeight, color);

  /// Sukhumvit Tadmai: section, sheet and page titles (bold), plus names
  /// (story names, shop names) — pass [weight] w400 for regular.
  static TextStyle heading(
    double size, {
    double? lineHeight,
    Color color = AppColors.neutralBlack,
    FontWeight weight = FontWeight.w700,
  }) =>
      _style(headingFamily, size, weight, lineHeight, color);

  static TextStyle _style(String family, double size, FontWeight weight, double? lineHeight, Color color) => TextStyle(
        fontFamily: family,
        // Any glyph a font lacks falls back to the other one.
        fontFamilyFallback: [family == fontFamily ? headingFamily : fontFamily],
        fontSize: size,
        fontWeight: weight,
        height: lineHeight == null ? null : lineHeight / size,
        color: color,
        leadingDistribution: TextLeadingDistribution.even,
      );
}
