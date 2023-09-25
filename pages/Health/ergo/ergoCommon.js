import { expect } from "@playwright/test";
import { getDateBefore99Years, randomIntFromInterval } from "./common";
import {
	NoButtonInConfirmKYCDetails,
	YesButtonInConfirmKYCDetails,
	ageInputIndividual,
	ageIsRequiredText,
	calculatePremiumButton,
	dobErrorMessage,
	dobInputForKYC,
	fatherAgeInputHelperText,
	fatherAgeIsRequiredText,
	fathersAgeInput,
	fetchKYCDetailsButton,
	inputPan,
	kycPopUpCloseButton,
	motherAgeInputHelperText,
	mothersAgeInput,
	pincodeInputIndividual,
	pincodeIsRequired,
	protectorRider,
	riderXpath,
	startButtonForKYC,
	weightHelperTextXpath,
	weightInputField,
} from "./xpaths.spec";
import { dateOfBirth, panNumber } from "../../../utilities/mainData";

const ageValidationErgo = async ({ page }) => {
	let invalidAge;
	// expect(
	// 	page.locator("//span[contains(text(), 'Calculate Premium')]/.."),
	// ).toBeDisabled();
	await page.locator(calculatePremiumButton).click();
	await expect(page.locator(ageIsRequiredText)).toHaveText(
		"Your age is a required field",
	);

	invalidAge = randomIntFromInterval(1, 17);
	await page.locator(ageInputIndividual).fill(JSON.stringify(invalidAge));
	await expect(page.locator(ageIsRequiredText)).toHaveText(
		"Minimum age should be 18",
	);
	invalidAge = randomIntFromInterval(66, 100);
	await page.locator(ageInputIndividual).fill(JSON.stringify(invalidAge));
	await expect(page.locator(ageIsRequiredText)).toHaveText(
		"Maximum age allowed is 65",
	);
};

const parentsAgeValidation = async ({ page }) => {
	let invalidAge;
	await page.locator(calculatePremiumButton).click();
	expect(await page.locator(fatherAgeInputHelperText)).toHaveText(
		"Father's age is a required field",
	);
	expect(await page.locator(motherAgeInputHelperText)).toHaveText(
		"Mother's age is a required field",
	);
	invalidAge = randomIntFromInterval(1, 17);
	await page.locator(fathersAgeInput).fill(JSON.stringify(invalidAge));
	expect(await page.locator(fatherAgeInputHelperText)).toHaveText(
		"Minimum age should be 18",
	);
	await page.locator(mothersAgeInput).fill(JSON.stringify(invalidAge));
	expect(await page.locator(motherAgeInputHelperText)).toHaveText(
		"Minimum age should be 18",
	);
	invalidAge = randomIntFromInterval(66, 100);
	await page.locator(fathersAgeInput).fill(JSON.stringify(invalidAge));
	expect(await page.locator(fatherAgeInputHelperText)).toHaveText(
		"Maximum age allowed is 65",
	);
	await page.locator(mothersAgeInput).fill(JSON.stringify(invalidAge));
	expect(await page.locator(motherAgeInputHelperText)).toHaveText(
		"Maximum age allowed is 65",
	);
};

const pincodeValidationErgo = async ({ page }) => {
	expect(page.locator(pincodeIsRequired)).toHaveText("Pin code is required");
	await page.locator(pincodeInputIndividual).fill("500");
	expect(page.locator(pincodeIsRequired)).toHaveText("Enter a valid pincode");
	await page.locator(pincodeInputIndividual).fill("000000");
	expect(page.locator(pincodeIsRequired)).toHaveText("Enter a valid pincode");
	await page.locator(pincodeInputIndividual).clear();
	expect(page.locator(pincodeIsRequired)).toHaveText("Pin code is required");
};

