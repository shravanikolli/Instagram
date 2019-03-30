const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserComment = new Schema({
        user:{
            type:Schema.Types.ObjectId,
            ref:'users'
        },
        body:{
            type : String,
            required : false
        },
        name:{
            type : String
        },
        avatar : {
            type: String
        },
        date:{
            type: Date,
            required: true,
            default: Date.now
        }
});

const mediaContent = new Schema({
    url:{
        type: [String],
        required: true       
    },
    
});
//Instantiate Schema Object 
const UserPostsSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    // likes:{
    //     type: Number,
    //     required: false
    // },
    likes: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            } 
        }
    ],
    tagPeople:{
        type: [String],
        required: false
    },
    bookMark:{ 
        type: Boolean,
        default: false
    },
    media: mediaContent,
    comments:[UserComment],
    location :{
        type: String,
        required : false
    },
    description:{
        type: String,
        required : false
    },
    dateOfPost:{
        type: Date,
        default: Date.now,
        required: true
    },
    durationOfPost:{
        type: Number,
        default: 1,
        required: false
    },
    commentFlag : {
        type: Boolean,
        default: false
    }
});

module.exports = UserPosts = mongoose.model('posts',UserPostsSchema);
