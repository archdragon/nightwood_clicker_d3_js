import { Store } from '../store/store';
import { Resource } from '../resources/resource';

export var Users = {
  unlock: function() {
    Store.update2("users", "unlocked", true);
  },

  unlockHappiness: function() {
    Store.update2("users", "happinessUnlocked", true);
  },

  unlockAds: function() {
    Store.update2("users", "adsUnlocked", true);
  },

  tick: function() {
    if(!window._store.users.unlocked) {
      return null;
    }
    if(!window._store.servers.unlocked) {
      return null;
    }
    let speed = Resource.get("speed");
    let happiness = Resource.get("happiness");
    let removeChance = 0; // 0 - 1
    let addChance = 0; // 0 - 1
    let happinessAddChance = 0;
    let happinessRemoveChance = 0;

    if(speed > 0) {
      happinessAddChance = speed/500;
    } else if(speed < 0) {
      happinessRemoveChance = (-1 * speed)/100;
    }

    if(Math.random() < happinessAddChance) {
      Resource.add('happiness', 1);
    }

    if(Math.random() < happinessRemoveChance) {
      Resource.substract('happiness', 1);
    }

    if(happiness < 0) {
      removeChance = (-1 * happiness) / 50;
    }

    if(happiness > 0) {
      addChance = happiness / 100;
    } else {
      addChance = 0.1;
    }

    console.log("addChance", addChance);
    console.log("removeChance", removeChance);

    if(Math.random() < removeChance) {
      Resource.remove("users", 1);
    }

    if(Math.random() < addChance) {
      Resource.add("users", 1);
    }
  }
}
