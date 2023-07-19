// pages/api/deleteFormData.js

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const PASSWORD = process.env.PASSWORD; // Replace this with your actual password or store it securely in environment variables


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { term, password } = req.body;

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

    // Filter out the form data object with the matching term
    const updatedData = existingData.filter((data: { term: any; }) => data.term !== term);

    // Write the updated array back to the file
    fs.writeFileSync("formData.json", JSON.stringify(updatedData), "utf8");

    res.status(200).json(updatedData);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
