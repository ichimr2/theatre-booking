 /* plays.js */

 import { db } from './db.js'



// export async function addTheatrePlay(data) {
// 	const { user, filename, title, textBody } = data
//     console.log(textBody)
//     let time = new Date(data.time).toISOString().slice(0, 19).replace('T', ' ');
//     let sqlStatement = `SELECT CreatePost("${user}","${title}","${filename}","${textBody}","${time}" )`
//     console.log(sqlStatement)
//     let records = await db.query(sqlStatement)
//     return Object.values(records[0])[0]
// }




// export async function addTheatrePlay() {
// 	const { title, content, file, startd, endd } = data
// 	let sql_statement = `INSERT INTO play(user_id) VALUES (`${data.user}`)`
// 	console.log('theatreplayFunction')
// 	let record = await db.query(sql_statement)
// 	console.log(record)
// 	return record
// }

export async function getIndividualPlay(id){
    let sqlStatement = `SELECT * from play_info WHERE play_id ="${id}";`
    let records = await db.query(sqlStatement)
    return records[0]
}