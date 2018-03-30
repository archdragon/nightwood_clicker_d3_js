import { Resource } from '../resources/resource'
import { Store } from '../store/store'
import { RoundIcon } from '../drawings/round_icon'
import { Features } from '../features/features'

export var UI = {
  initialize: function() {

    // Button
    document.querySelector("#write-code").addEventListener('click', function(e) {
      Resource.add("linesOfCode", 1);
    });

    var svg = d3.select("#drawings")
      .append("svg")
        .attr("width", 500)
        .attr("height", 600)
        .attr("class", "drawings-svg")
      .append("g")
        .attr("class", "circle-icons");

    // Drawings
    UI.renderDrawings();
  },

  openPanel: function(name) {
    let panel = d3.select("body")
      .append("div")
        .attr("class", "panel panel__" + name)
        .attr("data-name", name);

    panel.append("div")
      .attr("class", "close-button")
      .html("&times;")
      .on("click", function() {
        d3.select(".panel")
          .remove();
      });

    panel.append("h2")
      .text("Panel Title")

    UI.renderPanelOptions(panel, name);
  },

  renderPanelOptions: function(panel, name) {
    let data = Features.upgradeOptions(window._store);

    let options = panel.selectAll(".panel-option")
      .data(data)

    let newOption = options.enter();

    let wrapper = newOption.append("div")
      .attr("class", "panel-option")
      .text((d, i) => d.name)

    wrapper.append("div")
      .attr("class", "panel-option-cost")
      .text(function(d, i) {
        return `${d.cost} LoC`
      })
  },

  renderDrawings: function() {
    let update = d3.select("#drawings svg .circle-icons")
      .selectAll("g")
      .data(Store.toD3(window._store), function (d) { return d.name });

    RoundIcon.enter(update);
    RoundIcon.update(update);
  }
}
