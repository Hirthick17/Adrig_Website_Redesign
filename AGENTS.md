# ADRIG Website — Brand, Design, Content, Asset, Motion, and Layout Rules

## 0. Purpose of this file

This file is the permanent visual and content contract for the ADRIG website. Every agent, designer, and developer must follow it before creating or modifying a page, component, asset, animation, or piece of copy.

The goal is not merely to make each section attractive. The goal is to make the entire site feel as though one senior design team created it from one system.

If an instruction in a task conflicts with this file, use this priority order:

1. The user's latest explicit instruction.
2. Existing approved ADRIG brand assets and logo rules.
3. This file.
4. Existing implementation patterns.
5. The agent's personal preference.

Never invent a new visual language because a section feels empty. Solve emptiness using hierarchy, scale, composition, or a brand-consistent visual.

---

## 1. Canonical direction

### 1.1 The visual source of truth

The approved hero scene is the canonical ADRIG direction:

- white and very light cool-grey environment;
- deep navy navigation and primary actions;
- precise electric-blue accents;
- black/navy neo-grotesk typography;
- technical architectural line work;
- soft blueprint grid and restrained depth;
- large editorial headline paired with a dominant engineered visual;
- minimal interface chrome;
- calm, deliberate motion.

The later screens with purple, pink, orange, cyan, or unrelated abstract gradient artwork are **not** the visual source of truth. Their information architecture may be reused, but their color treatment and asset language must be redesigned to match the hero.

### 1.2 Brand impression

Every screen must communicate these five traits:

1. **Engineered** — geometry, structure, accuracy, repeatability.
2. **Intelligent** — clear relationships and purposeful motion, not generic AI imagery.
3. **Enterprise-ready** — calm, credible, secure, and operational.
4. **Human-readable** — plain language, strong hierarchy, comfortable measure.
5. **Progressive** — modern interaction without visual noise or novelty for its own sake.

The intended feeling is “precision engineering for intelligent business systems,” not “colorful AI startup,” “cyberpunk lab,” or “template marketplace.”

### 1.3 Non-negotiable visual rule

At least 90% of the visible page area must come from the core ADRIG palette: white, cool grey, navy, ink, and ADRIG blue. A supporting tint is acceptable only when it is derived from ADRIG blue.

Do not introduce purple, pink, orange, yellow, green, red, rainbow, aurora, or multi-color gradients as decorative branding. Semantic warning/success colors may appear only inside functional UI where meaning requires them; they must not define a marketing section.

---

## 2. Mandatory agent workflow

Before editing code, the agent must perform this sequence.

### 2.1 Audit before creation

1. Inspect the existing design tokens, global CSS, font imports, layout primitives, shared navigation, buttons, cards, and motion utilities.
2. Identify what can be reused without changing the brand language.
3. State the section's single communication goal in one sentence.
4. Select one approved composition from Section 7.
5. Decide whether the section needs a visual. A visual must explain a relationship, transformation, workflow, scale, or result; it must not merely fill space.
6. Check that the proposed work uses only approved tokens.
7. Implement using reusable components and responsive constraints.
8. Render and inspect at all required viewports.
9. Run the consistency checklist in Section 16 before calling the task complete.

### 2.2 Preserve before replacing

- Do not rewrite working shared components unless the task requires it.
- Do not replace the logo, hero scene, nav language, global font, or palette without explicit approval.
- Do not add a new dependency when CSS, SVG, the existing motion library, or the current Three.js setup can achieve the same result.
- Do not create page-local versions of a token, button, heading, container, card, or reveal animation.
- When a component is inconsistent, bring it into the system; do not create another competing component.

### 2.3 Explain material exceptions

If a task genuinely requires breaking a rule in this file, the agent must state:

- which rule is being broken;
- why the page goal cannot be met within the rule;
- the smallest possible exception;
- how consistency will be preserved elsewhere.

---

## 3. Design tokens

All colors, spacing, radii, shadows, typography, and motion must come from shared tokens. These values are the default source of truth. If the repository already contains a verified ADRIG brand hex value, keep the verified value and map it to the equivalent token name.

