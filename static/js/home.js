/* home.js */

import { customiseNavBar, file2Base64, showMessage } from './browserUtility.js'

export async function setup() {
	console.log('HOME')
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	console.log('not admin')
	if(username === null){
		window.location.href = '#'
		customiseNavBar(['register', 'login'])
	}
	else if(username === 'admin'){
	customiseNavBar(['logout', 'add'])
	console.log('admin')
	}
	else if(username !== null) {
		window.location.href = '#'
		customiseNavBar(['home', 'logout'])
	}
}


async function getPlays(){
    const url = '/v1/plays/'
    const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')}
	}
   const response = await fetch(url, options)
   if(response.status === 404){
       window.location.href = "#" + '404'
   }
   const json = await response.json()
   return json
}

