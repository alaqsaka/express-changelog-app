import { Router, Request, Response } from "express";
import { body, oneOf, validationResult } from "express-validator";
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
  handleInputErrors,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
  }
);
router.delete("/product/:id", () => {});

/**
 * Update
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title"),
  body("body"),
  body("version").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  () => {}
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("version").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  () => {}
);
router.delete("/update/:id", () => {});

/**
 * Update Point
 */
router.get("/updatepoint", () => {});
router.get(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.put("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
