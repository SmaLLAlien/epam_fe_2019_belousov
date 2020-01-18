document.addEventListener('DOMContentLoaded', main);

import {SliderTestimonials, SliderLatestPortfolio} from './slider.js';
import {makeAddPostElement} from '../addPost.js';

function main() {
  const url = 'js/home/data.json';
  getData(url)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      const wrapper = document.getElementsByClassName('wrapper')[0];
      makeHeader(data);
      makeAboutUsSection(data);
      makeSectionLatestPost(data);
      makeLatestPortfolioSection(data);
      makeTestMonialsSection(data);
      makeContactUs(data);
      const footer = document.getElementsByClassName('footer')[0];
      wrapper.append(footer);
      makeToHome();
      makeAddPostElement();
      makeSlidersWork();
    });
  // .catch((error) => {
  //   alert(error.message);
  // });
}

function getData(url) {
  return fetch(url, {
    method: 'GET',
  });
}

const makeElement = (elementType, elementClass) => {
  const element = document.createElement(elementType);
  element.classList.add(elementClass);
  return element;
};

function makeSlidersWork() {
  const containerSlider1 = document.querySelector('.latest-portfolio__slider > .container');
  const testimonials__content = document.querySelector('.testimonials__content');

  const testimonials = new SliderTestimonials(testimonials__content, 1);
  const lastPortfolio = new SliderLatestPortfolio(containerSlider1, 3);
  testimonials.addListeners();
  testimonials.makeInfinity();
  lastPortfolio.addListeners();
  lastPortfolio.makeInfinity();
  lastPortfolio.swipe();
  lastPortfolio.makeChangeSlide();
  testimonials.makeChangeSlide();

  lastPortfolio.makeShadow();
  testimonials.expandDescription();
  testimonials.showPreview();
}

function makeHeader(data) {
  const fragmentHeader = document.createDocumentFragment();

  const wrapper = document.getElementsByClassName('wrapper')[0];

  const header = makeElement('header', 'header');
  header.id = 'home';

  const headerTop = makeHeaderTop(data);
  header.insertAdjacentElement('afterbegin', headerTop);

  const containerInHeaderLevel = makeHeaderContent(data);
  header.insertAdjacentElement('beforeend', containerInHeaderLevel);

  fragmentHeader.append(header);
  wrapper.append(fragmentHeader);
}

function makeHeaderTop(data) {
  const headerTop = makeElement('div', 'header__top');

  const container = makeElement('div', 'container');
  headerTop.insertAdjacentElement('afterbegin', container);

  const row = makeElement('div', 'row');
  container.insertAdjacentElement('afterbegin', row);

  const headerLogo = makeElement('div', 'header__logo');
  row.insertAdjacentElement('afterbegin', headerLogo);
  headerLogo.textContent = 'BlogWorld';

  const headerNav = makeElement('nav', 'header__nav');
  row.append(headerNav);

  const ulNavigation = makeNav(data);
  headerNav.append(ulNavigation);

  return headerTop;
}

function makeNav() {
  const ulNavigation = makeElement('ul', 'navigation');

  const linkSrc = ['#home', '#portfolio', 'blog.html', 'post.html', '#aboutUs', '#contacts'];
  const linkContent = ['Home', 'Portfolio', 'Blog', 'Pages', 'About', 'Contact'];

  for (let i = 0; i < linkSrc.length; i++) {
    const navigationItem = makeElement('li', 'navigation__item');
    const navigationLink = makeElement('a', 'navigation__link');
    navigationLink.href = linkSrc[i];
    navigationLink.textContent = linkContent[i];

    if (i === 0) {
      navigationLink.classList.add('current');
    }

    navigationItem.append(navigationLink);
    ulNavigation.append(navigationItem);
  }

  return ulNavigation;
}

function makeHeaderContent(data) {
  const containerInHeaderLevel = makeElement('div', 'container');
  const rowInHeaderLevel = makeElement('div', 'row');

  containerInHeaderLevel.insertAdjacentElement('beforeend', rowInHeaderLevel);

  const headerContent = makeElement('div', 'header__content');
  rowInHeaderLevel.insertAdjacentElement('afterbegin', headerContent);

  const content = makeElement('div', 'content');
  headerContent.insertAdjacentElement('afterbegin', content);

  const contentHeader = makeElement('div', 'content__header');
  content.insertAdjacentElement('afterbegin', contentHeader);
  contentHeader.textContent = data[0].header.contentHeader;

  const contentParagraph = makeElement('div', 'content__paragraph');
  content.append(contentParagraph);
  contentParagraph.textContent = data[0].header.contentParagraph;

  makeHeaderButtons(content);

  return containerInHeaderLevel;
}

