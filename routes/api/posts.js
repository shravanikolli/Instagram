const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load posts models
const UserPosts = require('../../models/posts');
const User = mongoose.model('users');
const Profile = require('../../models/Profile');

//importing validation 
const validatePost = require('../../validation/posts');

//@route  GET/api/posts
//@desc   Render all user posts
//@access private

router.get('/',passport.authenticate('jwt', {session : false}),
(req, res) => {
    let errors = {};
    UserPosts.find({user : req.user.id})
    .populate('user',['username','avatar'])
    .then(userPosts => {
        if(!userPosts)
        {
            errors.noPosts = 'There is no posts for this user';
            return res.status(404).json(errors);
        }
        res.json(userPosts);
    })
    .catch(err => res.status(400).json(err));
}
);

//@route  GET/api/posts/all
//@desc   Render all user posts
//@access private

router.get('/all',passport.authenticate('jwt', {session : false}),
(req, res) => {
    let errors = {};
    
    UserPosts.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
    
    
    // UserPosts.find({user : req.user.id})
    // .populate('user',['username','avatar'])
    // .then(userPosts => {
    //     if(!userPosts)
    //     {
    //         errors.noPosts = 'There is no posts for this user';
    //         return res.status(404).json(errors);
    //     }
    //     res.json(userPosts);
    // })
    // .catch(err => res.status(400).json(err));
}
);

//@route GET/api/posts/:post_id
//desc   Render a post corresponding to given post_id
//access Private
router.get('/:post_id', passport.authenticate('jwt', {session:false}), 
(req, res) => {
    let errors = {};
    UserPosts.findById(req.params.post_id)
    .then(userPosts => {
        if(!userPosts){
            errors.noPosts = 'Post not found for this id';
            res.json(errors);
        }
        res.json(userPosts);
    })
    .catch(err => res.status(404).send('Post not found!!!'));
})

//@route  POST/api/posts
//@desc   Make a new post
//@access private
router.post('/',passport.authenticate('jwt', {session: false}),
(req,res) => {
    const { errors, isValid } = validatePost.validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const postsFields = {};
    postsFields.user = req.user.id;
    if(req.body.location) postsFields.location = req.body.location;
    if(req.body.description) postsFields.description = req.body.description;
    if(req.body.commentflag) postsFields.commentflag = req.body.commentflag;
    if(req.body.likes) postsFields.likes = req.body.likes;
    if(req.body.name) postsFields.name = req.body.name;
    if(req.body.avatar) postsFields.avatar = req.body.avatar;
    
    if(typeof req.body.tagpeople !== 'undefined'){
        postsFields.tagPeople= req.body.tagpeople.split(',');
    }

    postsFields.media={};
    if(typeof req.body.url !== 'undefined'){
         postsFields.media.url = req.body.url.split(',');
    }
        
    //Create
        new UserPosts(postsFields)
        .save()
        .then(userPosts => res.json(userPosts))
        .catch(err => console.log(err));
    }
);

//@ROUTE POST api/posts/edit/:post_id
//@desc  Make changes to an existing post by giving post id as parameter
//@access Private
router.post('/edit/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const postsFields = {};
    if(req.body.location) postsFields.location = req.body.location;
    if(req.body.description) postsFields.description = req.body.description;
    if(req.body.commentflag) postsFields.commentFlag = req.body.commentflag;
    
    if(typeof req.body.tagpeople !== 'undefined'){
        postsFields.tagPeople= req.body.tagpeople.split(',');
    }

    UserPosts.findOneAndUpdate(
                { _id : req.params.post_id},
                { $set : postsFields},
                { new: true }
            )
            .populate('user',['username','avatar'])
            .then(userPosts => { 
                if(userPosts){
                res.json(userPosts); 
                }
                else{
                    res.json({error : 'Invalid post id'});
                }
            })
            .catch(err => res.status(404).send('Post not found!!!'));

    })

