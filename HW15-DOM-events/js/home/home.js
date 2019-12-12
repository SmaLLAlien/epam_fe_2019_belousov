const xmlhttp = new XMLHttpRequest();
let data = {};
xmlhttp.onreadystatechange = getData;

xmlhttp.open('GET', 'js/home/data.json', false);
xmlhttp.send();

function getData() {
  if (this.readyState === 4 && this.status === 200) {
    data = JSON.parse(this.responseText);
  }
}

const fragmentHeader = document.createDocumentFragment();

const wrapper = document.getElementsByClassName('wrapper')[0];

const header = document.createElement('header');
header.classList.add('header');
header.id = 'home';

const headerTop = document.createElement('div');
headerTop.classList.add('header__top');
header.insertAdjacentElement('afterbegin', headerTop);

const container = document.createElement('div');
container.classList.add('container');
headerTop.insertAdjacentElement('afterbegin', container);

const row = document.createElement('div');
row.classList.add('row');
container.insertAdjacentElement('afterbegin', row);

const headerLogo = document.createElement('div');
headerLogo.classList.add('header__logo');
row.insertAdjacentElement('afterbegin', headerLogo);
headerLogo.textContent = 'BlogWorld';

const headerNav = document.createElement('nav');
headerNav.classList.add('header__nav');
row.append(headerNav);

const ulNavigation = document.createElement('ul');
ulNavigation.classList.add('navigation');
headerNav.append(ulNavigation);

for (let i = 0; i < 6; i++) {
  const navigationItem = document.createElement('li');
  const navigationLink = document.createElement('a');
  navigationLink.classList.add('navigation__link');
  navigationItem.classList.add('navigation__item');
  navigationItem.append(navigationLink);
  ulNavigation.append(navigationItem);
}

const linkNavigationArray = [...ulNavigation.getElementsByClassName('navigation__link')];
linkNavigationArray[0].href = '#home';
linkNavigationArray[0].classList.add('current');
linkNavigationArray[1].href = '#portfolio';
linkNavigationArray[2].href = 'blog.html';
linkNavigationArray[3].href = 'post.html';
linkNavigationArray[4].href = '#aboutUs';
linkNavigationArray[5].href = '#contacts';

linkNavigationArray[0].textContent = 'Home';
linkNavigationArray[1].textContent = 'Portfolio';
linkNavigationArray[2].textContent = 'blog';
linkNavigationArray[3].textContent = 'Pages';
linkNavigationArray[4].textContent = 'About';
linkNavigationArray[5].textContent = 'Contact';

const containerInHeaderLevel = container.cloneNode();
const rowInHeaderLevel = row.cloneNode();
header.insertAdjacentElement('beforeend', containerInHeaderLevel);
containerInHeaderLevel.insertAdjacentElement('beforeend', rowInHeaderLevel);

const headerContent = document.createElement('div');
headerContent.classList.add('header__content');
rowInHeaderLevel.insertAdjacentElement('afterbegin', headerContent);

const content = document.createElement('div');
content.classList.add('content');
headerContent.insertAdjacentElement('afterbegin', content);

const contentHeader = document.createElement('div');
contentHeader.classList.add('content__header');
content.insertAdjacentElement('afterbegin', contentHeader);
contentHeader.textContent = data[0].header.contentHeader;

const contentParagraph = document.createElement('div');
contentParagraph.classList.add('content__paragraph');
content.append(contentParagraph);
contentParagraph.textContent = data[0].header.contentParagraph;

const contentButtons = document.createElement('div');
contentButtons.classList.add('content__buttons');
content.append(contentButtons);

const contentExploreButton = document.createElement('div');
contentExploreButton.classList.add('content__explore');
contentButtons.append(contentExploreButton);
contentExploreButton.textContent = 'Explore';

const contentMoreButton = document.createElement('div');
contentMoreButton.classList.add('content__more');
contentButtons.append(contentMoreButton);
contentMoreButton.textContent = 'Learn more';

