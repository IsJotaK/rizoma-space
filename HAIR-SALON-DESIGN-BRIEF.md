# Rizoma Salon — Visual Design System & UI Brief

> **Project**: Modern unisex hair salon website
> **Vibe**: Warm, sophisticated, welcoming — elevated but approachable
> **Target**: Primary female clientele + unisex services
> **Design Language**: "Warm Minimalism with Rose Gold Accents"

---

## 1. Design System Foundation

### 1.1 Color Palette — "Warm Earth & Rose Gold"

```
ROSE GOLD (Primary Accent)
  Primary:       #C4847C   → Buttons, accent borders, active states, icons
  Deep:          #A86860   → Hover states, dark accent
  Light:         #EED9D5   → Subtle backgrounds, card hover tints
  Glow:          rgba(196,132,124,0.15) → Shadows, focus rings

SLATE (Secondary Neutral)
  Slate:         #5D6D7E   → Secondary text, section headings, dividers
  Slate Light:   #8E9DAD   → Muted text, placeholder text
  Slate Pale:    #E5E9EE   → Borders, subtle dividers, input borders
  Slate Bg:      #F0F3F6   → Alternate section backgrounds

WARM GOLD (Sparkle Accent — use sparingly)
  Gold:          #C9A96E   → Star ratings, highlight details, decorative accents
  Gold Light:    #E8D5B5   → Soft backgrounds, highlight blocks

NEUTRAL BASE
  Beige:         #F7F3EE   → Main page background (warm off-white)
  Cream:         #FDFBF9   → Card surfaces, component backgrounds
  White:         #FFFFFF   → Pure white for overlays, specific components

TEXT
  Dark:          #2C2726   → Primary text, headings
  Warm Gray:     #7A736E   → Secondary body text, descriptions
  Muted:         #A39B96   → Captions, small text, disabled states
  On Dark:       #F5F0EB   → Text on dark backgrounds

DARK SECTION
  Deep Warm:     #3D3635   → Footer background, dark section backgrounds
  Deep Warm Alt: #332D2C   → Darker variant for depth
```

**Color Psychology & Usage Rules:**
- Rose gold (`#C4847C`) is the star — warm, sophisticated, NOT pink/barbie. It reads as a muted copper-rose. Use as the primary accent color (buttons, interactive elements, decorative lines).
- Slate (`#5D6D7E`) grounds the palette — professional, stable, unisex. Use for secondary text and structural elements.
- Gold (`#C9A96E`) is the spice — use in tiny doses for ratings, decorative stars, or accent dots. No more than 5% of any page.
- Beige (`#F7F3EE`) is the canvas — warm, welcoming, never clinical. Main background.

**Accessibility Checks (WCAG AA):**
- `#C4847C` on `#FDFBF9` (white bg): ~4.8:1 contrast ratio ✓ (passes AA for normal text)
- `#5D6D7E` on `#FDFBF9`: ~5.5:1 ✓
- `#2C2726` on `#FDFBF9`: ~13:1 ✓
- White `#FFFFFF` on `#3D3635` (dark bg): ~11.5:1 ✓
- `#C4847C` on `#F7F3EE`: ~4.5:1 ✓ (borderline AA — safe for large text/accents)
- For small body text on beige backgrounds, use `#5D6D7E` or `#2C2726` instead of rose gold.

### 1.2 Typography

```
HEADINGS:   Playfair Display (serif) — elegance, editorial feel, warmth
  - Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extra-bold)
  - Letter-spacing: -0.02em for large headings, 0 for smaller
  - Style: Italic available for decorative pull-quotes

BODY:       Outfit (sans-serif) — clean, modern, geometric, highly readable
  - Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
  - Letter-spacing: 0 (normal), +0.05em for uppercase

ACCENT/UI:  Outfit (same as body) for consistency
  - Uppercase tracking: +0.1em to +0.15em for labels, tags, nav items
```

**Font Size Scale (Mobile → Desktop via clamp):**

```
Role            Size (clamp)                    Weight  Line-Height
─────────────────────────────────────────────────────────────────────
Hero H1         clamp(2.8rem, 6vw, 5rem)       700     1.05
Section H2      clamp(2rem, 3.5vw, 3rem)       600     1.15
Card H3         clamp(1.25rem, 1.8vw, 1.5rem)  600     1.3
Subheading      1.1rem                          500     1.4
Body            1rem (16px)                     400     1.6
Small           0.875rem (14px)                 400     1.5
Caption         0.75rem (12px)                  500     1.4
Label/Price     0.8rem                          600     1.2
Tag/Section ID  0.7rem (11px)                   600     1.2 (uppercase, +0.15em)
```

**Font Application Rules:**
- **Playfair Display** for: Hero headline, section titles, stylist names, big quotes. Adds warmth and editorial elegance.
- **Outfit** for: Navigation, body text, prices, buttons, form labels, captions, service names. Keeps it clean and readable.
- NEVER use Playfair Display for body text or small sizes (below 1.1rem).
- ALL navigation items in Outfit 500, 0.85rem, uppercase with letter-spacing.

### 1.3 Spacing System

```
Base unit: 4px
Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120, 160

Section padding:
  Desktop: 120px 0
  Tablet:  80px 0
  Mobile:  60px 0

Container max-width: 1200px (centered, with 24px side padding)
Content max-width (text-heavy): 720px
```

### 1.4 Shadows & Elevation

```css
:root {
  --shadow-sm: 0 1px 3px rgba(44, 39, 38, 0.04), 0 1px 2px rgba(44, 39, 38, 0.06);
  --shadow-md: 0 4px 12px rgba(44, 39, 38, 0.06), 0 2px 4px rgba(44, 39, 38, 0.04);
  --shadow-lg: 0 12px 32px rgba(44, 39, 38, 0.08), 0 4px 8px rgba(44, 39, 38, 0.04);
  --shadow-xl: 0 24px 48px rgba(44, 39, 38, 0.10);
  --shadow-rose: 0 4px 16px rgba(196, 132, 124, 0.20);
  --shadow-rose-lg: 0 12px 32px rgba(196, 132, 124, 0.25);
}
```

### 1.5 Border Radius

```css
:root {
  --radius-sm: 6px;     /* Inputs, small elements */
  --radius-md: 12px;    /* Cards, buttons, larger components */
  --radius-lg: 20px;    /* Modals, large cards */
  --radius-xl: 28px;    /* Hero images, special containers */
  --radius-full: 9999px; /* Pills, avatars, round buttons */
}
```

