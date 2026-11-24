import 'package:flutter/material.dart';

import '../auth/auth_scope.dart';
import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';

/// Asks a logged-out buyer to log in, right when they try something that needs
/// an account ("เข้าสู่ระบบเพื่อติดตามร้านนี้"). Calm: one short line of why,
/// a primary "เข้าสู่ระบบ" and a quiet "ไว้ก่อน". No urgency.
class LoginPromptSheet extends StatelessWidget {
  const LoginPromptSheet({super.key, required this.action});

  /// What they tried to do, completing "เข้าสู่ระบบเพื่อ…", e.g. "ติดตามร้านนี้".
  final String action;

  /// Shows the sheet. Returns true if they chose to log in.
  static Future<bool> show(BuildContext context, {required String action}) async {
    final result = await showModalBottomSheet<bool>(
      context: context,
      backgroundColor: AppColors.white,
      showDragHandle: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => LoginPromptSheet(action: action),
    );
    return result ?? false;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('เข้าสู่ระบบเพื่อ$action', style: AppTextStyles.heading(18, lineHeight: 26)),
            const SizedBox(height: 4),
            Text(
              'ติดตามร้าน เก็บของในตะกร้า และดูคำสั่งซื้อได้ในที่เดียว',
              style: AppTextStyles.regular(14, lineHeight: 20, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 20),
            FilledButton(
              onPressed: () {
                // Mock: no login screen yet, so logging in just flips the flag.
                AuthScope.maybeOf(context)?.logIn();
                Navigator.of(context).pop(true);
              },
              style: FilledButton.styleFrom(
                backgroundColor: AppColors.brand,
                foregroundColor: AppColors.white,
                minimumSize: const Size.fromHeight(48),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                textStyle: AppTextStyles.heading(16),
              ),
              child: const Text('เข้าสู่ระบบ'),
            ),
            const SizedBox(height: 8),
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              style: TextButton.styleFrom(
                foregroundColor: AppColors.textChip,
                minimumSize: const Size.fromHeight(44),
                textStyle: AppTextStyles.heading(16, weight: FontWeight.w400),
              ),
              child: const Text('ไว้ก่อน'),
            ),
          ],
        ),
      ),
    );
  }
}
