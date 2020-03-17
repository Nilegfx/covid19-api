const apiRouter = require('express').Router();

const covid19Router = require('./covid19');
const healthRouter = require('./health');

apiRouter.use('/health', healthRouter);
apiRouter.use('/cases', covid19Router);

module.exports = { apiRouter };
