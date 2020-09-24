const express = require('express'); 
const Userroute = require('../Routes/User');
const Authroute = require('../Routes/Auth');
const Handle = require('../Middleware/Error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/User',Userroute);
    app.use('/api/auth',Authroute);
    app.use(Handle);
}