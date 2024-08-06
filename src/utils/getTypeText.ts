export const getTypeText = (type) => {
  return type === 'strategy'
    ? '투자전략'
    : type === 'feedback'
      ? '전략피드백'
      : '자유양식'
}
