(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _ui = require('./lib/ui/ui');

var _clock = require('./lib/clock/clock');

var _store = require('./lib/store/store');

var _users = require('./lib/users/users');

var _cash = require('./lib/cash/cash');

window.onload = function () {
  window._store = _store.Store.initialize();

  d3.zoom();

  var gameLoop = function gameLoop() {
    console.log("tick");
    var newTime = window._store.clock.currentTime + _clock.Clock.hoursPerSecond();
    _store.Store.update2('clock', 'currentTime', newTime);

    _users.Users.tick();
    _cash.Cash.tick();

    _ui.UI.updateClock(newTime);
    _ui.UI.updateCash();
  };

  _ui.UI.initialize();
  _clock.Clock.initialize(gameLoop);
};

},{"./lib/cash/cash":3,"./lib/clock/clock":4,"./lib/store/store":10,"./lib/ui/ui":12,"./lib/users/users":13}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bugs = undefined;

var _store = require("../store/store");

var Bugs = exports.Bugs = {
  unlock: function unlock() {
    _store.Store.update2("bugs", "unlocked", true);
  }
};
},{"../store/store":10}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cash = undefined;

var _resource = require("../resources/resource");

var Cash = exports.Cash = {
  tick: function tick() {
    var store = window._store;
    if (store.users.count > 0) {
      _resource.Resource.substract("cash", Math.floor(store.users.count / 10) + 1);
    }
  },

  toString: function toString() {
    return window._store.resources.cash + " $";
  }
};
},{"../resources/resource":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Clock = exports.Clock = {
  hoursPerSecond: function hoursPerSecond() {
    return 1;
  },

  initialize: function initialize(callback) {
    return setInterval(callback, 1000);
  },

  toString: function toString(secondsSinceStart) {
    var hours = secondsSinceStart * Clock.hoursPerSecond();
    var days = Math.floor(hours / 24);
    var currentHour = hours % 24;
    var currentHourString = currentHour.toString();
    if (currentHour < 10) {
      currentHourString = "0" + currentHour;
    }
    var currentDay = days + 1;

    return "Day " + currentDay + " - " + currentHourString + ":00";
  }
};
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoundIcon = undefined;

var _ui = require("../ui/ui");

var RoundIcon = exports.RoundIcon = {
  settings: {
    borderColor: "rgba(255, 255, 255, 0.6)",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    backgroundColorHover: "rgba(255, 255, 255, 0.5)",
    radius: 40,
    radiusSmall: 25
  },

  position: function position(name) {
    var pos = { x: 0, y: 0 };

    switch (name) {
      case 'code-lines':
        pos = { x: 100, y: 140 };
        break;
      case 'bugs':
        pos = { x: 100, y: 280 };
        break;
      case 'app-server':
        pos = { x: 200, y: 140 };
        break;
      case 'db-server':
        pos = { x: 300, y: 140 };
        break;
      case 'features':
        pos = { x: 100, y: 0 };
        break;
      case 'user-count':
        pos = { x: 0, y: 140 };
        break;
      case 'users-happiness':
        pos = { x: 0, y: 280 };
        break;
      case 'users-ads':
        pos = { x: 0, y: 0 };
        break;
    }

    return "translate(" + pos.x + "," + pos.y + ")";
  },


  setRadius: function setRadius(d, i) {
    if (d && d.small) {
      return RoundIcon.settings.radiusSmall;
    }
    return RoundIcon.settings.radius;
  },

  enter: function enter(update) {
    var enter = update.enter();

    var g = enter.append("g");

    g.attr("class", function (d, _i) {
      return d.name + "__group circle-group";
    }).attr("transform", function (d, _i) {
      return RoundIcon.position(d.name);
    });

    g.append("circle").style("stroke", RoundIcon.settings.borderColor).style("fill", RoundIcon.settings.backgroundColor).attr("r", RoundIcon.settings.setRadius).attr("cx", 50).attr("cy", 50);
    //.on("mouseover", function(){d3.select(this).style("fill", RoundIcon.settings().backgroundColorHover);})
    //.on("mouseout", function(){d3.select(this).style("fill", RoundIcon.settings().backgroundColor);})

    g.append("image").attr("x", 34).attr("y", 34).attr("width", 32).attr("height", 32);

    g.append("text").attr("x", 50).attr("y", 110).attr("width", 100).attr("height", 32).attr("class", "title");

    g.append("text").attr("x", 50).attr("y", 130).attr("width", 100).attr("height", 32).attr("class", "desc");

    g.on("click", function (d, i) {
      _ui.UI.openPanel(d.name);
    });

    RoundIcon.update(update);
  },

  update: function update(_update) {
    _update.attr("transform", function (d, _i) {
      return RoundIcon.position(d.name);
    }).select("text.desc").text(function (d, _i) {
      return d.value + " " + d.valueDesc;
    });

    _update.select("image").attr("xlink:href", function (d) {
      return "img/" + d.name + ".svg";
    });

    _update.select("text.title").text(function (d, _i) {
      return d.title;
    });

    _update.select("circle").attr("r", function (d, i) {
      var oldValue = d3.select(this).attr("data-value");
      if (d.value != parseInt(oldValue)) {
        return RoundIcon.setRadius(d, i) - 5;
      } else {
        return RoundIcon.setRadius(d, i);
      }
    }).transition().ease(d3.easeBounce).duration(60).attr("r", function (d, i) {
      var oldValue = d3.select(this).attr("data-value");
      if (d.value == parseInt(oldValue)) {
        return RoundIcon.setRadius(d, i);
      } else {
        return RoundIcon.setRadius(d, i) + 4;
      }
    }).attr("data-value", function (d, i) {
      return d.value;
    }).transition().ease(d3.easeBounce).delay(100).duration(150).attr("r", RoundIcon.setRadius);
  }
};
},{"../ui/ui":12}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Features = undefined;

