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

  getDirection() {
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

  isOutOfBounds(newCoords) {
    return newCoords.some((el) => el < 0 || el >= field.length);
  }

  /**
   * Return new coordinate if cell of next step is out of bounds of game field
   */

  invertInvalidCoords(newCoords) {
    newCoords.some((el) => el < 0)
      ? newCoords = newCoords.map((el) => ++el)
      : newCoords = newCoords.map((el) => --el);

    return newCoords;
  }

  /**
   * Return true - if entity can be next step,
   * false - if entity can't be next step (if there wall etc.)
   */

  canDoTheStep(curCoords, newCoords){
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

  getNewCoordinates(curCoords) {
    var coordsByDirection = this.getDirection();
    var newCoords = curCoords.map((el, i) => el + coordsByDirection[i]);

    //cell for the next step is out of field bound
    if(this.isOutOfBounds(newCoords)) {
      newCoords = this.invertInvalidCoords(newCoords);
    }

    if(this.canDoTheStep(curCoords, newCoords)) {
      return newCoords;
    } else {
      return this.getNewCoordinates(curCoords);
    }
  }

  /**
   * Return what's in the cell
   */

  lookAtCell(coords){
    return field[coords[0]][coords[1]];
  }

  /**
   * Create child of parent living entity, if parent's current energy will be bigger that max energy
   */

  createChild(curCoords, newCoords){
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

  multiplyHerb(){
    var x = Ecosystem.getRandomValue(field.length);
    var y = Ecosystem.getRandomValue(field[0].length);

    if(!field[x][y]){
      field[x][y] = new Herb();
    } else {
      return this.multiplyHerb();
    }
  }

  /**
   * Start the game
   */

  startTheGame(){
    var whoTookTheStep = [];

    var step = (x, y) => {
      var newCoords = this.getNewCoordinates([x, y]);
      field[x][y].takeTheStep(newCoords, this.lookAtCell(newCoords), this.multiplyHerb);

      field[newCoords[0]][newCoords[1]] = field[x][y];
      field[x][y] = null;

      field[newCoords[0]][newCoords[1]].multiply(this.createChild, [x, y], newCoords);

      whoTookTheStep.push(field[newCoords[0]][newCoords[1]]);
      console.log(x,y);
    };

    var coordX = 0;
    var coordY = 0;

    var intervalID = setInterval(function (x, y) {
      if(x < field.length) {
        if(y < field[x].length) {

          if(field[x][y]
              && field[x][y].code >= ENTITY_CODE.HERBIVORE
              && !whoTookTheStep.includes(field[x][y])){

            step(x, y)
          }

          y++;
        } else {
          y = 0;
          x++;
        }
      } else clearInterval(intervalID);
    }, 200, coordX, coordY);
  }
}
