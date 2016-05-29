var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine','ejs');
app.set('views','./build');

// 设置静态文件
app.use(express.static('./src/index/static'));

app.get('/',function (req,res) {
    res.render('index/page/index');
});

app.listen(3000);

