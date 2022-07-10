import { Answer } from "./Answer";

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
