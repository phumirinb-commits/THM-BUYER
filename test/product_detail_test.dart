import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/shared/widgets/app_svg.dart';
import 'package:thaimart_buyer/app/shared/theme/app_colors.dart';
import 'package:thaimart_buyer/app/shared/constants/app_assets.dart';
import 'package:thaimart_buyer/app/feats/home/model/home_mock_data.dart';
import 'package:thaimart_buyer/app/feats/home/view/home_screen.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_product_card.dart';
import 'package:thaimart_buyer/app/feats/product/model/product_detail_mock.dart';
import 'package:thaimart_buyer/app/feats/product/view/product_detail_screen.dart';

Future<void> _fonts() async {
  final thai = FontLoader('SukhumvitTadmai')
    ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Text.ttf'))
    ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Bold.ttf'));
  await thai.load();
  final sans = FontLoader('GoogleSans')
    ..addFont(rootBundle.load('assets/fonts/GoogleSans/GoogleSans-Regular.ttf'))
    ..addFont(rootBundle.load('assets/fonts/GoogleSans/GoogleSans-Bold.ttf'));
  await sans.load();
}

void main() {
  setUpAll(_fonts);

  void phone(WidgetTester tester, {double height = 2000}) {
    tester.view.physicalSize = Size(390, height);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
  }

  testWidgets('the fountain page shows every Figma section without overflow', (tester) async {
    phone(tester);
    await tester.pumpWidget(const MaterialApp(home: ProductDetailScreen(detail: ProductDetailMock.fountain)));
    await tester.pump();

    expect(find.textContaining('น้ำพุแมวอัตโนมัติ ความจุ 2.5 ลิตร Smart'), findsOneWidget);
    expect(find.text('฿2,999'), findsWidgets); // also a related item's old price
    expect(find.text('฿4,190'), findsOneWidget);
    expect(find.text('1/4'), findsOneWidget);
    for (final tag in ['รับรอง มอก.', 'ปลอมคืนเงิน 2 เท่า', 'จัดส่งฟรี']) {
      expect(find.text(tag), findsOneWidget, reason: tag);
    }
    expect(find.text('จุดเด่น'), findsOneWidget);
    expect(find.text('วิดีโอรีวิวสินค้า'), findsOneWidget);
    expect(find.text('PetCare Official Store'), findsOneWidget);
    expect(find.text('ตรวจสอบแล้ว'), findsOneWidget);
    expect(find.text('สินค้าอื่นๆ ในร้านค้า'), findsOneWidget);
    expect(find.text('เพิ่มลงในตะกร้า'), findsOneWidget);
    expect(find.text('ซื้อเลย'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('swiping the gallery moves the counter', (tester) async {
    phone(tester);
    await tester.pumpWidget(const MaterialApp(home: ProductDetailScreen(detail: ProductDetailMock.fountain)));
    await tester.drag(find.byType(PageView), const Offset(-300, 0));
    await tester.pumpAndSettle();
    expect(find.text('2/4'), findsOneWidget);
  });

  testWidgets('tapping the fountain on Home opens its page; ปิด goes back', (tester) async {
    phone(tester, height: 844);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();

    final card = find.byWidgetPredicate(
      (w) => w is HomeProductCard && w.product == HomeMockData.petFountain,
      skipOffstage: false,
    );
    // Bring the card to the middle of the screen, clear of the pinned category bar.
    await tester.scrollUntilVisible(
      card,
      300,
      scrollable: find.descendant(of: find.byType(CustomScrollView), matching: find.byType(Scrollable)).first,
    );
    await tester.runAsync(() => Scrollable.ensureVisible(tester.element(card), alignment: 0.5));
    await tester.pumpAndSettle();
    await tester.tap(card);
    await tester.pumpAndSettle();
    expect(find.byType(ProductDetailScreen), findsOneWidget);
    expect(find.text('฿4,190'), findsOneWidget); // the fountain's own page

    await tester.tap(find.bySemanticsLabel('ปิด'));
    await tester.pumpAndSettle();
    expect(find.byType(ProductDetailScreen), findsNothing);
  });

  testWidgets('every other product gets details, a shop and related items', (tester) async {
    phone(tester);
    final all = {
      ...HomeMockData.leftColumn,
      ...HomeMockData.rightColumn,
      for (final (l, r) in HomeMockData.categoryColumns.values) ...[...l, ...r],
    }..remove(HomeMockData.petFountain);
    for (final p in all) {
      await tester.pumpWidget(MaterialApp(home: ProductDetailScreen(detail: ProductDetailMock.forProduct(p))));
      await tester.pump();
      expect(find.text('จุดเด่น'), findsOneWidget, reason: p.title);
      expect(find.text('ดูร้านค้า >'), findsOneWidget, reason: p.title);
      expect(find.text('สินค้าอื่นๆ ในร้านค้า'), findsOneWidget, reason: p.title);
      expect(find.text('1/4'), findsOneWidget, reason: p.title); // four photos to swipe
      expect(tester.takeException(), isNull, reason: p.title);
    }
  });

  testWidgets('รับรอง อย. shows the อย. number on products that have อย.', (tester) async {
    phone(tester);
    final all = {
      ...HomeMockData.leftColumn,
      ...HomeMockData.rightColumn,
      for (final (l, r) in HomeMockData.categoryColumns.values) ...[...l, ...r],
    };
    var checked = 0;
    for (final p in all) {
      final detail = ProductDetailMock.forProduct(p);
      await tester.pumpWidget(MaterialApp(home: ProductDetailScreen(detail: detail)));
      await tester.pump();
      final hasFda = find.text('รับรอง อย.').evaluate().isNotEmpty;
      expect(find.textContaining('เลข อย. '), hasFda ? findsOneWidget : findsNothing, reason: p.title);
      if (hasFda) {
        expect(detail.fdaNumber, matches(RegExp(r'^10-1-(\d{5}-1-\d{4}|60\d{8})$')), reason: p.title);
        checked++;
      }
      expect(tester.takeException(), isNull, reason: p.title);
    }
    expect(checked, greaterThan(5));
  });

  testWidgets('รับรอง มอก. shows the มอก. number', (tester) async {
    phone(tester);
    await tester.pumpWidget(const MaterialApp(home: ProductDetailScreen(detail: ProductDetailMock.fountain)));
    await tester.pump();
    expect(find.text('เลข มอก. 1195-2561'), findsOneWidget);
    final all = {
      ...HomeMockData.leftColumn,
      ...HomeMockData.rightColumn,
      for (final (l, r) in HomeMockData.categoryColumns.values) ...[...l, ...r],
    };
    var checked = 0;
    for (final p in all) {
      final detail = ProductDetailMock.forProduct(p);
      await tester.pumpWidget(MaterialApp(home: ProductDetailScreen(detail: detail)));
      await tester.pump();
      final hasTis = find.text('รับรอง มอก.').evaluate().isNotEmpty;
      expect(find.textContaining('เลข มอก. '), hasTis ? findsOneWidget : findsNothing, reason: p.title);
      if (hasTis) {
        expect(detail.tisNumber, matches(RegExp(r'^\d{4}-25\d{2}$')), reason: p.title);
        checked++;
      }
      expect(tester.takeException(), isNull, reason: p.title);
    }
    expect(checked, greaterThan(3));
  });

  testWidgets('tapping the heart turns it solid red, tapping again back to the outline', (tester) async {
    phone(tester);
    await tester.pumpWidget(const MaterialApp(home: ProductDetailScreen(detail: ProductDetailMock.fountain)));
    await tester.pump();
    AppSvg heart() => tester.widget<AppSvg>(find.byWidgetPredicate(
          (w) => w is AppSvg && (w.asset == AppIcons.heart || w.asset == AppIcons.heartFill),
        ));
    expect(heart().asset, AppIcons.heart);
    await tester.tap(find.bySemanticsLabel('บันทึกสินค้า'));
    await tester.pump();
    expect(heart().asset, AppIcons.heartFill);
    expect(heart().color, AppColors.brand);
    final disc = tester.widget<Container>(
      find.ancestor(of: find.byWidget(heart()), matching: find.byType(Container)).first,
    );
    expect((disc.decoration! as BoxDecoration).color, AppColors.white);
    await tester.tap(find.bySemanticsLabel('เลิกบันทึกสินค้า'));
    await tester.pump();
    expect(heart().asset, AppIcons.heart);
  });
}
