# Just Join IT → Google Sheets

### Chrome Extension / Job Application Tracker

![Sheet preview](https://i.imgur.com/gaWKuYm.png)

> **TL;DR**  
> Open a job offer on _justjoin.it_, click the extension icon, and key information (position, company, link, salary, application date, status) will be automatically saved to your Google Sheet.

---

## Table of Contents

1. [Why?](#why)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Quick Start](#quick-start)
5. [Google Sheets Setup](#google-sheets-setup)
6. [Extension Setup](#extension-setup)
7. [Project Structure](#project-structure)
8. [Customization and Development](#customization-and-development)
9. [License](#license)

---

## Why?

> Manually copying job offer details into a spreadsheet is boring, slow, and error-prone.  
> This extension automates the process so you can focus on analyzing jobs—not copying data.

## Features

-   ✂️ **One-click copy** – grabs _job title_, _company name_, _link_, _salary_,  
    and adds _application date_ and a default _status_ ("BRAK").
-   📄 **Google Script Webhook** – data goes directly into your spreadsheet.
-   📊 **Ready-to-use sheet layout** – data starts from row 3, columns B-G.
-   🛠️ **Easy setup** – just update:
    -   `SHEET_ID` in `google_script.gs`
    -   `GOOGLE_SHEET_WEBHOOK` in `content.js`

---

## Prerequisites

-   Google account with access to Google Sheets & Apps Script.
-   Chrome browser (or any Chromium-based browser with extension support).
-   Developer mode enabled in `chrome://extensions`.

---

## Quick Start

```bash
git clone https://github.com/your-username/justjoin-tracker.git
cd justjoin-tracker
```

1. **Create a Google Sheet** – name the first sheet `Arkusz1`.
2. **Deploy the script**
    - Open `Extensions → Apps Script` from your sheet.
    - Paste contents from `google_script.example.gs`.
    - Fill in your `SHEET_ID`.
    - **Deploy → New deployment → Web app**
        - `Execute as`: _Me_
        - `Who has access`: _Anyone_
    - Copy the **Deployment URL** – this is your `GOOGLE_SHEET_WEBHOOK`.
3. **In `content.js`**, replace `GOOGLE_SHEET_WEBHOOK = '<your-url>'`.
4. **Load the extension**
    - Go to `chrome://extensions` → _Developer mode_ → _Load unpacked_ → select the project folder.
5. **Test it**
    - Open any job post on _justjoin.it_.
    - Click the extension icon.
    - You should see an alert “Added to sheet” and a new row in your Google Sheet.

---

## Google Sheets Setup

| Column | Field             | Source in code                           |
| ------ | ----------------- | ---------------------------------------- |
| **B**  | `jobTitle`        | Job offer `<h1>`                         |
| **C**  | `companyName`     | `<h2>` below the header                  |
| **D**  | `offerLink`       | `location.href`                          |
| **E**  | `salary`          | Salary range                             |
| **F**  | `applicationDate` | `new Date().toLocaleDateString('en-GB')` |
| **G**  | `status` (“BRAK”) | Static value                             |

> **Note:** You can change `START_ROW = 3`, `START_COL = 2` if needed.

---

## Extension Setup

```js
// content.js (snippet)
const GOOGLE_SHEET_WEBHOOK = 'https://script.google.com/.../exec' // <-- paste your webhook
```

```js
// google_script.example.gs (snippet)
const SHEET_ID = '1abcDEFghiJkL...' // <-- paste your sheet ID
```

> ⚠️ **Do not commit personal data** (like webhook or sheet ID) into public repos.

---

## Project Structure

```
justjoin-tracker/
├── content.js                # Script injected into job offer tab
├── background.js             # Triggers content.js on icon click
├── manifest.json             # Extension definition (MV3)
├── google_script.example.gs  # Google Script webhook
├── icon.png                  # Toolbar icon
├── store_icon.png            # Icon for Chrome Web Store
└── README.md                 # This file
```

---

## Customization and Development

-   **Support other websites** – adjust selectors in `getOfferData()`.
-   **Add more fields** – extend the `payload` and the Google Script.
-   **Automate status** – add dropdowns or validation in the sheet.
-   **Publish to Chrome Web Store** – ensure unique name and proper metadata.

---

## License

This project is licensed under the MIT License – do whatever you want, but no warranty.  
See [`LICENSE`](LICENSE) for full details.

---

### ✨ Happy tracking!

Pull requests and feedback are always welcome.
