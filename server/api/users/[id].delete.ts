import sqlite3 from 'sqlite3'

export default defineEventHandler((event) => {
  const db = new sqlite3.Database('database/tenco2.db')
  const pk = event.context.params?.id

  console.log("delete /api/users/" + pk + " >>")

  return new Promise((resolve, reject) => {
    const params = {$id: pk}
    console.log(params)
    db.run('DELETE FROM login_user WHERE id = $id', params, (error) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {

        resolve({status: 200})
      }
    })
  })
})
  