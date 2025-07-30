import axiosInstance from './axiosInstance';

export const updateTrainingResults = async (
  userId: string,
  trainingData: {
    bestResult?: string[];
    lastResult?: string[];
    openPreview?: number[];
  },
  token?: string
) => {
  const res = await axiosInstance.patch(
    `/api/users/${userId}/results/training`,
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
  const res = await axiosInstance.patch(
    /* `http://localhost:5000/api/users/${userId}/results/exam` */
    `/api/users/${userId}/results/exam`,
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

