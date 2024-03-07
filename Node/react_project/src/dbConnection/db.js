const mongoose = require('mongoose');

async function getConnection(){
    const uri = 'mongodb://127.0.0.1:27017/travelerstalks';
    const db = mongoose.connection;
    mongoose.connect(uri); 

    db.on('open', _ =>{
        console.log("Database connected to: ", uri);
    })

    db.on('error', err =>{
        console.log("Error ", err);
    })
}

module.exports = {
    getConnection
}