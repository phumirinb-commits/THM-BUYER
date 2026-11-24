import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'app/feats/main/view/main_screen.dart';
import 'app/feats/product/model/product_detail_mock.dart';
import 'app/feats/product/view/product_detail_screen.dart';
import 'app/shared/auth/auth_scope.dart';
import 'app/shared/theme/app_colors.dart';
import 'app/shared/theme/app_text_styles.dart';
import 'app/shared/widgets/preview_device_frame.dart';

void main() => runApp(const ThaimartBuyerApp());

class ThaimartBuyerApp extends StatelessWidget {
  const ThaimartBuyerApp({super.key});

  /// Localhost preview: add ?guest=1 to the address to see the logged-out Home.
  static final auth = AuthController(loggedIn: !(kIsWeb && Uri.base.queryParameters['guest'] == '1'));

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Thaimart',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: AppTextStyles.fontFamily,
        colorScheme: ColorScheme.fromSeed(seedColor: AppColors.brand, primary: AppColors.brand),
        scaffoldBackgroundColor: AppColors.white,
      ),
      // On web (localhost preview) show the screen inside an iPhone 13/14 frame.
      builder: (context, child) => AuthScope(
        controller: auth,
        child: PreviewDeviceFrame(enabled: kIsWeb, child: child!),
      ),
      // Localhost preview: ?page=product opens the pet fountain's product page.
      home: kIsWeb && Uri.base.queryParameters['page'] == 'product'
          ? const ProductDetailScreen(detail: ProductDetailMock.fountain)
          : const MainScreen(),
    );
  }
}
