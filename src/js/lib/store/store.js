export var Store = {
  initialize: function() {
    return {
      resources: {
        linesOfCode: 0,
        cash: 1
      },
      users: {
        count: 0,
        happiness: 0
      }
    };
  },

  toD3: function(store) {
    return [
      { name: "code-lines", value: store.resources.linesOfCode, title: "Code Lines", valueDesc: "code lines" },
      { name: "user-count", value: store.users.count, title: "Users", valueDesc: "users" }
    ]
  },

  update2: function(key1, key2, value) {
    window._store[key1][key2] = value;
  }
}
