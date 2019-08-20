const mongoDb = require('../data/mongo');

class Model
{
    constructor(collection, req)
    {
        this.dbo = mongoDb.getDb();
        this.collection = this.dbo.collection(collection);
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
    }
}

module.exports = Model;
