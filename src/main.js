'use strict';

import { Jumper } from './jumper.js';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function drawBoard(board, rows) {
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
  let rows = jumper.getRows();
  drawBoard(board, rows);

  document.onkeydown = function(event) {
    if (event.keyCode === 37) {
      jumper.move(-1);
      let rows = jumper.getRows();
      drawBoard(board, rows);
    }

    console.log("key", event.keyCode);
  }
});
