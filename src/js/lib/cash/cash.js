import { Resource } from '../resources/resource'

export var Cash = {
  tick: function() {
    let store = window._store;
    if(store.users.count > 0) {
      Resource.substract("cash", Math.floor(store.users.count / 10) + 1);
    }
  },

  toString: function() {
    return window._store.resources.cash + " $";
  }
}
