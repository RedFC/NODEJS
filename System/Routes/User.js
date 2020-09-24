const {User,UserValidation} = require('../Models/UserSchema');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const auth = require('../Middleware/auth');
const admin = require('../Middleware/isadmin');

router.get("/current",auth, async (req,res) => {

    const user =await User.findById(req.user._id).select(['-_id','-name','-number','-password']);
    res.send(user);

});

router.post('/create',[auth,admin],async (req,res) => {

    const {error} = UserValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email : req.body.email});
    if(user) return res.status(400).send("User Already Registered");

    user = new User(_.pick(req.body,['name','email','number','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();

    res.send(user);
});


module.exports = router;