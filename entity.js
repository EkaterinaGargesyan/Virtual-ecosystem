"use strict";

class Wall {
  constructor() {
    this.code = ENTITY_CODE.WALL;
  }
}


class Herb {
  constructor() {
    this.code = ENTITY_CODE.HERB;
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

  eat(victimEnergy){
    this.curEnergy += victimEnergy;
  }

  multiply(createChild, curCoords, newCoords){
    if (this.curEnergy >= this.maxEnergy) {
      this.curEnergy /= 2;

      createChild(curCoords, newCoords);
    }
  }

  die(cell){
    if(this.curEnergy <= 0) {
      cell = null;
    }
  }

  takeTheStep(newCoords, whatIsNextCell){
    if (!whatIsNextCell){
      this.coords = newCoords;
    }

    this.curEnergy--;
    this.die(field[this.coords[0]][this.coords[1]]);
  }
}


class Herbivore extends LivingEntity {
  constructor(x, y) {
    super(x, y);
    this.code = ENTITY_CODE.HERBIVORE;
  }

  takeTheStep(newCoords, whatIsNextCell){
    if (whatIsNextCell.code === ENTITY_CODE.HERB){
      this.eat(whatIsNextCell.curEnergy);
      this.coords = newCoords;
    }

    super.takeTheStep(newCoords, whatIsNextCell);
  }
}


class Carnivore extends LivingEntity {
  constructor(x, y){
    super(x, y);
    this.code = ENTITY_CODE.CARNIVORE;
  }

  takeTheStep(newCoords, whatIsNextCell){
    if (whatIsNextCell && whatIsNextCell.code === ENTITY_CODE.HERBIVORE){
      this.eat(whatIsNextCell.curEnergy);
      this.coords = newCoords;
    }

    super.takeTheStep(newCoords, whatIsNextCell);
  }
}


