import { Request } from "express";
import { User } from "./src/db/types/user.type";
import { Admin } from "./src/db/types/admin.type";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      admin?: Admin;
    }
  }
}