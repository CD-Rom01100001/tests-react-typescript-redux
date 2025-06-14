import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Registration
export const register = async (req: Request, res: Response): Promise<void> => {

  try {
    const { firstName, lastName, middleName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      firstName, 
      lastName, 
      middleName, 
      email, 
      password: hashedPassword,
      resultsTrainingDataServer: {
        bestResult: [],
        lastResult: [],
        openPreview: []
      },
      resultsExamDataServer: []
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ 
      message: "Пользователь зарегистрирован",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        email: user.email,
      }
    });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: number }).code === 11000
    ) {
      res.status(409).json({
        err: "Пользователь с таким email уже существует",
      });
      return
    }
    // console.error('Ошибка регистрации:', err);
    res.status(500).json({ err: "Ошибка регистрации", details: err });
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Неверный email или пароль" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Неверный email или пароль" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Вход выполнен",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Ошибка входа", details: err });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;
  await User.findByIdAndUpdate(id, update);
  res.json({ message: "Пользователь обновлён" });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: "Пользователь удалён" });
};
