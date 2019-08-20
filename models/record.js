const Model = require('./model.js');
const JSON = require('circular-json');

class RecordModel extends Model
{
    constructor(req)
    {
        super("records", req);
    }

    async getRecords()
    {
       return await this.collection.aggregate([{
            $project : {
                totalCount: {$sum: "$counts"},
                _id : 0,
                createdAt : 1,
                key : 1
            }},
           { $match : {
                   createdAt : {
                       $gte : new Date(this.body.startDate),
                       $lt  : new Date(this.body.endDate)
                   },
                   totalCount:
                   {
                       $gte : Number(this.body.minCount),
                       $lt  : Number(this.body.maxCount)
                   }
            }}
        ]).toArray();
    }

}

module.exports = RecordModel;
