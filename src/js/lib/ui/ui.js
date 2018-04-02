import { Resource } from '../resources/resource'
import { Store } from '../store/store'
import { Shop } from '../shop/shop'
import { Clock } from '../clock/clock'
import { Cash } from '../cash/cash'
import { RoundIcon } from '../drawings/round_icon'
import { Features } from '../features/features'
import { PanelOptions } from '../ui/panel_options'

export var UI = {
  initialize: function() {

    // Button
    document.querySelector("#write-code").addEventListener('click', function(e) {
      Resource.add("linesOfCode", 1);
    });

    var svg = d3.select("#drawings")
      .append("svg")
        .attr("class", "drawings-svg")
        .style("pointer-events", "all")
        .call(d3.zoom()
          .scaleExtent([1 / 2, 2])
          .on("zoom", function() {
            this.querySelector(".circle-icons").setAttribute("transform", d3.event.transform);
          }))
      .append("g")
        .attr("class", "circle-icons");

    // Drawings
    UI.renderDrawings();
  },

  openPanel: function(name) {
    let existingPanel = d3.select(".panel");
    if(existingPanel.size() > 0) {
      existingPanel.remove();
    }

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

  renderOpenPanel: function() {
    let panel = d3.select(".panel");
    if(panel.size() > 0) {
      let name = panel.attr("data-name");
      UI.renderPanelOptions(panel, name);
    }
  },

  renderPanelOptions: function(panel, name) {
    let data = PanelOptions.getOptionsFor(name);

    let options = panel.selectAll(".panel-option")
      .data(data)

    options.exit().remove();

    // Create
    let newOption = options.enter();

    let wrapper = newOption.append("div")
      .attr("class", "panel-option")
      .text((d, i) => d.name)

    wrapper.append("div")
      .attr("class", "panel-option-cost")
      .append("span")
        .text(function(d, i) {
          return `${d.cost} ${d.resource}`;
        })

    wrapper.on("click", (d, i) => Shop.buy(d));

    PanelOptions.updateOptions(options)

    console.log("Panel options updated");
  },

  renderDrawings: function() {
    let update = d3.select("#drawings svg .circle-icons")
      .selectAll("g")
      .data(Store.toD3(window._store), function (d) { return d.name });

    RoundIcon.enter(update);
    RoundIcon.update(update);

    update.exit().remove();

    console.log("Deawings updated");
  },

  updateClock: function(secondsSinceStart) {
    if(!window._clockElement) {
      window._clockElement = document.querySelector("#clock");
    }
    window._clockElement.textContent = Clock.toString(secondsSinceStart);
  },

  updateCash: function() {
    if(!window._cashElement) {
      window._cashElement = document.querySelector("#cash");
    }

    window._cashElement.textContent = Cash.toString();
  }
}
