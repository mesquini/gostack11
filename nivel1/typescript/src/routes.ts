import { Request, Response } from "express";

import CreateUser from "./services/CreateUser";

export function helloWorld(req: Request, res: Response) {
  const user = CreateUser({
    name: "Mesquini",
    email: "mesuqini@live.com",
    password: "1234",
    techs: ["Nodejs", { title: "Nodejs", exp: 2 }],
  });

  return res.json({ message: "hello wordl" });
}
