import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mapUserToResponse } from "../utils/mapUserToResponse";

const JWT_SECRET = process.env.JWT_SECRET || "secret";


// Types
type ResultsTrainingDataUpdate = Partial<{
  bestResult: string[];
  lastResult: string[];
  openPreview: number[];
}>;

interface UpdateUserResultsBody {
  resultsTrainingData?: ResultsTrainingDataUpdate;
  resultsExamData?: string[];
}

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
      role: 'user',
      resultsTrainingData: {
        bestResult: [],
        lastResult: [],
        openPreview: [1]// что-бы первый этап был всегда доступен
      },
      resultsExamData: []
    });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ 
      message: "Пользователь зарегистрирован",
      token,
      user: mapUserToResponse(user)
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

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Вход выполнен",
      token,
      user: mapUserToResponse(user)
    });
  } catch (err) {
    res.status(500).json({ error: "Ошибка входа", details: err });
  }
};

// получим зареганых пользователей 
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

// обновление результатов Обучения
export const updateUserTrainingResults = async (
  req: Request<{ id: string }, object, { resultsTrainingData?: ResultsTrainingDataUpdate }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { resultsTrainingData } = req.body;

  try {

    if (!resultsTrainingData) {
      res.status(400).json({ message: "Нет данных для обновления training результатов" });
      return;
    }

    const updateFields: Record<string, string[] | number[]> = {};

    for (const key in resultsTrainingData) {
      const value = resultsTrainingData[key as keyof ResultsTrainingDataUpdate];
      if (value !== undefined) {
        updateFields[`resultsTrainingData.${key}`] = value;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }

    res.json({
      message: 'Результаты обучения обновлены',
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Ошибка обновления результатов обучения',
      error: err,
    });
  }
};

// обновление результатов Экзаменов
export const updateUserExamResults = async (
  req: Request<{ id: string }, object, { resultsExamData?: string[] }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { resultsExamData } = req.body;

  try {

    if (!resultsExamData) {
      res.status(400).json({ message: "Нет данных для обновления exam результатов экзаменов" });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { resultsExamData } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }

    res.json({
      message: "Результаты экзаменов обновлены",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Ошибка обновления результатов",
      error: err,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: "Пользователь удалён" });
};
