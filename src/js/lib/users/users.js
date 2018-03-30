import { Store } from '../store/store';

export var Users = {
  unlock: function() {
    Store.update2("users", "unlocked", true);
  }
}
