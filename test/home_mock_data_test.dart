import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/feats/home/model/home_mock_data.dart';

void main() {
  final all = [...HomeMockData.leftColumn, ...HomeMockData.rightColumn];
  // The million-baht demo is there on purpose to test the layout.
  final products = all.where((p) => p != HomeMockData.bigDealDemo).toList();

  test('no mock product is discounted by more than 20,000 baht', () {
    for (final p in products) {
      final off = p.originalPrice - p.price;
      expect(off, lessThanOrEqualTo(HomeMockData.maxDiscountBaht), reason: p.title);
    }
  });

  test('feed has no repeated product', () {
    expect(all.map((p) => p.title).toSet(), hasLength(all.length));
  });

  test('the million-baht demo: −฿1,000,000 off ฿2,450,000', () {
    expect(all, contains(HomeMockData.bigDealDemo));
    expect(HomeMockData.bigDealDemo.price, 1450000);
  });

  test('mock prices look like real everyday products', () {
    for (final p in products) {
      expect(p.originalPrice, inInclusiveRange(10, 5000), reason: p.title);
      expect(p.price, greaterThan(0), reason: p.title);
    }
  });

  test('the three repriced products', () {
    int priceOf(String start) => products.firstWhere((p) => p.title.startsWith(start)).price;
    expect(priceOf('สำลีแผ่น'), 62);
    expect(priceOf('เสื้อเบลาส์'), 490);
    expect(priceOf('ปลั๊กพ่วง'), 390);
  });
}
