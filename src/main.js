'use strict';

import { Jumper } from './jumper.js';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function drawBoard(jumper, board) {
  let rows = jumper.getRows();
  board.innerHTML = "";
  rows.forEach(row => {
    let rowP = document.createElement("p");
    rowP.innerHTML = row;
    board.appendChild(rowP);
  });
}

$(document).ready(function() {
  let jumper = new Jumper(6,1);

  let board = document.getElementById("board");
  drawBoard(jumper, board);

  document.onkeydown = function(event) {
    if ((event.keyCode === 37) || (event.keyCode === 39)) {
      jumper.move((event.keyCode === 39) ? 1 : -1);
    } else if (event.keyCode === 38){
      jumper.jump(1);
    }
    drawBoard(jumper, board);
  }
});
