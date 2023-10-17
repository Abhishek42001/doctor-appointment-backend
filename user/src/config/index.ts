import dotenv from 'dotenv'

if(process.env.NODE_ENV!=='prod'){
    const configFile=`./.env.${process.env.NODE_ENV}`
    dotenv.config({path:configFile})
}else{
    dotenv.config()
}

export const PORT=process.env.PORT;
export const APP_SECRET=process.env.APP_SECRET;