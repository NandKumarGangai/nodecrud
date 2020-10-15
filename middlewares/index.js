const logger = (req, res, next) => {
    console.info('@', new Date(), '-', req.method, '-', req.url);
    next();
}

const addTimeStampToObject = (req, res, next) => {
    req.body.user.dateCreated = new Date();
    next();
}

module.exports = {
    logger,
    addTimeStampToObject
}