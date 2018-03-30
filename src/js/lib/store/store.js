export var Store = {
  initialize: function() {
    return {
      clock: {
        currentTime: 0 // In hours
      },
      resources: {
        linesOfCode: 0,
        cash: 1
      },
      features: {
        value: 0,
        unlocked: false
      },
      users: {
        unlocked: false,
        count: 0,
        happiness: 0
      },
      server: {
        unlocked: false
      },
      bugs: {
        unlocked: false
      }
    };
  },

  toD3: function(store) {
    let arr = [
      { name: "code-lines", value: store.resources.linesOfCode, title: "Code", valueDesc: "code lines" }
    ];

    if(store.features.unlocked) {
      arr.push({ name: "features", value: 0, title: "Features", valueDesc: "features" });
    }

    if(store.server.unlocked) {
      arr.push({ name: "app-server", value: 0, title: "Game Server", valueDesc: "server" });
    }

    if(store.bugs.unlocked) {
      arr.push({ name: "bugs", value: 0, title: "Bugs", valueDesc: "bugs", small: true });
    }

    if(store.users.unlocked) {
      arr.push({ name: "user-count", value: store.users.count, title: "Users", valueDesc: "users" });
    }

    return arr;
  },

  update2: function(key1, key2, value) {
    window._store[key1][key2] = value;
  }
}
