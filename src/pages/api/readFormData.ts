import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// function to fetch our form data from our database and return it to client
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const notes = await prisma.notes.findMany();

      // Respond with the formData array
      res.status(200).json(notes);
    } catch (err) {
      // If there's an error reading data or the query fails, respond with an empty array
      res.status(200).json([]);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
