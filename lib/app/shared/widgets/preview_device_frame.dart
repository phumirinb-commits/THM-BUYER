import 'package:flutter/material.dart';

import '../constants/app_assets.dart';
import '../theme/app_text_styles.dart';
import 'app_svg.dart';

/// Localhost preview only: shows the app at iPhone 13/14 size (390×844)
/// inside a phone outline, with a fake iOS status bar drawn on top.
///
/// On a real device the OS draws the status bar, so [enabled] should be
/// false there and [child] is returned as-is.
class PreviewDeviceFrame extends StatelessWidget {
  const PreviewDeviceFrame({super.key, required this.child, required this.enabled});

  final Widget child;
  final bool enabled;

  static const _size = Size(390, 844);
  static const _statusBarHeight = 48.0;

  /// `?h=2400` in the URL makes the screen taller — handy for checking
  /// content below the fold against the full-length Figma frame.
  static double get _screenHeight => double.tryParse(Uri.base.queryParameters['h'] ?? '') ?? _size.height;

  @override
  Widget build(BuildContext context) {
    if (!enabled) return child;

    final screen = MediaQuery.of(context);
    // Fill the browser when it is already phone-sized.
    final fill = screen.size.width <= _size.width + 40;
    final phone = MediaQuery(
      data: screen.copyWith(
        size: fill ? screen.size : Size(_size.width, _screenHeight),
        padding: const EdgeInsets.only(top: _statusBarHeight),
        viewPadding: const EdgeInsets.only(top: _statusBarHeight),
      ),
      child: Stack(
        children: [
          Positioned.fill(child: child),
          const Positioned(top: 0, left: 0, right: 0, height: _statusBarHeight, child: _StatusBar()),
        ],
      ),
    );

    if (fill) return phone;

    return ColoredBox(
      color: const Color(0xFFE9E9EC),
      child: Center(
        child: FittedBox(
          child: Padding(
            padding: const EdgeInsets.all(24),
            // Bezel sits outside the 390×844 screen so the layout gets the full width.
            child: Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: const Color(0xFF1C1C1E),
                borderRadius: BorderRadius.circular(50),
                boxShadow: const [BoxShadow(color: Color(0x33000000), blurRadius: 40, offset: Offset(0, 16))],
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(44),
                child: SizedBox(width: _size.width, height: _screenHeight, child: phone),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _StatusBar extends StatelessWidget {
  const _StatusBar();

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Stack(
        children: [
          Positioned(
            left: 27,
            top: 14,
            width: 54,
            height: 21,
            child: Center(
              child: Text(
                '9:41',
                style: AppTextStyles.bold(16, lineHeight: 21).copyWith(
                  fontFamily: '.SF Pro Text',
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.32,
                  color: Colors.black,
                  decoration: TextDecoration.none,
                ),
              ),
            ),
          ),
          const Positioned(
            right: 25.6,
            top: 19,
            child: AppSvg(AppIcons.statusBarRight, size: 77.4012, height: 13),
          ),
        ],
      ),
    );
  }
}
