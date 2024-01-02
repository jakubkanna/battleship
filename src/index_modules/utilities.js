//search

function areCoordinatesEqual(coord1, coord2) {
  return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}

function matchCoord(coord, list) {
  return list.some((element) => areCoordinatesEqual(element, coord));
}

//generate

function randomCoord() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return [x, y];
}

function randomAxis() {
  const axis = ["x", "y"];
  const randomIndex = Math.floor(Math.random() * axis.length);
  return axis[randomIndex];
}

//

export { matchCoord, randomCoord, randomAxis };
