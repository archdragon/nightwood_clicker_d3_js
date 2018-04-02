'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = undefined;

var _resource = require('../resources/resource');

var _store = require('../store/store');

var _shop = require('../shop/shop');

var _clock = require('../clock/clock');

var _cash = require('../cash/cash');

var _round_icon = require('../drawings/round_icon');

var _features = require('../features/features');

var _panel_options = require('../ui/panel_options');

var UI = exports.UI = {
  initialize: function initialize() {

    // Button
    document.querySelector("#write-code").addEventListener('click', function (e) {
      _resource.Resource.add("linesOfCode", 1);
    });

    var svg = d3.select("#drawings").append("svg").attr("class", "drawings-svg").style("pointer-events", "all").call(d3.zoom().scaleExtent([1 / 2, 2]).on("zoom", function () {
      this.querySelector(".circle-icons").setAttribute("transform", d3.event.transform);
    })).append("g").attr("class", "circle-icons");

    // Drawings
    UI.renderDrawings();
  },

  openPanel: function openPanel(name) {
    var existingPanel = d3.select(".panel");
    if (existingPanel.size() > 0) {
      existingPanel.remove();
    }

    var panel = d3.select("body").append("div").attr("class", "panel panel__" + name).attr("data-name", name);

    panel.append("div").attr("class", "close-button").html("&times;").on("click", function () {
      d3.select(".panel").remove();
    });

    panel.append("h2").text("Panel Title");

    UI.renderPanelOptions(panel, name);
  },

  renderOpenPanel: function renderOpenPanel() {
    var panel = d3.select(".panel");
    if (panel.size() > 0) {
      var name = panel.attr("data-name");
      UI.renderPanelOptions(panel, name);
    }
  },

  renderPanelOptions: function renderPanelOptions(panel, name) {
    var data = _panel_options.PanelOptions.getOptionsFor(name);

    var options = panel.selectAll(".panel-option").data(data);

    options.exit().remove();

    // Create
    var newOption = options.enter();

    var wrapper = newOption.append("div").attr("class", "panel-option").text(function (d, i) {
      return d.name;
    });

    wrapper.append("div").attr("class", "panel-option-cost").append("span").text(function (d, i) {
      return d.cost + ' ' + d.resource;
    });

    wrapper.on("click", function (d, i) {
      return _shop.Shop.buy(d);
    });

    _panel_options.PanelOptions.updateOptions(options);

    console.log("Panel options updated");
  },

  renderDrawings: function renderDrawings() {
    var update = d3.select("#drawings svg .circle-icons").selectAll("g").data(_store.Store.toD3(window._store), function (d) {
      return d.name;
    });

    _round_icon.RoundIcon.enter(update);
    _round_icon.RoundIcon.update(update);

    update.exit().remove();

    console.log("Deawings updated");
  },

  updateClock: function updateClock(secondsSinceStart) {
    if (!window._clockElement) {
      window._clockElement = document.querySelector("#clock");
    }
    window._clockElement.textContent = _clock.Clock.toString(secondsSinceStart);
  },

  updateCash: function updateCash() {
    if (!window._cashElement) {
      window._cashElement = document.querySelector("#cash");
    }

    window._cashElement.textContent = _cash.Cash.toString();
  }
};