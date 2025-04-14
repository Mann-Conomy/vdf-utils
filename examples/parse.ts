import { VDF } from "../src/index";

// Represents a Team Fortress 2 schema item's quality
type ItemQuality = {
    value: string;
}

// Represents a Team Fortress 2 schema object
type ItemSchema = {
    items_game: {
        qualities: Record<string, ItemQuality>;
    }
}

try {
    // Create or fetch a VDF file in your application
    const schema = createItemSchema();

    // Parse the VDF file into a object
    const result = VDF.parse<ItemSchema>(schema);

    console.log(result.items_game.qualities.vintage.value); // 3
    console.log(result.items_game.qualities.strange.value); // 11
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error("Error parsing VDF file", error.message);
    }
}

// Creates a mock string of a Team Fortress 2 schema file
function createItemSchema(): string {
    return "\"items_game\"\n{\n\t\"qualities\"\n\t{\n\t\t\"vintage\"\n\t\t{\n\t\t\t\"value\"\t\t\"3\"\n\t\t}\n\t\t\"strange\"\n\t\t{\n\t\t\t\"value\"\t\t\"11\"\n\t\t}\n\t}\n}\n";
}
