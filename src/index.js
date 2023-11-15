import "dotenv/config";
import { ExpressConfig } from "./config/expressConfig";
import  mongoConnect from "./config/mongoConfig";

const express = new ExpressConfig();
 
 (async() =>{
   await express.listen()
   await mongoConnect()
   console.log("se conecto")
 })()
// express.listen();
