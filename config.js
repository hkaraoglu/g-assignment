module.exports  = {
    "db" :
        {
            "mongo" : {
                "host" : process.env.MONGODB_HOST,
                "port" : process.env.MONGODB_PORT,
                "database" : process.env.MONGODB_DATABASE
        }
     }
};
