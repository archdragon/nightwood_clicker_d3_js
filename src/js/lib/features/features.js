import { Store } from '../store/store';

export var Features = {
  upgradeOptions: function(store) {
    return [
      { name: "Add new feature", cost: Features.upgradeCost(store.features.value), resource: "loc" }
    ];
  },

  upgradeCost: function(currentLevel) {
    return 20 * Math.pow(1.02, currentLevel);
  },

  unlock: function() {
    Store.update2("features", "unlocked", true);
  }
}
