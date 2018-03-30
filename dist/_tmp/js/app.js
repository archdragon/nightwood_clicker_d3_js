'use strict';

var _ui = require('./lib/ui/ui');

var _clock = require('./lib/clock/clock');

var _store = require('./lib/store/store');

window.onload = function () {
  window._store = _store.Store.initialize();

  var gameLoop = function gameLoop() {
    console.log("tick");
    var newTime = window._store.clock.currentTime + _clock.Clock.hoursPerSecond();
    _store.Store.update2('clock', 'currentTime', newTime);
  };

  _ui.UI.initialize();
  _clock.Clock.initialize(gameLoop);
};
