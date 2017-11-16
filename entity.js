"use strict";

class Wall {
  code: 0;
  amount: 20
}

class Herb {
  code: 1;
  amount: 20;
  multiply(){

  }
}

class LivingEntity {
  maxEnergy: 10;
  curEnergy: 5;

  constructor(x, y){
    this.coords.x = x;
    this.coords.y = y;
  };

  get energy(){
    return this.curEnergy;
  }

  makeStep(){

  }

  eat(){

  }

  multiply(){

  }

  die(cell){
    if(this.curEnergy <= 0) {
      cell = null;
    }
  }
}

class Herbivore extends LivingEntity {
  code: 2
}

class Carnivore extends LivingEntity {
  code: 3
}