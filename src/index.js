var express = require('express');
var app 	= express();
var path    = require('path');

//Configuration 
var config = {};
config.port = 9090; 
config.directory = ''; 

// set the public folder to serve public assets
app.use(express.static('src'));
// set up our one route to the index.html file
app.get('*', function(req, res) {
	res.sendFile(path.join( 'src' ));
});

app.listen(config.port);
console.log('Server running on port -> ' + config.port + ' and using directory -> ' + config.directory );
