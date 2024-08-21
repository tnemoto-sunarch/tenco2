import sqlite3 from 'sqlite3'
import fns from 'date-fns'

export default defineEventHandler(async (event) => {
  const db = new sqlite3.Database('database/tenco2.db')
  const pk = event.context.params?.id

  console.log("put /api/checklistregusers/" + pk + " >>")

  const body = await readBody(event)
  console.log(body)

  const now = fns.format(new Date(), "yyyy-MM-dd HH:mm:ss")

  return new Promise((resolve, reject) => {
    const params = {
      $id: pk,
      $name: body.data.name,
      $status: body.data.status,
      $order_num: body.data.order_num,
      $update_date: now,
      $update_user_id: null,
      $update_user_name: null
    }
    console.log(params)
    db.run('UPDATE checklist_reg_user ' 
      + 'SET name = $name'
      + ' ,  status = $status'
      + ' ,  order_num = $order_num'
      + ' ,  update_date = $update_date'
      + ' ,  update_user_id = $update_user_id'
      + ' ,  update_user_name = $update_user_name'
      + ' WHERE id = $id', params, (error) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {

        resolve({status: 200})
      }
    })
  })
})
  