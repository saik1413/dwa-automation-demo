import { test, expect } from "@playwright/test";

test.skip("test", async ({ page, browser }) => {
	const newPage = await page.goto("https://test-bliss.joinditto.in");
	//await newPage.goto("https://test-bliss.joinditto.in");
});
