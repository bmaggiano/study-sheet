import { PrismaClient, Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
const PASSWORD = process.env.PASSWORD;

// function to create a new term
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { term, description, category, password } = req.body;

    if (password !== PASSWORD) {
      // Password is incorrect, return an error response
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Read existing data from the file (if any)
    let existingData = [];
    try {
      await prisma.notes.create({
        data: {
          term,
          description,
          category,
        }
      })
    } catch (err) {
      // If the file does not exist or there's an error reading it, ignore and continue with an empty array
      res.status(200).json([]);

    }

    // Append the new data as an object
    const newData = {
      term,
      description,
      category,
    };
    existingData.push(newData);

    // Write the updated array back to the file with indentation (2 spaces in this case)
    res.status(200).json({ message: "Form data saved successfully" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
