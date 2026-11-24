/// A Home campaign banner that can be switched on and off and runs between
/// two times. It shows only while [enabled] and [startsAt] <= now < [endsAt].
class HomeCampaign {
  const HomeCampaign({
    required this.enabled,
    required this.startsAt,
    required this.endsAt,
    required this.image,
    required this.label,
    required this.aspectRatio,
  });

  /// The on/off switch. Off hides the campaign even inside its dates.
  final bool enabled;
  final DateTime startsAt;

  /// Also where the countdown counts to.
  final DateTime endsAt;

  final String image;

  /// Spoken name (the artwork's own text is not read out).
  final String label;
  final double aspectRatio;

  bool isLiveAt(DateTime now) => enabled && !now.isBefore(startsAt) && now.isBefore(endsAt);

  /// Whether Home shows it. [override] comes from the preview link:
  /// `?campaign=on` shows it regardless of the switch and dates,
  /// `?campaign=off` hides it; anything else follows [isLiveAt].
  bool isVisible(DateTime now, {String? override}) => switch (override) {
        'on' => true,
        'off' => false,
        _ => isLiveAt(now),
      };
}
