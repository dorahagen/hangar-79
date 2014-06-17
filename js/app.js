				var repeatOnXAxis = false; // Do we need to repeat the image on the X-axis? Most likely you'll want to set this to false



			/*
			 * Helper function which normalizes the coords so that tiles can repeat across the X-axis (horizontally) like the standard Google map tiles.
			 * ----------------
			 */

				function getNormalizedCoord(coord, zoom) {
					if (!repeatOnXAxis) return coord;

					var y = coord.y;
					var x = coord.x;

					// tile range in one direction range is dependent on zoom level
					// 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
					var tileRange = 1 << zoom;

					// don't repeat across Y-axis (vertically)
					if (y < 0 || y >= tileRange) {
						return null;
					}

					// repeat across X-axis
					if (x < 0 || x >= tileRange) {
						x = (x % tileRange + tileRange) % tileRange;
					}

					return {
						x: x,
						y: y
					};

				}


			/*
			 * Main functionality
			 * ----------------
			 */

				window.onload = function() {

					// Define custom map type
					var customMapType = new google.maps.ImageMapType({
						getTileUrl: function(coord, zoom) {
							var normalizedCoord = getNormalizedCoord(coord, zoom);
							if(normalizedCoord && (normalizedCoord.x < Math.pow(2, zoom)) && (normalizedCoord.x > -1) && (normalizedCoord.y < Math.pow(2, zoom)) && (normalizedCoord.y > -1)) {
								return zoom + '/' + normalizedCoord.x + '/' + normalizedCoord.y + '.jpg';
							} else {
								return 'empty.jpg';
							}
						},
						tileSize: new google.maps.Size(256, 256),
						maxZoom: 5,
						name: 'hangarConcept'
					});

					// Basic options for map
					var mapOptions = {
						center: new google.maps.LatLng(0, 0),
						zoom: 2,
						minZoom: 0,
						streetViewControl: false,
						mapTypeControl: false,
						mapTypeControlOptions: {
							mapTypeIds: ["custom"]
						}
					};

					// Initiate the map and hook custom map type to it
					var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
					map.mapTypes.set('custom', customMapType);
					map.setMapTypeId('custom');

					// Define areas that we're zooming in on
					$("#area-yellow").on("click", function() {
						var LatLng = new google.maps.LatLng(30, -50);
						map.panTo(LatLng);
						map.setZoom(4);
					});

					$("#area-bridge").on("click", function() {
						var LatLng = new google.maps.LatLng(40, 50);
						map.panTo(LatLng);
						map.setZoom(4);
					});

					$("#area-theater").on("click", function() {
						var LatLng = new google.maps.LatLng(30, 95);
						map.panTo(LatLng);
						map.setZoom(4);
					});

					$("#area-reset").on("click", function() {
						var LatLng = new google.maps.LatLng(0, 0);
						map.panTo(LatLng);
						map.setZoom(2);
					});

				};





