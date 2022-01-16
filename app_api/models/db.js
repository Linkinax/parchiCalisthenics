const mongoose= require('mongoose');
const secret = require('./../../.env/secrets.json');
require('./locations');


mongoose.connect(secret.MongoDbUri, {useNewURLparser:true});


mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to'+  dbURI );
});

mongoose.connection.on('error', (err)=>{
    console.log('Mongoose error:', err);
});

mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose disconnected:');
});

const shoutDown = (msg, call) => {
    mongoose.connection.close(()=>{
    
        console.log("closing mongo connection ${msg}");
     call()
    });
}