fragmentHeader.append(header);
wrapper.append(fragmentHeader);

/** ******************************************************************************/
// ABOUT US

const fragmentAboutUs = fragmentHeader.cloneNode();

const sectionAboutUs = document.createElement('section');
sectionAboutUs.classList.add('about');
sectionAboutUs.id = 'aboutUs';

const aboutTop = document.createElement('div');
aboutTop.classList.add('about__top');
sectionAboutUs.insertAdjacentElement('afterbegin', aboutTop);

const aboutHeader = document.createElement('div');
aboutHeader.classList.add('about__header');
aboutTop.insertAdjacentElement('afterbegin', aboutHeader);
aboutHeader.textContent = data[1].aboutUs.aboutHeader;

const aboutFigure = document.createElement('div');
aboutFigure.classList.add('about__figure');
aboutTop.append(aboutFigure);

const aboutParagraph = document.createElement('p');
aboutParagraph.classList.add('about__paragraph');
aboutTop.append(aboutParagraph);
aboutParagraph.textContent = data[1].aboutUs.aboutParagraph;

const aboutContent = document.createElement('div');
aboutContent.classList.add('about__content');
sectionAboutUs.append(aboutContent);

const containerAbout = document.createElement('div');
containerAbout.classList.add('container');
aboutContent.insertAdjacentElement('afterbegin', containerAbout);

const rowAbout = document.createElement('div');
rowAbout.classList.add('row');
containerAbout.insertAdjacentElement('afterbegin', rowAbout);

const aboutIcons = document.createElement('div');
aboutIcons.classList.add('about__icons');
rowAbout.append(aboutIcons);

const iconsArrayFromJson = data[1].aboutUs.desc;

iconsArrayFromJson.forEach((element) => {
  const aboutIcon = document.createElement('div');
  aboutIcon.classList.add('about__icon');
  aboutIcon.classList.add(element.class);
  const p = document.createElement('p');
  p.classList.add('about__description');
  p.textContent = element.text;
  aboutIcon.append(p);
  aboutIcons.append(aboutIcon);
});

const aboutVideo = document.createElement('div');
aboutVideo.classList.add('about__video');
rowAbout.append(aboutVideo);

const videoAboutUs = document.createElement('video');
videoAboutUs.src = data[1].aboutUs.videoAboutUsSrc;
videoAboutUs.controls = true;
videoAboutUs.poster = data[1].aboutUs.videoAboutUsPoster;
aboutVideo.append(videoAboutUs);

fragmentAboutUs.append(sectionAboutUs);
wrapper.append(fragmentAboutUs);

/** ******************************************************************************/
// LATEST POSTS

const fragmentLatestPost = fragmentHeader.cloneNode();

const sectionLatestPost = document.createElement('section');
sectionLatestPost.classList.add('latest-post');
sectionLatestPost.id = 'latestPost';

const latestPostTop = document.createElement('div');
latestPostTop.classList.add('latest-post__top');
sectionLatestPost.insertAdjacentElement('afterbegin', latestPostTop);

const latestPostHeader = document.createElement('div');
latestPostHeader.classList.add('latest-post__header');
latestPostTop.insertAdjacentElement('afterbegin', latestPostHeader);
latestPostHeader.textContent = data[2].latestPosts.postHeader;

const latestPostFigure = document.createElement('div');
latestPostFigure.classList.add('latest-post__figure');
latestPostTop.append(latestPostFigure);

const latestPostParagraph = document.createElement('p');
latestPostParagraph.classList.add('latest-post__paragraph');
latestPostTop.append(latestPostParagraph);
latestPostParagraph.textContent = data[2].latestPosts.postParagraph;

const latestPostPosts = document.createElement('div');
latestPostPosts.classList.add('latest-post__posts');
sectionLatestPost.append(latestPostPosts);

