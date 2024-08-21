import sqlite3 from 'sqlite3'
import fns from 'date-fns'

export default defineEventHandler(async (event) => {
  console.log("post /api/users/add >>")
  const db = new sqlite3.Database('database/tenco2.db')

  const body = await readBody(event)
  console.log(body)

  const now = fns.format(new Date(), "yyyy-MM-dd HH:mm:ss")

  return new Promise((resolve, reject) => {
    const params = {
      $id: body.data.id,
      $name: body.data.name,
      $type: '0',
      $status: '1',
      $last_access_date: now,
      $create_date: now,
      $create_user_id: null,
      $create_user_name: null,
      $update_date: now,
      $update_user_id: null,
      $update_user_name: null
    }
    console.log(params)
    db.run('INSERT INTO login_user VALUES ('
      + '$id,'
      + '$name,'
      + '$type,'
      + '$status,'
      + '$last_access_date,'
      + '$create_date,'
      + '$create_user_id,'
      + '$create_user_name,'
      + '$update_date,'
      + '$update_user_id,'
      + '$update_user_name'
      + ')', params, (error) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {
        
        resolve({status: 200})
      }
    })
  })
})
  