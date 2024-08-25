import sqlite3 from 'sqlite3'
import fns from 'date-fns'

export default defineEventHandler(async (event) => {
  const db = new sqlite3.Database('database/tenco2.db')
  const pk = event.context.params?.id

  console.log("post /api/checklist/" + pk + "/complate >>")

  const now = fns.format(new Date(), "yyyy-MM-dd HH:mm:ss")
  const body = await readBody(event)

  return new Promise((resolve, reject) => {
    const params = {
      $id: pk,
      $status: '2',
      $close_date: now,
      $update_date: now,
      $update_user_id: body.request.authId,
      $update_user_name: body.request.authName
    }
    console.log(params)
    db.run('UPDATE checklist SET '
      + '   status = $status'
      + ' , close_date = $close_date'
      + ' , update_date = $update_date'
      + ' , update_user_id = $update_user_id'
      + ' , update_user_name = $update_user_name'
      + ' WHERE id = $id and status = "1" ', params, (error) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {

        resolve({status: 200})
      }
    })
  })
})
  