import { StringSeparator } from "../resources/enums";

/**
 * An array of Stack values.
 */
export type StackArray = StackValue[];

/**
 * Represents a value that can be either null or undefined.
 */
export type UnknownValue = null | undefined;

/**
 * A value that can be a string, number, boolean, object, array, or unknown value.
 */
export type StackValue = string | number | boolean | StackElement | StackArray | UnknownValue;

/**
 * An object with string keys and values of type StackValue.
 */
export interface StackElement {
    [key: string]: StackValue;
}

/**
 * A class representing a custom Stack data structure.
 */
export class Stack {
    private readonly elements: StackElement[];

    /**
     * Creates a new empty Stack instance.
     */
    constructor() {
        this.elements = [];
    }

    /**
     * Converts a `StackValue` to its appropriate JavaScript value.
     * @param value The input value to convert.
     * @returns The converted value.
     */
    private toValue(value: StackValue) {
        if (value != null && value !== StringSeparator.Empty && !isNaN(+value)) {
            return +value;
        }
    
        switch(value) {
            case "false":
                return false;
            case "true":
                return true;
            case "null":
                return null;
            case "undefined":
                return undefined;
            default:
                return value;
        }
    }

    /**
     * Creates a new empty object to be used as an element in the Stack.
     * @returns A new empty Stack object.
     */
    new(): StackElement {
        return Object.create(Object.prototype);
    }

    /**
     * Removes and returns the top element of the Stack.
     * @returns The element at the top of the Stack.
     * @throws A RangeError if the Stack is empty.
     */
    pop(): StackElement | undefined {
        if (this.isEmpty()) {
            throw new RangeError("Cannot pop an element from an empty Stack");
        }

        return this.elements.pop();
    }

    /**
     * Pushes an element onto the top of the Stack.
     * @param element The element to be pushed onto the Stack.
     */
    push(element: StackElement) {
        this.elements.push(element);
    }

    /**
     * Returns the top element of the stack without removing it.
     * @returns The element at the top of the stack.
     * @throws A RangeError if the Stack is empty.
     */
    peek(): StackElement {
        if (this.isEmpty()) {
            throw new RangeError("Cannot peek into an empty Stack");
        }

        const index = this.size() - 1;
        const last = this.elements[index];
        if (last == null) {
            throw new RangeError("The last Stack element is undefined or null");
        }

        return last;
    }

    /**
     * Updates the specified key-value pair at the top element of the Stack.
     * @param key The key to be updated.
     * @param value The value to be assigned to the key.
     */
    update(key: string, value: StackValue): void {
        const element = this.peek();
        element[key] = this.toValue(value);
    }

    /**
     * Returns the number of elements in the Stack.
     * @returns The size of the Stack.
     */
    size(): number {
        return this.elements.length;
    }

    /**
     * Check if the Stack is empty.
     * @returns True if the stack is empty, otherwise false.
     */
    isEmpty(): boolean {
        return this.size() === 0;
    }
}

/**
 * A class representing a populated Stack data structure.
 */
export class PopulatedStack extends Stack {
    /**
     * Creates a new Stack instance with an inital empty object.
     */
    constructor() {
        super();

        const first = this.new();
        this.push(first);
    }
}
