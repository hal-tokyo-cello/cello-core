module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  fakeTimers: {
    enableGlobally: false,
  },
  testMatch: ["**/?(*.)+(test).+(ts)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
};
