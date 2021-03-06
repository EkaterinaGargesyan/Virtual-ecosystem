"use strict";

class Ecosystem {

  /**
   * Initialization of the game field
   * All symbols of the game field replacement for objects (instances of a class)
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

    Renderer.fillInTable();
  }

  /**
   * Just return random value
   */

  static getRandomValue(length) {
   return Math.floor(Math.random() * length);
  }

  /**
   * Return random coordinates by direction for the next step of entity
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
   * Return true - if entity can take the next step,
   * false - if entity can't take the next step (if there wall etc.)
   */

  static canDoTheStep(curCoords, newCoords){
    var curCell = field[curCoords[0]][curCoords[1]];
    var nextCell = field[newCoords[0]][newCoords[1]];

    if(curCell){
      //if Herbivore is in current cell and next cell is empty or there is herb
      if(curCell.code === ENTITY_CODE.HERBIVORE
          && (!nextCell || nextCell.code === ENTITY_CODE.HERB)){
        return true;
        //if Carnivore is in current cell and next cell is empty or there is Herbivore
      } else if(curCell.code === ENTITY_CODE.CARNIVORE
          && (!nextCell || nextCell.code === (ENTITY_CODE.HERB || ENTITY_CODE.HERBIVORE))){
        return true;
      } else return false;
    }
  }

  /**
   * Return new coordinates for the next step of entity
   */

  static getNewCoordinates(curCoords) {
    var coordsByDir = Ecosystem.getDirection();
    var newCoords = curCoords.map((coord, i) => {

      //If element is near of field bound and new coordinates will be out of field bound, then invert new coordinates
      //If element isn't near of field bound, return new coordinate, that depend on direction (coordsByDirection)
      if(coord === 0){
        coord = (coordsByDir[i] < 0) ? (coord - coordsByDir[i]) : (coord + coordsByDir[i]);
      } else if(coord >= field.length-1){
        coord = (coordsByDir[i] > 0) ? (coord - coordsByDir[i]) : (coord + coordsByDir[i]);
      } else {
        coord += coordsByDir[i];
      }

      return coord;
    });

    if(Ecosystem.canDoTheStep(curCoords, newCoords)) {
      return newCoords;
    } else {
      return this.getNewCoordinates(curCoords);
    }
  }

  /**
   * Return cell content by coordinates
   */

  static whatInCell(coords){
    return field[coords[0]][coords[1]];
  }

  /**
   * Create child of parent entity, if parent's current energy will be bigger that max energy
   */

  static createChild(x, y, newCoords){
    var parent = field[newCoords[0]][newCoords[1]];

    if(parent.code === ENTITY_CODE.HERBIVORE){
      field[x][y] = new Herbivore(x, y);
    } else if(parent.code === ENTITY_CODE.CARNIVORE){
      field[x][y] = new Carnivore(x, y);
    }

    field[x][y].curEnergy = parent.curEnergy;
    Renderer.updateTable(x, y, newCoords);
  }

  /**
   * Remove element of game field, if its energy is smaller or equals 0
   */

  static removeEntity(coords){
    field[coords[0]][coords[1]] = null;
  }

  /**
   * Append new instance of class Herb on the game field
   */

  static multiplyHerb(){
    var x = Ecosystem.getRandomValue(field.length);
    var y = Ecosystem.getRandomValue(field[0].length);

    if(!field[x][y]){
      field[x][y] = new Herb();
      Renderer.updateTable(0, 0, [x, y]);
    } else {
      return Ecosystem.multiplyHerb();
    }
  }

  /**
   * Entity step on game field
   */

  static step(x, y, arrTookStep){
    var newCoords = Ecosystem.getNewCoordinates([x, y]);
    field[x][y].takeTheStep(newCoords, Ecosystem.whatInCell(newCoords));

    field[newCoords[0]][newCoords[1]] = field[x][y];
    field[x][y] = null;

    field[newCoords[0]][newCoords[1]].multiply(x, y, newCoords);
    field[newCoords[0]][newCoords[1]].die();

    arrTookStep.push(field[newCoords[0]][newCoords[1]]);
    Renderer.updateTable(x, y, newCoords);
  };

  /**
   * Return time of passage of the game round
   */

  static intervalTime(){
    var count = 0;

    field.forEach(function (row) {
      row.forEach(function (cell) {
        if(cell && cell.code >= ENTITY_CODE.HERBIVORE) {
          count++;
        }
      })
    });

    return count * 150;
  }

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

          //Check - if in cell is living entity and it didn't make the step earlier
          if(field[x][y]
              && field[x][y].code >= ENTITY_CODE.HERBIVORE
              && whoTookTheStep.indexOf(field[x][y]) === -1){

            setTimeout(function () {
              Ecosystem.step(x, y, whoTookTheStep);
              y += 1;
              process();
            }, 150, x, y, whoTookTheStep);
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
    })();
  }
}
