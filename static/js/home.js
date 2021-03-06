/* home.js */

import { customiseNavBar, file2Base64, showMessage } from './browserUtility.js'

export async function setup() {
	const hbs = await (await fetch('./handlebars/home.hbs')).text()
	const playsData = await getPlays()
// 	console.log(playsData)
// 	console.log('HOME')
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
	console.log(playsData.data, playsData.data.length)
	for (let i =0 ; i<playsData.data.length; i++){
		console.log(playsData.data[i])
		let playStartDate = new Date(playsData.data[i].play_time_start)
		let playEndDate = new Date(playsData.data[i].play_time_end)
		playsData.data[i].play_time_start = playStartDate.toLocaleDateString();
		playsData.data[i].play_time_end = playEndDate.toLocaleDateString();
		let timeDifference = playEndDate.getTime() - playStartDate.getTime()
		playsData.data[i].play_days_running = timeDifference / (1000*3600*24)
	}
	

	const template = Handlebars.compile(hbs)
    const html = template(playsData)
    document.querySelector('main').innerHTML = html
	
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

