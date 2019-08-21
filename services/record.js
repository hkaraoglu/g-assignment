const Service      = require("./service");
const RecordModel  = require("../models/record");

class RecordService extends Service
{
    constructor(req, res, next)
    {
        super(req, res, next);
        this.recordModel = new RecordModel(req);
    }

    async getRecords()
    {
        if(this.body.minCount && isNaN(Number(this.body.minCount)))
        {
            this.serviceResult.setCode(this.serviceResult.codes.ERROR_INVALID_PARAMETER)
                              .setMessage(this.lt.get("error_invalid_parameter_value", "minCount"));
        }
        else if(this.body.maxCount && isNaN(Number(this.body.maxCount)))
        {
            this.serviceResult.setCode(this.serviceResult.codes.ERROR_INVALID_PARAMETER)
                              .setMessage(this.lt.get("error_invalid_parameter_value", "maxCount"));
        }
        else if(this.body.minCount && this.body.maxCount && this.body.minCount > this.body.maxCount)
        {
            this.serviceResult.setCode(this.serviceResult.codes.ERROR_INVALID_PARAMETER)
                               .setMessage(this.lt.get("error_mincount_lower_than_maxcount"));
        }
        else if(this.body.startDate && isNaN(Date.parse(this.body.startDate)))
        {
            this.serviceResult.setCode(this.serviceResult.codes.ERROR_INVALID_PARAMETER)
                              .setMessage(this.lt.get("error_invalid_parameter_value", "startDate"));
        }
        else if(this.body.endDate && isNaN(Date.parse(this.body.endDate)))
        {
            this.serviceResult.setCode(this.serviceResult.codes.ERROR_INVALID_PARAMETER)
                              .setMessage(this.lt.get("error_invalid_parameter_value", "endDate"));
        }
        else
        {
            const records = await this.recordModel.getRecords();
            this.serviceResult.setCode(this.serviceResult.codes.SUCCESS)
                              .setMessage(this.lt.get("success"))
                              .setData(records);
        }
        this.send();
    }



}
module.exports = RecordService;
