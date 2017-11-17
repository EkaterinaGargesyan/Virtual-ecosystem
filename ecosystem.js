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

  getNewCoordinates(curCoords) {
    var directions = [
      [0, -1], //top
      [1, 0],  //right
      [0, 1],  //bottom
      [-1, 0]  //left
    ];
    var random = Math.floor(Math.random() * directions.length);

    var newCoords = curCoords.map((value, i) => value + directions[random][i]);
    var curStep = field[curCoords[0]][curCoords[1]];

    var isFieldBorder = () => newCoords.every((el) => el < 0 && el > field.length);
    if (!isFieldBorder()) {
      newCoords = curCoords.map((value, i) => value + [1,1][i]);
    }

    var nextStep = field[newCoords[0]][newCoords[1]];

    if (curStep.code === 2 && nextStep === (null || 1)) {
      return newCoords;
    } else if (curStep.code === 3 && nextStep === (null || 2)) {
      return newCoords;
    } else {
      return this.getNewCoordinates(curCoords);
    }
  }

  /**
   * Look what's in the cell in the next step
   */

  static lookAtCell(newCoords){
    var x = newCoords[0];
    var y = newCoords[1];

    return field[x][y] ? field[x][y].code : field[x][y];
  }


}

var ecosystem = new Ecosystem();
ecosystem.initGamefield(field);


/*var a = new Herbivore(1, 1);
var newCoords = ecosystem.getNewCoordinate(a.coords);
a.makeStep(newCoords, ecosystem.lookAtCell(newCoords));*/






