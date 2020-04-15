export function powerSet(list) {
  let set = [],
    listSize = list.length,
    combinationsCount = 1 << listSize;

  for (var i = 1; i < combinationsCount; i++) {
    let combination = [];
    for (var j = 0; j < listSize; j++) {
      if (i & (1 << j)) {
        combination.push(list[j]);
      }
    }
    set.push(combination);
  }
  set.push([]);
  return set;
}

export function sums(set, barWeight) {
  const results = set.map(plates => {
    let sum = parseInt(barWeight);
    let hashcode = 1;

    const primes = [3, 5, 7, 9, 11, 13, 17, 19, 23, 29, 31, 37, 39, 43, 47, 51];

    plates.forEach((x, i) => {
      sum = sum + parseFloat(x) * 2;

      let code = Math.sqrt(x);
      hashcode *= code * primes[i];
    });

    return {
      sum: sum,
      hash: Math.floor(hashcode),
      items: plates
    };
  });

  // ascending sort
  results.sort((a, b) => a.sum - b.sum);

  // this will remove all duplicates across the entire set of possible values
  // duplicate filtering is performed against the amateur hashcode implemented above
  const reduced = results.reduce((uniques, item) => {
    const existing = uniques.find(
      x => x.hash && item.hash && x.hash === item.hash
    );
    return existing ? uniques : [...uniques, item];
  }, []);

  return reduced;
}
