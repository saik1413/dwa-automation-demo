import { test, expect, chromium, page } from "@playwright/test";
const { google } = require("googleapis");
import XLSX from "xlsx";
const serviceAccountKey = require("C://Users/Kishore/Downloads/First Automation/utilities/automation-data-2023-a58ce52b0d75.json"); // Replace with your service account key file

const fs = require("fs");
import {
	openFlow,
	fillAgeAndPincode,
	fillPhoneNumberAndName,
	enterOtpAndSubmit,
	getCurrentDate,
	convertPremiumStringToNumber,
	openFlowNew,
	fillAgeAndPincodeForParentsFlow,
	selectMotherAndFather,
	parentsAgeFieldValidations,
	parentsHeadingValidation,
	comparePremiums,
	validateAndfillPhoneNumberAndNameForOtp,
} from "../../../pages/Health/ergo/common";
import {
	continueButton,
	heading,
	calculatePremiumButton,
	ageIsRequiredText,
	pincodeIsRequired,
	defaultCoverAmount,
	oneYearPremiumXpath,
	twoYearPremiumXpath,
	firstSummaryCardPremiumXpath,
	totalPremiumXpath,
	protectorRider,
	buyThisButton,
	popUpPremiumXpath,
	confirmAndBuyButton,
	dontWorrySpamMsg,
	sendOtpButton,
	inputOTP,
	otpIsRequired,
	secondSummaryPremiumXpath,
	fatherAgeIsRequiredText,
	motherAgeIsRequiredText,
	heading_h4,
	resumeButton,
	selectGender,
	selectMale,
	selectMaritalStatus,
	selectSingle,
	inputEmailIdInProposalForm,
	selectAreaName,
	nextButtonInProposalForm,
	selectHeight,
} from "../../../pages/Health/ergo/xpaths.spec";
import {
	dateOfBirth,
	filePath,
	panNumber,
	testEmail,
} from "../../../utilities/mainData";
import { readSpreadsheet } from "../../../pages/readSpreadSheet";
import {
	ageValidationErgo,
	ergoPassKYCWithValidDetails,
	pincodeValidationErgo,
	selectRestoreRiders,
} from "../../../pages/Health/ergo/ergoCommon";

