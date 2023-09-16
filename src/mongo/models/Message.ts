import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
    senderId: string;
    chatRoomId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        senderId: {
            type: String,
            required: [true, 'Please enter a senderId'],
            select: true,
        },
        chatRoomId: {
            type: String,
            required: [true, 'Please enter a chatRoomId'],
            select: true,
        },
        content: {
            type: String,
            required: [true, 'Please enter a content'],
            select: true,
        },
    },
    {
        timestamps: true,
    }
);

const Message: Model<IMessage> = mongoose.model<IMessage>('Message', messageSchema);

export default Message;