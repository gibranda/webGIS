
function fetchData()	{
	
	 var map = L.map('map').setView([51.505, -0.09], 2);
 
L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', 
{attribution:'Imagery � <a href="http://www.thunderforest.com/terms/">Thunderforest</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Map data � <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>', maxZoom: 2
}).addTo(map);
	
	//Define array to hold results returned from server
	tweetData = new Array();
	
	//AJAX request to server; accepts a URL to which the request is sent 
	//and a callback function to execute if the request is successful. 
	$.getJSON("http://dialogplus.leeds.ac.uk/geog5870/web01/fetchData.php", function(results)	{ 
		
		//Populate tweetData with results
		for (var i = 0; i < results.length; i++ )	{
			
			tweetData.push ({
				id: results[i].id, 
				body: results[i].body, 
				lat: results[i].lat, 
				lon: results[i].lon
			}); 
		}
		
		plotTweets(); 
	});
	
	function plotTweets()	{	
		//Loop through tweetData to create marker at each location 
		for (var i = 0; i< tweetData.length; i++)	{ 
			var markerLocation = new L.LatLng(tweetData[i].lat, tweetData[i].lon);
			var marker = new L.Marker(markerLocation);
				
			map.addLayer(marker);
			marker.bindPopup(tweetData[i].body);
		}
	}
}