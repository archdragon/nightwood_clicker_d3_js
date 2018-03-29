import { Store } from '../store/store'
import { UI } from '../ui/ui'

export var Resource = {
  add: function(name, amount) {
    Store.update2('resources', name, window._store['resources'][name] + amount);
    UI.renderDrawings();
  }
}
