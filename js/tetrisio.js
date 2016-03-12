(function(global, Grid){
  "use strict";

  function Tetrisio(options){
    this.difficulty = options.difficulty; //assign difficulty from options passed through when initiating Tetrisio
    this.rows = options.rows; //rows assignment
    this.cols = options.cols; //cols assignment
    this.placeholder = options.placeholder; //placeholder assignment
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
    init: function(){
      //leave this for adding a start button perhaps
    }
  };

  global.Tetrisio = Tetrisio;

}(window, window.Grid));
