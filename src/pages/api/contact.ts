import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../lib/db.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    try {
      const db = openDB();
      const stmt = db.prepare('INSERT INTO contact (name, email, message) VALUES (?, ?, ?)');
      stmt.run(name, email, message);
      res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}