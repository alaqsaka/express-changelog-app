import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import prisma from "./db";
import { User } from "@prisma/client";
import { handleInputErrors } from "./modules/middleware";
const router = Router();

/**
 * Product
 */
router.get("/product", (req, res) => {
  res.json({ message: "Product" });
});
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {
    return res.status(200).json({
      message: "Success",
    });
  }
);
router.post(
  "/product",
  body("name").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      return res.json({
        errors: errors.array(),
      });
    }
  }
);
router.delete("/product/:id", () => {});

/**
 * Update
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});

/**
 * Update Point
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put("/updatepoint/:id", () => {});
router.post("/updatepoint", () => {});
router.delete("/updatepoint/:id", () => {});

export default router;
