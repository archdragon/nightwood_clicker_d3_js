'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resource = undefined;

var _store = require('../store/store');

var _users = require('../users/users');

var _features = require('../features/features');

var _ui = require('../ui/ui');

var Resource = exports.Resource = {
  add: function add(name, amount) {
    var newAmount = window._store['resources'][name] + amount;
    _store.Store.update2('resources', name, newAmount);

    switch (name) {
      case 'linesOfCode':
        if (newAmount > 20) {
          _features.Features.unlock();
        }
        break;
    }

    _ui.UI.renderDrawings();
  }
};