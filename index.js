const express=require('express')
const cookieParser=require('cookie-parser')
const app=express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const sassMiddleWare=require('node-sass-middleware')
const flash =require('connect-flash')
const customMware=require('./config/middleware')




app.use(sassMiddleWare({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

//Used for session cookie + authentication
const session =require('express-session')
const passport=require('passport')
const passportLocal=require('./config/passport-local-strategy')
const MongoStore=require('connect-mongo');
const { connect } = require('mongoose');


app.use(express.urlencoded({ extended: true }))


app.use(cookieParser());
app.use(express.static('./assets'));

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads')) 



app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine','ejs')
app.set('views','./views')

//mongostore is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //TODo , we will change the secret before deployment
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*16*100)//1 min as it is in milisecond
    }
    ,
    store:MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/codial_development',
            autoRemove:'disabled'
        },
        function(err){
            console.log(err||'connect-mongo db setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash())
app.use(customMware.setflash)

// use express router
app.use('/',require('./routes/index.js'))



app.listen(port,function(err){
    if(err){
        console.log(`Error in running the express server ${err}`)
        return;
    }
    console.log(`Server is running on port ${port}`);

})