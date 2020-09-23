const express = require('express');
const Mongoose = require('mongoose');
const Userroute = require('./Routes/User');
const Authroute = require('./Routes/Auth');
const app = express();
const config = require('config');

if(!config.get('jwtprivatekey')){
    console.log("FATAL ERROR : JWT Private Key Not Defined");
    process.exit(1);
}

Mongoose.connect('mongodb://localhost/System',{ useUnifiedTopology: true })
.then(result => console.log("Connected To DB"))
.catch(err => console.log(err));

app.use(express.json());
app.use('/api/User',Userroute);
app.use('/api/auth',Authroute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log('Server Started and Listening To PORT = '+PORT)});
