(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _ui = require('./lib/ui/ui');

var _clock = require('./lib/clock/clock');

var _store = require('./lib/store/store');

window.onload = function () {
  window._store = _store.Store.initialize();

  var gameLoop = function gameLoop() {
    console.log("tick");
    var newTime = window._store.clock.currentTime + _clock.Clock.hoursPerSecond();
    _store.Store.update2('clock', 'currentTime', newTime);
  };

  _ui.UI.initialize();
  _clock.Clock.initialize(gameLoop);
};

},{"./lib/clock/clock":2,"./lib/store/store":6,"./lib/ui/ui":7}],2:[function(require,module,exports){
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
  }
};
},{}],3:[function(require,module,exports){
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
},{"../ui/ui":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Features = undefined;

var _store = require("../store/store");

var Features = exports.Features = {
  upgradeOptions: function upgradeOptions(store) {
    return [{ name: "Add new feature", cost: Features.upgradeCost(store.features.value), resource: "loc" }];
  },

  upgradeCost: function upgradeCost(currentLevel) {
    return 20 * Math.pow(1.02, currentLevel);
  },

  unlock: function unlock() {
    _store.Store.update2("features", "unlocked", true);
  }
};
},{"../store/store":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resource = undefined;

var _store = require('../store/store');

var _users = require('../users/users');

var _features = require('../features/features');

var _ui = require('../ui/ui');

var Resource = exports.Resource = {
  add: function add(name, amount) {
    var newAmount = window._store['resources'][name] + amount;
    _store.Store.update2('resources', name, newAmount);

    switch (name) {
      case 'linesOfCode':
        if (newAmount > 20) {
          _features.Features.unlock();
        }
        break;
    }

    _ui.UI.renderDrawings();
  }
};
},{"../features/features":4,"../store/store":6,"../ui/ui":7,"../users/users":8}],6:[function(require,module,exports){
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
        cash: 1
      },
      features: {
        value: 0,
        unlocked: false
      },
      users: {
        unlocked: false,
        count: 0,
        happiness: 0
      },
      server: {
        unlocked: false
      },
      bugs: {
        unlocked: false
      }
    };
  },

  toD3: function toD3(store) {
    var arr = [{ name: "code-lines", value: store.resources.linesOfCode, title: "Code", valueDesc: "code lines" }];

    if (store.features.unlocked) {
      arr.push({ name: "features", value: 0, title: "Features", valueDesc: "features" });
    }

    if (store.server.unlocked) {
      arr.push({ name: "app-server", value: 0, title: "Game Server", valueDesc: "server" });
    }

    if (store.bugs.unlocked) {
      arr.push({ name: "bugs", value: 0, title: "Bugs", valueDesc: "bugs", small: true });
    }

    if (store.users.unlocked) {
      arr.push({ name: "user-count", value: store.users.count, title: "Users", valueDesc: "users" });
    }

    return arr;
  },

  update2: function update2(key1, key2, value) {
    window._store[key1][key2] = value;
  }
};
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = undefined;

var _resource = require('../resources/resource');

var _store = require('../store/store');

var _round_icon = require('../drawings/round_icon');

var _features = require('../features/features');

var UI = exports.UI = {
  initialize: function initialize() {

    // Button
    document.querySelector("#write-code").addEventListener('click', function (e) {
      _resource.Resource.add("linesOfCode", 1);
    });

    var svg = d3.select("#drawings").append("svg").attr("width", 500).attr("height", 600).attr("class", "drawings-svg").append("g").attr("class", "circle-icons");

    // Drawings
    UI.renderDrawings();
  },

  openPanel: function openPanel(name) {
    var panel = d3.select("body").append("div").attr("class", "panel panel__" + name).attr("data-name", name);

    panel.append("div").attr("class", "close-button").html("&times;").on("click", function () {
      d3.select(".panel").remove();
    });

    panel.append("h2").text("Panel Title");

    UI.renderPanelOptions(panel, name);
  },

  renderPanelOptions: function renderPanelOptions(panel, name) {
    var data = _features.Features.upgradeOptions(window._store);

    var options = panel.selectAll(".panel-option").data(data);

    var newOption = options.enter();

    var wrapper = newOption.append("div").attr("class", "panel-option").text(function (d, i) {
      return d.name;
    });

    wrapper.append("div").attr("class", "panel-option-cost").text(function (d, i) {
      return d.cost + ' LoC';
    });
  },

  renderDrawings: function renderDrawings() {
    var update = d3.select("#drawings svg .circle-icons").selectAll("g").data(_store.Store.toD3(window._store), function (d) {
      return d.name;
    });

    _round_icon.RoundIcon.enter(update);
    _round_icon.RoundIcon.update(update);
  }
};
},{"../drawings/round_icon":3,"../features/features":4,"../resources/resource":5,"../store/store":6}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = undefined;

var _store = require("../store/store");

var Users = exports.Users = {
  unlock: function unlock() {
    _store.Store.update2("users", "unlocked", true);
  }
};
},{"../store/store":6}]},{},[1]);
