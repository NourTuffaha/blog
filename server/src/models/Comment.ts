import { Schema, model, Document } from 'mongoose';
import { IPost } from './Post';
import { IUser } from './User';

export interface IComment extends Document {
    postId: IPost;
    userId: IUser; 
    content: string;
    reactions: { [key: string]: number };

    replies: IComment[]; 
}

const CommentSchema = new Schema<IComment>({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
reactions: {
    like: { type: Number, default: 0 },
    love: { type: Number, default: 0 },
    angry: { type: Number, default: 0 },
},

}, { timestamps: true });

const Comment = model<IComment>('Comment', CommentSchema);
export default Comment;
