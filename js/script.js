var i = 0;
var data, chart;
var options = {}

google.charts.load("current", {"packages": ["geochart", "corechart"], "mapsApiKey":"AIzaSyDXAYAWFC-XzhLB2WKPA24xEdvcEnZW6AM"});
google.charts.setOnLoadCallback(drawChart);

function drawChart(){
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
			// Travel Map
			function travel(){
				data = new google.visualization.DataTable();
				data.addColumn("string", "Student Favourite Travel Destination");

				for (var i = 0; i < DataFromJSON.length; i++) {
					data.addRow([DataFromJSON[i].travel]);
				}

				options = {
					datalessRegionColor: "#ebebeb",
					defaultColor: "#125078",
					backgroundColor: "#FFFFFF",
				}

				chart = new google.visualization.GeoChart(document.getElementById("studentTravel"));
				chart.draw(data, options);
			}

			// Age Chart
			function age(){
				data = new google.visualization.DataTable();
				data.addColumn("number", "Student Age");

				for (var i = 0; i < DataFromJSON.length; i++) {
					data.addRow([DataFromJSON[i].age]);
				}

				options = {
					title: "Student Age"
				}
				
				chart = new google.visualization.Histogram(document.getElementById("studentAge"));
				chart.draw(data, options);
			}

			// Gender Chart
			function gender(){
				var maleCount = 0;
				var femaleCount = 0;

				data = new google.visualization.DataTable();
				data.addColumn("string", "Male");
				data.addColumn("string", "Female");
				data.addColumn("number", "Female");
				data.addColumn("number", "Male");

				for (var i = 0; i < DataFromJSON.length; i++) {
					if(DataFromJSON[i].gender === "Male"){
						maleCount = "1";
					} else {
						femaleCount += 1;
					}
				}

				data.addRow([maleCount, femaleCount]);

				console.log(maleCount);
				console.log(femaleCount);

				options = {
					title: "Student Gender",
					pieHole: 0.4
				}
				
				chart = new google.visualization.PieChart(document.getElementById("studentGender"));
				chart.draw(data, options);
			}


			// Calling the functions
			travel();
			age();
			gender();

		}, error: function(){
			console.log("bad");
		}
	});
}