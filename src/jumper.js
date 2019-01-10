class Jumper {
  constructor(mapLevel,positionX, positionY) {
    this.map = this.getMap(mapLevel);
    this.positionX = positionX;
    this.positionY = positionY;
    this.super = false;
    this.cherries = [true, true, true];
  }

  replaceChars(rows) {
    const sky = "\u2b1c";
    const block = "\u{2b1b}";
    const star = "\u{2b50}";
    const cherry = "\u{1f352}";

    for(let i = 0; i < rows.length; i++) {
      let chars = rows[i].split("");
      chars = chars.map((c) => {return (c === ".") ? sky : c});
      chars = chars.map((c) => {return (c === "#") ? block : c});
      chars = chars.map((c) => {return (c === "*") ? star : c});
      chars = chars.map((c) => {return (c === "0") ? (this.cherries[0] ? cherry : sky) : c });
      chars = chars.map((c) => {return (c === "1") ? (this.cherries[1] ? cherry : sky) : c });
      chars = chars.map((c) => {return (c === "2") ? (this.cherries[2] ? cherry : sky) : c });
      rows[i] = chars.join("");
    }
  }

  getMap(level) {
    let rows = [];
    if(level === 1) {
      rows = ["........................................",
              "........................................",
              "...........................######.......",
              "..............................#####.....",
              "#####.....###############........###....",
              "....#.......##############........###...",
              "....#.......###############..........###",
              "....#.######################........####",
              "....#.#######################..##..#####",
              "....#....................2.....#########",
              "....#........###########################",
              "....#.......##############..............",
              "...........################.............",
              "....###...##################............",
              "....###..####################...........",
              "....###....1...........................",
              "....############################........",
              "....#..............################.....",
              "....#...............###############.0...",
              "....#................##################.",
              "....#.................###############..#",
              "*...#.................................##",
              "#...#....................###############",
              "##..#............#######################",
              "###.#...################################",
              "########################################"];
    } else {
      rows = [".......",
              ".......",
              "*......",
              "##.@...",
              "####...",
              "#######"];
    }

    //this.replaceChars(rows);

    return rows;
  }

  setCharAt(str, index, value) {
    return str.substring(0, index) + value + str.substring(index + 1);
  }

  getRows() {
    const player = this.super ? "\u{1f9dc}" : "\u{1f6b6}";
    let rows = this.map.slice(0);
    let playerRow = rows.length - 1 - this.positionY;
    rows[playerRow] = this.setCharAt(rows[playerRow], this.positionX, player);

    this.replaceChars(rows);

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
      this.eat(x,y);
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

  eatCherry(index) {
    this.cherries[index] = false;
    this.super = true;
    setTimeout(() => { this.super = false; }, 3000);
    setTimeout(() => { this.cherries[index] = true;}, 10000);
  }

  eat(x,y)
  {
    let row = this.getRow(y);
    if((row[x] === "0") && this.cherries[0]) {
      this.eatCherry(0);
    } else if((row[x] === "1") && this.cherries[1]) {
      this.eatCherry(1);
    } else if((row[x] === "2") && this.cherries[2]) {
      this.eatCherry(2);
    }
  }
}

export { Jumper };
