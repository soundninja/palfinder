$(document).ready(function(){
	//starting database
	var benches = new Firebase('https://torrid-fire-7768.firebaseio.com/');
	
	//initialize with map of SFs
	var map = new GMaps({
    	el: '#map',
    	lat: 37.546761,
    	lng: -122.302283,
    	zoom:16
  	});


	//socket with firebase open to hear value changes
	benches.on("value", function(snapshot) {

		//reset markers
  		map.removeMarkers();

		snapshot.forEach(function(childSnapshot) {

			var key = childSnapshot.key();
			var childData = childSnapshot.val();


			//add markers on map
			map.addMarker({
				lat: childData.lat,
				lng: childData.lng,
				label: childData.topic,
				infoWindow: {
  					content: '<p>' + childData.topic+ '</p>'
				}
			});

			/*map.drawOverlay({
				lat: childData.lat,
				lng: childData.lng,
				content:'<div class="overlay">'+childData.class+'</div>'
			});*/

		});

	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});


	
});