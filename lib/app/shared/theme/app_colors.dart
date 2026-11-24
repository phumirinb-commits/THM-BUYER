import 'package:flutter/painting.dart';

/// Colour tokens taken from the Re-design Thaimart Figma file.
abstract final class AppColors {
  /// `brand/brand` — primary red.
  static const brand = Color(0xFFE32321);

  /// Top of the home header gradient.
  static const brandTint = Color(0xFFF29B9A);

  static const white = Color(0xFFFFFFFF);
  static const black = Color(0xFF000000);

  /// `neutral-black`.
  static const neutralBlack = Color(0xFF171717);
  static const textHeading = Color(0xFF2C2C2C);
  static const textChip = Color(0xFF3A3A3C);
  static const textSecondary = Color(0xFF66666B);
  static const textMuted = Color(0xFF757575);
  static const textSubtle = Color(0xFF8C8C8C);
  static const navInactive = Color(0xFF8A8A8A);

  /// `neutral/200` — thin dividers.
  static const divider = Color(0xFFE8E8E8);
  static const cardBorder = Color(0xFFECECEE);
  /// --c-tint: selected chip fill.
  static const tint = Color(0xFFFFF1F1);
  /// --c-red-t: red text on the tint (4.9:1).
  static const brandText = Color(0xFFD11F1D);
  /// --c-control: borders of inputs, line buttons and logo rings.
  static const controlBorder = Color(0xFFDBDBDB);

  /// Story ring when the creator has no story.
  static const storyRingEmpty = Color(0xFFD1D1D6);
  static const iconButtonBg = Color(0xFFF5F5F5);
  static const bannerBg = Color(0xFFF3EBEB);

  /// 20% black — pager dot that is not the current page.
  static const dotIdle = Color(0x33000000);

  /// 4% black — chip fill.
  static const chipFill = Color(0x0A000000);
}

abstract final class AppShadows {
  /// `0 1 4 1 rgba(0,0,0,.1)` — product cards, banner, category buttons.
  static const soft = [
    BoxShadow(color: Color(0x1A000000), blurRadius: 4, spreadRadius: 1, offset: Offset(0, 1)),
  ];

  /// `0 4 16 0 rgba(23,23,23,.06)` — brand cards.
  static const card = [
    BoxShadow(color: Color(0x0F171717), blurRadius: 16, offset: Offset(0, 4)),
  ];

  /// Brand-card avatar.
  static const avatar = [
    BoxShadow(color: Color(0x0F171717), blurRadius: 16, offset: Offset(0, 4)),
    BoxShadow(color: Color(0x0A171717), blurRadius: 2, offset: Offset(0, 1)),
  ];

  /// `drop-shadow(0 1 1.55 rgba(0,0,0,.09))` — product trust badges.
  static const badge = [
    BoxShadow(color: Color(0x17000000), blurRadius: 1.55, offset: Offset(0, 1)),
  ];

  /// `0 2 16 -3 rgba(0,0,0,.09)` — bottom navigation.
  static const bottomNav = [
    BoxShadow(color: Color(0x17000000), blurRadius: 16, spreadRadius: -3, offset: Offset(0, 2)),
  ];
}
