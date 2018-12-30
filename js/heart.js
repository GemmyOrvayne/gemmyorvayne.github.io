let hearts = document.getElementsByClassName('heart')
for (let i = 0; i < hearts.length; i++) {
  const heart = hearts[i]
  heart.onmousedown = function heartClickHandler (e) {
    const target = e.target
    //get post property
    sendHeart(target.dataset.post)
  }
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
