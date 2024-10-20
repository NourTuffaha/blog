import { Schema, model, Document } from 'mongoose';
import { IUser } from './User';
import { IComment } from './Comment';

export interface IPost extends Document {
    title: string;
    content: string;
    userId: IUser; 
    reactions: { [key: string]: number };
    comments: IComment[];
}

const PostSchema = new Schema<IPost>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
   reactions: {
    like: { type: Number, default: 0 },
    love: { type: Number, default: 0 },
    angry: { type: Number, default: 0 },
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

}, { timestamps: true });

const Post = model<IPost>('Post', PostSchema);
export default Post;