//Route DELETE api/posts/:post_id
//@Desc Delete posts by post_id
//@access Private
router.delete(
    '/:post_id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOne({user: req.user.id})
        .then(profile => {
            UserPosts.findById(req.params.post_id)
            .then(post => {
                //check for post owner
                if(post.user.toString() !== req.user.id) {
                    return res.status(401)
                    .json({notauthorized: 'User not authorized'})
                }

                //delete post
                post.remove().then(() => res.json({Success: true}));
            })
            .catch(err => res.status(404).json({postnotfound: 'No post found'}));
        });
    }
);
//@route  POST api/posts/like/:id
//Desc  Like post
//Access Private
router.post(
    '/like/:post_id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOne({user: req.user.id})
        .then(profile => {
            UserPosts.findById(req.params.post_id)
            .then(post => {
                if(
                post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
                ) {
                    //return res.status(400)
                    //.json({alreadyliked: 'User already liked this post'})

                     //get remove index 
                const removeIndex = post.likes
                .map(item => item.user.toString())
                .indexOf(req.user.id);

                //splice out of array
                post.likes.splice(removeIndex, 1);
                 //save
                 post.save().then(post => res.json(post));
                } else {

                //add user id to likes array
                post.likes.unshift({user: req.user.id});
                post.save().then(post => res.json(post));
                }
            })
            .catch(err => res.status(404).json({postnotfound: 'No post found'}));
        });
    }
);

// @route  POST api/posts/unlike/:id
// @route Unlike post
// @access Private
// router.post(
//     '/unlike/:like_id',
//     passport.authenticate('jwt', {session: false}), 
//     (req, res) => {
//         Profile.findOne({user: req.user.id})
//         .then(profile => {
//             UserPosts.findById(req.params.like_id)
//             .then(post => {
//                 if(
//                     post.likes.filter(like.user.toString() === req.user.id)
//                     .length === 0
//                 )  {
//                     return res
//                     .status(400)
//                     .json({notliked: 'you have not yet liked the post'});
//                 }

               

               
//             })
//             .catch(err => res.status(404).json({postnotfound: 'No post found'}));
//         });
//     }
// );

//@route POST/api/posts/:post_id/comment
//@desc  Make a new comment for a post of given post_id
//@access Private
router.post('/:post_id/comment', passport.authenticate('jwt', {session: false}),
(req,res) => {
    //Validate input
    const {errors, isValid } = validatePost.validateCommentInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    //Check for valid post id
    UserPosts.findById(req.params.post_id)
    .then(userPosts => {
        
        //Check for comment flag 
        if(userPosts.commentFlag === true){
            res.json(Error = "Sorry! Comment option is not available for this post");
        }
        const newComment = {
            body:req.body.comment,
            user: req.user.id,
            name:req.body.name,
            avatar:req.body.avatar
        };
        userPosts.comments.unshift(newComment);
        userPosts.save()
        .then(userPosts => res.json(userPosts));
    })
    .catch(err => res.status(404).send('Invalid post id'));
})

//@route POST api/posts/:post_id/edit_comment/:comment_id
//@desc  Edit an existing comment of a user post
//@access Private
router.post('/:post_id/edit_comment/:comment_id', passport.authenticate('jwt', {session:false}),
(req,res) => {
    //Validate Input
    const { errors, isValid } = validatePostInput(req.body);
    if(!isValid){
        res.status(400).json(errors);
    }

    //Check for valid post id
    UserPosts.findById(req.params.post_id)
    .then(userPosts => {
        if(!userPosts){
            res.json(Error='Post not found');
        }
        else{
        //Check to see if comments exist
            if(userPosts.comment.filter(
            usercomment => usercomment._id.toString() === req.params.comment_id
            ).length === 0 ){
                res.json(Error = 'Invalid comment id');
            }
            else{
            const updateIndex = userPosts.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);
            userPosts.comments[updateIndex].body = req.body.comments;
            userPosts.save().then(userPosts => res.json(userPosts));
        }}
    })
    .catch(err => res.status(404).send(Error = 'Unsuccessful search on UserPosts'));
})

//@route api/posts/:post_id/delete_comment/comment_id
//@desc  delete a comment in given post id
//@access private
router.post('/:post_id/delete_comment/:comment_id', passport.authenticate('jwt', {session:false}),
(req, res) => {
    UserPosts.findById(req.params.post_id)
    .then(userPosts => {
        //Check if post exists
        if(!userPosts){
            res.json(Error = 'No posts found');
        }
        else{
            //Check if comment exists
            if(userPosts.comments.filter(
                usercomment => usercomment._id.toString() === req.params.comment_id
                ).length === 0 ){
                    res.json(Error = 'Invalid comment id');
                }
                else{
            //Get remove index
                const removeIndex = userPosts.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id)

            //Splice 'removeIndex' from array
                userPosts.comments.splice(removeIndex , 1);
                userPosts.save().then(userPosts => res.json(userPosts));
                }
            }
        })
        .catch(err => res.status(404).send(err));
    })

module.exports = router;