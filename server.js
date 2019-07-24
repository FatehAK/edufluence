const express = require('express.io');
const app = express();
const PORT = 3000;

app.http().io();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//normal routes
app.get('/', function(req, res) {
    res.render('index');
});

//realtime routes
app.io.route('signal', function(req) {
    req.io.join(req.data);
    req.io.join('files');
    app.io.room(req.data).broadcast('signal', {
        user_type: req.data.user_type,
        user_name: req.data.user_name,
        user_data: req.data.user_data,
        command: req.data.command
    });
});

app.io.route('files', function(req) {
    req.io.room('files').broadcast('files', {
        filename: req.data.filename,
        filesize: req.data.filesize
    });
});

//start server
app.listen(process.env.PORT || PORT);
console.log('server started on port ' + PORT);
