import { NextApiRequest, NextApiResponse } from "next";
import { UserRequest, UserResponse } from "../../../store/api/user";
import createEmpty from "../../../types/empty";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { project_id } = req.query;
  if (req.method === "GET") {
    try {
      const data = fs.readFileSync(`pages/api/data/${project_id}.json`, "utf8");
      res.status(201).json(JSON.parse(data));
    } catch {
      res.status(404).json({ message: "존재하지 않는 id입니다" });
    }
  } else if (req.method === "POST") {
    const { writer, project_name, pages } = req.body;
    fs.writeFileSync(
      `pages/api/data/${project_id}.json`,
      JSON.stringify({ writer, project_name, pages }),
      "utf8",
    );
    res.status(201).json({
      success: true,
    });
  } else {
    res.status(405).json({ message: "GET이나 POST로 요청해야 합니다" });
  }
}
