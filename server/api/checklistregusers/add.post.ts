import sqlite3 from 'sqlite3'
import crypto from 'crypto'
import fns from 'date-fns'

export default defineEventHandler(async (event) => {
  console.log("post /api/checklistregusers/add >>")
  const db = new sqlite3.Database('database/tenco2.db')

  const N = 12
  const id = crypto
      .randomBytes(N)
      .toString('base64')
      .substring(0, N)

  const body = await readBody(event)
  console.log(body)

  const now = fns.format(new Date(), "yyyy-MM-dd HH:mm:ss")

  return new Promise((resolve, reject) => {
    const params = {
      $id: id,
      $name: body.data.name,
      $status: body.data.status,
      $order_num: body.data.order_num,
      $create_date: now,
      $create_user_id: body.request.authId,
      $create_user_name: body.request.authName,
      $update_date: now,
      $update_user_id: body.request.authId,
      $update_user_name: body.request.authName
    }
    console.log(params)
    db.run('INSERT INTO checklist_reg_item VALUES ('
      + '$id,'
      + '$name,'
      + '$status,'
      + '$order_num,'
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
  