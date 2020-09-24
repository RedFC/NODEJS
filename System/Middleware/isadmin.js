module.exports = function (req,res,next){
    
    const isadmin = req.user.isAdmin;
    if(!isadmin) res.status(403).send('Forbidden Access');

    next();
}