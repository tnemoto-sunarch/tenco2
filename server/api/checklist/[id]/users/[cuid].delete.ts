import sqlite3 from 'sqlite3'

export default defineEventHandler((event) => {
  const db = new sqlite3.Database('database/tenco2.db')
  const cid = event.context.params?.id
  const cuid = event.context.params?.cuid

  console.log("delete /api/checklist/" + cid + "/users/" + cuid + " >>")

  return new Promise((resolve, reject) => {
    const params = {
      $cid: cid,
      $cuid: cuid
    }
    console.log(params)
    db.run('DELETE FROM checklist_item WHERE checklist_id = $cid and id = $cuid', params, (error) => {
      if(error){
        console.log('error:')
        console.log(error)
      } else {

        resolve({status: 200})
      }
    })
  })
})
  