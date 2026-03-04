# Bilingual Timeline Data Migration Guide

## Overview

This document describes the bilingual data structure for the Tamil History Timeline and provides guidance for migrating the existing `timeline.json` to support both English and Tamil languages.

## Data Structure

### BilingualText Type

All user-facing text fields should support the `BilingualText` structure:

```typescript
interface BilingualText {
  en: string;
  ta: string;
}
```

### Fields Requiring Bilingual Support

The following fields in `timeline.json` require bilingual conversion:

#### Timeline Entry Level
- `title` - Entry title
- `summary` - Entry summary/description
- `keyFindings[]` - Array of key findings
- `date.display` - Human-readable date display
- `date.contestedClaim.claim` - Contested date claim text
- `date.contestedClaim.issue` - Description of the dating issue
- `location.site` - Site name
- `location.district` - District name
- `location.state` - State/region name
- `literaryPairing.work` - Literary work name
- `literaryPairing.relevance` - Relevance description
- `quote.text` - Quote text
- `quote.source` - Source text
- `quote.author` - Author name (if not null)
- `quote.context` - Context description
- `sources[].title` - Source title

#### Global Level
- `eras[key].name` - Era names
- `typeDefinitions[key]` - Type descriptions

## Migration Strategy

### Phase 1: Backward Compatible Structure (CURRENT)

Keep the existing `timeline.json` as-is with English-only content. TypeScript types support both `BilingualText` and `string` through union types:

```typescript
title: BilingualText | string;
```

This allows gradual migration without breaking existing code.

### Phase 2: Incremental Migration

Migrate entries one by one or in batches:

1. Start with high-impact entries (Pre-Sangam, Sangam era)
2. Convert string fields to BilingualText objects
3. Add Tamil translations
4. Validate against TypeScript types

### Phase 3: Full Bilingual Support

Once all entries are migrated:
- Replace `timeline.json` with fully bilingual version
- Update TypeScript types to require `BilingualText` (remove `| string` union)
- Implement language switching UI

## Example Migration

### Before (English only)
```json
{
  "title": "Sivagalai Iron Age Settlement",
  "summary": "Iron Age settlement with 160 urn burials..."
}
```

### After (Bilingual)
```json
{
  "title": {
    "en": "Sivagalai Iron Age Settlement",
    "ta": "சிவகலை இரும்பு யுக குடியேற்றம்"
  },
  "summary": {
    "en": "Iron Age settlement with 160 urn burials...",
    "ta": "முன்னேறிய நாகரிகத்தை வெளிப்படுத்தும் 160 கலச புதைகுழிகளுடன்..."
  }
}
```

## Reference Files

- **Type Definitions**: `src/types/timeline.ts`
- **Example Bilingual Data**: `data/timeline.bilingual.example.json`
- **English UI Strings**: `src/translations/en.json`
- **Tamil UI Strings**: `src/translations/ta.json`

## Helper Functions

The TypeScript types include helper functions for working with bilingual data:

```typescript
// Check if a value is BilingualText
function isBilingualText(value: any): value is BilingualText

// Get localized text based on current locale
function getLocalizedText(text: BilingualText | string, locale: Locale): string
```

## UI Translation Strings

Separate from the timeline data, UI strings (buttons, labels, navigation) are stored in:
- `src/translations/en.json` - English UI strings
- `src/translations/ta.json` - Tamil UI strings

These use a different structure optimized for UI internationalization.

## Migration Checklist

- [x] Create TypeScript type definitions with BilingualText support
- [x] Create English UI translation file (en.json)
- [x] Create Tamil UI translation file (ta.json)
- [x] Create example bilingual timeline structure
- [ ] Set up i18n library (next-intl or react-i18next)
- [ ] Implement language toggle component
- [ ] Create migration script to convert timeline.json
- [ ] Translate all 27 timeline entries to Tamil
- [ ] Validate all translations with native speakers
- [ ] Update components to use getLocalizedText helper
- [ ] Test language switching functionality
- [ ] Update documentation

## Translation Guidelines

### Timeline Content Translation
- Maintain scholarly accuracy
- Preserve technical terms in original language with explanations
- Use standard Tamil transliteration for place names
- Consult Tamil historical texts for authentic terminology

### UI String Translation
- Use clear, modern Tamil
- Keep button labels concise (2-3 words max)
- Maintain consistency with Tamil Nadu government terminology
- Test with various screen sizes for text length

## Next Steps

1. **Immediate**: Current structure supports both formats (backward compatible)
2. **Short-term**: Implement i18n in React components
3. **Medium-term**: Translate first 5-10 entries for testing
4. **Long-term**: Complete full migration and remove backward compatibility

## Notes

- The example file (`timeline.bilingual.example.json`) shows the first 2 entries fully translated
- Translation work should be done by someone fluent in both English and Tamil
- Archaeological and technical terms may need consultation with Tamil scholars
- Consider creating a translation glossary for consistency
