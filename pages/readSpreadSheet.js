import { test, expect, chromium, page } from "@playwright/test";
const { google } = require("googleapis");
const serviceAccountKey = require("C://Users/Kishore/Downloads/First Automation/utilities/automation-data-2023-a58ce52b0d75.json"); // Replace with your service account key file
const { ageInputIndividual } = require("./Health/ergo/xpaths.spec");

const readSpreadsheet = async () => {
	// Authenticate with Google Sheets API using service account credentials
	const spreadsheetId = "1HS0h6EfvmU0POjOTpYNjpsikAp7wh0nHa0hZ0pwZxh0"; // Replace with your spreadsheet ID
	const sheetName = "Sheet1"; // Replace with the sheet name you want to read
	const auth = new google.auth.GoogleAuth({
		credentials: serviceAccountKey,
		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	});

	const sheets = google.sheets({ version: "v4", auth });

	// Read data from the Google Spreadsheet
	const response = await sheets.spreadsheets.values.get({
		spreadsheetId,
		range: sheetName,
	});

	const values = response.data.values;

	// Launch a new browser instance
	// Loop through the sheet data and run tests
	for (const row of values) {
		const [testName, testAction, testValue] = row;
		const columnHeaders = values[0];
		//console.log(columnHeaders); // Get the headers of the first row
		const numColumns = 5;
		// Extract data from the specified number of columns
		const extractedData = values.map((row) => {
			//console.log(row);
			const rowData = {};
			for (let i = 1; i < numColumns + 1; i++) {
				rowData[columnHeaders[i - 1]] = row[i - 1];
			}
			return rowData;
		});
		extractedData.shift();
		return extractedData;
	}
	// Close the browser
};

export { readSpreadsheet };
