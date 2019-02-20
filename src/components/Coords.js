export default class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  near(otherCoords) {
    return (Math.abs(this.x - otherCoords.x) + Math.abs(this.y - otherCoords.y)) === 1;
  }
  equal(otherCoords) {
    return this.x === otherCoords.x && this.y === otherCoords.y;
  }
  set(x, y) {
    this.x = x;
    this.y = y;
  }
};
