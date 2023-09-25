import { test, expect } from "@playwright/test";
import { isEqual } from "lodash.isequal";
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
	openFlowOptimaSecure,
	getListValue,
	randomIntFromInterval,
	compareArrays,
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
	listElementsFromDropDown,
	continueButton2,
	yourPremiumHasBeenUpdatedText,
	okayButton,
	nextButton,
	h6ChangeInPremiums,
	NoneToAllInputCheckbox,
	h6NomineeHeading,
	nomineeNameInput,
	selectNomineeRelation,
	nomineeAgeInput,
	inputFullName,
	fullNameHelperText,
	emailIDHelperText,
	coverAmountListXpath,
	genderHelperText,
	maritalStatusHelperText,
	heightInputButton,
} from "../../../pages/Health/ergo/xpaths.spec";
import {
	dateOfBirth,
	heighValueArray,
	panNumber,
	testEmail,
} from "../../../utilities/mainData";
import {
	ageValidationErgo,
	defaultGenderArray,
	defaultMaritalStatusListArray,
	ergoPassKYCWithValidDetails,
	parentsAgeValidation,
	pincodeValidationErgo,
	selectRestoreRiders,
	validateWeightField,
} from "../../../pages/Health/ergo/ergoCommon";

const optimaSecureFlowFunction = async (element, index) => {
	const { pincode, adultOneAge, adultTwoAge, type } = element;
	//console.log(pincode, adultOneAge, adultTwoAge);
	console.log(index);
	test.describe(`optimaRestoreFlow - ${type} - ${pincode}, ${adultOneAge}`, async () => {
		let oneYearPremium;
		let twoYearPremium;
		let totalPremium;
		let firstSummaryCardPremium;
		let page; //create variable with page
		let pincodeString = JSON.stringify(pincode);
		let ageString = JSON.stringify(adultOneAge);
		let adultTwoAgeString = JSON.stringify(adultTwoAge);
		test.beforeAll(async ({ browser }) => {
			page = await browser.newPage(); //Create a new Page instance
		});
		test.afterAll(async ({ browser }) => {
			page.close();
		});
		test("Go to app/fq and enter basic details and verify error messages", async () => {
			await openFlowNew(page, type, "Optima secure");
			await expect(page.getByText("we are just a click away.")).toHaveText(
				"If there’s anything bothering you, we are just a click away.",
			);
			await expect(page.getByText("Talk to us")).toHaveText(
				"Talk to us by pressing the help icon in the top-right corner.",
			);
			await page.locator(continueButton).click();
			if (type === "Individual") {
				expect(await page.locator(heading)).toHaveText("Tell us about you");
			} else if (type === "Parents") {
				await parentsHeadingValidation(page, ageString, adultTwoAgeString);
			}
			if (type === "Individual") {
				await ageValidationErgo({ page });
			} else if (type === "Parents") {
				await parentsAgeValidation({ page });
			}
			expect(
				await page.locator("//span[contains(text(), 'Optima Secure')]"),
			).toHaveText("Optima Secure");
			await pincodeValidationErgo({ page });
			if (type === "Individual") {
				await fillAgeAndPincode({ page, pincodeString, ageString });
			} else if (type === "Parents") {
				await fillAgeAndPincodeForParentsFlow(
					page,
					pincodeString,
					ageString,
					adultTwoAgeString,
				);
			}
		});
		test("verify and check the cover amount, premium and continue", async () => {
			expect(await page.locator(defaultCoverAmount)).toContainText("10 L");
			const coverAmountList = await getListValue(page, coverAmountListXpath);
			console.log(coverAmountList, coverAmountList.length);
			const randomCoverSelect =
				coverAmountList[Math.floor(Math.random() * coverAmountList.length - 1)];
			console.log(randomCoverSelect);
			await page
				.locator(`//div[contains(text(), "${randomCoverSelect}")]`)
				.click({ delay: 3000 });
			await page.locator(defaultCoverAmount).waitFor();
			const coverAmountDisplayed = await page
				.locator(defaultCoverAmount)
				.textContent();
			expect(
				page.locator(`//div[contains(text(), "${randomCoverSelect}")]`),
			).toHaveText(coverAmountDisplayed);
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
			// await selectRestoreRiders({
			// 	page,
			// 	riderName: "Protector Rider",
			// 	select: true,
			// });
			// await selectRestoreRiders({
			// 	page,
			// 	riderName: "Unlimited Restoration",
			// 	select: false,
			// });
			totalPremium = await page.locator(totalPremiumXpath).textContent();
			oneYearPremium = await page.locator(oneYearPremiumXpath).textContent();
			firstSummaryCardPremium = await page
				.locator(firstSummaryCardPremiumXpath)
				.textContent();
			await comparePremiums(totalPremium, oneYearPremium);
			await comparePremiums(totalPremium, firstSummaryCardPremium);
			await page.locator(buyThisButton).click();
			await page.locator(confirmAndBuyButton).click();
			await validateAndfillPhoneNumberAndNameForOtp({ page });
		});

		test("verify the premium on summary page", async () => {
			await expect(page.locator("h4")).toContainText("You’re almost done");
			const secondSummaryPremium = await page
				.locator(secondSummaryPremiumXpath)
				.textContent();
			const covertedSecondSummaryPremium =
				convertPremiumStringToNumber(secondSummaryPremium);
			//await comparePremiums();
			await comparePremiums(firstSummaryCardPremium, secondSummaryPremium);
			// expect.soft(firstSummaryCardPremium).toMatch(secondSummaryPremium);
			// await page.locator("//button//span[contains(text(), 'Start')]").click();
			// await page.locator("#text-input-pan").fill(panNumber);
			// await page.locator("#date-picker-dialog-dob").fill(dateOfBirth);
			// await page.locator("//span[contains(text(), 'Fetch')]").click();
			// await page.locator("//button//span[contains(text(), 'No')]").toBeVisible;
			// await page.locator("//button//span[contains(text(), 'Yes,')]").click();

			//
			//

			await ergoPassKYCWithValidDetails({ page });
			await expect(page.locator("//h4")).toContainText("You’re almost done");
			await page.locator(resumeButton).click();
			// const panInputFieldValue = page
			// 	.locator(`//input[@value=${panNumber}]`)
			// 	.textContent();
			//await expect.soft(panInputFieldValue).toHaveText(panNumber);
			await page.locator(inputFullName).clear();
			// await page.locator(selectGender).focus();
			// await page.locator(selectMaritalStatus).focus();
			//await page.locator(selectGender).click();
			await page.locator(inputEmailIdInProposalForm).click();
			await page.locator(nextButtonInProposalForm).click();
			expect(await page.locator(fullNameHelperText)).toHaveText("Required");
			expect(await page.locator(emailIDHelperText)).toHaveText("Required");
			// expect(await page.locator(genderHelperText)).toHaveText("Required");
			// expect(await page.locator(maritalStatusHelperText)).toHaveText(
			// 	"Required",
			// );
			await page.locator(inputFullName).fill("Kishore");
			expect(await page.locator(fullNameHelperText)).toHaveText(
				"Enter both First and Last names",
			);
			await page.locator(inputFullName).fill("Sai Kishore");
			await page.locator(selectGender).click();
			const genderArray = await getListValue(page, "//li");
			const genderListCompare = await compareArrays(
				genderArray,
				defaultGenderArray,
			);
			expect(genderListCompare).toBeTruthy();
			expect(genderArray).toEqual(defaultGenderArray);
			await page.locator(selectMaritalStatus).click();
			const maritalStatusListArray = await getListValue(page, "//li");
			expect(maritalStatusListArray).toEqual(defaultMaritalStatusListArray);
			expect(
				await compareArrays(
					maritalStatusListArray,
					defaultMaritalStatusListArray,
				),
			).toBeTruthy();
			await page.locator(selectGender).click();
			await page.locator(selectMale).click();
			await page.locator(selectMaritalStatus).click();
			await page.locator(selectSingle).click();
			await page.locator(inputEmailIdInProposalForm).fill(testEmail);
			await page.locator(nextButtonInProposalForm).click();
			await expect(page.locator("//div[@role='dialog']//h6")).toBeVisible();
			await expect
				.soft(page.locator(yourPremiumHasBeenUpdatedText))
				.toBeVisible();
			await page.locator(continueButton2).click();
			await page.locator(okayButton).click();
			await page.locator(heightInputButton).click();
			const heighValues = await getListValue(page, listElementsFromDropDown);
			console.log(heighValues);
			const compareHeightValues = compareArrays(heighValueArray, heighValues);
			expect.soft(compareHeightValues).toBeTruthy();
			const selectHeighValue = heighValues[randomIntFromInterval(48, 70)];
			await page
				.locator(`//li[contains(text(), "${selectHeighValue}")]`)
				.click();
			await validateWeightField({ page });
			await page.locator(nextButtonInProposalForm).click();
			await page.locator(h6ChangeInPremiums).waitFor();
			const changePremiumDialog = await page
				.getByText(h6ChangeInPremiums)
				.isVisible();
			console.log(changePremiumDialog);
			await page.locator(continueButton2).click();
			await expect(
				page.locator("//h6[contains(text(), 'changed')]"),
			).toBeVisible();
			await page.locator(okayButton).click();
			await page.locator("//input[@type='checkbox']").click();
			await page.locator(nextButton).click();
			try {
				await expect(page.getByText("Change in premiums")).toContainText(
					"Change in premiums",
				);
				await page.locator(okayButton).click();
				await page.locator(okayButton).click();
			} catch (error) {
				console.log("No premiums change alert");
			}
			await page.locator(NoneToAllInputCheckbox).click();
			await page.locator(nextButtonInProposalForm).click();
			await expect(page.locator(h6NomineeHeading)).toBeVisible();
			await page.locator(nomineeNameInput).fill("Test Nominee");
			await page.locator(selectNomineeRelation).click();
			await page.locator("(//li[contains(text(), 'Father')])[1]").click();
			await page.locator(nomineeAgeInput).fill("50");
			await page.locator(nextButtonInProposalForm).click();
			expect(page.locator("//h4")).toHaveText("Summary");
			expect(page.locator("//span[contains(text(), 'FHD')]")).toHaveText(
				panNumber,
			);
			await page.locator("//input[@name='cofirm']").click();
			await page.locator("//button//span[contains(text(), 'Confirm')]").click();
			const applicationNumber = await page
				.locator("//span[contains(text(), 'Your application number - ')]//b")
				.textContent();
			console.log(applicationNumber);
			const todaysDate = await getCurrentDate();
			const url = page.url();
			const addApplicationNumber =
				"\nOptima Secure Individual Flow Application Number - " +
				applicationNumber +
				" - " +
				todaysDate +
				` url = ${url}`;
			const path = String.raw`C:\Users\Kishore\Downloads\First Automation\utilities\applicationNumbers.txt`;

			const write = () => {
				fs.appendFile(path, addApplicationNumber, (err) => {
					if (err) {
						console.log(err);
						return;
					}
				});
			};
			await write();
			page.pause();
		});
	});
};

const element = {
	pincode: "500010",
	adultOneAge: "48",
	adultTwoAge: "40",
	type: "Parents",
};
optimaSecureFlowFunction(element, 1);
