import { Resource } from '../resources/resource'

export var Shop = {
  buy: function(optionData) {
    let currentAmount = Resource.get(optionData.resource);
    let neededAmount = optionData.cost;
    if(currentAmount < neededAmount) {
      alert("You don't have enough " + optionData.resource + " to buy this!");
    } else {
      if(optionData.id == "new-feature") {
        Resource.add('feature', 1);
      } else {
        Resource.add('servers', 1);
      }
      Resource.substract(optionData.resource, neededAmount);
    }
  }
}
