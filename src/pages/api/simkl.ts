import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = process.env.SIMKL_TOKEN
  const clientId = process.env.SIMKL_CLIENT_ID
  const userId = process.env.SIMKL_USER_ID

  const stats = await fetch(`https://api.simkl.com/users/${userId}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'simkl-api-key': clientId,
    } as any,
    method: 'POST',
  })

  const dataStats = await stats.json()

  return res.status(200).json({ stats: dataStats })
}

export default withSentry(handler)
