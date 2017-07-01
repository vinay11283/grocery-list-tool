
var basicAuth = require('basic-auth');

var auth = function (req, res, next) {
	return next();
	/*
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'admin' && user.pass === '123') {
    return next();
  } else {
    return unauthorized(res);
  };
  */
};

var cors = require('cors');

var bodyParser = require('body-parser');

var express = require('express');
//create an express app
var app = express();
app.use(cors());
//configure the express app to parse JSON-formatted body
app.use(bodyParser.json());

//add route for the root
app.get('/',function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("We're up and running!!!");
});
// Listen on port 5000, IP defaults to 127.0.0.1
app.listen(process.env.PORT || 5000)

//create routing objects
var grocery = require('./api/grocery');
app.get('/api/groceries',auth,grocery.list);
app.get('/api/groceries/:id',auth,grocery.getById);
app.post('/api/groceries',auth,grocery.create);
app.put('/api/groceries/:id',auth,grocery.update);
app.delete('/api/groceries/:id',auth,grocery.delete);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:5000/");
