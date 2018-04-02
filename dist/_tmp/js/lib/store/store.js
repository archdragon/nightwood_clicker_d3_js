"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Store = exports.Store = {
  initialize: function initialize() {
    return {
      clock: {
        currentTime: 0 // In hours
      },
      resources: {
        linesOfCode: 0,
        cash: 1000
      },
      features: {
        value: 0,
        unlocked: false,
        lastFeatureAddedAt: 0
      },
      users: {
        unlocked: false,
        happinessUnlocked: false,
        count: 0,
        happiness: 0,
        ads: 0
      },
      bugs: {
        value: 0,
        unlocked: false
      },
      servers: {
        value: 0,
        unlocked: false
      }
    };
  },

  toD3: function toD3(store) {
    var arr = [{ name: "code-lines", value: store.resources.linesOfCode, title: "Code", valueDesc: "code lines" }];

    if (store.features.unlocked) {
      arr.push({ name: "features", value: store.features.value, title: "Features", valueDesc: "features" });
    }

    if (store.servers.unlocked) {
      arr.push({ name: "app-server", value: store.servers.value, title: "Game Server", valueDesc: "server" });
    }

    if (store.bugs.unlocked) {
      arr.push({ name: "bugs", value: store.bugs.value, title: "Bugs", valueDesc: "bugs", small: true });
    }

    if (store.users.unlocked) {
      arr.push({ name: "user-count", value: store.users.count, title: "Users", valueDesc: "users" });
    }

    if (store.users.happinessUnlocked) {
      arr.push({ name: "users-happiness", value: store.users.happiness, title: "Happiness", valueDesc: "happiness", small: true });
    }

    if (store.users.adsUnclocked) {
      arr.push({ name: "users-ads", value: store.users.ads, title: "Ads", valueDesc: "ads", small: true });
    }

    return arr;
  },

  update2: function update2(key1, key2, value) {
    window._store[key1][key2] = value;
  }
};