const express=require('express')
const app=express()
const path=require('path')
const bodyParser=require('body-parser')
const mssql=require('./db_config')
const cookieParser =require('cookie-parser')

const PORT=process.env.PORT || 8000;
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs')
//app.set('views',path.join(__dirname,'views'))


//const routes=require('./routes/pages')
//const routes=require('./routes/auth')

app.use('/',require('./routes/pages'))
app.use('/auth',require('./routes/auth'))

app.listen(PORT,()=>{
    console.log('running on 8000');
})
