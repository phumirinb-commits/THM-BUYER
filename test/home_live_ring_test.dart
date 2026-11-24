import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_live_badge.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_live_ring.dart';

Widget _ring({required bool enabled}) => MaterialApp(
      home: Center(
        child: HomeLiveRing(enabled: enabled, child: const SizedBox.square(dimension: 64)),
      ),
    );

void main() {
  testWidgets('live story ring keeps rotating', (tester) async {
    await tester.pumpWidget(_ring(enabled: true));
    await tester.pump(HomeLiveBadge.lapDuration * 1.5);
    expect(tester.binding.hasScheduledFrame, isTrue);
  });

  testWidgets('ring of a story that is not live does not animate', (tester) async {
    await tester.pumpWidget(_ring(enabled: false));
    await tester.pumpAndSettle();
    expect(tester.binding.hasScheduledFrame, isFalse);
  });

  testWidgets('live ring is static when reduced motion is on', (tester) async {
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(_ring(enabled: true));
    await tester.pumpAndSettle(); // would time out if it were still looping
    expect(tester.binding.hasScheduledFrame, isFalse);
  });

  testWidgets('live photo pulses between 0.88 and 1.06', (tester) async {
    await tester.pumpWidget(const MaterialApp(
      home: Center(child: HomeLivePulse(enabled: true, child: SizedBox.square(dimension: 56))),
    ));
    final scale = tester.widget<ScaleTransition>(find.byType(ScaleTransition)).scale;
    expect(scale.value, closeTo(0.88, 0.001));
    await tester.pump(HomeLivePulse.breath ~/ 2); // top of the breath
    expect(scale.value, closeTo(1.06, 0.001));
    await tester.pump(HomeLivePulse.breath ~/ 2); // back down
    expect(scale.value, closeTo(0.88, 0.001));
    expect(tester.binding.hasScheduledFrame, isTrue);
  });

  testWidgets('photo does not pulse when not live or under reduced motion', (tester) async {
    await tester.pumpWidget(const MaterialApp(
      home: Center(child: HomeLivePulse(enabled: false, child: SizedBox.square(dimension: 56))),
    ));
    expect(find.byType(ScaleTransition), findsNothing);

    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);
    await tester.pumpWidget(const MaterialApp(
      home: Center(child: HomeLivePulse(enabled: true, child: SizedBox.square(dimension: 56))),
    ));
    await tester.pumpAndSettle();
    expect(find.byType(ScaleTransition), findsNothing);
  });
}
