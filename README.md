

# g-assignment

A NodeJS project that can make a simple post request. This project was made for a job interview.

## **Demo url:**

https://g-assignment.herokuapp.com/

## **Endpoints:**

    [POST]
    /

Returns records from mongodb. 

**Parameters:**

     - startDate [Optional] 
     - endDate [Optional]
     - minCount [Optional]
     - maxCount [Optional]
     
**Development:**
  If you wanna develop this project you have to edit lines in **config.js** in root directory like below:

    "host" : process.env.MONGODB_HOST || <<YOUR_MONGODB_HOST>>
    "port" : process.env.MONGODB_PORT || <<YOUR_MONGODB_PORT>>
    "database" : process.env.MONGODB_DATABASE || <<YOUR_MONGODB_DATABASE>>

  
**Deployment:**
If you use heroku to deploy, then:

    heroku config:set MONGODB_HOST=<<YOUR_MONGODB_HOST>>
    heroku config:set MONGODB_PORT=<<YOUR_MONGODB_PORT>>
    heroku config:set MONGODB_DATABASE=<<YOUR_MONGODB_DATABASE>>
    heroku config:set PORT=<<YOUR_APP_PORT>>

**Test**:

    npm run record.test
