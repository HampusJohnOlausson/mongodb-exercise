import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({

    post: {
        type: String, 
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }
    
}, { timestamps: {createdAt: 'createdAt', updatedAt: 'updated_at'}});

const Post = mongoose.model('Post', postSchema);

export default Post;