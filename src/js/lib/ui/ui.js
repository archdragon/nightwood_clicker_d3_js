import { Resource } from '../resources/resource'
import { RoundIcon } from '../drawings/round_icon'

export var UI = {
  initialize: function() {

    // Button
    document.querySelector("#write-code").addEventListener('click', function(e) {
      Resource.add("linesOfCode", 1);
    });

    // Drawings
    UI.renderDrawings();
  },

  renderDrawings: function() {
    RoundIcon.draw("#drawings");  
  }
}
