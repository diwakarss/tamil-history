# Tamil History Timeline - Architecture

## Project Structure

```
tamil-history/
├── .github/
│   └── workflows/                   # CI/CD pipeline definitions
├── .planning/                       # Planning artifacts (not deployed)
│   ├── phases/                      # Phase-specific planning documents
│   └── research/                    # Research materials
├── data/                            # Timeline data and configuration
│   ├── timeline.json               # 27+ timeline entries (bilingual)
│   ├── timeline.bilingual.example.json  # Template for bilingual entries
│   └── BILINGUAL_MIGRATION.md       # Migration guide for bilingual data
├── messages/                        # i18n UI strings (next-intl)
│   ├── en.json                     # English UI strings
│   └── ta.json                     # Tamil UI strings
├── public/                          # Static assets (deployed)
│   ├── fonts/                      # Custom font files
│   └── images/                     # Images (sites, artifacts, maps)
├── src/                             # Application source code
│   ├── app/                        # Next.js App Router
│   │   ├── [locale]/               # Locale-based routing (en, ta)
│   │   │   ├── layout.tsx          # Locale-specific layout
│   │   │   └── page.tsx            # Locale-specific home page
│   │   ├── layout.tsx              # Root layout wrapper
│   │   └── page.tsx                # Root redirect page
│   ├── components/                 # React components (organized by feature)
│   │   ├── layout/                 # Header, Footer, LanguageToggle
│   │   ├── timeline/               # Timeline-related components
│   │   └── ui/                     # Reusable utility components
│   ├── fonts/                      # Font configuration (next/font)
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # Utility functions and helpers
│   ├── types/                      # TypeScript type definitions
│   │   └── timeline.ts             # Timeline data types
│   ├── i18n.ts                     # Internationalization setup
│   └── middleware.ts               # Next.js middleware (i18n routing)
├── infrastructure/                  # Infrastructure as Code (Terraform)
│   └── modules/                    # Reusable Terraform modules
│       ├── s3-website/             # S3 static site hosting
│       ├── cloudfront/             # CloudFront CDN distribution
│       ├── route53/                # Route53 DNS management
│       └── github-oidc/            # GitHub OIDC authentication
├── tests/                          # Test files
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # Git ignore rules
├── next.config.mjs                 # Next.js configuration
├── postcss.config.mjs              # PostCSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Project dependencies and scripts
├── package-lock.json               # Locked dependency versions
├── ARCHITECTURE.md                 # This file
├── CLAUDE.md                       # Development guidelines
└── README.md                       # Project documentation
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Fonts**: Noto Sans Tamil (via next/font)
- **Deployment**: AWS (S3 + CloudFront + Route53)
- **IaC**: Terraform
- **CI/CD**: GitHub Actions

## Component Architecture

Components in `src/components/` are organized by feature/domain to support scalability and maintainability.

### Directory Organization

- **`layout/`** - Layout components: Header, Footer, LanguageToggle
- **`timeline/`** - Timeline feature components: Timeline, TimelineEntry, EraMarker, DateBadge, Quote, SourcesList
- **`ui/`** - Reusable utility components: ProgressBar, ScrollToTop

### Design Standards

All components adhere to these standards:

- **Type Safety** - Full TypeScript typing for interfaces, props, and return types
- **Bilingual Support** - Use `BilingualText` interface for all user-facing content
- **Functional Components** - React hooks for state management and side effects
- **Styling** - Tailwind CSS utilities exclusively; no inline styles or external CSS files

## Data Schema

All data types are defined in `src/types/timeline.ts` and used consistently throughout the application.

### TimelineEntry

Main data structure representing a timeline event:

```typescript
interface TimelineEntry {
  id: number;                          // Unique identifier
  era: EraKey;                         // Historical era classification
  title: BilingualText;                // Event title (EN + TA)
  date: {
    year: number;                      // Year of event
    display: BilingualText;            // Formatted date display
    rangeEnd?: number;                 // End year for date ranges
    confidence: ConfidenceLevel;       // Historical certainty level
  };
  location: {
    site: BilingualText;               // Archaeological/historical site
    district: string;                  // Administrative district
    state: string;                     // State/region
  };
  type: EntryType;                     // Event type (archaeological, royal, etc.)
  summary: BilingualText;              // Event description
  keyFindings: BilingualText[];        // Important discoveries and facts
  quote?: {
    text: BilingualText;               // Literary or historical quote
    source: string;                    // Original source reference
    author?: BilingualText;            // Quote author
    translator?: string;               // Translator name (if applicable)
  };
  sources: Source[];                   // References and citations
}
```

### BilingualText

Text representation in both English and Tamil:

```typescript
interface BilingualText {
  en: string;  // English text
  ta: string;  // Tamil text (தமிழ்)
}
```

### Data Files

- **`data/timeline.json`** - Production timeline data (27+ bilingual entries)
- **`data/timeline.bilingual.example.json`** - Template for adding new entries
- **`data/BILINGUAL_MIGRATION.md`** - Guide for data updates and migrations

## Internationalization (i18n)

The application supports two locales with complete bilingual coverage:

### Supported Locales

- **`en`** - English
- **`ta`** - Tamil (தமிழ்)

### URL Structure

- `/en` - English language version
- `/ta` - Tamil language version

### Translation Files

- **`messages/en.json`** - UI strings for buttons, labels, and navigation (English)
- **`messages/ta.json`** - UI strings for buttons, labels, and navigation (Tamil)
- **`data/timeline.json`** - Timeline event content with bilingual text (EN + TA)
- **`src/i18n.ts`** - i18n library configuration and locale setup
- **`src/middleware.ts`** - Locale detection and routing middleware

## Build & Deployment

### Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The application runs at `http://localhost:3000` with hot-reload enabled for rapid development.

