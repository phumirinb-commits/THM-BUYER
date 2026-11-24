import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/feats/home/model/home_models.dart';

HomeProduct _p(int original, ProductDiscount? d) => HomeProduct(
      title: 't',
      image: 'i',
      originalPrice: original,
      discount: d,
      rating: '4.8',
      soldCount: 1,
      badges: const [],
    );

void main() {
  test('amount discount subtracts baht', () {
    final p = _p(5500000, const AmountDiscount(500));
    expect(p.price, 5499500);
    expect(p.hasDiscount, isTrue);
  });

  test('percent discount applies percentage', () {
    expect(_p(2590000, const PercentDiscount(50)).price, 1295000);
    expect(_p(4000000, const PercentDiscount(25)).price, 3000000);
  });

  test('no discount keeps original price', () {
    final p = _p(4999, null);
    expect(p.price, 4999);
    expect(p.hasDiscount, isFalse);
  });

  test('amount larger than price never goes negative', () {
    expect(_p(100, const AmountDiscount(500)).price, 0);
  });
}
