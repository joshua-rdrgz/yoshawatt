const followerNameContainerEl = document.querySelector(
  '.follower-name-container'
);
const scrollContainerEl =
  followerNameContainerEl.querySelector('.scroll-container');
const latestFollowerEl = document.getElementById('latest-follower-name');
let containerWidth = 300; // will be updated by StreamElements
let scrollSpeed = 10; // will be updated by StreamElements

/* EVENT LISTENERS */
window.addEventListener('onWidgetLoad', function (obj) {
  const data = obj['detail']['session']['data'];
  const fieldData = obj['detail']['fieldData'];
  containerWidth = fieldData['containerWidth'];
  scrollSpeed = fieldData['scrollSpeed'];
  const latestFollower = data['follower-latest']['name'];
  updateFollowerName(latestFollower);
});

window.addEventListener('onEventReceived', function (obj) {
  const data = obj['detail']['event'];
  if (data['displayName']) {
    updateFollowerName(data['displayName']);
  }
});

/* SETUP FUNCTIONS */
function updateFollowerName(name) {
  latestFollowerEl.textContent = name;
  setupFollowerNameDOM();
}

function setupFollowerNameDOM() {
  const textWidth = latestFollowerEl.scrollWidth;
  const padding = Math.max(50, (containerWidth - textWidth) / 2);

  const textFitsInContainer = textWidth + padding * 2 <= containerWidth;

  // Check if the text fits in the container with padding
  if (textFitsInContainer) {
    createStaticSetup(padding);
    return;
  }

  createScrollingSetup(padding, textWidth);
}

function createStaticSetup(padding) {
  removeExistingClones();

  // Add padding to text
  latestFollowerEl.style.paddingRight = `${padding}px`;
  latestFollowerEl.style.paddingLeft = `${padding}px`;

  // Remove animation and mask
  followerNameContainerEl.classList.remove('scrolling');
  followerNameContainerEl.removeAttribute('data-animated');
  scrollContainerEl.style.animationDuration = 'none';
}

function createScrollingSetup(padding, textWidth) {
  removeExistingClones();

  // Add right padding to text content
  latestFollowerEl.style.paddingRight = `${padding}px`;

  // Create clone, add left padding, append to container
  const cloneEl = latestFollowerEl.cloneNode(true);
  cloneEl.setAttribute('aria-hidden', 'true');
  cloneEl.style.paddingLeft = `${padding}px`;
  scrollContainerEl.appendChild(cloneEl);

  // Calculate the animation proportion
  const totalWidth = 2 * textWidth + 2 * padding;
  const animationProportion = (containerWidth + textWidth) / totalWidth;

  // Apply the animation and mask
  followerNameContainerEl.classList.add('scrolling'); // adds mask
  followerNameContainerEl.setAttribute('data-animated', 'true'); // adds animation
  scrollContainerEl.style.animationDuration = `${
    (1 / animationProportion) * scrollSpeed
  }s`;
}

function removeExistingClones() {
  const existingClones = scrollContainerEl.querySelectorAll(
    '[aria-hidden="true"]'
  );

  existingClones.forEach((clone) => clone.remove());
}
