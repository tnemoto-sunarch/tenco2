import sqlite3 from 'sqlite3'

export default defineEventHandler((event) => {
  const db = new sqlite3.Database('database/tenco2.db')
  const pk = event.context.params?.id

  console.log("get /api/users/" + pk + " >>")

  return new Promise((resolve, reject) => {
    const params = {$id: pk}
    console.log(params)
    db.get('SELECT * FROM login_user WHERE id = $id', params, (error, rows) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {
        console.log(rows)
        resolve(rows)
      }
    })
  })
})
  