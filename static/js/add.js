
/* addNews.js */

import { customiseNavBar, file2Base64, showMessage } from './browserUtility.js'

let converter 
export async function setup() {
	console.log('FOO')
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username !== 'admin') window.location.href = '#login'
	const nav = ['home','logout']
	customiseNavBar(nav)
//     converter = new showdown.Converter({'tables': true, 'tasklists': true, 'strikethrough': true})
// 	document.querySelector('textarea').addEventListener('input', await markdownGenerator)
    document.querySelector('form').addEventListener('submit', await uploadData)
    
}
                                                                                                                
                                                        
async function markdownGenerator(){
    setTimeout( function () { 
        const markdown = document.querySelector('textarea').value
        const html = converter.makeHtml(markdown)
        document.querySelector('article').innerHTML = html
    }, 2500);
}                                              
      

async function uploadData(event) {
	event.preventDefault()
    let allowedExtensions = ['png','jpg','jpeg','bmp']
    try{
    const title = document.querySelector('input[name="title"]').value
    const textBody = document.querySelector('textarea[name="content"]').value
	const data = document.querySelector('input[name="file"]').files[0]
	const startd = document.querySelector('input[name="startd"]').value
	const endd = document.querySelector('input[name="endd"]').value
    const extension = data.name.split('.').pop()
	const startDate = startd.split('-');
	const endDate = endd.split('-');
	const startDateYear = parseInt(startDate[0]);
	const endDateYear = parseInt(endDate[0])
	const startDateMonth = parseInt(startDate[1]);
	const endDateMonth = parseInt(endDate[1])
	const startDateDay = parseInt(startDate[2]);
	const endDateDay = parseInt(endDate[2])
	if (endDateYear <= startDateYear) {
		if(endDateMonth <= startDateMonth) {
			if(endDateDay < startDateDay) {
				console.log('stop the exec')
				showMessage('Invalid Date! ')
				return
			}
		}
	}

	
    data.time = new Date()
    data.desc = 'Submit theatre play POST request'
	data.base64 = await file2Base64(data)
	data.user = localStorage.getItem('username')
    data.title = title
	data.textBody = textBody
	data.startD = startDate
	data.endD = endDate
	console.log(data)
	const url = '/v1/files'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(data)
	}
	const response = await fetch(url, options)
	if (response.status === 201){
		window.location.href = '#home'
	}
    console.log(response)
	const json = await response.json()
    }catch(e){
        showMessage(e.message)
    }
}


document.addEventListener('DOMContentLoaded', async() => {
	console.log("Add news page here!!")
})
