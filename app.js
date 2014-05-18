var express = require("express");
var app = express();
var os = require("./stats.js")();

app.route('/').get(function(req,res,err){
	res.send(JSON.stringify(os));
});
app.use('/client',express.static(__dirname+'/client'));
app.listen(8000)