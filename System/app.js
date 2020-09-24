
const express = require('express');
const app = express();

require('./Startup/exceptions')();
require('./Startup/envConfig')();
require('./Startup/Routes')(app);
require('./Startup/connection')();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Server Started and Listening To PORT = ${PORT}`)});