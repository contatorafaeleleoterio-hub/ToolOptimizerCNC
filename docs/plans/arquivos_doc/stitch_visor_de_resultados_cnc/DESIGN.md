# Design System Strategy: Precision Glass & Industrial Depth

## 1. Overview & Creative North Star
In the high-stakes world of CNC machining, precision isn't just a requirement—it’s the aesthetic. The Creative North Star for this design system is **"The Kinetic Laboratory."** 

We are moving away from the "flat dashboard" trend to create a UI that feels like a high-end physical instrument. By blending the rigidity of a technical grid with the ethereal depth of glassmorphism, we evoke the feeling of a futuristic heads-up display (HUD). We break the "template" look through **tonal layering** and **intentional asymmetry**, ensuring that while the data is structured, the interface feels atmospheric and premium. This system prioritizes extreme legibility for safety-critical environments while maintaining a bespoke, editorial finish.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep obsidian tones, punctuated by high-contrast whites and vibrant semantic status indicators.

*   **Background & Surface:** The foundation is `surface` (`#0F1419`). 
*   **The "No-Line" Rule:** To achieve a premium feel, avoid 1px solid dividers for sectioning. Use background shifts between `surface-container-low` and `surface-container-high` to define boundaries.
*   **The Glass & Gradient Rule:** 
    *   **Primary Containers:** `rgba(35, 45, 58, 0.95)` with a `backdrop-blur` of 12px.
    *   **Nested Boxes:** `rgba(45, 55, 70, 0.90)` to create a subtle lift.
    *   **Visual Soul:** Use a subtle linear gradient from `primary` (`#C3F5FF`) to `primary_container` (`#00E5FF`) for active states and high-priority action buttons.
*   **Semantic Safety:** 
    *   **Safe:** `tertiary` (`#2ECC71`)
    *   **Caution:** `Yellow` (`#F39C12`)
    *   **Danger:** `error` (`#FFB4AB`)
    *   *Note:* Ensure all semantic text meets WCAG AA/AAA by using the `on-` tokens for contrast.

---

## 3. Typography: The Precision Duo
We use a dual-typeface system to separate narrative from raw data.

*   **Narrative (Inter):** Used for all UI labels, body text, and titles. It provides a human, approachable counterpoint to the machine-generated data.
*   **Data (JetBrains Mono):** All numerical values, coordinates, and G-code must use this monospace font. It signals "machine precision" and ensures that changing numbers don't cause layout "jitter" due to varying character widths.
*   **Hierarchy:**
    *   **Display/Headline:** Use `Space Grotesk` for large, high-impact titles to add a technical, editorial edge.
    *   **Labels:** Use `label-md` or `label-sm` in `secondary` (`rgba(255, 255, 255, 0.70)`) for non-interactive metadata.

---

## 4. Elevation & Depth
In this system, depth is a functional tool used to group related machining parameters.

*   **The Layering Principle:** 
    *   Base Level: `surface` (`#0F1419`)
    *   Main Card: `surface-container-low` with Glassmorphism.
    *   Inner Inputs: `surface-container-highest` to create a "recessed" or "inset" look for data entry.
*   **Ambient Shadows:** Avoid black shadows. Use a diffused shadow (`blur: 24px`) with a color tinted toward the background (`#000000` at 15% opacity) to suggest the glass is floating slightly above the hardware.
*   **The Ghost Border:** For accessibility, use a "Ghost Border" of `rgba(255,255,255,0.15)`. This provides a crisp edge for the glass containers without the heavy, dated look of a solid stroke.

---

## 5. Components
Each component is designed to feel like a tactile control on a CNC console.

*   **Buttons:**
    *   **Primary:** Solid `primary_container` with `on_primary_container` text. High-glow effect on hover.
    *   **Secondary:** Ghost style using the `outline` token with 15% opacity.
*   **Technical Chips:** Use `secondary_container` with `label-sm` typography for status tags (e.g., "Milling," "Drilling").
*   **Input Fields:** Recessed styling. Use `surface_container_highest` for the background and the "Ghost Border" for the perimeter. Active states should use a 1px glow using the `primary` token.
*   **Cards & Lists:** **No Dividers.** Separate machining steps using `Spacing 6` (1.3rem) of vertical white space or a slight shift from `surface-container-low` to `surface-container-high`.
*   **Monospace Data Readouts:** (Special Component) A large `display-sm` JetBrains Mono block, colored in `primary` or a semantic color, sitting on a `surface-container-lowest` background to mimic a digital readout.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use JetBrains Mono for any number that changes in real-time.
*   **Do** leverage `backdrop-blur` for all modal overlays and main sidebars to maintain a sense of environmental context.
*   **Do** use the `Spacing Scale` religiously to maintain a "technical grid" feel—asymmetry should be intentional, not messy.

### Don't:
*   **Don't** use 100% opaque, solid white borders. They break the glass illusion and cause eye fatigue in dark environments.
*   **Don't** use standard "drop shadows" on containers; stick to tonal layering (shifting background brightness) to show depth.
*   **Don't** use `Inter` for tool diameters, RPMs, or feed rates; these are data points and belong in `JetBrains Mono`.
*   **Don't** crowd the interface. Even a technical tool needs "breathing room" (Spacing 8 or 10) to ensure the operator can read values at a glance from a distance.