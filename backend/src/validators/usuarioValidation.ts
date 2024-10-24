import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { ValidationErrors } from '../helpers/validatorHelper';


export const validateUsuario = [
  body('name')
    .notEmpty().withMessage('O nome é obrigatório')
    .isLength({ max: 255 }).withMessage('O nome deve ter menos de 255 caracteres'),

  body('email')
    .isEmail().withMessage('E-mail não é válido')
    .notEmpty().withMessage('O e-mail é obrigatório'),

  body('password')
    .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
    .notEmpty().withMessage('A senha é obrigatória'),

  (req: Request, res: Response, next: NextFunction) => {
    ValidationErrors(req, res, next)
  }
];