```css
:root {
  /* Core brand */
  --adrig-navy-950: #071a33;
  --adrig-navy-900: #0b213f;
  --adrig-ink-950: #07111f;
  --adrig-ink-800: #1b293d;
  --adrig-slate-600: #52627a;
  --adrig-slate-500: #6c7a90;
  --adrig-blue-700: #0d4fd7;
  --adrig-blue-600: #1463ff;
  --adrig-blue-500: #347dff;
  --adrig-blue-300: #a9c8ff;
  --adrig-blue-200: #cfe0ff;
  --adrig-blue-100: #eaf2ff;
  --adrig-blue-050: #f3f7ff;

  /* Surfaces */
  --adrig-white: #ffffff;
  --adrig-canvas: #f7f9fc;
  --adrig-surface: #fbfcfe;
  --adrig-line: #d9e2ee;
  --adrig-grid: #e8eef6;

  /* Typography */
  --font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;
  --tracking-display: -0.045em;
  --tracking-heading: -0.032em;
  --tracking-body: -0.012em;
  --tracking-label: 0.14em;

  /* Shape */
  --radius-control: 999px;
  --radius-card-sm: 16px;
  --radius-card-md: 24px;
  --radius-card-lg: 32px;

  /* Layout */
  --page-gutter: clamp(20px, 4vw, 64px);
  --content-max: 1280px;
  --reading-max: 680px;
  --section-block: clamp(96px, 10vw, 160px);
  --grid-gap: clamp(16px, 2vw, 32px);

  /* Elevation */
  --shadow-nav: 0 18px 45px rgba(7, 26, 51, 0.16);
  --shadow-card: 0 18px 50px rgba(7, 26, 51, 0.07);
  --shadow-card-hover: 0 24px 70px rgba(7, 26, 51, 0.11);

  /* Motion */
  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --duration-fast: 160ms;
  --duration-ui: 280ms;
  --duration-reveal: 560ms;
  --duration-scene: 900ms;
}
```

### 3.1 Color usage ratio

Use this approximate ratio on standard light sections:

- 65–80% white or canvas;
- 10–20% cool-grey structure, borders, grid, and supporting surfaces;
- 8–15% navy/ink typography and navigation;
- 2–7% ADRIG blue for emphasis, paths, active states, and meaningful glow.

Blue is an attention resource. Do not use it on every heading, icon, border, and link simultaneously.

### 3.2 Approved gradients

Only subtle monochromatic or blue-derived gradients are allowed:

```css
background: linear-gradient(135deg, #f8fbff 0%, #eaf2ff 100%);
background: radial-gradient(circle at 50% 40%, rgba(52,125,255,.12), transparent 62%);
```

Do not use gradients with unrelated hues. Do not use a gradient merely to make a card “look premium.”

### 3.3 Borders and shadows

- Default border: `1px solid var(--adrig-line)`.
- Technical hairline: one physical pixel whenever possible.
- Card shadows must be soft and cool, never black and heavy.
- Use either a visible border or a shadow as the primary separation method. Avoid strong use of both.
- Avoid glassmorphism unless it is required over a moving hero scene. If used, keep blur below `18px`, maintain text contrast, and retain a visible edge.

---

## 4. Typography system

### 4.1 Font family

Use **Inter** as the only interface and marketing type family unless an approved ADRIG brand font is already installed. Do not mix Inter with Poppins, Montserrat, Space Grotesk, serif display faces, or handwritten fonts.

Load only the weights actually used: 400, 500, 600, and 700. Use 400/500 for most text; reserve 700 for short emphasis. The hero's contrast should come from weight variation within the same family, not from a second font.

### 4.2 Fluid type scale

```css
.type-display {
  font-size: clamp(3.5rem, 5.4vw, 5.75rem);
  line-height: 0.96;
  letter-spacing: var(--tracking-display);
  font-weight: 400;
}

.type-h1 {
  font-size: clamp(3rem, 4.5vw, 4.75rem);
  line-height: 1.00;
  letter-spacing: var(--tracking-display);
  font-weight: 500;
}

.type-h2 {
  font-size: clamp(2.4rem, 3.5vw, 4rem);
  line-height: 1.04;
  letter-spacing: var(--tracking-heading);
  font-weight: 500;
}

.type-h3 {
  font-size: clamp(1.5rem, 2vw, 2.25rem);
  line-height: 1.12;
  letter-spacing: -0.025em;
  font-weight: 600;
}

.type-body-lg {
  font-size: clamp(1.0625rem, 1.3vw, 1.25rem);
  line-height: 1.55;
  letter-spacing: var(--tracking-body);
  font-weight: 400;
}

.type-body {
  font-size: 1rem;
  line-height: 1.6;
  letter-spacing: -0.008em;
  font-weight: 400;
}

.type-label {
  font-size: 0.75rem;
  line-height: 1.2;
  letter-spacing: var(--tracking-label);
  font-weight: 700;
  text-transform: uppercase;
}
```