function makeHeaderButtons(parent) {
  const contentButtons = makeElement('div', 'content__buttons');
  parent.append(contentButtons);

  const contentExploreButton = makeElement('button', 'content__explore');
  contentButtons.append(contentExploreButton);
  contentExploreButton.textContent = 'Explore';

  const contentMoreButton = makeElement('button', 'content__more');
  contentButtons.append(contentMoreButton);
  contentMoreButton.textContent = 'Learn more';

  return contentButtons;
}

/** ******************************************************************************/
// ABOUT US

function makeAboutUsSection(data) {
  const fragmentAboutUs = document.createDocumentFragment();

  const sectionAboutUs = makeElement('section', 'about');
  sectionAboutUs.id = 'aboutUs';

  const aboutTop = makeAboutTop(data);
  sectionAboutUs.insertAdjacentElement('afterbegin', aboutTop);

  const aboutContent = makeAboutContent(data);
  sectionAboutUs.append(aboutContent);

  fragmentAboutUs.append(sectionAboutUs);
  const wrapper = document.getElementsByClassName('wrapper')[0];
  wrapper.append(fragmentAboutUs);
}

function makeAboutTop(data) {
  const aboutTop = makeElement('div', 'about__top');

  const aboutHeader = makeElement('div', 'about__header');
  aboutTop.insertAdjacentElement('afterbegin', aboutHeader);
  aboutHeader.textContent = data[1].aboutUs.aboutHeader;

  const aboutFigure = makeElement('div', 'about__figure');
  aboutTop.append(aboutFigure);

  const aboutParagraph = makeElement('p', 'about__paragraph');
  aboutTop.append(aboutParagraph);
  aboutParagraph.textContent = data[1].aboutUs.aboutParagraph;

  return aboutTop;
}

function makeAboutContent(data) {
  const aboutContent = makeElement('div', 'about__content');

  const containerAbout = makeElement('div', 'container');
  aboutContent.insertAdjacentElement('afterbegin', containerAbout);

  const rowAbout = makeElement('div', 'row');
  containerAbout.insertAdjacentElement('afterbegin', rowAbout);

  const aboutIcons = makeAboutIcons(data);
  rowAbout.append(aboutIcons);

  const aboutVideo = makeAboutVideo(data);
  rowAbout.append(aboutVideo);

  return aboutContent;
}

function makeAboutIcons(data) {
  const aboutIcons = makeElement('div', 'about__icons');

  const iconsArrayFromJson = data[1].aboutUs.desc;

  iconsArrayFromJson.forEach((element) => {
    const aboutIcon = makeElement('div', 'about__icon');
    aboutIcon.classList.add(element.class);

    const p = makeElement('p', 'about__description');
    p.textContent = element.text;
    aboutIcon.append(p);
    aboutIcons.append(aboutIcon);
  });

  return aboutIcons;
}

function makeAboutVideo(data) {
  const aboutVideo = makeElement('div', 'about__video');

  const videoAboutUs = document.createElement('video');
  videoAboutUs.src = data[1].aboutUs.videoAboutUsSrc;
  videoAboutUs.controls = true;
  videoAboutUs.poster = data[1].aboutUs.videoAboutUsPoster;
  aboutVideo.append(videoAboutUs);

  return aboutVideo;
}

/** ******************************************************************************/
// LATEST POSTS

function makeSectionLatestPost(data) {
  const fragmentLatestPost = document.createDocumentFragment();

  const sectionLatestPost = makeElement('section', 'latest-post');
  sectionLatestPost.id = 'latestPost';

  const latestPostTop = makeLatestPostHeader(data);
  sectionLatestPost.insertAdjacentElement('afterbegin', latestPostTop);

  const latestPostPosts = makeElement('div', 'latest-post__posts');
  sectionLatestPost.append(latestPostPosts);

  const latestPostPostsContainer = makeElement('div', 'container');
  latestPostPosts.insertAdjacentElement('afterbegin', latestPostPostsContainer);

  const latestPostPostsRow = makeElement('div', 'row');
  latestPostPostsContainer.insertAdjacentElement('afterbegin', latestPostPostsRow);

  // LATEST POSTS POST
  makePostLatestPortfolio(data, latestPostPostsRow);

  fragmentLatestPost.append(sectionLatestPost);
  const wrapper = document.getElementsByClassName('wrapper')[0];
  wrapper.append(fragmentLatestPost);
}

