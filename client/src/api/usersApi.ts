import axios from 'axios';

const URL = '/api/users'

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

export const deleteUserById = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${URL}/${id}`)
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    throw error;
  }
}