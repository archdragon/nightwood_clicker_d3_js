import { Store } from '../store/store';

export var Features = {
  upgradeOptions: function(store) {
    return [
      { id: "new-feature", name: "Add new feature", cost: Features.upgradeCost(store.features.value), resource: "loc" }
    ];
  },

  upgradeCost: function(currentLevel) {
    return Math.ceil(20 * Math.pow(1.04, currentLevel));
  },

  unlock: function() {
    Store.update2("features", "unlocked", true);
  }
}
