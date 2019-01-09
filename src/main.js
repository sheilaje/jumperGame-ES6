'use strict';

import { Jumper } from './jumper.js';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  let jumper = new Jumper();

  let board = document.getElementById("board");
  jumper.map.forEach(row => {
    let rowP = document.createElement("p");
    rowP.innerHTML = row;
    board.appendChild(rowP);
  });
});
