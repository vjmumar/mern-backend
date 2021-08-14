const jwt = require("jsonwebtoken");
require("dotenv").config();

const AUTH_TOKEN  = async (req,res,next) => {
try {
const header =  req.headers["authorization"];
const token =  header.split(" ")[1];
const decode = await jwt.verify(token,process.env.SECRET_KEY);
req.body.id = decode._id;
next();
} catch(err) {
if (err) {
res.sendStatus(403);
}
}
}

module.exports = AUTH_TOKEN;