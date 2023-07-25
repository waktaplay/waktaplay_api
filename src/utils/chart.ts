interface IChartCalculation {
  id: string
  views: number
}

function calculateRankingChanges(
  previousData: IChartCalculation[],
  currentData: IChartCalculation[],
): Map<string, number> {
  const previousRankings = new Map<string, number>()
  const currentRankings = new Map<string, number>()
  const rankingChanges = new Map<string, number>()

  // 이전 집계 데이터를 조회수를 기준으로 내림차순으로 정렬하여 순위를 계산
  previousData
    .sort((a, b) => b.views - a.views)
    .map((song, index) => {
      previousRankings.set(song.id, index + 1)
    })

  // 현재 집계 데이터를 조회수를 기준으로 내림차순으로 정렬하여 순위를 계산
  currentData
    .sort((a, b) => b.views - a.views)
    .map((song, index) => {
      currentRankings.set(song.id, index + 1)
    })

  // 이전 집계와 현재 집계의 순위를 비교하여 변동량을 계산
  for (const [key, currentRank] of currentRankings) {
    const previousRank = previousRankings.get(key)
    if (previousRank !== undefined) {
      rankingChanges.set(key, previousRank - currentRank)
    }
  }

  return rankingChanges
}

export { calculateRankingChanges, type IChartCalculation }
