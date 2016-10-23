        //extract the places and sentiment_array from the database
        //TODO: var place_array = [];
        //TODO: var sentiment_array = [];

        //put values from database into the arrays
        //function makeArray(){
        //    var toDoDB = new Firebase('https://twitter-emotions.firebaseio.com/');
        //    // This tells your web browser to respond when
        //    // SOMEONE (i.e. maybe not even you) adds to the database
        //    toDoDB.on('value', showItems);
        //    function showItems(snapshot){
        //        //gets data in database as a list
        //        var data = snapshot.val();
        //        //loops over each identifier in database
        //        for (var identifier in data) {
        //            for (var entry in identifier){
        //                place_array.push(data[identifier][entry].place)
        //                sentiment_array.push(data[identifier][entry].sentiment_array) 
        //            }
        //        }
        //    }
        //}

         
       var place_array = ["Boston, MA", "Westborough, MA", "Austin, TX","Boston, MA","Boston, MA","Boston, MA","Boston, MA","Boston, MA","Boston, MA","Boston, MA","Boston, MA","Boston, MA","Boston, MA"];
       var sentiment_array = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 0.0, 0.1, 0.2];
       var locations = [];
       var markers = [];
        var count = 0;
       // Create an array of alphabetical characters used to label the markers.
       var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
       function initMap() {

            //https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 3,
              center: {lat: 41.1158, lng: -98.0017}
            });
            var markerCluster = new MarkerClusterer(map, markers,{imagePath: 'data/', maxZoom: 12, gridSize: 10, sentiment: sentiment_array});
            console.log(markers);
            markerCluster.setMinClusterSize(1);
            console.log(markerCluster);
            var geocoder = new google.maps.Geocoder();
            //for the location points in location array
            for(var i = 0; i < place_array.length; i++){
                locations[i] = geocodeAddress(place_array[i], geocoder, map, markerCluster);
                console.log(locations[i]);
            }

            // Add some markers to the map.
            // Note: The code uses the JavaScript Array.prototype.map() method to
            // create an array of markers based on a given "locations" array.
            // The map() method here has nothing to do with the Google Maps API.
            /*var markers = place_array.map(function(a, i) {
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
                  label: sentiment_array[count % sentiment_array.length].toString()
                });
                count++;
                markerCluster.addMarker(marker);
                console.log("markerCluster: " + markerCluster);
                return marker; 
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            })};
        
    
