const mongoose = require('mongoose');

async function getConnection(){
    const uri = 'mongodb+srv://rodriguez030124:FmQIOoSLefrtUDhB@clustertravelerstalks.fptdmyf.mongodb.net/TravelersTalks';
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