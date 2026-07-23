const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

// Validate required environment variables before doing anything else.
// Failing fast here with a clear message makes misconfiguration obvious
// instead of surfacing as a cryptic DB connection error later on.
const REQUIRED_ENV_VARS = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT', 'PORT'];
const missingEnvVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
    console.error('Missing required environment variable(s): ' + missingEnvVars.join(', '));
    console.error('Please set these variables (e.g. in your .env file or Railway project variables) before starting the server.');
    process.exit(1);
}

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

// Timeout wrapper so a hanging/unreachable database doesn't leave the
// process stuck indefinitely waiting for a connection.
const DB_CONNECTION_TIMEOUT_MS = 8000; // 8 seconds

const withTimeout = (promise, ms, message) => {
    let timeoutId;
    const timeout = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(message)), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
};

withTimeout(
    db.execute('select 1'),
    DB_CONNECTION_TIMEOUT_MS,
    `Database connection timed out after ${DB_CONNECTION_TIMEOUT_MS}ms`
).then(async()=>{ //select is just to check if the connection is good
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

    app.all('*',(req,res)=>{
        res.status(404).json({message : 'not found'})
    })
    const port=process.env.PORT || 3000 ; 
    app.listen(port , ()=>{
        console.log('server is running on port '+port);
    })

}).catch((e)=>{
    console.error('Failed to connect to the database. Server will not start.');
    console.error('Attempted connection with:');
    console.error(`  DB_HOST: ${process.env.DB_HOST}`);
    console.error(`  DB_PORT: ${process.env.DB_PORT}`);
    console.error(`  DB_USER: ${process.env.DB_USER}`);
    console.error(`  DB_NAME: ${process.env.DB_NAME}`);
    console.error('  DB_PASSWORD: ' + (process.env.DB_PASSWORD ? '[set]' : '[missing]'));
    console.error('Error message: ' + e.message);
    console.error('Error stack: ' + e.stack);
    process.exit(1);
})
