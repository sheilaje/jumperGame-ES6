class Jumper {
  constructor(positionX, positionY) {
    this.map = this.getMap(0);
    this.positionX = positionX;
    this.positionY = positionY;
  }

  getMap(level) {
    const star = "\u{2b50}";
    let rows = [];
    if(level === 0) {
      rows = ["........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              "........................................",
              ".......................................*",
              "......................................##",
              ".......................#............####",
              ".....................#####.......#######"];
    } else {
      rows = [".......", ".......", `${star}......`, "##.....", "####...", "#######"];
    }

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
    if((x < 0) || (y < 0) || (y > this.map.length)) {
      return false;
    }

    let row = this.getRow(y);
    if(x >= row.length) {
      return false;
    } else if(row[x] === "#") {
      return false;
    }

    return true;
  }

  fall(x, y) {
    if(this.canMove(x, y - 1)) {
      y = y - 1;
    }
    return [x, y];
  }

  move(moveX)
  {
    let x = this.positionX + moveX;
    let y = this.positionY;
    if(this.canMove(x, y)) {
      let position = this.fall(x, y);
      this.positionX = position[0];
      this.positionY = position[1];
    }
    return [this.positionX,this.positionY];
  }

  isBlock(x, y) {
    let row = this.getRow(y);
    return (row[x] === "#");
  }

  jump(jumpY)
  {
    let jumpX = 0;
    if(this.isBlock(this.positionX + 1, this.positionY)) {
      jumpX = 1;
    } else if(this.isBlock(this.positionX - 1, this.positionY)) {
      jumpX = -1;
    } else {
      jumpY = 0;
    }

    let x = this.positionX + jumpX;
    let y = this.positionY + jumpY;
    if(this.canMove(x,y)) {
      let position = this.fall(x, y);
      this.positionX = position[0];
      this.positionY = position[1];
    }
    return [this.positionX,this.positionY];
  }
}

export { Jumper };
