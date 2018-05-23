const errorHelper = (error, res) => {
    if(error.name === 'SequelizeDatabaseError'){
        res.status(500).send({
            status: 'Unsuccessful',
            message: 'An error occured in the server'
        });
    }else if(error.name === 'SequelizeValidationError' || 'SequelizeUniqueConstraintError'){
        return res.status(400).send({
            status: 'Unsuccessful',
            message: error.errors[0].message
        });
    }
};

export default errorHelper;