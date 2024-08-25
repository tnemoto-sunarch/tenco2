import sqlite3 from 'sqlite3'
import fns from 'date-fns'

export default defineEventHandler(async (event) => {
  const db = new sqlite3.Database('database/tenco2.db')
  const pk = event.context.params?.id

  console.log("post /api/checklist/" + pk + "/init >>")

  const now = fns.format(new Date(), "yyyy-MM-dd HH:mm:ss")
  const body = await readBody(event)

  const q1 = new Promise((resolve, reject) => {
    const params = {
      $id: pk,
      $status: '0',
      $open_count: 0,
      $open_date: null,
      $close_date: null,
      $update_date: now,
      $update_user_id: body.request.authId,
      $update_user_name: body.request.authName
    }
    console.log(params)
    db.run('UPDATE checklist SET '
      + '   status = $status'
      + ' , open_count = $open_count'
      + ' , open_date = $open_date'
      + ' , close_date = $close_date'
      + ' , update_date = $update_date'
      + ' , update_user_id = $update_user_id'
      + ' , update_user_name = $update_user_name'
      + ' WHERE id = $id ', params, (error) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {

        resolve({status: 200})
      }
    })
  })
  const q2 = new Promise((resolve, reject) => {
    const params = {
      $checklist_id: pk,
      $status: '0',
      $check_date: null,
      $update_date: now,
      $update_user_id: body.request.authId,
      $update_user_name: body.request.authName
    }
    console.log(params)
    db.run('UPDATE checklist_user SET '
      + '   status = $status'
      + ' , check_date = $check_date'
      + ' , update_date = $update_date'
      + ' , update_user_id = $update_user_id'
      + ' , update_user_name = $update_user_name'
      + ' WHERE checklist_id = $checklist_id ', params, (error) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {

        resolve({status: 200})
      }
    })
  })
  return Promise.all([q1, q2]).then(([res1, res2]) => {
    return {status: 200}
  })
})
  