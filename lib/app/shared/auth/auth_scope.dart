import 'package:flutter/widgets.dart';

/// Whether the buyer is logged in. A mock for now: there is no real login
/// screen yet, so [logIn] just flips the flag.
class AuthController extends ValueNotifier<bool> {
  AuthController({required bool loggedIn}) : super(loggedIn);

  bool get isLoggedIn => value;

  void logIn() => value = true;

  void logOut() => value = false;
}

/// Puts an [AuthController] above the app. Widgets read it with
/// [AuthScope.isLoggedIn] and rebuild when it changes.
class AuthScope extends InheritedNotifier<AuthController> {
  const AuthScope({super.key, required AuthController controller, required super.child})
      : super(notifier: controller);

  /// The controller, or null when no scope is above (e.g. a widget test).
  static AuthController? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<AuthScope>()?.notifier;

  /// Logged in unless a scope says otherwise.
  static bool isLoggedIn(BuildContext context) => maybeOf(context)?.isLoggedIn ?? true;
}
