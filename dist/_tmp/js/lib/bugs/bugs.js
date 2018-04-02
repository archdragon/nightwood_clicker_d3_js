"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bugs = undefined;

var _store = require("../store/store");

var Bugs = exports.Bugs = {
  unlock: function unlock() {
    _store.Store.update2("bugs", "unlocked", true);
  }
};