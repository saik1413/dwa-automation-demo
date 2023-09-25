import { test, expect, chromium, page } from "@playwright/test";
const { google } = require("googleapis");
const serviceAccountKey = require("C://Users/Kishore/Downloads/First Automation/utilities/automation-data-2023-a58ce52b0d75.json"); // Replace with your service account key file
import {
	readExcelAndReturnData,
	readExcelFile,
} from "../../pages/readExcelFile";
import {
	optimaRestoreFlowFunction,
	optimaRestoreParentsFlowFunction,
} from "./ergo/optimaRestoreFlow.spec";
import { filePath, readExcel } from "../../utilities/mainData";
import { readSpreadsheet } from "../../pages/readSpreadSheet";

test.describe("read and print excel data", async () => {
	// const spreadsheetId = "1HS0h6EfvmU0POjOTpYNjpsikAp7wh0nHa0hZ0pwZxh0"; // Replace with your spreadsheet ID
	// const sheetName = "Sheet1"; // Replace with the sheet name you want to read
	// const auth = new google.auth.GoogleAuth({
	// 	credentials: serviceAccountKey,
	// 	scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	// });
	// const sheets = google.sheets({ version: "v4", auth });
	// //let page; //create variable with page
	// const spreadSheetData = await readSpreadsheet();
	// console.log("spreadSheetData", spreadSheetData);
	// for (let index = 0; index <= spreadSheetData.length; index++) {
	// 	const element = spreadSheetData[index];
	// 	optimaRestoreFlowFunction({
	// 		each: element,
	// 		sheets,
	// 		sheetName,
	// 		spreadsheetId,
	// 		index,
	// 	});
	// }
	// spreadSheetData.map((each) => {
	// 	console.log(each);
	// 	optimaRestoreFlowFunction(each, sheets, sheetName, spreadsheetId);
	// });
	// test.beforeAll(async ({ browser }) => {
	// 	page = await browser.newPage(); //Create a new Page instance
	// });
	// if (readExcel) {

	const numColumnsToExtract = 3; // Change this to the number of columns you want to extract
	const extractedData = await readExcelFile(filePath, numColumnsToExtract);
	//console.log(extractedData);
	for (let index = 0; index < extractedData.length; index++) {
		optimaRestoreFlowFunction(extractedData[index], index);
	}
	// extractedData.map((each) => {
	// 	optimaRestoreFlowFunction(each);
	// });
	// } else {
	// 	optimaRestoreFlowFunction("500010", "40",);
	// }
	// test.afterAll(async ({ browser }) => {
	// 	page.close();
	// });
	// test("should read excel data", async () => {
	// 	await page.goto("https://test-bliss.joinditto.in");
	// 	const filePath = "C://Users/Kishore/Downloads/Book1.xlsx";
	// 	const numColumnsToExtract = 3; // Change this to the number of columns you want to extract
	// 	const extractedData = readExcelFile(filePath, numColumnsToExtract);
	// 	console.log(extractedData);
	// });
});

// for (let index = 0; index < array.length; index++) {
// 	const element = array[index];
// }
