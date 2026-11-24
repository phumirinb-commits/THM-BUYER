import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../../../shared/theme/app_colors.dart';
import 'home_live_badge.dart';

/// Paints a rotating red → gold → red sweep over the story ring of a creator
/// who is live right now. Same lap time and gold as [HomeLiveBadge], so the
/// ring and the "ไลฟ์" badge move together.
///
/// [child] keeps its own plain red ring underneath: that is what shows when
/// [enabled] is false or the device asks for reduced motion.
class HomeLiveRing extends StatefulWidget {
  const HomeLiveRing({super.key, required this.enabled, required this.child, this.strokeWidth = 2.5});

  final bool enabled;
  final Widget child;
  final double strokeWidth;

  @override
  State<HomeLiveRing> createState() => _HomeLiveRingState();
}

class _HomeLiveRingState extends State<HomeLiveRing> with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(vsync: this, duration: HomeLiveBadge.lapDuration);

  bool get _animate => widget.enabled && !MediaQuery.disableAnimationsOf(context);

  void _sync() => _animate ? (_controller.isAnimating ? null : _controller.repeat()) : _controller.stop();

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _sync();
  }

  @override
  void didUpdateWidget(HomeLiveRing oldWidget) {
    super.didUpdateWidget(oldWidget);
    _sync();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_animate) return widget.child;
    return RepaintBoundary(
      child: CustomPaint(
        foregroundPainter: _SweepRingPainter(progress: _controller, strokeWidth: widget.strokeWidth),
        child: widget.child,
      ),
    );
  }
}

/// Shrinks and grows [child] (the photo inside a live story ring) in a loop:
/// [minScale] → [maxScale] → [minScale], one breath every [HomeLivePulse.breath].
/// Both ends keep the photo inside the ring; the ring and the "ไลฟ์" badge stay
/// still. Static (scale 1) under reduced motion.
class HomeLivePulse extends StatefulWidget {
  const HomeLivePulse({
    super.key,
    required this.enabled,
    required this.child,
    this.minScale = 0.88,
    this.maxScale = 1.06,
  });

  /// One full grow-and-shrink.
  static const breath = Duration(milliseconds: 1200);

  final bool enabled;
  final Widget child;
  final double minScale;
  final double maxScale;

  @override
  State<HomeLivePulse> createState() => _HomeLivePulseState();
}

class _HomeLivePulseState extends State<HomeLivePulse> with SingleTickerProviderStateMixin {
  // Half a breath each way: up, then reverse down.
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: HomeLivePulse.breath ~/ 2,
  );
  late Animation<double> _scale = _buildScale();

  Animation<double> _buildScale() => Tween<double>(begin: widget.minScale, end: widget.maxScale)
      .animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));

  bool get _animate => widget.enabled && !MediaQuery.disableAnimationsOf(context);

  void _sync() {
    if (_animate) {
      if (!_controller.isAnimating) _controller.repeat(reverse: true);
    } else {
      _controller
        ..stop()
        ..value = 0;
    }
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _sync();
  }

  @override
  void didUpdateWidget(HomeLivePulse oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.minScale != widget.minScale || oldWidget.maxScale != widget.maxScale) _scale = _buildScale();
    _sync();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_animate) return widget.child;
    return ScaleTransition(scale: _scale, child: widget.child);
  }
}

class _SweepRingPainter extends CustomPainter {
  _SweepRingPainter({required this.progress, required this.strokeWidth}) : super(repaint: progress);

  final Animation<double> progress;
  final double strokeWidth;

  @override
  void paint(Canvas canvas, Size size) {
    final rect = (Offset.zero & size).deflate(strokeWidth / 2);
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..shader = SweepGradient(
        // Starts and ends on red so the seam never shows.
        colors: const [AppColors.brand, AppColors.brand, Color(0xFFFF7A45), Color(0xFFFFD166), AppColors.brand],
        stops: const [0.0, 0.45, 0.7, 0.85, 1.0],
        transform: GradientRotation(progress.value * 2 * math.pi),
      ).createShader(rect);
    canvas.drawOval(rect, paint);
  }

  @override
  bool shouldRepaint(_SweepRingPainter oldDelegate) => oldDelegate.strokeWidth != strokeWidth;
}
