'use strict';
function showPodcastLink() {
  var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
  if /* if we're on iOS, show the podcast links */
    (isMac ||
     (navigator.platform.indexOf("iPhone") != -1) ||
     (navigator.platform.indexOf("iPad") != -1) ||
     (navigator.platform.indexOf("iPod") != -1))
    {
      var podcastLink = document.getElementById("podcast-link");
      podcastLink.style.display = "block"
    }
}

function updatePageWithSermons(sermon_data) {
  addSermonSeries(sermon_data);
}

function addSermonSeries(sermon_data) {
  var sermonSeriesSection = document.getElementById("sermon-series-list");

  var sermonSeriesTemplate = document.getElementById('sermon_series_template');
  var sermonTemplate = document.getElementById('sermon_template');
  var series;
  
  for (series of sermon_data.series) {

    var sermonsForSeries = sermon_data.episodes.filter(sermon => sermon.seriesId == series.id)

    var sermonSeriesDiv = document.importNode(sermonSeriesTemplate.content, true);
    

    sermonSeriesDiv.querySelector(".series-title").textContent = series.title;
    sermonSeriesDiv.querySelector(".series-book").textContent = series.mainBook;
    //sermonSeriesDiv.querySelector(".series-service").textContent = series.service;
    sermonSeriesDiv.querySelector(".series-graphic").setAttribute("style",`background-image: url(${series.imageURL});`);

    var sermonList = sermonSeriesDiv.querySelector(".sermon-list");
    
    var sermon;
    for (sermon of sermonsForSeries) {
      var sermonDiv = document.importNode(sermonTemplate.content, true);

      var dateString = new Date(Date.parse(sermon.date)).toLocaleDateString();

      sermonDiv.querySelector(".sermon-title").textContent = sermon.title;
      sermonDiv.querySelector(".sermon-speaker").textContent = sermon.speaker;
      sermonDiv.querySelector(".sermon-passage").textContent = sermon.passage;
      sermonDiv.querySelector(".sermon-date").textContent = dateString;
      sermonDiv.querySelector(".sermon-download").setAttribute("href",sermon.audioFileURL);
      sermonDiv.querySelector(".sermon-player").setAttribute("src",sermon.audioFileURL);

      sermonList.appendChild(sermonDiv);
    }

    sermonSeriesSection.appendChild(sermonSeriesDiv);
  }
}

//Location of the sermon data.
var sermon_data_url = "http://ccmtalkstest.s3-website-eu-west-1.amazonaws.com/sermondata.json";
if (document.URL.includes("localhost")) {
  sermon_data_url = "/fakesermondata.json";
}

function loadSermons(sermon_data_url) {
  //Fetch the data and pass it to the function to draw it into the page.
  fetch(sermon_data_url)
    .then(function(response) {
      return response.json();
    })
    .then(updatePageWithSermons)
    .catch(function(rejection){
      console.log(rejection);
    });
}


//Do things when the DOM content has loaded so that we can safely manipulate the DOM.
document.addEventListener("DOMContentLoaded", function() {
  showPodcastLink();
  loadSermons(sermon_data_url);
});