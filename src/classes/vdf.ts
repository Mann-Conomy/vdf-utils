import VdfBuilder from "./builder";
import { PopulatedStack } from "./stack";
import { ObjectNotation } from "../resources/enums";
import { getLastKey, getFileLines, getObject, isObject, isObjectEmpty } from "../lib/utils";

/**
 * A utility class for parsing and converting objects in Valve's Data File (VDF) format.
 */
export default class VDF {
    /**
     * Parses a VDF-formatted string into a JavaScript object.
     * @param file The raw VDF string to parse.
     * @returns The parsed object representation of the VDF string.
     * @throws A RangeError if the parsed object is empty or invalid.
     */
    public static parse<T>(file: string): T {
        const stack = new PopulatedStack();
        const result = stack.peek();

        for(const line of getFileLines(file)) {
            switch(line) {
                case ObjectNotation.OpeningBrace: {
                    const current = stack.peek();
                    const last = getLastKey(current);
                    const next = stack.new();

                    stack.update(last, next);
                    stack.push(next);
                    break;
                }
                case ObjectNotation.ClosingBrace:
                    stack.pop();
                    break;
                default: {
                    const {key, value} = getObject(line);
                    stack.update(key, value);
                    break;
                }
            }
        }

        if (isObjectEmpty(result, ObjectNotation.EmptyObject)) {
            throw new RangeError("The parsed VDF object is empty or invalid");
        }

        return result as T;
    }

    /**
     * Converts a JavaScript object into a VDF-formatted string.
     * @param object The object to stringify.
     * @param indentation The indentation level for formatting.
     * @returns The converted VDF string.
     */
    public static stringify(object: object, indentation = 0): string {
        const builder = new VdfBuilder(indentation);

        for(const [key, value] of Object.entries(object)) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                if (isObject(value)) {
                    builder.newline(key, this.stringify(value, indentation + 1), true);
                } else {
                    builder.newline(key, String(value), false);
                }
            }
        }

        return builder.toVdf();
    }
}
