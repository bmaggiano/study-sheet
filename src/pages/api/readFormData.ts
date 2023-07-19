// pages/api/readFormData.js

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Read the file contents (formData.json) synchronously
      const data = fs.readFileSync("formData.json", "utf8");
      const formData = JSON.parse(data);

      // Respond with the formData array
      res.status(200).json(formData);
    } catch (err) {
      // If the file does not exist or there's an error reading it, respond with an empty array
      res.status(200).json([]);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
