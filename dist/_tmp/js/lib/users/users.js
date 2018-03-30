"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = undefined;

var _store = require("../store/store");

var Users = exports.Users = {
  unlock: function unlock() {
    _store.Store.update2("users", "unlocked", true);
  }
};