/**
 * GATE REGISTER — Google Apps Script backend
 * --------------------------------------------------
 * SETUP STEPS (do this once):
 * 1. Create a new Google Sheet (this becomes your live database).
 * 2. In the Sheet: Extensions -> Apps Script.
 * 3. Delete any default code, paste this whole file in.
 * 4. Click Deploy -> New deployment -> select type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Copy the Web App URL it gives you.
 * 6. Paste that URL in index.html at: const SHEET_URL = '...your url...'
 * That's it. Every scan will now appear as a new row in this Sheet.
 */

const SHEET_NAME = 'GateLog';

function doPost(e) {
  const sheet = getOrCreateSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),                 // Server received time
    data.dc || '',
    data.date || '',
    data.valid === true ? 'YES' : 'NO',
    data.direction || '',
    data.outwardNum || '',      // Outward number (only for OUT)
    data.employeeName || '',
    data.deviceId || '',
    data.timestamp || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Server Time', 'DC Number', 'DC Date', 'Valid?',
      'Direction', 'Outward #', 'Employee Name', 'Device ID', 'Device Timestamp'
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Optional: lets you open the web app URL in a browser to sanity-check it's alive
function doGet(e) {
  return ContentService.createTextOutput('Gate Register backend is running.');
}
