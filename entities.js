"use strict";

/**
 * Entity - wall
 */

class Wall {
  constructor() {
    this.code = ENTITY_CODE.WALL;
    this.symbol = ENTITY_SYMBOL.WALL;
  }
}

/**
 * Entity - herb
 */

class Herb {
  constructor() {
    this.code = ENTITY_CODE.HERB;
    this.symbol = ENTITY_SYMBOL.HERB;
    this.curEnergy = 3;
  }
}

/**
 * Entity - living entity
 */

class LivingEntity {
  constructor(x, y){
    this.coords = [x, y];
  };

  eat(victimEnergy){
    this.curEnergy += victimEnergy;
  }

  multiply(x, y, newCoords){
    if(this.curEnergy >= this.maxEnergy){
      this.curEnergy /= 2;
      Ecosystem.createChild(x, y, newCoords);
    }
  }

  die(){
    if(this.curEnergy <= 0){
      Ecosystem.removeEntity(this.coords);
      this.coords = null;
    }
  }

  takeTheStep(newCoords, nextCellContent){
    if(!nextCellContent){
      this.coords = newCoords;
    }

    this.curEnergy--;
  }
}

/**
 * Entity - herbivore (child)
 * living entity - parent
 */

class Herbivore extends LivingEntity {
  constructor(x, y) {
    super(x, y);
    this.code = ENTITY_CODE.HERBIVORE;
    this.symbol = ENTITY_SYMBOL.HERBIVORE;
    this.maxEnergy = 8;
    this.curEnergy = 6;
  }

  takeTheStep(newCoords, nextCellContent){
    if(nextCellContent && nextCellContent.code === ENTITY_CODE.HERB){
      this.eat(nextCellContent.curEnergy);
      this.coords = newCoords;

      Ecosystem.multiplyHerb();
    }

    super.takeTheStep(newCoords, nextCellContent);
  }
}

/**
 * Entity - carnivore (child)
 * living entity - parent
 */

class Carnivore extends LivingEntity {
  constructor(x, y){
    super(x, y);
    this.code = ENTITY_CODE.CARNIVORE;
    this.symbol = ENTITY_SYMBOL.CARNIVORE;
    this.maxEnergy = 10;
    this.curEnergy = 8;
  }

  takeTheStep(newCoords, nextCellContent){
    if (nextCellContent && nextCellContent.code === ENTITY_CODE.HERBIVORE){
      this.eat(nextCellContent.curEnergy);
      this.coords = newCoords;
    }

    super.takeTheStep(newCoords, nextCellContent);
  }
}
