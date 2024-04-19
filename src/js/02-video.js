import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function savePlaybackTime(time) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(time));
}

function getSavedPlaybackTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  return savedTime ? JSON.parse(savedTime) : 0;
}

const throttledSavePlaybackTime = throttle(savePlaybackTime, 1000);

player.on('play', function (event) {
  const currentTime = event.seconds;
  throttledSavePlaybackTime(currentTime);
});

document.addEventListener('DOMContentLoaded', function () {
  const savedTime = getSavedPlaybackTime();

  player
    .setCurrentTime(savedTime)
    .then(function (seconds) {
      console.log('Video is now at ' + seconds + ' seconds');
    })
    .catch(function (error) {
      console.error('Failed to set current time:', error.name);
    });
});
