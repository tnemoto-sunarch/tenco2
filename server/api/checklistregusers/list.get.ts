import sqlite3 from 'sqlite3'

export default defineEventHandler((event) => {
  const db = new sqlite3.Database('database/tenco2.db')

  console.log("list >>")

  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM checklist_reg_item ORDER BY order_num', (error, rows) => {
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
  