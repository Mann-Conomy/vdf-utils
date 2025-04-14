/**
 * Checks whether a given line of text is valid for parsing.
 * @param line The line of text to validate.
 * @returns `true` if the line is valid, otherwise `false`.
 */
function isValidLine(line: string): boolean {
    return line.length > 0 && line !== "\"" && !line.startsWith("//");
}

/**
 * Removes inline comments from the given array of lines.
 * @param lines The array of lines to process.
 * @returns The array of lines with inline comments removed.
 */
function removeInlineComments(lines: string[]): string[] {
    return lines.filter(line => isValidLine(line));
}

/**
 * Splits the input file content into lines, trims each line, and returns only valid lines.
 * @param file The content of the file to process.
 * @returns An array of filtered lines.
 */
function getFilteredLines(file: string) {
    const lines = file.split("\n");
    const trimmed = lines.map(line => line.trim());
    return removeInlineComments(trimmed);
}

/**
 * Checks if the first element of the given array is an empty string.
 * @param lines The array of strings to check.
 * @returns `true` if the first element is empty or undefined, otherwise `false`.
 */
function isFirstLineEmpty(lines: string[]) {
    const [first] = lines;
    return first == null || first.length === 0;
}

/**
 * Splits the given file into lines, trims each line, and removes inline comments.
 * @param file The content of the file to process.
 * @returns The array of lines from the file, with inline comments removed.
 * @throws A RangeError if the file contains no lines.
 */
export function getFileLines(file: string): string[] {
    const lines = getFilteredLines(file);
    if (!(lines.length > 1) && isFirstLineEmpty(lines)) {
        throw new RangeError("The VDF file is empty");
    }

    return lines;
}

/**
 * Retrieves the last key from the object.
 * @param object The object to process.
 * @returns The last key in the object.
 * @throws A RangeError if the object contains no keys.
 */
export function getLastKey(object: Record<string, unknown>): string {
    const last = Object.keys(object).pop();
    if (last == null || last.length === 0) {
        throw new RangeError("The object is empty");
    }

    return last;
}

/**
 * Splits a line into a key and value pair.
 * @param line The line to process.
 * @returns The key and value pair parsed from the line.
 * @throws A RangeError if the line cannot be split into a key and value pair.
 */
export function getObject(line: string) {
    const [key, value] = line.split(/"\s*"/).map(e => e.replace(/"/g, ""));
    if (key === undefined || key.length === 0) {
        throw new RangeError("The line contains no JSON key and or value.");
    }

    return { key, value };
}

/**
 * Checks if the given value is a non-null object.
 * @param value The value to check.
 * @returns `true` if the value is a non-null object, otherwise `false`.
 */
export function isObject(value: unknown): boolean {
    return typeof value === "object" && value != null;
}

/**
 * Checks if the parsed object is empty.
 * @param source The content of the parsed object.
 * @returns `true` if the object is empty, otherwise `false`.
 */
export function isObjectEmpty(source: unknown, target: string): boolean {
    return isObject(source) && JSON.stringify(source) === target;
}
