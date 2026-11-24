import 'dart:async';

import 'package:flutter/material.dart';

import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';

/// Flip-clock countdown to [endsAt], ticking once a second: a dark plate,
/// each digit on its own red split tile, pairs separated by a colon of dots,
/// units (วัน, ชั่วโมง, นาที, วินาที) in small text underneath. The day pair
/// shows only while a day or more is left. At zero it calls [onEnded] once.
class HomeCampaignCountdown extends StatefulWidget {
  const HomeCampaignCountdown({super.key, required this.endsAt, this.onEnded, this.now});

  final DateTime endsAt;
  final VoidCallback? onEnded;

  /// Clock, for tests; defaults to [DateTime.now].
  final DateTime Function()? now;

  @override
  State<HomeCampaignCountdown> createState() => _HomeCampaignCountdownState();
}

class _HomeCampaignCountdownState extends State<HomeCampaignCountdown> {
  Timer? _timer;

  DateTime _now() => (widget.now ?? DateTime.now)();

  Duration get _left {
    final left = widget.endsAt.difference(_now());
    return left.isNegative ? Duration.zero : left;
  }

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      setState(() {});
      if (_left == Duration.zero) {
        _timer?.cancel();
        widget.onEnded?.call();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final left = _left;
    final ended = left == Duration.zero;
    String two(int n) => n.toString().padLeft(2, '0');
    final days = left.inDays;
    final h = two(left.inHours % 24), m = two(left.inMinutes % 60), s = two(left.inSeconds % 60);
    final spoken = ended
        ? 'แคมเปญหมดเวลาแล้ว'
        : 'สิ้นสุดใน ${days > 0 ? '$days วัน ' : ''}${left.inHours % 24} ชั่วโมง ${left.inMinutes % 60} นาที';

    final label = AppTextStyles.heading(12, lineHeight: 18, color: AppColors.white, weight: FontWeight.w400);
    return Semantics(
      label: spoken,
      excludeSemantics: true,
      child: Container(
        padding: const EdgeInsets.fromLTRB(8, 6, 8, 3),
        decoration: BoxDecoration(color: _plate, borderRadius: BorderRadius.circular(8), boxShadow: AppShadows.card),
        child: ended
            ? Text('หมดเวลาแล้ว', style: label)
            : Row(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (days > 0) ...[_Segment(two(days), 'วัน'), const _Colon()],
                  _Segment(h, 'ชั่วโมง'),
                  const _Colon(),
                  _Segment(m, 'นาที'),
                  const _Colon(),
                  _Segment(s, 'วินาที'),
                ],
              ),
      ),
    );
  }
}

/// Dark plate behind the tiles (deep maroon, as in the flip-clock reference).
const _plate = Color(0xFF2A0D0D);

/// Two digit tiles with the unit in small text underneath.
class _Segment extends StatelessWidget {
  const _Segment(this.value, this.unit);

  final String value;
  final String unit;

  @override
  Widget build(BuildContext context) {
    return Column(
      key: ValueKey('countdown-$unit'),
      mainAxisSize: MainAxisSize.min,
      spacing: 2,
      children: [
        Row(mainAxisSize: MainAxisSize.min, spacing: 2, children: [for (final d in value.split('')) _FlipTile(d)]),
        Text(unit, style: AppTextStyles.heading(10, lineHeight: 12, color: AppColors.white, weight: FontWeight.w400)),
      ],
    );
  }
}

/// One digit on a red tile, split across the middle like a flip card.
class _FlipTile extends StatelessWidget {
  const _FlipTile(this.digit);

  final String digit;

  static const _w = 18.0, _h = 24.0;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: _w,
      height: _h,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Lighter top half, darker bottom half.
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(3),
              gradient: const LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Color(0xFFE8403E), AppColors.brand, Color(0xFFB81B19), Color(0xFF9E1513)],
                stops: [0, 0.5, 0.5, 1],
              ),
              boxShadow: const [BoxShadow(color: Color(0x66000000), blurRadius: 2, offset: Offset(0, 1))],
            ),
          ),
          Text(
            digit,
            style: AppTextStyles.bold(16, lineHeight: 20, color: AppColors.white).copyWith(
              fontFeatures: const [FontFeature.tabularFigures()],
              shadows: const [Shadow(color: Color(0x55000000), blurRadius: 1, offset: Offset(0, 1))],
            ),
          ),
          // The split line, with small hinge pins at each side.
          Container(height: 1, color: const Color(0x99000000)),
          Positioned(left: -1, child: _pin()),
          Positioned(right: -1, child: _pin()),
        ],
      ),
    );
  }

  static Widget _pin() => Container(
        width: 2,
        height: 4,
        decoration: BoxDecoration(color: const Color(0xFFD0D0D0), borderRadius: BorderRadius.circular(1)),
      );
}

/// Colon between pairs: two small light dots, level with the tiles.
class _Colon extends StatelessWidget {
  const _Colon();

  @override
  Widget build(BuildContext context) {
    Widget dot() => Container(
          width: 3,
          height: 3,
          decoration: const BoxDecoration(color: Color(0xFFD0D0D0), shape: BoxShape.circle),
        );
    return SizedBox(
      width: 9,
      height: _FlipTile._h,
      child: Column(mainAxisAlignment: MainAxisAlignment.center, spacing: 5, children: [dot(), dot()]),
    );
  }
}
