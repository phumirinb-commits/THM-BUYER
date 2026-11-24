import 'package:flutter/material.dart';

import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';
import '../../../../shared/widgets/app_svg.dart';
import '../../model/home_models.dart';

/// Category selector: every category shows its name. The selected one is a
/// red pill with a white label and a red icon on a white disc; the rest are
/// white pills with a red icon and a dark label.
///
/// Motion (off under reduced motion): a disc dips to 0.96 while pressed
/// (`--m-press`, 140ms) and the newly selected pill pops in 0.85 → 1 with a
/// slight overshoot (`--m-pop`, 420ms). The pill shown on first load does not pop.
class HomeCategoryBar extends StatefulWidget {
  const HomeCategoryBar({super.key, required this.categories, required this.selectedIndex, required this.onSelected});

  final List<HomeCategory> categories;
  final int selectedIndex;
  final ValueChanged<int> onSelected;

  /// The bar never shows more than this many categories.
  static const maxCategories = 15;

  static const pressDuration = Duration(milliseconds: 140);
  static const popDuration = Duration(milliseconds: 420);

  @override
  State<HomeCategoryBar> createState() => _HomeCategoryBarState();
}

class _HomeCategoryBarState extends State<HomeCategoryBar> {
  /// Only a selection the user made pops; the first one just appears.
  bool _userChanged = false;

  @override
  void didUpdateWidget(HomeCategoryBar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.selectedIndex != widget.selectedIndex) _userChanged = true;
  }

  @override
  Widget build(BuildContext context) {
    final categories = widget.categories.take(HomeCategoryBar.maxCategories).toList();
    final selectedIndex = widget.selectedIndex;
    final motion = !MediaQuery.disableAnimationsOf(context);

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      // Room for the button shadows.
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 4),
      clipBehavior: Clip.none,
      child: Row(
        spacing: 12,
        children: [
          for (var i = 0; i < categories.length; i++)
            i == selectedIndex
                ? _PopIn(
                    // A new key per selection restarts the pop.
                    key: ValueKey('pill-$i'),
                    enabled: motion && _userChanged,
                    child: _SelectedPill(category: categories[i]),
                  )
                : _IconDisc(
                    key: ValueKey('disc-$i'),
                    category: categories[i],
                    animatePress: motion,
                    onTap: () => widget.onSelected(i),
                  ),
        ],
      ),
    );
  }
}

class _SelectedPill extends StatelessWidget {
  const _SelectedPill({required this.category});

  final HomeCategory category;

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(minWidth: 127),
      padding: const EdgeInsets.fromLTRB(4, 4, 12, 4),
      decoration: BoxDecoration(color: AppColors.brand, borderRadius: BorderRadius.circular(999)),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        spacing: 8,
        children: [
          Container(
            width: 32,
            height: 32,
            alignment: Alignment.center,
            decoration: const BoxDecoration(color: AppColors.white, shape: BoxShape.circle),
            child: AppSvg(category.icon, size: 24, color: AppColors.brand),
          ),
          Text(category.label, style: AppTextStyles.heading(14, lineHeight: 18, color: AppColors.white, weight: FontWeight.w400)),
        ],
      ),
    );
  }
}

/// Scales [child] 0.85 → 1 with a small overshoot when it first appears.
class _PopIn extends StatelessWidget {
  const _PopIn({super.key, required this.enabled, required this.child});

  final bool enabled;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    if (!enabled) return child;
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.85, end: 1),
      duration: HomeCategoryBar.popDuration,
      curve: Curves.easeOutBack,
      builder: (context, scale, child) => Transform.scale(scale: scale, child: child),
      child: child,
    );
  }
}

class _IconDisc extends StatefulWidget {
  const _IconDisc({super.key, required this.category, required this.animatePress, required this.onTap});

  final HomeCategory category;
  final bool animatePress;
  final VoidCallback onTap;

  @override
  State<_IconDisc> createState() => _IconDiscState();
}

class _IconDiscState extends State<_IconDisc> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: widget.category.label,
      child: AnimatedScale(
        scale: widget.animatePress && _pressed ? 0.96 : 1,
        duration: widget.animatePress ? HomeCategoryBar.pressDuration : Duration.zero,
        curve: Curves.easeOut,
        child: DecoratedBox(
          decoration: const ShapeDecoration(shape: StadiumBorder(), shadows: AppShadows.soft),
          child: Material(
            color: AppColors.white,
            shape: const StadiumBorder(),
            child: InkWell(
              customBorder: const StadiumBorder(),
              onTap: widget.onTap,
              onHighlightChanged: (down) => setState(() => _pressed = down),
              // White pill: red icon and the category name, so every
              // category reads without tapping.
              child: Container(
                height: 40,
                padding: const EdgeInsets.fromLTRB(8, 0, 12, 0),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  spacing: 6,
                  children: [
                    AppSvg(widget.category.icon, size: 24, color: AppColors.brand),
                    Text(
                      widget.category.label,
                      style: AppTextStyles.heading(14, lineHeight: 18, color: AppColors.neutralBlack, weight: FontWeight.w400),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