function makeLatestPostHeader(data) {
  const latestPostTop = makeElement('div', 'latest-post__top');

  const latestPostHeader = makeElement('div', 'latest-post__header');
  latestPostTop.insertAdjacentElement('afterbegin', latestPostHeader);
  latestPostHeader.textContent = data[2].latestPosts.postHeader;

  const latestPostFigure = makeElement('div', 'latest-post__figure');
  latestPostTop.append(latestPostFigure);

  const latestPostParagraph = makeElement('p', 'latest-post__paragraph');
  latestPostTop.append(latestPostParagraph);
  latestPostParagraph.textContent = data[2].latestPosts.postParagraph;

  return latestPostTop;
}

function makePostLatestPortfolio(data, parent) {
  const postsArrayFromJson = data[2].latestPosts.posts;

  postsArrayFromJson.forEach((post) => {
    const latestPostPost = makeElement('div', 'latest-post__post');

    const latestPostPostPreview = makeElement('div', 'latest-post__preview');
    latestPostPostPreview.style.background = `url("${post.previewImg}") no-repeat center center/cover`;

    const latestPostPostDescription = makePostDescription(post);

    latestPostPost.append(latestPostPostPreview);
    latestPostPost.append(latestPostPostDescription);
    parent.append(latestPostPost);
  });
}

function makePostDescription(post) {
  const latestPostPostDescription = makeElement('div', 'latest-post__description');

  const latestPostPostHead = makeElement('a', 'latest-post__head');
  latestPostPostHead.textContent = post.head;
  latestPostPostDescription.append(latestPostPostHead);

  const latestPostPostText = makeElement('p', 'latest-post__text');
  latestPostPostText.textContent = post.text;
  latestPostPostDescription.append(latestPostPostText);

  const latestPostPostInfo = makePostInfo(post);
  latestPostPostDescription.append(latestPostPostInfo);

  return latestPostPostDescription;
}

function makePostInfo(post) {
  const latestPostPostInfo = makeElement('div', 'latest-post__info');

  const info = makeElement('div', 'info');
  latestPostPostInfo.append(info);

  const infoDate = makeElement('div', 'info__date');
  infoDate.textContent = post.data;
  info.append(infoDate);

  const infoTime = makeInfoTime(post);
  info.append(infoTime);

  const infoComments = makeInfoComments(post);
  info.append(infoComments);

  return latestPostPostInfo;
}

function makeInfoTime(post) {
  const infoTime = makeElement('div', 'info__time');
  infoTime.textContent = post.time;

  return infoTime;
}

function makeInfoComments(post) {
  const infoComments = makeElement('div', 'info__comments');

  const imgIcon = makeElement('img', 'info__icon');
  imgIcon.src = post.imgSrc;
  imgIcon.alt = 'icon-comments';
  infoComments.append(imgIcon);

  const infoSpan = document.createElement('span');
  infoSpan.textContent = post.commentsNumber;
  infoComments.append(infoSpan);

  return infoComments;
}

/** ******************************************************************************/
// LATEST PORTFOLIO

function makeLatestPortfolioSection(data) {
  const fragmentLatestPortfolio = document.createDocumentFragment();

  const sectionLatestPortfolio = makeElement('section', 'latest-portfolio');
  sectionLatestPortfolio.id = 'portfolio';
  const latestPortfolioTop = makeLatestPortfolioHeader(data);
  sectionLatestPortfolio.insertAdjacentElement('afterbegin', latestPortfolioTop);

  // PORTFOLIO SLIDER
  const portfolioSliderContainer = makeLatestPortfolioSlider(data);
  sectionLatestPortfolio.append(portfolioSliderContainer);

  fragmentLatestPortfolio.append(sectionLatestPortfolio);
  const wrapper = document.getElementsByClassName('wrapper')[0];
  wrapper.append(fragmentLatestPortfolio);
}

