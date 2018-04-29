function mapsSelector() {
  var latitude = 51.505263;
  var longitude = -0.148704;
  var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
  if /* if we're on iOS, open in Apple Maps */
    ((navigator.platform.indexOf("iPhone") != -1) ||
     (navigator.platform.indexOf("iPad") != -1) ||
     (navigator.platform.indexOf("iPod") != -1))
    window.open(`maps://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`);
  // else if (isMac) {
  //   window.open(`maps://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`,'_self');
  // }
  else {/* else use Google */
    window.open(`https://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`);
  }
}

// var directions = document.getElementById("directions-button");
// directions.style.display = "block"

var directionsLink = document.getElementById('directions-button');
directionsLink.onclick = mapsSelector;
