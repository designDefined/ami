import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = fs.readFileSync(`pages/api/data/all.json`, "utf8");
      res.status(201).json(JSON.parse(data).all_projects);
    } catch {
      res.status(404).json({ message: "프로젝트 가져오기 실패" });
    }
  } else {
    res.status(405).json({ message: "GET으로 요청해야 합니다" });
  }
}
