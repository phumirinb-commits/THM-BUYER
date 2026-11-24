import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../../../shared/theme/app_colors.dart';
import '../../../shared/theme/app_text_styles.dart';
import '../../product/model/product_detail_mock.dart';
import '../../product/view/product_detail_screen.dart';
import '../model/home_campaign.dart';
import '../model/home_mock_data.dart';
import '../model/home_models.dart';
import 'molecules/home_brand_card.dart';
import 'molecules/home_brand_logo_card.dart';
import 'molecules/home_campaign_banner.dart';
import 'molecules/home_category_bar.dart';
import 'molecules/home_header.dart';
import 'molecules/home_product_card.dart';
import 'molecules/home_promo_banner.dart';
import 'molecules/home_section_header.dart';
import 'molecules/home_sort_chips.dart';
import 'molecules/home_story_list.dart';
import 'molecules/home_trust_badge.dart';
import 'molecules/home_trust_sheet.dart';

/// Buyer home — Figma "Re-design Thaimart", node 3240:3851.
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key, this.campaign, this.now});

  /// The campaign banner; defaults to [HomeMockData.brandDay].
  final HomeCampaign? campaign;

  /// Clock, for tests; defaults to [DateTime.now].
  final DateTime Function()? now;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedCategory = 0;

  /// Set when the campaign's countdown reaches zero while Home is open.
  bool _campaignEnded = false;

  /// Preview link override: ?campaign=on / ?campaign=off.
  static final _campaignOverride = kIsWeb ? Uri.base.queryParameters['campaign'] : null;

  HomeCampaign get _campaign => widget.campaign ?? HomeMockData.brandDay;
  DateTime _now() => (widget.now ?? DateTime.now)();

  /// Sort for categories with filters; reset when the category changes.
  ProductSort? _sort;

  @override
  Widget build(BuildContext context) {
    return ColoredBox(
      color: AppColors.white,
      child: Column(
        children: [
          // Mock: a full cart, to see the 99+ count.
          const HomeHeader(cartCount: HomeMockData.cartCount),
          Expanded(
            child: CustomScrollView(
              slivers: [
                // Gaps kept tight so the first product cards show before scrolling.
                const SliverPadding(padding: EdgeInsets.only(top: 12)),
                const SliverToBoxAdapter(child: HomeStoryList(stories: HomeMockData.stories)),
                const SliverPadding(padding: EdgeInsets.only(top: 12)),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: HomeTrustBadge(items: HomeMockData.trusts, onTap: () => HomeTrustSheet.show(context)),
                  ),
                ),
                // Campaign above the promo carousel: only while switched on and
                // within its dates (HomeMockData.brandDay).
                if (!_campaignEnded && _campaign.isVisible(_now(), override: _campaignOverride)) ...[
                  const SliverPadding(padding: EdgeInsets.only(top: 12)),
                  // Edge to edge: no side margin.
                  SliverToBoxAdapter(
                    child: HomeCampaignBanner(
                      campaign: _campaign,
                      now: widget.now,
                      // Forced on for preview: keep showing after zero.
                      onEnded: _campaignOverride == 'on' ? null : () => setState(() => _campaignEnded = true),
                    ),
                  ),
                ],
                // The banner keeps 4px above and below for its shadow: 8 + 4 = 12.
                const SliverPadding(padding: EdgeInsets.only(top: 8)),
                const SliverToBoxAdapter(child: HomePromoBanner(banners: HomeMockData.banners)),
                const SliverPadding(padding: EdgeInsets.only(top: 12)),
                SliverToBoxAdapter(
                  child: HomeSectionHeader(title: 'ร้านดีแนะนำ', onSeeAll: () {}),
                ),
                const SliverPadding(padding: EdgeInsets.only(top: 8)),
                // The list keeps 8px below for the card shadow: 8 + 8 = 16.
                SliverToBoxAdapter(child: _brandList(HomeMockData.brands)),
                const SliverPadding(padding: EdgeInsets.only(top: 8)),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Text(
                      'หมวดหมู่',
                      style: AppTextStyles.heading(14, lineHeight: 20, color: AppColors.textHeading),
                    ),
                  ),
                ),
                // Pinned: once scrolled to the top, the category bar stays there.
                SliverPersistentHeader(
                  pinned: true,
                  delegate: _PinnedCategoryBar(
                    selectedIndex: _selectedCategory,
                    onSelected: (i) => setState(() {
                      _selectedCategory = i;
                      _sort = null;
                    }),
                    // Every category but สินค้าแนะนำ: the sort chips ride along
                    // under the bar, so they stay on screen while scrolling.
                    sort: _selectedCategory == 0 ? null : (value: _sort, onChanged: (s) => setState(() => _sort = s)),
                  ),
                ),
                // Under the pinned bar (and its sort chips): the category's
                // recommended shops, when it has some.
                if (_selectedCategory == 0)
                  const SliverPadding(padding: EdgeInsets.only(top: 8))
                else ...[
                  const SliverPadding(padding: EdgeInsets.only(top: 4)),
                  if (HomeMockData.categoryBrands[_selectedCategory] case final brands?) ...[
                    const SliverToBoxAdapter(child: HomeSectionHeader(title: 'ร้าน/แบรนด์แนะนำ')),
                    const SliverPadding(padding: EdgeInsets.only(top: 8)),
                    // Logo-only cards; 8px below for the shadow, + 8 = 16 to the products.
                    SliverToBoxAdapter(child: _brandLogoList(brands)),
                    const SliverPadding(padding: EdgeInsets.only(top: 8)),
                  ] else
                    const SliverPadding(padding: EdgeInsets.only(top: 4)),
                ],
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                  sliver: SliverToBoxAdapter(
                    child: _ProductMasonry(categoryIndex: _selectedCategory, sort: _sort),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _brandLogoList(List<HomeBrand> brands) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
      clipBehavior: Clip.none,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        spacing: 12,
        children: [for (final b in brands) HomeBrandLogoCard(brand: b)],
      ),
    );
  }

  Widget _brandList(List<HomeBrand> brands) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      // Room for the card shadow.
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
      clipBehavior: Clip.none,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        spacing: 12,
        children: [for (final b in brands) HomeBrandCard(brand: b)],
      ),
    );
  }
}

