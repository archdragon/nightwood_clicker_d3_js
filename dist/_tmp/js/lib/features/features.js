"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Features = undefined;

var _store = require("../store/store");

var Features = exports.Features = {
  upgradeOptions: function upgradeOptions(store) {
    return [{ name: "Add new feature", cost: Features.upgradeCost(store.features.value), resource: "loc" }];
  },

  upgradeCost: function upgradeCost(currentLevel) {
    return 20 * Math.pow(1.02, currentLevel);
  },

  unlock: function unlock() {
    _store.Store.update2("features", "unlocked", true);
  }
};