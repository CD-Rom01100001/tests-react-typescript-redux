import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);