const USER = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const GET_USER = async (req,res) => {
try {
const getUser = await USER.find();
res.json(getUser)
} catch(err) {
res.json({
Status: 'Failed'
})
}
}


const CREATE_USER = async (req,res) => {
try {
const createUser = await new USER({
Username: req.body.Username,
Password: req.body.Password
});
await createUser.save();

//sign token
await jwt.sign({_id: createUser.id},process.env.SECRET_KEY, (er,token) => {
res.json({
Status: "Successful",
Token: token
});
});

} catch(err) {
res.json({
Status: "Failed",
Error: err
});
}
}


const LOG_IN_USER = async (req,res) => {
try {
const findByUsername = await USER.find({Username: req.body.Username});
let getPassword;
let userId;
let username;
await findByUsername.map(user => {
getPassword = user.Password;
username = user.Username;
userId = user._id;
});


//if the user exist
if (findByUsername.length === 1) {

await bcrypt.compare(req.body.Password, getPassword, async function(err, result) {

if (result === true) {
//sign token
await jwt.sign({_id: userId},process.env.SECRET_KEY, (er,token) => {
res.json({
Status: "Successful",
data: findByUsername,
Token: token,
myId: userId,
myUsername: username,
});
});

} else {
res.json({
Status: 'Failed',
SignIn: result
})
}
});

} else {
res.json({
Status: "User Not Found"
})
}

} catch(err){
throw err
}
}

module.exports = {
GET_USER,
CREATE_USER,
LOG_IN_USER
}