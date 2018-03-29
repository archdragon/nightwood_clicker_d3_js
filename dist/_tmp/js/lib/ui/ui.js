'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = undefined;

var _resource = require('../resources/resource');

var _round_icon = require('../drawings/round_icon');

var UI = exports.UI = {
  initialize: function initialize() {

    // Button
    document.querySelector("#write-code").addEventListener('click', function (e) {
      _resource.Resource.add("linesOfCode", 1);
    });

    // Drawings
    UI.renderDrawings();
  },

  renderDrawings: function renderDrawings() {
    _round_icon.RoundIcon.draw("#drawings");
  }
};