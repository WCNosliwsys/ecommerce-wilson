import {connect} from 'mongoose'

export default async ()=>{
  const enviroment = {
    development:{
      uri: `${process.env.DB_DRIVER}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      options:{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    },
    production:{
      uri:`${process.env.MONGO_URI}`,
      options:{
        dbName:process.env.DB_NAME,
        useUnifiedTopology:true
      }
    }
  }
  const {uri,options} =enviroment[process.env.NODE_ENV]
  console.log(uri)
  console.log(options)
  return await connect(uri,options)
}