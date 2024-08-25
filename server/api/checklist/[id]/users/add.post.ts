import sqlite3 from 'sqlite3'
import fns from 'date-fns'

export default defineEventHandler(async (event) => {
  const db = new sqlite3.Database('database/tenco2.db')
  const cid = event.context.params?.id

  console.log("post /api/checklist/" + cid + "/users/add >>")

  const body = await readBody(event)
  console.log(body)

  const now = fns.format(new Date(), "yyyy-MM-dd HH:mm:ss")

  return new Promise((resolve, reject) => {
    const params = {
      $id: null, //AUTOINCREMENT
      $checklist_id: cid,
      $name: body.data.name,
      $status: body.data.status,
      $check_date: null,
      $order_num: body.data.order_num,
      $create_date: now,
      $create_user_id: body.request.authId,
      $create_user_name: body.request.authName,
      $update_date: now,
      $update_user_id: body.request.authId,
      $update_user_name: body.request.authName
     }
    console.log(params)
    db.run('INSERT INTO checklist_user VALUES ('
      + '$id,'
      + '$checklist_id,'
      + '$name,'
      + '$status,'
      + "$check_date,"
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
  