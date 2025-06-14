import mongoose, { Schema, Document } from 'mongoose';

type ResultData = {
  bestResult: string[],
  lastResult: string[],
  openPreview: number[]
}
export interface IUser extends Document {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  password: string;
  resultsTrainingDataServer: ResultData;
  resultsExamDataServer: string[];
}

const UserSchema = new Schema<IUser>({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resultsTrainingDataServer: {
    bestResult: { type: [String], default: [] },
    lastResult: { type: [String], default: [] },
    openPreview: { type: [Number], default: [] },
  },
  resultsExamDataServer: {
    type: [String],
    default: [],
  }
});

export default mongoose.model<IUser>('User', UserSchema);