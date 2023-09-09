import { User } from "@prisma/client";

declare namespace Express {
  export interface Request {
    user: User;
  }
  export interface Response {
    user: User;
  }
}