var _store = require("../store/store");

var Features = exports.Features = {
  upgradeOptions: function upgradeOptions(store) {
    return [{ id: "new-feature", name: "Add new feature", cost: Features.upgradeCost(store.features.value), resource: "loc" }];
  },

  upgradeCost: function upgradeCost(currentLevel) {
    return Math.ceil(20 * Math.pow(1.04, currentLevel));
  },

  unlock: function unlock() {
    _store.Store.update2("features", "unlocked", true);
  }
};
},{"../store/store":10}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resource = undefined;

var _store = require('../store/store');

var _users = require('../users/users');

var _bugs = require('../bugs/bugs');

var _servers = require('../servers/servers');

var _features = require('../features/features');

var _ui = require('../ui/ui');

var Resource = exports.Resource = {
  get: function get(name) {
    name = Resource.expandName(name);
    if (name == "users") {
      return window._store['users']['count'];
    } else if (name == "speed") {
      if (Resource.get("users") <= 0) {
        return 0;
      }
      var speed = Math.ceil(2 * (Resource.get("servers") / (Resource.get("users") / 100) * 200)) - 100;
      if (speed > 100) {
        speed = 100;
      } else if (speed < -100) {
        speed = -100;
      }

      return speed;
    } else if (name == "happiness") {
      return window._store['users']['happiness'];
    } else if (name == "servers") {
      return window._store.servers.value;
    }
    return window._store['resources'][name];
  },

  add: function add(name, amount) {
    name = Resource.expandName(name);

    switch (name) {
      case 'bugs':
        var newAmount = window._store['bugs']['value'] + amount;
        _store.Store.update2('bugs', 'value', newAmount);
        break;
      case 'feature':
        var newAmount = window._store['features']['value'] + amount;
        _store.Store.update2('features', 'value', newAmount);
        break;
      case 'users':
        var newAmount = window._store['users']['count'] + amount;
        _store.Store.update2('users', 'count', newAmount);
        break;
      case 'servers':
        var newAmount = window._store['servers']['value'] + amount;
        _store.Store.update2('servers', 'value', newAmount);
        break;
      case 'happiness':
        var newAmount = window._store['users']['happiness'] + amount;
        _store.Store.update2('users', 'happiness', newAmount);
        break;
      default:
        var newAmount = window._store['resources'][name] + amount;
        _store.Store.update2('resources', name, newAmount);
        break;
    }

    switch (name) {
      case 'linesOfCode':
        if (newAmount >= 20) {
          _features.Features.unlock();
        }

        if (window._store.bugs.unlocked) {
          var bugChance = 0.01;
          bugChance += Resource.get('features') * 0.001;
          if (Math.random() < bugChance) {
            Resource.add("bugs", 1);
          }
        }
        break;
      case 'feature':
        if (newAmount >= 3) {
          _users.Users.unlock();
          _servers.Servers.unlock();
        }
        if (newAmount >= 6) {
          _bugs.Bugs.unlock();
        }
        break;
      case 'users':
        if (newAmount > 15) {
          _users.Users.unlockHappiness();
        }
        if (newAmount > 4) {
          _users.Users.unlockAds();
        }
        break;
    }

    _ui.UI.renderDrawings();
    _ui.UI.renderOpenPanel();
  },

  substract: function substract(name, amount) {
    Resource.add(name, 0 - amount);
  },

  expandName: function expandName(name) {
    if (name == 'loc') {
      return 'linesOfCode';
    } else if (name == '$') {
      return 'cash';
    }

    return name;
  }
};
},{"../bugs/bugs":2,"../features/features":6,"../servers/servers":8,"../store/store":10,"../ui/ui":12,"../users/users":13}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Servers = undefined;

