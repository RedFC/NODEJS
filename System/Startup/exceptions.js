
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    

    winston.add(winston.transports.MongoDB,{
        db : 'mongodb://localhost/System',
        level : 'error'
    });

    winston.handleExceptions(
        new winston.transports.Console({colorize:true,prettyPrint:true}),
        new winston.transports.File({
            filename : "UncaughtError.log"
        })
    );

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

  }