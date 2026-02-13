# Luxury Portfolio Website

A premium, responsive single-page portfolio website for an automobile business consultant. Built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

✨ **Premium Design**
- Dark luxury theme with purple accents
- Glassmorphism effects and smooth animations
- Fully responsive mobile-first design
- Elegant typography with Playfair Display and Inter fonts

🎬 **Smooth Animations**
- Framer Motion animations on scroll
- Fade-in effects for sections
- Hover animations on cards and buttons
- Subtle parallax effects

📱 **Responsive**
- Mobile-first approach
- Perfect on all devices
- Clean semantic HTML
- Optimized performance

🎨 **Customizable**
- Easy to replace client information
- Simple image placeholders
- Well-organized component structure
- Clear comments for customization

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 10
- **Language**: TypeScript
- **Fonts**: Google Fonts (Playfair Display, Inter)

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   ├── globals.css         # Global styles and animations
│
├── components/
│   ├── Navbar.tsx          # Sticky navigation bar
│   ├── Hero.tsx            # Hero section with CTA
│   ├── TrustStrip.tsx      # Trust indicators
│   ├── About.tsx           # About section
│   ├── Problems.tsx        # Pain points grid
│   ├── Services.tsx        # Services/offerings
│   ├── Results.tsx         # Case studies & testimonials
│   ├── Process.tsx         # Timeline process
│   ├── CTA.tsx             # Call-to-action section
│   ├── Contact.tsx         # Contact form & methods
│   └── Footer.tsx          # Footer
│
├── public/
│   └── images/
│       ├── hero.jpg        # Hero section image (replace)
│       └── about.jpg       # About section image (replace)
│
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── next.config.js          # Next.js configuration
```

## Installation & Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

3. **Build for Production**
```bash
npm run build
npm start
```

## Customization Guide

### Update Client Information

1. **Brand Name** - In `components/Navbar.tsx` (line 25):
   ```tsx
   CLIENT NAME
   ```

2. **Hero Tagline** - In `components/Hero.tsx` (line 27)

3. **Contact Information** - In `components/Contact.tsx`:
   - Email address
   - Phone number
   - WhatsApp link
   - LinkedIn profile

4. **Footer Year** - Automatically updates (see `components/Footer.tsx`)

### Replace Images

The site uses placeholder SVG images that will display until you add real images:

1. **Hero Portrait** - Replace `/public/images/hero.jpg`
   - Recommended: 500x500px or similar square ratio
   - Professional headshot or portrait
   - Comment in `components/Hero.tsx` shows location

2. **About Section** - Replace `/public/images/about.jpg`
   - Recommended: 500x500px or similar
   - Can be different photo or lifestyle image
   - Comment in `components/About.tsx` shows location

### Color Customization

All colors are defined in `tailwind.config.ts`. Edit the `extend.colors` section:

```typescript
colors: {
  'dark-bg': '#0b0f14',           // Main background
  'dark-secondary': '#121821',    // Secondary dark
  'purple-accent': '#7c5cff',     // Primary accent
  'purple-glow': 'rgba(124,92,255,0.35)',
  'text-primary': '#e6eaf2',      // Main text
  'text-muted': '#9aa4b2',        // Secondary text
}
```

### Update Text Content

Each component has clear placeholder text that can be updated:

- **Hero Section** - Main value proposition
- **About Section** - Professional background (3 paragraphs + bold statement)
- **Problems Section** - Pain points (6 items)
- **Services Section** - Offerings (4 services)
- **Results Section** - Case studies (3) and testimonials (2)
- **Process Section** - Process steps (5 steps)

### Google Fonts

Fonts are loaded from Google Fonts in `app/globals.css`. To change:

1. Update the `@import` URL
2. Update font-family in `tailwind.config.ts`

### Animation Timing

Adjust animation speeds in components or globally in `app/globals.css`:

- Fade-up animation: `0.6s`
- Stagger delay: `0.1s` to `0.15s`
- Scale on hover: `1.05`
- Translate on hover: `-6px` (hover lift effect)

## Responsive Breakpoints

- **Mobile**: Default (< 640px)
- **Tablet**: `md:` (640px - 1024px)
- **Desktop**: `lg:` (1024px+)

All sections are optimized for mobile-first viewing.

## Performance Tips

1. **Image Optimization**: Use optimized/compressed images
2. **Lazy Loading**: Components load on scroll with `whileInView`
3. **CSS**: Tailwind automatically purges unused styles in production
4. **Next.js**: Automatic code splitting and optimization

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Focus states on interactive elements
- Color contrast meets WCAG standards

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

The project is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Any Node.js hosting

## License

This template is provided as-is for client use.

## Support

For questions or issues:
1. Check the component comments for customization hints
2. Review the Tailwind CSS documentation
3. Consult Framer Motion docs for animation details
4. Next.js documentation: https://nextjs.org/docs

---

**Ready to customize?** Start by updating the client name and content in each component!
