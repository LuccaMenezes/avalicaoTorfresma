import { Request, Response } from "express";
import prisma from "../models/users";
import { ERROR_SERVER } from "../helpers/constantes";
import { CategoriesRequest } from "../models/categories.interface";

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await prisma.categories.findMany();
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER })
    }
}

export const createCategory = async (req: Request<{}, {}, CategoriesRequest>, res: Response): Promise<void> => {
    const { name, description } = req.body;
    try {
        const category = await prisma.categories.create(
            {
                data: {
                    name,
                    description
                }
            }
        )
        res.status(201).json(category)
    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER })
    }
}

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    try {
        const category = await prisma.categories.findUnique({
            where: {
                id: Id
            }
        })
        if (!category) {
            res.status(404).json({ error: 'Categoria não encontrada.' })
            return
        }
        res.status(200).json(category)
    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER })
    }
}


export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id);
    const { name, description } = req.body;
    try {
        const category = await prisma.categories.update({
            where: {
                id: Id
            },
            data: {
                name,
                description
            }
        })

        res.status(200).json(category)
    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER })
    }
}

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    try {
        const category = await prisma.categories.findUnique({
            where: {
                id: Id
            }
        })
        if (!category) {
            res.status(404).json({ error: ERROR_SERVER })
            return
        }

        const deleteCategory = await prisma.categories.delete({
            where: {
                id: Id
            }
        })
        res.status(200).json(deleteCategory)

    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER })
    }
}