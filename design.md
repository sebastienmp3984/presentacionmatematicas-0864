# Robot móvil: el dato que no existe — Design

Immersive scientific editorial microsite inspired by the supplied Manifold Bio reference, never its copy. Preserve all fifteen slide narratives, exact Spanish wording, section order, and relative arrangement of text blocks from the original PowerPoint.

## Palette
- Laboratory white `#f2f4ef`; pale mint `#dcebe6`; deep petrol `#062631`; abyss `#041c25`.
- Signal cyan `#72ded0`, luminous mint `#b4f7e4`, measurement amber `#e9a85f`.
- Alternate off-white editorial and deep-blue scientific scenes with translucent plotting surfaces.

## Typography
Display: Manrope. Body: DM Sans. Data labels: IBM Plex Mono. Oversized light headings, tracked uppercase micro-labels, exact original Spanish content.

## Layout
- Fifteen full-height scroll chapters retaining slide geometry: two-column problem/model, four methods, two-column factorization, four numerical cards, graph beside instructions, centered closing.
- Width up to 1440px, generous negative space, fine hairlines. Rounded corners only on instruments/cards. Narrow screens stack columns in reading order without losing content.
- Fixed reading rail with wordmark, progress, chapter index and jump navigation. Ambient visuals are non-semantic.

## Motion and depth
Scroll reveals, layered parallax, perspective/tilt data panes, scan lines and orbit rings. Persistent CSS/SVG articulated robot moves between chapter positions. Graph draws its line and missing point pulses. A canvas particle field moves gently. Respect reduced-motion preferences.

## UX and architecture
Native scroll with proximity snapping, keyboard navigation and jump links. All text remains selectable accessible HTML; motion layers hidden from assistive tech. One web route in `packages/web/src/web/pages/index.tsx`, no custom API or database.