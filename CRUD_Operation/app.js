const express = require('express');
const axios=require('axios')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const sql = require('./db_config');
//const dotenv=require('dotenv')
const path=require('path')

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const handlebars = exphbs.create({ extname: '.hbs' });
handlebars.handlebars.registerHelper('greaterThan', function(value, threshold, options) {
    if (value > threshold) {
        return options.fn(this); // Render the block if true
    } else {
        return options.inverse(this); // Render the `else` block if false
    }
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

/* app.get('/api/fixtures', async (req, res) => {
    try {
        const response = await axios.get('https://staging.cricket-21.com/cricketapi/api/matchcenter/fixtures?compid=1948&type=json');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching fixtures:', error);
        res.status(500).send('Error fetching fixtures');
    }
});

app.get('/i', async (req, res) => {
    try {
        const response = await axios.get('https://staging.cricket-21.com/cricketapi/api/matchcenter/fixtures?compid=1948&type=json');
        console.log('API Response:', response.data)
        const fixtures = response.data.fixtures || [];  // Adjust based on actual API response
        res.render('index', { fixtures: [] });
    } catch (error) {
        console.error('Error fetching fixtures:', error);
        res.status(500).send('Error fetching fixtures');
    }
}); */
 /* app.get("/fixtures",(req,res)=>{
    res.render("fixtures")
}) */


/* app.get('/fixtures', async (req, res) => {
    try {
      const response = await axios.get('https://staging.cricket-21.com/cricketapi/api/matchcenter/fixtures?compid=1948&type=json');
      const fixtures = response.data; // Extract data from the response
      //console.log(response.data);
      console.log('Fixtures data:', fixtures)
      // Render the Handlebars template with data
      res.render('fixtures', { fixtures });;
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    }
  }); */

// Routes
/* app.get('/', (req, res) => {
    res.render('home');
}); */
const routes=require('./routes/student')
app.use('/',routes)
// Start server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});
