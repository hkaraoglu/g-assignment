const Model = require('./model.js');

class RecordModel extends Model
{
    constructor(req)
    {
        super("records", req);
    }

    async getRecords()
    {
        let match = {};
        let createdAt = {};
        let totalCount = {};
        if(this.body.minCount && !isNaN(Number(this.body.minCount)))
        {
            totalCount.$gte = Number(this.body.minCount);
        }
        if(this.body.maxCount && !isNaN(Number(this.body.maxCount)))
        {
            totalCount.$lte = Number(this.body.maxCount);
        }

        if(totalCount.$lte || totalCount.$gte)
        {
            match.totalCount = totalCount;
        }

        if(this.body.startDate && !isNaN(Date.parse(this.body.startDate)))
        {
            createdAt.$gte = new Date(this.body.startDate);
        }

        if(this.body.endDate && !isNaN(Date.parse(this.body.endDate)))
        {
            createdAt.$lte = new Date(this.body.endDate);
        }

        if(createdAt.$lte || createdAt.$gte)
        {
            match.createdAt = createdAt;
        }

       return await this.collection.aggregate([
           {
                $project : {
                    totalCount: {$sum: "$counts"},
                    _id : 0,
                    createdAt : 1,
                    key : 1
                }
           },
           {
               $match : match
           }
        ]).toArray();
    }

}

module.exports = RecordModel;
