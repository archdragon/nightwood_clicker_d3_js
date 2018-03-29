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