module.exports = {
	preset: "jest-playwright-preset",
	testMatch: ["**/tests/**/*.spec.js"], // Adjust the test file pattern
	reporters: ["default", "jest-allure"],
};
