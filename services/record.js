const Service      = require("./service");
const RecordModel  = require("../models/record");

class RecordService extends Service
{
    constructor(req, res, next)
    {
        super(req, res, next);
        this.recordModel = new RecordModel(req, res);

    }

    async getRecords()
    {
        if(this.body.minCount && this.body.minCount > 0 && this.body.minCount)
        {
            const records = await this.recordModel.getRecords();
            this.serviceResult.setCode(this.serviceResult.codes.SUCCESS)
                .setMessage("Success")
                .setData(records);
        }
        else
        {
            const records = await this.recordModel.getRecords();
            this.serviceResult.setCode(this.serviceResult.codes.SUCCESS)
                              .setMessage("Success")
                              .setData(records);
        }
        this.send();
    }



}
module.exports = RecordService;
