import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/shared/constants/app_assets.dart';
import 'package:thaimart_buyer/app/shared/widgets/app_svg.dart';
import 'package:thaimart_buyer/app/feats/home/model/home_mock_data.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_product_card.dart';
import 'package:thaimart_buyer/app/shared/widgets/mall_badge.dart';

void main() {
  setUpAll(() async {
    final loader = FontLoader('SukhumvitTadmai')
      ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Text.ttf'))
      ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Bold.ttf'));
    await loader.load();
  });

  // Every product: the สินค้าแนะนำ mix plus each category's own list.
  final products = {
    ...HomeMockData.leftColumn,
    ...HomeMockData.rightColumn,
    for (final (left, right) in HomeMockData.categoryColumns.values) ...[...left, ...right],
  };

  for (final p in products) {
    testWidgets('${p.title}: Mall for official shops, check mark for verified ones', (tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: Align(alignment: Alignment.topLeft, child: SizedBox(width: 175, child: HomeProductCard(product: p)))),
      ));
      expect(find.byType(MallBadge), p.isVerified ? findsOneWidget : findsNothing);
      final checkMark = find.byWidgetPredicate((w) => w is AppSvg && w.asset == AppIcons.checkmarkBadge);
      expect(checkMark, !p.isVerified && p.isShopVerified ? findsOneWidget : findsNothing);
      expect(find.text('ร้านทางการ'), findsNothing);
      if (p.isVerified) {
        // Hugs its label: well under the 159px card body.
        expect(tester.getSize(find.byType(MallBadge)).width, lessThan(100));
      }
      expect(tester.takeException(), isNull);
    });
  }
}
