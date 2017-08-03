var i = 0;
var data, chart;
var options = {}

google.charts.load("current", {"packages": ["geochart"], "mapsApiKey":"AIzaSyDXAYAWFC-XzhLB2WKPA24xEdvcEnZW6AM"});
google.charts.setOnLoadCallback(drawChart);

function drawChart(){
	var data = new google.visualization.DataTable();
	data.addColumn("string", "Favourite Travel Destination");

	$.ajax({
		url: "js/clashboard.json",
		beforeSend: function(xhr){
			if(xhr.overrideMimeType){
				xhr.overrideMimeType("application/json");
			}
		},
		contentType: "application/json",
		dataType: "json",
		success: function(DataFromJSON){
			chart = new google.visualization.GeoChart(document.getElementById("studentTravel"));
			
				for (var i = 0; i < DataFromJSON.length; i++) {
					data.addRow([DataFromJSON[i].travel]);
				}
			
			chart.draw(data, options);

		}, error: function(){
			console.log("bad");
		}
	});
}