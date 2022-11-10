import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { writer, project_name, pages } = req.body;
      const { next_id: id, all_projects: projects } = JSON.parse(
        fs.readFileSync("data/json/all.json", "utf-8"),
      );
      const data = { id, writer, project_name, pages };
      fs.writeFileSync(`data/json/${id}.json`, JSON.stringify(data));
      fs.writeFileSync(
        `data/json/all.json`,
        JSON.stringify({
          next_id: id + 1,
          all_projects: [...projects, { id, writer, project_name }],
        }),
      );
      res.status(201).json({ success: true, id });
    } catch (e) {
      res.status(404).json({ message: "프로젝트 생성 실패" });
    }
  } else {
    res.status(405).json({ message: "POST로 요청해야 합니다" });
  }
}