### 4.3 Typographic behavior

- Use sentence case for headlines, titles, body copy, navigation, and buttons.
- Uppercase is reserved for short eyebrow labels of no more than four words.
- A display headline should occupy two to four lines, not one tiny line inside a wide empty section.
- Keep display text between 8 and 14 words where possible.
- Keep paragraph measure between 42 and 68 characters per line.
- Do not center long paragraphs. Centered copy is limited to one headline and one supporting sentence.
- Do not use body text below 16px on normal desktop/mobile marketing surfaces.
- Do not make body text light grey for aesthetics. It must remain legible.
- Use a maximum of three font sizes in one visible section, excluding micro-labels.
- Use a maximum of three weights in one visible section.

### 4.4 Hero emphasis pattern

The hero may mix regular and semibold words within one headline, as in:

> Engineering **intelligent systems** for businesses that want to evolve.

Use emphasis on the product or value idea, not on filler words. Limit emphasis to one contiguous phrase.

---

## 5. Content design and brand voice

### 5.1 Voice

ADRIG copy must be:

- precise rather than inflated;
- confident rather than loud;
- technically credible rather than jargon-heavy;
- outcome-led rather than feature-dumping;
- understandable to a business decision-maker without losing engineering depth.

Write as an experienced engineering partner. Do not write like an ad generator.

### 5.2 Message architecture for every section

Each section must contain, in order:

1. **Context label** — what domain the section belongs to.
2. **Core claim** — the one idea the user should remember.
3. **Proof/explanation** — how ADRIG creates that result.
4. **Evidence or mechanism** — visual, metric, process, capability, or case.
5. **Action** — only when a meaningful next step exists.

If two unrelated messages compete, split them into separate sections or remove the weaker one.

### 5.3 Copy length limits

| Element | Preferred limit |
| --- | --- |
| Eyebrow | 2–4 words |
| Display headline | 8–14 words |
| Section headline | 5–11 words |
| Supporting paragraph | 18–38 words |
| Card title | 3–7 words |
| Card description | 14–30 words |
| Primary CTA | 2–4 words |
| Secondary CTA | 2–5 words |
| Navigation label | 1–3 words |

These are design constraints, not arbitrary editorial rules. If copy exceeds the limit, rewrite it before shrinking the font.

### 5.4 Approved content patterns

Prefer:

- “Automate decisions across complex operations.”
- “Systems built around your data, constraints, and workflows.”
- “Move from manual handoffs to observable, reliable execution.”
- “Private by design, deployable without platform lock-in.”

Avoid:

- “Revolutionize your business with cutting-edge, next-generation AI.”
- “Unlock limitless possibilities.”
- “Seamless, innovative, transformative solutions.”
- multiple unsupported superlatives in one sentence;
- claims such as “zero errors,” “100% secure,” or “guaranteed ROI” without evidence.

### 5.5 CTA rules

- One primary CTA per section at most.
- Add a secondary CTA only when it represents a genuinely different path.
- Use verb-led labels: “Explore capabilities,” “View our work,” “Talk to an engineer.”
- Avoid vague labels: “Learn more,” “Discover,” “Get started” without context.
- The global sales CTA must use one label consistently across the site. Default: **Let’s talk**.

### 5.6 No content duplication

Do not repeat the same claim in the hero, “Why ADRIG,” and capabilities sections. Use this sequence:

- Hero: what ADRIG enables.
- Why ADRIG: why the approach is credible/different.
- Capabilities: what systems ADRIG builds.
- Work/proof: where the approach has produced outcomes.
- CTA: what the visitor should do next.

---

## 6. Global layout system

### 6.1 Container

All primary content aligns to one shared container:

```css
.container {
  width: min(100% - (2 * var(--page-gutter)), var(--content-max));
  margin-inline: auto;
}
```

Do not create a different max-width per section. Full-bleed visuals may escape the container, but their text and primary alignment must still reference it.

### 6.2 Grid

- Desktop: 12 columns.
- Tablet: 8 columns.
- Mobile: 4 columns.
- Column gap: `var(--grid-gap)`.
- Default split narrative: text 4 columns, visual 8 columns.
- Text-heavy split: text 5 columns, proof/visual 7 columns.
- Never use a 50/50 split automatically. Choose the split based on communication priority.

For a 30/70 composition, use:

```css
grid-template-columns: minmax(300px, 4fr) minmax(0, 8fr);
```

