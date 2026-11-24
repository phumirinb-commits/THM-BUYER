import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/feats/home/view/home_screen.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_trust_sheet.dart';

void main() {
  setUpAll(() async {
    final loader = FontLoader('SukhumvitTadmai')
      ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Text.ttf'))
      ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Bold.ttf'));
    await loader.load();
  });

  for (final label in ['ของแท้ต้องไทยมาร์ท', 'ปลอมคืนเงิน 2 เท่า']) {
    testWidgets('tapping "$label" opens the trust sheet', (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.reset);
      // The live badge loops forever; reduced motion lets pumpAndSettle finish.
      tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
      addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

      await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
      await tester.pump();
      expect(find.byType(HomeTrustSheet), findsNothing);

      await tester.tap(find.text(label).first);
      await tester.pumpAndSettle();

      expect(find.byType(HomeTrustSheet), findsOneWidget);
      expect(find.text('รองรับ มอก. และ อย.'), findsOneWidget);
      expect(find.text('มอก.'), findsOneWidget);
      expect(find.text('อย.'), findsOneWidget);
      // The shop marks are explained too.
      expect(find.text('ป้ายร้านค้า'), findsOneWidget);
      expect(find.text('ตรวจสอบแล้ว'), findsOneWidget);
      expect(tester.takeException(), isNull);

      final button = find.widgetWithText(FilledButton, 'เข้าใจแล้ว');
      expect(tester.getSize(button).height, 48);

      await tester.tap(find.text('เข้าใจแล้ว'));
      await tester.pumpAndSettle();
      expect(find.byType(HomeTrustSheet), findsNothing);
    });
  }
}
