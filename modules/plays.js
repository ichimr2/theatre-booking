 /* plays.js */

 import { db } from './db.js'


export async function getIndividualPlay(id){
    let sqlStatement = `SELECT * from play_info WHERE play_id ="${id}";`
    let records = await db.query(sqlStatement)
    return records[0]
}