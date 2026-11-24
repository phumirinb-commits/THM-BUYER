import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/feats/home/model/home_mock_data.dart';
import 'package:thaimart_buyer/app/feats/home/model/home_models.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_promo_banner.dart';

List<HomeBanner> _banners(int n) => [
      for (var i = 0; i < n; i++) HomeBanner(label: 'b$i', layers: HomeMockData.banners.first.layers),
    ];

Widget _app(List<HomeBanner> banners) => MaterialApp(
      home: Scaffold(body: Center(child: HomePromoBanner(banners: banners))),
    );

/// Which slide the dots say is showing, 1-based ("แบนเนอร์ 2 จาก 5" -> 2).
int _dot(WidgetTester tester) {
  final label = tester.getSemantics(find.bySemanticsLabel(RegExp(r'^แบนเนอร์ \d'))).label;
  return int.parse(RegExp(r'แบนเนอร์ (\d+)').firstMatch(label)!.group(1)!);
}

int _dotCount(WidgetTester tester) {
  final label = tester.getSemantics(find.bySemanticsLabel(RegExp(r'^แบนเนอร์ \d'))).label;
  return int.parse(RegExp(r'จาก (\d+)').firstMatch(label)!.group(1)!);
}

/// Phone width, so a 300px drag is more than half a page.
void _phone(WidgetTester tester) {
  tester.view.physicalSize = const Size(390, 300);
  tester.view.devicePixelRatio = 1;
  addTearDown(tester.view.reset);
}

void main() {
  testWidgets('shows at most 5 banners', (tester) async {
    await tester.pumpWidget(_app(_banners(7)));
    expect(_dotCount(tester), HomePromoBanner.maxSlides);
  });

  testWidgets('home screen data has 5 banners', (tester) async {
    expect(HomeMockData.banners, hasLength(5));
  });

  testWidgets('swiping left goes to the next banner', (tester) async {
    _phone(tester);
    await tester.pumpWidget(_app(_banners(5)));
    expect(_dot(tester), 1);
    await tester.drag(find.byType(PageView), const Offset(-300, 0));
    await tester.pumpAndSettle();
    expect(_dot(tester), 2);
  });

  testWidgets('swiping right from the first banner loops to the last', (tester) async {
    _phone(tester);
    await tester.pumpWidget(_app(_banners(5)));
    await tester.drag(find.byType(PageView), const Offset(300, 0));
    await tester.pumpAndSettle();
    expect(_dot(tester), 5);
  });

  testWidgets('auto-plays every 4 seconds and loops after the last', (tester) async {
    await tester.pumpWidget(_app(_banners(3)));
    for (final expected in [2, 3, 1]) {
      await tester.pump(HomePromoBanner.autoPlayEvery);
      await tester.pump(HomePromoBanner.slideDuration);
      expect(_dot(tester), expected);
    }
  });

  testWidgets('no auto-play under reduced motion', (tester) async {
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);
    await tester.pumpWidget(_app(_banners(5)));
    await tester.pump(HomePromoBanner.autoPlayEvery * 3);
    expect(_dot(tester), 1);
  });

  testWidgets('a single banner has no dots and does not move', (tester) async {
    await tester.pumpWidget(_app(_banners(1)));
    expect(find.bySemanticsLabel(RegExp(r'^แบนเนอร์ \d')), findsNothing);
    await tester.pump(HomePromoBanner.autoPlayEvery * 2);
    expect(find.byType(PageView), findsOneWidget);
  });
}
