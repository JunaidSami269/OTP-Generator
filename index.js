const express = require("express");
const db = require("./models");
const PORT = process.env.PORT || 3000;

//create express app
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json);

db.sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening on http://localhost:${PORT} `);
    })
})
