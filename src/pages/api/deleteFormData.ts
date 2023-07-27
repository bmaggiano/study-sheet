import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
const PASSWORD = process.env.PASSWORD; // Replace this with your actual password or store it securely in environment variables

// our function to delete an item based on the id provided from client
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id, password } = req.body;

    if (password !== PASSWORD) {
      // Password is incorrect, return an error response
      return res.status(401).json({ error: 'Incorrect password' });
    }

    try {
      // Use Prisma to delete the data with the matching id from the "notes" collection
      const deletedNote = await prisma.notes.delete({
        where: {
          id: id, // Use the provided id to identify the document to delete
        },
      });

      res.status(200).json(deletedNote);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
