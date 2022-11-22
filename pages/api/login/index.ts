import { NextApiRequest, NextApiResponse } from "next";
import { UserRequest, UserResponse } from "../../../store/api/user";
import createEmpty from "../../../data/createEmpty";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.status(201).json({
      id: "no_id",
      user_name: "design_defined",
      token: createEmpty.token(),
    });
  } else {
    res.status(405).json({ message: "POST로 요청해야 합니다" });
  }
}
