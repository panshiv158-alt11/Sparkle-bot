# Sparklebots Website - Quick Reference Guide

## 🎨 Color Palette

```
Primary Dark Blue    #0B3C5D    (headers, main elements)
Teal Green Secondary #0FA3B1    (accents, highlights)
Gold Accent         #D4AF37     (buttons, premium)
Light Background    #F8FAFC     (main background)
Dark Text           #111111     (primary text)
Light Text          #555555     (secondary text)
```

## 📱 Responsive Breakpoints

| Device       | Width      | Logo | Section Title | Button         | Container     |
| ------------ | ---------- | ---- | ------------- | -------------- | ------------- |
| Desktop      | 1024px+    | 65px | 2.8rem        | 0.9rem 2rem    | Auto-fit grid |
| Tablet       | 768-1023px | 55px | 2rem          | 0.8rem 1.8rem  | 1-2 columns   |
| Mobile       | 480-767px  | 50px | 1.6rem        | 0.75rem 1.5rem | 1 column      |
| Small Mobile | <480px     | 50px | 1.6rem        | 100% width     | Stacked       |

## 🎯 Key Styling Rules

### Navigation Bar

- Height: ~70px (with logo 65px + padding)
- Sticky positioning: `position: sticky; top: 0; z-index: 1000`
- Background: Blue-to-Teal gradient with blur
- Logo glow: `drop-shadow(0 0 12px rgba(212,175,55,0.5))`

### Hero Section

- Min-height: 85vh (desktop) → 75vh (tablet) → 65vh (mobile)
- Background: Light gradient overlay
- Dark overlay: `rgba(11, 60, 93, 0.4)`
- H1 color: White with text-shadow
- H1 size: 3.5rem → 2.2rem → 1.8rem

### Buttons

- Base: `padding: 0.9rem 2rem; border-radius: 10px;`
- Primary: Blue→Teal gradient, gold border
- Hover: `transform: translateY(-3px); box-shadow: enhanced`
- Mobile: **width: 100%; display: block;** (full-width)

### Sections

- Desktop padding: `5rem 2rem`
- Tablet padding: `3.5rem 1.5rem`
- Mobile padding: `2.5rem 1rem`
- Title: 2.8rem → 2rem → 1.6rem
- All use `box-shadow: 0 4px 15px rgba(0,0,0,0.1)`

### Cards

- Padding: 2.2rem → 1.5rem → 1.2rem
- Border radius: 12px
- Shadow: `0 4px 15px rgba(0,0,0,0.1)`
- Hover: `transform: translateY(-8px); box-shadow-lg`
- Smooth transitions: `all 0.3s cubic-bezier`

## 📐 Layout Grid

### Auto-fit Grid (Responsive)

```css
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2.5rem;
```

Automatically adjusts:

- Large screens: 4+ columns
- Medium screens: 2-3 columns
- Tablets: 1-2 columns
- Mobile: 1 column

## 🎭 Effects & Animations

### Logo Glow

- Hover: `scale(1.05)` with enhanced glow effect
- Filter: `drop-shadow(0 0 20px rgba(212,175,55,0.7))`

### Button Hover

- Transform: `translateY(-3px)` (lift effect)
- Shadow: `0 12px 32px rgba(212,175,55,0.4)` (gold glow)
- Transition: `all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)`

### Card Hover

- Transform: `translateY(-8px)` (moderate lift)
- Shadow: `0 12px 30px rgba(0,0,0,0.15)` (enhanced depth)
- Duration: 0.3s cubic-bezier

### Floating CTA

- Animation: `pulseBox 3s infinite`
- Position: `bottom: 2rem; right: 2rem` (desktop)
- Position: `bottom: 4rem; right: 0.5rem` (mobile)

## 🔧 Typography

- **Font Family**: "Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif
- **Line Height**: 1.8 (improved readability)
- **Font Weights**:
  - Regular text: 500
  - Strong text: 600
  - Headings: 700
  - Bold headings: 800

## 🚨 Mobile Optimizations

### Navbar (480px)

- Logo: 50px (reduced from 65px)
- Text: Reduced to 0.75rem
- H1: Hidden (display: none)
- Menu gap: Minimal spacing

### Buttons (480px)

- **Width: 100%** (full-width)
- **Display: block** (stacked)
- Padding: 0.75rem 1.5rem (compact)

### Sections (480px)

- Padding: 2.5rem 1rem (minimal)
- Title: 1.6rem (readable)
- Grid: 1 column (stacked)
- Cards: 1.2rem padding

### Floating Elements (480px)

- Bottom position reduced
- Right position reduced to avoid edge
- Smaller font sizes
- Simplified content (hide subtitles)

## ✨ Premium Features

1. **Gold Accents**: Used on buttons, borders, badges
2. **Gradient Backgrounds**: Section headers have depth
3. **Backdrop Filters**: Modern blur effects on overlays
4. **Smooth Transitions**: All animations use cubic-bezier
5. **Shadow Hierarchy**: Regular shadow (light) → Large shadow (deep)
6. **Color Psychology**: Blue (trust), Teal (calm), Gold (premium)

## 📊 CSS File Structure

1. **Variables & Reset** (lines 1-65)
2. **Navigation** (lines 67-230)
3. **Hero Section** (lines 232-450)
4. **Buttons** (lines 452-535)
5. **Section Styles** (lines 537-700)
6. **About Section** (lines 702-830)
7. **Demo Section** (lines 832-920)
8. **Learning Paths** (lines 922-1050)
9. **Courses Section** (lines 1052-1150)
10. **Other Sections** (lines 1152-1380)
11. **Mobile Responsive** (lines 1382-1630+)

## 🎯 Best Practices Applied

✅ Mobile-first approach
✅ Semantic HTML preserved
✅ CSS-only changes (no HTML modifications)
✅ WCAG contrast compliance
✅ Performance optimized (GPU-accelerated transforms)
✅ Cross-browser compatible
✅ Proper spacing hierarchy
✅ Consistent color scheme
✅ Accessibility considerations
✅ Print styles included

---

**Ready for deployment!** All improvements tested and validated. 🚀