class _PinnedCategoryBar extends SliverPersistentHeaderDelegate {
  _PinnedCategoryBar({required this.selectedIndex, required this.onSelected, this.sort});

  final int selectedIndex;
  final ValueChanged<int> onSelected;

  /// When set, the sort chips sit under the bar and stay pinned with it.
  final ({ProductSort? value, ValueChanged<ProductSort?> onChanged})? sort;

  /// 8 above the 40px buttons (same gap as under the title), 8 below.
  static const _barHeight = 56.0;

  /// The chip row: 32px chips in a 44px tap area.
  static const _chipsHeight = 44.0;

  double get _height => _barHeight + (sort == null ? 0 : _chipsHeight);

  @override
  double get minExtent => _height;

  @override
  double get maxExtent => _height;

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    final docked = shrinkOffset > 0 || overlapsContent;

    // Must paint the full extent, or the sliver geometry is invalid. The
    // height is set outside the AnimatedContainer: only the shadow animates,
    // so adding the chip row never leaves it briefly too short.
    return SizedBox(
      height: _height,
      child: AnimatedContainer(
        alignment: Alignment.topLeft,
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.only(top: 8),
        decoration: BoxDecoration(color: AppColors.white, boxShadow: docked ? AppShadows.bottomNav : const []),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(
              height: _barHeight - 8,
              child: HomeCategoryBar(
                categories: HomeMockData.categories,
                selectedIndex: selectedIndex,
                onSelected: onSelected,
              ),
            ),
            if (sort case final sort?)
              SizedBox(
                height: _chipsHeight,
                child: HomeSortChips(selected: sort.value, onChanged: sort.onChanged),
              ),
          ],
        ),
      ),
    );
  }

  @override
  bool shouldRebuild(_PinnedCategoryBar oldDelegate) =>
      oldDelegate.selectedIndex != selectedIndex ||
      oldDelegate.onSelected != onSelected ||
      oldDelegate.sort?.value != sort?.value ||
      (oldDelegate.sort == null) != (sort == null);
}

/// Product grid. Categories with their own products (อาหารและเครื่องดื่ม,
/// สุขภาพและความงาม, แฟชั่น, บ้านและสวน, แม่และเด็ก, สินค้าสัตว์เลี้ยง,
/// เครื่องใช้ไฟฟ้าและไอที) show those; the rest show the สินค้าแนะนำ mix.
class _ProductMasonry extends StatelessWidget {
  const _ProductMasonry({required this.categoryIndex, this.sort});

  final int categoryIndex;

  /// Null keeps the curated order.
  final ProductSort? sort;

  @override
  Widget build(BuildContext context) {
    Widget column(List<HomeProduct> products) => Expanded(
      child: Column(
        spacing: 8,
        children: [
          for (final p in products)
            HomeProductCard(
              product: p,
              onTap: () => Navigator.of(context).push(ProductDetailScreen.route(ProductDetailMock.forProduct(p))),
            ),
        ],
      ),
    );

    var (left, right) =
        HomeMockData.categoryColumns[categoryIndex] ?? (HomeMockData.leftColumn, HomeMockData.rightColumn);
    if (sort case final sort?) {
      final all = [...left, ...right]
        ..sort(switch (sort) {
          ProductSort.bestSelling => (a, b) => b.soldCount.compareTo(a.soldCount),
          ProductSort.priceHighToLow => (a, b) => b.price.compareTo(a.price),
          ProductSort.priceLowToHigh => (a, b) => a.price.compareTo(b.price),
        });
      // Deal the sorted list across the two columns, so order reads
      // left, right, left, right from the top.
      left = [for (var i = 0; i < all.length; i += 2) all[i]];
      right = [for (var i = 1; i < all.length; i += 2) all[i]];
    }
    return Row(crossAxisAlignment: CrossAxisAlignment.start, spacing: 8, children: [column(left), column(right)]);
  }
}
