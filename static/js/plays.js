import { customiseNavBar, showMessage } from './browserUtility.js'

let converter 

export async function setup() {
     converter = new showdown.Converter({'tables': true, 'tasklists': true, 'strikethrough': true})
     const username = localStorage.getItem('username')
	 const hbs = await (await fetch('./handlebars/play.hbs')).text()
	 console.log(hbs)
     const [route, article_id] = location.hash.split('/')
     console.log(route,article_id)
	 const playsData = await getPlayData(article_id)
	 console.log(playsData)
     if(username === null){
     window.location.href = '#home'
    }
    else{
     customiseNavBar(['home','logout'])
    }
	let datePosted = new Date(playsData.play_added)
	let playStartDate = new Date(playsData.play_time_start)
	let playEndDate = new Date(playsData.play_time_end)
	playsData.play_time_start = playStartDate.toLocaleDateString();
	playsData.play_time_end = playEndDate.toLocaleDateString();
	playsData.play_added = datePosted.toLocaleDateString();
    playsData.play_text = converter.makeHtml(playsData.play_text)

	
	const template = Handlebars.compile(hbs)
    const html = template(playsData)
    
    document.querySelector('main').innerHTML = html
    document.querySelector('#markdown').innerHTML = playsData.play_text 

   
}

async function getPlayData(id){
    const url = '/v1/plays' + '/' + id
    const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')}
	}
   const response = await fetch(url, options)
   console.log(response)
   if(response.status === 404){
       window.location.href = "#" + '404'
   }
   const json = await response.json()
   return json.body
}

