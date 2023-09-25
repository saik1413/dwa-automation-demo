import XLSX from "xlsx";

function readExcelFile(filePath, numColumns) {
	const workbook = XLSX.readFile(filePath);
	const firstSheetName = workbook.SheetNames[0]; // Get the name of the first sheet
	console.log(firstSheetName);
	const worksheet = workbook.Sheets[firstSheetName];

	const sheetData = XLSX.utils.sheet_to_json(worksheet);
	// console.log(sheetData);
	// const firstTwoColumnData = sheetData.map((row) => ({
	// 	column1: row["pincode"], // Replace 'Column1' with the actual header of the first column
	// 	column2: row["age"], // Replace 'Column2' with the actual header of the second column
	// }));

	// return firstTwoColumnData;
	const columnHeaders = Object.keys(sheetData[0]); // Get the headers of the first row

	// Extract data from the specified number of columns
	const extractedData = sheetData.map((row) => {
		const rowData = {};
		for (let i = 0; i < numColumns; i++) {
			rowData[columnHeaders[i]] = row[columnHeaders[i]];
		}
		return rowData;
	});

	return extractedData;
}

export { readExcelFile };
