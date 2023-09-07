import prisma from "../db";
import { Request, Response } from "express";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(500).json({
        message: "Username and password is required",
      });
    }

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);

    return res.json({
      message: "User created successfully",
      user: {
        username: user.username,
        createdAt: user.createdAt,
      },
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

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }

    const token = createJWT(user);

    return res.json({
      user: {
        username: user.username,
        createdAt: user.createdAt,
      },
      token: token,
    });
  } catch (error) {
    console.error("Error signin user ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
