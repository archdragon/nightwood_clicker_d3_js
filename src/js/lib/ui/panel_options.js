import { Resource } from '../resources/resource';
import { Features } from '../features/features';
import { Servers } from '../servers/servers';

export var PanelOptions = {
  updateOptions: function(options) {
    // Update
    options.select(".panel-option-cost span")
    .attr("class", function(d, i) {
      let resourceAmount = Resource.get(d.resource);
      if(d.cost > resourceAmount) {
        return "cost-red";
      } else {
        return "cost-normal";
      }
    })
    .text(function(d, i) {
      return `${d.cost} ${d.resource}`;
    })
  },

  getOptionsFor: function(name) {
    if(name == "features") {
      return Features.upgradeOptions(window._store);
    } else if(name == "app-server") {
      return Servers.upgradeOptions(window._store);
    } else {
      return [];
    }
  }
}
