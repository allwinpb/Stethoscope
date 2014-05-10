var app = require("express")();

app.route('/').get(function(req,res,err){
	res.send("Hello world");
});

app.listen(8000)