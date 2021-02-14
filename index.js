const express = require('express');
const app = express();

app.set('view engine', 'ejs')
app.get("/", function(req, res) {
    res.send('helloooo');
})

app.listen('8181');