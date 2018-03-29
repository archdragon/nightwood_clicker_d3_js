import { UI } from './lib/ui/ui'
import { Store } from './lib/store/store'

window.onload = function() {
  window._store = Store.initialize();
  console.log(window._store);
  UI.initialize();
}