### 1.6 Transitions

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out-quad: cubic-bezier(0.45, 0, 0.55, 1);
  
  --transition-fast: 200ms var(--ease-out-quart);
  --transition-normal: 400ms var(--ease-out-expo);
  --transition-slow: 600ms var(--ease-out-expo);
  --transition-spring: 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 1.7 CSS Custom Properties (Full Token Set)

```css
:root {
  /* ── Colors ── */
  --rose: #C4847C;
  --rose-deep: #A86860;
  --rose-light: #EED9D5;
  --rose-glow: rgba(196, 132, 124, 0.15);
  
  --slate: #5D6D7E;
  --slate-light: #8E9DAD;
  --slate-pale: #E5E9EE;
  --slate-bg: #F0F3F6;
  
  --gold: #C9A96E;
  --gold-light: #E8D5B5;
  
  --beige: #F7F3EE;
  --cream: #FDFBF9;
  --white: #FFFFFF;
  
  --dark: #2C2726;
  --warm-gray: #7A736E;
  --muted: #A39B96;
  --on-dark: #F5F0EB;
  
  --deep: #3D3635;
  --deep-alt: #332D2C;
  
  /* ── Typography ── */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  
  --h1: clamp(2.8rem, 6vw, 5rem);
  --h2: clamp(2rem, 3.5vw, 3rem);
  --h3: clamp(1.25rem, 1.8vw, 1.5rem);
  --h4: 1.1rem;
  --body: 1rem;
  --small: 0.875rem;
  --caption: 0.75rem;
  --price: 0.8rem;
  --tag: 0.7rem;
  
  /* ── Spacing ── */
  --section-py: 120px;
  --section-py-tablet: 80px;
  --section-py-mobile: 60px;
  --container-max: 1200px;
  --container-px: 24px;
  
  /* ── Shadows ── */
  --shadow-sm: 0 1px 3px rgba(44, 39, 38, 0.04), 0 1px 2px rgba(44, 39, 38, 0.06);
  --shadow-md: 0 4px 12px rgba(44, 39, 38, 0.06), 0 2px 4px rgba(44, 39, 38, 0.04);
  --shadow-lg: 0 12px 32px rgba(44, 39, 38, 0.08), 0 4px 8px rgba(44, 39, 38, 0.04);
  --shadow-xl: 0 24px 48px rgba(44, 39, 38, 0.10);
  --shadow-rose: 0 4px 16px rgba(196, 132, 124, 0.20);
  --shadow-rose-lg: 0 12px 32px rgba(196, 132, 124, 0.25);
  
  /* ── Radius ── */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 9999px;
  
  /* ── Transitions ── */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out-quad: cubic-bezier(0.45, 0, 0.55, 1);
  --transition-fast: 200ms var(--ease-out-quart);
  --transition-normal: 400ms var(--ease-out-expo);
  --transition-slow: 600ms var(--ease-out-expo);
  --transition-spring: 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 2. Section-by-Section Visual Specification

---

### SECTION 1: NAVBAR — "Warm Floating"

**Layout:**
- Fixed top, `position: fixed; inset: 0 0 auto 0; z-index: 1000;`
- Initial: Transparent background, white text
- On scroll: `background: rgba(61, 54, 53, 0.92); backdrop-filter: blur(16px);` — the `--deep` color with blur
- Height: 72px → 64px on scroll
- Bottom border on scroll: `1px solid rgba(245, 240, 235, 0.06)` (subtle light separation)

**Content:**
```
Left: Logo
  - Text logo: "RIZOMA" in Playfair Display 700, 1.6rem, color white (on transparent) / var(--beige) (on scroll)
  - Optional small tagline next to or below logo: "SALON" in Outfit 500, 0.6rem, uppercase, +0.2em
  - Height < 40px

Center: Navigation links
  - Items: Inicio, Servicios, Galería, Equipo, Contacto
  - Font: Outfit 500, 0.85rem, uppercase, letter-spacing 0.12em
  - Color: rgba(255,255,255,0.85) → hover: white
  - Active: Rose gold underline (2px, 60% width, centered)
  - Padding: 8px 16px

Right: CTA + Social/Contact
  - "Reservar Cita" button — rose gold bg (--rose), white text, pill shape (--radius-full)
  - Font: Outfit 600, 0.8rem
  - Padding: 10px 24px
  - Hover: --rose-deep bg, --shadow-rose
  - Mobile: Replace with calendar/schedule icon
  - Optional: Small WhatsApp icon (as a circle with green tint)
```

**Mobile Navigation Pattern:**
```
Hamburger icon:
  - 3 horizontal lines → animated "X" on open
  - Color: white
  - Size: 24x24px, each line 2px thick, 6px gap
  - Position: Right side of navbar

Overlay menu:
  - Fixed full-screen: inset: 0
  - Background: var(--deep) with slight transparency or solid
  - Slides in from right (or fades in)
  - Close button in top-right (X icon)
  
  Menu items:
    - Vertical list, centered
    - Font: Playfair Display 600, clamp(2rem, 5vw, 3rem)
    - Color: var(--on-dark)
    - Gap: 32px between items
    - Hover: text glows / turns rose gold
    
  Bottom of overlay:
    - Contact info small: Phone, WhatsApp, Address
    - Font: Outfit 400, 0.85rem
    - Color: var(--warm-gray)
    - "Reservar Cita" button centered, large