const latestPostPostsContainer = document.createElement('div');
latestPostPostsContainer.classList.add('container');
latestPostPosts.insertAdjacentElement('afterbegin', latestPostPostsContainer);

const latestPostPostsRow = document.createElement('div');
latestPostPostsRow.classList.add('row');
latestPostPostsContainer.insertAdjacentElement('afterbegin', latestPostPostsRow);

// LATEST POSTS POST
const postsArrayFromJson = data[2].latestPosts.posts;

postsArrayFromJson.forEach((post) => {
  const latestPostPost = document.createElement('div');
  latestPostPost.classList.add('latest-post__post');

  const latestPostPostPreview = document.createElement('div');
  latestPostPostPreview.style.background = `url("${post.previewImg}") no-repeat center center/cover`;
  latestPostPostPreview.classList.add('latest-post__preview');

  const latestPostPostDescription = makePostDescription(post);

  latestPostPost.append(latestPostPostPreview);
  latestPostPost.append(latestPostPostDescription);
  latestPostPostsRow.append(latestPostPost);
});

function makePostDescription(post) {
  const latestPostPostDescription = document.createElement('div');
  latestPostPostDescription.classList.add('latest-post__description');

  const latestPostPostHead = document.createElement('a');
  latestPostPostHead.classList.add('latest-post__head');
  latestPostPostHead.textContent = post.head;
  latestPostPostDescription.append(latestPostPostHead);

  const latestPostPostText = document.createElement('p');
  latestPostPostText.classList.add('latest-post__text');
  latestPostPostText.textContent = post.text;
  latestPostPostDescription.append(latestPostPostText);

  const latestPostPostInfo = makePostInfo(post);
  latestPostPostDescription.append(latestPostPostInfo);

  return latestPostPostDescription;
}

function makePostInfo(post) {
  const latestPostPostInfo = document.createElement('div');
  latestPostPostInfo.classList.add('latest-post__info');

  const info = document.createElement('div');
  info.classList.add('info');
  latestPostPostInfo.append(info);

  const infoDate = document.createElement('div');
  infoDate.classList.add('info__date');
  infoDate.textContent = post.data;
  info.append(infoDate);

  const infoTime = makeInfoTime(post);
  info.append(infoTime);

  const infoComments = makeInfoComments(post);
  info.append(infoComments);

  return latestPostPostInfo;
}

function makeInfoTime(post) {
  const infoTime = document.createElement('div');
  infoTime.classList.add('info__time');
  infoTime.textContent = post.time;

  return infoTime;
}

function makeInfoComments(post) {
  const infoComments = document.createElement('div');
  infoComments.classList.add('info__comments');

  const imgIcon = document.createElement('img');
  imgIcon.classList.add('info__icon');
  imgIcon.src = post.imgSrc;
  imgIcon.alt = 'icon-comments';
  infoComments.append(imgIcon);

  const infoSpan = document.createElement('span');
  infoSpan.textContent = post.commentsNumber;
  infoComments.append(infoSpan);

  return infoComments;
}

fragmentLatestPost.append(sectionLatestPost);
wrapper.append(fragmentLatestPost);

/** ******************************************************************************/
// LATEST PORTFOLIO

const fragmentLatestPortfolio = fragmentHeader.cloneNode();

const sectionLatestPortfolio = document.createElement('section');
sectionLatestPortfolio.classList.add('latest-portfolio');
sectionLatestPortfolio.id = 'portfolio';

const latestPortfolioTop = document.createElement('div');
latestPortfolioTop.classList.add('latest-portfolio__top');
sectionLatestPortfolio.insertAdjacentElement('afterbegin', latestPortfolioTop);

const latestPortfolioHeader = document.createElement('div');
latestPortfolioHeader.classList.add('latest-portfolio__header');
latestPortfolioTop.insertAdjacentElement('afterbegin', latestPortfolioHeader);
latestPortfolioHeader.textContent = data[3].latestPortfolio.postHeader;

