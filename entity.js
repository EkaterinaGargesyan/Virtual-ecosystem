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

  }
}

class LivingEntity {

  constructor(x, y){
    this._coords = [x, y];

    this.maxEnergy = 10;
    this.curEnergy = 5;
  };

  get energy(){
    return this.curEnergy;
  }

  get curCoords(){
    return this._coords;
  }

  set curCoords(value){
    this._coords = [value];
  }

  makeStep(){ }

  eat(){ }

  multiply(){ }

  die(cell){
    if(this.curEnergy <= 0) {
      cell = null;
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

/*
var a = new Herbivore(1, 1);
console.log(a.curCoords(2,2));*/
