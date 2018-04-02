"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cash = undefined;

var _resource = require("../resources/resource");

var Cash = exports.Cash = {
  tick: function tick() {
    var store = window._store;
    if (store.users.count > 0) {
      _resource.Resource.substract("cash", Math.floor(store.users.count / 10) + 1);
    }
  },

  toString: function toString() {
    return window._store.resources.cash + " $";
  }
};