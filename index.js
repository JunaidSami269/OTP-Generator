const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes/userRoutes');
const createUser= require('./controllers/createUser.js');
const port = process.env.PORT || 3000;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); 

require('./utils/database.js');
require('./models/index.js');


    app.listen(3000,()=>{
        console.log(`listening on http://localhost:${port}`);
    });


app.use(morgan('dev'));



app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/view/index.html`);
});

app.use('/users',router)


app.use((req,res)=>{
    res.status(404).send({"errors":"Route does not exist."})

})

