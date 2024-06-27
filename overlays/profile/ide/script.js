const usernameSpan = document.querySelector('span.username');
const profileImg = document.querySelector('img.profile-image');

window.addEventListener('onWidgetLoad', function (obj) {
  const channel = obj['detail']['channel'];
  const fieldData = obj['detail']['fieldData'];

  setupUsername(channel['username']);
  setupProfile(channel, fieldData);
});

function setupUsername(userName) {
  usernameSpan.textContent = userName;
}

function setupProfile(channel, fieldData) {
  const customProfilePic = fieldData['profilePic'];
  const twitchAvatar = channel['avatar'];

  if (customProfilePic) {
    // User designated custom profile picture
    profileImg.src = customProfilePic;
  } else {
    // User did not designate custom profile picture,
    // Use Twitch Avatar as default
    profileImg.src = twitchAvatar;
  }
}

/* IDE SETUP */
setupUsername('yoshawatt');
setupProfile({ avatar: null }, { profilePic: null });
