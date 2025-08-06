import { levenshtein } from './levenshtein';
import { useMemo } from 'react'

export interface FuzzySearchOptions {
    threshold?: number;
    limit?: number;
    caseSensitive?: boolean;
}

export interface FuzzySearchResult {
    item: string;
    score: number;
    distance: number;
}

export interface useFuzzySearchReturn {
    search: (query: string) => FuzzySearchResult[];
}

export function useFuzzySearch(items: string[], options: FuzzySearchOptions = {}): useFuzzySearchReturn {
    const {
        threshold = 0.6,
        limit,
        caseSensitive = false
    } = options;

    const stableItems = useMemo(() => items, [items.join('\x00')]);

    const stableOptions = useMemo(() => ({
        threshold,
        limit,
        caseSensitive
    }), [threshold, limit, caseSensitive]);

    const search = useMemo(() => {

        return (query: string): FuzzySearchResult[] => {
            if (!query.trim()) return [];
            const normalizedQuery: string = caseSensitive ? query : query.toLowerCase();
            const results: FuzzySearchResult[] = [];

            stableItems.forEach((item: string) => {
                const text: string = caseSensitive ? item : item.toLowerCase();
                const distance: number = levenshtein(normalizedQuery, text);
                const maxLength: number = Math.max(normalizedQuery.length, text.length);
                const score: number = distance / maxLength;

                if (score <= threshold) {
                    results.push({ item, score, distance })
                }
            });

            results.sort((a, b) => a.score - b.score);
            return limit ? results.slice(0, limit) : results;
        };
    }, [stableItems, stableOptions]);

    return { search };
}

export { levenshtein } from './levenshtein';