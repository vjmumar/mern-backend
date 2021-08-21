const USER = require("../models/User");
const cloudinary = require("../middlewares/cloudinary");

const ADD_POST = async (req, res) => {
	try {
		let cloudinaryUpload;
		let cloudinaryId;
		let image;
		if (req.file !== undefined) {
			cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);
			image = await cloudinaryUpload.url;
			cloudinaryId = await cloudinaryUpload.public_id;
		} else {
			image = await "none";
			cloudinaryId = await "none";
		}

		const postedPost = await USER.findByIdAndUpdate(
			req.body.id,
			{
				$push: {
					Post: {
						postImg: image,
						cloudinaryId: cloudinaryId,
						text: req.body.text,
						belongsTo: req.body.userId,
					},
				},
			},
			{ new: true }
		);

		res.json({
			Status: "Successful Post",
			postedPost,
		});
	} catch (err) {
		res.json({
			Status: "Failed To Post",
		});
	}
};

const UPDATE_POST = async (req, res) => {
	try {
		const updatePost = await USER.findOneAndUpdate(
            {
              "Post._id": req.body.postId
            },
			{
				$set: {
					"Post.$.text": req.body.text,
				},
			},
			{ new: true }
		);

		res.json({
			Status: "Successful",
		});
	} catch (err) {
		throw err;
	}
};

const DELETE_POST = async (req, res) => {
	try {
		if (req.cloudinaryId !== "none") {
			await cloudinary.uploader.destroy(req.body.cloudinaryId);
		}

		const deletePost = await USER.findByIdAndUpdate(
			req.body.id,
			{
				$pull: { Post: { _id: req.body.postId } },
			},
			{ new: true }
		);

		res.json({
			Status: "Successful",
			deletePost,
		});
	} catch (err) {
		throw err;
	}
};

const UPDATE_LIKES = async (req, res) => {
	try {
		const updateLikes = await USER.findOneAndUpdate(
			{ "Post._id": req.body.postId },
			{
				$push: {
					"Post.$.likes": req.body.likeId,
				},
			}
		);
		res.json(updateLikes);
	} catch (err) {
		throw err;
	}
};

const DECREASE_LIKES = async (req, res) => {
	try {
		const updateLikes = await USER.findOneAndUpdate(
			{ "Post._id": req.body.postId },
			{
				$pull: {
					"Post.$.likes": req.body.likeId,
				},
			}
		);

		res.json(updateLikes);
	} catch (err) {
		throw err;
	}
};

const ADD_COMMENT = async (req, res) => {
	try {
		const addComment = await USER.findOneAndUpdate(
			{ "Post._id": req.body.postId },
			{
				$push: {
					"Post.$.comments": {
						belongsTo: req.body.id,
						name: req.body.name,
						text: req.body.comment,
					},
				},
			},
			{ new: true }
		);

		res.json({
			Status: "Successful",
			addComment,
		});
	} catch (err) {
		throw err;
	}
};

const DELETE_COMMENT = async (req, res) => {
	try {
		const findRemoveComment = await USER.findOneAndUpdate(
			{ "Post._id": req.body.postId },
			{
				$pull: { "Post.$.comments": { _id: req.body.commentId } },
			},
			{ new: true }
		);

		res.json({
			Status: "Successful",
			findRemoveComment,
		});
	} catch (err) {
		throw err;
	}
};

module.exports = {
	ADD_POST,
	UPDATE_LIKES,
	ADD_COMMENT,
	DELETE_COMMENT,
	UPDATE_POST,
	DELETE_POST,
	DECREASE_LIKES,
};
