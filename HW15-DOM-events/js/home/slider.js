const containerSlider = document.querySelector('.latest-portfolio__slider > .container');
const containerSliderWidth = window.getComputedStyle(containerSlider).width;
const slider = containerSlider.querySelector('.slider');
const controlLeft = containerSlider.querySelector('.controls__left');
const controlRight = containerSlider.querySelector('.controls__right');

const sliderElements = [...slider.getElementsByClassName('slider__slide')];
const lengthOrigin = sliderElements.length;

// add clones to the end of slider
sliderElements.forEach((elem) => {
  const clone = elem.cloneNode(true);
  clone.classList.add('clone');
  slider.append(clone);
});

// add clones to the start of the slider
for (let i = sliderElements.length - 1; i >= 0; i--) {
  const clone = sliderElements[i].cloneNode(true);
  clone.classList.add('clone');
  slider.prepend(clone);
}

const countAddedElements = lengthOrigin * 2;

// 3 elements on page
sliderElements[0].parentElement.style.width = `${33.33333 * (sliderElements.length + countAddedElements)}%`;

// 2 elements on page
if (parseInt(containerSliderWidth) < 990) {
  sliderElements[0].parentElement.style.width = `${50 * (sliderElements.length + countAddedElements)}%`;
}

// 1 element on page
if (parseInt(containerSliderWidth) < 600) {
  sliderElements[0].parentElement.style.width = `${100 * (sliderElements.length + countAddedElements)}%`;
}

// get slider element width
const sliderElemWidth = window.getComputedStyle(sliderElements[0]).width;

// hide two added elements at start
slider.style.transform = `translateX(${-parseInt(sliderElemWidth) * countAddedElements / 2}px)`;
const offsetStart = -parseInt(sliderElemWidth) * countAddedElements / 2; // 2 - elements before start;
let offset = offsetStart;

let timerId = setInterval(toRight, 2500);

controlLeft.addEventListener('click', toLeft);
function toLeft() {
  controlLeft.removeEventListener('click', toLeft); // prevent fast click

  slider.style.transition = 'all 0.5s';

  // translate container to delta = sliderElement width
  offset += parseInt(sliderElemWidth);
  slider.style.transform = `translateX(${offset}px)`;

  // check for the end
  if (offset === 0) {
    setTimeout(() => {
      offset = offsetStart;
      slider.style.transition = ''; // that user will not see slider moves to needed position
      slider.style.transform = `translateX(${offset}px)`;
    }, 500);
  }
  setTimeout(() => {
    controlLeft.addEventListener('click', toLeft);
  }, 500);
}

controlRight.addEventListener('click', toRight);
function toRight() {
  controlRight.removeEventListener('click', toRight);
  slider.style.transition = 'all 0.5s';
  offset -= parseInt(sliderElemWidth);
  slider.style.transform = `translateX(${offset}px)`;
  if (offset === offsetStart * 2) {
    setTimeout(() => {
      offset = offsetStart; // to start
      slider.style.transition = '';
      slider.style.transform = `translateX(${offset}px)`;
    }, 500);
  }

  setTimeout(() => {
    controlRight.addEventListener('click', toRight);
  }, 500);
}

slider.addEventListener('mouseover', () => {
  clearTimeout(timerId);
});

slider.addEventListener('mouseleave', () => {
  timerId = setInterval(toRight, 2500);
});

controlLeft.addEventListener('mouseover', () => {
  clearTimeout(timerId);
});

controlLeft.addEventListener('mouseleave', () => {
  timerId = setInterval(toRight, 2500);
});

controlRight.addEventListener('mouseover', () => {
  clearTimeout(timerId);
});

controlRight.addEventListener('mouseleave', () => {
  timerId = setInterval(toRight, 2500);
});

let mouseDownCoordinate = 0;
let mouseUpCoordinate = 0;
slider.addEventListener('mousedown', (event) => {
  mouseDownCoordinate = event.clientX;
});

slider.addEventListener('mouseup', (event) => {
  mouseUpCoordinate = event.clientX;
  if (mouseDownCoordinate - mouseUpCoordinate > 50) {
    toRight();
  }
  if (mouseDownCoordinate - mouseUpCoordinate < -50) {
    toLeft();
  }
});
