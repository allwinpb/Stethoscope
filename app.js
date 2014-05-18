var app = require("express")();
var os = require("./stats.js")();

app.route('/').get(function(req,res,err){
	res.send(JSON.stringify(os));
});
app.route('/client').get(function(req,res,err){
	res.sendfile('./client.html');
})
app.listen(8000)