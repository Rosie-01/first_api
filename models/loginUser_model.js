const { default: mongoose } = require('mongoose');
const loginMongoose = require('mongoose');

const loginSchema = new loginMongoose.Schema({
    email: {
        type : String,
        unique: true,
        required: true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
});

const loginModel = mongoose.model("loginUser", loginSchema)

module.exports = loginModel