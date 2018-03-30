export var Clock = {
  hoursPerSecond: function() {
    return 1;
  },

  initialize: function(callback) {
    return setInterval(callback, 1000);
  }
}
