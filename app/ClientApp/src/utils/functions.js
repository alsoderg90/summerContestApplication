export const getUserPoints = (points, id) => {
  return points
    ?.filter((point) => point.memberId === id)
    ?.map((point) => point.points)
    ?.reduce((a, b) => a + b, 0)
}

export const getTeamPoints = (members) => {
  return members
    .map((member) => getUserPoints(member.points, member.id))
    .reduce((a, b) => a + b, 0)
}