const latestPortfolioFigure = document.createElement('div');
latestPortfolioFigure.classList.add('latest-portfolio__figure');
latestPortfolioTop.append(latestPortfolioFigure);

const latestPortfolioParagraph = document.createElement('p');
latestPortfolioParagraph.classList.add('latest-portfolio__paragraph');
latestPortfolioTop.append(latestPortfolioParagraph);
latestPortfolioParagraph.textContent = data[3].latestPortfolio.postParagraph;

// PORTFOLIO SLIDER
const portfolioSliderContainer = document.createElement('div');
portfolioSliderContainer.classList.add('latest-portfolio__slider');
sectionLatestPortfolio.append(portfolioSliderContainer);

const latestPortfolioContainer = document.createElement('div');
latestPortfolioContainer.classList.add('container');
portfolioSliderContainer.insertAdjacentElement('afterbegin', latestPortfolioContainer);

const latestPortfolioRow = document.createElement('div');
latestPortfolioRow.classList.add('row');
latestPortfolioContainer.insertAdjacentElement('afterbegin', latestPortfolioRow);

const portfolioSlider = document.createElement('div');
portfolioSlider.classList.add('slider');
latestPortfolioRow.append(portfolioSlider);

const sliderLatestPortfolioArray = data[3].latestPortfolio.slider;
sliderLatestPortfolioArray.forEach((slide) => {
  const sliderSlide = document.createElement('div');
  sliderSlide.classList.add('slider__slide');

  const sliderPreview = document.createElement('div');
  sliderPreview.style.background = `url("${slide.previewImg}") no-repeat center center/cover`;
  sliderPreview.classList.add('slider__preview');

  const sliderHead = document.createElement('div');
  sliderHead.textContent = slide.head;
  sliderHead.classList.add('slider__head');

  const sliderText = document.createElement('div');
  sliderText.textContent = slide.text;
  sliderText.classList.add('slider__text');

  sliderPreview.append(sliderHead);
  sliderPreview.append(sliderText);
  sliderSlide.append(sliderPreview);
  portfolioSlider.append(sliderSlide);
});

// PORTFOLIO SLIDER CONTROLS
const portfolioSliderControls = document.createElement('div');
portfolioSliderControls.classList.add('slider-controls');
latestPortfolioRow.append(portfolioSliderControls);

const portfolioSliderControlsInner = document.createElement('div');
portfolioSliderControlsInner.classList.add('controls');
portfolioSliderControls.append(portfolioSliderControlsInner);

const portfolioSliderControlsOperators = document.createElement('div');
portfolioSliderControlsOperators.classList.add('controls__operators');
portfolioSliderControlsInner.append(portfolioSliderControlsOperators);

const portfolioSliderControlsOperatorsLeft = document.createElement('div');
portfolioSliderControlsOperatorsLeft.classList.add('controls__left');
portfolioSliderControlsOperators.append(portfolioSliderControlsOperatorsLeft);

const portfolioSliderControlsOperatorsRight = document.createElement('div');
portfolioSliderControlsOperatorsRight.classList.add('controls__right');
portfolioSliderControlsOperators.append(portfolioSliderControlsOperatorsRight);

const portfolioSliderControlsButton = document.createElement('button');
portfolioSliderControlsButton.textContent = 'See all works';
portfolioSliderControlsButton.classList.add('controls__button');
portfolioSliderControlsInner.append(portfolioSliderControlsButton);

fragmentLatestPortfolio.append(sectionLatestPortfolio);
wrapper.append(fragmentLatestPortfolio);

/** ******************************************************************************/
// TESTMONIALS

const fragmentTestmonials = fragmentHeader.cloneNode();
const sectionTestmonials = document.createElement('section');
sectionTestmonials.classList.add('testimonials');

const testmonialsTop = document.createElement('div');
testmonialsTop.classList.add('testimonials__top');
sectionTestmonials.insertAdjacentElement('afterbegin', testmonialsTop);

