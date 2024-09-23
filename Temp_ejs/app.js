const express= require('express')
const app =express()
const path=require('path')
const router =express.Router()

const bodyParser=require('body-parser')

app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs')

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
        path:'index'
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
        path:'about'
    })
})

router.use((req,res,next)=>{
    res.status(200).render('404',{
        docTitle:'404 page not found',
        path:'404'
    })
})

app.use(router)
//app.use(bodyParser.urlencoded())

app.listen(8000,()=>{
    console.log('Running on 8000');
})