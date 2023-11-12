export interface User {
  id?: string;
  avatar: string | null;
  chatRooms: string[];
  googleId?: string;
  phone: string;
  nickname: string;
  bio: string;
  fullName: string;
  email: String;
  date?: Date;
  friends: string[];
  senderId: string;
  potentialFriends: string[];
}
export interface ApiError {
  error: String;
}
export interface LoginValues {
  email: String;
  password: String;
}

export interface UserProfile {
  avatar?: string | null;
  phone: string;
  nickname: string;
  bio: string;
  firstName: string;
  lastName: string;
  fullName?: string;
}
