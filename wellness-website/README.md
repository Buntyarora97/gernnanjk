# Holistic Wellness Practice - PHP Website

A complete, professional PHP website for a German Holistic Wellness Practitioner specializing in Human Energetics, Kinesiology, Mental Training, and Hypnosis Coaching.

## Features

- **Multilingual Support**: English, German, French with automatic language detection
- **3D Animated Hero Sections**: CSS 3D transforms with interactive TV and iPhone frames
- **Modern Wellness Aesthetics**: Sage green, soft cream, deep forest, accent gold color palette
- **GSAP Animations**: Scroll-triggered animations, parallax effects, smooth transitions
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **SEO Optimized**: Meta tags, structured data, multilingual hreflang tags
- **Legal Compliance**: Medical disclaimer, GDPR privacy policy, German/Austrian imprint

## Technology Stack

- **Backend**: PHP 8.2+ with MySQL database
- **Frontend**: HTML5, CSS3, JavaScript (GSAP for animations)
- **3D Elements**: CSS 3D transforms + Three.js ready
- **Animations**: GSAP (GreenSock), CSS animations, Intersection Observer

## Project Structure

```
wellness-website/
├── assets/
│   ├── css/
│   │   └── style.css          # Main stylesheet with design system
│   ├── js/
│   │   └── main.js            # Main JavaScript with animations
│   └── images/                # Website images
├── includes/
│   ├── functions.php          # Core functions, language handling
│   ├── header.php             # Header with navigation
│   └── footer.php             # Footer with scripts
├── languages/
│   ├── lang_en.php            # English translations
│   ├── lang_de.php            # German translations
│   └── lang_fr.php            # French translations
├── pages/
│   ├── index.php              # Home page with 3D TV frame
│   ├── suitable-for.php       # Who is my work suitable for?
│   ├── approach.php           # My Approach
│   ├── methods.php            # Methods (main service page)
│   ├── testimonials.php       # Experiences / Testimonials
│   ├── about.php              # About Me
│   └── legal.php              # Legal Notice & Disclaimer
├── database/
│   └── schema.sql             # MySQL database structure
└── index.php                  # Root redirect
```

## Installation

1. **Upload files to your web server** (PHP 8.2+ required)

2. **Create MySQL database** and import `database/schema.sql`:
   ```bash
   mysql -u username -p wellness_practice < database/schema.sql
   ```

3. **Configure database connection** (if needed for future features):
   Edit `includes/functions.php` to add database credentials

4. **Set file permissions**:
   ```bash
   chmod 755 -R wellness-website/
   chmod 777 -R wellness-website/assets/images/  # For uploads
   ```

## Language System

The website uses a PHP array-based localization system:

- Language files are in `/languages/` folder
- Current language is stored in session and cookie
- Auto-detection from browser language
- Manual switching via sidebar or URL parameter (`?lang=en`)

### Adding a New Language

1. Create `languages/lang_XX.php` (copy from existing)
2. Translate all values
3. Add language button to `includes/header.php`
4. Update `getCurrentLanguage()` function in `includes/functions.php`

## Customization

### Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
    --sage-green: #8B9A7B;
    --soft-cream: #F5F1E8;
    --deep-forest: #2C3E2D;
    --accent-gold: #D4AF37;
}
```

### Content

Edit language files in `/languages/` folder to update text content.

### Images

Replace images in `/assets/images/` folder. Recommended sizes:
- Hero images: 1920x1080px
- Method images: 800x600px
- Portrait: 600x800px

## 3D Frame Customization

### TV Frame
The 3D TV frame uses CSS transforms:
- Default rotation: `rotateY(-15deg) rotateX(5deg)`
- Floating animation: 6s ease-in-out infinite
- Edit in CSS: `.tv-frame`

### iPhone Frame
The 3D iPhone frame:
- Default rotation: `rotateY(15deg)`
- Floating animation: 5s ease-in-out infinite
- Edit in CSS: `.iphone-frame`

## Legal Compliance

The website includes all required elements for German/Austrian wellness practices:

- ✅ Medical disclaimer (no healing claims)
- ✅ Scope of practice definition
- ✅ Approved terminology only
- ✅ GDPR privacy policy
- ✅ Complete imprint with address, contact, VAT
- ✅ Professional liability insurance info

**Important**: Update placeholder information in:
- `languages/lang_*.php` - Contact details, address, VAT number
- `includes/functions.php` - Business information for structured data

## SEO Features

- Multilingual hreflang tags
- Schema.org LocalBusiness structured data
- Optimized meta titles and descriptions
- Semantic HTML5 structure
- Fast loading (lazy loading ready)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Minified CSS/JS ready
- Lazy loading for images
- WebP format support
- Passive event listeners for scroll

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support (`prefers-reduced-motion`)
- High contrast mode support

## License

This website template is provided for the Holistic Wellness Practice.
All rights reserved.

## Support

For technical support or customization requests, please contact the developer.

---

**Note**: This is a complete website template. Before going live:
1. Update all placeholder contact information
2. Add your actual business details
3. Replace placeholder images with your own
4. Set up the MySQL database
5. Test all functionality
6. Configure your web server (Apache/Nginx)
