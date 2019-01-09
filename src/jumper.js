class Jumper {
  constructor(positionX, positionY) {
    this.map = this.getMap();
    this.positionX = positionX;
    this.positionY = positionY;
  }

  getMap() {
    const star = "\u{2b50}";
    let rows = [".......", ".......", `${star}......`, "##.....", "####...", "#######"];
    return rows;
  }

  setCharAt(str, index, value) {
    return str.substring(0, index) + value + str.substring(index + 1);
  }

  getRows() {
    let rows = this.map.slice(0);
    let playerRow = rows.length - 1 - this.positionY;
    const player = "\u{1f6b6}";
    rows[playerRow] = this.setCharAt(rows[playerRow], this.positionX, player);
    return rows;
  }

  getRow(y) {
    let rowIndex = this.map.length - 1 - y;
    return this.map[rowIndex];
  }

  canMove(x, y) {
    let row = this.getRow(y);
    console.log(x, y, row);
    if(x < 0) {
      return false;
    } else if(x >= row.length) {
      return false;
    } else if(row[x] === "#") {
      return false;
    }
    return true;
  }

  move(moveX)
  {
    let x = this.positionX + moveX;
    let y = this.positionY;
    if(this.canMove(x, y)) {
      this.positionX = x;
      this.positionY = y;
    }
    return [this.positionX,this.positionY];
  }

  jump(jumpX, jumpY)
  {
    let x = this.positionX + jumpX;
    let y = this.positionY + jumpY;
    if(this.canMove(x,y)) {
      this.positionX = x;
      this.positionY = y;
    }
    return [this.positionX,this.positionY];
  }
}

export { Jumper };
