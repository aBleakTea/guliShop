var longestCommonSubsequence = function (text1, text2) {
  let arr1 = text1.split('')
  let arr2 = text2.split('')
  let len1 = arr1.length
  let len2 = arr2.length

  let dp = new Array(len2 + 1).fill(0).map(() => new Array(len1 + 1).fill(0))
  let res = 0

  for (let i = 1; i < len2 + 1; i++) {
    for (let j = 1; j < len1 + 1; j++) {
      if (arr2[i - 1] === arr1[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return res[len2][len1]
}

longestCommonSubsequence('abcde', 'ace')
