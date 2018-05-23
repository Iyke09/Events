const verifyParams = (req, res, next) =>{
    if(isNaN(req.params.id)){
        return res.status(400).send({ 
            status: 'unsuccesful',
            message: 'Invalid id'
         });
    }
    next();
};
export default verifyParams;