import { expect } from "chai";
import calculate from "@/store/calculate.js";
import defaultOptions from "@/store/defaultOptions.js";

describe("calculate.js", () => {
  it("tests", () => {
    const result = calculate(
      defaultOptions.plates,
      defaultOptions.barWeight,
      200
    );

    expect(result.isSuccess).to.equal(true);
    expect(result["5"]).to.equal(1);
    expect(result["25"]).to.equal(1);
    expect(result["45"]).to.equal(1);
    console.log(result);
  });
});
