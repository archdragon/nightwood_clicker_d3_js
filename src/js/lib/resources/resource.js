import { Store } from '../store/store'
import { Users } from '../users/users'
import { Features } from '../features/features'
import { UI } from '../ui/ui'

export var Resource = {
  add: function(name, amount) {
    let newAmount = window._store['resources'][name] + amount;
    Store.update2('resources', name, newAmount);

    switch(name) {
      case 'linesOfCode':
        if(newAmount > 20) {
          Features.unlock();
        }
      break;
    }

    UI.renderDrawings();
  }
}
