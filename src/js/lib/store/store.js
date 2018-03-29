export var Store = {
  initialize: function() {
    return {
      resources: {
        linesOfCode: 0
      }
    };
  },

  update2: function(key1, key2, value) {
    window._store[key1][key2] = value;
  }
}
