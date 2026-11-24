# Stories: React (Storybook CSF3), Flutter (Widgetbook), HTML

One central Storybook for the web (React) and the app (Flutter). The config (`.thaimart/storybook.json`) decides which
targets are on and where the files go; when the central Storybook embeds Flutter in another way, follow the config and
the repo's README, not this page.

## Rules for every target

- **One story per screen state.** At least: default, plus each state the screen really has (empty, loading, error,
  filled, selected, disabled, success, a long Thai name that wraps). The audit lists the screens it found.
- **Args per variant and state**, named after the registry's props (`references/registry.md`: the Figma property names;
  React and Flutter prop names come with the team's packages, until then use the provisional names and mark
  `// TODO(ds): pending package`).
- **Real data** from `content/final-bible.json` (products, shops, prices, certs, people) or the feature's own fixtures.
  Never invent a shop, a price or a badge; a badge kind follows the data (`products.*.cert`, `shops.*.official`).
- **Titles:** `Features/<Feature>/<Screen>`; a new component waiting for the design system team:
  `Proposals/<Component>` (it links its request in `new-component-requests.md`).
- **Viewport:** phone 390 x 844 first; add Desktop 1440 only when the feature has it.
- Thai copy as in the prototype; no em dash.

## React: Storybook CSF3 (`*.stories.tsx`)

File: `<config targets.react.storyDir>/<Screen>.stories.tsx` (default `src/stories/features/<feature>/`).

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { FavoritesScreen } from './FavoritesScreen';
// TODO(ds): pending package. Until the team's package exists the screen uses the prototype kit or the provisional names.

const meta = {
  title: 'Features/Favorites/FavoritesScreen',
  component: FavoritesScreen,
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'iphone390' } },
  args: { items: FIXTURE.items, loading: false },
} satisfies Meta<typeof FavoritesScreen>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { items: [] } };
export const Loading: Story = { args: { loading: true } };
export const LongThaiName: Story = { args: { items: [FIXTURE.longName] } };
```

A component story (design system component or a proposal) lists every variant and state as args, with `argTypes`
`control: 'select'` over the registry's values:

```tsx
const meta = {
  title: 'Proposals/CouponCard',
  component: CouponCard,
  argTypes: { state: { control: 'select', options: ['default', 'saved', 'used', 'expired'] } },
} satisfies Meta<typeof CouponCard>;
export const Default: Story = { args: { state: 'default' } };
export const Saved: Story = { args: { state: 'saved' } };
```

## Flutter: Widgetbook use-cases

File: `<config targets.flutter.useCaseDir>/<screen>_use_case.dart` (default `lib/widgetbook/features/<feature>/`). With
the annotation package:

```dart
import 'package:flutter/widgets.dart';
import 'package:widgetbook_annotation/widgetbook_annotation.dart' as widgetbook;
// TODO(ds): pending package. Import the team's Flutter design system package here when it exists.

@widgetbook.UseCase(name: 'Default', type: FavoritesScreen, path: '[Features]/Favorites')
Widget favoritesDefault(BuildContext context) => FavoritesScreen(items: Fixture.items);

@widgetbook.UseCase(name: 'Empty', type: FavoritesScreen, path: '[Features]/Favorites')
Widget favoritesEmpty(BuildContext context) => const FavoritesScreen(items: []);
```

Knobs for variants and states: `context.knobs.list(label: 'state', options: [...])`, values from the registry's props.
Wrap screens in the app theme (the team's ThemeExtension once it exists); never hard-code colours.

## HTML prototypes (the team link's kit, or a single file from the Claude or ChatGPT apps)

1. Map and rewrite the parts first (workflow step 3), so the HTML uses the kit classes.
2. Convert to the target in the config (`targets.html.convertTo`: "react" or "flutter"): one component per registry
   component, one screen component per page, the states as props.
3. Keep an HTML story only when `targets.html.allowHtmlStories` is true (Storybook's HTML renderer): one story per state,
   the markup as the story's render, the kit CSS loaded once in the Storybook preview.

## Check before the MR

- every screen state has a story; every proposal has a story under `Proposals/`
- stories build: `npm run build-storybook` (React) or `flutter test` + the Widgetbook build (Flutter), when the repo has them
- screenshots of the main states in `storybook-handoff/<feature>/screens/` (390 wide)
