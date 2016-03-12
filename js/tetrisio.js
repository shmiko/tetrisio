(function(global, Grid, Shape){
  "use strict";

  function Tetrisio(options){
    this.difficulty = options.difficulty; //assign difficulty from options passed through when initiating Tetrisio
    this.rows = options.rows; //rows assignment
    this.cols = options.cols; //cols assignment
    this.placeholder = options.placeholder; //placeholder assignment
    this.shapes = [Shape.O];
    this.render(); //render
  }
  Tetrisio.prototype = {
    render: function(){
      this.grid = new Grid({ //setup grid
        rows: this.rows, //set rows
        cols: this.cols, //set cols
        render: {
          placeholder: this.placeholder //set placeholder
        }
      });
      return this; //return grid
    },
    bind: function() {
      var self = this;
      $(document).on('keydown', function( e ) {
        if (!self.shape) {
          console.warn("No current shape available");
          return;
        }
        switch (e.keyCode) {
          case 32: // Space
            self.shape.moveDown();
            break;
          case 37: // Left arrow
            self.shape.moveLeft();
            break;
          case 38: // Up arrow
            self.shape.rotate();
            break;
          case 39: // Right arrow
            self.shape.moveRight();
            break;
          case 40: // Down arrow
            self.shape.moveDown();
            break;
          case 80: // 'P'
            // pause the game eventually
            self.pause();
            break;
          default:
          // ..
        }
      });
    },
    init: function() {
      this.bind();
      this.shape = new this.shapes[0](this.grid);
    }
  };

  global.Tetrisio = Tetrisio;

}(window, window.Grid, window.Shape));
