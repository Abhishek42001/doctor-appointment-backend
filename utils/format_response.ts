import { NotFoundError } from "./error_handling/app_error";

export const FormatData=(data:any)=>{
    if(data){
        return {data,success:true};
    }
    throw new NotFoundError("Data not found");
}

export const FormatError=(message:any)=>{
    return {message,success:false};
    
}