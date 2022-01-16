const mongoose= require('mongoose');
require('./locations');


const dbURI = "mongodb+srv://link:V3l3n0@cluster0.zbdfn.mongodb.net/TestParchiCalisthenics";
const secretMongoDbUri = process.env.secretMongoDbUri;


console.log("Here's the secret: "+ secretMongoDbUri);
console.log(process.env);

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