### 6.3 Screen occupancy

- Hero: `min-height: 100svh`.
- Major narrative sections: target `min-height: clamp(720px, 88svh, 980px)`.
- A section's content should occupy roughly 75–90% of its useful viewport area on desktop.
- Blank space must frame an intentional focal point. It must not exist because the cards are too small or the container starts too low.
- Do not leave more than `clamp(96px, 10vw, 160px)` between the visual end of one section and the next section's first meaningful element.
- Do not force every supporting section to `100vh`; this creates dead air.

### 6.4 Vertical rhythm

Use only this spacing scale for layout:

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160px`

Default relationships:

- eyebrow to heading: 16px;
- heading to supporting copy: 24px;
- copy to CTA: 32px;
- section introduction to main visual/cards: 48–64px;
- card internal padding: 24px mobile, 32–40px desktop;
- major section block padding: 96–160px fluid.

No arbitrary values such as 37px, 73px, or 118px unless required by measured asset geometry.

### 6.5 Alignment

- Use one dominant alignment per section.
- Left-aligned layouts are the default.
- Center alignment is allowed for short manifesto statements and compact section introductions, not for dense capability content.
- Cards in one group must align by top edge, title baseline, content start, and CTA baseline.
- If card content length differs, use grid rows or flex structure; do not allow CTA links to float at random heights.

---

## 7. Approved section compositions

Choose one composition. Do not invent a new one until these options are proven inadequate.

### 7.1 Hero: editorial text + engineered world

- Full viewport.
- Floating pill navigation above the scene.
- Text begins inside the main container and occupies approximately 34–40% of the width.
- Engineered city/system visual occupies 60–70% and may extend past the right/bottom viewport.
- Headline is the primary object; visual provides the proof/metaphor.
- Supporting copy stays below 38 words.
- Maximum two CTAs.
- Keep the lower edge clean; use one small scroll cue only when it communicates real scroll behavior.

### 7.2 Split narrative: 4/8

- Left: eyebrow, heading, short explanation, optional CTA.
- Right: one dominant illustration, interactive system, or proof module.
- The visual must occupy at least 60% of the section's visible mass.
- Recommended for services, automation, LLM development, data analysis, and software engineering.

### 7.3 Sticky explanation

- Section height may be 220–320vh.
- One side remains sticky at `top: 16–20vh`.
- The opposite side reveals three to five steps.
- Only one step is visually active at a time.
- Scroll progress must map deterministically to state; avoid brittle timed sequences.
- On mobile, remove pinning and render a linear stack.

### 7.4 Asymmetric proof grid

Use a 7/5 or 8/4 bento grid with two to four substantial modules.

- Main module minimum height: 420px desktop.
- Supporting module minimum height: 260px desktop.
- The main proof receives the strongest visual.
- Use one consistent asset language across every module.
- Four equal small cards in one row are prohibited for primary capabilities; they look like a dashboard index and underuse the screen.

### 7.5 Capability index

For four or more capabilities, use one of these:

- a 2×2 grid of generous modules;
- a left-side selectable list with a large changing visual on the right;
- a vertical stack with alternating 4/8 and 8/4 compositions;
- a sticky visual with scroll-driven capability states.

Do not use tiny identical cards surrounded by large unused space.

### 7.6 Full-bleed conviction section

- Navy background.
- White heading and muted blue-white body text.
- One electric-blue action or technical diagram.
- No unrelated photography or gradients.
- Use sparingly: no more than one consecutive full navy section without returning to a light canvas.

---

## 8. Navigation, buttons, cards, and recurring components

### 8.1 Navigation

- Use one shared navigation component across all pages.
- Desktop nav is a centered floating pill.
- Height: 60–64px.
- Background: `var(--adrig-navy-950)`.
- Top offset: 16–24px.
- Horizontal padding: 16px left/right plus content spacing.
- Logo has clear space equal to at least half its mark height.
- Navigation labels use 14–15px, weight 500.
- Primary nav CTA is a white pill with navy text.
- Shadow uses `--shadow-nav`.
- Sticky behavior must not cause layout jump.
- Mobile uses a compact mark/wordmark, CTA if space permits, and one menu control. Do not compress desktop links into unreadable spacing.

### 8.2 Buttons

Primary:

- navy background;
- white text;
- 44–48px height;
- pill radius;
- 16–22px horizontal padding;
- no icon unless it communicates direction or action.

Secondary:

- white or transparent surface;
- navy text;
- `1px` cool-grey border;
- same height and radius as primary.

Hover may use a 1–2px translate, slight darkening, and controlled shadow. Never use bounce, neon glow, or large scale.

### 8.3 Cards

- Cards are structured containers, not decoration.
- Default background: white.
- Default border: `var(--adrig-line)`.
- Default radius: 24px.
- Each card uses the same internal grid: visual, eyebrow, title, body, proof/CTA.
- Do not place a random colorful artwork at the top of a card.
- Do not mix 16px, 24px, and 40px radii in one group.
- Do not use more than two card styles on a page.
- Hover only when the card is interactive.

### 8.4 Icons

- Use one icon family and one stroke language.
- Default stroke: 1.5px at 24px.
- Use navy or ADRIG blue.
- Icons must explain a concept or action; do not add one to every label.
- Avoid emoji, filled 3D icons, multicolor icons, and mixed icon packs.

### 8.5 Pills and eyebrows

- Use sparingly.
- Small pill labels may use blue-050 background, blue-200 border, and blue-700 text.
- Do not place a pill above every card and section heading.
- Do not use pills as substitutes for clear hierarchy.

---

## 9. Visual asset system

### 9.1 One visual language

All website illustrations and technical assets must feel derived from the hero's engineered city. Approved visual ingredients:

- blueprint grids;
- isometric or low-perspective architectural forms;
- white/clay materials with cool-grey edges;
- electric-blue routes, nodes, signals, highlights, and glows;
- technical labels and measurement marks;
- restrained particles used to show data or work moving through a system;
- clean Paytm-style human illustrations only when a human action is essential, recolored into the ADRIG palette and simplified to match the line system.

Unapproved ingredients:

- aurora/macOS-style abstract wallpapers;
- random purple/pink/orange blobs;
- generic glowing brains;
- humanoid robots used as universal filler;
- stock photos without a real proof/story purpose;
- unrelated 3D styles from different asset packs;
- glossy multicolor SaaS icons;
- decorative equations or code that do not relate to the message.

### 9.2 Asset role test

Before adding an asset, complete this sentence:

> This visual helps the visitor understand ______ by showing ______.

If the answer is merely “it makes the section look better,” redesign or remove it.

### 9.3 2D illustration specification

- Canvas: transparent or white/canvas.
- Stroke at 1440px reference width: 1–1.5px.
- Primary stroke: navy at 45–70% opacity.
- Secondary stroke: blue-300 at 45–75% opacity.
- Active stroke: blue-600 at 90–100% opacity.
- Fills: white, surface, blue-050, blue-100.
- Maximum large-area saturation: 15% of asset area.
- Corner radii: align with 16/24/32px system.
- Avoid noisy textures. If a halftone/grid is used, keep opacity between 3% and 10%.

### 9.4 3D/Three.js visual specification

- Use white-to-cool-grey materials, matte finish, roughness `0.72–0.92`, metalness `0–0.08`.
- Use navy/grey edge lines and blue only for meaningful active paths.
- Perspective camera field of view: `28–38deg`; avoid wide-angle distortion.
- Keep verticals stable and architectural.
- Use soft hemisphere/ambient light plus one broad directional key. Avoid hard theatrical shadows.
- Ground plane must use a subtle grid and visible structural zones; it must not look like an empty infinite plane.
- Fog may be used to soften distant geometry, but never to hide a composition problem.
- Labels must remain screen-space legible and should not collide with geometry.
- Cap device pixel ratio at a performance-safe value, normally `Math.min(devicePixelRatio, 2)`.
- Provide a static poster/fallback for reduced motion, low-power devices, and WebGL failure.

### 9.5 Hero city visual contract

The hero world must preserve the following hierarchy:

1. Central ADRIG tower is the highest-contrast and tallest object.
2. Industry districts surround it with lower, distinct silhouettes.
3. Connection paths flow from industries toward ADRIG, representing unresolved operational pain becoming engineered systems.
4. One path—healthcare by default—may receive primary narrative focus while other paths remain context.
5. On arrival, the tower/logo changes from muted to active blue glow.
6. Ground grid, district labels, and moving signals support the narrative without competing with the headline.

For a connection curve between a district point `P0` and tower point `P3`, use a cubic Bézier:

`B(t) = (1−t)^3 P0 + 3(1−t)^2t P1 + 3(1−t)t^2 P2 + t^3 P3`, where `0 <= t <= 1`.

Let horizontal distance be `D = length(P3.xz - P0.xz)` and arc height be:

`H = clamp(5, 0.22D + 2, 18)` in scene units.

Use control points approximately:

- `P1 = P0 + 0.33(P3 − P0) + (0, H, 0)`
- `P2 = P0 + 0.72(P3 − P0) + (0, 0.72H, 0)`

The path must visually converge toward the tower. Do not use unrelated waves spanning the screen.

### 9.6 Logo use

- Use only official logo assets.
- Never redraw, stretch, recolor arbitrarily, add bevel, or place the logo on a noisy background.
- Maintain clear space around the mark equal to at least `0.5×` the mark height.
- On light surfaces: navy wordmark/approved mark.
- On navy surfaces: white wordmark/approved inverse mark.
- In the hero tower, the mark may glow ADRIG blue after path convergence; the base state must remain restrained.

### 9.7 Asset file preparation

Preferred formats:

- SVG for logos, icons, line illustrations, diagrams, and lightweight patterns.
- AVIF first and WebP fallback for raster imagery.
- PNG only when transparency or source fidelity requires it.
- GLB/GLTF for web 3D, compressed where supported.
- MP4/WebM only for motion that cannot be expressed efficiently in code.

Requirements:

- Remove unused SVG metadata and invisible groups.
- Convert text inside reusable SVG assets to paths only when exact rendering is required; otherwise keep accessible text outside the SVG.
- Provide `width`, `height`, and `viewBox` to prevent layout shift.
- Raster export targets: 1× and 2× at the rendered aspect ratio.
- Avoid raster files over 400KB for ordinary section art; justify larger hero/poster assets.
- Use deterministic names: `section-purpose-variant.ext`, e.g. `automation-workflow-blueprint.svg`.
- Keep source assets separate from optimized production assets.
- Every meaningful image needs concise alt text; decorative images use empty alt text.

---

## 10. Motion and interaction system

### 10.1 Motion purpose

Animation may do one of four jobs:

1. reveal hierarchy;
2. explain sequence or flow;
3. connect cause and effect;
4. provide interaction feedback.

If motion does none of these, remove it.

### 10.2 Standard motion tokens

- Micro-feedback: 120–180ms.
- Buttons/controls: 220–300ms.
- Content reveal: 480–620ms.
- Large scene transition: 750–1000ms.
- Stagger between related items: 60–100ms.
- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Entering content: `cubic-bezier(0.16, 1, 0.3, 1)`.

Do not create a new easing curve per component.

### 10.3 Entry reveal

Default reveal:

```css
from {
  opacity: 0;
  transform: translate3d(0, 18px, 0);
}
to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
```

- Use once when content enters the viewport.
- Do not animate every word independently.
- Do not combine blur, rotation, scale, and translation on a simple text reveal.
- Do not replay reveals every time the user scrolls by.

### 10.4 Technical line motion

- Use `stroke-dashoffset`, a traveling particle, or shader progress to communicate direction.
- Keep base line visible at 18–30% opacity.
- Active segment uses blue-600 at 75–100% opacity.
- Travel time should be proportional to path length: `duration = clamp(1.2s, pathLength / 180 px/s, 3.6s)`.
- Stagger unrelated district paths by 180–360ms.
- Use one primary moving signal per line; avoid streams of decorative particles.
- Arrival at the central system may trigger a glow pulse of 700–1000ms, then settle to a steady low-intensity state.

### 10.5 Hover behavior

- Interactive card: translate `0 to -4px`, border shifts toward blue-300, shadow moves to `--shadow-card-hover`.
- Button: translate up by no more than 2px or darken background by 4–6%.
- Link arrow: translate X by 3–5px.
- Do not scale large cards above `1.01`.
- Non-interactive objects must not have hover behavior.

### 10.6 Scroll-linked sections

- Use scroll to progress a story, not to delay access to content.
- Pin only the dominant visual or narrative frame.
- Map scroll progress to defined states; clamp all values.
- Keep transformations reversible and stable when scrolling upward.
- Avoid hijacking native scroll.
- Test touchpad, mouse wheel, keyboard, and mobile behavior.
- Never place two long sticky sections back-to-back.

### 10.7 Reduced motion

All motion must support `prefers-reduced-motion: reduce`:

- disable camera travel, parallax, looping particles, and scroll scrubbing;
- display final content states immediately;
- retain simple opacity transitions only when necessary;
- provide a static hero poster or still scene;
- preserve all information without animation.

---

## 11. Background and transition rules

- Default page background: canvas or white.
- Alternate between white and canvas only when it clarifies section boundaries.
- Use a faint grid in selected technical sections, not across every page.
- Grid size should remain consistent, typically 48–64px desktop and 32–40px mobile.
- Grid opacity: 3–7%.
- Large pale-blue structural shapes may enter from viewport edges, but they must align to the grid/geometry and not resemble decorative blobs.
- Section transitions should be clean cuts, shared grid continuation, or a subtle surface shift.
- Do not place a hard empty grey band between two sections.
- Do not let a previous section's decorative asset overlap the next section without a deliberate transition relationship.

---

## 12. Responsive behavior

### 12.1 Required verification widths

At minimum test:

- 1440×900 desktop;
- 1280×800 laptop;
- 1024×768 tablet landscape;
- 768×1024 tablet portrait;
- 390×844 mobile;
- 360×800 small mobile.

Also inspect ultra-wide behavior around 1920px. Content must remain anchored to the max-width container while controlled hero visuals may extend outward.

### 12.2 Breakpoint behavior

- Desktop 12-column layouts become 8 columns on tablet and 4 columns on mobile.
- 4/8 splits become stacked by 900px unless the visual remains legible.
- Mobile order is normally: eyebrow, heading, body, CTA, visual.
- Visuals must not become tiny thumbnails. Give them full container width and an explicit aspect ratio.
- Remove nonessential labels and particles before reducing important text.
- Touch targets must be at least 44×44px.
- Avoid horizontal carousels for core content unless swipe behavior is obvious and keyboard-accessible.
- Avoid fixed pixel heights on text-containing cards.
- Use `svh`/`dvh` carefully for mobile browser chrome.

### 12.3 Hero responsive rules

- Desktop: text overlays or sits beside the left edge of the engineered world.
- Tablet: preserve headline priority and crop the scene toward the central tower.
- Mobile: stack text above a simplified/static scene; do not force the desktop camera into a narrow crop.
- The central ADRIG tower and one active connection must remain visible at all sizes.
- Remove secondary districts before shrinking the central narrative.

---

## 13. Accessibility and usability

- Meet WCAG 2.2 AA contrast for all text and controls.
- Body text contrast must be at least 4.5:1.
- Large text contrast must be at least 3:1.
- Do not communicate state or category through color alone.
- Use semantic headings in correct order; visual size does not determine HTML level.
- Every action must be keyboard reachable with a visible focus state.
- Focus ring default: `2px solid var(--adrig-blue-600)` plus 2px white offset where needed.
- Buttons perform actions; links navigate.
- Do not hide essential copy inside hover-only interactions.
- Pause controls are required for meaningful autoplay media.
- Canvas/Three.js scenes must have an accessible text equivalent.
- Preserve readable content and navigation when JavaScript or WebGL fails.

---

## 14. Performance rules

- Keep the first meaningful content in HTML; do not wait for the 3D scene.
- Prevent font/layout shift using local optimized font loading and explicit dimensions.
- Lazy-load below-the-fold heavy visuals.
- Dynamically import Three.js and large motion code only where used.
- Cap particle counts and geometry complexity based on device capability.
- Prefer instancing for repeated 3D blocks.
- Dispose geometries, materials, textures, observers, and animation frames on unmount.
- Pause canvas rendering when the scene is off-screen or the tab is hidden.
- Avoid multiple simultaneous canvases.
- Use transforms and opacity for most animation.
- Do not animate layout properties continuously.
- Target smooth 60fps on normal hardware and a stable degraded experience on lower-power devices.
- A beautiful section that delays interaction or causes scroll jank is not approved.

---

## 15. Code and component governance

### 15.1 Shared primitives

The project should have one implementation for each of these concerns:

- `Container`
- `Section`
- `SectionIntro`
- `Eyebrow`
- `Button` / button variants
- `Card` / approved card variants
- `Navbar`
- `Footer`
- `Reveal`
- `BlueprintGrid`
- `TechnicalLine`
- typography utility classes/tokens

Do not create `BlueButton2`, `NewCard`, `ModernSection`, `HeroButtonFinal`, or similar duplicates.

### 15.2 Styling rules

- Use tokens through CSS variables or the project's theme configuration.
- Do not hard-code brand hex values inside page components.
- Do not use arbitrary Tailwind values when an approved token exists.
- Avoid inline styles except for calculated animation/geometry values.
- Avoid one-off `z-index` escalation. Define a layer scale for base, visual, content, sticky, nav, modal, and toast.
- Keep content data separate from rendering logic where sections repeat.
- Make responsive behavior explicit; do not rely on accidental wrapping.

### 15.3 New component approval test

A new component is justified only when at least one is true:

- it appears in two or more places;
- it owns a distinct interaction or accessibility behavior;
- it isolates a performance-heavy subsystem;
- it represents a stable brand primitive.

Do not abstract a one-time wrapper merely to make the file tree look architectural.

### 15.4 Asset and motion reuse

- Reuse grid, line, node, glow, label, and reveal primitives.
- Variants may change content and scale, not the underlying visual grammar.
- One page may have one signature motion moment. Supporting animations must remain quieter.

---

## 16. Consistency review checklist

The agent must answer every item before completion.

### Brand

- [ ] Does the screen look derived from the white/navy/blue engineered hero?
- [ ] Are all decorative hues derived from ADRIG blue?
- [ ] Is the official logo unchanged and given adequate clear space?
- [ ] Does the page feel enterprise-engineered rather than template-driven?

### Typography

- [ ] Is one font family used throughout?
- [ ] Does the headline use the approved fluid scale and tight tracking?
- [ ] Is body text at least 16px with readable contrast and measure?
- [ ] Are sentence case, weights, and line heights consistent?
- [ ] Was long copy rewritten instead of shrunk?

### Content

- [ ] Can the section's core idea be stated in one sentence?
- [ ] Does the visual explain that idea?
- [ ] Is copy outcome-led, specific, and free of unsupported hype?
- [ ] Is there no duplicated claim from the preceding section?
- [ ] Are CTA labels specific and consistent?

### Layout

- [ ] Does content align to the shared container and grid?
- [ ] Does the section use an approved composition?
- [ ] Is 75–90% of useful screen space actively composed?
- [ ] Is whitespace framing a focal point rather than exposing undersized content?
- [ ] Are cards aligned and large enough to carry their content?
- [ ] Are section transitions clean, with no accidental empty band?

### Assets

- [ ] Is the asset from the approved blueprint/architectural language?
- [ ] Is there no unrelated gradient wallpaper or generic AI decoration?
- [ ] Are SVG/raster/3D files optimized and correctly sized?
- [ ] Do important assets have accessible text equivalents?

### Motion

- [ ] Does each animation reveal hierarchy, show sequence, connect cause/effect, or provide feedback?
- [ ] Are standard durations and easings used?
- [ ] Is motion calm and reversible with no scroll hijacking?
- [ ] Does reduced-motion mode preserve all information?

### Engineering

- [ ] Were shared primitives reused instead of duplicated?
- [ ] Are tokens used instead of local magic values?
- [ ] Was the result checked at all required viewports?
- [ ] Is there no overflow, layout shift, broken focus state, console error, or WebGL-only content dependency?
- [ ] Are performance-heavy elements lazy, bounded, and cleaned up?

If any answer is “no,” the task is not complete.

---

## 17. Explicitly prohibited patterns

Do not ship any of the following:

- purple/pink/orange aurora card banners;
- four small equal cards floating inside a nearly empty viewport;
- different heading styles from one section to the next;
- page-local font imports;
- mixed border radii without purpose;
- random blue shades not mapped to tokens;
- centered long paragraphs;
- repeated “AI-powered,” “cutting-edge,” or “revolutionary” filler;
- generic robot, brain, circuit, or equation imagery used without narrative purpose;
- animations on every object;
- endless looping background motion that competes with reading;
- sticky scroll sections that trap the visitor;
- tiny text used to make an oversized layout fit;
- navigation width or styling that changes between pages;
- decorative cards with no information hierarchy;
- hard-coded desktop-only positions;
- asset packs with incompatible visual styles;
- heavy shadows, glass panels, neon glows, or cyberpunk effects;
- content hidden until WebGL initializes;
- new components or tokens created only to bypass this system.

---

## 18. Definition of done

A page or section is done only when:

1. Its message is understandable within five seconds.
2. It looks unmistakably related to the approved ADRIG hero.
3. The same typography, colors, container, spacing scale, components, asset language, and motion grammar are used.
4. The dominant visual explains the service or business transformation.
5. The section occupies the screen confidently without clutter or dead whitespace.
6. Desktop, tablet, mobile, keyboard, reduced-motion, slow-network, and WebGL-failure states are usable.
7. The consistency checklist passes with no unresolved exceptions.

When uncertain, remove decoration, strengthen the hierarchy, enlarge the meaningful visual, shorten the copy, and return to the engineered white/navy/blue system.
