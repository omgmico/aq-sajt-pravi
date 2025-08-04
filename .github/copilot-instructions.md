<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# AQ Accounting - Montenegrin Business Consulting Website

This is a professional presentation website for AQ Accounting, a bookkeeping and business consulting firm in Montenegro, built without newsletter or popup functionality.

## Architecture & Core Patterns

### File Structure & Responsibilities
- `index.html` - Single-page application with all main sections
- `styles.css` - Mobile-first responsive design using CSS Grid and Flexbox
- `script.js` - Vanilla JavaScript with scroll animations and form handling
- `about-us.html` / `service-listing.html` - Secondary pages with shared navigation

### Section-Based Architecture
The site follows a linear section flow: Header → 3 Hero sections → Guidance → Stats → Solutions → Services Grid → Business Journey (animated) → Testimonials → Contact → Footer. Each section is a semantic `<section>` with predictable class naming.

### CSS Architecture Patterns
- **Grid Layout**: Use `grid-template-columns: 1fr 1fr` for desktop, collapse to `1fr` on mobile
- **Alternating Sections**: Even hero sections (`.hero:nth-child(even)`) get dark theme with white text
- **Component Classes**: Follow `.section-name-component` pattern (e.g., `.service-card`, `.timeline-step`)
- **Responsive Breakpoint**: Single `@media (max-width: 768px)` handles all mobile styles

### JavaScript Interaction Patterns
- **Scroll Animations**: Use `IntersectionObserver` to trigger `.animate-in` classes on scroll
- **Form Handling**: CTA buttons show alerts with localized messages, contact form has validation
- **Timeline Animation**: Business journey auto-cycles every 2 seconds, pauses on hover, manual click navigation

## Development Workflow

### Local Development
```bash
# Start HTTP server on port 3000 (avoids Live Server conflicts)
http-server -p 3000 -o
# Access at http://127.0.0.1:3000
```

### Adding New Sections
1. Add semantic HTML section with appropriate class
2. Follow existing CSS naming: `.section-name-section` wrapper, `.section-name-content` container
3. Include in scroll animation observer: `document.querySelectorAll('.hero, .guidance-section, ...')`
4. Add responsive styles in existing `@media` block

### Content Localization
- All text is in Serbian/Montenegrin (Crna Gora focus)
- Contact info uses Montenegro format (+382, .me domain)
- Business services reflect local legal framework (APR registration, PDV, etc.)

## Key Integration Points

### Animation System
- `initJourneyAnimation()` handles the business timeline with auto-progression
- `IntersectionObserver` triggers section animations on 30% visibility
- All animations use CSS transitions, triggered by JavaScript class additions

### Form Integration
Contact form (`#contactForm`) expects backend integration for actual submission. Currently shows localized success messages and resets form.

### Image Placeholders
All images use `.image-placeholder` divs with descriptive text - ready for real asset replacement without layout changes.

## Business Context
AQ Accounting targets Montenegrin businesses needing bookkeeping, tax advice, and business consulting. Service pricing uses placeholder values and should be updated based on actual business requirements.
- Responsive breakpoints at 768px
- Responsive breakpoints at 768px
