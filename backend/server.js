const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const db   = require('./config/db')
const AuthRouter = require('./routes/AuthRoutes');
const UnitsRouter = require('./routes/unitsRoute');
const PasswordRouter = require('./routes/PasswordRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
db.execute('select 1 ').then(()=>{ //select is just to check if the connection is good
    console.log('connected to db');
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use('/auth',AuthRouter);
    app.use('/units',UnitsRouter);
    app.use('/password',PasswordRouter)
    app.all('*',(req,res)=>{
        res.status(404).json({message : 'not found'})
    })
    app.listen(process.env.port , ()=>{
        console.log('server is running on port '+process.env.port);
    })

}).catch((e)=>console.log(e.message))