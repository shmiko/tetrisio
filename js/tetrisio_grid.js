(function(global) {
  'use strict';

  function Cell(config) {
    this.$el = config.$element; //set element
    this.x = config.x; //set x coordinate
    this.y = config.y; //set y coordinate
  };

  function Grid(config) { //grid function
    this.grid = []; //declare empty grid array to store our array
    this.cells = []; //declare empty cells array
    this.rowsCount = config.rows; //use config rows to assign to rowsCount
    this.colsCount = config.cols; //use config cols to assign to colsCount
    this.rows = []; //decalre and empty rows array
    this.cols = []; //decalre an empty cols array
    if (config.render) { //if config render is true then render to placeholder
      this.placeholder = config.render.placeholder;
      this.render();
    };
  };



  Grid.prototype = { //grid based on first gris function
    createCell: function(config){ //function to create cell using config params
      return new Cell(config); //return new cell
    },
    getCellAt: function(x,y){ //function to get position of cell
      if (!this.grid[y]){ //check for y coordinate
        console.warn('No Y coordinate: %i (grid size is x[%i], y[%i]))', y, this.colsCount, this.rowsCount);
        return false;
      }
      if (!this.grid[y][x]){ //check for x coordinate
        console.warn('No such x coordinate: %i (grid size is x[%i], y[%i]))', y, this.colsCount, this.rowsCount);
        return false;
      }
      return this.grid[y][x]; //return grid cells
    },
    render: function(options){ //render function
      if (options && options.placeholder){ //if both options and placeholder options are true
        this.placeholder = options.placeholder; //allocate options placeholder to this
      }
      this.$placeholder = $(this.placeholder); //jquery to match placeholder
      if (!this.placeholder || this.$placeholder.length === 0){ //check for placeholder existence
        console.error('Placeholder is not present');
        return;
      }
      var i, j, $row, $cell, cell, cellId = 0; //declare variables for loops
      for (i = 0; i < this.rowsCount; i += 1){ //loop through the rows
        this.grid[i] = [];
        $row = $('<div class="row"></div>').prependTo(this.$placeholder); //use jquery to add thiese tags before element placeholder
        for (j = 0; j < this.colsCount; j += 1){ //loop through columns for each row
          $cell = $('<div class="cell"></div>').appendTo($row); //append these tags to element placeholder
          cell = this.createCell({$element: $cell, x: j, y: i});  //use function to create the cells
          this.grid[i].push(cell); //add the cell to the grid
          this.cells.push(cell); //add the cell to cells
        }
      }
      //rows
      var self = this;
      this.grid.forEach(function(row){ //for each row add rows
        self.rows.push(row); //add rows
      });
    }
  };
  global.Grid = Grid; //assign Grid to global window object
}(window)); //window object is the browser
