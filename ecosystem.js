"use strict";

class Ecosystem {

  /**
   * Initialization of the game field
   */

  initGamefield(field){
    field.forEach(function (row, x) {
      row.forEach(function (cell, y) {

        switch(cell) {
          case "#":
            cell = new Wall();
            break;
          case "*":
            cell = new Herb();
            break;
          case "o":
            cell = new Herbivore(x, y);
            break;
          case "@":
            cell = new Carnivore(x, y);
            break;
          default:
            break;
        }
      })
    });
  }





}

var ecosystem = new Ecosystem();
ecosystem.initGamefield(field);





