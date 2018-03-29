'use strict';

var _ui = require('./lib/ui/ui');

var _store = require('./lib/store/store');

window.onload = function () {
  window._store = _store.Store.initialize();
  console.log(window._store);
  _ui.UI.initialize();
};
