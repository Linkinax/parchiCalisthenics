const mongoose= require('mongoose');
require('./locations');

const dbURI = "mongodb://127.0.0.1:27017/ParchiCalisthenics";
mongoose.connect(dbURI, {useNewURLparser:true});


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