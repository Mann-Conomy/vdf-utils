import { StringSeparator } from "../resources/enums";

/**
 * A helper class for building Valve Data Format (VDF) strings.
 */
export default class VdfBuilder {
    private readonly lines: string[];
    private readonly separator: string;
    private readonly indentation: number;

    /**
     * Creates a new VdfBuilder instance with the specified indentation level.
     * @param indentation The indentation level to apply to each line.
     */
    constructor(indentation: number) {
        this.lines = [];
        this.indentation = indentation;
        this.separator = StringSeparator.Empty;
    }

    /**
     * Returns a string representing of the current indentation level using tab characters.
     * @returns A string of tab characters based on the indentation level.
     */
    getIndentationLevel(): string {
        return "\t".repeat(this.indentation);
    }

    /**
     * Adds a new line to the VDF output, either as a simple key-value pair or a nested object block.
     * @param key The key name for the line.
     * @param value The value or nested content as a string.
     * @param nested Whether the value represents a nested object.
     */
    newline(key: string, value: string, nested: boolean): void {
        const indent = this.getIndentationLevel();

        let line = null;
        if (nested) {
            line = [indent, "\"", key, "\"\n", indent, "{\n", value, indent, "}\n"].join(this.separator);
        } else {
            line = [indent, "\"", key, "\"", "\t", "\t", "\"", value, "\"\n"].join(this.separator);
        }

        this.lines.push(line);
    }

    /**
     * Builds and returns the complete VDF-formatted string.
     * @returns The VDF output as a string.
     */
    toVdf(): string {
        return this.lines.join(this.separator);
    }
}
