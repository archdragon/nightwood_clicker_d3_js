'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = undefined;

var _resource = require('../resources/resource');

var _store = require('../store/store');

var _round_icon = require('../drawings/round_icon');

var UI = exports.UI = {
  initialize: function initialize() {

    // Button
    document.querySelector("#write-code").addEventListener('click', function (e) {
      _resource.Resource.add("linesOfCode", 1);
    });

    var svg = d3.select("#drawings").append("svg").attr("width", 500).attr("height", 600).attr("class", "drawings-svg");

    // Drawings
    UI.renderDrawings();
  },

  renderDrawings: function renderDrawings() {
    var update = d3.select("#drawings svg").selectAll("g").data(_store.Store.toD3(window._store), function (d) {
      return d.name;
    });

    _round_icon.RoundIcon.enter(update);
    _round_icon.RoundIcon.update(update);
  }
};