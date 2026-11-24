import 'package:flutter/material.dart';

import '../../../shared/auth/auth_scope.dart';
import '../../../shared/theme/app_colors.dart';
import '../../../shared/widgets/login_prompt_sheet.dart';
import '../../../shared/theme/app_text_styles.dart';
import '../../home/view/home_screen.dart';
import 'molecules/main_bottom_nav.dart';

/// App shell: tab content above the bottom navigation.
class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _tab = 0;

  /// Tabs that need an account, with what the login sheet says for each.
  static const _needsLogin = {3: 'ดูคำสั่งซื้อ', 4: 'ดูโปรไฟล์ของคุณ'};

  Future<void> _select(int i) async {
    final action = _needsLogin[i];
    if (action != null && !AuthScope.isLoggedIn(context)) {
      // Open the tab only if they log in from the sheet.
      if (!await LoginPromptSheet.show(context, action: action) || !mounted) return;
    }
    setState(() => _tab = i);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.white,
      body: IndexedStack(
        index: _tab,
        children: [
          const HomeScreen(),
          for (final item in mainNavItems.skip(1)) _PlaceholderTab(label: item.label),
        ],
      ),
      bottomNavigationBar: MainBottomNav(selectedIndex: _tab, onSelected: _select),
    );
  }
}

class _PlaceholderTab extends StatelessWidget {
  const _PlaceholderTab({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('$label — ยังไม่มีดีไซน์', style: AppTextStyles.regular(16, color: AppColors.textMuted)),
    );
  }
}
