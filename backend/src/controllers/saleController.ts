import { Request, Response } from "express";
import Sale  from "../models/Sale";

export const createSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const sale = await Sale.create(req.body);
        res.status(201).json(sale);
    } catch (error) {
        res.status(500).json({ error: "Error creating sale" });
    }
};

export const getSales = async (req: Request, res: Response): Promise<void> => {
    try {
        const sales = await Sale.findAll();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: "Error fetching sales" });
    }
};

export const getSaleById = async (req: Request, res: Response): Promise<void> => {
    try {
        const saleId = Number(req.params.id);
        if (isNaN(saleId)) {
            res.status(400).json({ error: "Invalid sale ID" });
            return;
        }

        const sale = await Sale.findByPk(saleId);
        if (!sale) {
            res.status(404).json({ error: "Sale not found" });
            return;
        }
        res.json(sale);
    } catch (error) {
        res.status(500).json({ error: "Error fetching sale" });
    }
};

export const updateSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const saleId = Number(req.params.id);
        if (isNaN(saleId)) {
            res.status(400).json({ error: "Invalid sale ID" });
            return;
        }

        const sale = await Sale.findByPk(saleId);
        if (!sale) {
            res.status(404).json({ error: "Sale not found" });
            return;
        }

        await sale.update(req.body);
        res.json(sale);
    } catch (error) {
        res.status(500).json({ error: "Error updating sale" });
    }
};

export const deleteSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const saleId = Number(req.params.id);
        if (isNaN(saleId)) {
            res.status(400).json({ error: "Invalid sale ID" });
            return;
        }

        const sale = await Sale.findByPk(saleId);
        if (!sale) {
            res.status(404).json({ error: "Sale not found" });
            return;
        }

        await sale.destroy();
        res.json({ message: "Sale deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting sale" });
    }
};
