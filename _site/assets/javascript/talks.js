function showPodcastLink() {
  var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
  if /* if we're on iOS, open in Apple Maps */
    (isMac ||
     (navigator.platform.indexOf("iPhone") != -1) ||
     (navigator.platform.indexOf("iPad") != -1) ||
     (navigator.platform.indexOf("iPod") != -1))
    {
      var podcastLink = document.getElementById("podcast-link");
      podcastLink.style.display = "block"
    }
}

showPodcastLink();

var talkList = document.getElementById("talk-list");
talkList.style.display = "block"
