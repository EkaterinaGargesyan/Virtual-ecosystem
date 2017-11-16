"use strict";

class Ecosystem {

  /**
   * Initialization of the game field
   */

  initGamefield(field){
    field.forEach(function (row, x) {
      row.forEach(function (cell, y) {

        switch(cell) {
          case "#":
            cell = new Wall();
            break;
          case "*":
            cell = new Herb();
            break;
          case "o":
            cell = new Herbivore(x, y);
            break;
          case "@":
            cell = new Carnivore(x, y);
            break;
          default:
            break;
        }
      })
    });

    console.log(field);
  }

  /**
   * Get new coordinates which use for step living entities
   */

  getDirection(curCoords){
    var directions = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0]
    ];
    var random = Math.floor(Math.random() * directions.length);

    return curCoords.map((value, i) => value + directions[random][i]);
  }



}

var ecosystem = new Ecosystem();
ecosystem.initGamefield(field);
/*console.log(ecosystem.getDirection([2,6]));*/




