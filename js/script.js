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
				var data = new google.visualization.DataTable();
				data.addColumn("string", "Student Favourite Travel Destination");

				for (var i = 0; i < DataFromJSON.length; i++) {
					data.addRow([DataFromJSON[i].travel]);
				}

				var options = {
					datalessRegionColor: "#ebebeb",
					defaultColor: "#125078",
					backgroundColor: "#FFFFFF",
				}

				var chart = new google.visualization.GeoChart(document.getElementById("studentTravel"));
				chart.draw(data, options);
			}

			// Age Chart
			function age(){
				var data = new google.visualization.DataTable();
				data.addColumn("number", "Student Age");

				for (var i = 0; i < DataFromJSON.length; i++) {
					data.addRow([DataFromJSON[i].age]);
				}

				var options = {
					title: "Age of Students in Class"
				}
				
				var chart = new google.visualization.Histogram(document.getElementById("studentAge"));
				google.visualization.events.addListener(chart, 'select', clickEvent);
				chart.draw(data, options);

				function clickEvent(){
					var tableRow = chart.getSelection()[0];
					if(tableRow){
						var studentAge = data.getValue(tableRow.row, 0);
						document.getElementById('age-output').innerText = studentAge;
					}
				}
			}

			// Gender Chart
			function gender(){
				var data = google.visualization.arrayToDataTable([
					['Gender', 'Of Class'],
					['male',     5],
					['female',      3]		         
		        ]);

		        var options = {
		          title: 'Number of Each Gender in Class'		          
		        };		    

		        var chart = new google.visualization.PieChart(document.getElementById('studentGender'));
		        google.visualization.events.addListener(chart, 'select', clickEvent);
		        chart.draw(data, options);

		        function clickEvent(){
					var tableRow = chart.getSelection()[0];
					$("#gender-placeholder").hide();

					if(tableRow){
						var studentGender = data.getValue(tableRow.row, 0);
						if(studentGender === "male"){
							$("#male").show();
							$("#female").hide();
						} else if(studentGender === "female"){
							$("#female").show();
							$("#male").hide();
						}
						document.getElementById('gender-identifier').innerText = studentGender;
						$("#gender-output").show();
					}
				}
			}

			// Height Chart
			function height(){
				var data = new google.visualization.DataTable();
				data.addColumn("string", "Student Number");
				data.addColumn("number", "Student Height");

				for (var i = 0; i < DataFromJSON.length; i++) {
					data.addRow([DataFromJSON[i].studentNumber, DataFromJSON[i].height]);
				}

				var options = {
					title: "Height of Students in Class"
				}
				
				var chart = new google.visualization.BarChart(document.getElementById("studentHeight"));
				google.visualization.events.addListener(chart, 'select', clickEvent);
				chart.draw(data, options);

				function clickEvent(){
					var tableRow = chart.getSelection()[0];
					if(tableRow){
						var studentHeight = data.getValue(tableRow.row, 1);
						document.getElementById('height-output').innerText = studentHeight;
					}
				}
			}

			// Calling the functions
			travel();
			age();
			gender();
			height();


		}, error: function(){
			console.log("bad");
		}
	});
}