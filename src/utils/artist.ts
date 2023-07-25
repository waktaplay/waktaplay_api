function findGroupAliases(query: string): string {
  if (
    [
      '이세계아이돌',
      '이세돌',
      'isegyeidol',
      'isekaidol',
      'isekaiidol',
      'isedol',
    ].includes(query.toLowerCase())
  ) {
    return 'isedol'
  }

  if (['고정멤버', '고멤', 'gomem'].includes(query.toLowerCase())) {
    return 'gomem'
  }

  if (
    ['아카데미', 'gomem-academy', 'academy'].includes(
      query.toLowerCase(),
    )
  ) {
    return 'gomem-academy'
  }

  return query
}

export { findGroupAliases }
