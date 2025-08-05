# AQ Accounting Website

A professional business consulting website with modern design and responsive layout.

## Project Structure

```
AQ Projekat/
├── public/                 # Public assets and main HTML
│   ├── index.html         # Main homepage
│   └── images/            # Image assets
├── src/                   # Source code
│   ├── css/               # Stylesheets
│   │   └── styles.css     # Main CSS file
│   ├── js/                # JavaScript files
│   │   └── script.js      # Main JavaScript functionality
│   └── pages/             # Additional HTML pages
│       ├── about-us.html  # About us page
│       └── service-listing.html # Services page
├── __tests__/             # Jest test files
├── node_modules/          # npm dependencies
├── package.json           # Project configuration
├── jest.config.json       # Jest test configuration
└── README.md             # This file
```

## Getting Started

### Prerequisites
- Node.js (for running tests)
- Python (for local development server)

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

### Development
1. Start the development server:
   ```bash
   npm run dev
   ```
   Or manually:
   ```bash
   cd public
   python -m http.server 8080
   ```

2. Open your browser and navigate to `http://localhost:8080`

### Testing
Run tests with:
```bash
npm test
```

## Features

- **Modern Design**: Clean, professional aesthetic with responsive layout
- **Multiple Hero Sections**: Three distinct hero sections with alternating layouts
- **Business Focus**: Financial consulting and strategy services
- **Interactive Elements**: Smooth animations and hover effects
- **Mobile Responsive**: Optimized for all device sizes

## Structure

- `index.html` - Main homepage with all sections
- `about-us.html` - About page
- `service-listing.html` - Services page
- `styles.css` - Complete styling and responsive design
- `script.js` - Interactive functionality and animations

## Sections

1. **Header** - Navigation with brand and menu
2. **Hero Section 1** - "Trusted Finance Consulting Partner"
3. **Hero Section 2** - "Executive Leader Through Change"
4. **Hero Section 3** - "Business Growth Through Finance"
5. **Guidance Section** - "Guiding Business Growth Through Expert Strategy"
6. **Smart Solutions** - "Advanced Tools And Features"
7. **Testimonials** - Client feedback section
8. **Footer** - Social media links

## Development

Built with vanilla HTML, CSS, and JavaScript for optimal performance and easy customization.

### Color Scheme
- Primary Blue: #2563eb
- Light Blue: #60a5fa
- Dark Gray: #1e293b
- Light Gray: #f8fafc

### Typography
- Font Family: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700

## Getting Started

1. Open `index.html` in your browser
2. Use Live Server extension in VS Code for development
3. Customize content and images as needed

## Notes

- Image placeholders are included for development
- No newsletter or popup functionality (as requested)
- All sections are ready for content updates
- Responsive design works on all screen sizes
