"use strict";

class Ecosystem {

  /**
   * Initialization of the game field
   */

  initGamefield(field){

    field.forEach(function (row, x) {
      row.forEach(function (cell, y, arr) {

        switch(arr[y]) {
          case "#":
            arr[y] = new Wall();
            break;
          case "*":
            arr[y] = new Herb();
            break;
          case "o":
            arr[y] = new Herbivore(x, y);
            break;
          case "@":
            arr[y] = new Carnivore(x, y);
            break;
          default:
            arr[y] = null;
            break;
        }
      })
    });
  }

  /**
   * Get new coordinates which use for the step living entities
   */

  getNewCoordinate(curCoords){
    var directions = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0]
    ];
    var random = Math.floor(Math.random() * directions.length);

    var newCoords = curCoords.map((value, i) => value + directions[random][i]);

    if (newCoords.every((el) => el >= 0 && el < field.length)) {
      return newCoords;
    } else {
      return this.getNewCoordinate(curCoords);
    }
  }

  /**
   * Look what's in the cell in the next step
   */

  lookAtCell(newCoords){
    var x = newCoords[0];
    var y = newCoords[1];

    return field[x][y] ? field[x][y].code : field[x][y];
  }

  

}

var ecosystem = new Ecosystem();
ecosystem.initGamefield(field);

var random = ecosystem.getNewCoordinate([9,9]);
console.log(random);
console.log(ecosystem.lookAtCell(random));




