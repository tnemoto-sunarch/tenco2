import sqlite3 from 'sqlite3'

export default defineEventHandler((event) => {
  console.log("get /api/users/list >>")

  const db = new sqlite3.Database('database/tenco2.db')

  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM login_user ORDER BY create_date', (error, rows) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {
        resolve(rows)
      }
    })
  })
})
  