const optimaRestoreFlowFunction = async (element, index) => {
	const { pincode, adultOneAge, adultTwoAge } = element;
	//console.log(pincode, adultOneAge, adultTwoAge);
	console.log(index);

	//let page; //create variable with page

	test.describe(`optimaRestoreFlow ${pincode}, ${adultOneAge}`, async () => {
		let oneYearPremium;
		let twoYearPremium;
		let totalPremium;
		let firstSummaryCardPremium;
		let page; //create variable with page
		let pincodeString = JSON.stringify(pincode);
		let ageString = JSON.stringify(adultOneAge);
		test.beforeAll(async ({ browser }) => {
			page = await browser.newPage(); //Create a new Page instance
		});
		test.afterAll(async () => {
			page.close();
		});
		test("Go to app/fq and enter basic details and verify error message", async () => {
			await openFlowNew(page, "Individual", "Optima restore");
			await expect(page.getByText("we are just a click away.")).toHaveText(
				"If there’s anything bothering you, we are just a click away.",
			);
			await page.locator("").screenshot;
			await expect(page.getByText("Talk to us")).toHaveText(
				"Talk to us by pressing the help icon in the top-right corner.",
			);
			await page.locator(continueButton).click();
			await expect(page.locator(heading)).toHaveText("Tell us about you");
			//await page.locator(calculatePremiumButton).click();
			// await expect(page.locator(ageIsRequiredText)).toHaveText(
			// 	"Your age is a required field",
			// );
			// expect(page.locator(pincodeIsRequired)).toHaveText(
			// 	"Pin code is required",
			// );
			await ageValidationErgo({ page });
			expect(
				await page.locator("//span[contains(text(), 'Optima Restore')]"),
			).toHaveText("Optima Restore");
			await pincodeValidationErgo({ page });
			await fillAgeAndPincode({ page, pincodeString, ageString });

			//verify and check the cover amount, premium and continue
			expect(await page.locator(defaultCoverAmount)).toContainText("10 L");
			await page.locator("[id='3']").click();
			await page.locator(defaultCoverAmount).waitFor();
			const coverAmountDisplayed = await page
				.locator(defaultCoverAmount)
				.textContent();
			expect(page.locator("[id='3']")).toHaveText(coverAmountDisplayed);
			await page.locator("text=Calculate Premium").click();

			oneYearPremium = await page.locator(oneYearPremiumXpath).textContent();
			twoYearPremium = await page.locator(twoYearPremiumXpath).textContent();
			firstSummaryCardPremium = convertPremiumStringToNumber(
				await page.locator(firstSummaryCardPremiumXpath).textContent(),
			);

			totalPremium = convertPremiumStringToNumber(
				await page.locator(totalPremiumXpath).textContent(),
			);
			//await page.locator(protectorRider).click();
			await selectRestoreRiders({
				page,
				riderName: "Protector Rider",
				select: true,
			});
			await selectRestoreRiders({
				page,
				riderName: "Unlimited Restoration",
				select: false,
			});
			totalPremium = await page.locator(totalPremiumXpath).textContent();
			oneYearPremium = await page.locator(oneYearPremiumXpath).textContent();
			firstSummaryCardPremium = await page
				.locator(firstSummaryCardPremiumXpath)
				.textContent();
			await comparePremiums(totalPremium, oneYearPremium);
			await comparePremiums(totalPremium, firstSummaryCardPremium);
			////div[@class="MuiGrid-root MuiGrid-container"]//div//p[contains(text(), 'Premium')]/..//span[contains(text(), '₹')]
			// page.pause();
			// console.log("totalPremium", totalPremium);
			// console.log("oneYearPremium", oneYearPremium.trim());
			console.log(totalPremium, oneYearPremium, firstSummaryCardPremium);
			// if (excelValue === false) {
			// }
			// expect(totalPremium).toBeCloseTo(oneYearPremium, 0);
			// expect(totalPremium).toBeCloseTo(firstSummaryCardPremium, 0);
			await page.locator(buyThisButton).click();
			let popUpPremium = await page.locator(popUpPremiumXpath).textContent();
			//expect(firstSummaryCardPremium).toBeCloseTo(popUpPremium);
			await comparePremiums(firstSummaryCardPremium, popUpPremium);
			await page.locator(confirmAndBuyButton).click();
			await validateAndfillPhoneNumberAndNameForOtp({ page });
			// await fillPhoneNumberAndName({ page });
			// expect(page.locator(dontWorrySpamMsg)).toBeVisible();
			// await page.locator(sendOtpButton).click();
			// await page.locator(inputOTP).click();
			// await page.getByText("OTP", { exact: true }).click();
			// expect(page.locator(otpIsRequired)).toBeVisible();
			// await enterOtpAndSubmit({ page });
			//await expect(page.locator("h4")).toContainText("You’re almost done");
			const secondSummaryPremium = await page
				.locator(secondSummaryPremiumXpath)
				.textContent();
			const covertedSecondSummaryPremium =
				convertPremiumStringToNumber(secondSummaryPremium);
			//await comparePremiums();
			await comparePremiums(firstSummaryCardPremium, secondSummaryPremium);
			// await page.locator("//button//span[contains(text(), 'Start')]").click();
			// await page.locator("#text-input-pan").fill(panNumber);
			// await page.locator("#date-picker-dialog-dob").fill(dateOfBirth);
			// await page.locator("//span[contains(text(), 'Fetch')]").click();
			// await page.locator("//button//span[contains(text(), 'No')]").toBeVisible();
			// await page.locator("//button//span[contains(text(), 'Yes,')]").click();
			await ergoPassKYCWithValidDetails({ page });
			await expect(page.locator(heading_h4)).toContainText(
				"You’re almost done",
			);

			await page.locator(resumeButton).click();
			await page.locator(`//input[@value=${panNumber}]`).toBeVisible();
			await page.locator(selectGender).click();
			await page.locato(selectMale).click();
			await page.locator(selectMaritalStatus).click();
			await page.locator(selectSingle).click();
			await page.locator(inputEmailIdInProposalForm).fill(testEmail);
			await page.locator(selectAreaName).click();
			await page.locator("//li[contains(text(), 'HYD')]").click();
			await page.locator(nextButtonInProposalForm).click();
			await page.locator("//div[@role='dialog']//h6").toBeVisible();
			await expect
				.soft(
					page.locator(
						"//p[contains(text(), 'Your premium amount might change since pincode changed in the application form. You can continue to see the updated premium.')]",
					),
				)
				.toBeVisible();
			// await page
			// 	.locator("//button//span[contains(text(), 'Continue')]")
			// 	.click();
			await page.locator(continueButton).click();
			await page.locator("//button//span[contains(text(), 'Okay')]").click();
			await page.locator(selectHeight).click();
			await page.locator("//li[contains(text(), '5 feet 6')]").click();
			await page.locator("//input[@placeholder='Weight']").fill("68");
			await page.locator("//button//span[contains(text(), 'Next')]").click();
			await page
				.locator("//h6[contains(text(), 'Change in premiums')]")
				.waitFor();
			const changePremiumDialog = await page
				.getByText("//h6[contains(text(), 'Change in premiums')]")
				.isVisible();
			console.log(changePremiumDialog);
			await page
				.locator("//button//span[contains(text(), 'Continue')]")
				.click();
			await expect(
				page.locator("//h6[contains(text(), 'changed')]"),
			).toBeVisible();
			await page.locator("//button//span[contains(text(), 'Okay')]").click();
			await page.locator("//input[@type='checkbox']").click();
			await page.locator("//button//span[contains(text(), 'Next')]").click();
			// if (changePremiumDialog) {
			// 	await page
			// 		.locator("//button//span[contains(text(), 'Continue')]")
			// 		.click();
			// 	await expect(
			// 		page.locator("//h6[contains(text(), 'changed')]"),
			// 	).toBeVisible();
			// 	await page.locator("//button//span[contains(text(), 'Okay')]").click();
			// 	await page.locator("//input[@type='checkbox']").click();
			// 	await page.locator("//button//span[contains(text(), 'Next')]").click();
			// }
			await page.locator("//input[@name='NoneToAll']").click();
			await page.locator("//button//span[contains(text(), 'Next')]").click();
			await expect(
				page.locator("//h6[contains(text(), 'Nominee for this policy')]"),
			).toBeVisible();
			await page
				.locator("//input[@placeholder='John Doe']")
				.fill("Test Nominee");
			await page.locator("//div[@id='select-nominee.relation']").click();
			await page.locator("(//li[contains(text(), 'Father')])[1]").click();
			await page.locator("//button//span[contains(text(), 'Next')]").click();
			expect(page.locator("//h4")).toHaveText("Summary");
			expect(page.locator("//span[contains(text(), 'FHD')]")).toHaveText(
				panNumber,
			);
			await page.locator("//input[@name='cofirm']").click();
			await page.locator("//button//span[contains(text(), 'Confirm')]").click();
			await page.pause(5000);
			const applicationNumber = await page
				.locator("//span[contains(text(), 'Your application number - ')]//b")
				.textContent();
			console.log(applicationNumber);
			const todaysDate = await getCurrentDate();
			const url = page.url();
			const addApplicationNumber =
				"\nOptima Restore Individual Flow Application Number - " +
				applicationNumber +
				" - " +
				todaysDate +
				` url = ${url}`;
			const path = String.raw`C:\Users\Kishore\Downloads\First Automation\utilities\applicationNumbers.txt`;
			// await sheets.spreadsheets.values.update({
			// 	spreadsheetId: spreadsheetId,
			// 	range: `${sheetName}!D${[index]}`, // Assuming column D is for results
			// 	valueInputOption: "RAW",
			// 	resource: {
			// 		values: [[addApplicationNumber]],
			// 	},
			// });

			const workbook = XLSX.readFile(filePath);
			const worksheet = workbook.Sheets["demo data"];

			// Write data to cell A1
			worksheet[`E${index + 2}`] = { t: "n", v: "42" };

			// Save the updated workbook
			XLSX.writeFile(workbook, filePath);
			await page.pause(2000);
			const write = async () => {
				fs.appendFile(path, addApplicationNumber, (err) => {
					if (err) {
						console.log(err);
						return;
					}
				});
			};
			write();
		});

		await page.pause(1000);
		// test("verify and check the cover amount, premium and continue", async () => {

		// });
		// test("fill the phone number and enter the otp and continue", async () => {

		// });

		// test("verify the premium on summary page", async () => {

		// 	// fs.writeFile(path, addApplicationNumber, (err) => {
		// 	// 	if (err) {
		// 	// 		console.error(err);
		// 	// 		return;
		// 	// 	}
		// 	// });
		// });
		// test("testing", async () => {
		// 	await console.log("testing");
		// });
	});
};

