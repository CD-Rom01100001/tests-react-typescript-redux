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
  role?: 'user' | 'moderator' | 'admin';
  // isAdmin?: boolean;
  resultsTrainingData: ResultData;
  resultsExamData: string[];
}

const UserSchema = new Schema<IUser>({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'moderator', 'admin'],
    default: false 
  },
  resultsTrainingData: {
    bestResult: { type: [String], default: [] },
    lastResult: { type: [String], default: [] },
    openPreview: { type: [Number], default: [] },
  },
  resultsExamData: {
    type: [String],
    default: [],
  }
});

export default mongoose.model<IUser>('User', UserSchema);