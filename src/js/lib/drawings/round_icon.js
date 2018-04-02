import { UI } from '../ui/ui';

export var RoundIcon = {
  settings: {
    borderColor: "rgba(255, 255, 255, 0.6)",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    backgroundColorHover: "rgba(255, 255, 255, 0.5)",
    radius: 40,
    radiusSmall: 25
  },

  position(name) {
    let pos = { x: 0, y: 0 };

    switch(name)  {
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

  setRadius: function(d, i) {
    if(d && d.small) {
      return RoundIcon.settings.radiusSmall;
    }
    return RoundIcon.settings.radius;
  },

  enter: function(update) {
    let enter = update.enter();

    let g = enter.append("g");

    g.attr("class", function(d, _i) { return d.name + "__group circle-group" })
      .attr("transform", function(d, _i) { return RoundIcon.position(d.name) });

    g.append("circle")
      .style("stroke", RoundIcon.settings.borderColor)
      .style("fill", RoundIcon.settings.backgroundColor)
      .attr("r", RoundIcon.settings.setRadius)
      .attr("cx", 50)
      .attr("cy", 50)
      //.on("mouseover", function(){d3.select(this).style("fill", RoundIcon.settings().backgroundColorHover);})
      //.on("mouseout", function(){d3.select(this).style("fill", RoundIcon.settings().backgroundColor);})

    g.append("image")
      .attr("x", 34)
      .attr("y", 34)
      .attr("width", 32)
      .attr("height", 32);

    g.append("text")
      .attr("x", 50)
      .attr("y", 110)
      .attr("width", 100)
      .attr("height", 32)
      .attr("class", "title")

    g.append("text")
      .attr("x", 50)
      .attr("y", 130)
      .attr("width", 100)
      .attr("height", 32)
      .attr("class", "desc")

    g.on("click", function(d, i) {
      UI.openPanel(d.name);
    })

    RoundIcon.update(update);
  },

  update(update) {
    update
      .attr("transform", function(d, _i) { return RoundIcon.position(d.name) })
      .select("text.desc")
      .text(function(d, _i) { return d.value + " " + d.valueDesc });

    update
      .select("image")
      .attr("xlink:href", function(d) { return "img/" + d.name + ".svg" })

    update
      .select("text.title")
      .text(function(d, _i) { return d.title });

    update
      .select("circle")
        .attr("r", function(d, i) {
          let oldValue = d3.select(this).attr("data-value");
          if(d.value != parseInt(oldValue)) {
            return RoundIcon.setRadius(d, i) - 5;
          } else {
            return RoundIcon.setRadius(d, i);
          }
        })
        .transition()
          .ease(d3.easeBounce)
          .duration(60)
          .attr("r", function(d, i) {
            let oldValue = d3.select(this).attr("data-value");
            if(d.value == parseInt(oldValue)) {
              return RoundIcon.setRadius(d, i);
            } else {
              return RoundIcon.setRadius(d, i) + 4;
            }
          })
          .attr("data-value", function(d, i) { return d.value })
        .transition()
          .ease(d3.easeBounce)
          .delay(100)
          .duration(150)
          .attr("r", RoundIcon.setRadius)
  }
}
