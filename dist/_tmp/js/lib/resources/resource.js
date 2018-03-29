'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resource = undefined;

var _store = require('../store/store');

var _ui = require('../ui/ui');

var Resource = exports.Resource = {
  add: function add(name, amount) {
    _store.Store.update2('resources', name, window._store['resources'][name] + amount);
    _ui.UI.renderDrawings();
  }
};