import {
	ageInputIndividual,
	dontWorrySpamMsg,
	fatherAgeIsRequiredText,
	fathersAgeInput,
	fullNameTextInput,
	heading,
	inputOTP,
	mobileNumberTextInput,
	motherAgeIsRequiredText,
	mothersAgeInput,
	optimaRestoreOption,
	optimaSecureOption,
	otpInput,
	otpIsRequired,
	otpSubmit,
	pincodeInputIndividual,
	pincodeIsRequired,
	selectFamily,
	selectFather,
	selectMother,
	selectParents,
	selectSelf,
	sendOtpButton,
} from "./xpaths.spec";
import {
	stagingOne,
	testingName,
	testingOTP,
	testingPhoneNumber,
} from "../../../utilities/mainData";

const { test, expect } = require("@playwright/test");
const openFlow = async ({ page }) => {
	await page.goto(stagingOne);
	await page.locator(optimaRestoreOption).click();
	await page.locator("//span[contains(text(), 'For self')]").click();
};

const openFlowNew = async (page, type, insurer) => {
	await page.goto(stagingOne);
	//console.log(type === "Parents");
	if (type === "Individual") {
		await page.locator(`text=${insurer}`).click();
		await page.locator(selectSelf).click();
	} else if (type === "Family") {
		await page.locator(`text=${insurer}`).click();
		await page.locator(selectFamily).click();
	} else if (type === "Parents") {
		await page.locator(`text=${insurer}`).click();
		await page.locator(selectParents).click();
	} else {
		return console.log("Plan for is not selected");
	}
};

const openFlowOptimaSecure = async ({ page }) => {
	await page.goto(stagingOne);
	await page.locator(optimaSecureOption).click();
	await page.locator("//span[contains(text(), 'For self')]").click();
};

const selectMotherAndFather = async (page, adultOneAge, adultTwoAge) => {
	console.log(adultTwoAge, adultOneAge);
	if (adultOneAge === undefined) {
		await page.locator(selectFather).click();
	}
	if (adultTwoAge === undefined) {
		await page.locator(selectMother).click();
	}
};
const parentsHeadingValidation = async (page, adultOneAge, adultTwoAge) => {
	if (adultOneAge && adultTwoAge !== undefined) {
		expect(await page.locator(heading)).toHaveText(
			"Tell us about your parents",
		);
	} else if (adultOneAge === undefined) {
		expect(await page.locator(heading)).toHaveText("Tell us about your mother");
	} else if (adultTwoAge === undefined) {
		expect(await page.locator(heading)).toHaveText("Tell us about your father");
	}
};
const parentsAgeFieldValidations = async (page, adultOneAge, adultTwoAge) => {
	if (adultOneAge !== undefined) {
		await expect(page.locator(fatherAgeIsRequiredText)).toHaveText(
			"Father's age is a required field",
		);
	}
	if (adultTwoAge !== undefined) {
		await expect(page.locator(motherAgeIsRequiredText)).toHaveText(
			"Mother's age is a required field",
		);
	}

	expect(page.locator(pincodeIsRequired)).toHaveText("Pin code is required");
};

const fillAgeAndPincode = async ({ page, pincodeString, ageString, type }) => {
	await page.locator(ageInputIndividual).fill(ageString);
	await page
		.locator(pincodeInputIndividual)
		.type(pincodeString, { delay: 100 });
};

