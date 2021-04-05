import app from './express';
import { config } from '../config';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// load .envs
dotenv.config();

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri as string,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
})


// connecting to port
app.listen(
    config.port, 
    // @ts-ignore
    (err: any) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})