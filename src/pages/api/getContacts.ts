import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../lib/db.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const db = openDB();
    const contacts = db.prepare('SELECT * FROM contact').all();
    res.status(200).json(contacts);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}