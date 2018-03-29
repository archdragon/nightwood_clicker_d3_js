import { Store } from '../store/store'

export var Resource = {
  add: function(name, amount) {
    Store.update2('resources', name, window._store['resources'][name] + amount);
  }
}
