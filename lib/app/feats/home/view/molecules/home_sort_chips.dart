import 'package:flutter/material.dart';

import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';

/// How a category's products are ordered.
enum ProductSort {
  bestSelling('ขายดี'),
  priceHighToLow('ราคา มากไปน้อย'),
  priceLowToHigh('ราคา น้อยไปมาก');

  const ProductSort(this.label);
  final String label;
}

/// One row of filter chips. Tap a chip to sort by it; tap it again to go back
/// to the default order. Selected: red tint fill, red text and edge;
/// the rest: white with a grey edge (kit filter chips).
class HomeSortChips extends StatelessWidget {
  const HomeSortChips({super.key, required this.selected, required this.onChanged});

  final ProductSort? selected;
  final ValueChanged<ProductSort?> onChanged;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        spacing: 8,
        children: [
          for (final sort in ProductSort.values)
            _Chip(
              label: sort.label,
              selected: sort == selected,
              onTap: () => onChanged(sort == selected ? null : sort),
            ),
        ],
      ),
    );
  }
}

class _Chip extends StatelessWidget {
  const _Chip({required this.label, required this.selected, required this.onTap});

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      selected: selected,
      child: InkWell(
        onTap: onTap,
        customBorder: const StadiumBorder(),
        // 44px tall tap area around a 32px chip.
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 6),
          child: Container(
            height: 32,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            alignment: Alignment.center,
            decoration: ShapeDecoration(
              color: selected ? AppColors.tint : AppColors.white,
              shape: StadiumBorder(
                side: BorderSide(color: selected ? AppColors.brand : AppColors.controlBorder),
              ),
            ),
            child: Text(
              label,
              style: AppTextStyles.heading(
                14,
                lineHeight: 20,
                weight: FontWeight.w400,
                color: selected ? AppColors.brandText : AppColors.textChip,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
