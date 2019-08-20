const router = require('express').Router();
const RecordService = require('./services/record');

router.post('/', (req, res, next)  =>
{
    new RecordService(req, res, next).getRecords();
});


module.exports = router;
