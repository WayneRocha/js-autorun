const blockedElements = document.querySelectorAll('.blocked');
const bannerElement = document.querySelector('#blocked-results-banner');

blockedElements.forEach(element => element.classList.remove('blocked'));
bannerElement.remove();
