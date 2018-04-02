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
  },

  toString: function toString(secondsSinceStart) {
    var hours = secondsSinceStart * Clock.hoursPerSecond();
    var days = Math.floor(hours / 24);
    var currentHour = hours % 24;
    var currentHourString = currentHour.toString();
    if (currentHour < 10) {
      currentHourString = "0" + currentHour;
    }
    var currentDay = days + 1;

    return "Day " + currentDay + " - " + currentHourString + ":00";
  }
};