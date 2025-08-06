export function levenshtein(word1: string, word2: string): number {
    const lenWord1 = word1.length;
    const lenWord2 = word2.length;

    const dp: number[][] = Array(lenWord1 + 1).fill(null).map(() => Array(lenWord2 + 1).fill(0));

    for (let j = 0; j <= lenWord2; j++) {
        dp[0][j] = j;
    }
    for (let i = 0; i <= lenWord1; i++) {
        dp[i][0] = i;
    }

    for (let i = 1; i <= lenWord1; i++) {
        for (let j = 1; j <= lenWord2; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
            else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }


    return dp[lenWord1][lenWord2];


}