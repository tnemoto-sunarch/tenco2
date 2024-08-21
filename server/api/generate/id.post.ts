import crypto from 'crypto'
import fns from 'date-fns'

export default defineEventHandler(async (event) => {
  console.log("get /api/checklist/add >>")
  const body = await readBody(event)
  console.log(body)

  const N = body.data.n
  const id = crypto
      .randomBytes(N)
      .toString('base64')
      .substring(0, N)

  const now = fns.format(new Date(), "yyyy-MM-dd HH:mm:ss")

  return {
    id: id,
    pdate: now
  }
})
  