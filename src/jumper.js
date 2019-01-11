class Jumper {
  constructor() {
    this.mapLevel = 0;
    this.map = this.getMap(this.mapLevel);
    this.positionX = 4;
    this.positionY = 1;
    this.super = false;
    this.cherries = [true, true, true,true,true,true];
    this.isDone = false;
  }

  nextLevel() {
    this.mapLevel++;
    this.map = this.getMap(this.mapLevel);
    this.isDone = false;
    if(this.mapLevel === 1) {
      this.positionX = 5;
      this.positionY = 1;
    } else if(this.mapLevel === 2) {
      this.positionX = 0;
      this.positionY = 1;
    } else if(this.mapLevel === 3) {
      this.positionX = 2;
      this.positionY = 1;
    }
    if(this.mapLevel == 3) {
      return true;
    }
    return false;
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
      chars = chars.map((c) => {return (c === "3") ? (this.cherries[3] ? cherry : sky) : c });
      chars = chars.map((c) => {return (c === "4") ? (this.cherries[4] ? cherry : sky) : c });
      chars = chars.map((c) => {return (c === "5") ? (this.cherries[5] ? cherry : sky) : c });
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
              "....#.######################...##..#####",
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
              "....#.................................##",
              "*...#....................###############",
              "#...#............#######################",
              "##..#...################################",
              "########################################"];
    } else if(level === 2) {
      rows = ["........................................",
	            "........................................",
	            "........................................",
      	      "*......................................5",
	            "################################...#####",
	            "###########################......#######",
	            "##########################.#############",
	            "#########################.##############",
	            "##########...........###.###############",
	            "######.....#########.##.#.............##",
	            "#####..#############.#.##.###########..#",
	            "####..#...##......##..###.#########...2#",
	            "###..#.##.##.###..#######.########..####",
	            "##..##.##.##.###.........3#######..#####",
	            "##.###.##.##.###################..######",
	            "##...........##################..#######",
	            "####...#######################..########",
	            "#####..##......######..........#########",
	            "#####4.##..............#################",
	            ".....########....#######################",
	            "..##.########.##########################",
	            ".0##...............1####################",
              "########################################"];
            } else if(level === 3) {
      rows = ["########################################",
              "########################################",
              "##....#...#.###.#...##...#.#.#...#....##",
              "##.####.#.#..#..#.####.#.#.#.#.###.##.##",
              "##.#..#...#.#.#.#...##.#.#.#.#...#....##",
              "##.##.#.#.#.###.#.####.#.##.##.###.#.###",
              "##....#.#.#.###.#...##...##.##...#.##.##",
              "########################################"];
      } else {
      rows = [".......",
              ".......",
              "*......",
              "##.....",
              "####..1",
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
    return y;
  }

  updatePlayer(x, y) {
    y = this.fall(x, y);
    this.eat(x, y);
    this.isDone = this.checkDone(x,y);
    this.positionX = x;
    this.positionY = y;
  }

  move(moveX)
  {
    let x = this.positionX;
    let y = this.positionY;
    if(this.isBlock(x, y - 1)) {
      x += moveX;
    }
    if(this.canMove(x, y)) {
      this.updatePlayer(x, y);
    }
    return [this.positionX,this.positionY];
  }

  isBlock(x, y) {
    let row = this.getRow(y);
    return (row[x] === "#");
  }

  canJump(x, y) {
    return this.isBlock(this.positionX + x, this.positionY + y - 1);
  }

  jump()
  {
    let jumpX = 0;
    let jumpY = 0;

    if(this.super) {
      if(this.canJump(1, 2)) {
        jumpX = 1;
        jumpY = 2;
      }
      if((jumpY == 0) && this.canJump(-1, 2)) {
        jumpX = -1;
        jumpY = 2;
      }
    }

    if(jumpY == 0) {
      if(this.canJump(1, 1)) {
        jumpX = 1;
        jumpY = 1;
      } else if(this.canJump(-1, 1)) {
        jumpX = -1;
        jumpY = 1;
      }
    }

    let x = this.positionX + jumpX;
    let y = this.positionY + jumpY;
    if(this.canMove(x,y)) {
      this.updatePlayer(x, y);
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
    } else if((row[x] === "3") && this.cherries[3]) {
      this.eatCherry(3);
    } else if((row[x] === "4") && this.cherries[4]) {
      this.eatCherry(4);
    }else if((row[x] === "5") && this.cherries[5]) {
      this.eatCherry(5);
    }
  }

  checkDone(x,y)
  {
    let row = this.getRow(y);
    return (row[x] === "*");
  }
}

export { Jumper };
