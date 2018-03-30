'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = undefined;

var _resource = require('../resources/resource');

var _store = require('../store/store');

var _round_icon = require('../drawings/round_icon');

var _features = require('../features/features');

var UI = exports.UI = {
  initialize: function initialize() {

    // Button
    document.querySelector("#write-code").addEventListener('click', function (e) {
      _resource.Resource.add("linesOfCode", 1);
    });

    var svg = d3.select("#drawings").append("svg").attr("width", 500).attr("height", 600).attr("class", "drawings-svg").append("g").attr("class", "circle-icons");

    // Drawings
    UI.renderDrawings();
  },

  openPanel: function openPanel(name) {
    var panel = d3.select("body").append("div").attr("class", "panel panel__" + name).attr("data-name", name);

    panel.append("div").attr("class", "close-button").html("&times;").on("click", function () {
      d3.select(".panel").remove();
    });

    panel.append("h2").text("Panel Title");

    UI.renderPanelOptions(panel, name);
  },

  renderPanelOptions: function renderPanelOptions(panel, name) {
    var data = _features.Features.upgradeOptions(window._store);

    var options = panel.selectAll(".panel-option").data(data);

    var newOption = options.enter();

    var wrapper = newOption.append("div").attr("class", "panel-option").text(function (d, i) {
      return d.name;
    });

    wrapper.append("div").attr("class", "panel-option-cost").text(function (d, i) {
      return d.cost + ' LoC';
    });
  },

  renderDrawings: function renderDrawings() {
    var update = d3.select("#drawings svg .circle-icons").selectAll("g").data(_store.Store.toD3(window._store), function (d) {
      return d.name;
    });

    _round_icon.RoundIcon.enter(update);
    _round_icon.RoundIcon.update(update);
  }
};