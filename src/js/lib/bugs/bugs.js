import { Store } from '../store/store';

export var Bugs = {
  unlock: function() {
    Store.update2("bugs", "unlocked", true);
  }
}