var _store = require("../store/store");

var Servers = exports.Servers = {
  upgradeOptions: function upgradeOptions(store) {
    return [{ key: "new-server", name: "Buy extra server", cost: Servers.upgradeCost(store.servers.value), resource: "$" }];
  },

  upgradeCost: function upgradeCost(currentLevel) {
    return Math.ceil(100 * Math.pow(1.02, currentLevel) + currentLevel);
  },

  unlock: function unlock() {
    _store.Store.update2("servers", "unlocked", true);
  }
};
},{"../store/store":10}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shop = undefined;

var _resource = require("../resources/resource");

var Shop = exports.Shop = {
  buy: function buy(optionData) {
    var currentAmount = _resource.Resource.get(optionData.resource);
    var neededAmount = optionData.cost;
    if (currentAmount < neededAmount) {
      alert("You don't have enough " + optionData.resource + " to buy this!");
    } else {
      if (optionData.id == "new-feature") {
        _resource.Resource.add('feature', 1);
      } else {
        _resource.Resource.add('servers', 1);
      }
      _resource.Resource.substract(optionData.resource, neededAmount);
    }
  }
};
},{"../resources/resource":7}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Store = exports.Store = {
  initialize: function initialize() {
    return {
      clock: {
        currentTime: 0 // In hours
      },
      resources: {
        linesOfCode: 0,
        cash: 1000
      },
      features: {
        value: 0,
        unlocked: false,
        lastFeatureAddedAt: 0
      },
      users: {
        unlocked: false,
        happinessUnlocked: false,
        count: 0,
        happiness: 0,
        ads: 0
      },
      bugs: {
        value: 0,
        unlocked: false
      },
      servers: {
        value: 0,
        unlocked: false
      }
    };
  },

  toD3: function toD3(store) {
    var arr = [{ name: "code-lines", value: store.resources.linesOfCode, title: "Code", valueDesc: "code lines" }];

    if (store.features.unlocked) {
      arr.push({ name: "features", value: store.features.value, title: "Features", valueDesc: "features" });
    }

    if (store.servers.unlocked) {
      arr.push({ name: "app-server", value: store.servers.value, title: "Game Server", valueDesc: "server" });
    }

    if (store.bugs.unlocked) {
      arr.push({ name: "bugs", value: store.bugs.value, title: "Bugs", valueDesc: "bugs", small: true });
    }

    if (store.users.unlocked) {
      arr.push({ name: "user-count", value: store.users.count, title: "Users", valueDesc: "users" });
    }

    if (store.users.happinessUnlocked) {
      arr.push({ name: "users-happiness", value: store.users.happiness, title: "Happiness", valueDesc: "happiness", small: true });
    }

    if (store.users.adsUnclocked) {
      arr.push({ name: "users-ads", value: store.users.ads, title: "Ads", valueDesc: "ads", small: true });
    }

    return arr;
  },

  update2: function update2(key1, key2, value) {
    window._store[key1][key2] = value;
  }
};
},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelOptions = undefined;

var _resource = require('../resources/resource');

var _features = require('../features/features');

var _servers = require('../servers/servers');

var PanelOptions = exports.PanelOptions = {
  updateOptions: function updateOptions(options) {
    // Update
    options.select(".panel-option-cost span").attr("class", function (d, i) {
      var resourceAmount = _resource.Resource.get(d.resource);
      if (d.cost > resourceAmount) {
        return "cost-red";
      } else {
        return "cost-normal";
      }
    }).text(function (d, i) {
      return d.cost + ' ' + d.resource;
    });
  },

  getOptionsFor: function getOptionsFor(name) {
    if (name == "features") {
      return _features.Features.upgradeOptions(window._store);
    } else if (name == "app-server") {
      return _servers.Servers.upgradeOptions(window._store);
    } else {
      return [];
    }
  }
};
},{"../features/features":6,"../resources/resource":7,"../servers/servers":8}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = undefined;

var _resource = require('../resources/resource');

var _store = require('../store/store');

var _shop = require('../shop/shop');

var _clock = require('../clock/clock');

var _cash = require('../cash/cash');

var _round_icon = require('../drawings/round_icon');

var _features = require('../features/features');

var _panel_options = require('../ui/panel_options');

