# Tamil History Timeline

A bilingual (Tamil/English) single-page scrollable timeline website depicting Tamil civilization from 1155 BCE to 2026 CE.

## Overview

This interactive timeline showcases:
- 27 curated historical entries spanning 3,181 years
- Bilingual content (English & தமிழ்)
- Archaeological findings, literary works, and historical events
- Literary quotes from Sangam literature
- Era-based color coding and navigation
- Scroll-based animations and progress tracking

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl (URL-based routing)
- **Fonts**: Noto Sans Tamil (optimized with next/font)
- **Deployment**: AWS (S3 + CloudFront + Route53)
- **IaC**: Terraform
- **CI/CD**: GitHub Actions

## Project Structure

```
tamil-history/
├── data/                    # Timeline data (timeline.json)
├── messages/                # i18n UI strings (en.json, ta.json)
├── public/                  # Static assets (fonts, images)
├── src/
│   ├── app/                 # Next.js App Router
│   │   └── [locale]/        # i18n routing (/en, /ta)
│   ├── components/          # React components
│   │   ├── layout/          # Header, Footer, LanguageToggle
│   │   ├── timeline/        # Timeline, Entry, EraMarker, Quote
│   │   └── ui/              # ProgressBar, ScrollToTop
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript definitions
├── infrastructure/          # Terraform modules (AWS)
└── tests/                   # Test files
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view:
- English: [http://localhost:3000/en](http://localhost:3000/en)
- Tamil: [http://localhost:3000/ta](http://localhost:3000/ta)

### Build

Create a production build:

```bash
npm run build
npm run start
```

### Static Export

Generate static HTML files for deployment:

```bash
npm run build
# Output: out/ directory
```

## Features

### Bilingual Support
- Toggle between English and Tamil (தமிழ்) at any time
- URL-based locale routing (`/en`, `/ta`)
- Separate translation files for UI and content

### Timeline Navigation
- Vertical scrolling timeline with era markers
- Scroll progress indicator
- Era-based color coding:
  - Pre-Sangam (1155-300 BCE)
  - Sangam Age (300 BCE - 300 CE)
  - Post-Sangam (300-600 CE)
  - Medieval (600-1800 CE)
  - Modern (1800-2026 CE)

### Content Types
- Archaeological discoveries
- Literary works
- Historical events
- Literary quotes with attribution
- Source citations and references

### Accessibility
- WCAG 2.1 AA compliant
- Screen reader support
- Keyboard navigation
- Semantic HTML structure
- `prefers-reduced-motion` support

## Deployment

### AWS Infrastructure

Deploy to AWS using Terraform:

```bash
cd infrastructure
terraform init
terraform plan
terraform apply
```

Infrastructure includes:
- S3 bucket for static hosting
- CloudFront CDN with SSL
- Route53 DNS (optional custom domain)
- GitHub Actions OIDC for CI/CD

### CI/CD Pipeline

Automated deployment on push to `main`:
1. Build Next.js static export
2. Sync to S3 bucket
3. Invalidate CloudFront cache

## Data

### Timeline Data Format

Timeline entries are stored in `data/timeline.json`:

```json
{
  "id": 1,
  "era": "PRE_SANGAM",
  "title": {
    "en": "Adichanallur Burial Site",
    "ta": "அதிச்சநல்லூர் புதைகுழி"
  },
  "date": {
    "year": -1155,
    "display": {
      "en": "1155 BCE",
      "ta": "கி.மு. 1155"
    }
  },
  "summary": {
    "en": "Iron Age burial site...",
    "ta": "இரும்புக் கால புதைகுழி..."
  }
}
```

### Translation Files

UI strings in `messages/`:
- `en.json` - English labels, buttons, navigation
- `ta.json` - Tamil translations

## Development Guidelines

1. **TypeScript**: All new code must be typed
2. **Bilingual**: Support both locales for user-facing text
3. **Accessibility**: Follow WCAG 2.1 AA guidelines
4. **Styling**: Use Tailwind CSS utility classes
5. **Components**: Place in appropriate subdirectory
6. **Testing**: Write tests for new features

## Contributing

1. Create a feature branch
2. Make your changes
3. Test in both locales (EN, TA)
4. Run `npm run build` to verify
5. Submit a pull request

## License

[Your license here]

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Noto Sans Tamil](https://fonts.google.com/noto/specimen/Noto+Sans+Tamil)

---

*Built with Next.js 14 • Powered by AWS • Bilingual by Design*
