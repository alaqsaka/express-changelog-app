import { Router, Request, Response } from "express";
import { body, oneOf, validationResult } from "express-validator";
import prisma from "./db";
import { User } from "@prisma/client";
import { handleInputErrors } from "./modules/middleware";
import { createProduct, getOneProduct, getProducts } from "./handlers/product";
import { createUpdate } from "./handlers/update";
const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
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
  createProduct
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
 createUpdate
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
