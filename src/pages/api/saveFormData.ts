// pages/api/saveFormData.js

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { term, description, category } = req.body;

    // Read existing data from the file (if any)
    let existingData = [];
    try {
      const data = fs.readFileSync("formData.json", "utf8");
      existingData = JSON.parse(data);
    } catch (err) {
      // If the file does not exist or there's an error reading it, ignore and continue with an empty array
    }

    // Append the new data as an object
    const newData = {
      term,
      description,
      category,
      timestamp: new Date().toISOString(), // Add a timestamp for reference if needed
    };
    existingData.push(newData);

    // Write the updated array back to the file
    fs.writeFileSync("formData.json", JSON.stringify(existingData), "utf8");

    res.status(200).json({ message: "Form data saved successfully" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
