import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../lib/db.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const db = await openDB();
      if (!db) throw new Error('Failed to open database');
      const contacts = db.prepare('SELECT * FROM contact').all();
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}