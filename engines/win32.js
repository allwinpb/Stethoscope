var monitor = {};
var safeToUpdate = 0;

var cmd = require("child_process").exec

function sanitize(input){
	return input.split('\n')[1].split(' ')[0]
}

function update(){
	if(safeToUpdate <= 0){
		safeToUpdate = 3;
		cmd("wmic cpu get loadpercentage", function(error, stdout, stderr){
			monitor.cpuPercentage = parseInt(sanitize(stdout));
			safeToUpdate -= 1;
		});
		cmd("wmic os get freephysicalmemory", function(error, stdout, stderr){
			monitor.ramFree = parseInt(sanitize(stdout));
			monitor.ramPercentage = (1 - monitor.ramFree / monitor.ramMax)*100;
			safeToUpdate -= 1;
		});
		cmd("wmic logicaldisk get freespace", function(error, stdout, stderr){
			monitor.diskFree = parseInt(sanitize(stdout));
			monitor.diskPercentage = (1 - monitor.diskFree / monitor.diskMax)*100;
			safeToUpdate -= 1;
		});

	}
}

function setup(){
	cmd("wmic os get totalvisiblememorysize", function(error, stdout, stderr){
		monitor.ramMax = parseInt(sanitize(stdout));
	});
	cmd("wmic logicaldisk get size", function(error, stdout, stderr){
		monitor.diskMax = parseInt(sanitize(stdout));
	});
}

function init(){
	monitor.cpuPercentage = 0;
	monitor.ramFree = 0;
	monitor.ramMax = 1;
	monitor.ramPercentage = 0;
	monitor.diskFree = 0;
	monitor.diskMax = 1;
	monitor.diskPercentage = 0;
	setup();
	setInterval(update,1000);
	update();
}

init();
module.exports = function(){
	return monitor;
}