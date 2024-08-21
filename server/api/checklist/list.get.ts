import sqlite3 from 'sqlite3'

export default defineEventHandler((event) => {
  console.log("get /api/checklist/list >>")

  const db = new sqlite3.Database('database/tenco2.db')

  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM checklist ORDER BY order_num', (error, rows) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {
        resolve(rows)
      }
    })
  })
})
  