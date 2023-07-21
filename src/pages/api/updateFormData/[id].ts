// pages/api/updateFormData/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PASSWORD = process.env.PASSWORD; // Replace this with your actual password or store it securely in environment variables

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id } = req.query; // Get the id from the URL parameters
    const { term: newTerm, description, category, password } = req.body;

    if (password !== PASSWORD) {
      // Password is incorrect, return an error response
      return res.status(401).json({ error: "Incorrect password" });
    }

    try {
      // Find the item to update based on the provided id
      const existingData = await prisma.notes.findFirst({ where: { id: id as any } });

      if (!existingData) {
        // Item with the provided id not found
        return res.status(404).json({ error: "Item not found" });
      }

      // Update the item with the new values
      await prisma.notes.update({
        where: { id: id as any }, // Pass the id as a string without converting it to a number
        data: { term: newTerm, description, category },
      });

      res.status(200).json({ message: "Form data updated successfully" });
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
