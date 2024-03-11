const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('../Routes/apiRoutes');
const dbConnection = require('../dbConnection/db');

const app = express();

//settings
app.set('puerto', 4200);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use(routes);


const httpServer = http.createServer(app);

httpServer.listen(app.get('puerto'), 'localhost', ()=>{
    console.log("Server en puerto: " + app.get('puerto'));

    dbConnection.getConnection();
});