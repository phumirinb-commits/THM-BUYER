import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/feats/home/model/home_campaign.dart';
import 'package:thaimart_buyer/app/feats/home/view/home_screen.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_campaign_banner.dart';
import 'package:thaimart_buyer/app/feats/home/view/molecules/home_campaign_countdown.dart';
import 'package:thaimart_buyer/app/shared/constants/app_assets.dart';

HomeCampaign _campaign({bool enabled = true}) => HomeCampaign(
      enabled: enabled,
      startsAt: DateTime(2026, 11, 1),
      endsAt: DateTime(2026, 11, 11, 23, 59, 59),
      image: AppImages.campaignBrandDay,
      label: 'Thaimart Brand Day',
      aspectRatio: 1672 / 941,
    );

/// Real font metrics; the default test font draws every glyph as a wide box.
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
  group('isVisible: switch + dates', () {
    final c = _campaign();
    test('inside the dates', () => expect(c.isVisible(DateTime(2026, 11, 6)), isTrue));
    test('before it starts', () => expect(c.isVisible(DateTime(2026, 10, 31, 23, 59)), isFalse));
    test('at the start', () => expect(c.isVisible(DateTime(2026, 11, 1)), isTrue));
    test('at the end', () => expect(c.isVisible(DateTime(2026, 11, 11, 23, 59, 59)), isFalse));
    test('switched off hides it inside the dates', () => expect(_campaign(enabled: false).isVisible(DateTime(2026, 11, 6)), isFalse));
    test('?campaign=on forces it on', () {
      expect(_campaign(enabled: false).isVisible(DateTime(2027), override: 'on'), isTrue);
    });
    test('?campaign=off forces it off', () => expect(c.isVisible(DateTime(2026, 11, 6), override: 'off'), isFalse));
  });

  Future<void> pumpHome(WidgetTester tester, HomeCampaign c, DateTime Function() now) async {
    tester.view.physicalSize = const Size(390, 1400);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);
    await tester.pumpWidget(MaterialApp(home: Scaffold(body: HomeScreen(campaign: c, now: now))));
    await tester.pump();
  }

  testWidgets('Home shows the campaign while it runs', (tester) async {
    await pumpHome(tester, _campaign(), () => DateTime(2026, 11, 6));
    expect(find.byType(HomeCampaignBanner), findsOneWidget);
  });

  testWidgets('Home hides it when switched off or out of its dates', (tester) async {
    await pumpHome(tester, _campaign(enabled: false), () => DateTime(2026, 11, 6));
    expect(find.byType(HomeCampaignBanner), findsNothing);
    await pumpHome(tester, _campaign(), () => DateTime(2026, 11, 12));
    expect(find.byType(HomeCampaignBanner), findsNothing);
  });

  testWidgets('it disappears by itself when the countdown reaches zero', (tester) async {
    var now = DateTime(2026, 11, 11, 23, 59, 57);
    await pumpHome(tester, _campaign(), () => now);
    expect(find.byType(HomeCampaignBanner), findsOneWidget);
    now = DateTime(2026, 11, 11, 23, 59, 59);
    await tester.pump(const Duration(seconds: 1));
    await tester.pump();
    expect(find.byType(HomeCampaignBanner), findsNothing);
  });

  group('countdown', () {
    Future<void> pump(WidgetTester tester, DateTime Function() now, DateTime endsAt) => tester.pumpWidget(
          MaterialApp(home: Scaffold(body: Center(child: HomeCampaignCountdown(endsAt: endsAt, now: now)))),
        );

    String digits(WidgetTester tester, String unit) {
      final texts = tester
          .widgetList<Text>(find.descendant(of: find.byKey(ValueKey('countdown-$unit')), matching: find.byType(Text)))
          .map((t) => t.data!)
          .toList();
      return texts.take(texts.length - 1).join(); // last Text is the unit
    }

    testWidgets('days, hours, minutes, seconds; ticks each second', (tester) async {
      var now = DateTime(2026, 11, 6, 10);
      await pump(tester, () => now, DateTime(2026, 11, 8, 12, 30, 5));
      expect(digits(tester, 'วัน'), '02');
      expect(digits(tester, 'ชั่วโมง'), '02');
      expect(digits(tester, 'นาที'), '30');
      expect(digits(tester, 'วินาที'), '05');
      now = now.add(const Duration(seconds: 1));
      await tester.pump(const Duration(seconds: 1));
      expect(digits(tester, 'วินาที'), '04');
    });

    testWidgets('under a day: no day pair', (tester) async {
      final now = DateTime(2026, 11, 6, 10);
      await pump(tester, () => now, DateTime(2026, 11, 6, 13));
      expect(find.text('วัน'), findsNothing);
      expect(digits(tester, 'ชั่วโมง'), '03');
    });
  });
}
