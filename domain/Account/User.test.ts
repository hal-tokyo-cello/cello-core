import { IAccountRepository } from "infrastructure";
import { Avatar, Player, Race, User } from "../Account";

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

describe("Player's functionality", () => {
  test("player level", () => {
    [
      { exp: 0, lv: 0 },
      { exp: 1250, lv: 5 },
      { exp: 5000, lv: 10 },
    ].forEach((c) => {
      const repoMock = jest.fn<Avatar, []>(() => new Avatar(Race.Egg, c.exp));
      const p = new Player({ getAvatar: repoMock } as unknown as IAccountRepository, "", "");
      const lv = p.level;
      expect(repoMock).toBeCalledTimes(1);
      expect(lv).toBe(c.lv);
    });
  });
});
