"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shop = undefined;

var _resource = require("../resources/resource");

var Shop = exports.Shop = {
  buy: function buy(optionData) {
    var currentAmount = _resource.Resource.get(optionData.resource);
    var neededAmount = optionData.cost;
    if (currentAmount < neededAmount) {
      alert("You don't have enough " + optionData.resource + " to buy this!");
    } else {
      if (optionData.id == "new-feature") {
        _resource.Resource.add('feature', 1);
      } else {
        _resource.Resource.add('servers', 1);
      }
      _resource.Resource.substract(optionData.resource, neededAmount);
    }
  }
};