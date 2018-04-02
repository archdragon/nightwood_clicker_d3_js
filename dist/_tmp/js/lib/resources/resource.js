'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resource = undefined;

var _store = require('../store/store');

var _users = require('../users/users');

var _bugs = require('../bugs/bugs');

var _servers = require('../servers/servers');

var _features = require('../features/features');

var _ui = require('../ui/ui');

var Resource = exports.Resource = {
  get: function get(name) {
    name = Resource.expandName(name);
    if (name == "users") {
      return window._store['users']['count'];
    } else if (name == "speed") {
      if (Resource.get("users") <= 0) {
        return 0;
      }
      var speed = Math.ceil(2 * (Resource.get("servers") / (Resource.get("users") / 100) * 200)) - 100;
      if (speed > 100) {
        speed = 100;
      } else if (speed < -100) {
        speed = -100;
      }

      return speed;
    } else if (name == "happiness") {
      return window._store['users']['happiness'];
    } else if (name == "servers") {
      return window._store.servers.value;
    }
    return window._store['resources'][name];
  },

  add: function add(name, amount) {
    name = Resource.expandName(name);

    switch (name) {
      case 'bugs':
        var newAmount = window._store['bugs']['value'] + amount;
        _store.Store.update2('bugs', 'value', newAmount);
        break;
      case 'feature':
        var newAmount = window._store['features']['value'] + amount;
        _store.Store.update2('features', 'value', newAmount);
        break;
      case 'users':
        var newAmount = window._store['users']['count'] + amount;
        _store.Store.update2('users', 'count', newAmount);
        break;
      case 'servers':
        var newAmount = window._store['servers']['value'] + amount;
        _store.Store.update2('servers', 'value', newAmount);
        break;
      case 'happiness':
        var newAmount = window._store['users']['happiness'] + amount;
        _store.Store.update2('users', 'happiness', newAmount);
        break;
      default:
        var newAmount = window._store['resources'][name] + amount;
        _store.Store.update2('resources', name, newAmount);
        break;
    }

    switch (name) {
      case 'linesOfCode':
        if (newAmount >= 20) {
          _features.Features.unlock();
        }

        if (window._store.bugs.unlocked) {
          var bugChance = 0.01;
          bugChance += Resource.get('features') * 0.001;
          if (Math.random() < bugChance) {
            Resource.add("bugs", 1);
          }
        }
        break;
      case 'feature':
        if (newAmount >= 3) {
          _users.Users.unlock();
          _servers.Servers.unlock();
        }
        if (newAmount >= 6) {
          _bugs.Bugs.unlock();
        }
        break;
      case 'users':
        if (newAmount > 15) {
          _users.Users.unlockHappiness();
        }
        if (newAmount > 4) {
          _users.Users.unlockAds();
        }
        break;
    }

    _ui.UI.renderDrawings();
    _ui.UI.renderOpenPanel();
  },

  substract: function substract(name, amount) {
    Resource.add(name, 0 - amount);
  },

  expandName: function expandName(name) {
    if (name == 'loc') {
      return 'linesOfCode';
    } else if (name == '$') {
      return 'cash';
    }

    return name;
  }
};