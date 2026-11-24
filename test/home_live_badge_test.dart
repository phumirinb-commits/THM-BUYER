import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_live_badge.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_live_ring.dart';

Widget _app() => const MaterialApp(home: Scaffold(body: Center(child: HomeLiveBadge())));

void main() {
  setUpAll(() async {
    final loader = FontLoader('SukhumvitTadmai')
      ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Bold.ttf'));
    await loader.load();
  });

  testWidgets('live badge keeps animating its border', (tester) async {
    await tester.pumpWidget(_app());
    // Halfway through a lap and again a full lap later — still scheduling frames.
    await tester.pump(HomeLiveBadge.lapDuration ~/ 2);
    expect(tester.binding.hasScheduledFrame, isTrue);
    await tester.pump(HomeLiveBadge.lapDuration);
    expect(tester.binding.hasScheduledFrame, isTrue);
    expect(find.text('ไลฟ์'), findsOneWidget);
  });

  testWidgets('live badge is static when reduced motion is on', (tester) async {
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(_app());
    await tester.pumpAndSettle(); // would time out if it were still looping
    expect(tester.binding.hasScheduledFrame, isFalse);
    expect(find.text('ไลฟ์'), findsOneWidget);
  });

  testWidgets('the dot in the badge breathes 0.7 ↔ 1.3', (tester) async {
    await tester.pumpWidget(_app());
    final pulse = find.descendant(of: find.byType(HomeLiveBadge), matching: find.byType(ScaleTransition));
    expect(pulse, findsOneWidget);
    final scale = tester.widget<ScaleTransition>(pulse).scale;
    expect(scale.value, closeTo(0.7, 0.001));
    await tester.pump(HomeLivePulse.breath ~/ 2);
    expect(scale.value, closeTo(1.3, 0.001));
  });

  testWidgets('the dot is still under reduced motion', (tester) async {
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);
    await tester.pumpWidget(_app());
    await tester.pumpAndSettle();
    expect(find.descendant(of: find.byType(HomeLiveBadge), matching: find.byType(ScaleTransition)), findsNothing);
  });
}
