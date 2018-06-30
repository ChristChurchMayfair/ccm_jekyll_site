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
  
  for (series of sermon_data.data.allSeries) {

    var sermonsForSeries = series.sermons

    var sermonSeriesDiv = document.importNode(sermonSeriesTemplate.content, true);
    

    sermonSeriesDiv.querySelector(".series-title").textContent = series.name;
    sermonSeriesDiv.querySelector(".series-book").textContent = "No Book"
    //sermonSeriesDiv.querySelector(".series-service").textContent = series.service;
    sermonSeriesDiv.querySelector(".series-graphic").setAttribute("style",`background-image: url(${series.image3x2Url});`);

    var sermonList = sermonSeriesDiv.querySelector(".sermon-list");
    
    var sermon;
    for (sermon of sermonsForSeries) {
      var sermonDiv = document.importNode(sermonTemplate.content, true);

      var dateString = new Date(Date.parse(sermon.preachedAt)).toLocaleDateString();

      sermonDiv.querySelector(".sermon-title").textContent = sermon.name;
      sermonDiv.querySelector(".sermon-speaker").textContent = sermon.speakers[0].name;
      sermonDiv.querySelector(".sermon-passage").textContent = sermon.passage;
      sermonDiv.querySelector(".sermon-date").textContent = dateString;
      sermonDiv.querySelector(".sermon-download").setAttribute("href",sermon.url);
      sermonDiv.querySelector(".sermon-player").setAttribute("src",sermon.url);

      sermonList.appendChild(sermonDiv);
    }

    sermonSeriesSection.appendChild(sermonSeriesDiv);
  }
}
function queryGraphCool(url, query) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(query), // must match 'Content-Type' header
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
  .then(response => response.json()) // parses response to JSON
}

function getTalksFromGraphCool(serviceID) {
  var graphCoolURL = `https://api.graph.cool/simple/v1/${serviceID}`;
  console.log(graphCoolURL);
  var query = {"query":
  `query {
    allSeries(first: 4) {
      name
      image3x2Url
      sermons {
        name
        preachedAt
        url
        speakers {
          name
        }
      }
    }
  }`};

  queryGraphCool(graphCoolURL,query)
  .then(updatePageWithSermons)
  .catch(function(rejection){
    console.log(rejection);
  });
}

var serviceID = "cjhoh936q44gz0181840a6nlj"

//Do things when the DOM content has loaded so that we can safely manipulate the DOM.
document.addEventListener("DOMContentLoaded", function() {
  showPodcastLink();
  getTalksFromGraphCool(serviceID); 
});
