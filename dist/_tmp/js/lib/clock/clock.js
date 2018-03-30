"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Clock = exports.Clock = {
  hoursPerSecond: function hoursPerSecond() {
    return 1;
  },

  initialize: function initialize(callback) {
    return setInterval(callback, 1000);
  }
};