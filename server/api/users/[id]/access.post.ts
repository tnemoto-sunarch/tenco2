import sqlite3 from 'sqlite3'
import fns from 'date-fns'

export default defineEventHandler(async (event) => {
  const db = new sqlite3.Database('database/tenco2.db')
  const pk = event.context.params?.id

  console.log("post /api/users/" + pk + "/access >>")

  const now = fns.format(new Date(), "yyyy-MM-dd HH:mm:ss")
  const body = await readBody(event)

  return new Promise((resolve, reject) => {
    const params = {
      $id: pk,
      $last_access_date: now,
      $update_date: now,
      $update_user_id: null,
      $update_user_name: null
    }
    console.log(params)
    db.run('UPDATE login_user SET '
      + '   last_access_date = $last_access_date'
      + ' , update_date = $update_date'
      + ' , update_user_id = $update_user_id'
      + ' , update_user_name = $update_user_name'
      + ' WHERE id = $id ', params, (error) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {

        resolve({status: 200})
      }
    })
  })
})
  