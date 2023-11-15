import {connect} from 'mongoose'

export default async ()=>{
  const enviroment = {
    development:{
      uri: `${process.env.DB_DRIVER}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      options:{
        // useNewUrlParser:true,
      }
    },
    production:{}
  }
  const {uri,options} =enviroment[process.env.NODE_ENV]
  return await connect(uri,options)
}