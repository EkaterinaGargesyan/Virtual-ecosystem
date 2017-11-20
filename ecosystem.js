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

  static getRandomValue(length) {
   return Math.floor(Math.random() * length);
  }

  /**
   * Return random direction living entity fo next step
   */

  static getDirection() {
    var directions = [
      [-1, 0], //top
      [0, 1],  //right
      [1, 0],  //bottom
      [0, -1]  //left
    ];

    return directions[Ecosystem.getRandomValue(directions.length)];
  }

  /**
   * Return true - if cell of next step is out of bounds of game field,
   * false - if cell of next step is within the bounds of game field
   */

  static isOutOfBounds(newCoords) {
    return newCoords.some((el) => el < 0 || el >= field.length);
  }

  /**
   * Return new coordinate if cell of next step is out of bounds of game field
   */

  static invertInvalidCoords(newCoords) {
    if(newCoords.some(() => newCoords[0] < 0 || newCoords[1] > field.length-1)){
      newCoords = newCoords.map((el, i) => el + [1,-1][i]);
    } else if(newCoords.some(() => newCoords[1] < 0 || newCoords[0] > field.length-1)){
      newCoords = newCoords.map((el, i) => el + [-1,1][i]);
    }

    return newCoords;
  }

  /**
   * Return true - if entity can be next step,
   * false - if entity can't be next step (if there wall etc.)
   */

  static canDoTheStep(curCoords, newCoords){
    var curCell = field[curCoords[0]][curCoords[1]];
    var nextCell = field[newCoords[0]][newCoords[1]];

    if(curCell.code === ENTITY_CODE.HERBIVORE
        && (!nextCell || nextCell.code === ENTITY_CODE.HERB)) {
      return true;
    } else if(curCell.code === ENTITY_CODE.CARNIVORE
        && (!nextCell || nextCell.code === ENTITY_CODE.HERBIVORE)) {
      return true;
    } else return false;
  }

  /**
   * Return new coordinates for the next step living entities
   * TODO: exception if there are no empty cells for the next step
   */

  static getNewCoordinates(curCoords) {
    var coordsByDirection = Ecosystem.getDirection();
    var newCoords = curCoords.map((el, i) => el + coordsByDirection[i]);

    //cell for the next step is out of field bound
    if(Ecosystem.isOutOfBounds(newCoords)) {
      newCoords = Ecosystem.invertInvalidCoords(newCoords);
    }

    if(Ecosystem.canDoTheStep(curCoords, newCoords)) {
      return newCoords;
    } else {
      return this.getNewCoordinates(curCoords);
    }
  }

  /**
   * Return what's in the cell
   */

  static lookAtCell(coords){
    return field[coords[0]][coords[1]];
  }

  /**
   * Create child of parent living entity, if parent's current energy will be bigger that max energy
   */

  static createChild(curCoords, newCoords){
    var parent = field[newCoords[0]][newCoords[1]];

    if(parent.code === ENTITY_CODE.HERBIVORE){
      field[curCoords[0]][curCoords[1]] = new Herbivore(curCoords[0], curCoords[1]);
    } else if(parent.code === ENTITY_CODE.CARNIVORE){
      field[curCoords[0]][curCoords[1]] = new Carnivore(curCoords[0], curCoords[1]);
    }

    field[curCoords[0]][curCoords[1]].curEnergy = parent.curEnergy;
  }

  /**
   * Return new instance of class Herb
   */

  static multiplyHerb(){
    var x = Ecosystem.getRandomValue(field.length);
    var y = Ecosystem.getRandomValue(field[0].length);

    if(!field[x][y]){
      field[x][y] = new Herb();
    } else {
      return this.multiplyHerb();
    }
  }

  /**
   * TODO: rename step
   */

  static step(x, y, arrTookStep){
    var newCoords = Ecosystem.getNewCoordinates([x, y]);
    field[x][y].takeTheStep(newCoords, Ecosystem.lookAtCell(newCoords), this.multiplyHerb);

    field[newCoords[0]][newCoords[1]] = field[x][y];
    field[x][y] = null;

    field[newCoords[0]][newCoords[1]].multiply([x, y], newCoords);

    arrTookStep.push(field[newCoords[0]][newCoords[1]]);
    console.log(field[newCoords[0]][newCoords[1]]);
  };

  /**
   * Start the game
   * Passes through all living entities of the game field
   */

  gameRound(){
    var whoTookTheStep = [];

    var x = 0,
        y = 0;

    (function process() {
      if(x < field.length){
        if(y < field[x].length){

          //Check - whether the game field element is an living entity and and did he make the step earlier
          if(field[x][y]
              && field[x][y].code >= ENTITY_CODE.HERBIVORE
              && !whoTookTheStep.includes(field[x][y])) {

            setTimeout(function () {
              Ecosystem.step(x, y, whoTookTheStep);
              y += 1;
              process();
            }, 300, x, y, whoTookTheStep);
          } else {
            y += 1;
            process();
          }
        } else {
          x +=1;
          y = 0;
          process();
        }
      }
    })()
  }
}
