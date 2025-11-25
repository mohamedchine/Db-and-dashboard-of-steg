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
const { securityHeaders } = require('./middleware/security');
const { generalLimiter } = require('./middleware/rateLimiter');






const app = express();
app.set('trust proxy', 1);

// Security middleware - Helmet for security headers
app.use(securityHeaders);

// Body parser limits to prevent DoS attacks
app.use(express.json({ limit: '10mb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Limit URL-encoded payload size

db.execute('select 1 ').then(async()=>{ //select is just to check if the connection is good
    console.log('connected to db');
    
    // CORS configuration
    app.use( //let localhost 3000 send receive request && send and receive cookies
      //browser policy dont allow request to different domain(http://localhost:3000) , so we gotta allow it by using cors 
        cors({
          origin: process.env.client_url , 
          credentials: true, 
        })
      );
   
    app.use(cookieParser());
    
    // Apply general rate limiting to all routes
    app.use(generalLimiter);
    
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
    //prevent cold start for bouth server and database
    app.get('/warmup', async (req, res) => {
      try {
        await db.execute('SELECT 1');
        res.status(200).json('alive and db awake');
      } catch (err) {
        res.status(500).json('db error');
      }
    });
    
 
    app.all('*',(req,res)=>{
        res.status(404).json({message : 'not found'})
    })
    const port=process.env.PORT ; 
    app.listen(port , ()=>{
        console.log('server is running on port '+port);
    })

}).catch((e)=>console.log(e.message))