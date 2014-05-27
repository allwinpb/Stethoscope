var monitor = {};
var safeToUpdate = 0;

var cmd = require("child_process").exec

function update(){
	if(safeToUpdate <= 0){
		safeToUpdate = 1;
		cmd("iostat -c 1", function(error,stdout,stderr){
			var arr = stdout.split('\n')
			var data = arr[arr.length - 2].split(' ')
			data = data.filter(function(i){
				return parseFloat(i) != NaN
			})
			console.log(JSON.stringify(data));
			safeToUpdate -= 1
		})
	}
}

function init(){
	monitor.cpuPercentage = 0;
	monitor.ramFree = 0;
	monitor.ramMax = 1;
	monitor.ramPercentage = 0;
	monitor.diskFree = 0;
	monitor.diskMax = 1;
	monitor.diskPercentage = 0;
	setInterval(update,1000)
	update();
}
init();
module.exports = function(){
	return monitor;
}