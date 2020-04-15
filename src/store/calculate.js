const calculate = (inventory, barWeight, targetWeight) => {
  let results;

  let weight = parseInt(targetWeight) - barWeight;

  let gap = -1;

  let isFirstRun = true;

  // loop through the provided array of plates
  // the loop is required so we can try extra combinations of plates
  for (let i = 0; i < inventory.length; i++) {
    results = {};

    // initialize the results array each time through the loop
    inventory.forEach(pair => {
      results[pair.weight] = 0;
    });

    let localWeight = weight;

    inventory.slice(0, inventory.length - 0).forEach(pair => {
      let canUse = false;
      do {
        canUse = pair.quantity >= 1 && localWeight - 2 * pair.weight >= 0;
        if (canUse) {
          // the pair of plates can be used
          results[pair.weight] = results[pair.weight] + 1;

          // decrease from inventory
          pair.quantity--;

          // decrease the amount of weight remaining to assign
          localWeight -= pair.weight * 2;
        }
      } while (canUse === true);
    });

    if (localWeight === 0) {
      weight = 0;
      break;
    } else {
      if (isFirstRun) {
        gap = localWeight;
      }
      isFirstRun = false;
    }
  }

  if (gap !== -1) {
    weight = gap;
  }

  return {
    weight: targetWeight,
    totalWeight: targetWeight - weight, // any difference between the desired and actual weight to put on the barbell
    isSuccess: weight === 0, // did we fully assign the weight?
    ...results
  };
};

export default calculate;
