const request = require('supertest');
const app = require('./../app');
const assert = require('assert');

const expectedResult = {
    "code": 0,
    "msg": "Success",
};
describe('POST /', function () {
    before('connect', function(){
        return new Promise((resolve,reject) => {
            app.on("appStarted", function(){
                return resolve();
            });
        });
    });
    it('Response for records', function () {
            request(app)
            .post('/')
            .set('Accept', 'application/json')
            .send({
                startDate: "2016-09-10",
                endDate: "2016-09-11",
                minCount: 3200,
                maxCount: 3500
            })
            .expect(200)
            .then(response => {
              //  console.log(response);
                 assert(response.body.code === expectedResult.code, "Code fields are not equals!");
                 assert(response.body.msg === expectedResult.msg, "msg fields are not equals!");
            }).catch((err) => {
                console.error("Handling promise rejection: ", err);
            });
    });
});
