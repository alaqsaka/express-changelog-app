import prisma from "../db";
import { Request, Response } from "express";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);

    res.json({
      message: "User created successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }
  } catch (error) {
    console.error("Error signin user ", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
