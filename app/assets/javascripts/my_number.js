$(document).ready(function(){
	$('[data-toggle="popover"]').popover()

	$(".goal-square img").click(function() {
		$(this).css("opacity", "1")
		var goal = $(this).attr("id").replace("goal-button-","")
		$("#goal-circle-" + goal).show();
	});

	$(".profile-image").click(function() {
		previous = 17
		current = 1;
		timer = setInterval(function() {

			$("#goal-circle-" + previous).hide();
			$("#goal-circle-" + current).show();

			previous = current;
			current ++;

			if (current == 18) {
				current = 1;
			}
		}, 300);
	});

	var map;
	var markerImage = "assets/goal-circle/all-small.png"

	navigator.geolocation.getCurrentPosition(localisedMap, unlocalisedMap)

	function localisedMap(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		var mapProp = {
	    	center:new google.maps.LatLng(latitude,longitude),
		    zoom:7,
		    mapTypeId:google.maps.MapTypeId.SATELLITE
		};
  		map = new google.maps.Map(document.getElementById("googleMap"),mapProp);		
  		var marker = new google.maps.Marker({
    		position: new google.maps.LatLng(latitude, longitude),
    		map: map,
    		icon: markerImage,
		});
		addMarkers();
  	}

	function unlocalisedMap() {
		var mapProp = {
	    	center:new google.maps.LatLng(51.508742,-0.120850),
		    zoom:2,
		    mapTypeId:google.maps.MapTypeId.SATELLITE
		};
	  	map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	  	addMarkers();
	}

	function addMarkers() {
		for (var i =0; i < 500; i++) {
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(getRandomInRange(180,-180,3), getRandomInRange(180,-180,3)),
				map: map,
				icon: markerImage,
			})
		}
	}

	function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
})