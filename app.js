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

app.get('/',(req,res)=>{
    res.json({success : {id:1,email : 'asfasf@asfasf.com'}})
})


// app.listen(port,()=>{
//     console.log(`application start at ${port}`)
// })


app.listen(process.env.PORT || 5000, () => {
    console.log(`application start at ${port}`);
})