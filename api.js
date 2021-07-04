
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
	 let desc = {
      "desc":"Check credentials for validation",
      "return":"status of request",
        "_links":{
        "self":{
          "href":"http://localhost:8080/v1/accounts/",
          "method":"GET"
        },
        "relative": {
                "locations":[
                     {"href": "http://localhost:8080/v1/accounts/open/",
                     "desc": "Create an account",
                     "parameters" : ["username", "password"],
                    "method": "POST"
                     }]

        }
      }
     }
	console.log('GET /accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		const username = await login(credentials)
        context.cookies.set('Authorization', token)
		context.response.body = JSON.stringify({ status: 'success', data: { username } }, null, 2)
	} catch(err) {
        console.log(err)
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'unauthorised', msg: err.msg })
	}
})

router.post('/v1/accounts/open', async context => {
	let desc =	{
      "desc":"Create an account",
      "parameters": ["username", "password"],
      "return":"status of request",
        "_links":{
        "self":{
          "href":"http://localhost:8080/v1/accounts/",
          "method":"POST"
        },
        "relative": {
                "locations":[
                     {"href": "http://localhost:8080/v1/accounts/",
                     "desc": "Check credentials for validation",
                     "parameters" : ["username", "password"],
                    "method": "GET"
                     }]
        }
      }
    }
	console.log('POST /accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})


router.get('/v1/plays', async context => {
	let desc = {
      "content":"All plays available in the database",
      "format":"An array of objects",
      "fields": {"play_id":"play id",
                 "play_title": "play title",
				 "play_time_start": "starting date of the play",
				 "days_running": "for how long is the play running"
	},
      "_links":{
        "self":{
          "href":"http://localhost:8080/v1/plays",
	  "method":"GET"
}
      },
	"relative":{
	"href":"http://localhost:8080/v1/plays/:id",
	"desc":"Retrieve an individual play"
	}
      }
	console.log('GET /v1/plays')
	const sql_statement = `SELECT * from play_info`
	const records = await db.query(sql_statement)
	console.log(records)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'plays retrieved', data:records })
})

router.get("/v1/plays/:id", async context => {
	  let desc = {
      "content":"data of a single play",
      "fields": {"play_id":"play id",
                 "play_title": "play title",
                 "post_text": "play content",
                 "play_added": "date play was created",
                 "file_name":  "name of the uploaded picture for this play",
				 "play_time_start": "starting date of the play",
				 "play_time_end": "ending date of the play"
	},
	"_links":{
        "self":{
          "href":"http://localhost:8080/v1/plays/:id",
	  "method": "GET"
        },
	"relative": {
		"href": "http://localhost:8080/v1/plays/",
		"desc": "Retrieve all plays from the database",
		"method": "GET"
		}
      }
    }
    let records = await getIndividualPlay(context.params.id)
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
