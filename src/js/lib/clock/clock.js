export var Clock = {
  hoursPerSecond: function() {
    return 1;
  },

  initialize: function(callback) {
    return setInterval(callback, 1000);
  },

  toString: function(secondsSinceStart) {
    let hours = secondsSinceStart * Clock.hoursPerSecond();
    let days = Math.floor(hours / 24);
    let currentHour = hours % 24;
    let currentHourString = currentHour.toString();
    if(currentHour < 10) {
      currentHourString = "0" + currentHour;
    }
    let currentDay = days + 1;

    return "Day " + currentDay + " - " + currentHourString + ":00";
  }
}
