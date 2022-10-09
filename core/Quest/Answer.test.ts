import { Answer, CombinationQuestion, CombinationSolution } from "../../core";

describe("testing answer base class", () => {
  test("comparison should return true regarding instances", () => {
    [
      { value: "answer", display: "display" },
      { value: "asdf", display: "d82322aadc5d" },
    ].forEach((c) => {
      expect(new Answer(c.value, c.display).compare(new Answer(c.value, c.display))).toBeTruthy();
    });
  });

  test("comparison should return true regarding display", () => {
    [{ lhs: "lhs display", rhs: "rhs display", value: "ftgyhvbj" }].forEach((c) => {
      expect(new Answer(c.value, c.lhs).compare(new Answer(c.value, c.rhs))).toBeTruthy();
    });
  });
});

test("simple answer", () => {
  const ans = new Answer("cgfvhbj");
  expect(ans.value).toBe(ans.display);
});

describe("testing combination solution class", () => {
  const str2ans = (s: string) => new Answer(s, "");

  test("instantiate with quest", () => {
    [{ options: ["=", "A1", "20", "C4", "+"].map(str2ans), answers: ["=", "A1", "+", "C4"] }].forEach((c) => {
      CombinationSolution.withQuestNStrings(
        new CombinationQuestion("", "", [], 0, c.options, c.answers.map(str2ans), ""),
        c.answers
      );
    });
  });

  test("instantiate with options", () => {
    [{ options: ["=", "A1", "20", "C4", "+"].map(str2ans), answers: ["=", "A1", "+", "C4"] }].forEach((c) => {
      CombinationSolution.withOptionsNStrings(c.options, c.answers);
    });
  });

  test("instantiate with indexes", () => {
    const opt = [
      new Answer("="),
      new Answer("1"),
      new Answer("96"),
      new Answer("+"),
      new Answer("-"),
      new Answer("213"),
    ];
    const ans = [0, 1, 3, 2];

    const experimental = CombinationSolution.withOptionsNIndex(opt, ans);
    const control = CombinationSolution.withOptionsNAnswers(
      opt,
      ans.map((i) => opt[i])
    );

    expect(experimental).toEqual(control);
  });
});
