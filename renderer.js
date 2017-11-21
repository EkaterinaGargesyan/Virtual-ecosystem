"use strict";

class Renderer {

  /**
   * Return the table filled the objects(entities)
   */

  static fillInField(){
    document.querySelectorAll("tr").forEach((row, x) => {
          [].forEach.call(row.children, (cell, y) => {

            field[x][y]
              ? cell.textContent = field[x][y].symbol
              : cell.textContent = " ";
          })
        });
  }

  /**
   * Return the table updated the objects(entities) after game round
   */

  static updateTable(x, y, newCoords){
    var rows = document.querySelectorAll("tr");
    var curCell = rows[x].cells[y];
    var nextCell = rows[newCoords[0]].cells[newCoords[1]];

    field[x][y] ? curCell.textContent = field[x][y].symbol : curCell.textContent = " ";
    field[newCoords[0]][newCoords[1]]
        ? nextCell.textContent = field[newCoords[0]][newCoords[1]].symbol
        : nextCell.textContent = " ";
  }
}

