import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/feats/home/view/home_screen.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_brand_logo_card.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_category_bar.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_header.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_product_card.dart';

/// Real Sukhumvit Tadmai and Google Sans metrics; the default test font draws
/// every glyph as a wide square and would make Thai labels overflow.
Future<void> _loadFonts() async {
  final loader = FontLoader('SukhumvitTadmai')
    ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Text.ttf'))
    ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Bold.ttf'));
  await loader.load();
  final sans = FontLoader('GoogleSans')
    ..addFont(rootBundle.load('assets/fonts/GoogleSans/GoogleSans-Regular.ttf'))
    ..addFont(rootBundle.load('assets/fonts/GoogleSans/GoogleSans-Bold.ttf'));
  await sans.load();
}

void main() {
  setUpAll(_loadFonts);

  testWidgets('category bar stays pinned under the header while scrolling', (tester) async {
    tester.view.physicalSize = const Size(390, 1400); // tall enough to build the category bar below the campaign
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    // The live badge loops forever; reduced motion lets pumpAndSettle finish.
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();

    final headerBottom = tester.getBottomLeft(find.byType(HomeHeader)).dy;
    final barTopBefore = tester.getTopLeft(find.byType(HomeCategoryBar)).dy;
    expect(barTopBefore, greaterThan(headerBottom + 100), reason: 'starts lower down the page');

    // Scroll well past the category section, into the product feed.
    await tester.drag(find.byType(CustomScrollView), const Offset(0, -1500));
    await tester.pumpAndSettle();

    final barTopAfter = tester.getTopLeft(find.byType(HomeCategoryBar)).dy;
    // Header delegate adds 8px above the bar.
    expect(barTopAfter, closeTo(headerBottom + 8, 0.5));
    expect(find.text('สินค้าแนะนำ'), findsOneWidget);
  });

  testWidgets('อาหารและเครื่องดื่ม shows only the 9 food products', (tester) async {
    tester.view.physicalSize = const Size(390, 1400); // tall enough to build the category bar below the campaign
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();
    expect(find.byType(HomeProductCard, skipOffstage: false), findsNWidgets(42));

    final food = find.byTooltip('อาหารและเครื่องดื่ม');
    await tester.ensureVisible(food);
    await tester.tap(food);
    await tester.pumpAndSettle();
    expect(find.byType(HomeProductCard, skipOffstage: false), findsNWidgets(9));
    expect(find.textContaining('น้ำผึ้งดอกลำไยแท้', findRichText: true, skipOffstage: false), findsOneWidget);
    expect(find.textContaining('เสื้อเบลาส์', findRichText: true, skipOffstage: false), findsNothing);
    // Its recommended shops sit above the products.
    expect(find.text('ร้าน/แบรนด์แนะนำ', skipOffstage: false), findsOneWidget);
    expect(find.byType(HomeBrandLogoCard, skipOffstage: false), findsNWidgets(10));
    expect(tester.takeException(), isNull);
  });

  testWidgets('สุขภาพและความงาม shows only the 10 beauty products', (tester) async {
    tester.view.physicalSize = const Size(390, 1400); // tall enough to build the category bar below the campaign
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();
    final beauty = find.byTooltip('สุขภาพและความงาม');
    await tester.ensureVisible(beauty);
    await tester.tap(beauty);
    await tester.pumpAndSettle();
    expect(find.byType(HomeProductCard, skipOffstage: false), findsNWidgets(10));
    expect(find.textContaining('เซรั่มไฮยาลูรอน', findRichText: true, skipOffstage: false), findsOneWidget);
    expect(find.textContaining('น้ำผึ้ง', findRichText: true, skipOffstage: false), findsNothing);
    expect(tester.takeException(), isNull);
  });

  testWidgets('แฟชั่น shows only the 13 fashion products', (tester) async {
    tester.view.physicalSize = const Size(390, 1400); // tall enough to build the category bar below the campaign
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();
    final fashion = find.byTooltip('แฟชั่น');
    await tester.ensureVisible(fashion);
    await tester.tap(fashion);
    await tester.pumpAndSettle();
    expect(find.byType(HomeProductCard, skipOffstage: false), findsNWidgets(13));
    expect(find.textContaining('กางเกงยีนส์ขาตรง', findRichText: true, skipOffstage: false), findsOneWidget);
    expect(find.textContaining('เสื้อเบลาส์ระบาย', findRichText: true, skipOffstage: false), findsOneWidget);
    expect(find.textContaining('เซรั่ม', findRichText: true, skipOffstage: false), findsNothing);
    expect(tester.takeException(), isNull);
  });

  testWidgets('บ้านและสวน shows only the 11 home and garden products', (tester) async {
    tester.view.physicalSize = const Size(390, 1400); // tall enough to build the category bar below the campaign
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();
    final home = find.byTooltip('บ้านและสวน');
    await tester.ensureVisible(home);
    await tester.tap(home);
    await tester.pumpAndSettle();
    expect(find.byType(HomeProductCard, skipOffstage: false), findsNWidgets(11));
    expect(find.textContaining('ต้นมอนสเตอร่า', findRichText: true, skipOffstage: false), findsOneWidget);
    expect(find.textContaining('กางเกงยีนส์', findRichText: true, skipOffstage: false), findsNothing);
    expect(tester.takeException(), isNull);
  });

  testWidgets('แม่และเด็ก shows only the 10 mother and baby products', (tester) async {
    tester.view.physicalSize = const Size(390, 1400); // tall enough to build the category bar below the campaign
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();
    final baby = find.byTooltip('แม่และเด็ก');
    await tester.ensureVisible(baby);
    await tester.tap(baby);
    await tester.pumpAndSettle();
    expect(find.byType(HomeProductCard, skipOffstage: false), findsNWidgets(10));
    expect(find.textContaining('รถเข็นเด็ก', findRichText: true, skipOffstage: false), findsOneWidget);
    expect(find.textContaining('ต้นมอนสเตอร่า', findRichText: true, skipOffstage: false), findsNothing);
    expect(tester.takeException(), isNull);
  });

  testWidgets('สินค้าสัตว์เลี้ยง shows only the 10 pet products', (tester) async {
    tester.view.physicalSize = const Size(390, 1400); // tall enough to build the category bar below the campaign
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();
    final pet = find.byTooltip('สินค้าสัตว์เลี้ยง');
    await tester.ensureVisible(pet);
    await tester.tap(pet);
    await tester.pumpAndSettle();
    expect(find.byType(HomeProductCard, skipOffstage: false), findsNWidgets(10));
    expect(find.textContaining('คอนโดแมว', findRichText: true, skipOffstage: false), findsOneWidget);
    expect(find.textContaining('รถเข็นเด็ก', findRichText: true, skipOffstage: false), findsNothing);
    expect(tester.takeException(), isNull);
  });

  testWidgets('เครื่องใช้ไฟฟ้าและไอที shows only the 10 electronics products', (tester) async {
    tester.view.physicalSize = const Size(390, 1400); // tall enough to build the category bar below the campaign
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();
    final it = find.byTooltip('เครื่องใช้ไฟฟ้าและไอที');
    await tester.ensureVisible(it);
    await tester.tap(it);
    await tester.pumpAndSettle();
    expect(find.byType(HomeProductCard, skipOffstage: false), findsNWidgets(10));
    expect(find.textContaining('สมาร์ทวอทช์', findRichText: true, skipOffstage: false), findsOneWidget);
    expect(find.textContaining('คอนโดแมว', findRichText: true, skipOffstage: false), findsNothing);
    expect(tester.takeException(), isNull);
  });

  testWidgets('อาหารและเครื่องดื่ม sort chips order the products', (tester) async {
    tester.view.physicalSize = const Size(390, 1400); // tall enough to build the category bar below the campaign
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();
    final food = find.byTooltip('อาหารและเครื่องดื่ม');
    await tester.ensureVisible(food);
    await tester.tap(food);
    await tester.pumpAndSettle();

    List<int> prices() => tester
        .widgetList<HomeProductCard>(find.byType(HomeProductCard, skipOffstage: false))
        .map((c) => c.product.price)
        .toList();
    // Cards come out column by column: left top-down, then right. Dealing a
    // sorted list left/right means each column is sorted too.
    bool columnsSorted(List<int> p, bool Function(int a, int b) ok) {
      final left = p.take(5).toList(), right = p.skip(5).toList();
      bool sorted(List<int> l) => [for (var i = 1; i < l.length; i++) ok(l[i - 1], l[i])].every((x) => x);
      return sorted(left) && sorted(right);
    }

    final low = find.text('ราคา น้อยไปมาก', skipOffstage: false);
    await tester.ensureVisible(low);
    // ensureVisible leaves the chips under the pinned category bar: pull down a bit.
    await tester.drag(find.byType(CustomScrollView), const Offset(0, 150));
    await tester.pumpAndSettle();
    await tester.tap(low);
    await tester.pumpAndSettle();
    expect(columnsSorted(prices(), (a, b) => a <= b), isTrue);
    expect(prices().first, 45); // the cheapest, top left

    await tester.tap(find.text('ราคา มากไปน้อย', skipOffstage: false));
    await tester.pumpAndSettle();
    expect(columnsSorted(prices(), (a, b) => a >= b), isTrue);
    expect(prices().first, 280); // coffee beans ฿350 −20%

    await tester.tap(find.text('ขายดี', skipOffstage: false));
    await tester.pumpAndSettle();
    final sold = tester
        .widgetList<HomeProductCard>(find.byType(HomeProductCard, skipOffstage: false))
        .map((c) => c.product.soldCount)
        .first;
    expect(sold, 230000); // milk
    expect(tester.takeException(), isNull);
  });

  testWidgets('every other category gets sort chips; those with shops show ร้าน/แบรนด์แนะนำ', (tester) async {
    tester.view.physicalSize = const Size(390, 1400); // tall enough to build the category bar below the campaign
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();
    // สินค้าแนะนำ: no chips.
    expect(find.text('ขายดี', skipOffstage: false), findsNothing);
    for (final label in ['สุขภาพและความงาม', 'แฟชั่น', 'บ้านและสวน', 'แม่และเด็ก', 'สินค้าสัตว์เลี้ยง', 'เครื่องใช้ไฟฟ้าและไอที', 'สมุนไพร']) {
      final chip = find.byTooltip(label);
      await tester.ensureVisible(chip);
      await tester.tap(chip);
      await tester.pumpAndSettle();
      expect(find.text('ขายดี', skipOffstage: false), findsOneWidget, reason: label);
      final hasShops = label != 'สมุนไพร';
      expect(find.text('ร้าน/แบรนด์แนะนำ', skipOffstage: false), hasShops ? findsOneWidget : findsNothing, reason: label);
      if (hasShops) expect(find.byType(HomeBrandLogoCard, skipOffstage: false), findsNWidgets(5), reason: label);
      expect(tester.takeException(), isNull, reason: label);
      await tester.drag(find.byType(CustomScrollView), const Offset(0, 600));
      await tester.pumpAndSettle();
    }
  });

  testWidgets('the sort chips stay pinned under the category bar while scrolling', (tester) async {
    tester.view.physicalSize = const Size(390, 1400); // tall enough to build the category bar below the campaign
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: HomeScreen())));
    await tester.pump();
    final fashion = find.byTooltip('แฟชั่น');
    await tester.ensureVisible(fashion);
    await tester.tap(fashion);
    await tester.pumpAndSettle();

    await tester.drag(find.byType(CustomScrollView), const Offset(0, -2000));
    await tester.pumpAndSettle();
    final barBottom = tester.getBottomLeft(find.byType(HomeCategoryBar)).dy;
    final chip = find.text('ขายดี');
    expect(chip, findsOneWidget);
    expect(tester.getTopLeft(chip).dy, greaterThan(barBottom), reason: 'right under the bar');
    expect(tester.getTopLeft(chip).dy, lessThan(barBottom + 44));

    // Still works while pinned.
    await tester.tap(chip);
    await tester.pumpAndSettle();
    expect(tester.takeException(), isNull);
  });
}
