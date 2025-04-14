import { VDF } from "../src/index";

// Example object that represents a Team Fortress 2 localization file
type LocalizationFile = {
    lang: {
        Language: string;
        Tokens: Record<string, string>;
    }
}

try {
    // Create or fetch a object in your application
    const object = createLocalizationObject();

    // Convert the object to a VDF string
    const result = VDF.stringify(object);

    console.log(result); // View the VDF string in your terminal
} catch (error) {
    if (error instanceof Error) {
        console.error("Error converting object to VDF", error.message);
    }
}

// Creates a mock object of a Team Fortress 2 localization file
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
