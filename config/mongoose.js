const mongoose =require('mongoose')

mongoose.connect('mongodb://localhost/codial_development')

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting with DB'));

db.once('open',function(){
    console.log('DB successfully connected')
})

module.exports=db