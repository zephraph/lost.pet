import { test, expect } from "vitest";
import { PhoneNumber } from ".";

test("PhoneNumber validation", () => {
  const validNumbers = [
    "+1 (123) 456-7890",
    "(123) 456-7890",
    "123-456-7890",
    "123.456.7890",
    "123 456 7890",
    "1234567890",
  ];

  const invalidNumbers = [
    "123-456-789", // too short
    "123-456-78901", // too long
    "(123) 456-789", // incomplete
    "abc-def-ghij", // non-numeric
    "123 456", // incomplete
    "+1 123 456 7890 1", // too long with country code
  ];

  validNumbers.forEach((number) => {
    expect(PhoneNumber.safeParse(number).success).toBe(true);
  });

  invalidNumbers.forEach((number) => {
    expect(PhoneNumber.safeParse(number).success).toBe(false);
  });
});
