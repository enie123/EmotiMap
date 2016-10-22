        var location_points = ["Boston, MA", "Westborough, MA", "Austin, TX"];
        var locations = [];
        function initMap() {


            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 3,
              center: {lat: -28.024, lng: 140.887}
            });

            // Create an array of alphabetical characters used to label the markers.
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                        
            var geocoder = new google.maps.Geocoder();
            //for the location points in location array
            for(var i = 0; i < location_points.length; i++){
                locations.push(geocodeAddress(location_points[i], geocoder, map));
            }

            // Add some markers to the map.
            // Note: The code uses the JavaScript Array.prototype.map() method to
            // create an array of markers based on a given "locations" array.
            // The map() method here has nothing to do with the Google Maps API.
            var markers = locations.map(function(location, i) {
              return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
              });
            });
            for(var i =0; i<locations.length; i++){
                console.log(locations[i]);
            }
            // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map, markers,
                 {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});           
            

        }
        function geocodeAddress(data, geocoder, resultsMap) {
            var address = data;
            geocoder.geocode({'address': data}, function(results, status) {
              if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                  map: resultsMap,
                  position: results[0].geometry.location
                });
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
        } 
