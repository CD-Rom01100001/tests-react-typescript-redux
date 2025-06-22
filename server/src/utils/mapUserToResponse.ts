import { IUser } from "../models/User"

export const mapUserToResponse = (user: IUser) => ({
  id: user._id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  middleName: user.middleName,
  role: user.role,
  resultsTrainingData: user.resultsTrainingData,
  resultsExamData: user.resultsExamData,
})