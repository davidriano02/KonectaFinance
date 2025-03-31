import express from "express";
import {
    createSale,
    getSales,
    getSaleById,
    updateSale,
    deleteSale
} from "../controllers/saleController";

const router = express.Router();


router.post("/", createSale);
router.get("/", getSales);
router.get("/:id", getSaleById);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

export default router;
