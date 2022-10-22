export const getUserPoints = (points, id) => {
  return points
    ?.filter((point) => point.memberId === id)
    .map((point) => point.points)
    ?.reduce((a, b) => a + b, 0)
}
