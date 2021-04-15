const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port =1805;
const accountRoute = require('./routes/accountRoute');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',accountRoute);


app.listen(port,()=>{
    console.log(`application start at ${port}`)
})
