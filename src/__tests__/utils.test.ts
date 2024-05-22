import { getInitials, isJapaneseName } from "../lib/name-utils";
import { describe, it, expect } from "vitest";

describe("Japanese name check", () => {
  it("should get Japanese for full kanji", () => {
    expect(isJapaneseName("山田 太郎")).toBeTruthy();
  });
  it("should get Japanese for full hiragana", () => {
    expect(isJapaneseName("やまだ たろう")).toBeTruthy();
  });
  it("should get Japanese for full katakana", () => {
    expect(isJapaneseName("ヤマダ タロウ")).toBeTruthy();
  });
});

describe("Initials Extraction", () => {
  it("should get initials for Japanese name in Kanji with space", () => {
    expect(getInitials("山田 太郎")).toBe("山田");
  });

  it("should get initials for Japanese name in Hiragana with space", () => {
    expect(getInitials("やまだ たろう")).toBe("やまだ");
  });

  it("should get initials for Japanese name in Katakana with space", () => {
    expect(getInitials("ヤマダ タロウ")).toBe("ヤマダ");
  });

  it("should get initials for English name with given and family name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("should get initials for English single given name", () => {
    expect(getInitials("Alice")).toBe("A");
  });

  it("should get initials for Japanese single Kanji name", () => {
    expect(getInitials("太郎")).toBe("太郎");
  });

  it("should get initials for Japanese single Hiragana name", () => {
    expect(getInitials("たろう")).toBe("たろう");
  });

  it("should get initials for Japanese single Katakana name", () => {
    expect(getInitials("タロウ")).toBe("タロウ");
  });
});
