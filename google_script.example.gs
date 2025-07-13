const SHEET_ID = ''
const START_ROW = 3
const START_COL = 2

function doPost(e) {
	const {
		jobTitle = '',
		companyName = '',
		offerLink = '',
		salary = '',
		applicationDate = '',
		status = ''
	} = JSON.parse(e.postData.contents || '{}')

	const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Arkusz1')
	const nextRow = Math.max(sheet.getLastRow() + 1, START_ROW)
	const rowValues = [jobTitle, companyName, offerLink, salary, applicationDate, status]

	sheet.getRange(nextRow, START_COL, 1, rowValues.length).setValues([rowValues])
}