const optimaRestoreParentsFlowFunction = async ({
	pincode,
	adultOneAge,
	adultTwoAge,
	annual_income,
}) => {
	test.describe("optimaRestoreFlow Parents", () => {
		let oneYearPremium;
		let twoYearPremium;
		let totalPremium;
		let firstSummaryCardPremium;
		let page; //create variable with page
		let pincodeString = JSON.stringify(pincode);
		console.log(adultTwoAge);
		//let ageString = JSON.stringify(age);
		test.beforeAll(async ({ browser }) => {
			page = await browser.newPage(); //Create a new Page instance
		});
		test.afterAll(async () => {
			page.close();
		});
		test("Go to app/fq and select the parents plan and fill the details", async () => {
			await openFlowNew(page, "Parents", "Optima restore");
			await expect(page.getByText("we are just a click away.")).toHaveText(
				"If there’s anything bothering you, we are just a click away.",
			);
			await selectMotherAndFather(page, adultOneAge, adultTwoAge);
			await page.locator(continueButton).click();
			await parentsHeadingValidation(page, adultOneAge, adultTwoAge);
			await page.locator(calculatePremiumButton).click();
			await parentsAgeFieldValidations(page, adultOneAge, adultTwoAge);
			await fillAgeAndPincodeForParentsFlow(page, pincode, adultOneAge);
		});
		test("verify and check the cover amount, premium and continue", async () => {
			const defaultCoverAmountInfo = await page
				.locator(defaultCoverAmount)
				.textContent();
			//expect(await page.locator(defaultCoverAmount)).toContainText("10 L");
			await page.locator("[id='3']").click();
			await page.locator(defaultCoverAmount).waitFor();
			const coverAmountDisplayed = await page
				.locator(defaultCoverAmount)
				.textContent();
			expect(page.locator("[id='3']")).toHaveText(coverAmountDisplayed);
			await page.locator("text=Calculate Premium").click();

			oneYearPremium = await page.locator(oneYearPremiumXpath).textContent();
			twoYearPremium = await page.locator(twoYearPremiumXpath).textContent();
			firstSummaryCardPremium = convertPremiumStringToNumber(
				await page.locator(firstSummaryCardPremiumXpath).textContent(),
			);

			totalPremium = convertPremiumStringToNumber(
				await page.locator(totalPremiumXpath).textContent(),
			);
			await page.locator(protectorRider).click();
			totalPremium = convertPremiumStringToNumber(
				await page.locator(totalPremiumXpath).textContent(),
			);
			oneYearPremium = convertPremiumStringToNumber(
				await page.locator(oneYearPremiumXpath).textContent(),
			);
			firstSummaryCardPremium = convertPremiumStringToNumber(
				await page.locator(firstSummaryCardPremiumXpath).textContent(),
			);
			////div[@class="MuiGrid-root MuiGrid-container"]//div//p[contains(text(), 'Premium')]/..//span[contains(text(), '₹')]
			// page.pause();
			// console.log("totalPremium", totalPremium);
			// console.log("oneYearPremium", oneYearPremium.trim());
			//console.log(totalPremium, oneYearPremium, firstSummaryCardPremium);
			//expect(totalPremium).toBeCloseTo(oneYearPremium, 0);
			console.log("totalPremium", totalPremium);
			await comparePremiums({
				firstPremium: totalPremium,
				secondPremium: oneYearPremium,
			});
			//expect(totalPremium).toBeCloseTo(firstSummaryCardPremium, 0);
			await comparePremiums({
				firstPremium: totalPremium,
				secondPremium: firstSummaryCardPremium,
			});
			await page.locator(buyThisButton).click();
			let popUpPremium = convertPremiumStringToNumber(
				await page.locator(popUpPremiumXpath).textContent(),
			);
			expect(firstSummaryCardPremium).toBeCloseTo(popUpPremium);

			await page.locator(confirmAndBuyButton).click();
		});
		test("fill the phone number and enter the otp and continue", async () => {
			await fillPhoneNumberAndName({ page });
			expect(page.locator(dontWorrySpamMsg)).toBeVisible();
			await page.locator(sendOtpButton).click();
			await page.locator(inputOTP).click();
			await page.getByText("OTP", { exact: true }).click();
			expect(page.locator(otpIsRequired)).toBeVisible();
			await enterOtpAndSubmit({ page });
		});
	});
};

