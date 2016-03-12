(function(global){
  "use strict";

  var shape = {};

  function BaseShape(){
    this.cells = [];
    this.coords = [];
    // this.coords.push(grid.getCellAt(middleColumn, firstRow));
    // this.coords.push(grid.getCellAt(middleColumn, secondRow));
    // this.coords.push(grid.getCellAt(middleColumn + 1, firstRow));
    // this.coords.push(grid.getCellAt(middleColumn + 1, secondRow));
    // this.occupyCells();
    // return this;
  }
  // shapes.js
  BaseShape.prototype.occupyCell = function( cell ) { //setup cell
    cell.$el.css('background', 'red');
    cell.isCurrentShape = true;
    this.cells.push(cell);
    return this;
  };

  BaseShape.prototype.occupyCells = function() { //occupy all cells with this one call
    var self = this;
    this.coords.forEach(function( coord ) {
      self.occupyCell(self.grid.getCellAt(coord.x, coord.y));
    });
    return this;
  };

  // shapes.js
  BaseShape.prototype.moveLeft = function() {
    var self = this;
    var isMoveAllowed = this.cells.every(function( cell ) {
      var cellAtNewCoords = self.grid.getCellAt(cell.x - 1, cell.y);
      if (!cellAtNewCoords || cellAtNewCoords.isSolid) {
        console.log("obstacle, can't continue moving left");
        return false;
      }
      return true;
    });
    if (!isMoveAllowed) {
      console.log("stopped");
      return false;
    }
    console.log("move left");
    this.coords = [];
    this.cells.forEach(function( cell ) {
      self.coords.push({x: cell.x - 1, y: cell.y});
    });
    this.freeCells();
    this.occupyCells();
  };

  BaseShape.prototype.moveRight = function() {
    var self = this;
    var isMoveAllowed = this.cells.every(function( cell ) {
    var cellAtNewCoords = self.grid.getCellAt(cell.x + 1, cell.y);
    if (!cellAtNewCoords || cellAtNewCoords.isSolid) {
      console.log("obstacle, can't continue moving right");
      return false;
    }
    return true;
    });
    if (!isMoveAllowed) {
    console.log("stopped");
    return false;
    }
    console.log("move right");
    this.coords = [];
    this.cells.forEach(function( cell ) {
    self.coords.push({x: cell.x + 1, y: cell.y});
    });
    this.freeCells();
    this.occupyCells();
    };
    BaseShape.prototype.moveDown = function() {
    var self = this;
    var isMoveAllowed = this.cells.every(function( cell ) {
    var newCell = self.grid.getCellAt(cell.x, cell.y - 1);
    if (!newCell || newCell.isSolid) {
      console.log('landed');
      return false;
    }
    return true;
    });
    if (!isMoveAllowed) {
    console.log("stopped");
    return false;
    }
    console.log("move down");
    this.coords = [];
    this.cells.forEach(function( cell ) {
    self.coords.push({x: cell.x, y: cell.y - 1});
    });
    this.freeCells();
    this.occupyCells();
  };

  BaseShape.prototype.freeCells = function() {
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', 'white');
      cell.isCurrentShape = false;
    });
    this.cells = [];
    return this;
  };


  BaseShape.prototype.rotate = function() {
    var self = this;

    var data = this.getRotationData();
    var coords = data[0];
    var newRotationState = data[1];

    // check the coordinates
    var isAllowedToRotate = coords.every(function( coord ) {
      var neighbourCell = self.grid.getCellAt(coord.x, coord.y);
      if (!neighbourCell || neighbourCell.isSolid) {
        console.log('could not rotate');
        return false;
      }
      return true;
    });

    if (!isAllowedToRotate) {
      console.log("rotation failed");
      return false;
    }

    this.rotationState = newRotationState;
    this.coords = coords;
    this.freeCells();
    this.occupyCells();
  };

  function OShape( grid ) { //set  variables for the cells our shape will occupy
    this.grid = grid;
    var firstRow = grid.rowsCount - 1;
    var secondRow = grid.rowsCount - 2;
    var middleColumn = parseInt(grid.colsCount / 2, 10);
    this.coords = [];
    this.coords.push(grid.getCellAt(middleColumn, firstRow));
    this.coords.push(grid.getCellAt(middleColumn, secondRow));
    this.coords.push(grid.getCellAt(middleColumn + 1, firstRow));
    this.coords.push(grid.getCellAt(middleColumn + 1, secondRow));
    this.occupyCells();
    return this;
  };
  OShape.prototype.rotate = function() {
    console.log("Disable the rotatioin for the 'O' shape");
  };
  OShape.prototype = new BaseShape();
  OShape.prototype.constructor = OShape;

  function TShape( grid ) {
    this.grid = grid;
    var firstRow = grid.rowsCount - 1;
    var secondRow = grid.rowsCount - 2;
    var middleColumn = parseInt(grid.colsCount / 2, 10);
    this.coords = [];
    this.coords.push(grid.getCellAt(middleColumn, secondRow));
    this.coords.push(grid.getCellAt(middleColumn, firstRow));
    this.coords.push(grid.getCellAt(middleColumn - 1, secondRow));
    this.coords.push(grid.getCellAt(middleColumn + 1, secondRow));
    this.occupyCells();
    this.rotationState = 1;
    return this;
  };
  TShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x, y: center.y + 1});
        coords.push({x: center.x + 1, y: center.y});
        coords.push({x: center.x, y: center.y - 1});
        newRotationState = 2;
        break;
      case 2:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x - 1, y: center.y});
        coords.push({x: center.x + 1, y: center.y});
        coords.push({x: center.x, y: center.y - 1});
        newRotationState = 3;
        break;
      case 3:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x - 1, y: center.y});
        coords.push({x: center.x, y: center.y + 1});
        coords.push({x: center.x, y: center.y - 1});
        newRotationState = 4;
        break;
      case 4:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x - 1, y: center.y});
        coords.push({x: center.x, y: center.y + 1});
        coords.push({x: center.x + 1, y: center.y});
        newRotationState = 1;
        break;
    }
    return [coords, newRotationState];
  };
  TShape.prototype = new BaseShape();
  TShape.prototype.constructor = TShape;

  function SShape( grid ) {
    this.grid = grid;
    var secondRow = grid.rowsCount - 2;
    var middleColumn = parseInt(grid.colsCount / 2, 10);
    this.coords = [];
    this.coords.push(grid.getCellAt(middleColumn, secondRow));
    this.coords.push(grid.getCellAt(middleColumn - 1, secondRow));
    this.coords.push(grid.getCellAt(middleColumn - 1, secondRow + 1));
    this.coords.push(grid.getCellAt(middleColumn, secondRow - 1));
    this.occupyCells();
    this.rotationState = 1;
    return this;
  };
  SShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x, y: center.y + 1});
        coords.push({x: center.x + 1, y: center.y + 1});
        coords.push({x: center.x - 1, y: center.y});
        newRotationState = 2;
        break;
      case 2:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x - 1, y: center.y});
        coords.push({x: center.x - 1, y: center.y + 1});
        coords.push({x: center.x, y: center.y - 1});
        newRotationState = 1;
        break;
    }
    return [coords, newRotationState];
  };
  SShape.prototype  = new BaseShape();
  SShape.prototype.constructor = SShape;

  function ZShape( grid ) {
    this.grid = grid;
    var secondRow = grid.rowsCount - 2;
    var middleColumn = parseInt(grid.colsCount / 2, 10);
    this.coords = [];
    this.coords.push(grid.getCellAt(middleColumn, secondRow));
    this.coords.push(grid.getCellAt(middleColumn - 1, secondRow));
    this.coords.push(grid.getCellAt(middleColumn - 1, secondRow - 1));
    this.coords.push(grid.getCellAt(middleColumn, secondRow + 1));
    this.occupyCells();
    this.rotationState = 1;
    return this;
  };
  ZShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x, y: center.y + 1});
        coords.push({x: center.x + 1, y: center.y});
        coords.push({x: center.x - 1, y: center.y + 1});
        newRotationState = 2;
        break;
      case 2:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x - 1, y: center.y});
        coords.push({x: center.x - 1, y: center.y - 1});
        coords.push({x: center.x, y: center.y + 1});
        newRotationState = 1;
        break;
    }
    return [coords, newRotationState];
  };
  ZShape.prototype  = new BaseShape();
  ZShape.prototype.constructor = ZShape;

  function LShape( grid ) {
    this.grid = grid;
    var secondRow = grid.rowsCount - 2;
    var middleColumn = parseInt(grid.colsCount / 2, 10);
    this.coords = [];
    this.coords.push(grid.getCellAt(middleColumn, secondRow));
    this.coords.push(grid.getCellAt(middleColumn, secondRow + 1));
    this.coords.push(grid.getCellAt(middleColumn, secondRow - 1));
    this.coords.push(grid.getCellAt(middleColumn + 1, secondRow - 1));
    this.occupyCells();
    this.rotationState = 1;
    return this;
  };
  LShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x - 1, y: center.y});
        coords.push({x: center.x + 1, y: center.y});
        coords.push({x: center.x + 1, y: center.y + 1});
        newRotationState = 2;
        break;
      case 2:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x, y: center.y + 1});
        coords.push({x: center.x, y: center.y - 1});
        coords.push({x: center.x - 1, y: center.y + 1});
        newRotationState = 3;
        break;
      case 3:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x - 1, y: center.y});
        coords.push({x: center.x + 1, y: center.y});
        coords.push({x: center.x - 1, y: center.y - 1});
        newRotationState = 4;
        break;
      case 4:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x, y: center.y + 1});
        coords.push({x: center.x, y: center.y - 1});
        coords.push({x: center.x + 1, y: center.y - 1});
        newRotationState = 1;
        break;
    }
    return [coords, newRotationState];
  };
  LShape.prototype = new BaseShape();
  LShape.prototype.constructor = LShape;

  function JShape( grid ) {
    this.grid = grid;
    var secondRow = grid.rowsCount - 2;
    var middleColumn = parseInt(grid.colsCount / 2, 10);
    this.coords = [];
    this.coords.push(grid.getCellAt(middleColumn, secondRow));
    this.coords.push(grid.getCellAt(middleColumn, secondRow + 1));
    this.coords.push(grid.getCellAt(middleColumn, secondRow - 1));
    this.coords.push(grid.getCellAt(middleColumn -1, secondRow - 1));
    this.occupyCells();
    this.rotationState = 1;
    return this;
  };
  JShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x - 1, y: center.y});
        coords.push({x: center.x + 1, y: center.y});
        coords.push({x: center.x - 1, y: center.y + 1});
        newRotationState = 2;
        break;
      case 2:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x, y: center.y + 1});
        coords.push({x: center.x + 1, y: center.y + 1});
        coords.push({x: center.x, y: center.y - 1});
        newRotationState = 3;
        break;
      case 3:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x - 1, y: center.y});
        coords.push({x: center.x + 1, y: center.y});
        coords.push({x: center.x + 1, y: center.y - 1});
        newRotationState = 4;
        break;
      case 4:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x, y: center.y + 1});
        coords.push({x: center.x, y: center.y - 1});
        coords.push({x: center.x - 1, y: center.y - 1});
        newRotationState = 1;
        break;
    }
    return [coords, newRotationState];
  };
  JShape.prototype = new BaseShape();
  JShape.prototype.constructor = JShape;

  function IShape( grid ) {
    this.grid = grid;
    var secondRow = grid.rowsCount - 2;
    var middleColumn = parseInt(grid.colsCount / 2, 10);
    this.rotationState = 1;
    return this;
  };
  IShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x - 1, y: center.y});
        coords.push({x: center.x + 1, y: center.y});
        coords.push({x: center.x + 2, y: center.y});
        newRotationState = 2;
        break;
      case 2:
        center = this.cells[0];
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x, y: center.y + 1});
        coords.push({x: center.x, y: center.y - 1});
        coords.push({x: center.x, y: center.y - 2});
        newRotationState = 1;
        break;
    }
    return [coords, newRotationState];
  };
  IShape.prototype = new BaseShape();
  IShape.prototype.constructor = IShape;

  Shape.O = OShape; //Keep all the shape classes together in one object(namespace)
  Shape.T = TShape;
  Shape.S = SShape;
  Shape.Z = ZShape;
  Shape.L = LShape;
  Shape.J = JShape;
  Shape.I = IShape;
  this.shapes = [Shape.O,Shape.T,Shape.Z,Shape.S,Shape.L,Shape.J,Shape.I];
  global.Shape = Shape; //export the shape namespace to the global scope

}(window));
