// @ts-check
const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
	await page.goto("https://joinditto.in");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Ditto*/);
});

test("get started link", async ({ page }) => {
	await page.goto("https://stag.joinditto.in/");

	// Click the get started link.
	// await page.getByRole("link", { name: "Get started" }).click();

	// // Expects the URL to contain intro.
	// await expect(page).toHaveURL(/.*intro/);
	await page
		.locator("section")
		.filter({
			hasText:
				"Insurance made easyWith Ditto, you get the best advice on insurance. Understand ",
		})
		.getByRole("button")
		.click();
	const timelyFramePage = page.frameLocator("#timely-iframe");
	await timelyFramePage.locator("span input[value='Health']").click();
	// expect(
	// 	timelyFramePage.locator("label[text*='Please let us know']"),
	// ).toHaveText(
	// 	"Please let us know if your query is regarding health insurance, life insurance or both? *",
	// );
	expect(
		timelyFramePage.locator(
			"text=Pay off all your medical bills if you are hospitalised",
		),
	).toHaveText("Pay off all your medical bills if you are hospitalised");
	expect(
		timelyFramePage.locator(
			"text=Your family gets 1 Crore or more in the event of your passing",
		),
	).toHaveText("Your family gets 1 Crore or more in the event of your passing");
	await timelyFramePage.locator("div span:has-text('WhatsApp')").click();
	await timelyFramePage.locator("span input[value='Health']").click();
	await timelyFramePage
		.locator("input[placeholder='Enter your name']")
		.type("Testing Engineer", { delay: 100 });
	await timelyFramePage
		.locator("input[inputmode='numeric']")
		.type("9999999991", { delay: 100 });
	await timelyFramePage
		.locator("input[placeholder*='Hey,']")
		.type("Want to Buy Health Insurance");
	await timelyFramePage
		.locator("textarea[name='customerSource']")
		.type("LinkedIn");
	await timelyFramePage.locator("button[type='submit']").click();

	await page.pause();
});

test.skip("test", async ({ page }) => {
	await page.goto("https://stag-app.joinditto.in/fq");
	await page
		.locator("div:nth-child(8) > div > .MuiPaper-root > div > div > div")
		.click();
	await page.getByText("YouFor self").click();
	await page.getByRole("button", { name: "Continue" }).click();
	await page.getByText("₹20 L").click();
	await page.getByRole("button", { name: "Calculate Premium" }).click();
	await page.getByPlaceholder("Your age").click();
	await page.getByPlaceholder("Your age").fill("49");
	await page.getByPlaceholder("Pin code").click();
	await page.getByPlaceholder("Pin code").fill("500010");
	await page.getByRole("button", { name: "Calculate Premium" }).click();
	await page.getByRole("button", { name: "Buy This" }).click();
	await page.getByRole("button", { name: "Confirm and buy" }).click();
	await page.getByPlaceholder("John Doe").click();
	await page.getByPlaceholder("John Doe").fill("Kishore`");
	await page.getByPlaceholder("John Doe").press("Tab");
	await page.getByPlaceholder("John Doe").click();
	await page.getByPlaceholder("John Doe").fill("Kishore");
	await page.getByPlaceholder("9999999999").click();
	await page.getByPlaceholder("9999999999").fill("9999999991");
	await page.getByRole("button", { name: "Send OTP" }).click();
	await page.getByPlaceholder("Enter received OTP").click();
	await page.getByPlaceholder("Enter received OTP").click();
	await page.getByPlaceholder("Enter received OTP").fill("123456");
	await page.getByPlaceholder("Enter received OTP").press("Enter");
});
