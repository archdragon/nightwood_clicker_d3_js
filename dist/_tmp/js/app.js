'use strict';

var _ui = require('./lib/ui/ui');

var _clock = require('./lib/clock/clock');

var _store = require('./lib/store/store');

var _users = require('./lib/users/users');

var _cash = require('./lib/cash/cash');

window.onload = function () {
  window._store = _store.Store.initialize();

  d3.zoom();

  var gameLoop = function gameLoop() {
    console.log("tick");
    var newTime = window._store.clock.currentTime + _clock.Clock.hoursPerSecond();
    _store.Store.update2('clock', 'currentTime', newTime);

    _users.Users.tick();
    _cash.Cash.tick();

    _ui.UI.updateClock(newTime);
    _ui.UI.updateCash();
  };

  _ui.UI.initialize();
  _clock.Clock.initialize(gameLoop);
};
