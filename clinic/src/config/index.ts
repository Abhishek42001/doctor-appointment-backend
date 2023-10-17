import dotenv from 'dotenv'

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV!=='prod'){
    const configFilePath=`./.env.${process.env.NODE_ENV}`
    dotenv.config({path:configFilePath})

}else{
    dotenv.config()
}

export const PORT=process.env.PORT;
export const APP_SECRET=process.env.APP_SECRET