/// Number formatting for prices and counters.
abstract final class NumberFormatUtil {
  /// `1290000` → `฿1,290,000`.
  static String baht(int value) => '฿${grouped(value)}';

  /// Short counter: `950` → `950`, `10000` → `10K`, `25600` → `25.6K`,
  /// `1200000` → `1.2M`. Rounds down so a count is never overstated.
  static String compact(int value) {
    if (value < 1000) return '$value';
    final (divisor, suffix) = value < 1000000 ? (1000, 'K') : value < 1000000000 ? (1000000, 'M') : (1000000000, 'B');
    final tenths = value * 10 ~/ divisor; // one decimal, truncated
    final whole = tenths ~/ 10;
    final decimal = tenths % 10;
    return decimal == 0 || whole >= 100 ? '$whole$suffix' : '$whole.$decimal$suffix';
  }

  /// `1290000` → `1,290,000`.
  static String grouped(int value) {
    final digits = value.abs().toString();
    final buf = StringBuffer(value < 0 ? '-' : '');
    for (var i = 0; i < digits.length; i++) {
      if (i > 0 && (digits.length - i) % 3 == 0) buf.write(',');
      buf.write(digits[i]);
    }
    return buf.toString();
  }
}
