import { Answer, CombinationSolution } from "./Answer";
import { CombinationQuestion, MultipleChoiceQuestion, Quest } from "./Quest";

class MockQuest extends Quest {
  public static solutionOnly(solution: Answer) {
    return new MockQuest("", "", [], 0, [], solution, "");
  }

  public static optionsOnly(options: Answer[]) {
    return new MockQuest("", "", [], 0, options, new Answer("", ""), "");
  }
}

describe("testing quest base class", () => {
  test("answer should be correct", () => {
    [{ answer: "=A$1 + A$2" }, { answer: "= 1 + 2 " }].forEach((c) => {
      const quest = MockQuest.solutionOnly(new Answer(c.answer, ""));

      expect(quest.answer(new Answer(c.answer, ""))).toBeTruthy();
    });
  });

  test("answer should be incorrect", () => {
    [
      { answer: "=A$1 + A$2", solution: "=A$1+A$2" },
      { answer: "= 1 + 2 ", solution: "=1+2" },
    ].forEach((c) => {
      const quest = MockQuest.solutionOnly(new Answer(c.solution, ""));

      expect(quest.answer(new Answer(c.answer, ""))).toBeFalsy();
    });
  });

  test("shuffle should not affect internal value", () => {
    [
      {
        options: Array.from(Array(10).keys()).map((v) => new Answer(`ans ${v}`, `dis ${v}`)),
      },
    ].forEach((c) => {
      const quest = MockQuest.optionsOnly(c.options);
      const snapshot = [...quest.options];
      const shuffle = quest.shuffleOptions();

      expect(shuffle).not.toEqual(quest.options); // did shuffled
      expect(quest.options).toEqual(snapshot); // did not changed
    });
  });
});

describe("testing multiple choice question class", () => {
  test("constructor should translate index to solution answer object", () => {
    [
      {
        options: Array.from(Array(4).keys()).map((v) => new Answer(`ans ${v}`, `dis ${v}`)),
        solution: 3,
        answer: new Answer("ans 3", ""),
      },
    ].forEach((c) => {
      const quest = new MultipleChoiceQuestion("", "", [], 0, c.options, c.solution, "");

      expect(quest.answer(c.answer)).toBeTruthy();
    });
  });
});

describe("testing combination question class", () => {
  test("constructor should translate array into solution object", () => {
    [
      {
        options: ["=", "A1", "B2", "C4", "+", "-"].map((s) => new Answer(s, s)),
        solution: ["=", "A1", "-", "C4"].map((s) => new Answer(s, s)),
      },
    ].forEach((c) => {
      const quest = new CombinationQuestion("", "", [], 0, c.options, c.solution, "");

      expect(quest.answer(CombinationSolution.withQuestNAnswers(quest, c.solution))).toBeTruthy();
    });
  });

  test("constructor should take supplied answer object as solution object", () => {
    [
      {
        options: ["=", "A1", "B2", "C4", "+", "-"].map((s) => new Answer(s, s)),
        solution: ["=", "A1", "-", "C4"],
      },
    ].forEach((c) => {
      const solution = CombinationSolution.withOptionsNStrings(c.options, c.solution);
      const quest = new CombinationQuestion("", "", [], 0, c.options, solution, "");

      expect(quest.answer(solution)).toBeTruthy();
    });
  });
});
