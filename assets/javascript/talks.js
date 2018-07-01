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

function gotoPage(pageNumber) {
  loadPage(pageNumber,mainQuery(seriesPerPage,pageNumber));
}

function drawPageLinks(data) {
  var numberOfSeries = data.data._allSeriesMeta.count;
  var numberOfPages = Math.ceil(numberOfSeries / seriesPerPage);
  document.querySelectorAll('.pagelinks').forEach(function(pageLinksDiv) {
    var pageNumber;
    for (pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
      var pageLinkElement = document.createElement('div');
      pageLinkElement.className = "pagelink";
      pageLinkElement.innerHTML = `<a href="#" onclick="gotoPage(${pageNumber});return false;">${pageNumber.toString()}</a>`;
      pageLinksDiv.appendChild(pageLinkElement);
    }
  });

}

function addSermonSeries(sermon_data) {
  console.log(sermon_data);
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
      sermonDiv.querySelector(".sermon-passage").innerHTML = `<a href="https://www.biblegateway.com/passage/?search=${sermon.passage}&version=NIVUK">${sermon.passage}</a>`;
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

var seriesPerPage = 4;

function mainQuery(pageSize,pageNumber) {
  return { "query" :
  `query {
    allSeries(first: ${pageSize} skip: ${(pageNumber - 1) * pageSize}) {
      name
      image3x2Url
      sermons(orderBy: preachedAt_ASC) {
        name
        preachedAt
        url
        passage
        speakers {
          name
        }
      }
    }
  }`};
}

var serviceID = "cjhoh936q44gz0181840a6nlj";
var graphCoolURL = `https://api.graph.cool/simple/v1/${serviceID}`;

function getSeriesCountFromGraphCool() {
  var q = {"query":"query {_allSeriesMeta {count}}"};
  queryGraphCool(graphCoolURL,q)
  .then(drawPageLinks)
  .catch(function(rejection){
    console.log(rejection);
  });
}

function getTalksFromGraphCool(q,pageNumber,pageSize) {
  console.log("----");
  console.log(q);
  console.log("----");
  queryGraphCool(graphCoolURL,q)
  .then(updatePageWithSermons)
  .then(hideLoading)
  .catch(function(rejection){
    hideLoading();
    showLoadingError();
    console.log(rejection);
  });
}

function showLoading() {
  var loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = "block";
}

function hideLoading() {
  var loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = "none";
}

function showLoadingError() {
  var loadingErrorDiv = document.getElementById("loading-error");
  loadingErrorDiv.style.display = "block";
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function clearDiv() {
  document.getElementById("sermon-series-list").innerHTML = "";
  // document.querySelectorAll('.pagelinks').forEach(function(pageLinksDiv) {
  //   pageLinksDiv.innerHTML = "";
  // });
}

function setCurrentPage(pageNumber) {
  console.log(pageNumber);
  //remove class from old one.
  document.querySelectorAll(".current-pagelink").forEach(function(pagelinkDiv) {
    pagelinkDiv.className = "pagelink";
  });
  document.querySelectorAll(".pagelink").forEach(function(pagelinkDiv) {
    var links = pagelinkDiv.getElementsByTagName('a');
    var link = links.length ? links[0] : null;
    if (link) {
      console.log(link.textContent);
      if (parseInt(link.textContent) == pageNumber) {
        console.log("Got matching pagelink!");
        pagelinkDiv.className = "pagelink current-pagelink";
      }
    }
  });
}

function loadPage(pageNumber,query) {
  console.log("----");
  console.log(query);
  console.log("----");
  clearDiv()
  showLoading();
  sleep(50).then(() => {
    getTalksFromGraphCool(query,pageNumber,seriesPerPage);
    setCurrentPage(pageNumber);
  });
}

function setupPaginationLinks(){
  getSeriesCountFromGraphCool();
}

//Do things when the DOM content has loaded so that we can safely manipulate the DOM.
document.addEventListener("DOMContentLoaded", function() {
  showPodcastLink();
  var startingPage = 1;
  setupPaginationLinks();
  var q = mainQuery(seriesPerPage,startingPage);
  console.log(q);
  loadPage(startingPage,q);
});
