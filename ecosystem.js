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
   * Just return random value
   */

  getRandomValue(length) {
   return Math.floor(Math.random() * length);
  }

  /**
   * Return random direction living entity fo next step
   */

  getDirection() {
    var directions = [
      [-1, 0], //top
      [0, 1],  //right
      [1, 0],  //bottom
      [0, -1]  //left
    ];

    return directions[this.getRandomValue(directions.length)];
  }

  /**
   * Return true - if cell of next step is within the bounds of game field,
   * false - if cell of next step is out of bounds of game field
   */

  isWithinTheBounds(newCoords) {
    return newCoords.every((el) => el >= 0 && el < field.length);
  }

  /**
   * Return true - if entity can be next step,
   * false - if entity can't be next step (if there wall etc.)
   */

  canDoTheStep(curCoords, newCoords){
    var curCell = field[curCoords[0]][curCoords[1]];
    var nextCell = field[newCoords[0]][newCoords[1]];

    if (curCell.code === 2 && (!nextCell || nextCell.code === 1)) {
      return true;
    } else if (curCell.code === 3 && (!nextCell || nextCell.code === 2)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Return new coordinates for the next step living entities
   */

  getNewCoordinates(curCoords) {
    var coordsByDirection = this.getDirection();
    var newCoords = curCoords.map((value, i) => value + coordsByDirection[i]);

    //cell for the next step is out of field bound
    if (!this.isWithinTheBounds(newCoords)) {
      newCoords = curCoords.map((value, i) => value + [1,1][i]);
    }

    if (this.canDoTheStep(curCoords, newCoords)) {
      return newCoords;
    } else {
      return this.getNewCoordinates(curCoords);
    }
  }

  /**
   * Return what's in the cell in the next step
   */

  lookAtCell(newCoords){
    var x = newCoords[0];
    var y = newCoords[1];

    return field[x][y] ? field[x][y].code : field[x][y];
  }

  /**
   * Start the game
   */

  startTheGame(){
    var livingEnities = [];

    for (var x = 0; x < field.length; x++){
      for (var y = 0; y < field[x].length; y++){

        if (field[x][y]
            && field[x][y].code >= 2
            && livingEnities.indexOf(field[x][y]) === -1){

          var curCoords = [x, y];
          var newCoords = this.getNewCoordinates(curCoords);

          field[x][y].makeStep(newCoords, this.lookAtCell(newCoords));
          field[newCoords[0]][newCoords[1]] = field[x][y];
          field[x][y] = null;

          livingEnities.push(field[newCoords[0]][newCoords[1]]);

          setTimeout(function(){}, 300);
        }
      }
    }
  }

}

var ecosystem = new Ecosystem();
ecosystem.initGamefield(field);
console.log(ecosystem.startTheGame());


/*var a = new Herbivore(1, 1);
var newCoords = ecosystem.getNewCoordinate(a.coords);
a.makeStep(newCoords, ecosystem.lookAtCell(newCoords));*/