function makeLatestPortfolioHeader(data) {
  const latestPortfolioTop = makeElement('div', 'latest-portfolio__top');

  const latestPortfolioHeader = makeElement('div', 'latest-portfolio__header');
  latestPortfolioTop.insertAdjacentElement('afterbegin', latestPortfolioHeader);
  latestPortfolioHeader.textContent = data[3].latestPortfolio.postHeader;

  const latestPortfolioFigure = makeElement('div', 'latest-portfolio__figure');
  latestPortfolioTop.append(latestPortfolioFigure);

  const latestPortfolioParagraph = makeElement('p', 'latest-portfolio__paragraph');
  latestPortfolioTop.append(latestPortfolioParagraph);
  latestPortfolioParagraph.textContent = data[3].latestPortfolio.postParagraph;

  return latestPortfolioTop;
}

function makeLatestPortfolioSlider(data) {
  const portfolioSliderContainer = makeElement('div', 'latest-portfolio__slider');

  const latestPortfolioContainer = makeElement('div', 'container');
  portfolioSliderContainer.insertAdjacentElement('afterbegin', latestPortfolioContainer);

  const latestPortfolioRow = makeElement('div', 'row');
  latestPortfolioContainer.insertAdjacentElement('afterbegin', latestPortfolioRow);

  const portfolioSlider = makeElement('div', 'slider');
  portfolioSlider.classList.add('slider');
  latestPortfolioRow.append(portfolioSlider);

  makeSlidePortfolioSlider(data, portfolioSlider);

  // PORTFOLIO SLIDER CONTROLS
  const portfolioSliderControls = makePortfolioSliderControls();
  latestPortfolioRow.append(portfolioSliderControls);

  return portfolioSliderContainer;
}

function makeSlidePortfolioSlider(data, parent) {
  const sliderLatestPortfolioArray = data[3].latestPortfolio.slider;
  sliderLatestPortfolioArray.forEach((slide) => {
    const sliderSlide = makeElement('div', 'slider__slide');

    const sliderPreview = makeElement('div', 'slider__preview');
    sliderPreview.style.background = `url("${slide.previewImg}") no-repeat center center/cover`;

    const sliderHead = makeElement('div', 'slider__head');
    sliderHead.textContent = slide.head;

    const sliderText = makeElement('div', 'slider__text');
    sliderText.textContent = slide.text;
    sliderText.classList.add('slider__text');

    sliderPreview.append(sliderHead);
    sliderPreview.append(sliderText);
    sliderSlide.append(sliderPreview);
    parent.append(sliderSlide);
  });
}

function makePortfolioSliderControls() {
  const portfolioSliderControls = makeElement('div', 'slider-controls');

  const portfolioSliderControlsInner = makeElement('div', 'controls');
  portfolioSliderControls.append(portfolioSliderControlsInner);

  const portfolioSliderControlsOperators = makeElement('div', 'controls__operators');
  portfolioSliderControlsInner.append(portfolioSliderControlsOperators);

  const portfolioSliderControlsOperatorsLeft = makeElement('div', 'controls__left');
  portfolioSliderControlsOperators.append(portfolioSliderControlsOperatorsLeft);

  const portfolioSliderControlsOperatorsRight = makeElement('div', 'controls__right');
  portfolioSliderControlsOperators.append(portfolioSliderControlsOperatorsRight);

  const portfolioSliderControlsButton = makeElement('button', 'controls__button');
  portfolioSliderControlsButton.textContent = 'See all works';
  portfolioSliderControlsInner.append(portfolioSliderControlsButton);

  return portfolioSliderControls;
}

/** ******************************************************************************/
// TESTMONIALS

function makeTestMonialsSection(data) {
  const fragmentTestmonials = document.createDocumentFragment();
  const sectionTestmonials = makeElement('section', 'testimonials');

  const testmonialsTop = makeTestmonialsHeader(data);
  sectionTestmonials.insertAdjacentElement('afterbegin', testmonialsTop);

  // TSTMONIAL SLIDER

  const testmonialsContent = makeElement('div', 'testimonials__content');
  sectionTestmonials.append(testmonialsContent);

  makeTestmonialsSlider(data, testmonialsContent);

  fragmentTestmonials.append(sectionTestmonials);
  const wrapper = document.getElementsByClassName('wrapper')[0];
  wrapper.append(fragmentTestmonials);
}

