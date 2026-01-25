import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express";

export const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)

        if(connectionInstance){
            console.log(`db connected`)
        }
    } catch (error) {
        console.log(`error while connecting to db: ${error}`)
    }
}
