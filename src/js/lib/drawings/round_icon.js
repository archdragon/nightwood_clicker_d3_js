export var RoundIcon = {
  settings: function() {
    return {
      borderColor: "rgba(255, 255, 255, 0.6)",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      backgroundColorHover: "rgba(255, 255, 255, 0.5)"
    }
  },

  draw: function(containerElementName) {
    var icon = d3.select(containerElementName)
      .append("svg")
      .attr("width", 100)
      .attr("height", 100);

    icon.append("circle")
      .style("stroke", RoundIcon.settings().borderColor)
      .style("fill", RoundIcon.settings().backgroundColor)
      .attr("r", 40)
      .attr("cx", 50)
      .attr("cy", 50)
      .on("mouseover", function(){d3.select(this).style("fill", RoundIcon.settings().backgroundColorHover);})
      .on("mouseout", function(){d3.select(this).style("fill", RoundIcon.settings().backgroundColor);});
  }
}