const selectRestoreRiders = async ({ page, riderName, select }) => {
	const xpath = riderXpath(riderName);
	await page.locator(xpath).click();
	if (select !== true) {
		await page.locator(xpath).click();
	}
};

const ergoPassKYCWithValidDetails = async ({ page }) => {
	await page.locator(startButtonForKYC).click();
	await page.locator(inputPan).fill(panNumber);
	await page.locator(dobInputForKYC).fill("05/07/1920");
	await page.locator(fetchKYCDetailsButton).click();
	const ageLessThan = getDateBefore99Years(100);
	console.log("ageLessThan", ageLessThan);
	expect(await page.locator(dobErrorMessage)).toHaveText(
		`Age should not be more than 99 years (must born after ${ageLessThan})`,
	);
	await page.locator(dobInputForKYC).fill("05/01/2020");

	const ageMoreThan = getDateBefore99Years(18);
	console.log("ageMoreThan", ageMoreThan);
	expect(await page.locator(dobErrorMessage)).toHaveText(
		`You should be 18 years old (must born before ${ageMoreThan})`,
	);
	await page.locator(inputPan).fill("FHDPK3065H");
	await page.locator(dobInputForKYC).fill("05/07/1999");
	await page.locator(fetchKYCDetailsButton).click();
	await expect(page.locator("//div[@role='dialog']//h6")).toHaveText(
		"KYC Not Found",
	);
	expect(
		await page.locator(
			"//div[@role='dialog']//p[contains(text(), 'We can’t find any previous KYC done')]",
		),
	).toHaveText(
		"We can’t find any previous KYC done by you on HDFC platform. Please complete the KYC process to proceed further",
	);
	await page.locator(kycPopUpCloseButton).click();
	await page.locator(inputPan).clear();
	await page.locator(dobInputForKYC).clear();
	await page.locator(inputPan).fill(panNumber);
	await page.locator(dobInputForKYC).fill(dateOfBirth);
	await page.locator(fetchKYCDetailsButton).click();
	await expect(page.locator(NoButtonInConfirmKYCDetails)).toBeVisible();
	await page.locator(NoButtonInConfirmKYCDetails).click();
	expect(await page.locator("//div[@role='dialog']//h6")).toHaveText(
		"Update Your KYC",
	);
	expect(
		await page.locator(
			"//p[contains(text(), 'You can update your KYC details')]",
		),
	).toHaveText(
		"You can update your KYC details on the HDFC platform. Please complete the KYC process to proceed further",
	);

	await page.locator(kycPopUpCloseButton).click();
	await page.locator(YesButtonInConfirmKYCDetails).click();
};

const ergoKYCOnHDFCPlatform = async ({ page }) => {
	await page.locator(startButtonForKYC).click();
	const url = await page.url();
	await page.locator("//span[contains(text(), 'click here')]").click();
	const url2 = await page.url();
	console.log("KYC link on HDFC platform", url2);
	page.goto(url);
};

const validateWeightField = async ({ page }) => {
	await page.locator(weightInputField).fill("0");
	expect(await page.locator(weightHelperTextXpath)).toContainText(
		"Min weight 1",
	);
	await page.locator(weightInputField).clear();
	await page.locator(weightInputField).fill("600");
	expect(await page.locator(weightHelperTextXpath)).toContainText(
		"Max weight 500",
	);
	await page
		.locator(weightInputField)
		.fill(`"${randomIntFromInterval(42, 80)}"`);
};

const defaultGenderArray = ["Select", "Male", "Female"];
const defaultMaritalStatusListArray = [
	"Select",
	"Married",
	"Single",
	"Widowed",
	"Separated",
	"Divorced",
];
export {
	ageValidationErgo,
	pincodeValidationErgo,
	ergoPassKYCWithValidDetails,
	selectRestoreRiders,
	validateWeightField,
	ergoKYCOnHDFCPlatform,
	parentsAgeValidation,
	defaultGenderArray,
	defaultMaritalStatusListArray,
};
