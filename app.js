const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
// const port =5000;
const accountRoute = require('./routes/accountRoute');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',accountRoute);

mongoose.connect('mongodb+srv://gilad18587:MapileyEgoz85@mybankdatabase.418pd.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("database connect")
});


app.listen(process.env.PORT || 5000, () => {
    console.log(`application start`);
})