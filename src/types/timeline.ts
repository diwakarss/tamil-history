/**
 * Timeline Data Schema Types
 * Tamil History Timeline - Bilingual Support
 */

// Bilingual text wrapper
export interface BilingualText {
  en: string;
  ta: string;
}

// Coordinate type
export interface Coordinates {
  lat: number;
  lng: number;
}

// Location information
export interface Location {
  site: BilingualText | string;
  district: BilingualText | string | null;
  state: BilingualText | string | null;
  coordinates: Coordinates | null;
}

// Contested date claim
export interface ContestedClaim {
  exists: boolean;
  claim: BilingualText | string;
  issue: BilingualText | string;
}

// Date information
export interface DateInfo {
  year: number;
  display: BilingualText | string;
  rangeEnd: number | null;
  confidence: 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW' | 'CONTESTED';
  contestedClaim: ContestedClaim | null;
}

// Literary pairing
export interface LiteraryPairing {
  work: BilingualText | string;
  relevance: BilingualText | string;
}

// Quote information
export interface Quote {
  text: BilingualText | string;
  source: BilingualText | string;
  author: BilingualText | string | null;
  translator: string | null;
  context: BilingualText | string;
}

// Source reference
export interface Source {
  type: 'official' | 'academic' | 'news' | 'reference' | 'digital' | 'critical';
  url: string;
  title: BilingualText | string;
}

// Timeline entry type
export type EntryType =
  | 'ARCHAEOLOGICAL'
  | 'LITERARY'
  | 'POLITICAL'
  | 'ARCHITECTURAL'
  | 'MILITARY'
  | 'FOREIGN_INSCRIPTION'
  | 'CULTURAL';

// Era type
export type EraType =
  | 'PRE_SANGAM'
  | 'SANGAM'
  | 'POST_SANGAM'
  | 'PALLAVA'
  | 'CHOLA'
  | 'PANDYA_REVIVAL'
  | 'NAYAK'
  | 'COLONIAL'
  | 'MODERN';

// Timeline entry
export interface TimelineEntry {
  id: number;
  era: EraType;
  title: BilingualText | string;
  date: DateInfo;
  location: Location;
  type: EntryType;
  summary: BilingualText | string;
  keyFindings: (BilingualText | string)[];
  literaryPairing: LiteraryPairing | null;
  quote: Quote | null;
  additionalQuotes?: Quote[];
  sources: Source[];
  image: string | null;
  tags: string[];
}

// Era definition
export interface Era {
  name: BilingualText | string;
  start: number;
  end: number;
  color: string;
}

// Date range for metadata
export interface DateRange {
  earliest: number;
  latest: number;
}

// Statistics by category
export interface Statistics {
  totalEntries: number;
  byEra: Record<EraType, number>;
  byType: Record<EntryType, number>;
  withQuotes: number;
  withContestedDates: number;
}

// Metadata
export interface TimelineMeta {
  version: string;
  generated: string;
  totalStops: number;
  dateRange: DateRange;
  confidenceLevels: string[];
}

// Type definitions
export type TypeDefinitions = Record<EntryType, BilingualText | string>;

// Main timeline data structure
export interface TimelineData {
  $schema?: string;
  meta: TimelineMeta;
  timeline: TimelineEntry[];
  eras: Record<EraType, Era>;
  typeDefinitions: TypeDefinitions;
  statistics: Statistics;
}

// Locale type
export type Locale = 'en' | 'ta';

// Helper type guards
export function isBilingualText(value: unknown): value is BilingualText {
  return typeof value === 'object' && value !== null && 'en' in value && 'ta' in value;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Helper function to get localized text
export function getLocalizedText(
  text: BilingualText | string,
  locale: Locale
): string {
  if (isBilingualText(text)) {
    return text[locale];
  }
  return text;
}