// const readSpreadSheetData = async () => {
// 	const spreadsheetId = "1HS0h6EfvmU0POjOTpYNjpsikAp7wh0nHa0hZ0pwZxh0"; // Replace with your spreadsheet ID
// 	const sheetName = "Sheet1"; // Replace with the sheet name you want to read
// 	const auth = new google.auth.GoogleAuth({
// 		credentials: serviceAccountKey,
// 		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// 	});

// 	const sheets = google.sheets({ version: "v4", auth });
// 	const spreadSheetData = await readSpreadsheet();
// 	console.log("spreadSheetData", spreadSheetData);
// 	for (let index = 0; index <= spreadSheetData.length; index++) {
// 		const element = spreadSheetData[index];
// 		await optimaRestoreFlowFunction(
// 			element,
// 			sheets,
// 			sheetName,
// 			spreadsheetId,
// 			index,
// 		);
// 	}
// };

// readSpreadSheetData();
// const spreadSheetData = await readSpreadsheet();
// console.log("spreadSheetData", spreadSheetData);

//const element = { pincode: "500010", adultOneAge: "48", adultTwoAge: "40" };
//optimaRestoreFlowFunction(element, sheets, sheetName, spreadsheetId);
// optimaRestoreParentsFlowFunction({
// 	pincode: "560004",
// 	adultOneAge: "54",
// 	annual_income: "10L",
// });

