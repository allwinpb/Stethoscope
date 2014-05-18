var os = require('os')
module.exports = function(){
	var engine;
	if(os.platform() == 'win32'){
		engine = require('./engines/win32.js')
	}else if(os.platform() == 'linux'){
		engine = require('./engines/linux.js')
	}else if(os.platform() == 'osx'){
		engine = require('./engines/osx.js')
	}
	return engine();
}