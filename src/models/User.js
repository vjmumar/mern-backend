const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const id = mongoose.Schema.Types.ObjectId;


const USER_SCHEMA = new mongoose.Schema({
Username: {
type: String,
required: true,
unique: true
},
Password: {
type: String || Number,
required: true
},
Post: [
{
belongsTo: String || Number,
id: String,
text: String,
likes: [],
comments: [
{
id: id,
belongsTo: String || Number,
name: String || Number,
text: String || Number
}
],
required: false
}
]
});


//HASH PASSWORD
USER_SCHEMA.pre('save', async function(next){
try {
const salt = 5;
const hashPassword = await bcrypt.hash(this.Password, salt);
this.Password = await hashPassword;
next();
} catch(err) {
throw err
}
});

const mongooseModel = mongoose.model('USER', USER_SCHEMA);

module.exports = mongooseModel