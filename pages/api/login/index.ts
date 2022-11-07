import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.status(201).json({ username: "a", id: "asd" });
  } else {
    res.status(200).json({ message: "Works" });
  }
}
