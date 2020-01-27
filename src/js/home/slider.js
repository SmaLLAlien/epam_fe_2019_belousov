function Slider(container, elementsToShow) {// eslint-disable-line max-statements
  this.container = container;
  this.controlLeft = this.container.querySelector('.controls__left');
  this.controlRight = this.container.querySelector('.controls__right');
  this.slider = container.querySelector('.slider');
  this.infinity = true;

  this.sliderElements = [...this.slider.children];
  const lengthOrigin = this.sliderElements.length;
  const countAddedElements = lengthOrigin * 2;
  const containerSliderWidth = window.getComputedStyle(this.container).width;

  // add clones to the end of slider
  this.sliderElements.forEach((elem) => {
    const clone = elem.cloneNode(true);
    clone.classList.add('clone');
    this.slider.append(clone);
  });

  // add clones to the start of the slider
  for (let i = this.sliderElements.length - 1; i >= 0; i--) {
    const clone = this.sliderElements[i].cloneNode(true);
    clone.classList.add('clone');
    this.slider.prepend(clone);
  }

  // 3 elements on page
  this.sliderElements[0].parentElement.style.width = `${33.33333 * (this.sliderElements.length + countAddedElements)}%`;

  // 1 element on page
  if (parseInt(containerSliderWidth) < 650) {
    elementsToShow = 1;
  }
  this.sliderElements[0].parentElement.style.width = `${(100 / elementsToShow) * (this.sliderElements.length * 3)}%`;

  // get slider element width
  const sliderElemWidth = window.getComputedStyle(this.sliderElements[0]).width;

  // hide two added elements at start
  this.slider.style.transform = `translateX(${-parseInt(sliderElemWidth) * countAddedElements / 2}px)`;
  const offsetStart = -parseInt(sliderElemWidth) * countAddedElements / 2; // 2 - elements before start;
  let offset = offsetStart;

  this.changeSlide = (e) => {
    e.target.removeEventListener('click', this.changeSlide); // prevent fast click
    this.slider.style.transition = 'all 0.5s';
    // translate container to delta = sliderElement width
    if (e.target === this.controlLeft) {
      toLeft.call(this);
    }
    if (e.target === this.controlRight) {
      toRight.call(this);
    }
    setTimeout(() => {
      e.target.addEventListener('click', this.changeSlide);
    }, 500);
  };
  this.makeChangeSlide = () => {
    this.controlLeft.addEventListener('click', this.changeSlide);
    this.controlRight.addEventListener('click', this.changeSlide);
  };

  this.makeInfinity = function () {
    if (this.infinity) {
      this.timerId = setInterval(toRight, 2500);
    }
  };

  const toLeft = () => {
    this.slider.style.transition = 'all 0.5s';

    // translate container to delta = sliderElement width
    offset += parseInt(sliderElemWidth);
    this.slider.style.transform = `translateX(${offset}px)`;

    // check for the end
    if (offset === 0) {
      setTimeout(() => {
        offset = offsetStart;
        this.slider.style.transition = ''; // that user will not see slider moves to needed position
        this.slider.style.transform = `translateX(${offset}px)`;
      }, 500);
    }
  };

  const toRight = () => {
    this.slider.style.transition = 'all 0.5s';
    offset -= parseInt(sliderElemWidth);
    this.slider.style.transform = `translateX(${offset}px)`;
    if (offset === offsetStart * 2) {
      setTimeout(() => {
        offset = offsetStart; // to start
        this.slider.style.transition = '';
        this.slider.style.transform = `translateX(${offset}px)`;
      }, 500);
    }
  };

  this.addListeners = function () {
    this.slider.addEventListener('mouseover', this, false);
    this.slider.addEventListener('mouseleave', this, false);
    this.controlLeft.addEventListener('mouseover', this, false);
    this.controlLeft.addEventListener('mouseleave', this, false);
    this.controlRight.addEventListener('mouseover', this, false);
    this.controlRight.addEventListener('mouseleave', this, false);
  };

  const stopSlider = () => {
    clearTimeout(this.timerId);
  };

  const runSlider = () => {
    this.timerId = setInterval(toRight, 2500);
  };

  this.handleEvent = function (event) {
    switch (event.type) {
      case 'mouseover':
        stopSlider();
        break;
      case 'mouseleave':
        runSlider();
        break;
    }
  };

  this.getToRight = () => {
    return toRight();
  };
  this.getToLeft = () => {
    return toLeft();
  };

  this.getOffset = () => {
    return offset;
  };
}

export function SliderTestimonials(container, elementsToShow) {
  Slider.call(this, container, elementsToShow);

  this.expandDescription = () => {
    this.slider.addEventListener('mouseover', expandDesc);
  };

  function expandDesc(event) {
    const target = event.target;
    if (target.classList.contains('slider__info')) {
      target.style.width = '100%';
      target.nextSibling.style.width = '0%';
      target.addEventListener('mouseleave', shrinkDesc);
    }
  }

  function shrinkDesc(event) {
    event.target.style.width = '50%';
    event.target.nextSibling.style.width = '50%';
    event.target.removeEventListener('mouseleave', shrinkDesc);
  }

  this.showPreview = () => {
    this.controlRight.addEventListener('mouseover', showNextPreview);
  };

  const showNextPreview = () => {
    const offset = this.getOffset();
    const elemWidth = window.getComputedStyle(this.sliderElements[0]).width;
    const position = Math.abs(offset / parseInt(elemWidth));
    const elements = [...this.slider.children];

    const divPreview = document.createElement('div');
    divPreview.classList.add('slider__previewRight');

    divPreview.style.background = elements[position + 1].querySelector('.slider__photo').style.background;
    elements[position].append(divPreview);

    this.controlRight.addEventListener('mouseleave', () => {
      divPreview.remove();
    });
  };
}

export function SliderLatestPortfolio(container, elementsToShow) {
  Slider.call(this, container, elementsToShow);

  this.swipe = () => {
    let mouseDownCoordinate = 0;
    let mouseUpCoordinate = 0;
    this.slider.addEventListener('mousedown', (event) => {
      mouseDownCoordinate = event.clientX;
    });

    this.slider.addEventListener('mouseup', (event) => {
      mouseUpCoordinate = event.clientX;
      if (mouseDownCoordinate - mouseUpCoordinate > 50) {
        this.getToRight();
      }
      if (mouseDownCoordinate - mouseUpCoordinate < -50) {
        this.getToLeft();
      }
    });
  };

  this.makeShadow = () => {
    this.slider.addEventListener('mouseover', addShadow);
  };

  function addShadow(event) {
    if (event.target.classList.contains('slider__preview')) {
      event.target.style.boxShadow = '0 3px 10px 0 #6d6d6d';
      event.target.addEventListener('mouseleave', removeShadow);
    }
  }

  function removeShadow(event) {
    event.target.style.boxShadow = '';
    event.target.removeEventListener('mouseleave', removeShadow);
  }
}
