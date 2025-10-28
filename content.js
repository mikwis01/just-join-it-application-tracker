;(() => {
	const URL_PREFIX = 'https://justjoin.it/job-offer/'
	const GOOGLE_SHEET_WEBHOOK = ''

	if (!location.href.startsWith(URL_PREFIX)) {
		alert('To nie jest strona oferty Just Join IT.\nWejdź na: https://justjoin.it/job-offer/... i kliknij ikonę rozszerzenia ponownie.')
		return
	}

	const getOfferData = () => {
		const jobTitle = document.querySelectorAll('h1')[0]?.textContent ?? 'Brak tytułu ogłoszenia'
		const companyName =
			document.querySelectorAll('h1')[0]?.parentElement?.parentElement?.children?.[2]?.querySelector('a')?.textContent ??
			'Brak informacji o firmie'
		const offerLink = location.href
		const rawSalary = document.querySelectorAll('[name*="offer-apply_favorite-button"]')[
			document.querySelectorAll('[name*="offer-apply_favorite-button"]').length - 1
		]?.parentElement?.parentElement?.children?.[1]?.children?.[0]?.textContent

		const salary = rawSalary
			.split(' ')
			.map((item) => Number.isInteger(Number(item)))
			.includes(true)
			? rawSalary
			: 'Brak informacji'

		const applicationDate = new Date().toLocaleDateString('en-GB')
		const status = 'BRAK'

		return { jobTitle, companyName, offerLink, salary, applicationDate, status }
	}

	const saveToSheet = async (payload) => {
		try {
			await fetch(GOOGLE_SHEET_WEBHOOK, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				mode: 'no-cors',
				body: JSON.stringify(payload)
			})
			alert('Dodano do arkusza')
		} catch (error) {
			alert('Ups! Coś poszło nie tak podczas dodawania ...')
		}
	}

	;(async () => {
		const payload = getOfferData()
		await saveToSheet(payload)
	})()
})()
