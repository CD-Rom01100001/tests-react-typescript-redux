import axios from 'axios';

const URL = 'http://localhost:5000/api/users'

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  role?: 'user' | 'moderator' | 'admin';
  resultsTrainingData: {
    bestResult: string[];
    lastResult: string[];
    openPreview: number[];
  };
  resultsExamData: string[];
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(URL)
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Ошибка получения пользователей:", error);
    throw error;
  }
}