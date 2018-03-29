"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Store = exports.Store = {
  initialize: function initialize() {
    return {
      resources: {
        linesOfCode: 0
      }
    };
  },

  update2: function update2(key1, key2, value) {
    window._store[key1][key2] = value;
  }
};