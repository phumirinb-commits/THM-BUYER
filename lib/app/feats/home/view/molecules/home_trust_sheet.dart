import 'package:flutter/material.dart';

import '../../../../shared/constants/app_assets.dart';
import '../../../../shared/theme/app_colors.dart';
import '../../../../shared/theme/app_text_styles.dart';
import '../../../../shared/widgets/app_svg.dart';
import '../../../../shared/widgets/mall_badge.dart';

/// Bottom sheet explaining the trust badge: genuine-goods promise, 2× refund,
/// and the TIS (มอก.) / FDA (อย.) certifications Thaimart supports.
class HomeTrustSheet extends StatelessWidget {
  const HomeTrustSheet({super.key});

  static Future<void> show(BuildContext context) => showModalBottomSheet<void>(
        context: context,
        // Size to the content instead of the default 9/16-of-screen cap.
        isScrollControlled: true,
        backgroundColor: AppColors.white,
        showDragHandle: true,
        shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
        builder: (_) => const HomeTrustSheet(),
      );

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      // Scrolls only on screens too short for the whole sheet.
      child: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('มั่นใจทุกการสั่งซื้อกับไทยมาร์ท', style: AppTextStyles.heading(18, lineHeight: 26)),
            const SizedBox(height: 16),
            const _Promise(
              icon: AppImages.genuineAward,
              title: 'ของแท้ต้องไทยมาร์ท',
              body: 'สินค้าทุกชิ้นมาจากร้านที่ผ่านการตรวจสอบตัวตนกับไทยมาร์ท',
            ),
            const SizedBox(height: 12),
            const _Promise(
              icon: AppIcons.moneySecurity,
              title: 'ปลอมคืนเงิน 2 เท่า',
              body: 'หากพบว่าสินค้าไม่ใช่ของแท้ รับเงินคืน 2 เท่าของราคาที่ชำระ',
            ),
            const SizedBox(height: 16),
            const Divider(height: 1, color: AppColors.divider),
            const SizedBox(height: 16),
            // What the marks before shop and product names mean.
            Text('ป้ายร้านค้า', style: AppTextStyles.heading(16, lineHeight: 24)),
            const SizedBox(height: 12),
            const _ShopMark(
              mark: MallBadge(),
              title: 'Mall',
              body: 'ร้านทางการของเจ้าของแบรนด์ (Official) ส่งเอกสารครบ',
            ),
            const SizedBox(height: 12),
            const _ShopMark(
              mark: AppSvg(AppIcons.checkmarkBadge, size: 20),
              title: 'ตรวจสอบแล้ว',
              body: 'ร้านนี้ผ่านการตรวจสอบทะเบียนพาณิชย์กับไทยมาร์ทแล้ว',
            ),
            const SizedBox(height: 16),
            const Divider(height: 1, color: AppColors.divider),
            const SizedBox(height: 16),
            Text('รองรับ มอก. และ อย.', style: AppTextStyles.heading(16, lineHeight: 24)),
            const SizedBox(height: 4),
            Text(
              'สินค้าที่ต้องมีเครื่องหมายรับรอง จะแสดงสัญลักษณ์บนรูปสินค้า',
              style: AppTextStyles.regular(14, lineHeight: 20, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 12),
            // IntrinsicHeight + stretch: both cards match the taller one.
            const IntrinsicHeight(
              child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              spacing: 12,
              children: [
                Expanded(child: _Certification(icon: AppIcons.tisBadge, label: 'มอก.', caption: 'มาตรฐานผลิตภัณฑ์อุตสาหกรรม')),
                Expanded(child: _Certification(icon: AppIcons.fdaBadge, label: 'อย.', caption: 'อาหารและยา')),
              ],
              ),
            ),
            const SizedBox(height: 20),
            FilledButton(
              onPressed: () => Navigator.of(context).pop(),
              style: FilledButton.styleFrom(
                backgroundColor: AppColors.brand,
                foregroundColor: AppColors.white,
                minimumSize: const Size.fromHeight(48),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                textStyle: AppTextStyles.heading(16),
              ),
              child: const Text('เข้าใจแล้ว'),
            ),
          ],
        ),
      ),
    );
  }
}

class _Promise extends StatelessWidget {
  const _Promise({required this.icon, required this.title, required this.body});

  final String icon;
  final String title;
  final String body;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      spacing: 12,
      children: [
        Container(
          width: 40,
          height: 40,
          alignment: Alignment.center,
          decoration: const BoxDecoration(color: AppColors.chipFill, shape: BoxShape.circle),
          child: AppSvg(icon, size: 24),
        ),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            spacing: 2,
            children: [
              Text(title, style: AppTextStyles.heading(14, lineHeight: 20)),
              Text(body, style: AppTextStyles.regular(14, lineHeight: 20, color: AppColors.textSecondary)),
            ],
          ),
        ),
      ],
    );
  }
}

/// One shop mark with what it means: the mark on the left in a 44px slot
/// (the Mall tag is wider than the check mark), the text on the right.
class _ShopMark extends StatelessWidget {
  const _ShopMark({required this.mark, required this.title, required this.body});

  final Widget mark;
  final String title;
  final String body;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      spacing: 12,
      children: [
        SizedBox(width: 44, height: 20, child: Center(child: ExcludeSemantics(child: mark))),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            spacing: 2,
            children: [
              Text(title, style: AppTextStyles.heading(14, lineHeight: 20)),
              Text(body, style: AppTextStyles.regular(14, lineHeight: 20, color: AppColors.textSecondary)),
            ],
          ),
        ),
      ],
    );
  }
}

class _Certification extends StatelessWidget {
  const _Certification({required this.icon, required this.label, required this.caption});

  final String icon;
  final String label;
  final String caption;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.cardBorder),
      ),
      child: Row(
        spacing: 8,
        children: [
          AppSvg(icon, size: 32),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: AppTextStyles.bold(14, lineHeight: 20)),
                Text(caption, style: AppTextStyles.regular(12, lineHeight: 16, color: AppColors.textSecondary)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
