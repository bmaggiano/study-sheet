// pages/api/updateFormData.js

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const PASSWORD = "test"; // Replace this with your actual password or store it securely in environment variables

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { term } = req.query; // Get the term from the URL parameters
    const { term: newTerm, description, category, password } = req.body;

    if (password !== PASSWORD) {
      // Password is incorrect, return an error response
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Read existing data from the file (if any)
    let existingData = [];
    try {
      const data = fs.readFileSync("formData.json", "utf8");
      existingData = JSON.parse(data);
    } catch (err) {
      // If the file does not exist or there's an error reading it, ignore and continue with an empty array
    }

    // Find the item to update based on the provided term
    const itemToUpdateIndex = existingData.findIndex((item: { term: string | string[] | undefined; }) => item.term === term);
    if (itemToUpdateIndex === -1) {
      // Item with the provided term not found
      return res.status(404).json({ error: "Item not found" });
    }

    // Update the item with the new values
    existingData[itemToUpdateIndex] = {
      term: newTerm,
      description,
      category,
      timestamp: existingData[itemToUpdateIndex].timestamp, // Preserve the existing timestamp
    };

    // Write the updated array back to the file with indentation (2 spaces in this case)
    fs.writeFileSync("formData.json", JSON.stringify(existingData, null, 2), "utf8");

    res.status(200).json({ message: "Form data updated successfully" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
