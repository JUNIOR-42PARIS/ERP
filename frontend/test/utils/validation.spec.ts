import { isNameTextLengthValid, isValidSiren } from "@/utils/validation";
import { describe, expect, it } from "vitest";

describe("isValidSiren", () => {
  it("should be true", () => {
    expect(isValidSiren()("012345678901234")).toBe(true);
  });

  it("should be true with optional", () => {
    expect(isValidSiren(true)("")).toBe(true);
    expect(isValidSiren(true)("012345678901234")).toBe(true);
  });

  it("should be string", () => {
    expect(isValidSiren()("")).toBe(
      "Le SIREN doit être composé de 15 chiffres"
    );
    expect(isValidSiren()("012345678")).toBe(
      "Le SIREN doit être composé de 15 chiffres"
    );
    expect(isValidSiren()("01234567890123456789")).toBe(
      "Le SIREN doit être composé de 15 chiffres"
    );
    expect(isValidSiren()("01234567890123a")).toBe(
      "Le SIREN doit être composé de 15 chiffres"
    );
    expect(isValidSiren()("aaaa5678901234")).toBe(
      "Le SIREN doit être composé de 15 chiffres"
    );
  });
});

describe("isNameTextLengthValid", () => {
  const maxLengthString = "01234567890123456789012345678901234567890123456789";

  it("should be true", () => {
    expect(isNameTextLengthValid()("A")).toBe(true);
    expect(
      isNameTextLengthValid()(
        "   AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA   "
      )
    ).toBe(true);
    expect(
      isNameTextLengthValid()(
        "   A                                                   "
      )
    ).toBe(true);
    expect(
      isNameTextLengthValid(
        0,
        20
      )("                                                  ")
    ).toBe(true);
    expect(isNameTextLengthValid(1, 2)("1")).toBe(true);
  });

  it("should hit minimum", () => {
    expect(isNameTextLengthValid()("")).toBe(
      "Le texte est trop court (au moins 1 caractères)"
    );
    expect(isNameTextLengthValid(10)("012345678")).toBe(
      "Le texte est trop court (au moins 10 caractères)"
    );
    expect(isNameTextLengthValid(10)("   012345678   ")).toBe(
      "Le texte est trop court (au moins 10 caractères)"
    );
  });

  it("should hit maximum", () => {
    expect(isNameTextLengthValid()(maxLengthString)).toBe(
      "Le texte est trop long (au max. 50 caractères)"
    );
    expect(isNameTextLengthValid(10, 50)(maxLengthString)).toBe(
      "Le texte est trop long (au max. 50 caractères)"
    );
    expect(isNameTextLengthValid(1, 2)("   01   ")).toBe(
      "Le texte est trop long (au max. 2 caractères)"
    );
  });
});
