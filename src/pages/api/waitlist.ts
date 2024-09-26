import type { NextApiRequest, NextApiResponse } from 'next'
import { openDB } from '../../lib/db.js'

type WaitlistData = {
  email: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email }: WaitlistData = req.body
    try {
      const db = await openDB()
      if (!db) throw new Error('Failed to open database');
      const stmt = db.prepare('INSERT INTO waitlist (email) VALUES (?)')
      stmt.run(email)
      res.status(200).json({ message: 'Thank you for joining our waitlist!' })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ message: 'An error occurred while processing your request.' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}