class Jumper {
  constructor(positionX, positionY) {
    this.map = ["       ", "       ", "\u{2b50}      ", "##     ", "####  ", "#######"];
    this.positionX = positionX;
    this.positionY = positionY;
  }

  setCharAt(str, index, value) {
    return str.substring(0, index) + value + str.substring(index + 1);
  }

  getRows() {
    let rows = this.map.slice(0);
    let personRow = rows.length - 1 - this.positionY;
    rows[personRow] = this.setCharAt(rows[personRow], this.positionX, "\u{1f6b6}");
    console.log("pr", rows[personRow]);
    return rows;
  }

  move(movingSpace)
  {
    this.positionX = this.positionX + movingSpace;
    return this.positionX;
  }
}

export { Jumper };
