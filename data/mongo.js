const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const url = "mongodb://"+ config.db.mongo.host + ":" +  config.db.mongo.port + "/" + config.db.mongo.database +
"?keepAlive=true&poolSize=30&autoReconnect=true&socketTimeoutMS=360000&connectTimeoutMS=360000";

module.exports = {

    connectToServer: function( callback ) {
        MongoClient.connect( url,  { useNewUrlParser: true, useUnifiedTopology: true }, function( err, client ) {
            if(err)
            {
                console.log(err);
            }
            _db  = client.db(config.db.mongo.database);
            return callback( err, client );
        } );
    },

    getDb: function() {
        return _db;
    }
};


