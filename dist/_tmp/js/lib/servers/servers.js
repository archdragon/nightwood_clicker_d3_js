"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Servers = undefined;

var _store = require("../store/store");

var Servers = exports.Servers = {
  upgradeOptions: function upgradeOptions(store) {
    return [{ key: "new-server", name: "Buy extra server", cost: Servers.upgradeCost(store.servers.value), resource: "$" }];
  },

  upgradeCost: function upgradeCost(currentLevel) {
    return Math.ceil(100 * Math.pow(1.02, currentLevel) + currentLevel);
  },

  unlock: function unlock() {
    _store.Store.update2("servers", "unlocked", true);
  }
};