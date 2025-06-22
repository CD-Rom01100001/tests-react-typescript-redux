import axios from 'axios';

export const updateTrainingResults = async (
  userId: string,
  trainingData: {
    bestResult?: string[];
    lastResult?: string[];
    openPreview?: number[];
  },
  token?: string
) => {
  const res = await axios.patch(
    `http://localhost:5000/api/users/${userId}/results/training`,
    { resultsTrainingData: trainingData },
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      }
    }
  );

  return res.data;
};

export const updateExamResults = async (
  userId: string,
  examData: string[],
  token?: string
) => {
  const res = await axios.patch(
    `http://localhost:5000/api/users/${userId}/results/exam`,
    { resultsExamData: examData },
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      }
    }
  );
  return res.data;
};

