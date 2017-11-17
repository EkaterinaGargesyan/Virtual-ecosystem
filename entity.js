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

}


class Herbivore extends LivingEntity {
  constructor(x, y) {
    super(x, y);
    this.code = 2;
  }


}


class Carnivore extends LivingEntity {
  constructor(x, y){
    super(x, y);
    this.code = 3;
  }


}


