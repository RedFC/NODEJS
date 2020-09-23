const {User} = require('../Models/UserSchema');
const express = require('express');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', async (req,res) => {

    const {error} = validation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send("Invalid Email Or Password");

    let password = await bcrypt.compare(req.body.password,user.password);
    if(!password) return res.status(400).send("Invalid Email Or Password");

    let Token = user.AuthGenrateToken();

    res.header("x-auth-token",Token).send("User Logged In");
});

function validation(request) {

    const schema = {
        email : Joi.string().required().email(),
        password : Joi.string().required()
    }

    return Joi.validate(request,schema);

  }

module.exports = router;