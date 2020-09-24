const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const Userschema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 5,
        max : 255
    },
    email : {
        type : String,
        required : true,
        min : 10,
        max : 255
    },
    number : {
        type : Number,
        required : true,
        min : 7
    },
    password : {
        type : String,
        required : true,
        min : 6,
        max : 1024
    },
    isAdmin :{
        type: Boolean,
        default:false
    }
});

Userschema.methods.AuthGenrateToken = function () {
    const token = jwt.sign({_id : this.id,isAdmin : this.isAdmin}, config.get('jwtprivatekey') );
    return token;
  }


const User = mongoose.model('User',Userschema);

function UserValidation(User) {

    const schema = {
        name : Joi.string().required().min(5).max(255),
        email : Joi.string().required().min(5).max(255).email(),
        number : Joi.string().required().min(5).max(255),
        password : Joi.string().required().min(5).max(255)
    }

    return Joi.validate(schema);
}


exports.Userschema = Userschema;
exports.User = User;
exports.UserValidation = UserValidation;



