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

  draw: function draw(containerElementName) {
    var icon = d3.select(containerElementName).append("svg").attr("width", 100).attr("height", 100);

    icon.append("circle").style("stroke", RoundIcon.settings().borderColor).style("fill", RoundIcon.settings().backgroundColor).attr("r", 40).attr("cx", 50).attr("cy", 50).on("mouseover", function () {
      d3.select(this).style("fill", RoundIcon.settings().backgroundColorHover);
    }).on("mouseout", function () {
      d3.select(this).style("fill", RoundIcon.settings().backgroundColor);
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

var Resource = exports.Resource = {
  add: function add(name, amount) {
    _store.Store.update2('resources', name, window._store['resources'][name] + amount);
  }
};
},{"../store/store":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Store = exports.Store = {
  initialize: function initialize() {
    return {
      resources: {
        linesOfCode: 0
      }
    };
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

var _round_icon = require('../drawings/round_icon');

var UI = exports.UI = {
  initialize: function initialize() {

    // Button
    document.querySelector("#write-code").addEventListener('click', function (e) {
      _resource.Resource.add("linesOfCode", 1);
    });

    // Drawings
    UI.renderDrawings();
  },

  renderDrawings: function renderDrawings() {
    _round_icon.RoundIcon.draw("#drawings");
  }
};
},{"../drawings/round_icon":2,"../resources/resource":3}]},{},[1]);
