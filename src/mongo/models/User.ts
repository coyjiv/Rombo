import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  email: string;
  fullName: string;
  password: string;
  senderId: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email'],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email'],
  },
  fullName: {
    type: String,
    required: [true, 'Please enter a full name'],
    minLength: [3, 'Name must be at least 3 characters long'],
    maxLength: [32, 'Name cannot be more than 32 characters long'],
  }, 
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minLength: [6, 'Password must be at least 6 characters long'],
    select: false,
  },
});

// Instead of:
// const User = mongoose.model<IUser>('User', userSchema);

// Use:
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
