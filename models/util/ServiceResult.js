const ServiceResultEnum = require('../../enums/util/service_result.json');

class ServiceResult
{
    constructor()
    {
        this.result = {
            code : -1,
            msg : "",
            records : []
        };
        this.codes = ServiceResultEnum;
    }

    setCode(code)
    {
        this.result.code = code;
        return this;
    }

    setMessage(message)
    {
        this.result.msg = message;
        return this;
    }

    setData(data)
    {
        this.result.records = data;
        return this;
    }

    get()
    {
        return this.result;
    }
}

module.exports = ServiceResult;
