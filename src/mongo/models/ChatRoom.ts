import mongoose, { Model, Schema } from "mongoose";
import Message, { IMessage } from "./Message";

export interface IChatRoom extends Document {
    name: string;
    users: string[];
    messages: string[];
    lastMessage: IMessage | null;
    description : string;
    poster: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const chatRoomSchema = new Schema<IChatRoom>(
    {
        name: {
            type: String,
            required: [true, 'Please enter a name'],
            select: true,
        },
        users: {
            type: [String],
            default: [],
        },
        messages: {
            type: [String],
            default: [],
        },
        lastMessage: {
            type: Message,
            default: null,
        },
        description: {
            type: String,
            default: '',
        },
        poster: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const ChatRoom: Model<IChatRoom> = mongoose.model<IChatRoom>('ChatRoom', chatRoomSchema);

export default ChatRoom;