import sqlite3 from 'sqlite3'

export default defineEventHandler((event) => {
  const db = new sqlite3.Database('database/tenco2.db')
  const pk = event.context.params?.id

  console.log("get /api/users/" + pk + " >>")

  return new Promise((resolve, reject) => {
    const params = {
      $id: pk,
      $status: '1'
    }
    console.log(params)
    db.get('SELECT * FROM login_user WHERE id = $id and status = $status', params, (error, rows) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {
        resolve(rows)
      }
    })
  })
})
  