const testmonialsHeader = document.createElement('div');
testmonialsHeader.classList.add('testimonials__header');
testmonialsTop.insertAdjacentElement('afterbegin', testmonialsHeader);
testmonialsHeader.textContent = data[4].testmonials.header;

const testmonialsFigure = document.createElement('div');
testmonialsFigure.classList.add('testimonials__figure');
testmonialsTop.append(testmonialsFigure);

// TSTMONIAL SLIDER

const testmonialsContent = document.createElement('div');
testmonialsContent.classList.add('testimonials__content');
sectionTestmonials.append(testmonialsContent);

const testmonialsSliderPrev = document.createElement('div');
testmonialsSliderPrev.classList.add('slider__prev');
testmonialsContent.append(testmonialsSliderPrev);

const sliderPrev = document.createElement('div');
sliderPrev.classList.add('prev');
testmonialsSliderPrev.append(sliderPrev);

const testmonialsSlider = document.createElement('div');
testmonialsSlider.classList.add('slider');
testmonialsContent.append(testmonialsSlider);

const testmonialsSliderStuff = document.createElement('div');
testmonialsSliderStuff.classList.add('slider__stuff');
testmonialsSlider.append(testmonialsSliderStuff);

const testmonialsSliderInfo = document.createElement('div');
testmonialsSliderInfo.classList.add('slider__info');
testmonialsSliderStuff.append(testmonialsSliderInfo);

const testmonialsSliderQuote = document.createElement('div');
testmonialsSliderQuote.classList.add('slider__quote');
testmonialsSliderQuote.textContent = data[4].testmonials.quote;
testmonialsSliderInfo.append(testmonialsSliderQuote);

const testmonialsSliderAuthor = document.createElement('div');
testmonialsSliderAuthor.classList.add('slider__author');
testmonialsSliderAuthor.textContent = data[4].testmonials.author;
testmonialsSliderInfo.append(testmonialsSliderAuthor);

const testmonialsSliderWork = document.createElement('div');
testmonialsSliderWork.classList.add('slider__work');
testmonialsSliderAuthor.textContent = data[4].testmonials.work;
testmonialsSliderInfo.append(testmonialsSliderWork);

const testmonialsSliderPhoto = document.createElement('div');
testmonialsSliderPhoto.classList.add('slider__photo');
testmonialsSliderStuff.append(testmonialsSliderPhoto);

const testmonialsSliderNext = document.createElement('div');
testmonialsSliderNext.classList.add('slider__next');
testmonialsContent.append(testmonialsSliderNext);

const sliderNext = document.createElement('div');
sliderNext.classList.add('next');
testmonialsSliderNext.append(sliderNext);

fragmentTestmonials.append(sectionTestmonials);
wrapper.append(fragmentTestmonials);

/** ******************************************************************************/
// CONTACT US

const fragmentContactUs = fragmentHeader.cloneNode();

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

fragmentContactUs.append(sectionContactUs);
wrapper.append(fragmentContactUs);

/** ******************************************************************************/
// TO HOME

const fragmentToHome = fragmentHeader.cloneNode();

const toHome = document.createElement('div');
toHome.classList.add('to-home');

const toHomeLink = document.createElement('a');
toHomeLink.classList.add('to-home__link');
toHomeLink.href = '#home';

const toHomeTriangle = document.createElement('div');
toHomeTriangle.classList.add('triangle');

const toHomeTriangleLeft = document.createElement('div');
toHomeTriangleLeft.classList.add('triangle__l');

const toHomeTriangleRight = document.createElement('div');
toHomeTriangleRight.classList.add('triangle__r');

toHomeTriangle.append(toHomeTriangleLeft);
toHomeTriangle.append(toHomeTriangleRight);

toHome.append(toHomeLink);
toHomeLink.append(toHomeTriangle);

fragmentToHome.append(toHome);
document.body.append(fragmentToHome);

const footer = document.querySelector('.footer');
wrapper.append(footer);
