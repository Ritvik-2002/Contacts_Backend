const errorhandler = (err,req,res,next)=>{
    const error = res.statusCode ? res.statusCode : 500;
    res.json({message:err.message,stackTarce:err.stack});
};

module.exports = errorhandler