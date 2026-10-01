# Motion

How things move on the Arrowleaf site, so every page feels like the same
product. Read this before adding or changing any animation.

## Principles

1. **Never make anyone wait.** Motion confirms what's already there. Content
   is never held back until an animation finishes, and scrolling never
   "unlocks" anything.
2. **Entrances are for arrivals.** A visible entrance plays only when the
   reader sees a whole view at once: first load, a refresh, following a
   `#section` link, or navigating to a page. Things scrolled into view get an
   entrance so small it's nearly invisible.
3. **Motion has a direction and a reason.** Things rise into place, the new
   page drops in from above, the arrow points where the link goes. If you
   can't say what an animation communicates, leave it out.
4. **One vocabulary.** Use the tokens and patterns below. Don't invent a new
   easing curve, duration or keyframe for a one-off.
5. **Reduced motion is a first-class path.** Everything must read correctly
   with `prefers-reduced-motion: reduce`: no movement, content shown at once,
   state changes instant or cross-faded.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--ease-brand` (`ease-brand`) | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Default for anything arriving or settling |
| `--ease-spring` (`ease-spring`) | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Small overshoot: hover lifts, flips, scale pops |
| `--page-drop-ease` | `cubic-bezier(0.76, 0, 0.24, 1)` | Page transitions only |
| `--reveal-load-duration` / `-step` | 700ms / 70ms | Load entrance and its stagger |
| `--reveal-scroll-duration` / `-step` | 420ms / 40ms | Scroll entrance and its stagger |

Durations: 150–300ms for hover and focus feedback, 400–700ms for entrances
and state changes, 850ms for the page transition. Nothing user-triggered
should take longer than about 1s from start to settle.

## Reveals: the default for content

Put `data-reveal` on each **content block** (an eyebrow, a heading, a lede,
a CTA group, a card, a list row). The `RevealController` in the root layout
does the rest; pages need no other wiring.

```tsx
<p data-reveal className="…">Solutions</p>
<h2 data-reveal className="…">Four disciplines, <em>one plan</em></h2>
<ul>{items.map((i) => <li key={i.id} data-reveal>…</li>)}</ul>
```

What the reader gets depends on how they arrived:

| Mode | When | What it does |
| --- | --- | --- |
| load | On screen within 0.8s of the page appearing (2s when the URL has a `#section`) | Rise 16px, fade, slight blur-to-focus, 700ms, staggered 70ms in reading order (max 8 steps) |
| scroll | Comes into view later | Rise 10px and fade, 420ms, triggered just before it enters the screen, staggered 40ms (max 4 steps) |
| instant | Already above the screen at load (restored scroll) | Shown, no animation |

Rules:

- **Blocks, not fragments.** Tag a heading, not its words. Tag each card in a
  row of cards; tag a long text list as one block.
- **Don't nest.** A `data-reveal` inside another one animates twice.
- **Order is document order.** Put things in the DOM in reading order and the
  stagger follows. Use `data-reveal-step="n"` only to line up something that
  sits apart in the DOM (the hero reel uses step 6 so its three layers arrive
  together, after the cards).
- **Use `data-reveal="fade"`** (opacity only) for anything whose position is
  driven by JS (the reel's window and color tiers) or that's full-bleed media.
- **Never on JS-animated properties.** Don't tag an element whose
  `translate`, `filter` or `opacity` is set by script every frame; tag a
  parent or child instead. (Reveals fill backwards only, so an element's own
  `translate` and `filter` are untouched once it has arrived.)
- **Not on persistent chrome.** The header lives in the layout and is never
  revealed.
- **Lines that draw in:** an SVG `<path data-draw pathLength={1}
  strokeDasharray="1">` inside a revealed block draws itself just after the
  block arrives (the case-study trend lines).

## Established patterns

Reuse these before building something new.

| Pattern | Where | Notes |
| --- | --- | --- |
| Page drop | `page-transition.tsx`, globals "Page transitions" | Every page's `<main>` is wrapped in `PageTransition` |
| Floating glass header | `floating-header.tsx` | Detaches after 16px of scroll |
| Glow field | `glow-field.tsx` | Home only; interior pages use the static mesh |
| Scroll-grown reel | `showcase-scroll.tsx` | Scroll-linked, never time-based |
| "Touch me" hop | `pillar-cards.tsx` | Double bounce (4px, then 2px), one card at a time, stops once used |
| Flip card | `pillar-cards.tsx` | 700ms `ease-spring`; hover on mouse, tap on touch |
| Folder-tab stack | `services-stack.tsx` | Scroll-linked title collapse |
| Leaf → arrow CTA | `leaf-cta.tsx`, `cta-pill.tsx` | 420ms diagonal wipe, then the same double bounce pointed up-right. Every primary "go" button uses it. Crossing 60% down the screen, it peeks (arrow, then back to the logo) with a mouse, and turns to the arrow and stays on touch; scrolling back past the line reverses it |
| Work window | `work-preview.tsx` | The creative rests in a corner window and opens across the card on hover, 700ms `ease-brand` |
| Ticker | `client-logos.tsx` | Three rows of client logos on `marquee` keyframes, 100s linear (about 30px a second), middle row reversed, edges faded, never pauses; still under reduced motion |
| Footer rise | `site-footer.tsx` | Scroll-driven (`animation-timeline: view()`); static where unsupported |
| Arrow nudge | `ArrowIcon` in buttons and links | Small translate or rotate on hover, `ease-brand` |

Shared motifs: **the double bounce** (a gentle lift, then half again) means
"this is interactive". **Up-and-right** means "go somewhere". Keep both
consistent when you use them.

## Implementation notes

- Scroll-linked effects read positions in `requestAnimationFrame`, never on
  a timer, and write only `transform`, `opacity` or `clip-path`.
- One-shot motion started by JS uses the Web Animations API
  (`element.animate`); repeating ambient motion uses CSS keyframes in
  `globals.css`. The dev server can miss new keyframes in `globals.css`:
  restart it (see AGENTS.md).
- Verify motion on a production build (`npm run build && npx next start`),
  including with reduced motion emulated.
