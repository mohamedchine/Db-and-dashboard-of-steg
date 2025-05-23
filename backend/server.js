const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const db   = require('./config/db')
const AuthRouter = require('./routes/AuthRoutes');
const UnitsRouter = require('./routes/unitsRoute');
const PasswordRouter = require('./routes/passwordRoutes');
const alarmRouter = require('./routes/centraldashboard/alarmsRoutes');
const defectiveequipementrouter = require('./routes/centraldashboard/defectiveequipementroutes.js')
const maintenanceRouter = require('./routes/centraldashboard/maintenanceRoutes');
const performanceRouter = require('./routes/centraldashboard/performanceRoutes');
const TurbinesRouter = require('./routes/turbinesRoutes.js');
const directionRooutes = require('./routes/directiondashboard/directionRoutes.js');
const groupementRouter = require('./routes/groupement/groupementRoutes.js');
const chefRouter = require('./routes/centraldashboard/chefRoutes.js')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const activitylogRouter = require('./routes/centraldashboard/activityLogsRoutes.js');






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
   
    app.use(cookieParser());
    app.use(express.json());
    app.use('/auth',AuthRouter);
    app.use('/units',UnitsRouter);
    app.use('/turbines',TurbinesRouter);
    app.use('/password',PasswordRouter);
    app.use('/alarms',alarmRouter);
    app.use('/defectiveequipements',defectiveequipementrouter);
    app.use('/maintenance',maintenanceRouter);
    app.use('/performance',performanceRouter);
    app.use('/groupement',groupementRouter);
    app.use('/direction',directionRooutes);
    app.use('/chef',chefRouter);
    app.use('/activitylogs',activitylogRouter);
  
    // app.use('/modificationrequests' ,modificationRouter);
    app.all('*',(req,res)=>{
        res.status(404).json({message : 'not found'})
    })
    app.listen(process.env.port , ()=>{
        console.log('server is running on port '+process.env.port);
    })

}).catch((e)=>console.log(e.message))