export { optimaRestoreFlowFunction, optimaRestoreParentsFlowFunction };
// test("complete KYC flow", async () => {
// 	await page.locator("//button//span[contains(text(), 'Start')]").click();
// 	await page.locator("#text-input-pan").fill(panNumber);
// 	await page.locator("#date-picker-dialog-dob").fill(dateOfBirth);
// 	await page.locator("//span[contains(text(), 'Fetch')]").click();
// 	await page.locator("//button//span[contains(text(), 'No')]").toBeVisible;
// 	await page.locator("//button//span[contains(text(), 'Yes,')]").click();
// 	await expect(page.locator("//h4")).toContainText("Proposal Form");
// 	await page.locator("//button//span[contains(text(), 'Resume')]").click();
// 	await page.locator("//input[@value='FHDPK3065G']").toBeVisible;
// 	await page.locator("#select-gender").click();
// 	await page.locator("//li[contains(text(), 'Male')]").click();
// 	await page.locator("#select-marital_status").click();
// 	await page.locator("//li[contains(text(), 'Single')]").click();
// 	await page.locator("#text-input-email_id").fill(testEmail);
// 	await page.locator("#select-address.area_name").click();
// 	await page.locator("#//li[contains(text(), 'HYD')]").click();
// 	await page.locator("//button//span[contains(text(), 'Next')]").click();
// 	await page.locator("//div[@role='dialog']//h6").toBeVisible;
// 	await page
// 		.locator(
// 			"//p[contains(text(), 'Your premium amount might change since pincode changed in the application form. You can continue to see the updated premium.')]",
// 		)
// 		.toBeVisible();
// 	await page.locator("//button//span[contains(text(), 'Continue')]").click();
// 	await page.locator("//button//span[contains(text(), 'Okay')]").click();
// 	await page.locator("//div[contains(text(),'Height')]").click();
// 	await page.locator("//li[contains(text(), '5 feet 6')]").click();
// 	await page.locator("//input[@placeholder='Weight']").fill("68");
// 	const changePremiumDialog = await expect(
// 		page.locator("//h6[contains(text(), 'Change')]"),
// 	).toBeVisible();
// 	if (changePremiumDialog) {
// 		await page
// 			.locator("//button//span[contains(text(), 'Continue')]")
// 			.click();
// 		await page.locator("//h6[contains(text(), 'changed')]").toBeVisible;
// 		await page.locator("//button//span[contains(text(), 'Okay')]").click();
// 		await page.locator("//input[@type='checkbox']").click();
// 		await page.locator("//button//span[contains(text(), 'Next')]").click();
// 		await page.locator("//input[@name='NoneToAll']").click();
// 		await expect(
// 			page.locator("//h6[contains(text(), 'Nominee for this policy')]"),
// 		).toBeVisible();
// 		await page
// 			.locator("//input[@placeholder='John Doe']")
// 			.fill("Test Nominee");
// 		await page.locator("//div[@id='select-nominee.relation']").click();
// 		await page.locator("(//li[contains(text(), 'Father')])[1]").click();
// 		expect(page.locator("//h4")).toHaveText("Summary");
// 		expect(page.locator("//span[contains(text(), 'FHD')]")).toHaveText(
// 			panNumber,
// 		);
// 		await page.locator("//input[@name='cofirm']").click();
// 		await page.locator("//button//span[contains(text(), 'Confirm')]").click();
// 		const applicationNumber = await page
// 			.locator("//span[contains(text(), 'Your application number - ')]//b")
// 			.textContent();
// 		console.log(applicationNumber);
// 	}
// });
