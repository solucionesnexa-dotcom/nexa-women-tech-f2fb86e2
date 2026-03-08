

## Plan: Use uploaded logo with text in the hero section

The user uploaded `Nexa_Women_Tech-2.png` (the logo with "NEXA WOMEN TECH" text) and wants it used **only in the hero** section. The navbar and footer keep the current `nexa-logo.png`.

### Steps

1. **Copy the uploaded image** to `src/assets/nexa-hero-logo.png`
2. **Update `src/pages/Index.tsx`**:
   - Import the new logo as `nexaHeroLogo`
   - Use `nexaHeroLogo` in the hero `<img>` tag (the large logo at top of page)
   - Keep `nexaLogo` import for the footer logo
   - Keep the hero logo size at `h-32 w-32` (or slightly larger if needed for readability with text)

