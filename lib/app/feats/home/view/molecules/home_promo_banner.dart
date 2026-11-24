import 'dart:async';

import 'package:flutter/material.dart';

import '../../../../shared/theme/app_colors.dart';
import '../../model/home_models.dart';

/// Swipeable promo banners under the trust badge, with pager dots.
///
/// - At most [maxSlides]; extra banners are dropped.
/// - Loops forever both ways, and moves on by itself every [autoPlayEvery].
///   Auto-play pauses while the user drags and restarts when they let go;
///   it is off under reduced motion and when there is only one banner.
class HomePromoBanner extends StatefulWidget {
  const HomePromoBanner({super.key, required this.banners, this.onTap});

  final List<HomeBanner> banners;
  final ValueChanged<HomeBanner>? onTap;

  static const maxSlides = 5;
  static const autoPlayEvery = Duration(seconds: 4);
  static const slideDuration = Duration(milliseconds: 380); // kit --m-push

  @override
  State<HomePromoBanner> createState() => _HomePromoBannerState();
}

class _HomePromoBannerState extends State<HomePromoBanner> {
  /// A large virtual index so the loop can go left from the first slide too.
  static const _loopBase = 1000;

  late final List<HomeBanner> _slides = widget.banners.take(HomePromoBanner.maxSlides).toList();
  late final PageController _controller = PageController(initialPage: _loopBase * _slides.length);
  Timer? _timer;
  int _current = 0;

  bool get _canAutoPlay => _slides.length > 1 && !MediaQuery.disableAnimationsOf(context);

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _canAutoPlay ? _start() : _stop();
  }

  void _start() {
    _timer?.cancel();
    _timer = Timer.periodic(HomePromoBanner.autoPlayEvery, (_) {
      if (!_controller.hasClients) return;
      _controller.nextPage(duration: HomePromoBanner.slideDuration, curve: const Cubic(.32, .72, 0, 1));
    });
  }

  void _stop() {
    _timer?.cancel();
    _timer = null;
  }

  @override
  void dispose() {
    _stop();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_slides.isEmpty) return const SizedBox.shrink();

    return Column(
      spacing: 8,
      children: [
        SizedBox(
          // 96 banner + 4 above and below so the shadow is not cut off.
          height: 104,
          child: NotificationListener<ScrollNotification>(
            onNotification: (n) {
              // Pause while the finger is on the banner, resume after.
              if (n is ScrollStartNotification && n.dragDetails != null) _stop();
              if (n is ScrollEndNotification && _canAutoPlay && _timer == null) _start();
              return false;
            },
            child: PageView.builder(
              controller: _controller,
              // One slide: no swiping, no loop.
              physics: _slides.length > 1 ? const PageScrollPhysics() : const NeverScrollableScrollPhysics(),
              itemCount: _slides.length > 1 ? null : 1,
              onPageChanged: (i) => setState(() => _current = i % _slides.length),
              itemBuilder: (context, i) {
                final banner = _slides[i % _slides.length];
                return Padding(
                  padding: const EdgeInsets.fromLTRB(16, 4, 16, 4),
                  child: _BannerSlide(banner: banner, onTap: () => widget.onTap?.call(banner)),
                );
              },
            ),
          ),
        ),
        if (_slides.length > 1) _Dots(count: _slides.length, current: _current),
      ],
    );
  }
}

class _BannerSlide extends StatelessWidget {
  const _BannerSlide({required this.banner, required this.onTap});

  final HomeBanner banner;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: banner.label,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          height: 96,
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            color: AppColors.bannerBg,
            borderRadius: BorderRadius.circular(16),
            boxShadow: AppShadows.soft,
          ),
          child: Stack(
            clipBehavior: Clip.hardEdge,
            children: [
              for (final layer in banner.layers)
                Positioned(
                  left: 0,
                  right: 0,
                  top: banner.artTop,
                  // Default: fill the 96px slot exactly.
                  height: banner.artHeight ?? 96,
                  child: Image.asset(layer, fit: BoxFit.cover),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

/// 6px dots, 4 apart: the current page red, the rest 20% black (Figma 3240:3852).
class _Dots extends StatelessWidget {
  const _Dots({required this.count, required this.current});

  final int count;
  final int current;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'แบนเนอร์ ${current + 1} จาก $count',
      excludeSemantics: true,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        spacing: 4,
        children: [
          for (var i = 0; i < count; i++)
            AnimatedContainer(
              duration: const Duration(milliseconds: 200), // kit --m-fast
              width: 6,
              height: 6,
              decoration: BoxDecoration(
                color: i == current ? AppColors.brand : AppColors.dotIdle,
                shape: BoxShape.circle,
              ),
            ),
        ],
      ),
    );
  }
}
