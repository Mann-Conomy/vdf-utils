import { describe, expect, test } from "@jest/globals";
import VDF from "../src/classes/vdf";

/**
 * Mock type for a Team Fortress 2 localization object.
 */
type LocalizationFile = {
    lang: {
        Language: string;
        Tokens: Record<string, string>;
    }
}

/**
 * Mock type for a Team Fortress 2 schema item's quality.
 */
type ItemQuality = {
    value: string;
}

/**
 * Mock type for a Team Fortress 2 schema item rarity.
 */
type ItemRarity = {
    next_rarity?: string;
}

/**
 * Mock type for a Team Fortress 2 schema object.
 */
type ItemSchema = {
    items_game: {
        qualities: Record<string, ItemQuality>;
        rarities?: Record<string, ItemRarity>;
    }
}

describe("VDF", () => {
    describe("parse", () => {
        test("should throw a RangeError given a invalid string", () => {
            // Arrange
            const file = "Teams have been switched.";

            // Act and assert
            expect(() => VDF.parse(file)).toThrow(RangeError);
        });

        test("should return a localization object given a valid string", () => {
            // Arrange
            const vdf = createLocalizationFile();

            // Act
            const result = VDF.parse<LocalizationFile>(vdf);

            // Assert
            expect(result.lang.Language).toBe("English");
            expect(result.lang.Tokens.rarity1).toBe("Genuine");
            expect(result.lang.Tokens["rarity4"]).toBe("Unusual");
            expect(result.lang.Tokens["TF_Tool_PaintCan_11"]).toBeUndefined();
            expect(result.lang.Tokens.TF_Weapon_GoldFryingPan).toBeUndefined();
        });

        test("should return a schema object given a valid string", () => {
            // Arrange
            const vdf = createItemSchema();

            // Act
            const result = VDF.parse<ItemSchema>(vdf);

            // Assert
            expect(result.items_game.qualities.vintage?.value).toBe(3);
            expect(result.items_game.qualities["strange"]?.value).toBe(11);
            expect(result.items_game.rarities?.common?.next_rarity).toBeUndefined();
            expect(result.items_game.rarities?.["rare"]?.next_rarity).toBeUndefined();
        });
    });

    describe("stringify", () => {
        test("should convert the localization object to a VDF string", () => {
            // Arrange
            const localizationFile = createLocalizationFile();
            const localizationObject = createLocalizationObject();

            // Act
            const result = VDF.stringify(localizationObject);

            // Assert
            expect(result).toBe(localizationFile);
        });

        test("should convert the schema object to a VDF string", () => {
            // Arrange
            const schemaFile = createItemSchema();
            const schemaObject = createItemSchemaObject();

            // Act
            const result = VDF.stringify(schemaObject);

            // Assert
            expect(result).toBe(schemaFile);
        });
    });
});

/**
 * Creates a mock object of a Team Fortress 2 localization file.
 * @returns A mock object of a Team Fortress 2 localization file.
 */
function createLocalizationObject(): LocalizationFile {
    return {
        lang: {
            Language: "English",
            Tokens: {
                rarity1: "Genuine",
                rarity4: "Unusual"
            }
        }
    };
}

/**
 * Creates a mock object of a Team Fortress 2 item schema.
 * @returns A mock object of a Team Fortress 2 item schema.
 */
function createItemSchemaObject(): ItemSchema {
    return {
        items_game: {
            qualities: {
                vintage: {
                    value: "3"
                },
                strange: {
                    value: "11"
                }
            }
        }
    };
}

/**
 * Creates a mock string of a Team Fortress 2 localization file.
 * @returns { string } A mock string of a Team Fortress 2 localization file.
 */
function createLocalizationFile(): string {
    return "\"lang\"\n{\n\t\"Language\"\t\t\"English\"\n\t\"Tokens\"\n\t{\n\t\t\"rarity1\"\t\t\"Genuine\"\n\t\t\"rarity4\"\t\t\"Unusual\"\n\t}\n}\n";
}

/**
 * Creates a mock string of a Team Fortress 2 schema file.
 * @returns { string } A mock string of a Team Fortress 2 schema file.
 */
function createItemSchema(): string {
    return "\"items_game\"\n{\n\t\"qualities\"\n\t{\n\t\t\"vintage\"\n\t\t{\n\t\t\t\"value\"\t\t\"3\"\n\t\t}\n\t\t\"strange\"\n\t\t{\n\t\t\t\"value\"\t\t\"11\"\n\t\t}\n\t}\n}\n";
}
