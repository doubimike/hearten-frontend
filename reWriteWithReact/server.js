var express = require('express');
var app = express();
var path = require('path');


// set the view engine to ejs
app.set('views', path.join(__dirname, './build/views'));

app.set('view engine', 'ejs');

// 设置静态文件
app.use(express.static('build/static'));

app.get('/', function(req, res) {
    res.render('homepage/index');
    console.log('test');
});

app.listen(3200);

app.views;