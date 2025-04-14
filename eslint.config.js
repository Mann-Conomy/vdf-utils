const tseslint = require("typescript-eslint");
const eslint = require("@mann-conomy/typescript-eslint-config");

module.exports = tseslint.config({
    extends: [
        ...eslint
    ],
    ignores: [
        "dist/**/*",
        "test/**/*.ts",
        "examples/*.js",
        "jest.config.ts",
        "eslint.config.js"
    ]
});
