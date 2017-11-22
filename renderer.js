"use strict";

class Renderer {

  /**
   * Fill in the table with the all objects (entities)
   */

  static fillInTable() {
    Renderer.hideStartGame();
    document.querySelectorAll("tr").forEach((row, x) => {
      [].forEach.call(row.children, (cell, y) => {
        cell.textContent = field[x][y] ? field[x][y].symbol : " ";
      })
    });
  }

  /**
   * Update the table with objects after entity step
   */

  static updateTable(x, y, newCoords) {
    var rows = document.querySelectorAll("tr");
    var curCell = rows[x].cells[y];
    var nextCell = rows[newCoords[0]].cells[newCoords[1]];

    curCell.textContent = field[x][y] ? field[x][y].symbol : " ";

    nextCell.textContent = field[newCoords[0]][newCoords[1]]
        ? field[newCoords[0]][newCoords[1]].symbol
        : " ";
  }

  /**
   * Hide block when is start the game
   */

  static hideStartGame(){
    setTimeout(() => {
      document.querySelector("p.start-game").classList.remove("visible");
      document.querySelector("p.start-game").classList.add("invisible");
    }, Ecosystem.intervalTime())
  }

  /**
   * Show block when is game over
   */

  static showGameOver(){
    document.querySelector("p.game-over").classList.remove("invisible");
    document.querySelector("p.game-over").classList.add("visible");
  }
}
