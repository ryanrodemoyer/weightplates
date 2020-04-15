import { expect } from "chai";
import calculate from "@/store/calculate.js";
import powerSet from "@/store/powerSet.js";
import defaultOptions from "@/store/defaultOptions.js";

describe("calculate.js", () => {
  it("200 using defaults from defaultOptions.js", () => {
    const result = calculate(
      defaultOptions.plates,
      defaultOptions.barWeight,
      200
    );

    expect(result.isSuccess).to.equal(true);
    expect(result["45"]).to.equal(1);
    expect(result["25"]).to.equal(1);
    expect(result["5"]).to.equal(1);
  });

  // it("tests 195, with 45's", () => {
  //   const result = calculate(
  //     [
  //       {
  //         weight: 55,
  //         quantity: 0
  //       },
  //       {
  //         weight: 45,
  //         quantity: 1
  //       },
  //       {
  //         weight: 35,
  //         quantity: 1
  //       },
  //       {
  //         weight: 25,
  //         quantity: 1
  //       },
  //       {
  //         weight: 15,
  //         quantity: 1
  //       },
  //       {
  //         weight: 10,
  //         quantity: 1
  //       },
  //       {
  //         weight: 5,
  //         quantity: 0
  //       },
  //       {
  //         weight: 2.5,
  //         quantity: 0
  //       }
  //     ],
  //     45,
  //     195
  //   );

  //   console.log(result);
  //   expect(result.isSuccess).to.equal(true);
  //   expect(result["35"]).to.equal(1);
  //   expect(result["25"]).to.equal(1);
  //   expect(result["15"]).to.equal(1);
  // });

  it("tests 195, missing 45's", () => {
    const result = calculate(
      [
        {
          weight: 55,
          quantity: 0
        },
        {
          weight: 45,
          quantity: 0
        },
        {
          weight: 35,
          quantity: 1
        },
        {
          weight: 25,
          quantity: 1
        },
        {
          weight: 15,
          quantity: 1
        },
        {
          weight: 10,
          quantity: 1
        },
        {
          weight: 5,
          quantity: 0
        },
        {
          weight: 2.5,
          quantity: 0
        }
      ],
      45,
      195
    );

    console.log(result);
    expect(result.isSuccess).to.equal(true);
    expect(result["35"]).to.equal(1);
    expect(result["25"]).to.equal(1);
    expect(result["15"]).to.equal(1);
  });

  it("combinations", () => {
    function getCombinations(chars) {
      var result = [];
      var f = function(prefix, chars) {
        for (var i = 0; i < chars.length; i++) {
          result.push(prefix + chars[i]);
          f(prefix + chars[i], chars.slice(i + 1));
        }
      };
      f("", chars);
      return result;
    }

    const vals = [1, 2, 3, 4, 5];
    const result = getCombinations(vals);

    console.log(result.sort((a, b) => b.length - a.length));
  });

  it("power set", () => {
    const vals = [45, 45, 35, 25, 15, 10, 5, 2.5];
    const result = powerSet(vals);
    result.push([]);
    const results = result.map(element => {
      let sum = 45;

      element.forEach(x => (sum = sum + x * 2));

      return {
        sum: sum,

        items: element
      };
    });

    console.log(results.sort((a, b) => a.sum - b.sum));
  });

  it("build set from inventory", () => {
    const build = inventory => {
      let set = [];
      inventory.forEach(x => {
        for (let i = 1; i <= x.quantity; i++) {
          set.push(x.weight);
        }
      });
      return set;
    };

    const set = build(defaultOptions.plates.filter(x => x.units === "lbs"));

    console.log(set);
  });

  // it.only("array build", () => {
  //   let arr = [];
  //   for (let i = 35; i <= 675; i += 1) {
  //     arr.push(i);
  //   }
  //   console.log(__dirname);

  //   fs.writeFile(
  //     __dirname + "rodey/array.txt",
  //     JSON.stringify(arr),
  //     { flag: "w" },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // });

  it("tests 155", () => {
    const result = calculate(
      [
        {
          weight: 55,
          quantity: 0
        },
        {
          weight: 45,
          quantity: 1
        },
        {
          weight: 35,
          quantity: 1
        },
        {
          weight: 25,
          quantity: 1
        },
        {
          weight: 15,
          quantity: 1
        },
        {
          weight: 10,
          quantity: 0
        },
        {
          weight: 5,
          quantity: 2
        },
        {
          weight: 2.5,
          quantity: 2
        }
      ],
      45,
      155
    );

    expect(result.isSuccess).to.equal(true);
    expect(result["45"]).to.equal(1);
    expect(result["5"]).to.equal(2);
  });
});
