"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Features = undefined;

var _store = require("../store/store");

var Features = exports.Features = {
  upgradeOptions: function upgradeOptions(store) {
    return [{ id: "new-feature", name: "Add new feature", cost: Features.upgradeCost(store.features.value), resource: "loc" }];
  },

  upgradeCost: function upgradeCost(currentLevel) {
    return Math.ceil(20 * Math.pow(1.04, currentLevel));
  },

  unlock: function unlock() {
    _store.Store.update2("features", "unlocked", true);
  }
};