import { google } from 'googleapis'

export async function appendToSheet(values: string[][]) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY

  if (!spreadsheetId || !credentials) {
    console.warn('[GoogleSheets] Missing GOOGLE_SHEET_ID or GOOGLE_SERVICE_ACCOUNT_KEY')
    return { success: false, error: 'Google Sheets not configured' }
  }

  try {
    const parsed = JSON.parse(credentials)
    const auth = new google.auth.GoogleAuth({
      credentials: parsed,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:G', // Adjust if your sheet has a different name
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    })

    return { success: true }
  } catch (err: any) {
    console.error('[GoogleSheets] Error appending:', err)
    return { success: false, error: err?.message || 'Failed to write to sheet' }
  }
}
