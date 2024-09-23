const express= require('express')
const app =express()
const path=require('path')
const router =express.Router()
const {engine}= require('express-handlebars')

const bodyParser=require('body-parser')

app.use(express.static(path.join(__dirname,'public')))

app.engine('hbs',engine({extname:'.hbs',defaultLayout:'main'}))

app.set('view engine','hbs')

router.get('/',(req,res)=>{
    const courses=[
        'PHP',
        'Javascript',
        'Node.js',
        'React.Js',
        'Angular'
    ]
    res.status(200).render('index',{
        docTitle: "welcome to Jvlcode",
        courses,
        //path:'index',
        courseExists:  courses.length > 0,
        pageIndex:true
    })
})
router.get('/about',(req,res,next)=>{
    const courses =[
        'PHP',
        'Javascript',
        'Node.js',
        'React.Js',
        'Angular'
    ]
    res.status(200).render('about',{
        active:'about',
        docTitle:'',
        courses,
        path:'about',
        pageAbout:true
    })
})

router.use((req,res,next)=>{
    res.status(200).render('404',{
        docTitle:'404 page not found',
        path:'404',
        page404:true
    })
})

app.use(router)
//app.use(bodyParser.urlencoded())

app.listen(8000,()=>{
    console.log('Running on 8000');
})