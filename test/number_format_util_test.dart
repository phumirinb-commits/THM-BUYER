import 'package:flutter_test/flutter_test.dart';
import 'package:thaimart_buyer/app/shared/utils/number_format_util.dart';

void main() {
  test('baht groups thousands', () {
    expect(NumberFormatUtil.baht(4999), '฿4,999');
    expect(NumberFormatUtil.baht(1290000), '฿1,290,000');
    expect(NumberFormatUtil.baht(999), '฿999');
  });

  test('compact abbreviates and rounds down', () {
    expect(NumberFormatUtil.compact(30), '30');
    expect(NumberFormatUtil.compact(999), '999');
    expect(NumberFormatUtil.compact(1000), '1K');
    expect(NumberFormatUtil.compact(10000), '10K');
    expect(NumberFormatUtil.compact(25600), '25.6K');
    expect(NumberFormatUtil.compact(999999), '999K');
    expect(NumberFormatUtil.compact(1200000), '1.2M');
    expect(NumberFormatUtil.compact(3450000), '3.4M');
  });
}