var UI = exports.UI = {
  initialize: function initialize() {

    // Button
    document.querySelector("#write-code").addEventListener('click', function (e) {
      _resource.Resource.add("linesOfCode", 1);
    });

    var svg = d3.select("#drawings").append("svg").attr("class", "drawings-svg").style("pointer-events", "all").call(d3.zoom().scaleExtent([1 / 2, 2]).on("zoom", function () {
      this.querySelector(".circle-icons").setAttribute("transform", d3.event.transform);
    })).append("g").attr("class", "circle-icons");

    // Drawings
    UI.renderDrawings();
  },

  openPanel: function openPanel(name) {
    var existingPanel = d3.select(".panel");
    if (existingPanel.size() > 0) {
      existingPanel.remove();
    }

    var panel = d3.select("body").append("div").attr("class", "panel panel__" + name).attr("data-name", name);

    panel.append("div").attr("class", "close-button").html("&times;").on("click", function () {
      d3.select(".panel").remove();
    });

    panel.append("h2").text("Panel Title");

    UI.renderPanelOptions(panel, name);
  },

  renderOpenPanel: function renderOpenPanel() {
    var panel = d3.select(".panel");
    if (panel.size() > 0) {
      var name = panel.attr("data-name");
      UI.renderPanelOptions(panel, name);
    }
  },

  renderPanelOptions: function renderPanelOptions(panel, name) {
    var data = _panel_options.PanelOptions.getOptionsFor(name);

    var options = panel.selectAll(".panel-option").data(data);

    options.exit().remove();

    // Create
    var newOption = options.enter();

    var wrapper = newOption.append("div").attr("class", "panel-option").text(function (d, i) {
      return d.name;
    });

    wrapper.append("div").attr("class", "panel-option-cost").append("span").text(function (d, i) {
      return d.cost + ' ' + d.resource;
    });

    wrapper.on("click", function (d, i) {
      return _shop.Shop.buy(d);
    });

    _panel_options.PanelOptions.updateOptions(options);

    console.log("Panel options updated");
  },

  renderDrawings: function renderDrawings() {
    var update = d3.select("#drawings svg .circle-icons").selectAll("g").data(_store.Store.toD3(window._store), function (d) {
      return d.name;
    });

    _round_icon.RoundIcon.enter(update);
    _round_icon.RoundIcon.update(update);

    update.exit().remove();

    console.log("Deawings updated");
  },

  updateClock: function updateClock(secondsSinceStart) {
    if (!window._clockElement) {
      window._clockElement = document.querySelector("#clock");
    }
    window._clockElement.textContent = _clock.Clock.toString(secondsSinceStart);
  },

  updateCash: function updateCash() {
    if (!window._cashElement) {
      window._cashElement = document.querySelector("#cash");
    }

    window._cashElement.textContent = _cash.Cash.toString();
  }
};
},{"../cash/cash":3,"../clock/clock":4,"../drawings/round_icon":5,"../features/features":6,"../resources/resource":7,"../shop/shop":9,"../store/store":10,"../ui/panel_options":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = undefined;

var _store = require('../store/store');

var _resource = require('../resources/resource');

var Users = exports.Users = {
  unlock: function unlock() {
    _store.Store.update2("users", "unlocked", true);
  },

  unlockHappiness: function unlockHappiness() {
    _store.Store.update2("users", "happinessUnlocked", true);
  },

  unlockAds: function unlockAds() {
    _store.Store.update2("users", "adsUnlocked", true);
  },

  tick: function tick() {
    if (!window._store.users.unlocked) {
      return null;
    }
    if (!window._store.servers.unlocked) {
      return null;
    }
    var speed = _resource.Resource.get("speed");
    var happiness = _resource.Resource.get("happiness");
    var removeChance = 0; // 0 - 1
    var addChance = 0; // 0 - 1
    var happinessAddChance = 0;
    var happinessRemoveChance = 0;

    if (speed > 0) {
      happinessAddChance = speed / 500;
    } else if (speed < 0) {
      happinessRemoveChance = -1 * speed / 100;
    }

    if (Math.random() < happinessAddChance) {
      _resource.Resource.add('happiness', 1);
    }

    if (Math.random() < happinessRemoveChance) {
      _resource.Resource.substract('happiness', 1);
    }

    if (happiness < 0) {
      removeChance = -1 * happiness / 50;
    }

    if (happiness > 0) {
      addChance = happiness / 100;
    } else {
      addChance = 0.1;
    }

    console.log("addChance", addChance);
    console.log("removeChance", removeChance);

    if (Math.random() < removeChance) {
      _resource.Resource.remove("users", 1);
    }

    if (Math.random() < addChance) {
      _resource.Resource.add("users", 1);
    }
  }
};
},{"../resources/resource":7,"../store/store":10}]},{},[1]);
