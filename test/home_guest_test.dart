import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/feats/main/view/main_screen.dart';
import 'package:thaimart_buyer/app/shared/auth/auth_scope.dart';
import 'package:thaimart_buyer/app/shared/widgets/login_prompt_sheet.dart';

/// The real app shell, logged out, at phone size, with calm motion so
/// pumpAndSettle can finish despite the looping live animations.
Future<AuthController> _pumpGuest(WidgetTester tester) async {
  tester.view.physicalSize = const Size(390, 844);
  tester.view.devicePixelRatio = 1;
  addTearDown(tester.view.reset);
  tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
  addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);

  final auth = AuthController(loggedIn: false);
  await tester.pumpWidget(AuthScope(controller: auth, child: const MaterialApp(home: MainScreen())));
  await tester.pump();
  return auth;
}

void main() {
  setUpAll(() async {
    final loader = FontLoader('SukhumvitTadmai')
      ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Text.ttf'))
      ..addFont(rootBundle.load('assets/fonts/SukhumvitTadmai/SukhumvitTadmai-Bold.ttf'));
    await loader.load();
  });

  testWidgets('logged out: no counts, a log-in story, the rest of Home as usual', (tester) async {
    await _pumpGuest(tester);
    expect(find.text('99+'), findsNothing);
    expect(find.byTooltip('ตะกร้าสินค้า'), findsOneWidget);
    expect(find.bySemanticsLabel('เข้าสู่ระบบ'), findsOneWidget);
    expect(find.text('สตอรี่ของคุณ'), findsNothing);
    // Trust and shopping stay visible.
    expect(find.text('ของแท้ต้องไทยมาร์ท'), findsOneWidget);
    expect(find.text('ครามสกล'), findsWidgets);
    expect(tester.takeException(), isNull);
  });

  testWidgets('logging in from the story row shows counts and their own story', (tester) async {
    final auth = await _pumpGuest(tester);
    // No follow button on the shop cards any more.
    expect(find.text('ติดตาม'), findsNothing);
    await tester.tap(find.bySemanticsLabel('เข้าสู่ระบบ'));
    await tester.pumpAndSettle();
    expect(find.text('เข้าสู่ระบบเพื่อลงสตอรี่ของคุณ'), findsOneWidget);

    await tester.tap(find.widgetWithText(FilledButton, 'เข้าสู่ระบบ'));
    await tester.pumpAndSettle();
    expect(auth.isLoggedIn, isTrue);
    expect(find.byType(LoginPromptSheet), findsNothing);
    expect(find.text('99+'), findsOneWidget);
    // Back to the top: the story row now shows their own story.
    await tester.drag(find.byType(CustomScrollView), const Offset(0, 2000));
    await tester.pumpAndSettle();
    expect(find.text('สตอรี่ของคุณ'), findsOneWidget);
  });

  testWidgets('"ไว้ก่อน" closes the sheet and stays logged out', (tester) async {
    final auth = await _pumpGuest(tester);
    await tester.tap(find.bySemanticsLabel('เข้าสู่ระบบ'));
    await tester.pumpAndSettle();
    expect(find.text('เข้าสู่ระบบเพื่อลงสตอรี่ของคุณ'), findsOneWidget);
    await tester.tap(find.text('ไว้ก่อน'));
    await tester.pumpAndSettle();
    expect(find.byType(LoginPromptSheet), findsNothing);
    expect(auth.isLoggedIn, isFalse);
  });

  testWidgets('คำสั่งซื้อ and โปรไฟล์ tabs ask to log in; ค้นพบ does not', (tester) async {
    await _pumpGuest(tester);
    await tester.tap(find.text('คำสั่งซื้อ'));
    await tester.pumpAndSettle();
    expect(find.text('เข้าสู่ระบบเพื่อดูคำสั่งซื้อ'), findsOneWidget);
    await tester.tap(find.text('ไว้ก่อน'));
    await tester.pumpAndSettle();
    expect(find.text('คำสั่งซื้อ — ยังไม่มีดีไซน์'), findsNothing); // tab did not open

    await tester.tap(find.text('โปรไฟล์'));
    await tester.pumpAndSettle();
    expect(find.text('เข้าสู่ระบบเพื่อดูโปรไฟล์ของคุณ'), findsOneWidget);
    await tester.tap(find.text('ไว้ก่อน'));
    await tester.pumpAndSettle();

    await tester.tap(find.text('ค้นพบ'));
    await tester.pumpAndSettle();
    expect(find.byType(LoginPromptSheet), findsNothing);
  });
}
