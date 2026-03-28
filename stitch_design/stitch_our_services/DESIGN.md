# Design System: The Editorial Guardian

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Architectural Editorial."** 

In the world of insurance and investment, trust isn't built with generic blue boxes; it’s built through authority, clarity, and precision. This system moves away from "app-like" density toward a high-end, editorial layout reminiscent of a premium financial broadsheet. We achieve this through **intentional asymmetry**, where large typographic headlines are balanced by generous whitespace (`spacing-24`), and **layered depth**, where information is "stacked" rather than boxed in. By breaking the rigid grid with overlapping elements—such as a Gujarati script headline partially overlapping a `surface-container` image—we create a sense of bespoke craftsmanship that signals "Security" and "Custom Wealth Management."

---

## 2. Colors & Tonal Depth

The palette is anchored in `primary` (#002045) and `secondary` (#2C694E), but the secret to the "High-End" feel lies in how we treat surfaces.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be defined solely through background color shifts. For example, a hero section in `surface` (#F7F9FB) transitions into a "Services" section using `surface-container-low` (#F2F4F6). This creates a seamless, fluid experience that feels more organic and less "templated."

### Surface Hierarchy & Nesting
Treat the UI as a physical desk of fine papers. 
- Use `surface-container-lowest` (#FFFFFF) for primary content cards.
- Place these cards atop `surface-container` (#ECEEF0) backgrounds.
- This nesting creates natural depth without the visual clutter of heavy lines.

### The "Glass & Gradient" Rule
To inject "soul" into the corporate aesthetic, main CTAs and Hero backgrounds should utilize a **Signature Gradient**. 
- **The Trust Gradient:** Transition from `primary` (#002045) to `primary_container` (#1A365D) at a 135-degree angle.
- **Glassmorphism:** For floating navigation bars or "Quote Calculators," use `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur. This keeps the user grounded in the content while providing a modern, premium lift.

---

## 3. Typography: The Multilingual Authority

This system pairs **Manrope** (Display/Headlines) for its geometric authority with **Inter** (Body) for its technical precision. Both pair seamlessly with **Noto Sans Gujarati**, maintaining a consistent x-height and stroke weight.

- **Display-LG (Manrope, 3.5rem):** Use for high-impact value propositions. Apply `-0.02em` letter spacing to feel "tighter" and more editorial.
- **Headline-MD (Manrope, 1.75rem):** Used for section headers. When using Gujarati script, increase line-height to `1.6` to accommodate complex glyphs without crowding.
- **Body-LG (Inter, 1rem):** The workhorse for trust-building copy. Maintain a line-length of 60-72 characters for maximum readability.
- **Label-MD (Inter, 0.75rem):** All-caps with `0.05em` tracking, used for small metadata or "Step 01" indicators above headlines.

---

## 4. Elevation & Depth

We eschew "Material Design" standard shadows in favor of **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by "stacking." A card using `surface-container-lowest` (#FFFFFF) sitting on a `surface-container-low` (#F2F4F6) background provides a soft, natural lift.
- **Ambient Shadows:** If a "floating" effect is required (e.g., a lead-gen modal), use an ultra-diffused shadow: `box-shadow: 0 20px 40px rgba(25, 28, 30, 0.06)`. Note the 6% opacity; it should feel like a presence, not a dark smudge.
- **The "Ghost Border" Fallback:** If a container must sit on a background of the same color, use a "Ghost Border": `outline-variant` (#C4C6CF) at **15% opacity**.
- **Roundedness:** Use the `DEFAULT` (8px / 0.5rem) for all cards and inputs to maintain the "Corporate yet Approachable" balance. Use `full` (9999px) for chips and small action buttons.

---

## 5. Components

### Buttons (Lead Generation Focus)
- **Primary:** Gradient fill (`primary` to `primary-container`), white text, `DEFAULT` roundedness. On hover, use a subtle `primary_fixed` glow.
- **Secondary:** `secondary` (#2C694E) text with a `surface-container-highest` background. No border.

### Cards & Lists
- **Forbid Dividers:** Do not use horizontal lines to separate list items. Use `spacing-4` (1rem) of vertical white space or alternate subtle background tints (`surface-container-low` vs `surface-container-lowest`).
- **Investment Cards:** Use `8px` rounded corners. Headlines should be `Title-LG`, and secondary data (e.g., interest rates) should use `Secondary` (#2C694E) to signify growth and security.

### Input Fields (Lead Gen)
- **Style:** "Floating Label" style. Background is `surface-container-lowest`. 
- **States:** On focus, the border doesn't just change color—it thickens to 2px using `primary_fixed_dim` (#ADC7F7) to provide a "High-End" tactile response.

### Signature Component: The "Trust Badge" Chip
- A pill-shaped chip using `secondary_fixed` (#B1F0CE) background with `on_secondary_fixed_variant` (#0E5138) text. Used for "Verified," "Government Regulated," or "Active Policy" status.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use `spacing-16` and `spacing-24` to create "Editorial Breathing Room." 
- **Do** use "Optical Centering." If a card has an icon and text, offset the icon slightly to account for visual weight.
- **Do** ensure Gujarati scripts are at least 10% larger than English text when used in the same UI to maintain visual parity in legibility.

### Don’t:
- **Don’t** use 100% black (#000000) for text. Use `on_surface` (#191C1E) to keep the tone sophisticated and soft.
- **Don’t** use "Box-y" layouts. If you have three cards, try making the center card slightly taller or offset it by `spacing-4` to break the monotonous grid.
- **Don’t** use standard blue for links. Use the `primary` token with an underline offset of `2px` for an editorial feel.

### Accessibility Note:
Ensure the `primary` (#002045) and `secondary` (#2C694E) colors always maintain a 4.5:1 contrast ratio against `surface` colors. When using Gujarati, avoid font weights below 400, as thin Gujarati scripts can break at smaller sizes.