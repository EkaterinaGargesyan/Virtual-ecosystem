"use strict";

class Wall {

  constructor() {
    this.code = 0;
    this.amount = 20
  }
}


class Herb {

  constructor() {
    this.code = 1;
    this.amount = 20
  }

  multiply(){
    if (this.amount < 20) {
      this.amount++;
    }
  }
}


class LivingEntity {

  constructor(x, y){
    this.coords = [x, y];
    this.maxEnergy = 10;
    this.curEnergy = 5;
  };

  eat(whatIsNextCell, code){
    if (whatIsNextCell === code) {
      this.curEnergy++;
    }
  }

  takeTheStep(newCoords, whatIsCell){
    this.curEnergy--;

    if (whatIsCell === null){
      this.coords = newCoords;
    }
  }

  multiply(entity){
    if (this.curEnergy === this.maxEnergy) {
      this.curEnergy = 5;

      var clonCoords = {
        top: this.coords.map((value, i) => value + [0,-1][i]),
        right: this.coords.map((value, i) => value + [1,0][i]),
        bottom: this.coords.map((value, i) => value + [0,1][i]),
        left: this.coords.map((value, i) => value + [-1,0][i])
      };

      if (!field[clonCoords.top[0]][clonCoords.top[1]]) {
        field[clonCoords.top[0]][clonCoords.top[1]] = new entity(clonCoords.top[0], clonCoords.top[1]);
      } else if (!field[clonCoords.right[0]][clonCoords.right[1]]) {
        field[clonCoords.right[0]][clonCoords.right[1]] = new entity(clonCoords.right[0], clonCoords.right[1]);
      } else if (!field[clonCoords.bottom[0]][clonCoords.bottom[1]]){
        field[clonCoords.bottom[0]][clonCoords.bottom[1]] = new entity(clonCoords.bottom[0], clonCoords.bottom[1]);
      } else if (!field[clonCoords.left[0]][clonCoords.left[1]]) {
        field[clonCoords.left[0]][clonCoords.left[1]] = new entity(clonCoords.left[0], clonCoords.left[1]);
      }
    }
  }

  die(cell){
    if(this.curEnergy === 0) {
      cell = null;
    }
  }
}


class Herbivore extends LivingEntity {
  constructor(x, y) {
    super(x, y);
    this.code = 2;
  }

  takeTheStep(newCoords, whatIsNextCell){
    super.takeTheStep(newCoords, whatIsNextCell);

    if (whatIsNextCell === 1){
      /*this.eat(whatIsNextCell, 1);*/
      this.coords = newCoords;
    }

    /*this.multiply(Herbivore);
    this.die(field[this.coords[0]][this.coords[1]]);*/
  }
}


class Carnivore extends LivingEntity {
  constructor(x, y){
    super(x, y);
    this.code = 3;
  }

  takeTheStep(newCoords, whatIsNextCell){
    super.takeTheStep(newCoords, whatIsNextCell);

    if (whatIsNextCell === 2){
      /*this.eat(whatIsNextCell, 2);*/
      this.coords = newCoords;
    }

    /*this.multiply(Carnivore);
    this.die(field[this.coords[0]][this.coords[1]]);*/
  }
}


