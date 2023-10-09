const STATUS_CODES = Object.freeze(
    {
        OK: 200,
        BAD_REQUEST: 400,
        UN_AUTHORISED: 401,
        NOT_FOUND: 404,
        ALREADY_EXIST: 403,
        INTERNAL_ERROR: 500,
    }
)

export class BaseError extends Error{
    statusCode:number;
    description:string;
    errorStack:string|null;

    constructor(statusCode:number,description:string,errorStack:string|null=null){
        super(description);
        this.statusCode=statusCode;
        this.description=description;
        this.errorStack=errorStack;
        Error.captureStackTrace(this)
    }
}

//500 Internal Server Error
export class ApiError extends BaseError{
    constructor({description,statusCode=STATUS_CODES.INTERNAL_ERROR,errorStack}:{description:string,statusCode:number,errorStack:string}){
        super(statusCode,description,errorStack);
    }
}

//400 Validation Error
export class ValidationError extends BaseError{
    constructor(){
        super(STATUS_CODES.BAD_REQUEST,'BAD REQUEST');
    }
}

//401 Authorise Error
export class AuthorizeError extends BaseError{
    constructor(description:string="Access Denied"){
        super(STATUS_CODES.UN_AUTHORISED,description);

    }
}


//404 Authorise Error
export class NotFoundError extends BaseError{
    constructor(description:string="Not Found"){
        super(STATUS_CODES.NOT_FOUND,description);

    }
}

//403 Already Exist Error

export class AlreadyExistError extends BaseError{
    constructor(description:string='Already Exist'){
        super(STATUS_CODES.ALREADY_EXIST,description)
    }
}
