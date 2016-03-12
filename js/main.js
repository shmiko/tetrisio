(function(Tetrisio) {
"use strict";
  var tetrisio = new Tetrisio({ //decalring options for config
      rows: 25,
      cols: 13,
      placeholder: "#tetrisio"
  });
  // tetrisio.getCellAt(2, 1).$el.css('background', 'red');
  tetrisio.init();
}(window.Tetrisio));
