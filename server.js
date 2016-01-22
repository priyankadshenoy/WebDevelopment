var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world hello');
});
app.get('/send/users', function(req, res){
    var users=[
        {username: 'adeles', first: 'adele', last: 'sheldon'},
        {username: 'sheldon', first: 'sheldon', last: 'cooper'}
    ];
    res.json(users);
});

app.listen(3000);