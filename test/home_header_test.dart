import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/feats/home/model/home_mock_data.dart';
import 'package:thaimart_buyer/app/feats/home/model/home_models.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_header.dart';

Widget _app(int count) => MaterialApp(home: Scaffold(body: HomeHeader(cartCount: count)));

void main() {
  setUpAll(() async {
    final loader = FontLoader('SukhumvitTadmai')
      ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Bold.ttf'));
    await loader.load();
  });

  testWidgets('100 items in the cart shows 99+', (tester) async {
    await tester.pumpWidget(_app(100));
    expect(find.text('99+'), findsOneWidget);
    expect(find.byTooltip('ตะกร้าสินค้า 100 ชิ้น'), findsOneWidget);
  });

  testWidgets('a small count shows the number', (tester) async {
    await tester.pumpWidget(_app(5));
    expect(find.text('5'), findsOneWidget);
  });

  testWidgets('an empty cart shows no count', (tester) async {
    await tester.pumpWidget(_app(0));
    expect(find.text('0'), findsNothing);
    expect(find.byTooltip('ตะกร้าสินค้า'), findsOneWidget);
  });

  test('mock: cart holds 100 items, บ้านกาแฟดอย (3rd story) is live', () {
    expect(HomeMockData.cartCount, 100);
    final third = HomeMockData.stories[2];
    expect(third.name, 'บ้านกาแฟดอย');
    expect(third.badge, StoryBadge.live);
    expect(HomeMockData.stories[4].badge, StoryBadge.none); // the other บ้านกาแฟดอย
  });
}
