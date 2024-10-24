import { Request, Response } from "express"
import prisma from "../models/users"
import { TasksRequest, TasksResponse } from "../models/tasks.interface"
import { ERROR_SERVER } from "../helpers/constantes";
import { getToken } from "../helpers/get.token"
import { getUserByToken } from "../helpers/get.user"
import { startOfDay, subDays } from 'date-fns';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = getToken(req);
        let user: any;

        if (!token) {
            throw new Error('Token is missing');
        }

        user = getUserByToken(token);
        const userId = user.id;

        const tasks = await prisma.tasks.findMany({
            where: {
                userId: userId,
            },
            include: {
                category: true,
            },
        });

        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER });
    }
};

export const getTasksByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = getToken(req);
        let user: any;

        if (!token) {
            throw new Error('Token is missing');
        }

        user = getUserByToken(token);
        const userId = user.id;

        const tasks = await prisma.tasks.groupBy({
            by: ['categoryId'],
            where: {
                userId: userId,
            },
            _count: {
                id: true,
            },
        });

        const categories = await prisma.categories.findMany({
            where: {
                id: {
                    in: tasks.map(task => task.categoryId),
                },
            },
        });

        const chartData = tasks.map(task => {
            const category = categories.find(cat => cat.id === task.categoryId);
            return {
                category: category ? category.name : 'Unknown', // Nome da categoria
                count: task._count.id,
            };
        });

        res.status(200).json(chartData);
    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER });
    }
};

export const getTasksByStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = getToken(req);
        let user: any;

        if (!token) {
            throw new Error('Token is missing');
        }

        user = getUserByToken(token);
        const userId = user.id;

        const tasks = await prisma.tasks.findMany({
            where: {
                userId: userId,
            },
        });

        const totalTasks = tasks.length;
        const tasksByStatus: { [key: string]: number } = {};

        tasks.forEach(task => {
            tasksByStatus[task.status] = (tasksByStatus[task.status] || 0) + 1;
        });

        const statusData = [
            {
                status: "",
                count: totalTasks,
                percentage: "100",
            },
            ...Object.entries(tasksByStatus).map(([status, count]) => {
                let modifiedStatus = status;
                if (status === 'Pendente') {
                    modifiedStatus = 'Pendentes';
                } else if (status === 'Concluída') {
                    modifiedStatus = 'Concluídas';
                } else if (status === 'Em andamento') {
                    modifiedStatus = 'em Andamento';
                }

                return {
                    status: modifiedStatus,
                    count,
                    percentage: totalTasks > 0 ? ((count / totalTasks) * 100).toFixed(2) : '0', // Calcula a porcentagem
                };
            }),
        ];

        res.status(200).json(statusData);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getRecentCompletedTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = getToken(req);
        let user: any;

        if (!token) {
            throw new Error('Token is missing');
        }

        user = getUserByToken(token);
        const userId = user.id;

        const sevenDaysAgo = subDays(new Date(), 7);

        const tasks = await prisma.tasks.findMany({
            where: {
                userId: userId,
                status: 'Concluída',
                completionDate: {
                    gte: sevenDaysAgo,
                },
            },
        });

        const formattedTasks = tasks.map(task => {
            const formattedDate = task.completionDate ? new Date(task.completionDate).toLocaleDateString('pt-BR') : 'Data não disponível';
            return {
                title: task.title,
                description: task.description,
                completionDate: formattedDate,
            };
        });

        res.status(200).json(formattedTasks);
    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER });
    }
};

export const getTasksByCreationDate = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = getToken(req);
        let user: any;

        if (!token) {
            throw new Error('Token is missing');
        }

        user = getUserByToken(token);
        const userId = user.id;

        // Obter todas as tarefas do usuário
        const tasks = await prisma.tasks.findMany({
            where: {
                userId: userId,
            },
            select: {
                creationDate: true, // Seleciona apenas a criação da data
            },
        });

        // Agrupar as tarefas pela data de criação
        const tasksByDate = tasks.reduce((acc, task) => {
            const date = new Date(task.creationDate).toLocaleDateString('pt-BR');
            if (!acc[date]) {
                acc[date] = 0; // Inicializa o contador
            }
            acc[date] += 1; // Incrementa o contador
            return acc;
        }, {} as { [key: string]: number });

        // Converter o resultado para um array
        const chartData = Object.entries(tasksByDate).map(([date, count]) => ({
            date,
            count,
        }));

        res.status(200).json(chartData);
    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER });
    }
};

export const createTask = async (req: Request<{}, {}, TasksRequest>, res: Response): Promise<void> => {
    try {
        const token = getToken(req);

        let user: any;
        if (token) {
            user = getUserByToken(token);
        } else {
            throw new Error('Token is missing');
        }

        const { title, description, status, creationDate, completionDate, categoryId } = req.body;
        const userId = user.id;

        const task = await prisma.tasks.create({
            data: {
                title,
                description,
                status,
                categoryId,
                creationDate,
                completionDate,
                userId
            }
        });

        res.status(201).json(task);
    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER });
    }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    try {
        const task = await prisma.tasks.findUnique({
            where: {
                id: Id
            }
        })

        if (!task) {
            res.status(404).json({ error: 'Tarefa não encontrado' })
            return
        }
        res.status(200).json(task)
    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER })
    }
}


export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    const { title, description, status, creationDate, completionDate, categoryId } = req.body
    try {

        const task = await prisma.tasks.update({
            where: {
                id: Id
            },
            data: {
                title,
                description,
                status,
                categoryId,
                creationDate,
                completionDate
            }
        })

        res.status(200).json(task)
    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER })
    }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    try {
        const task = await prisma.tasks.findUnique({
            where: {
                id: Id
            }
        })
        if (!task) {
            res.status(404).json({ error: ERROR_SERVER })
            return
        }

        const deleteTask = await prisma.tasks.delete({
            where: {
                id: Id
            }
        })
        res.status(200).json(deleteTask).end()

    } catch (error: any) {
        res.status(500).json({ error: ERROR_SERVER })
    }
}