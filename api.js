
/* api.js */

import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
import { extractCredentials, saveFile } from './modules/util.js'
import { login, register } from './modules/accounts.js'
import { db } from './modules/db.js'
import { getIndividualPlay } from './modules/plays.js'


const router = new Router()

// the routes defined here
router.get('/', async context => {
	const data = await Deno.readTextFile('static/index.html')
	context.response.body = data
})

router.get('/v1/accounts', async context => {
	console.log('GET /accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
        context.cookies.set('Authorization', token)
        console.log(context.cookies)
		context.response.body = JSON.stringify({ status: 'success', data: { username } }, null, 2)
	} catch(err) {
        console.log(err)
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'unauthorised', msg: err.msg })
	}
})

router.post('/v1/accounts/open', async context => {
	console.log('POST /accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})


router.get('/v1/plays', async context => {
	console.log('GET /v/1/plays')
	const sql_statement = `SELECT * from play_info`
	//https://stackoverflow.com/questions/63611529/why-is-mysql-retrieving-a-date-data-type-with-timezone-conversion-added
	// tldr: The sql module used in this project converts to data inserted to UTC so this is why when we retrieve it we see the minutes,seconds appended to it. bummmer...
	// solution: manipulate it on the client side. Create new Date object out of it and use its methods such as .getMonth, getFullYear.
	const records = await db.query(sql_statement)
	console.log(records)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'plays retrieved', data:records })
})

router.get("/v1/plays/:id", async context => {
    let records = await getIndividualPlay(context.params.id)
    let desc = {
      "content":'data of a single play',
      "_links":{
        "self":{
          "href":"http://localhost:8080/v1/plays/:id"
        }
      }
	}
	
    if (records === undefined){
        context.response.status = 404
        context.response.body = JSON.stringify({ status: 'failed', msg: 'Play not found'})
    }
    else{
        console.log(records)
        context.response.status = 201
        context.response.body = JSON.stringify({ status: 'success', body : records, msg: 'Play retrieved'})
    }
  
  });


router.post('/v1/files', async context => {
	console.log('POST /files')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		const body  = await context.request.body()
		const data = await body.value
// 		console.log(data)
		const filename = saveFile(data.base64, data.user)
		const sql_statement = `INSERT INTO play(user_name) VALUES ("${data.user}");`
 		const record = await db.query(sql_statement)
		const sql_primary_key = `SELECT play_id FROM play ORDER BY play_id DESC LIMIT 1;`
 		const record2 = await db.query(sql_primary_key)
		const most_recent_playid = JSON.stringify(record2).slice(12,14)
		const sql_statement2 = `INSERT INTO play_info(play_id, play_title, play_text, file_name, play_time_start, play_time_end) VALUES ("${most_recent_playid}", "${data.title}", "${data.textBody}", "${filename}", "${data.startD}", "${data.endD}")`
		const record3 = await db.query(sql_statement2)
		context.response.status = 201
		context.response.body = JSON.stringify({ status: 'success', msg: 'file uploaded' })
	} catch(err) {
		console.log(err)
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'unauthorised', msg: err.msg })
	}
})

router.get("/(.*)", async context => {      
	const data = await Deno.readTextFile('static/404.html')
	context.response.body = data
})

export default router
