import { comparePasswords, hashPassword } from "../helpers/password.service";
import { generateToken } from "../helpers/auth.service";
import { Request, Response } from "express";
import prisma from "../models/users";
import { UsuarioLogin, UsuarioRequest } from "../models/users.interface";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import { getToken } from "../helpers/get.token"

import moment from "moment-timezone";

const EXPIRA = process.env.EXPIRA || '3600'
const JWT_SECRET = process.env.JWT_SECRET

export const register = async (req: Request<{}, {}, UsuarioRequest>, res: Response): Promise<void> => {
  const { name, email, password, phone } = req.body;
  try {
    const find = await prisma.users.findUnique({
      where: {
        email
      }
    })
    if (find) {
      res.status(401).json({ error: "O e-mail já existe." });
      return
    }
    const hashedPassword = await hashPassword(password);

    const usuario = await prisma.users.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
        idRole: 1,
      },
    });
    res.status(201).json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: "Houve um erro ao realizar o cadastro." });
  }
};

export const login = async (req: Request<{}, {}, UsuarioLogin>, res: Response) => {
  const { email, password } = req.body;
  try {
    const usuario = await prisma.users.findUnique({
      where: { email },
      include: { role: true }
    });
    if (!usuario) {
      return res.status(401).json({ error: "Usuário não encontrado." });
    }

    const isValid = await comparePasswords(password, usuario.password as string);
    if (!isValid) {
      return res.status(401).json({ error: "A senha está incorreta." });
    }

    const expiresIn = parseInt(EXPIRA);
    const expirationDate = moment().add(expiresIn, 'seconds').tz('America/Lima').format('DD-MM-YYYY HH:mm:ss');

    const auth = {
      token: generateToken(usuario),
      usuario: usuario,
      expiresAt: expirationDate
    }
    res.status(200).json(auth);
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
};
