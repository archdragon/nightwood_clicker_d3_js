import { Store } from '../store/store';

export var Servers = {
  upgradeOptions: function(store) {
    return [
      { key: "new-server", name: "Buy extra server", cost: Servers.upgradeCost(store.servers.value), resource: "$" }
    ];
  },

  upgradeCost: function(currentLevel) {
    return Math.ceil(100 * Math.pow(1.02, currentLevel) + currentLevel);
  },

  unlock: function() {
    Store.update2("servers", "unlocked", true);
  }
}
