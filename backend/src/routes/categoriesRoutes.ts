import express from 'express'
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controller/categoriesController'

const router = express.Router()

router.get('/categories', getAllCategories)
router.get('/categories/:id', getCategoryById)
router.post('/categories', createCategory)
router.put('/categories/:id', updateCategory)
router.delete('/categories/:id', deleteCategory)

export default router;