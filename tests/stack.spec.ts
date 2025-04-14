import { describe, expect, test } from "@jest/globals";
import { PopulatedStack, Stack, type StackElement } from "../src/classes/stack";

describe("Stack", () => {
    test("should be an instance of the Stack class", () => {
        // Arrange
        const stack = new Stack();

        // Act and assert
        expect(stack).toBeInstanceOf(Stack);
    });

    test("should throw a StackError when calling pop on an empty Stack", () => {
        // Arrange
        const stack = new Stack();

        // Act and assert
        expect(() => stack.pop()).toThrow(RangeError);
    });

    test("should throw a StackError when calling peek on an empty Stack", () => {
        // Arrange
        const stack = new Stack();

        // Act and assert
        expect(() => stack.peek()).toThrow(RangeError);
    });

    test("should throw when the last Stack element is undefined", () => {
        // Arrange
        const stack = new Stack();
        const element = undefined as unknown as StackElement;

        // Act
        stack.push(element);

        // Assert
        expect(() => stack.peek()).toThrow(RangeError);
    });

    test("should convert 'false' to its boolean value", () => {
        // Arrange
        const stack = new PopulatedStack();

        // Act
        stack.update("enabled", "false");
        const result = stack.peek();

        // Assert
        expect(result).toMatchObject({ enabled: false });
    });

    test("should convert 'true' to its boolean value", () => {
        // Arrange
        const stack = new PopulatedStack();

        // Act
        stack.update("enabled", "true");
        const result = stack.peek();

        // Assert
        expect(result).toMatchObject({ enabled: true });
    });

    test("should convert 'null' to null", () => {
        // Arrange
        const stack = new PopulatedStack();

        // Act
        stack.update("class", "null");
        const result = stack.peek();

        // Assert
        expect(result).toMatchObject({ class: null });
    });

    test("should convert 'undefined' to undefined", () => {
        // Arrange
        const stack = new PopulatedStack();

        // Act
        stack.update("marketable", "undefined");
        const result = stack.peek();

        // Assert
        expect(result).toMatchObject({ marketable: undefined });
    });
});