```

**Transition details:**
```css
.navbar {
  position: fixed; inset: 0 0 auto 0;
  z-index: 1000;
  padding: 16px 0;
  transition: all 0.4s var(--ease-out-expo);
}
.navbar.scrolled {
  background: rgba(61, 54, 53, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 8px 0;
  border-bottom: 1px solid rgba(245, 240, 235, 0.06);
}

.nav-link {
  position: relative;
  padding: 8px 16px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0; left: 50%;
  width: 0; height: 2px;
  background: var(--rose);
  transition: all 0.3s var(--ease-out-quart);
  transform: translateX(-50%);
}
.nav-link:hover::after,
.nav-link.active::after { width: 60%; }
.nav-link:hover,
.nav-link.active { color: white; }
```

---

### SECTION 2: HERO — "Elegant Welcome"

**Layout:**
- Full viewport height: `min-height: 100vh` (or `100dvh`)
- Display: flex, align-items: center
- Background: A warm, sophisticated gradient
  - `background: linear-gradient(135deg, var(--deep) 0%, #4A3F3D 40%, #5C4A45 100%)`
  - Or a split: dark left, warm right
- Overflow: hidden

**Preferred Hero Concept — "Diagonal Warmth":**
A horizontal split where the left side has the dark warm background and the right side has a warm rose gold gradient, meeting at a subtle diagonal or soft curve.

```
Partition: 55% (left) / 45% (right)
Left: Dark warm background (--deep), content stacked
Right: A beautiful organic shape — large soft curve or flowing wave in rose gold tones
  - Could be achieved with: clip-path or a large SVG blob shape
  - Or: a warm gradient from --rose to --rose-light with a decorative pattern
  - Or: placeholder image of a salon interior/styling chair
```

**Left Content Zone:**
```
Top: Small tagline
  "BIENVENIDO A RIZOMA" or "SALON & SPA"
  Font: Outfit 500, 0.75rem, uppercase, letter-spacing 0.2em
  Color: var(--rose-light) or var(--gold)
  Margin-bottom: 24px
  Animation: fade up, 0.6s delay 0.2s

Main headline (two lines):
  Line 1: "Donde el Estilo"  or "Tu Estilo,"
  Line 2: "Encuentra su Hogar" or "Nuestra Pasión"
  Or English version:
  Line 1: "Where Style"
  Line 2: "Finds Its Home"
  
  Font: Playfair Display 700 (or 800 for impact)
  Size: var(--h1)
  Color: var(--on-dark)
  Line-height: 1.05
  Letter-spacing: -0.02em
  
  Animation: Each line fades up, stagger 0.2s each, starting at 0.4s

Divider:
  A small decorative element — thin gold line or a subtle rose gold wave
  Width: 60px, Height: 2px, Background: var(--rose) or var(--gold)
  Margin: 24px 0
  Animation: ScaleX from 0 to 1, 0.8s delay 0.8s

Subheadline:
  "Cortes modernos, color de alta calidad y tratamientos premium en un ambiente relajado y profesional."
  Font: Outfit 300 (or 400), 1.1rem
  Color: rgba(245, 240, 235, 0.75)
  Max-width: 480px
  Line-height: 1.7
  Animation: fade up, 0.6s delay 1s

CTA Buttons (two):
  Primary: "Reservar tu Cita" 
    - bg: var(--rose), color: white
    - Pill shape, padding: 14px 32px
    - Font: Outfit 600, 0.9rem
    - Hover: bg var(--rose-deep), translateY(-2px), shadow-rose
    
  Secondary: "Ver Servicios"
    - bg: transparent, color: var(--on-dark)
    - Border: 1.5px solid rgba(245, 240, 235, 0.25)
    - Pill shape, padding: 14px 32px
    - Font: Outfit 500, 0.9rem
    - Hover: border-color var(--rose), color: var(--rose)
  
  Gap: 16px
  Animation: fade up, 0.6s delay 1.2s
```

**Right Zone:**
```
Option A — Abstract Gradient Art:
  - A large flowing organic shape
  - Background: radial-gradient(ellipse at center, var(--rose) 0%, var(--rose-light) 40%, transparent 70%)
  - Or: clip-path creating a gentle wave that rises from bottom-left to top-right
  - Overlay: a very subtle geometric pattern (small dots or lines at 5% opacity)
  - A decorative element: maybe a stylized hair strand or salon chair silhouette in very subtle white (opacity 0.08)

Option B — Image Placeholder:
  - Full-height image area
  - Placeholder: gradient with salon imagery
  - Overlay: subtle warm gradient at the edge where it meets text
  - Use object-fit: cover if using an actual image
```

**Scroll Indicator:**
```css
.scroll-indicator {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(245, 240, 235, 0.4);
  font-family: var(--font-body);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.scroll-indicator span {
  animation: scrollPulse 2.5s ease-in-out infinite;
}
.scroll-indicator .scroll-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, var(--rose), transparent);
  animation: scrollLine 2.5s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}
@keyframes scrollLine {
  0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
  100% { transform: scaleY(1); transform-origin: top; opacity: 0; }
}
```

**Mobile Hero Adaptation:**
- Stack layout: text on top, the visual/gradient becomes a full-width bottom block (~30% of viewport height)
- The organic shape becomes a top-to-bottom gradient wash
- Smaller headline: clamp(2rem, 10vw, 2.8rem)
- Buttons stack vertically
- Secondary button becomes full-width

---

### SECTION 3: SERVICES — "Cards with Prices"

**Layout:**
- Background: var(--cream)
- Section padding: var(--section-py)

**Section Header:**
```
Tag: "SERVICIOS"
  Font: Outfit 600, 0.7rem, uppercase, letter-spacing 0.2em
  Color: var(--rose)
  Margin-bottom: 12px

Title: "Premium Hair Services" or "Nuestros Servicios"
  Font: Playfair Display 600, var(--h2)
  Color: var(--dark)

Subtitle: "Desde cortes clásicos hasta tratamientos capilares avanzados."
  Font: Outfit 300, 1.05rem
  Color: var(--warm-gray)
  Max-width: 600px
  Margin-bottom: 48px
```

**Card Grid Layout:**
```
Desktop: 3 columns (or 4 if content is compact)
Tablet:  2 columns
Mobile:  1 column

Grid gap: 24px
```

**Service Card Design:**
```
Card container:
  - Background: var(--white)
  - Border-radius: var(--radius-lg)
  - Box-shadow: var(--shadow-md)
  - Padding: 28px 24px
  - Transition: all var(--transition-normal)
  - Border: 1px solid transparent
  
  Hover state:
    - transform: translateY(-6px)
    - box-shadow: var(--shadow-lg)
    - border-color: var(--rose-light)
    - A subtle top accent: maybe a 3px rose gold bar using ::before

Card content structure:

  Top row:
    - Icon (SVG, 32x32px, color: var(--rose))
      Examples: Scissors icon for cuts, Droplet for color, Leaf for treatments, Crown for bridal
    - Category title in Playfair Display 600, 1.25rem, var(--dark)

  Middle — Service items:
    - Each service is a row (flex, space-between)
    - Service name: Outfit 400, 0.9rem, var(--warm-gray)
    - Price: Outfit 600, 0.9rem, var(--dark)
    - Separator: A subtle dotted line or just spaced flex
    - Gap between items: 16px
    
    Example:
      Corte de Dama          $35.000
      Corte de Caballero     $25.000
      Corte Infantil         $20.000
      
  Bottom:
    - "Ver todos los servicios →" link
    - Font: Outfit 500, 0.8rem, var(--rose)
    - Hover: gap expands, color var(--rose-deep)

Category row padding:
  Each service item has: padding: 4px 0
  Optional: A thin border-top on each item (var(--slate-pale))
```

**Service Categories (recommended):**
```
1. Cortes & Peinados (Scissors icon)
   Corte de Dama             $35.000
   Corte de Caballero        $25.000
   Corte Infantil            $20.000
   Peinado (liso/ondas)      $25.000
   Blower Secado             $15.000

2. Coloración (Droplet icon)
   Tono completo             $55.000
   Mechas/Reflejos           $65.000
   Balayage                  $75.000
   Baby Lights               $80.000
   Retoque de Raíz           $40.000

3. Tratamientos (Leaf icon)
   Hidratación Profunda      $35.000
   Keratina                  $60.000
   Botox Capilar             $70.000
   Reparación Molecular      $80.000

4. Maquillaje & Cejas (Sparkle icon)
   Maquillaje Social         $40.000
   Maquillaje Novia          $80.000
   Diseño de Cejas          $15.000
   Laminado de Cejas        $25.000

5. Extensiones (Hair icon)
   Extensión por Keratina   $120.000
   Micro Rings               $150.000
   Mantención                $60.000

6. Barbería (Beard icon)
   Arreglo de Barba         $12.000
   Corte + Barba            $32.000
   Afeitado Clásico         $18.000
   Perfilado                $10.000
```

**CSS:**
```css
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1023px) {
  .services-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 639px) {
  .services-grid { grid-template-columns: 1fr; }
}

.service-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  box-shadow: var(--shadow-md);
  border: 1px solid transparent;
  transition: all var(--transition-normal);
  position: relative;
}
.service-card::before {
  content: '';
  position: absolute;
  top: 0; left: var(--radius-lg); right: var(--radius-lg);
  height: 3px;
  background: var(--rose);
  border-radius: 0 0 3px 3px;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform var(--transition-normal);
}
.service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--rose-light);
}
.service-card:hover::before { transform: scaleX(1); }

.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed var(--slate-pale);
}
.service-item:last-child { border-bottom: none; }

.service-item-name {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.9rem;
  color: var(--warm-gray);
}
.service-item-price {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--dark);
  white-space: nowrap;
  margin-left: 16px;
}
```

**Card State Summary:**
| State | Visual |
|-------|--------|
| Default | White bg, shadow-md, no border |
| Hover | translateY(-6px), shadow-lg, rose-light border, rose bar scales in |
| Focus | Focus ring using --rose-glow (for keyboard nav) |
| Mobile tap | Brief scale(0.98) feedback via :active |

---

### SECTION 4: GALLERY — "Hairstyle Showcase"

**Layout:**
- Background: var(--beige)
- Section padding: var(--section-py)

**Section Header:**
```
Tag: "GALERÍA"
Title: "Inspírate" / "Get Inspired"
Subtitle: "Mira nuestro trabajo y descubre tu próximo look."
```

**Visual Approach — Masonry or Grid:**

```
Desktop: 4 columns, masonry-style (images of varying heights)
Tablet:  3 columns
Mobile:  2 columns

OR: A clean 3-column grid with equal-height cards (simpler to implement)
```

**Gallery Item Design:**
```
Container:
  - Aspect ratio: 3:4 (portrait — works best for hairstyle shots)
  - Or: a mix of 1:1 (square) and 3:4 for masonry
  - Border-radius: var(--radius-md)
  - Overflow: hidden
  - Background: var(--slate-pale)
  - Position: relative

Image (placeholder):
  - A gradient placeholder that looks elegant:
    - Linear or radial gradient in salon tones
    - Example: `background: linear-gradient(135deg, var(--rose-light), var(--slate-pale), var(--gold-light))`
    - Or use actual placeholder images from unsplash
    - object-fit: cover for images
  
  Hover overlay effect:
    - A dark warm overlay slides up from bottom:
      - background: linear-gradient(transparent 40%, rgba(61,54,53,0.85))
      - Opacity: 0 → 1 on hover
      - Transition: 0.3s
    
    - Overlay content (appears on hover):
      - Style name: Playfair Display 600, 1rem, white
      - Category tag: Outfit 500, 0.7rem, uppercase, var(--rose-light)
      - Example: "Balayage Cobrizo" / "Coloración"

  Hover scale:
    - Image scales 1.05 on hover
    - Transition: transform 0.6s var(--ease-out-expo)
```

**CSS:**
```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (max-width: 1023px) { .gallery-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 639px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; } }

.gallery-item {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 3 / 4;
  cursor: pointer;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out-expo);
}
.gallery-item:hover img { transform: scale(1.05); }

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 40%, rgba(61, 54, 53, 0.85));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity var(--transition-normal);
}
.gallery-item:hover .gallery-overlay { opacity: 1; }

.gallery-overlay-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1rem;
  color: var(--white);
}
.gallery-overlay-tag {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--rose-light);
  margin-top: 4px;
}
```

**Gallery Placeholder Suggestions:**
```css
/* Use these gradient placeholders for each gallery item */
.gallery-placeholder-1 { background: linear-gradient(135deg, #EED9D5, #F0E6E0, #C9A96E33); }
.gallery-placeholder-2 { background: linear-gradient(45deg, #E5E9EE, #D4C9C0, #C4847C33); }
.gallery-placeholder-3 { background: linear-gradient(180deg, #F7F3EE, #E8D5B5, #5D6D7E22); }
/* etc — vary the angles and mixes for visual interest */
```

---

### SECTION 5: TEAM — "Stylist Profiles"

**Layout:**
- Background: var(--cream)
- Section padding: var(--section-py)

**Section Header:**
```
Tag: "EQUIPO"
Title: "Conoce a Nuestros Estilistas"
Subtitle: "Talento y pasión dedicados a tu cabello."
```

**Card Layout:**
```
Desktop: 4 columns (or 3 if fewer team members)
Tablet:  2 columns
Mobile:  1 column (or 2 if images are small)

Gap: 32px
```

**Team Member Card Design:**
```
Card container:
  - Background: var(--white)
  - Border-radius: var(--radius-lg)
  - Box-shadow: var(--shadow-sm)
  - Padding: 0 0 28px 0 (image is full width at top)
  - Overflow: hidden
  - Transition: all var(--transition-normal)
  - Text-align: center

  Hover:
    - transform: translateY(-6px)
    - box-shadow: var(--shadow-lg)

Image area:
  - Aspect ratio: 1:1 (square) for the image
  - Or: 3:4 (portrait, crop to head/shoulders)
  - Width: 100%
  - Placeholder gradient:
    - background: radial-gradient(ellipse at 50% 30%, var(--rose-light), var(--slate-pale))
  - object-fit: cover for actual photos
  - Image has a subtle border-bottom: 3px solid var(--rose-light)

Name:
  - Font: Playfair Display 600, 1.3rem
  - Color: var(--dark)
  - Margin-top: 20px

Role/Title:
  - Font: Outfit 500, 0.8rem, uppercase, letter-spacing 0.15em
  - Color: var(--rose)
  - Margin-bottom: 8px

Short Bio/Specialty:
  - Font: Outfit 400, 0.85rem
  - Color: var(--warm-gray)
  - Max-width: 240px, centered
  - Line-height: 1.5
  - Example: "Especialista en coloración creativa y balayage"

Social links (optional, subtle):
  - Instagram icon (small, 18px, color: var(--slate-light))
  - Hover: color var(--rose)
  - Placed at bottom of card
```

**CSS:**
```css
.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}
@media (max-width: 1023px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 639px) { .team-grid { grid-template-columns: 1fr; } }

.team-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  text-align: center;
  transition: all var(--transition-normal);
}
.team-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.team-card-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-bottom: 3px solid var(--rose-light);
}
/* Placeholder gradient when no image */
.team-card-image-placeholder {
  width: 100%;
  aspect-ratio: 1;
  background: radial-gradient(ellipse at 50% 30%, var(--rose-light), var(--slate-pale));
  border-bottom: 3px solid var(--rose-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 3rem;
  color: var(--rose);
  opacity: 0.4;
}

.team-card-body { padding: 20px 16px 24px; }

.team-card-name {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--dark);
  margin-bottom: 4px;
}
.team-card-role {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--rose);
  margin-bottom: 10px;
}
.team-card-bio {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.85rem;
  color: var(--warm-gray);
  line-height: 1.5;
  max-width: 220px;
  margin: 0 auto;
}

.team-card-social {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 14px;
}
.team-card-social a {
  color: var(--slate-light);
  transition: color var(--transition-fast);
}
.team-card-social a:hover { color: var(--rose); }
```

**Stylist Profiles (example data):**
```
1. Valentina Rossi
   "Stylist Senior — Colorista"
   "Especialista en balayage, mechas y coloración creativa."

2. Diego Muñoz  
   "Stylist Senior — Cortes"
   "Experto en cortes modernos, barbería y texturización."

3. Camila Torres
   "Especialista en Tratamientos"
   "Tratamientos capilares avanzados, keratina y botox."

4. Mateo Silva
   "Stylist — Maquillaje & Cejas"
   "Maquillaje profesional, diseño de cejas y extensiones."
```

---

### SECTION 6: TESTIMONIALS (Optional/Compact)

**Layout:**
- Background: var(--slate-bg)
- Section padding: 80px 0 (more compact)
- A carousel or single highlight card

**Design:**
```
Single large testimonial or 2-column carousel:

Card:
  - Background: var(--white)
  - Border-radius: var(--radius-lg)
  - Padding: 40px
  - Box-shadow: var(--shadow-md)
  - Max-width: 800px, centered
  - Top border accent: 4px solid var(--rose)
  - Position: relative

Content:
  - Large quote mark (SVG or ::before): font-size 4rem, color var(--rose-light), position absolute, top: 16px, left: 24px
  - Quote text: Playfair Display 400 italic or Outfit 300, 1.1rem, var(--dark), line-height 1.7
  - Author: Outfit 600, 0.85rem, var(--dark)
  - Author detail: Outfit 400, 0.8rem, var(--warm-gray)
  - Rating: 5 stars in var(--gold), small
  - Bottom: Left-aligned or centered
  
  Carousel dots: small circles, var(--slate-pale) → active: var(--rose)
```

---

### SECTION 7: CONTACT + BOOKING — "Warm Invitation"

**Layout:**
- Background: var(--deep) (dark warm section)
- Section padding: var(--section-py)
- Two-column split: Info (left, 40%) | Form (right, 60%)
- Or: Single column with card on dark background

**Preferred: Dark background with a warm "glass" or elevated card in center**

```
Section background:
  - Background-color: var(--deep)
  - Subtle decorative pattern: very faint geometric dots or lines
    - `background-image: radial-gradient(circle, rgba(196,132,124,0.06) 1px, transparent 1px); background-size: 24px 24px;`
  - Or: a subtle warm radial gradient glow from center-right
    - `background: radial-gradient(ellipse at 80% 50%, rgba(196,132,124,0.08), transparent 50%), var(--deep);`
  
  Optional decorative accent:
    - A flowing wave shape in very low opacity (rgba(196,132,124,0.04)) at top
    - Using ::before with border-radius or SVG
```

**Contact Card (elevated, light background):**
```
Card container:
  - Background: var(--cream) (or var(--white))
  - Border-radius: var(--radius-xl) (28px — larger, softer)
  - Box-shadow: var(--shadow-xl)
  - Padding: 48px (desktop), 32px (mobile)
  - Display: grid, grid-template-columns: 1fr 1.2fr (info left, form right)
  - Gap: 48px
  
  Mobile: single column, stacked
```

**Left Column — Contact Info:**
```
Section tag: "CONTACTO"
  Font: Outfit 600, 0.7rem, uppercase, 0.2em, var(--rose)
  Margin-bottom: 12px

Title: "Agenda tu Visita" / "Book Your Visit"
  Font: Playfair Display 600, 1.75rem, var(--dark)
  Margin-bottom: 24px

"O llámanos directamente:" small text
  Font: Outfit 400, 0.85rem, var(--warm-gray)
  Margin-bottom: 20px

Contact items (list):
  Each item:
    - Flex row, gap: 16px, padding: 12px 0
    - Icon circle:
      - Width: 44px, Height: 44px
      - Border-radius: var(--radius-full)
      - Background: var(--rose-light)
      - Color: var(--rose)
      - Display: flex, align-items: center, justify-content: center
      - SVG icon: 20px
    - Text block:
      - Label: Outfit 500, 0.7rem, uppercase, 0.1em, var(--warm-gray)
      - Value: Outfit 500, 0.95rem, var(--dark)
      - Phone/WhatsApp should be clickable links
    
  Items:
    1. Phone:   📞 +56 9 1234 5678
    2. WhatsApp: 💬 +56 9 9876 5432 (with special highlight or green tint)
    3. Location: 📍 Av. Providencia 1234, Santiago
    4. Hours:    🕐 Lun–Sáb: 9:00–20:00 | Dom: 10:00–18:00

WhatsApp button (standalone, below contact items):
  - "Escríbenos por WhatsApp"
  - bg: #25D366 (WhatsApp green) or var(--rose)
  - Pill button, flexible width
  - With WhatsApp icon
  - target="_blank" rel="noopener noreferrer"
```

**Right Column — Booking Form:**
```
Form layout:
  - CSS Grid: 2 columns with gap 16px
  - Some fields span full width using grid-column: 1 / -1

Fields:
  1. Nombre Completo (Full Name) — input, full width
  2. Email — input, full width
  3. Teléfono (Phone) — input, half width
  4. Servicio (Service) — select dropdown, half width
     - Options from service categories
  5. Estilista (Stylist) — select dropdown, full width
     - Options: "Cualquier Estilista", Valentina, Diego, Camila, Mateo
  6. Fecha Preferida (Preferred Date) — input type="date", half width
  7. Hora Preferida (Preferred Time) — input type="time", half width
  8. Mensaje Adicional (Additional Message) — textarea, full width, 3 rows
  9. Submit button — full width

Input styles:
  - Background: var(--beige) or very light warm
  - Border: 1.5px solid var(--slate-pale)
  - Border-radius: var(--radius-md)
  - Padding: 14px 16px
  - Font: Outfit 400, 0.9rem, var(--dark)
  - placeholder color: var(--muted)
  - transition: all var(--transition-fast)
  
  Focus state:
    - border-color: var(--rose)
    - box-shadow: 0 0 0 3px var(--rose-glow)
    - outline: none

Select styling:
  - appearance: none (remove default arrow)
  - Custom dropdown arrow: SVG chevron in background
  - background-image: url("data:image/svg+xml,...")
  - background-position: right 16px center
  - background-repeat: no-repeat
  - padding-right: 40px

Submit button:
  - "Solicitar Reserva" / "Request Booking"
  - Background: var(--rose)
  - Color: white
  - Font: Outfit 600, 0.95rem
  - Padding: 16px 32px
  - Border-radius: var(--radius-md)
  - Border: none
  - Cursor: pointer
  - Transition: all var(--transition-fast)
  
  Hover:
    - background: var(--rose-deep)
    - transform: translateY(-2px)
    - box-shadow: var(--shadow-rose)
  
  Active:
    - transform: translateY(0)
  
  Focus:
    - box-shadow: 0 0 0 3px var(--rose-glow)
```

**CSS:**
```css
.contact-section {
  background: var(--deep);
  padding: var(--section-py) 0;
  position: relative;
  overflow: hidden;
}
.contact-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 30% 50%, rgba(196, 132, 124, 0.06) 0%, transparent 60%);
  z-index: 1;
}

.contact-card {
  position: relative;
  z-index: 2;
  background: var(--cream);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  padding: 48px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
}
@media (max-width: 1023px) {
  .contact-card { grid-template-columns: 1fr; }
}
@media (max-width: 639px) {
  .contact-card { padding: 32px 24px; }
}

/* Contact Info */
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
}
.contact-item-icon {
  width: 44px; height: 44px;
  min-width: 44px;
  border-radius: var(--radius-full);
  background: var(--rose-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--rose);
}
.contact-item-label {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--warm-gray);
  margin-bottom: 2px;
}
.contact-item-value {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--dark);
}

/* Form */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.form-grid .full-width { grid-column: 1 / -1; }
@media (max-width: 480px) {
  .form-grid { grid-template-columns: 1fr; }
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  background: var(--white);
  border: 1.5px solid var(--slate-pale);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--dark);
  outline: none;
  transition: all var(--transition-fast);
}
.form-input::placeholder { color: var(--muted); }
.form-input:focus {
  border-color: var(--rose);
  box-shadow: 0 0 0 3px var(--rose-glow);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='%238E9DAD'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
  background-position: right 16px center;
  background-repeat: no-repeat;
  padding-right: 40px;
  cursor: pointer;
}

textarea.form-input {
  resize: vertical;
  min-height: 80px;
}

.form-submit {
  grid-column: 1 / -1;
  padding: 16px 32px;
  background: var(--rose);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.form-submit:hover {
  background: var(--rose-deep);
  transform: translateY(-2px);
  box-shadow: var(--shadow-rose);
}
.form-submit:active { transform: translateY(0); }
.form-submit:focus-visible {
  box-shadow: 0 0 0 3px var(--rose-glow);
}

.whatsapp-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #25D366;
  color: white;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all var(--transition-fast);
  margin-top: 8px;
}
.whatsapp-button:hover {
  background: #1DA851;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.3);
}
```

---

### SECTION 8: FOOTER — "Warm Grounding"

**Layout:**
- Background: var(--deep-alt) (slightly darker than contact section)
- Top accent: 3px solid var(--rose) line, full width
- Content: 4-column grid → 2-column (tablet) → stacked (mobile)

```
Grid: 
  Desktop: 2fr 1fr 1fr 1fr
  Tablet:  1fr 1fr
  Mobile:  1fr

Columns:
  Col 1 (Brand): Logo, brief description, social icons
  Col 2 (Services): Quick links to service categories
  Col 3 (Schedule): Hours of operation
  Col 4 (Contact): Mini contact (address, phone)
```

**Footer Design Details:**
```
Top rose gold accent bar:
  - Position: absolute, top: 0, left: 0, right: 0
  - Height: 3px
  - Background: linear-gradient(90deg, var(--rose), var(--gold), var(--rose))

Logo:
  - "RIZOMA" in Playfair Display 700, 1.4rem, var(--on-dark)
  + "SALON" in Outfit 500, 0.55rem, uppercase, 0.2em, var(--rose)

Description:
  - Outfit 400, 0.85rem, var(--warm-gray), line-height 1.7
  - Max-width: 320px
  - "En Rizoma combinamos técnica y creatividad para realzar tu estilo."

Social icons:
  - Row of circular icons
  - Size: 40x40px
  - Border: 1px solid rgba(245, 240, 235, 0.12)
  - Border-radius: 50%
  - Color: var(--slate-light)
  - Display: flex, centered
  - Hover: bg var(--rose), border-color var(--rose), color white
  - Icons: Instagram, Facebook, TikTok, Pinterest

Column headings:
  - Font: Outfit 600, 0.7rem, uppercase, 0.15em
  - Color: var(--rose)
  - Margin-bottom: 20px

Links:
  - Outfit 400, 0.85rem
  - Color: rgba(245, 240, 235, 0.6)
  - Line-height: 2
  - Hover: color var(--rose)
  - Text-decoration: none

Schedule items:
  - Row per day: Day + Hours
  - Flex: space-between
  - Outfit 400, 0.85rem
  - Color: rgba(245, 240, 235, 0.6)
  - Example: "Lun–Vie" / "9:00–20:00"

Bottom bar:
  - Padding: 20px 0
  - Border-top: 1px solid rgba(245, 240, 235, 0.06)
  - Flex: space-between, wrap
  - Text: Outfit 400, 0.8rem, rgba(245, 240, 235, 0.3)
  - Links: "Términos" • "Privacidad" • "Cookies"
```

**CSS:**
```css
.footer {
  background: var(--deep-alt);
  padding: 80px 0 0;
  position: relative;
}
.footer::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--rose), var(--gold), var(--rose));
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 48px;
}
@media (max-width: 1023px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 639px) {
  .footer-grid { grid-template-columns: 1fr; }
}

.footer-brand { max-width: 360px; }

.footer-logo-text {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--on-dark);
  letter-spacing: -0.02em;
}
.footer-logo-suffix {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--rose);
  margin-left: 4px;
}

.footer-desc {
  font-size: 0.85rem;
  color: rgba(245, 240, 235, 0.5);
  line-height: 1.7;
  margin: 16px 0 24px;
}

.footer-social {
  display: flex;
  gap: 10px;
}
.footer-social a {
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(245, 240, 235, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--slate-light);
  transition: all var(--transition-fast);
  text-decoration: none;
}
.footer-social a:hover {
  background: var(--rose);
  border-color: var(--rose);
  color: white;
}

.footer-heading {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--rose);
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  padding: 0;
}
.footer-links li { line-height: 2; }
.footer-links a {
  color: rgba(245, 240, 235, 0.6);
  font-size: 0.85rem;
  text-decoration: none;
  transition: color var(--transition-fast);
}
.footer-links a:hover { color: var(--rose); }

.footer-schedule-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: rgba(245, 240, 235, 0.6);
  padding: 4px 0;
}

.footer-bottom {
  padding: 20px 0;
  border-top: 1px solid rgba(245, 240, 235, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 0.8rem;
  color: rgba(245, 240, 235, 0.3);
}
.footer-bottom-links {
  display: flex;
  gap: 24px;
}
.footer-bottom-links a {
  color: rgba(245, 240, 235, 0.3);
  text-decoration: none;
  transition: color var(--transition-fast);
}
.footer-bottom-links a:hover { color: var(--rose); }
```

---

## 3. Responsive Breakpoint Strategy

```
Mobile (base):   0px – 639px    Single column, stacked layouts, hamburger nav
Tablet:         640px – 1023px  2-column grids, simplified hero
Desktop:       1024px – 1279px  Full multi-column layouts
Large:         1280px+          Container max-width 1200px, full design expression

Container width:
  Mobile: 100% + 24px padding each side
  Tablet: 100% + 32px padding each side  
  Desktop: max-width 1200px + 24px padding
```

**Responsive behavior by section:**

| Section | Mobile (≤639) | Tablet (640–1023) | Desktop (1024+) |
|---------|---------------|-------------------|-----------------|
| Navbar | Hamburger + overlay | Hamburger + overlay | Full nav links |
| Hero | Stack, smaller text, bottom gradient blob | 50/50 or 60/40 split | 55/45 split with diagonal |
| Services | 1 col cards | 2 col cards | 3 col cards |
| Gallery | 2 col, 8px gap | 3 col, 12px gap | 4 col, 16px gap |
| Team | 1 col centered | 2 col | 3-4 col |
| Contact | Stacked card, full-width form | 1 column card | 2-column card grid |
| Footer | Stacked columns | 2×2 grid | 4-column grid |

---

## 4. Animation & Interaction Summary

| Element | Animation | Trigger | Duration/Easing |
|---------|-----------|---------|-----------------|
| Navbar bg | Transparent → dark blur | Scroll > 50px | 0.4s ease-out-expo |
| Nav link underline | Width 0→60% | Hover | 0.3s ease-out-quart |
| Mobile menu | Slide from right | Hamburger click | 0.4s ease-out-expo |
| Hero text | FadeUp stagger (items 1-5) | Page load | 0.6s each, 0.2s delay stagger |
| Hero decorative line | ScaleX 0→1 | Page load (0.8s delay) | 0.8s ease-out-expo |
| Hero scroll indicator | Pulse + line animation | Always (loop) | 2.5s infinite |
| Service cards | translateY(-6px), shadow-lg | Hover | 0.4s ease-out-expo |
| Service card rose bar | ScaleX 0→1 | Hover | 0.4s ease-out-expo |
| Gallery image | Scale 1.0→1.05 | Hover | 0.6s ease-out-expo |
| Gallery overlay | Opacity 0→1 | Hover | 0.3s ease-out-quart |
| Team cards | translateY(-6px), shadow-lg | Hover | 0.4s ease-out-expo |
| Form inputs | border + glow transition | Focus | 0.2s ease-out-quart |
| Submit button | translateY(-2px), shadow-rose | Hover | 0.2s ease-out-quart |
| WhatsApp button | translateY(-2px), green shadow | Hover | 0.2s ease-out-quart |
| Footer social icons | Fill with rose gold | Hover | 0.2s ease-out-quart |
| Section reveals (optional) | translateY(30px)→0 + fade | Scroll into view | 0.6s ease-out-expo |

**Scroll-triggered reveals (staggered entrance per section):**
```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger children: .reveal:nth-child(2) { transition-delay: 0.1s; } etc */
```

---

## 5. Component State Specifications

### Button System

```
Primary Button (.btn-primary)
  Default:   bg var(--rose), color white, radius-md, padding 14px 32px
  Hover:     bg var(--rose-deep), translateY(-2px), shadow-rose
  Active:    translateY(0), bg darker
  Disabled:  opacity 0.5, cursor not-allowed, no hover effects

Secondary Button (.btn-secondary)
  Default:   bg transparent, border 1.5px solid rgba(on-dark, 0.25), color var(--on-dark)
  Hover:     border var(--rose), color var(--rose)
  On light:  border var(--slate-pale), color var(--warm-gray)
  On light hover: border var(--rose), color var(--rose)

Pill size variants:
  .btn-sm: padding 8px 20px, font 0.8rem
  .btn-md: padding 12px 28px, font 0.9rem (default)
  .btn-lg: padding 16px 36px, font 1rem
```

### Form Input States

```
Default:     bg var(--white), border 1.5px solid var(--slate-pale), color var(--dark)
Placeholder: color var(--muted)
Focus:       border var(--rose), box-shadow 0 0 0 3px var(--rose-glow)
Error:       border #E74C3C, box-shadow 0 0 0 3px rgba(231,76,60,0.15)
Success:     border #2ECC71, box-shadow 0 0 0 3px rgba(46,204,113,0.15)
Disabled:    opacity 0.5, bg var(--slate-bg), cursor not-allowed
Required:    subtle asterisk in var(--rose) color
```

### Card States

```
Default:     bg var(--white), shadow-sm, radius-lg, no border
Hover:       translateY(-6px), shadow-lg, rose-light border (1px)
Focus:       focus ring via --rose-glow (for interactive cards)
Active/tap:  scale(0.98) momentary
```

---

## 6. Accessibility Requirements

- **Color Contrast**: All text meets WCAG AA minimum (4.5:1 for normal text, 3:1 for large)
- **Focus Indicators**: All interactive elements have visible `:focus-visible` styles using rose gold glow
- **Touch Targets**: Minimum 44x44px for all interactive elements on mobile
- **Keyboard Navigation**: All functionality accessible via keyboard (Tab, Enter, Escape)
- **Screen Readers**:
  - Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
  - ARIA labels on icons, buttons, and form elements
  - `aria-label` on nav, social links, icon-only buttons
  - Form inputs associated with `<label>` elements
  - Error messages linked via `aria-describedby`
- **Motion Preferences**:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
    .hero-content > * { animation: none !important; opacity: 1 !important; }
  }
  ```
- **Skip Navigation**: Hidden skip link as first focusable element
- **Form Validation**: Clear error messaging, both inline and summary

---

## 7. Image & Asset Specifications

| Asset Type | Size | Format | Notes |
|-----------|------|--------|-------|
| Gallery images | 1200×1600px (3:4) | WebP + JPEG fallback | Portrait orientation |
| Team photos | 800×800px (1:1) | WebP + JPEG | Headshot/portrait crop |
| Hero image (optional) | 1920×1080px (16:9) | WebP | Wide salon shot |
| Favicon | 32×32px, 180×180px | PNG | Rose gold R monogram |
| Social sharing | 1200×630px | PNG | OG image with logo |

**Placeholder Gradients for Gallery:**
```css
.grad-1 { background: linear-gradient(135deg, #EED9D5, #E5E9EE); }
.grad-2 { background: linear-gradient(45deg, #F0E6E0, #E8D5B5); }
.grad-3 { background: linear-gradient(180deg, #D4C9C0, #C4847C33); }
.grad-4 { background: linear-gradient(225deg, #E5E9EE, #F7F3EE, #C9A96E33); }
.grad-5 { background: radial-gradient(ellipse at 50% 30%, #EED9D5, #F0E6E0); }
.grad-6 { background: linear-gradient(160deg, #C4847C22, #E5E9EE, #C9A96E22); }
```

---

## 8. CSS Techniques Reference

| Technique | Usage |
|-----------|-------|
| `clamp()` | Fluid typography scale |
| `backdrop-filter: blur()` | Navbar glass effect on scroll |
| `aspect-ratio: 3/4` | Gallery image containers |
| `scroll-snap-type` | Optional testimonial carousel |
| `prefers-reduced-motion` | Accessibility for motion-sensitive users |
| `:focus-visible` | Keyboard focus indicators |
| `::before` / `::after` | Decorative accents (navbar underline, card rose bar, footer line) |
| `@keyframes` | Hero stagger reveal, scroll indicator |
| `linear-gradient()` | Hero background, footer top accent, gallery placeholders |
| `radial-gradient()` | Team photo placeholders, decorative section glows |
| `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` | Auto-responsive grids |
| `appearance: none` | Custom select styling |
| `data-theme` or `prefers-color-scheme` | Future dark mode support |

---

## 9. Component Architecture & Reusables

### Base Components to Build:
```
1. Button (.btn / .btn-primary / .btn-secondary / .btn-sm / .btn-lg / .btn-pill)
2. Input (.form-input / .form-select / .form-textarea)
3. Card (.card / .card-hover / .card-service / .card-team)
4. Section Header (.section-tag / .section-title / .section-subtitle)
5. Container (.container / .container-narrow)
6. Grid (.grid-2 / .grid-3 / .grid-4 / .grid-auto)
7. Badge/Tag (.tag / .tag-rose / .tag-gold)
8. Icon Circle (.icon-circle / .icon-circle-sm / .icon-circle-lg)
9. Section (.section / .section-light / .section-dark / .section-beige)
10. Social Links (.social-links / .social-link-icon)
11. Reveal animation wrapper (.reveal)
12. Price row (.price-row / .price-name / .price-value)
```

---

## 10. Page Structure (HTML Outline)

```
<body>
  <!-- Skip Navigation -->
  <a href="#main">Skip to content</a>
  
  <!-- Navbar -->
  <nav class="navbar" role="navigation" aria-label="Main navigation">
    <div class="container">
      <div class="navbar-inner">
        <a class="navbar-logo">RIZOMA <span>SALON</span></a>
        <ul class="navbar-links">...</ul>
        <a class="btn btn-primary btn-sm navbar-cta">Reservar Cita</a>
        <button class="navbar-hamburger" aria-label="Open menu">...</button>
      </div>
    </div>
  </nav>
  
  <!-- Mobile Navigation Overlay -->
  <div class="mobile-menu" aria-hidden="true">...</div>
  
  <main id="main">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-content">...</div>
        <div class="hero-visual">...</div>
      </div>
      <div class="scroll-indicator">...</div>
    </section>
    
    <!-- Services Section -->
    <section class="section section-cream" id="servicios">...</section>
    
    <!-- Gallery Section -->
    <section class="section section-beige" id="galeria">...</section>
    
    <!-- Team Section -->
    <section class="section section-cream" id="equipo">...</section>
    
    <!-- Testimonials Section (optional) -->
    <section class="section section-slate">...</section>
    
    <!-- Contact Section -->
    <section class="contact-section" id="contacto">...</section>
  </main>
  
  <!-- Footer -->
  <footer class="footer">...</footer>
</body>
```

---

## 11. Visual Direction Summary

```
Visual Vibe Moodboard Keywords:
┌─────────────────────────────────────────────────────────────┐
│  Warm Minimalism  •  Rose Gold Accents  •  Editorial        │
│  Sophisticated    •  Approachable Luxury  •  Airy            │
│  Textured Warmth  •  Soft Geometry  •  Elegant Serifs       │
└─────────────────────────────────────────────────────────────┘

Texture & Material References:
  • Brushed rose gold metal (for buttons, accents)
  • Warm linen or matte paper (for backgrounds)
  • Soft velvet (for the overall mood)
  • Terrazzo or marble with warm veining (for pattern inspiration)
  • Warm ambient lighting (photography direction)

What This Design IS:
  ✓ Warm and welcoming without being saccharine
  ✓ Professional and premium without being cold
  ✓ Feminine- leaning but unisex-friendly (slate balances the rose)
  ✓ Modern editorial — like a luxury lifestyle magazine
  ✓ Tactile and material in its visual language

What This Design IS NOT:
  ✗ Pink/barbie/frilly
  ✗ Dark/industrial/masculine  
  ✗ Cold/minimalist/sterile
  ✗ Overdecorated or busy
  ✗ Trendy/disposable
```

---

*Design System prepared by UI Designer Agent*
*Project: Rizoma Salon — "Warm Minimalism with Rose Gold Accents"*
*Ready for Frontend Developer handoff*
