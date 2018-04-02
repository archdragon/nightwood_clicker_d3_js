import { UI } from './lib/ui/ui'
import { Clock } from './lib/clock/clock'
import { Store } from './lib/store/store'
import { Users } from './lib/users/users'
import { Cash } from './lib/cash/cash'

window.onload = function() {
  window._store = Store.initialize();

  d3.zoom();

  let gameLoop = function() {
    console.log("tick");
    let newTime = window._store.clock.currentTime + Clock.hoursPerSecond();
    Store.update2('clock', 'currentTime', newTime);

    Users.tick();
    Cash.tick();

    UI.updateClock(newTime);
    UI.updateCash();
  }

  UI.initialize();
  Clock.initialize(gameLoop);
}
