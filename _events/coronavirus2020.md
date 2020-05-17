---
name: Regarding Coronavirus
status: live
eventType: important-notice
order: 1
lastUpdated: 17:30 17 May 2020
features:
  - title: Blog
    description: |
      You can also check out our blog for some daily encouragement.
    buttonText: CCM Blog
    buttonLink: "/blog/"
  - title: Some further comments
    description: |
      Read some more detailed comments on the coronavirus situation from Matt Fuller.
    buttonText: Read more
    buttonLink: "/covid19/"
---

In the light of Government advice, all Church meetings will now be online.

Our two Sunday services will be streamed each week:

**10:15am** [Facebook Live](https://www.facebook.com/christchurch.mayfair.1) and <a id="youtube-stream-morning" href="https://youtu.be/JwvkDsgtMHE" data-service-date="2020-05-17">YouTube</a>

**6:00pm** [Facebook Live](https://www.facebook.com/christchurch.mayfair.1) and <a id="youtube-stream-evening" href="https://youtu.be/bX_l0fgUd5Y" data-service-date="2020-05-17">YouTube</a>

Midweek groups will be contacted by their leaders.

<script type="text/javascript">
/* When the YouTube links for the following week's streams have not yet been updated, point them to the YouTube channel page */
const IS_SUMMER_TIME = true;
const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/channel/UC_64p-NNiMF5DXoxhHE1Cgw";

const isLinkStale = (serviceDate, cutoffHour, cutoffMinute) =>
  new Date() >
  new Date(
    `${serviceDate}T${cutoffHour}:${cutoffMinute}:00+${
      IS_SUMMER_TIME ? "01" : "00"
    }:00`
  );

const morningStreamLinkElement = document.getElementById(
  "youtube-stream-morning"
);
const eveningStreamLinkElement = document.getElementById(
  "youtube-stream-evening"
);

if (isLinkStale(morningStreamLinkElement.dataset.serviceDate, 21, 00)) {
  morningStreamLinkElement.href = YOUTUBE_CHANNEL_URL;
}

if (isLinkStale(eveningStreamLinkElement.dataset.serviceDate, 23, 59)) {
  eveningStreamLinkElement.href = YOUTUBE_CHANNEL_URL;
}
</script>
