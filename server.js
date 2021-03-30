const {SqlHandler, InsertHandler } = require('./sqlHandler');
const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/', (req,res) => {
    SqlHandler(req.body.id).then((rows) => {
        res.send(rows[0]);
    }).catch(() => {console.log("error occured with id of "+req.body.id)})
});

app.listen(port, () => {
    console.log('express start');
});