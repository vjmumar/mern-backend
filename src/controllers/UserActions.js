const USER = require("../models/User");

const ADD_POST = async (req,res) => {
try {
const postedPost = await USER.findByIdAndUpdate(req.body.id,{$push:{
"Post": {
text: req.body.text,
belongsTo: req.body.userId,
likes: []
}
}
}
);

res.json({
Status: "Successful Post",
postedPost
})

}catch(err) {
res.json({
Status: "Failed To Post"
})
}
}

const DELETE_POST = async (req,res) => {
try {
const deletePost = await USER.findByIdAndUpdate(req.body.id, {
$pull: {"Post": {"_id": req.body.postId }}
});

res.json({
Status: "Successful",
deletePost
})

} catch(err) {
throw err
}
}

const UPDATE_LIKES = async (req,res) => {
try {
const updateLikes = await USER.findOneAndUpdate({"Post._id": req.body.postId},
{
$push: {
"Post.$.likes": req.body.likeId
}
}
);
res.json(updateLikes);
} catch(err) {
throw err
}
}

const DECREASE_LIKES = async (req,res) => {
try {
const updateLikes = await USER.findOneAndUpdate({"Post._id": req.body.postId}, {
$pull: {
"Post.$.likes": req.body.likeId
}
});

res.json(updateLikes)
} catch(err) {
throw err
}
}

const ADD_COMMENT = async (req,res) => {
try {
const addComment = await USER.findOneAndUpdate({"Post._id": req.body.postId}, {
$push: {"Post.$.comments": {
belongsTo: req.body.id,
name: req.body.name,
text: req.body.comment
}}
})

res.json({
Status: "Successful",
addComment
})
}catch(err) {
throw err
}
}

const DELETE_COMMENT = async (req,res) => {
console.log(req.body)
try {
const findRemoveComment = await USER.findOneAndUpdate({"Post._id": req.body.postId}, {
$pull: {"Post.$.comments": {"_id": req.body.commentId}}
});

res.json({
Status: "Successful",
findRemoveComment
})


} catch(err) {
throw err
};

}

module.exports = {
ADD_POST,
UPDATE_LIKES,
ADD_COMMENT,
DELETE_COMMENT,
DELETE_POST,
DECREASE_LIKES
}