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
  let isOver = false;
  let jumper = new Jumper();
  jumper.nextLevel();

  let timer = 0;
  let board = document.getElementById("board");
  drawBoard(jumper, board);

  document.onkeydown = function(event) {
    if ((event.keyCode === 37) || (event.keyCode === 39)) {
      jumper.move((event.keyCode === 39) ? 1 : -1);
    } else if (event.keyCode === 38){
      jumper.jump();
    }
    drawBoard(jumper, board);
  }

  setInterval(() => {
    if(!isOver) {
      drawBoard(jumper,board);
      if(jumper.isDone) {
        if(jumper.nextLevel()) {
            $("#timer").text("");
            $("#score").text("Score: " + (1000000 / timer).toFixed(0));
            drawBoard(jumper, board);
            isOver = true;
          } else {
            timer = 0;
            $("#timer").text("Timer: " + timer);
          }
      } else {
        timer++;
        $("#timer").text("Timer: " + timer);
      }
    }
  }, 1000);

});
