
export class RequiredParameterError extends Error {
    constructor(param){
        super(`${param} cannot be null or undefined`)
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, RequiredParameterError)
        }
    }
}

export class InvalidPropertyError extends Error {
    constructor(msg){
        super(msg)
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, InvalidPropertyError)
        }
    }
}