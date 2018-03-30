import { UI } from './lib/ui/ui'
import { Clock } from './lib/clock/clock'
import { Store } from './lib/store/store'

window.onload = function() {
  window._store = Store.initialize();

  let gameLoop = function() {
    console.log("tick");
    let newTime = window._store.clock.currentTime + Clock.hoursPerSecond();
    Store.update2('clock', 'currentTime', newTime);
  }

  UI.initialize();
  Clock.initialize(gameLoop);
}
