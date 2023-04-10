import SmoothScroll from 'smooth-scroll';

document.addEventListener('DOMContentLoaded', function () {
  initPopup();

  // eslint-disable-next-line no-new
  new SmoothScroll('a[href*="#"]', {
    updateURL: false,
    speed: 1000,
    speedAsDuration: false,
    easing: 'easeInOutQuint', // Easing pattern to use
  });
});

const ACTIVE_CLASS = 'active';

function initPopup() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popupNode) => {
    const closeBtn = popupNode.querySelector('.close');
    closeBtn.addEventListener('click', () => {
      popupNode.classList.remove(ACTIVE_CLASS);
    });
  });

  const openSalesPopupNodes = document.querySelectorAll('a[href="#contact-sales"]');
  openSalesPopupNodes.forEach((openNode) => {
    openNode.addEventListener('click', () => {
      document.querySelector('#contact-sales').classList.add(ACTIVE_CLASS);
    });
  });
}
