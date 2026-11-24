import 'package:flutter/material.dart';

import '../../../../shared/theme/app_colors.dart';
import '../../model/home_campaign.dart';
import 'home_campaign_countdown.dart';

/// Campaign artwork edge to edge (full screen width, square corners), with a
/// flip-clock countdown to [HomeCampaign.endsAt] over its bottom centre.
class HomeCampaignBanner extends StatelessWidget {
  const HomeCampaignBanner({super.key, required this.campaign, this.onEnded, this.onTap, this.now});

  final HomeCampaign campaign;

  /// Called once when the countdown reaches zero (Home then hides it).
  final VoidCallback? onEnded;
  final VoidCallback? onTap;

  /// Clock, for tests.
  final DateTime Function()? now;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: campaign.label,
      child: Material(
        color: AppColors.white,
        child: InkWell(
          onTap: onTap ?? () {},
          child: AspectRatio(
            aspectRatio: campaign.aspectRatio,
            child: Stack(
              fit: StackFit.expand,
              children: [
                Ink.image(image: AssetImage(campaign.image), fit: BoxFit.cover),
                Positioned(
                  left: 0,
                  right: 0,
                  bottom: 4, // low on the podium, clear of the artwork's own text
                  child: Center(
                    child: HomeCampaignCountdown(endsAt: campaign.endsAt, onEnded: onEnded, now: now),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
