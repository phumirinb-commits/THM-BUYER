import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';
import 'home_live_ring.dart';

/// Red "● ไลฟ์" pill on a live creator's story, with a bright highlight
/// that keeps running around its border and a dot that breathes 0.7 ↔ 1.3.
///
/// When the device asks for reduced motion the highlight stops and the
/// badge shows a plain white border.
class HomeLiveBadge extends StatefulWidget {
  const HomeLiveBadge({super.key});

  /// One lap of the border.
  static const lapDuration = Duration(milliseconds: 1800);

  @override
  State<HomeLiveBadge> createState() => _HomeLiveBadgeState();
}

class _HomeLiveBadgeState extends State<HomeLiveBadge> with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(vsync: this, duration: HomeLiveBadge.lapDuration);

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (MediaQuery.disableAnimationsOf(context)) {
      _controller.stop();
    } else if (!_controller.isAnimating) {
      _controller.repeat();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final animate = !MediaQuery.disableAnimationsOf(context);

    return Semantics(
      label: 'กำลังไลฟ์',
      excludeSemantics: true,
      child: RepaintBoundary(
        child: CustomPaint(
          foregroundPainter: _RunningBorderPainter(progress: _controller, animate: animate),
          child: Container(
            width: 48,
            height: 20,
            padding: const EdgeInsets.only(left: 6, right: 7),
            decoration: BoxDecoration(color: AppColors.brand, borderRadius: BorderRadius.circular(12)),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              spacing: 4,
              children: [
                // The dot breathes in step with the live photo (same 1.2s).
                const HomeLivePulse(
                  enabled: true,
                  minScale: 0.7,
                  maxScale: 1.3,
                  child: SizedBox.square(
                    dimension: 6,
                    child: DecoratedBox(decoration: BoxDecoration(color: AppColors.white, shape: BoxShape.circle)),
                  ),
                ),
                Text('ไลฟ์', style: AppTextStyles.heading(12, lineHeight: 18, color: AppColors.white)),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Faint white base border plus a white→gold streak swept around it.
class _RunningBorderPainter extends CustomPainter {
  _RunningBorderPainter({required this.progress, required this.animate}) : super(repaint: progress);

  final Animation<double> progress;
  final bool animate;

  static const _stroke = 1.5;

  @override
  void paint(Canvas canvas, Size size) {
    final rect = (Offset.zero & size).deflate(_stroke / 2);
    final rrect = RRect.fromRectAndRadius(rect, Radius.circular(rect.height / 2));

    final base = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = _stroke
      ..color = animate ? AppColors.white.withValues(alpha: 0.45) : AppColors.white;
    canvas.drawRRect(rrect, base);

    if (!animate) return;

    final streak = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = _stroke
      ..shader = SweepGradient(
        colors: const [
          Color(0x00FFFFFF),
          Color(0x00FFFFFF),
          Color(0xFFFFFFFF),
          Color(0xFFFFD166), // warm gold head
          Color(0x00FFD166),
        ],
        stops: const [0.0, 0.55, 0.8, 0.9, 1.0],
        transform: GradientRotation(progress.value * 2 * math.pi),
      ).createShader(Offset.zero & size);
    canvas.drawRRect(rrect, streak);
  }

  @override
  bool shouldRepaint(_RunningBorderPainter oldDelegate) => oldDelegate.animate != animate;
}
