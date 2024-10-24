import express from 'express'
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask, getTasksByCategory, getTasksByStatus, getRecentCompletedTasks, getTasksByCreationDate } from '../controller/tasksController';
import { authenticateToken } from '../middlewares/auth.handler';

const router = express.Router()

router.get('/tasks', authenticateToken, getAllTasks)
router.get('/tasksByCategory', authenticateToken, getTasksByCategory)
router.get('/tasksByStatus', authenticateToken, getTasksByStatus)
router.get('/tasksByCreationDate', authenticateToken, getTasksByCreationDate)
router.get('/recentCompletedTasks', authenticateToken, getRecentCompletedTasks)
router.get('/tasks/:id', authenticateToken, getTaskById)
router.post('/tasks', authenticateToken, createTask)
router.put('/tasks/:id', authenticateToken, updateTask)
router.delete('/tasks/:id', authenticateToken, deleteTask)

export default router;