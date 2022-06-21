import { User } from "./User";

describe("User's functionality", () => {
  test("password hashing", () => {
    const cases = [
      { raw: "password", hash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" },
      { raw: "cello", hash: "9bbf02efd82322aadc5d06c9bcf35bb4b0e3302ca158dc800407be1a4fea67e2" },
    ];

    cases.forEach((c) => {
      expect(User.hashPassword(c.raw)).toBe(c.hash.toLowerCase());
    });
  });
});
