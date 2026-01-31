/**
 * Pattern Matcher Utility
 * Provides fuzzy string matching for chatbot intent detection
 */

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching to handle typos and variations
 */
export const levenshteinDistance = (str1: string, str2: string): number => {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix: number[][] = [];

    // Initialize matrix
    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    // Fill matrix
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // deletion
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j - 1] + cost // substitution
            );
        }
    }

    return matrix[len1][len2];
};

/**
 * Calculate similarity score between two strings (0-1)
 * Higher score = more similar
 */
export const calculateSimilarity = (str1: string, str2: string): number => {
    const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
    const maxLength = Math.max(str1.length, str2.length);
    return maxLength === 0 ? 1 : 1 - distance / maxLength;
};

/**
 * Check if input matches pattern with fuzzy logic
 * @param input - User input string
 * @param pattern - Pattern to match against
 * @param threshold - Minimum similarity threshold (default 0.7)
 * @returns Match score (0-1)
 */
export const fuzzyMatch = (
    input: string,
    pattern: string,
    threshold: number = 0.7
): number => {
    const normalizedInput = input.toLowerCase().trim();
    const normalizedPattern = pattern.toLowerCase().trim();

    // Exact match
    if (normalizedInput === normalizedPattern) {
        return 1.0;
    }

    // Contains match
    if (normalizedInput.includes(normalizedPattern)) {
        return 0.95;
    }

    if (normalizedPattern.includes(normalizedInput)) {
        return 0.9;
    }

    // Word-level matching
    const inputWords = normalizedInput.split(/\s+/);
    const patternWords = normalizedPattern.split(/\s+/);

    let wordMatches = 0;
    let totalWords = patternWords.length;

    for (const patternWord of patternWords) {
        for (const inputWord of inputWords) {
            const similarity = calculateSimilarity(inputWord, patternWord);
            if (similarity >= threshold) {
                wordMatches++;
                break;
            }
        }
    }

    const wordMatchScore = totalWords > 0 ? wordMatches / totalWords : 0;

    // Sentence-level similarity
    const sentenceSimilarity = calculateSimilarity(normalizedInput, normalizedPattern);

    // Combined score (weighted)
    return Math.max(wordMatchScore * 0.6 + sentenceSimilarity * 0.4, sentenceSimilarity);
};

/**
 * Find best matching patterns from a list
 * @param input - User input
 * @param patterns - Array of patterns to match against
 * @param threshold - Minimum match threshold
 * @returns Best match with score, or null if no good match
 */
export const findBestMatch = (
    input: string,
    patterns: string[],
    threshold: number = 0.6
): { pattern: string; score: number } | null => {
    let bestMatch: { pattern: string; score: number } | null = null;

    for (const pattern of patterns) {
        const score = fuzzyMatch(input, pattern, threshold);
        if (score >= threshold && (!bestMatch || score > bestMatch.score)) {
            bestMatch = { pattern, score };
        }
    }

    return bestMatch;
};

/**
 * Check if input contains any emergency keywords
 */
export const containsEmergencyKeywords = (input: string, keywords: string[]): boolean => {
    const normalized = input.toLowerCase();
    return keywords.some(keyword => normalized.includes(keyword.toLowerCase()));
};

/**
 * Extract keywords from input based on entity list
 */
export const extractEntities = (
    input: string,
    entityLists: Record<string, string[]>
): Record<string, string[]> => {
    const normalized = input.toLowerCase();
    const extracted: Record<string, string[]> = {};

    for (const [entityType, entities] of Object.entries(entityLists)) {
        const found: string[] = [];
        for (const entity of entities) {
            if (normalized.includes(entity.toLowerCase())) {
                found.push(entity);
            }
        }
        if (found.length > 0) {
            extracted[entityType] = found;
        }
    }

    return extracted;
};
