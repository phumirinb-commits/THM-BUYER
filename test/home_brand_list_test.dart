import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/feats/home/model/home_mock_data.dart';
import 'package:thaimart_buyer/app/feats/home/view/home_screen.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_brand_card.dart';

void main() {
  setUpAll(() async {
    final loader = FontLoader('SukhumvitTadmai')
      ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Text.ttf'))
      ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Bold.ttf'));
    await loader.load();
  });

  testWidgets('shows all five recommended brands without overflow', (tester) async {
    tester.view.physicalSize = const Size(390, 844);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();

    expect(HomeMockData.brands, hasLength(5));
    expect(find.byType(HomeBrandCard), findsNWidgets(5));
    for (final b in HomeMockData.brands) {
      // Scoped to the cards: some names also appear in the story row.
      expect(find.descendant(of: find.byType(HomeBrandCard), matching: find.text(b.name)), findsOneWidget);
    }
    // On a 390 screen: two full cards, then a third of the third one.
    final cardsAt = find.byType(HomeBrandCard);
    expect(tester.getSize(cardsAt.first).width, 150);
    final third = tester.getRect(cardsAt.at(2));
    expect(390 - third.left, closeTo(150 / 3, 0.5));

    // Official shops: a mark on the logo's top edge, read as "Mall" for Mall
    // shops and "ร้านตรวจสอบแล้ว" for verified ones; no ร้านทางการ text.
    final cards = find.byType(HomeBrandCard);
    expect(find.descendant(of: cards, matching: find.text('ร้านทางการ')), findsNothing);
    final mall = HomeMockData.brands.where((b) => b.isMall).length;
    final verified = HomeMockData.brands.where((b) => b.isVerified && !b.isMall).length;
    expect(find.descendant(of: cards, matching: find.bySemanticsLabel('Mall')), findsNWidgets(mall));
    expect(find.descendant(of: cards, matching: find.bySemanticsLabel('ร้านตรวจสอบแล้ว')), findsNWidgets(verified));

    // Any RenderFlex overflow would have been reported as a test failure.
    expect(tester.takeException(), isNull);
  });
}
