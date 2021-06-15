
/* register.js */

import { customiseNavBar, showMessage } from './browserUtility.js'

export async function setup() {
	document.querySelector('h1').innerText = 'Register a New Account'
	customiseNavBar(['register', 'login'])
	document.querySelector('form').addEventListener('submit', await register)
}

async function register() {
	event.preventDefault()
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	console.log(data)
	const url = '/v1/accounts/open'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
	const response = await fetch(url, options)
	const json = await response.json()
	console.log(json)
	showMessage('new account created')
	window.location.href = '#login'
}