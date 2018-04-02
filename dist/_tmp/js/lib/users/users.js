'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = undefined;

var _store = require('../store/store');

var _resource = require('../resources/resource');

var Users = exports.Users = {
  unlock: function unlock() {
    _store.Store.update2("users", "unlocked", true);
  },

  unlockHappiness: function unlockHappiness() {
    _store.Store.update2("users", "happinessUnlocked", true);
  },

  unlockAds: function unlockAds() {
    _store.Store.update2("users", "adsUnlocked", true);
  },

  tick: function tick() {
    if (!window._store.users.unlocked) {
      return null;
    }
    if (!window._store.servers.unlocked) {
      return null;
    }
    var speed = _resource.Resource.get("speed");
    var happiness = _resource.Resource.get("happiness");
    var removeChance = 0; // 0 - 1
    var addChance = 0; // 0 - 1
    var happinessAddChance = 0;
    var happinessRemoveChance = 0;

    if (speed > 0) {
      happinessAddChance = speed / 500;
    } else if (speed < 0) {
      happinessRemoveChance = -1 * speed / 100;
    }

    if (Math.random() < happinessAddChance) {
      _resource.Resource.add('happiness', 1);
    }

    if (Math.random() < happinessRemoveChance) {
      _resource.Resource.substract('happiness', 1);
    }

    if (happiness < 0) {
      removeChance = -1 * happiness / 50;
    }

    if (happiness > 0) {
      addChance = happiness / 100;
    } else {
      addChance = 0.1;
    }

    console.log("addChance", addChance);
    console.log("removeChance", removeChance);

    if (Math.random() < removeChance) {
      _resource.Resource.remove("users", 1);
    }

    if (Math.random() < addChance) {
      _resource.Resource.add("users", 1);
    }
  }
};