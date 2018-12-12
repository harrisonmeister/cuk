var express = require('express'),
    app = express();
	
var bodyParser = require('body-parser');

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404.html');
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
    console.log("Listening on " + port);
});