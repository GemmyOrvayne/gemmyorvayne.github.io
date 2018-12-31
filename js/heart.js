const emptyHeartIcon = '<img src="/img/icons/emptyHeartIcon.png" />'
const fullHeartIcon = '<img src="/img/icons/fullHeartIcon.png" />'

function getHearts(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', window.API_PATH + '/heart')
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onload = function() {
      if (xhr.status === 200) {
        var heartsRaw = JSON.parse(xhr.responseText)
        callback(heartsRaw.hearts)
      } else if (xhr.status !== 200) {
          console.error('Request failed.  Returned status of ' + xhr.status);
      }
  };
  xhr.send();
}

function deleteHeart(post) {
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', window.API_PATH + '/heart/' + post)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onload = function() {
      if (xhr.status === 200) {
          console.log('unliked');
      } else if (xhr.status !== 200) {
          console.error('Request failed.  Returned status of ' + xhr.status);
      }
  };
  xhr.send();
}

function sendHeart(post) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', window.API_PATH + '/heart/' + post)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onload = function() {
      if (xhr.status === 200) {
          console.log('liked');
      } else if (xhr.status !== 200) {
          console.error('Request failed.  Returned status of ' + xhr.status);
      }
  };
  xhr.send();
}

function setupHeart(heart, heartIcon, heartClickHandler) {
  heart.onmousedown = heartClickHandler
  heart.innerHTML = heartIcon
}

function setupUnlikedHeart(heart) {
  setupHeart(heart, emptyHeartIcon, (e) => {
    sendHeart(heart.dataset.post)
    setupLikedHeart(heart)
  })
}

function setupLikedHeart(heart) {
  setupHeart(heart, fullHeartIcon, (e) => {
    deleteHeart(heart.dataset.post)
    setupUnlikedHeart(heart)
  })
}

getHearts((alreadyHeartedParam) => {
  const alreadyHearted = alreadyHeartedParam.map((item) => {
    return item.post
  })
  console.log(alreadyHearted)
  let hearts = document.getElementsByClassName('heart')
  for (let i = 0; i < hearts.length; i++) {
    const heart = hearts[i]
    console.log({heart})
    if (alreadyHearted.indexOf(heart.dataset.post) === -1) {
      setupUnlikedHeart(heart)
    } else {
      setupLikedHeart(heart)
    }
  }
})