function makeTestmonialsHeader(data) {
  const testmonialsTop = makeElement('div', 'testimonials__top');

  const testmonialsHeader = makeElement('div', 'testimonials__header');
  testmonialsTop.insertAdjacentElement('afterbegin', testmonialsHeader);
  testmonialsHeader.textContent = data[4].testmonials.header;

  const testmonialsFigure = makeElement('div', 'testimonials__figure');
  testmonialsTop.append(testmonialsFigure);

  return testmonialsTop;
}

function makeTestmonialsSlider(data, parent) {
  // const testmonialsSliderPrev = makeTestmonialsSliderControl('prev');
  const testmonialsSliderPrev = makeTestmonialsSliderControl('left');
  parent.append(testmonialsSliderPrev);

  const sliderContainer = makeElement('div', 'testimonials__slider-container');
  parent.append(sliderContainer);

  const testmonialsSlider = makeElement('div', 'slider');
  sliderContainer.append(testmonialsSlider);

  const sliderArray = data[4].testmonials.slider;

  sliderArray.forEach((slider) => {
    const testmonialsSliderStuff = makeElement('div', 'slider__stuff');
    testmonialsSlider.append(testmonialsSliderStuff);

    const testmonialsSliderInfo = makeTestmonialsSliderInfo(slider);
    testmonialsSliderStuff.append(testmonialsSliderInfo);

    const testmonialsSliderPhoto = makeElement('div', 'slider__photo');
    testmonialsSliderPhoto.style.background = `url(${slider.photo}) no-repeat center center/cover`;
    testmonialsSliderStuff.append(testmonialsSliderPhoto);
  });

  // const testmonialsSliderNext = makeTestmonialsSliderControl('next');
  const testmonialsSliderNext = makeTestmonialsSliderControl('right');
  parent.append(testmonialsSliderNext);
}

function makeTestmonialsSliderInfo(slider) {
  const testmonialsSliderInfo = makeElement('div', 'slider__info');

  const testmonialsSliderQuote = makeElement('div', 'slider__quote');
  testmonialsSliderQuote.textContent = slider.quote;
  testmonialsSliderInfo.append(testmonialsSliderQuote);

  const testmonialsSliderAuthor = makeElement('div', 'slider__author');
  testmonialsSliderAuthor.textContent = slider.author;
  testmonialsSliderInfo.append(testmonialsSliderAuthor);

  const testmonialsSliderWork = makeElement('div', 'slider__work');
  testmonialsSliderAuthor.textContent = slider.work;
  testmonialsSliderInfo.append(testmonialsSliderWork);

  return testmonialsSliderInfo;
}

function makeTestmonialsSliderControl(direction) {
  const container = makeElement('div', `controls__${direction}`);
  return container;
}

/** ******************************************************************************/
// CONTACT US

