const express = require("express");
const route = express.Router();
const {GET_USER, CREATE_USER, LOG_IN_USER } = require("../controllers/User");
const {ADD_POST,UPDATE_LIKES,ADD_COMMENT,DELETE_COMMENT,DELETE_POST,DECREASE_LIKES,UPLOAD_FILE} = require("../controllers/UserActions");
const AUTH_TOKEN = require("../middlewares/auth");
const upload = require("../middlewares/multer");


//SIGN IN AND STUFF
route.get("/users", GET_USER);
route.post("/users/signIn", LOG_IN_USER);
route.post("/users/signUp", CREATE_USER);

//ACTIONS
route.post("/post",AUTH_TOKEN,ADD_POST);
route.post("/post/del",AUTH_TOKEN,DELETE_POST);
route.post("/post/likes",AUTH_TOKEN,UPDATE_LIKES);
route.post("/post/likes/dec",AUTH_TOKEN,DECREASE_LIKES);
route.post("/post/comments",AUTH_TOKEN,ADD_COMMENT);
route.post("/post/comments/del",DELETE_COMMENT);
route.post("/post/uploadFile/",upload.single("images"),UPLOAD_FILE);

module.exports = route;

