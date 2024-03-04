const nextJest = require("next/jest");

const createJestConfig = nextJest({
	dir: "./",
});

/** @type {import("jest").Config} */

const config = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testEnvironment: "jest-environment-jsdom",
	preset: "ts-jest",
	testMatch: ["**/__tests__/unittests/*.test.tsx"],
};

module.exports = createJestConfig(config);
