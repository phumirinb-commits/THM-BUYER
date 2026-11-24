import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/feats/home/model/home_mock_data.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_category_bar.dart';

/// Holds the selection the way HomeScreen does.
class _Harness extends StatefulWidget {
  const _Harness();
  @override
  State<_Harness> createState() => _HarnessState();
}

class _HarnessState extends State<_Harness> {
  int selected = 0;
  @override
  Widget build(BuildContext context) => MaterialApp(
        home: Scaffold(
          body: Center(
            child: HomeCategoryBar(
              categories: HomeMockData.categories,
              selectedIndex: selected,
              onSelected: (i) => setState(() => selected = i),
            ),
          ),
        ),
      );
}

/// Scale of the pop wrapper around the selected pill (1 when it has none).
double _pillScale(WidgetTester tester, String label) {
  final pop = find.ancestor(of: find.text(label), matching: find.byType(TweenAnimationBuilder<double>));
  if (pop.evaluate().isEmpty) return 1;
  final t = tester.widget<Transform>(find.descendant(of: pop, matching: find.byType(Transform)).first);
  return t.transform.storage[0]; // x scale (getMaxScaleOnAxis would include z = 1)
}

void main() {
  setUpAll(() async {
    final loader = FontLoader('SukhumvitTadmai')
      ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Text.ttf'));
    await loader.load();
  });

  Future<void> setUp(WidgetTester tester) async {
    tester.view.physicalSize = const Size(390, 300);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
  }

  testWidgets('first selected pill does not pop on load', (tester) async {
    await setUp(tester);
    await tester.pumpWidget(const _Harness());
    expect(find.byType(TweenAnimationBuilder<double>), findsNothing);
  });

  testWidgets('a newly selected category pops in with an overshoot', (tester) async {
    await setUp(tester);
    await tester.pumpWidget(const _Harness());

    await tester.tap(find.byTooltip('อาหารและเครื่องดื่ม'));
    await tester.pump();
    expect(find.text('อาหารและเครื่องดื่ม'), findsOneWidget); // now the pill, with its label
    expect(_pillScale(tester, 'อาหารและเครื่องดื่ม'), closeTo(0.85, 0.01));

    // easeOutBack goes past 1 before it settles.
    var peak = 0.0;
    for (var t = 0; t < 21; t++) {
      await tester.pump(HomeCategoryBar.popDuration ~/ 20);
      peak = peak < _pillScale(tester, 'อาหารและเครื่องดื่ม') ? _pillScale(tester, 'อาหารและเครื่องดื่ม') : peak;
    }
    expect(peak, greaterThan(1.0));
    expect(_pillScale(tester, 'อาหารและเครื่องดื่ม'), closeTo(1.0, 0.001));
  });

  testWidgets('a category disc dips to 0.96 while pressed', (tester) async {
    await setUp(tester);
    await tester.pumpWidget(const _Harness());

    final disc = find.byTooltip('สุขภาพและความงาม');
    final scale = find.descendant(of: disc, matching: find.byType(AnimatedScale));
    // Every category shows its name now, so the bar is wider: scroll it in.
    await tester.ensureVisible(disc);
    await tester.pumpAndSettle();
    final gesture = await tester.startGesture(tester.getCenter(disc));
    await tester.pump(const Duration(milliseconds: 200)); // past the tap-down delay
    expect(tester.widget<AnimatedScale>(scale).scale, 0.96);
    await gesture.up();
    await tester.pumpAndSettle();
  });

  testWidgets('no bounce under reduced motion', (tester) async {
    await setUp(tester);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);
    await tester.pumpWidget(const _Harness());

    await tester.tap(find.byTooltip('อาหารและเครื่องดื่ม'));
    await tester.pump();
    expect(find.byType(TweenAnimationBuilder<double>), findsNothing);
    expect(_pillScale(tester, 'อาหารและเครื่องดื่ม'), 1);
  });

  test('mock has the 15 categories, in order', () {
    expect(HomeMockData.categories.map((c) => c.label), [
      'สินค้าแนะนำ',
      'อาหารและเครื่องดื่ม',
      'สุขภาพและความงาม',
      'แฟชั่น',
      'บ้านและสวน',
      'แม่และเด็ก',
      'สินค้าสัตว์เลี้ยง',
      'เครื่องใช้ไฟฟ้าและไอที',
      'อุปกรณ์ยานยนต์',
      'เครื่องมือช่าง',
      'กีฬาและกิจกรรม',
      'งานอดิเรกและของสะสม',
      'เครื่องเขียนและสำนักงาน',
      'สมุนไพร',
      'อื่นๆ',
    ]);
  });

  testWidgets('the bar never shows more than 15 categories', (tester) async {
    final many = [...HomeMockData.categories, ...HomeMockData.categories.take(5)]; // 20
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(body: HomeCategoryBar(categories: many, selectedIndex: 0, onSelected: (_) {})),
    ));
    // 1 selected pill (label text) + 14 discs (tooltips).
    final discs = find.byType(Tooltip).evaluate().length;
    expect(discs + 1, HomeCategoryBar.maxCategories);
  });
}
