        var location_points = ["Boston, MA", "Westborough, MA", "Austin, TX","Boston, MA","Boston, MA","Boston, MA","Boston, MA","Boston, MA","Boston, MA","Boston, MA","Boston, MA","Boston, MA","Boston, MA"];
        var locations = [];
        var markers = [];
        var count = 0;
        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        function initMap() {


            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 3,
              center: {lat: -28.024, lng: 140.887}
            });
            var markerCluster = new MarkerClusterer(map, markers,{imagePath: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m', maxZoom: 12, gridSize: 10});
            markerCluster.setMinClusterSize(1);
                        
            var geocoder = new google.maps.Geocoder();
            //for the location points in location array
            for(var i = 0; i < location_points.length; i++){
                locations[i] = geocodeAddress(location_points[i], geocoder, map, markerCluster);
                console.log(locations[i]);
            }

            // Add some markers to the map.
            // Note: The code uses the JavaScript Array.prototype.map() method to
            // create an array of markers based on a given "locations" array.
            // The map() method here has nothing to do with the Google Maps API.
            /*var markers = location_points.map(function(a, i) {
              return new google.maps.Marker({
                position: new google.maps.LatLng(a.position.lat, a.position.lng),
                label: labels[i % labels.length]
              });
            });*/
            for(var i =0; i<locations.length; i++){
                console.log(locations[i]);
            };
            // Add a marker clusterer to manage the markers.
            //var markerCluster = new MarkerClusterer(map, [new google.maps.Marker({ position: {lat: -31.563910, lng: 147.154312}}),  new google.maps.Marker({position: {lat: -31.563910, lng: 147.154312}})], {imagePath: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m', maxZoom: 3, gridSize: 10});      
            //markerCluster.addMarker(new google.maps.Marker({ position: {lat: -31.061925, lng: 145.194293}}), false);
        }
        function geocodeAddress(data, geocoder, resultsMap, markerCluster) {
            var address = data;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': data}, function(results, status) {
              if (status === 'OK') {
                console.log(results[0].geometry.location);
                var marker = new google.maps.Marker({ 
                  map: resultsMap,
                  position: results[0].geometry.location,
                  label: labels[count++ % labels.length]
                });
                markerCluster.addMarker(marker);
                return marker; 
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            })};
        
    
