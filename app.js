var app = require("express")();
var os = require("./stats.js")();

app.route('/').get(function(req,res,err){
	res.send(JSON.stringify(os));
});

app.listen(8000)