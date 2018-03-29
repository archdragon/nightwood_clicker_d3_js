(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _ui = require('./lib/ui/ui');

var _store = require('./lib/store/store');

window.onload = function () {
  window._store = _store.Store.initialize();
  console.log(window._store);
  _ui.UI.initialize();
};

},{"./lib/store/store":4,"./lib/ui/ui":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RoundIcon = exports.RoundIcon = {
  settings: function settings() {
    return {
      borderColor: "rgba(255, 255, 255, 0.6)",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      backgroundColorHover: "rgba(255, 255, 255, 0.5)"
    };
  },

  position: function position(name) {
    var pos = { x: 0, y: 0 };

    switch (name) {
      case 'user-count':
        pos = { x: 100, y: 0 };
        break;
    }

    return "translate(" + pos.x + "," + pos.y + ")";
  },


  enter: function enter(update, name) {
    var enter = update.enter();

    var g = enter.append("g");

    g.attr("class", name + "__group circle-group");

    g.append("circle").style("stroke", RoundIcon.settings().borderColor).style("fill", RoundIcon.settings().backgroundColor).attr("r", 40).attr("cx", 50).attr("cy", 50);
    //.on("mouseover", function(){d3.select(this).style("fill", RoundIcon.settings().backgroundColorHover);})
    //.on("mouseout", function(){d3.select(this).style("fill", RoundIcon.settings().backgroundColor);})

    g.append("image").attr("x", 34).attr("y", 34).attr("width", 32).attr("height", 32);

    g.append("text").attr("x", 50).attr("y", 110).attr("width", 100).attr("height", 32).attr("class", "title");

    g.append("text").attr("x", 50).attr("y", 130).attr("width", 100).attr("height", 32).attr("class", "desc");
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
  }
};
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resource = undefined;

var _store = require('../store/store');

var _ui = require('../ui/ui');

var Resource = exports.Resource = {
  add: function add(name, amount) {
    _store.Store.update2('resources', name, window._store['resources'][name] + amount);
    _ui.UI.renderDrawings();
  }
};
},{"../store/store":4,"../ui/ui":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Store = exports.Store = {
  initialize: function initialize() {
    return {
      resources: {
        linesOfCode: 0,
        cash: 1
      },
      users: {
        count: 0,
        happiness: 0
      }
    };
  },

  toD3: function toD3(store) {
    return [{ name: "code-lines", value: store.resources.linesOfCode, title: "Code Lines", valueDesc: "code lines" }, { name: "user-count", value: store.users.count, title: "Users", valueDesc: "users" }];
  },

  update2: function update2(key1, key2, value) {
    window._store[key1][key2] = value;
  }
};
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = undefined;

var _resource = require('../resources/resource');

var _store = require('../store/store');

var _round_icon = require('../drawings/round_icon');

var UI = exports.UI = {
  initialize: function initialize() {

    // Button
    document.querySelector("#write-code").addEventListener('click', function (e) {
      _resource.Resource.add("linesOfCode", 1);
    });

    var svg = d3.select("#drawings").append("svg").attr("width", 500).attr("height", 600).attr("class", "drawings-svg");

    // Drawings
    UI.renderDrawings();
  },

  renderDrawings: function renderDrawings() {
    var update = d3.select("#drawings svg").selectAll("g").data(_store.Store.toD3(window._store), function (d) {
      return d.name;
    });

    _round_icon.RoundIcon.enter(update);
    _round_icon.RoundIcon.update(update);
  }
};
},{"../drawings/round_icon":2,"../resources/resource":3,"../store/store":4}]},{},[1]);
