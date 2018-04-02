'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelOptions = undefined;

var _resource = require('../resources/resource');

var _features = require('../features/features');

var _servers = require('../servers/servers');

var PanelOptions = exports.PanelOptions = {
  updateOptions: function updateOptions(options) {
    // Update
    options.select(".panel-option-cost span").attr("class", function (d, i) {
      var resourceAmount = _resource.Resource.get(d.resource);
      if (d.cost > resourceAmount) {
        return "cost-red";
      } else {
        return "cost-normal";
      }
    }).text(function (d, i) {
      return d.cost + ' ' + d.resource;
    });
  },

  getOptionsFor: function getOptionsFor(name) {
    if (name == "features") {
      return _features.Features.upgradeOptions(window._store);
    } else if (name == "app-server") {
      return _servers.Servers.upgradeOptions(window._store);
    } else {
      return [];
    }
  }
};