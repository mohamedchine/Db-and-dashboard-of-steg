const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const db   = require('./config/db')
const AuthRouter = require('./routes/AuthRoutes');
const UnitsRouter = require('./routes/unitsRoute');
const PasswordRouter = require('./routes/passwordRoutes');
const alarmRouter = require('./routes/dailyRepportsRoutes/alarmsRoutes');
const defectiveequipementrouter = require('./routes/dailyRepportsRoutes/defectiveequipementroutes.js')


const cookieParser = require('cookie-parser');
const cors = require('cors');
const dynamicreportsetup = require('./utils/dynamicreportsetup');
const busyHTML = require('./views/busy');


const app = express();
db.execute('select 1 ').then(async()=>{ //select is just to check if the connection is good
    console.log('connected to db');
    app.use( //let localhost 3000 send receive request && send and receive cookies
      //browser policy dont allow request to different domain(http://localhost:3000) , so we gotta allow it by using cors 
        cors({
          origin: 'http://localhost:3000', 
          credentials: true, 
        })
      );
    let isBusy = false ; //setting up daily repport ?
    
    await dynamicreportsetup((val) => { isBusy = val });


    app.use((req, res, next) => {
      if (isBusy) return res.status(400).send(busyHTML);
      next();
    });

    app.use(cookieParser());
    app.use(express.json());
    app.use('/auth',AuthRouter);
    app.use('/units',UnitsRouter);
    app.use('/password',PasswordRouter);
    app.use('/alarms',alarmRouter);
    app.use('/defectiveequipements',defectiveequipementrouter);
    app.all('*',(req,res)=>{
        res.status(404).json({message : 'not found'})
    })
    app.listen(process.env.port , ()=>{
        console.log('server is running on port '+process.env.port);
    })

}).catch((e)=>console.log(e.message))