(() => {
	const GOOGLE_SHEET_WEBHOOK = ''

	const getOfferData = () => {
		const jobTitle = document.querySelectorAll('h1')[0].textContent
		const companyName = document.querySelectorAll('h1')[0].parentElement.children[1].querySelector('h2').textContent
		const offerLink = location.href
		const salary = document.querySelectorAll('h1')[0].parentElement.children[2].children[0].querySelectorAll('span')[0].textContent
		const applicationDate = new Date().toLocaleDateString('en-GB')
		const status = 'BRAK'

		return {
			jobTitle,
			companyName,
			offerLink,
			salary,
			applicationDate,
			status
		}
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

	const addToSheet = async () => {
		const payload = getOfferData()

		await saveToSheet(payload)
	}

	addToSheet()
})()
