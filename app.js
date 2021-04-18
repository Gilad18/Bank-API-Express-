const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port =5000;
const accountRoute = require('./routes/accountRoute');


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',accountRoute);


// app.listen(port,()=>{
//     console.log(`application start at ${port}`)
// })


app.listen(process.env.PORT || port, () => {
    console.log(`application start at ${port}`);
})