import sqlite3 from 'sqlite3'
import fns from 'date-fns'

export default defineEventHandler(async (event) => {
  const db = new sqlite3.Database('database/tenco2.db')
  const cid = event.context.params?.id
  const cuid = event.context.params?.cuid

  console.log("delete /api/checklist/" + cid + "/users/" + cuid + "/check >>")

  const body = await readBody(event)
  console.log(body)

  const now = fns.format(new Date(), "yyyy-MM-dd HH:mm:ss")

  return new Promise((resolve, reject) => {
    const params = {
      $cid: cid,
      $cuid: cuid,
      $status: body.data.status,
      $check_date: body.data.status == '0' ? null : now,
      $update_date: now,
      $update_user_id: null,
      $update_user_name: null
    }
    console.log(params)
    db.run('UPDATE checklist_user SET '
      + '   status = $status'
      + ' , check_date = $check_date'
      + ' , update_date = $update_date'
      + ' , update_user_id = $update_user_id'
      + ' , update_user_name = $update_user_name'
      + ' WHERE checklist_id = $cid and id = $cuid ', params, (error) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {

        resolve({status: 200})
      }
    })
  })
})
  