const randomIntFromInterval = (min, max) => {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const fillAgeAndPincodeForParentsFlow = async (
	page,
	pincodeString,
	adultOneAge,
	adultTwoAge,
) => {
	if (adultOneAge) {
		await page.locator(fathersAgeInput).fill(adultOneAge);
	}
	if (adultTwoAge) {
		await page.locator(mothersAgeInput).fill(adultTwoAge);
	}
	await page
		.locator(pincodeInputIndividual)
		.type(pincodeString, { delay: 100 });
};

// const fillAgeAndPincodeNew = async ({ page, pincodeString, ageString, type }) => {
// 	if ((type = "Individual")) {
// 		await page.locator(ageInputIndividual).fill(ageString);
// 		await page
// 			.locator(pincodeInputIndividual)
// 			.type(pincodeString, { delay: 100 });
// 	} else if ((type = "Family")) {
// 		if{

// 		}
// 	}
// };

const validateAndfillPhoneNumberAndNameForOtp = async ({ page }) => {
	await page.locator(sendOtpButton).click();
	expect(await page.locator("#text-input-mobile-helper-text")).toHaveText(
		"Required",
	);
	expect(await page.locator("#text-input-fullName-helper-text")).toHaveText(
		"Required",
	);

	await page
		.locator(mobileNumberTextInput)
		.fill(JSON.stringify(randomIntFromInterval(1000, 100000)));
	expect(await page.locator("#text-input-mobile-helper-text")).toHaveText(
		"Invalid mobile number.Must contain 10 numbers.",
	);
	await page.locator(fullNameTextInput).fill(testingName);
	await page.locator(mobileNumberTextInput).fill(testingPhoneNumber);
	await page.locator(sendOtpButton).click();
	//expect(page.locator(dontWorrySpamMsg)).toBeVisible();
	//await page.locator(sendOtpButton).click();
	await page.locator(inputOTP).click();
	await page.getByText("OTP", { exact: true }).click();
	expect(page.locator(otpIsRequired)).toBeVisible();
	await page.locator(otpInput).fill(testingOTP);
	await page.locator(otpSubmit).click();
};

const enterOtpAndSubmit = async ({ page }) => {
	await page.locator(otpInput).fill(testingOTP);
	await page.locator(otpSubmit).click();
};

const startRangePremium = ({ premium }) => {};

const commonErgoFlowForIndividual = () => {
	// @ts-check
};

const convertPremiumStringToNumber = (inputString) => {
	// Step 1: Remove the rupee symbol and commas (if present)
	// Use regular expressions to remove both the ₹ symbol and commas.
	const cleanedString = inputString.replace(/₹|,/g, "");

	// Step 2: Convert the cleaned string to a float
	const floatValue = parseFloat(cleanedString);

	if (!isNaN(floatValue)) {
		console.log("Float Value:", floatValue);
		return floatValue;
	} else {
		return null;
		console.log("Invalid input: Unable to convert to a float");
	}
};

const comparePremiums = async (firstPremium, secondPremium, year) => {
	console.log(firstPremium, secondPremium);
	const cleanedString1 = await convertPremiumStringToNumber(firstPremium);
	const cleanedStrine2 = await convertPremiumStringToNumber(secondPremium);
	expect.soft(cleanedString1).toBeGreaterThanOrEqual(cleanedStrine2 - 2);
	expect.soft(cleanedString1).toBeLessThanOrEqual(cleanedStrine2 + 2);
};

const getCurrentDate = () => {
	const date = new Date();
	let currentDay = String(date.getDate()).padStart(2, "0");
	let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
	let currentYear = date.getFullYear();
	let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
	return currentDate;
};

const getDateBefore99Years = (age, plusDate) => {
	const today = new Date();
	const ninetyNineYearsAgo = new Date(today);
	ninetyNineYearsAgo.setFullYear(today.getFullYear() - age);
	const day = String(ninetyNineYearsAgo.getDate()).padStart(2, "0");
	const month = String(ninetyNineYearsAgo.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
	const year = ninetyNineYearsAgo.getFullYear();

	const formattedDate = `${day}/${month}/${year}`;

	console.log(formattedDate);
	return formattedDate;
};

const getListValue = async (page, locator) => {
	const options = await page.$$(locator);
	let optionValue = [];
	for await (let option of options) {
		const value = await option.textContent();
		optionValue.push(value);
	}
	console.log("The Array Value :: ", optionValue);
	return optionValue;
};

const compareArrays = (a, b) =>
	a.length === b.length && a.every((element, index) => element === b[index]);

export {
	getDateBefore99Years,
	getListValue,
	fillAgeAndPincode,
	fillAgeAndPincodeForParentsFlow,
	selectMotherAndFather,
	comparePremiums,
	parentsAgeFieldValidations,
	parentsHeadingValidation,
	validateAndfillPhoneNumberAndNameForOtp,
	enterOtpAndSubmit,
	openFlow,
	openFlowNew,
	openFlowOptimaSecure,
	getCurrentDate,
	convertPremiumStringToNumber,
	randomIntFromInterval,
	compareArrays,
};
