import { Store } from '../store/store'
import { Users } from '../users/users'
import { Bugs } from '../bugs/bugs'
import { Servers } from '../servers/servers'
import { Features } from '../features/features'
import { UI } from '../ui/ui'

export var Resource = {
  get: function(name) {
    name = Resource.expandName(name);
    if(name == "users") {
      return window._store['users']['count'];

    } else if(name == "speed") {
      if(Resource.get("users") <= 0) {
        return 0;
      }
      let speed = Math.ceil(2 * (Resource.get("servers") / (Resource.get("users") / 100) * 200)) - 100;
      if(speed > 100) {
        speed = 100;
      } else if(speed < -100) {
        speed = -100;
      }

      return speed;

    } else if(name == "happiness") {
      return window._store['users']['happiness'];
    } else if(name == "servers") {
      return window._store.servers.value;
    }
    return window._store['resources'][name];
  },

  add: function(name, amount) {
    name = Resource.expandName(name);

    switch(name) {
      case 'bugs':
        var newAmount = window._store['bugs']['value'] + amount;
        Store.update2('bugs', 'value', newAmount);
      break;
      case 'feature':
        var newAmount = window._store['features']['value'] + amount;
        Store.update2('features', 'value', newAmount);
      break;
      case 'users':
        var newAmount = window._store['users']['count'] + amount;
        Store.update2('users', 'count', newAmount);
      break;
      case 'servers':
        var newAmount = window._store['servers']['value'] + amount;
        Store.update2('servers', 'value', newAmount);
      break;
      case 'happiness':
        var newAmount = window._store['users']['happiness'] + amount;
        Store.update2('users', 'happiness', newAmount);
      break;
      default:
        var newAmount = window._store['resources'][name] + amount;
        Store.update2('resources', name, newAmount);
      break;
    }

    switch(name) {
      case 'linesOfCode':
        if(newAmount >= 20) {
          Features.unlock();
        }

        if(window._store.bugs.unlocked) {
          let bugChance = 0.01;
          bugChance += Resource.get('features') * 0.001;
          if(Math.random() < bugChance) {
            Resource.add("bugs", 1);
          }
        }
      break;
      case 'feature':
        if(newAmount >= 3) {
          Users.unlock();
          Servers.unlock();
        }
        if(newAmount >= 6) {
          Bugs.unlock();
        }
      break;
      case 'users':
        if(newAmount > 15) {
          Users.unlockHappiness();
        }
        if(newAmount > 4) {
          Users.unlockAds();
        }
      break;
    }

    UI.renderDrawings();
    UI.renderOpenPanel();
  },

  substract: function(name, amount) {
    Resource.add(name, 0 - amount);
  },

  expandName: function(name) {
    if(name == 'loc') {
      return 'linesOfCode';
    } else if(name == '$') {
      return 'cash';
    }

    return name;
  }
}