function makeContactUs(data) {// eslint-disable-line max-statements
  const fragmentContactUs = document.createDocumentFragment();

  const sectionContactUs = document.createElement('section');
  sectionContactUs.classList.add('contacts');

  sectionContactUs.id = 'contacts';

  const contactUsContainer = document.createElement('div');
  contactUsContainer.classList.add('container');
  sectionContactUs.insertAdjacentElement('afterbegin', contactUsContainer);

  const contactUsRow = document.createElement('div');
  contactUsRow.classList.add('row');
  contactUsContainer.insertAdjacentElement('afterbegin', contactUsRow);

  const contactUsTop = document.createElement('div');
  contactUsTop.classList.add('contacts__top');
  contactUsRow.insertAdjacentElement('afterbegin', contactUsTop);

  const contactUsHeader = document.createElement('div');
  contactUsHeader.classList.add('contacts__header');
  contactUsTop.insertAdjacentElement('afterbegin', contactUsHeader);
  contactUsHeader.textContent = data[5].contacts.header;

  const contactUsFigure = document.createElement('div');
  contactUsFigure.classList.add('contacts__figure');
  contactUsTop.append(contactUsFigure);

  const contactUsParagraph = document.createElement('p');
  contactUsParagraph.classList.add('contacts__paragraph');
  contactUsTop.append(contactUsParagraph);
  contactUsParagraph.textContent = data[5].contacts.paragraph;

  // CONTACT US MAIN INFO

  const contactUsMainInfo = document.createElement('div');
  contactUsMainInfo.classList.add('contacts__main-info');
  sectionContactUs.append(contactUsMainInfo);

  const contactUsMainInfoContainer = document.createElement('div');
  contactUsMainInfoContainer.classList.add('container');
  contactUsMainInfo.insertAdjacentElement('afterbegin', contactUsMainInfoContainer);

  const contactUsMainInfoRow = document.createElement('div');
  contactUsMainInfoRow.classList.add('row');
  contactUsMainInfoContainer.insertAdjacentElement('afterbegin', contactUsMainInfoRow);

  const information = document.createElement('div');
  information.classList.add('information');
  contactUsMainInfoRow.append(information);

  const informationSteps = document.createElement('div');
  informationSteps.classList.add('information__information-steps');
  information.append(informationSteps);

  const informationCardContainer = document.createElement('div');
  informationCardContainer.classList.add('information__card');
  information.append(informationCardContainer);

  // INFORMATION STEPS

  const informationSocIcons = document.createElement('div');
  informationSocIcons.classList.add('information__soc-icons');
  informationSteps.append(informationSocIcons);

  for (let i = 0; i < 3; i++) {
    const socIcon = document.createElement('div');
    socIcon.classList.add('information__soc-icon');

    const iconImg = document.createElement('img');

    socIcon.append(iconImg);
    informationSocIcons.append(socIcon);
  }

  const socIconImgArray = [...informationSocIcons.querySelectorAll('.information__soc-icon > img')];
  socIconImgArray[0].classList.add('facebook');
  socIconImgArray[1].classList.add('instagramm');
  socIconImgArray[2].classList.add('basket');
  socIconImgArray[0].alt = 'facebook';
  socIconImgArray[1].alt = 'instagram';
  socIconImgArray[2].alt = 'basket';
  socIconImgArray[0].src = data[5].contacts.iconFacebook;
  socIconImgArray[1].src = data[5].contacts.iconInsta;
  socIconImgArray[2].src = data[5].contacts.iconBasket;

  const informationRoadmapContainer = document.createElement('div');
  informationRoadmapContainer.classList.add('information__roadmap');
  informationSteps.append(informationRoadmapContainer);

  const informationRoadmap = document.createElement('div');
  informationRoadmap.classList.add('roadmap');
  informationRoadmapContainer.append(informationRoadmap);

  const informationRoadmapHeader = document.createElement('h2');
  informationRoadmapHeader.classList.add('roadmap__header');
  informationRoadmapHeader.textContent = data[5].contacts.roadmap.header;
  informationRoadmap.append(informationRoadmapHeader);

  const informationRoadmapTimeline = document.createElement('div');
  informationRoadmapTimeline.classList.add('roadmap__timeline');
  informationRoadmap.append(informationRoadmapTimeline);

  const roadmapStepsArray = data[5].contacts.roadmap;
  roadmapStepsArray.forEach((step) => {
    const roadMapItem = document.createElement('div');
    roadMapItem.classList.add('roadmap__item');

    const outerCircle = circles();

    const top = document.createElement('div');
    top.classList.add('roadmap__top');
    top.textContent = step.top;

    const next = document.createElement('div');
    next.classList.add('roadmap__text');
    next.textContent = step.text;

    // outerCircle.append(innerCircle);
    roadMapItem.append(outerCircle);
    roadMapItem.append(top);
    roadMapItem.append(next);
    informationRoadmapTimeline.append(roadMapItem);
  });

  function circles() {
    const outerCircle = document.createElement('div');
    outerCircle.classList.add('roadmap__outer-circle');

    const innerCircle = document.createElement('div');
    innerCircle.classList.add('roadmap__inner-circle');

    outerCircle.append(innerCircle);
    return outerCircle;
  }

  // CARD

  const informationCard = document.createElement('div');
  informationCard.classList.add('card');
  informationCardContainer.append(informationCard);

  const informationCardHead = document.createElement('div');
  informationCardHead.classList.add('card__header');
  informationCard.append(informationCardHead);

  const informationCardHeadIcon = document.createElement('div');
  informationCardHeadIcon.classList.add('card__icon');
  informationCardHead.append(informationCardHeadIcon);

  const informationCardHeadIconImg = document.createElement('img');
  informationCardHeadIconImg.src = 'img/home/a-icon-mail.svg';
  informationCardHeadIconImg.alt = 'icon-mail';
  informationCardHeadIcon.append(informationCardHeadIconImg);

  const informationCardHeadText = document.createElement('p');
  informationCardHeadText.classList.add('card__text');
  informationCardHeadText.textContent = 'Write us a few words about your project and we will prepare proposal for you  within 24 hours';
  informationCardHead.append(informationCardHeadText);

  const informationCardContent = document.createElement('div');
  informationCardContent.classList.add('card__content');
  informationCard.append(informationCardContent);

  // FORM AND MAP

  const informationCardForm = document.createElement('div');
  informationCardForm.classList.add('card__form');
  informationCardContent.append(informationCardForm);

  const labelName = document.createElement('label');
  labelName.classList.add('card__label');
  labelName.htmlFor = 'name';
  labelName.textContent = 'Your name';

  const inputName = document.createElement('input');
  inputName.classList.add('card__field');
  inputName.type = 'text';
  inputName.id = 'name';

  const labelEmail = document.createElement('label');
  labelEmail.classList.add('card__label');
  labelEmail.htmlFor = 'email';
  labelEmail.textContent = 'Email';

  const inputEmail = document.createElement('input');
  inputEmail.classList.add('card__field');
  inputEmail.type = 'email';
  inputEmail.id = 'email';

  const labelPassword = document.createElement('label');
  labelPassword.classList.add('card__label');
  labelPassword.classList.add('password');
  labelPassword.htmlFor = 'password';

  const spanPasswordText = document.createElement('span');
  spanPasswordText.classList.add('card__text-label');
  spanPasswordText.textContent = 'Password';

  const spanPasswordShow = document.createElement('span');
  spanPasswordShow.classList.add('card__show');
  spanPasswordShow.textContent = 'show';

  const spanPasswordShowImg = document.createElement('img');
  spanPasswordShowImg.src = 'img/home/a-icon-showpass.svg';
  spanPasswordShowImg.alt = 'showpassicon';

  spanPasswordShow.insertAdjacentElement('afterbegin', spanPasswordShowImg);
  labelPassword.append(spanPasswordText);
  labelPassword.append(spanPasswordShow);

  const inputPassword = document.createElement('input');
  inputPassword.classList.add('card__field');
  inputPassword.type = 'password';
  inputPassword.id = 'password';

  const formButton = document.createElement('button');
  formButton.classList.add('card__button');
  formButton.textContent = 'Send message';

  const cardDna = document.createElement('div');
  cardDna.classList.add('card__dna');
  cardDna.textContent = 'If you need to have a DNA first, just contact us at email@gmail.com';

  informationCardForm.append(labelName);
  informationCardForm.append(inputName);
  informationCardForm.append(labelEmail);
  informationCardForm.append(inputEmail);
  informationCardForm.append(labelPassword);
  informationCardForm.append(inputPassword);
  informationCardForm.append(formButton);
  informationCardForm.append(cardDna);

  const informationCardMap = document.createElement('div');
  informationCardMap.classList.add('card__map');
  informationCardContent.append(informationCardMap);

  const informationCardMapFrame = document.createElement('iframe');
  informationCardMapFrame.classList.add('card__frame');
  informationCardMapFrame.src = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2645.461781079447!2d35.046119398193575!3d48.46685547266892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1577831520567!5m2!1sru!2sua';
  informationCardMap.append(informationCardMapFrame);

  fragmentContactUs.append(sectionContactUs);
  const wrapper = document.getElementsByClassName('wrapper')[0];
  wrapper.append(fragmentContactUs);
}

/** ******************************************************************************/
// TO HOME

function makeToHome() {
  const fragmentToHome = document.createDocumentFragment();
  const toHome = makeElement('div', 'to-home');

  const toHomeLink = makeElement('a', 'to-home__link');
  toHomeLink.href = '#home';

  const toHomeTriangle = makeElement('div', 'triangle');

  const toHomeTriangleLeft = makeElement('div', 'triangle__l');

  const toHomeTriangleRight = makeElement('div', 'triangle__r');

  toHomeTriangle.append(toHomeTriangleLeft);
  toHomeTriangle.append(toHomeTriangleRight);

  toHome.append(toHomeLink);
  toHomeLink.append(toHomeTriangle);

  fragmentToHome.append(toHome);
  document.body.append(fragmentToHome);
}

