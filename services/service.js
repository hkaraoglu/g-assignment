const ServiceResult = require('../models/util/ServiceResult');

class Service
{
    constructor(req, res, next)
    {
        this.req  = req;
        this.res  = res;
        this.next = next;
        this.body = req.body;
        this.params = req.params;
        this.query  = req.query;
        this.lt = res.locals._lt;
        this.serviceResult = new ServiceResult();
    }

    send()
    {
        this.res.send(this.serviceResult.get());
    }
}

module.exports = Service;
