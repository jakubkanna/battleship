function areCoordinatesEqual(coord1, coord2) {
  return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}

function matchCoord(coord, list) {
  return list.some((element) => areCoordinatesEqual(element, coord));
}
export { matchCoord };
