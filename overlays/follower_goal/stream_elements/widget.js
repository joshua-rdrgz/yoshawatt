const widget = {
  followerCount: 0,
  twitchFollowerGoal: 0,
  fieldData: null,
  progressBar: null,
  progressElement: null,
  textElement: null,
};

window.addEventListener('onWidgetLoad', function (obj) {
  const data = obj['detail']['session']['data'];
  const fieldData = obj['detail']['fieldData'];

  console.log('DATA: ', data);

  widget.followerCount = data['follower-total']['count'];
  widget.twitchFollowerGoal = data['follower-goal']['amount'];
  widget.fieldData = fieldData;
  widget.progressBar = document.querySelector('.follower-goal__progress-bar');
  widget.progressElement = document.querySelector('.follower-goal__progress');
  widget.textElement = document.querySelector('.follower-goal__text');

  updateProgressBar();
});

window.addEventListener('onSessionUpdate', function (obj) {
  const session = obj['detail']['session'];

  widget.followerCount = session['follower-total']['count'];
  widget.twitchFollowerGoal = session['follower-goal']['count'];

  updateProgressBar();
});

function updateProgressBar() {
  const theFollowerGoal =
    widget.fieldData['followerGoal'] > 0
      ? widget.fieldData['followerGoal']
      : widget.twitchFollowerGoal;

  const progress = Math.min(widget.followerCount / theFollowerGoal, 1);

  widget.progressElement.style.width = `${progress * 100}%`;
  widget.textElement.textContent = `${widget.followerCount} / ${theFollowerGoal}`;

  if (progress >= 1) {
    widget.progressBar.classList.add('completed');
    widget.textElement.style.right = '50%';
    widget.textElement.style.transform = 'translate(50%, -50%)';
  } else if (progress >= 0.5) {
    widget.progressBar.classList.remove('completed');
    widget.textElement.style.right = '10px';
    widget.textElement.style.transform = 'translateY(-50%)';
    widget.textElement.style.color =
      widget.fieldData['progressBarTextColorInside'];
  } else {
    widget.progressBar.classList.remove('completed');
    widget.textElement.style.left = 'calc(100% + 5px)';
    widget.textElement.style.transform = 'translateY(-50%)';
    widget.textElement.style.color =
      widget.fieldData['progressBarTextColorOutside'];
  }
}
