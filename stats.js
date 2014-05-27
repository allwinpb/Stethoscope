var engine;
var platform = require('os').platform();

if(platform == 'win32'){
	console.log("OS: Windows")
	engine = require('./engines/win32.js')
}else if(platform == 'linux'){
	console.log("OS: Linux")
	engine = require('./engines/linux.js')
}else if(platform == 'darwin'){
	console.log("OS: Mac OS X")
	engine = require('./engines/osx.js')
}

console.log("Starting Stethoscope...")

module.exports = function(){
	return engine();
}