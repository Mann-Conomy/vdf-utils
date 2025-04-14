# vdf-utils

A Node.js utility library for parsing and converting objects in Valve's Data File (VDF) format.

[![npm version](https://img.shields.io/npm/v/@mann-conomy/vdf-utils?style=flat-square&logo=npm)](https://npmjs.com/package/@mann-conomy/vdf-utils)
[![npm downloads](https://img.shields.io/npm/d18m/@mann-conomy/vdf-utils?style=flat-square&logo=npm)](https://npmjs.com/package/@mann-conomy/vdf-utils)
[![Node.js version](https://img.shields.io/node/v/@mann-conomy/vdf-utils?style=flat-square&logo=nodedotjs)](https://nodejs.org/en/about/releases/)
[![GitHub actions](https://img.shields.io/github/actions/workflow/status/Mann-Conomy/vdf-utils/test.yml?branch=main&style=flat-square&logo=github&label=test)](https://github.com/Mann-Conomy/vdf-utils/blob/main/.github/workflows/test.yml)
[![GitHub license](https://img.shields.io/github/license/Mann-Conomy/vdf-utils?style=flat-square&logo=github)](https://github.com/Mann-Conomy/vdf-utils/blob/main/LICENSE)

## Installation

Using [npm](https://www.npmjs.com/package/@mann-conomy/vdf-utils):

```bashf
$ npm install @mann-conomy/vdf-utils
```

Using [yarn](https://yarnpkg.com/package/@mann-conomy/vdf-utils):

```bash
$ yarn add @mann-conomy/vdf-utils
```

## Testing

Using [npm](https://docs.npmjs.com/cli/v8/commands/npm-run-script):
```bash
$ npm test
```

Using [yarn](https://classic.yarnpkg.com/lang/en/docs/cli/run/):
```bash
$ yarn test
```

## Examples

Parsing item schemas from Team Fortress 2 into JavaScript objects.

```js
import { readFile } from "fs/promises";
import { VDF } from "@mann-conomy/vdf-utils";
import type { ItemSchema } from "@mann-conomy/tf-schema";

(async () => {
    try {
        // Fetch the item schema from the Steam Web API
        const response = await fetch("https://media.steampowered.com/apps/440/scripts/items/items_game.bdc614ad776fb2d43c1f247fce870485d2299152.txt");
        const file = await response.text();

        // Parse the result into an ItemSchema object
        const { items_game } = VDF.parse<ItemSchema>(file);

        console.log(items_game.qualities.vintage.value); // 3
        console.log(items_game.qualities.strange.value); // 11
    } catch (error) {
        console.error("Error parsing item schema", error.message);
    }
})();
```

Converting JavaScript objects into VDF-formatted strings.

```js
import { VDF } from "@mann-conomy/vdf-utils";

const countries = {
    lang: {
        Language: "english",
        Tokens: {
            Steam_Country_US: "United States",
            Steam_Country_AU: "Australia"
            Steam_Country_GB: "United Kingdom"
        }
    }
}

try {
    const result = VDF.stringify(countries);

    console.log(result)
    /**
     * "lang"
     * {
     *      "Language"	"english"
     *      "Tokens"
     *      {
     *          "Steam_Country_US"		"United States"						
     *          "Steam_Country_AU"		"Australia"				
     *          "Steam_Country_GB"		"United Kingdom"			
     *      }
     *  }
     */
} catch (error) {
    console.error("Error converting countries to VDF", error.message);
}
```

Some more examples are available in the [examples](https://github.com/Mann-Conomy/vdf-utils/tree/main/examples) and [test](https://github.com/Mann-Conomy/vdf-utils/tree/main/test) directories.

## Documentation

See the [Wiki pages](https://github.com/Mann-Conomy/vdf-utils/wiki) for further documentation.

## License

[MIT](LICENSE)

Copyright 2025, The Mann-Conomy Project
