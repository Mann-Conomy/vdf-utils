import { describe, expect, test } from "@jest/globals";
import { getFileLines, getLastKey, getObject } from "../src/lib/utils";

describe("getFileLines", () => {
    test("should throw when the file is empty", () => {
        // Arrange
        const empty = String();

        // Act and assert
        expect(() => getFileLines(empty)).toThrow(RangeError);
    });
});

describe("getLastKey", () => {
    test("should throw when the Stack object is empty", () => {
        // Arrange
        const empty = {};

        // Act and assert
        expect(() => getLastKey(empty)).toThrow(RangeError);
    });
});

describe("getObject", () => {
    test("should throw when the line is empty", () => {
        // Arrange
        const line = String();

        // Act and assert
        expect(() => getObject(line)).toThrow(RangeError);
    });
});
