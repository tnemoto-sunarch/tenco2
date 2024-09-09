import sqlite3 from 'sqlite3'
import crypto from 'crypto'
import fns from 'date-fns'

export default defineEventHandler(async (event) => {
  console.log("post /api/checklist/add >>")
  const db = new sqlite3.Database('database/tenco2.db')

  const N = 12
  const id = crypto
      .randomBytes(N * 2)
      .toString('base64')
      .replace(/[\/\+\=]/g,'')
      .substring(0, N)

  const body = await readBody(event)
  console.log(body)

  const now = fns.format(new Date(), "yyyy-MM-dd HH:mm:ss")

  const plist = []

  const list = new Promise((resolve, reject) => {
    const params = {
      $id: id,
      $name: body.data.name,
      $status: body.data.status,
      $open_count: 0,
      $open_date: null,
      $close_date: null,
      $order_num: body.data.order_num,
      $create_date: now,
      $create_user_id: body.request.authId,
      $create_user_name: body.request.authName,
      $update_date: now,
      $update_user_id: body.request.authId,
      $update_user_name: body.request.authName
    }
    console.log(params)
    db.run('INSERT INTO checklist VALUES ('
      + '$id,'
      + '$name,'
      + '$status,'
      + '$open_count,'
      + '$open_date,'
      + '$close_date,'
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
  plist.push(list)

  if(body.data.all_reg_users == "1"){
    const user = new Promise((resolve, reject) => {
      const params = {
        $checklist_id: id,
        $status: "0",
        $create_date: now,
        $create_user_id: body.request.authId,
        $create_user_name: body.request.authName,
        $update_date: now,
        $update_user_id: body.request.authId,
        $update_user_name: body.request.authName
        }
      console.log(params)
      db.run('INSERT INTO checklist_item '
        + 'SELECT NULL,' //AUTOINCREMENT
        + '$checklist_id,'
        + 'name,'
        + '$status,'
        + 'NULL,'
        + 'order_num,'
        + '$create_date,'
        + '$create_user_id,'
        + '$create_user_name,'
        + '$update_date,'
        + '$update_user_id,'
        + '$update_user_name'
        + ' FROM checklist_reg_item WHERE status = "1"', params, (error) => {
        if(error){
          console.log('error:')
          console.log(error)
        } else {
          
          resolve({status: 200})
        }
      })
    })

    plist.push(user)
  }

  return Promise.all(plist).then( () => {
    return {status: 200}
  } )
})
  