### Production Build

Build the application for production:

```bash
npm run build
npm run start
```

This builds an optimized Next.js application for production deployment.

### Static Export

Generate static HTML files for CDN deployment:

```bash
npm run build
# Output: ./out/ directory (ready for S3/CloudFront)
```

This produces pre-rendered HTML suitable for static hosting on S3 with CloudFront CDN.

### Infrastructure Deployment

Deploy AWS infrastructure using Terraform:

```bash
cd infrastructure
terraform init   # Initialize Terraform workspace
terraform plan   # Preview changes before deployment
terraform apply  # Deploy infrastructure to AWS
```

This provisions:
- **S3** - Static website hosting and asset storage
- **CloudFront** - Global CDN distribution with edge caching
- **Route53** - DNS management and domain routing
- **GitHub OIDC** - Provider for CI/CD authentication without long-lived secrets

## Accessibility Standards

The project adheres to modern web accessibility best practices:

- **WCAG 2.1 AA Compliance** - Meets international accessibility guidelines
- **Semantic HTML** - Proper use of heading, nav, article, and section elements
- **ARIA Attributes** - Screen reader annotations for complex interactive components
- **Keyboard Navigation** - Full keyboard support without mouse dependency
- **Motion Preferences** - Respects `prefers-reduced-motion` user preference
- **Bilingual Support** - Proper language tagging for English and Tamil content

## Performance Optimization

The application employs multiple optimization strategies for speed and efficiency:

- **Static Site Generation (SSG)** - Pages pre-rendered at build time for instant delivery
- **Image Optimization** - Lazy loading and WebP format conversion for reduced file sizes
- **Font Subsetting** - Custom Tamil character subsets minimize font file sizes
- **CDN Distribution** - CloudFront global edge locations for low-latency content delivery
- **Code Splitting** - Next.js automatic code splitting minimizes JavaScript bundles
- **Asset Caching** - Immutable assets with versioned filenames for optimal browser caching

## Development Guidelines

### Code Quality Standards

- **TypeScript** - All components and utilities must have complete TypeScript typing
- **Styling** - Tailwind CSS utilities exclusively; no inline styles or external CSS
- **Organization** - Use feature-based directory structure (e.g., `components/timeline/`)
- **Testing** - Write tests for critical components, utilities, and business logic

### Bilingual Support Requirements

- **UI Strings** - All user-facing text must support EN and TA via i18n
- **Data Types** - Use `BilingualText` interface for all translatable content
- **Testing** - Verify both EN and TA locales render correctly without layout issues

### Accessibility Standards

- **Semantic HTML** - Use meaningful HTML elements (heading, nav, article, section, etc.)
- **ARIA Labels** - Provide descriptive labels for interactive elements and screen readers
- **Keyboard Navigation** - Ensure all features are fully keyboard accessible

### Performance Best Practices

- **Code Splitting** - Use Next.js dynamic imports for large or heavy components
- **Image Optimization** - Use `next/image` for automatic format and size optimization
- **Bundle Management** - Prefer Tailwind utilities over inline styles for smaller bundles

## Configuration Files

### Framework & Build Configuration

- **`next.config.mjs`** - Next.js configuration: i18n setup, output mode, build optimization
- **`tsconfig.json`** - TypeScript compiler settings and path aliases
- **`tailwind.config.ts`** - Tailwind CSS theme, colors, and custom utilities
- **`postcss.config.mjs`** - PostCSS configuration with Tailwind CSS plugin

### Development & Quality

- **`package.json`** - Project dependencies, scripts, and metadata
- **`.eslintrc.json`** - ESLint rules for code quality and style enforcement
- **`README.md`** - Project documentation and getting started guide
- **`CLAUDE.md`** - Development guidelines and best practices

### Internationalization & Data Files

- **`src/i18n.ts`** - i18n library configuration and locale setup
- **`src/middleware.ts`** - Next.js middleware for locale detection and routing
- **`messages/en.json`** - English UI string translations
- **`messages/ta.json`** - Tamil UI string translations
- **`data/timeline.json`** - Timeline events with bilingual content (EN + TA)

---

*Last updated: 2026-02-27*
