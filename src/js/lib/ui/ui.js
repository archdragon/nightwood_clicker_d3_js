import { Resource } from '../resources/resource'
import { Store } from '../store/store'
import { RoundIcon } from '../drawings/round_icon'

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
      .attr("class", "drawings-svg");

    // Drawings
    UI.renderDrawings();
  },

  renderDrawings: function() {
    let update = d3.select("#drawings svg")
      .selectAll("g")
      .data(Store.toD3(window._store), function (d) { return d.name });

    RoundIcon.enter(update);
    RoundIcon.update(update);
  }
}
