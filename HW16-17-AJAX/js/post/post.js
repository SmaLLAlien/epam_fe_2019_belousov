import {makeAddPostElement} from '../addPost.js';

document.addEventListener('DOMContentLoaded', main);
function main() {
  const param = +window.location.search.substr(3);
  const urlPosts = 'http://localhost:3000/api/list/';
  const urlData = 'js/post/data-post.json';

  const getPost = (url, q = '') => {
    const src = `${url}${q}`;
    return fetch(src, {
      method: 'GET',
    });
  };

  if (param) {
    // show generated or opened from blog page post
    Promise.all([getPost(urlPosts, param), getPost(urlData)])
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((responses) => {
        const data = responses[0];
        const postJson = responses[1];
        makePage(data, postJson);
      })
      .catch((e) => alert(e));
  }
  else {
    // show top post by likes
    Promise.all([getPost(urlPosts), getPost(urlData)])
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((responses) => {
        const resPost = responses[0];
        let max = 0;
        let id = -1;
        resPost.forEach((obj, index) => {
          // get top post by likes
          if (parseInt(obj.likesCounter) > max) {
            max = parseInt(obj.likesCounter);
            id = index;
          }
        });
        const data = resPost[id];
        const postJson = responses[1];
        makePage(data, postJson);
      });
  }
}

function makePage(data, postJson) {
  makePageHead(data);
  makeMainContainer();
  makePost(data);

  makeAside(postJson);
  makeCategories(postJson);
  makeTags(postJson);
  makeReviews(postJson);
  const footer = document.getElementsByClassName('footer')[0];
  wrapper.append(footer);
  makeToHome();
  makeAddPostElement();
}

const makeElement = (elementType, elementClass) => {
  const element = document.createElement(elementType);
  element.classList.add(elementClass);
  return element;
};

const wrapper = document.getElementsByClassName('wrapper')[0];

/** ******************************************************************************/
// SECTION PAGE HEAD

function makePageHead(data) {
  const containerHead = makeElement('div', 'container');

  const rowHead = makeElement('div', 'row');
  containerHead.insertAdjacentElement('afterbegin', rowHead);

  const sectionPageHead = makeElement('section', 'page-head');
  rowHead.append(sectionPageHead);

  const pageHeadTitle = makeElement('h1', 'page-head__title');
  sectionPageHead.append(pageHeadTitle);
  pageHeadTitle.textContent = data.title;

  const pageHeadHeader = makePageHeadHeader(data);
  sectionPageHead.append(pageHeadHeader);

  const wrapper = document.getElementsByClassName('wrapper')[0];
  const fragmentHeader = document.createDocumentFragment();
  fragmentHeader.append(containerHead);
  wrapper.append(fragmentHeader);
}

function makePageHeadHeader(data) {
  const pageHeadHeader = makeElement('div', 'page-head__header');

  const pageHeadHeaderPhoto = makeElement('div', 'page-head__photo');
  pageHeadHeader.append(pageHeadHeaderPhoto);

  const pageHeadHeaderPhotoImg = document.createElement('img');
  pageHeadHeaderPhotoImg.alt = 'author';
  pageHeadHeaderPhotoImg.src = data.authorPhoto || 'img/blog/Sarah.png';
  pageHeadHeaderPhoto.append(pageHeadHeaderPhotoImg);

  const pageHeadHeaderInfo = makePageHeadHeaderInfo(data);
  pageHeadHeader.append(pageHeadHeaderInfo);

  return pageHeadHeader;
}

function makePageHeadHeaderInfo(data) {
  const pageHeadHeaderInfo = makeElement('div', 'page-head__info');

  const pageHeadHeaderInfoName = makeElement('div', 'page-head__name');
  pageHeadHeaderInfoName.textContent = data.author;
  pageHeadHeaderInfo.append(pageHeadHeaderInfoName);

  const pageHeadHeaderInfoRates = makePageHeadHeaderInfoRates(data);
  pageHeadHeaderInfo.append(pageHeadHeaderInfoRates);

  return pageHeadHeaderInfo;
}

function makePageHeadHeaderInfoRates(data) {
  const pageHeadHeaderInfoRates = makeElement('div', 'page-head__rates');

  const pageHeadHeaderInfoRatesDate = makeElement('div', 'page-head__date');
  pageHeadHeaderInfoRatesDate.textContent = data.date;
  pageHeadHeaderInfoRates.append(pageHeadHeaderInfoRatesDate);

  const pageHeadHeaderInfoRatesTime = makeElement('div', 'page-head__time');
  pageHeadHeaderInfoRatesTime.textContent = data.time;
  pageHeadHeaderInfoRates.append(pageHeadHeaderInfoRatesTime);

  const pageHeadHeaderInfoRatesComments = makePageHeadHeaderInfoRatesComments(data);
  pageHeadHeaderInfoRates.append(pageHeadHeaderInfoRatesComments);

  const pageHeadHeaderInfoRatesStars = makeStars(data);
  pageHeadHeaderInfoRates.append(pageHeadHeaderInfoRatesStars);

  return pageHeadHeaderInfoRates;
}

function makePageHeadHeaderInfoRatesComments(data) {
  const pageHeadHeaderInfoRatesComments = makeElement('div', 'page-head__comments');

  const pageHeadHeaderInfoRatesCommentsImg = makeElement('img', 'post__icon');
  pageHeadHeaderInfoRatesCommentsImg.alt = 'icon-comments';
  pageHeadHeaderInfoRatesCommentsImg.src = data.commentsIcon;
  pageHeadHeaderInfoRatesComments.append(pageHeadHeaderInfoRatesCommentsImg);

  const pageHeadHeaderInfoRatesCommentsCount = document.createElement('span');
  pageHeadHeaderInfoRatesCommentsCount.textContent = data.commentsCount;
  pageHeadHeaderInfoRatesComments.append(pageHeadHeaderInfoRatesCommentsCount);

  return pageHeadHeaderInfoRatesComments;
}

function makeStars(data) {
  const pageHeadHeaderInfoRatesStars = makeElement('div', 'page-head__stars');

  for (let i = 0; i < 5; i++) {
    const img = document.createElement('img');
    img.alt = 'star';
    img.src = data.stars.split(',')[i];
    pageHeadHeaderInfoRatesStars.append(img);
  }

  return pageHeadHeaderInfoRatesStars;
}

/** ******************************************************************************/
// SECTION MAIN

function makeMainContainer() {
  const fragmentMain = document.createDocumentFragment();

  const containerMain = document.createElement('div');
  containerMain.classList.add('container');
  // containerHead.insertAdjacentElement('afterend',containerMain);

  const rowMain = document.createElement('div');
  rowMain.classList.add('row');
  containerMain.insertAdjacentElement('afterbegin', rowMain);

  const main = document.createElement('main');
  main.classList.add('main');
  rowMain.insertAdjacentElement('afterbegin', main);

  fragmentMain.append(containerMain);
  wrapper.append(fragmentMain);
}

/** ******************************************************************************/
// SECTION MAIN CONTENT
function makePost(data) {
  const mainContent = makeElement('div', 'content');

  const post = makeElement('div', 'post');
  mainContent.append(post);

  // POST PREVIEW
  const postPreview = makeElement('div', 'post__preview');
  post.append(postPreview);

  ckeckPostType(postPreview, post, data);

  // POST TEXT
  const postText = makePostText(data);
  post.append(postText);

  // POST CONTROLS
  const postControls = makePostControls(data);
  post.append(postControls);

  const main = document.getElementsByClassName('main')[0];
  const fragmentMainContent = document.createDocumentFragment();
  fragmentMainContent.append(mainContent);
  main.append(fragmentMainContent);
}

function ckeckPostType(postPreview, post, data) {
  if (data.type === 'Audio') {
    makeAudio(postPreview, post, data);
  }

  if (data.type === 'Video') {
    makeVideo(postPreview, post, data);
  }

  if (data.type === 'Picture') {
    const postPreviewImg = makeElement('img', 'post__poster');
    postPreviewImg.alt = 'poster';
    postPreviewImg.src = data.urlPreview;
    postPreview.append(postPreviewImg);
  }
}

function makeAudio(postPreview, post, data) {
  // if audio type => make audio player and preview img
  const postPreviewImg = makeElement('img', 'post__poster');
  postPreviewImg.alt = 'poster';
  postPreviewImg.src = data.urlPreview;
  postPreview.append(postPreviewImg);

  const postAudio = makeElement('div', 'post__audio');
  post.append(postAudio);

  const postAudioPlayer = document.createElement('audio');
  postAudioPlayer.controls = true;
  postAudioPlayer.src = data.url;
  postAudio.append(postAudioPlayer);
}

function makeVideo(postPreview, post, data) {
  // if video type => make video player and poster img
  const postVideoPlayer = document.createElement('video');
  postVideoPlayer.controls = true;
  postVideoPlayer.src = data.url;
  postVideoPlayer.poster = data.urlPreview;
  postPreview.append(postVideoPlayer);
}

function makePostText(data) {
  const postText = makeElement('div', 'post__text');

  for (const text in data.desc) {
    if (text.substring(0, text.length - 1) === 'paragraph') {
      const postParagraph = makeElement('p', 'post__paragraph');
      postParagraph.append(data.desc[text]);
      postText.append(postParagraph);
    }
    if (text.substring(0, text.length - 1) === 'header') {
      const postHeader = makeElement('h2', 'post__header');
      postHeader.textContent = data.desc[text].toString();
      postText.append(postHeader);
    }
  }

  const postParagraphQuote = makePostQuote(data);
  if (postParagraphQuote) {
    postText.append(postParagraphQuote);
  }

  return postText;
}

function makePostQuote(data) {
  if (data.quote) {
    const postParagraphQuote = makeElement('p', 'post__quote');
    postParagraphQuote.innerHTML = data.quote;
    return postParagraphQuote;
  }
}

function makePostControls(data) {
  const postControls = makeElement('div', 'post__controls');

  const postControlsLike = makeLikes(data);
  postControls.append(postControlsLike);

  const postControlsSocIcons = makeElement('div', 'post__soc-icons');
  postControls.append(postControlsSocIcons);

  const iconArray = ['facebook', 'insta', 'basket'];
  for (let i = 0; i < 3; i++) {
    const icon = makeElement('div', 'post__soc-icon');

    const iconImg = document.createElement('img');
    iconImg.src = data[iconArray[i]];

    icon.append(iconImg);
    icon.alt = 'social';
    postControlsSocIcons.append(icon);
  }
  return postControls;
}

function makeLikes(data) {
  const postControlsLike = makeElement('div', 'post__likes');

  const postControlsLikeIcon = makeElement('img', 'post__like');
  postControlsLikeIcon.alt = 'like';
  postControlsLikeIcon.src = data.like;
  postControlsLike.append(postControlsLikeIcon);

  const postControlsLikeCounter = document.createElement('span');
  postControlsLikeCounter.textContent = data.likesCounter;
  postControlsLike.append(postControlsLikeCounter);

  return postControlsLike;
}

/** ******************************************************************************/
// SECTION MAIN ASIDE
function makeAside(postJson) {
  const mainAside = makeElement('aside', 'aside');

  // LATEST POST
  const latest = makeElement('div', 'latest');
  mainAside.append(latest);

  const latestHeader = makeElement('div', 'latest__header');
  latestHeader.textContent = postJson[2].aside.header;
  latest.append(latestHeader);

  const asidePosts = postJson[2].aside.asidePosts;

  asidePosts.forEach((postJson) => {
    const post = makeElement('div', 'latest__post');

    const sidePost = makeElement('div', 'side-post');

    const sidePostPreview = makeElement('div', 'side-post__preview');

    const sidePostContent = makeSidePostContent(postJson);

    sidePost.append(sidePostPreview);
    sidePost.append(sidePostContent);
    post.append(sidePost);
    latest.append(post);
  });

  const latestButton = makeElement('button', 'latest__button');
  latestButton.textContent = postJson[2].aside.button;
  latest.append(latestButton);

  const fragmentAside = document.createDocumentFragment();
  fragmentAside.append(mainAside);
  document.getElementsByClassName('main')[0].append(fragmentAside);
}

function makeSidePostContent(postJson) {
  const sidePostContent = document.createElement('div');
  sidePostContent.classList.add('side-post__content');

  const sidePostContentHeader = document.createElement('div');
  sidePostContentHeader.textContent = postJson.header;
  sidePostContentHeader.classList.add('side-post__header');

  const sidePostContentInfo = document.createElement('div');
  sidePostContentInfo.classList.add('side-post__info');

  const sidePostContentInfoRates = makeSidePostContentInfoRates(postJson);

  sidePostContentInfo.append(sidePostContentInfoRates);
  sidePostContent.append(sidePostContentHeader);
  sidePostContent.append(sidePostContentInfo);

  return sidePostContent;
}

function makeSidePostContentInfoRates(postJson) {
  const sidePostContentInfoRates = document.createElement('div');
  sidePostContentInfoRates.classList.add('side-post__rates');

  const sidePostContentInfoRatesDate = document.createElement('div');
  sidePostContentInfoRatesDate.classList.add('side-post__date');
  sidePostContentInfoRatesDate.textContent = postJson.date;

  const sidePostContentInfoRatesTime = document.createElement('div');
  sidePostContentInfoRatesTime.classList.add('side-post__time');
  sidePostContentInfoRatesTime.textContent = postJson.time;

  const sidePostContentInfoRatesComments = makeSidePostContentInfoRatesComments(postJson);

  sidePostContentInfoRates.append(sidePostContentInfoRatesDate);
  sidePostContentInfoRates.append(sidePostContentInfoRatesTime);
  sidePostContentInfoRates.append(sidePostContentInfoRatesComments);
  return sidePostContentInfoRates;
}

function makeSidePostContentInfoRatesComments(postJson) {
  const sidePostContentInfoRatesComments = document.createElement('div');
  sidePostContentInfoRatesComments.classList.add('side-post__comments');

  const sidePostContentInfoRatesCommentsIcon = document.createElement('img');
  sidePostContentInfoRatesCommentsIcon.alt = 'icon-comments';
  sidePostContentInfoRatesCommentsIcon.src = postJson.iconComments;
  sidePostContentInfoRatesCommentsIcon.classList.add('side-post__icon');

  const sidePostContentInfoRatesCommentsCounter = document.createElement('span');
  sidePostContentInfoRatesCommentsCounter.textContent = postJson.commentsCounter;

  sidePostContentInfoRatesComments.append(sidePostContentInfoRatesCommentsIcon);
  sidePostContentInfoRatesComments.append(sidePostContentInfoRatesCommentsCounter);

  return sidePostContentInfoRatesComments;
}

// CATEGORIES
function makeCategories(postJson) {
  const categories = makeElement('div', 'categories');

  const categoriesHeader = makeElement('div', 'categories__header');
  categoriesHeader.textContent = postJson[3].categories.header;
  categories.append(categoriesHeader);

  const categoriesItemArray = postJson[3].categories.items;
  categoriesItemArray.forEach((item) => {
    const categoriesItems = makeElement('div', 'categories__items');

    const categoriesItemsInput = makeElement('input', 'categories__input');
    categoriesItemsInput.type = 'checkbox';

    const categoriesItemsLabel = makeElement('label', 'categories__label');

    categoriesItemsInput.id = item.id;
    categoriesItemsLabel.htmlFor = item.id;
    categoriesItemsLabel.textContent = item.label;

    const categoriesItemsList = makeCategoriesItemList(item, item.links);

    categoriesItems.append(categoriesItemsInput);
    categoriesItems.append(categoriesItemsLabel);
    categoriesItems.append(categoriesItemsList);
    categories.append(categoriesItems);
  });

  const fragmentCategories = document.createDocumentFragment();
  fragmentCategories.append(categories);
  document.getElementsByClassName('aside')[0].append(categories);
}

function makeCategoriesItemList(item, links) {
  const categoriesItemsList = makeElement('ul', 'categories__list');

  const names = links.split(',');
  names.forEach((name) => {
    const item = makeElement('li', 'categories__item');

    const itemLink = makeElement('a', 'categories__link');
    itemLink.src = '#';
    itemLink.textContent = name;

    item.append(itemLink);
    categoriesItemsList.append(item);
  });

  return categoriesItemsList;
}

// TAGS
function makeTags(postJSON) {
  const tags = makeElement('div', 'tags');

  const tagsHead = makeElement('div', 'tags__head');

  tagsHead.textContent = postJSON[4].tags.head;
  tags.append(tagsHead);

  const tagsButtons = makeElement('div', 'tags__buttons');
  tags.append(tagsButtons);

  const buttonsContent = postJSON[4].tags.buttons.split(',');

  for (let i = 0; i < buttonsContent.length; i++) {
    const button = makeElement('button', 'tags__button');
    button.textContent = buttonsContent[i];
    tagsButtons.append(button);
  }

  const fragmentTags = document.createDocumentFragment();
  fragmentTags.append(tags);
  document.getElementsByClassName('aside')[0].append(fragmentTags);
}

/** ******************************************************************************/
// SECTION MAIN REVIEWS
function makeReviews(postJson) {
  const mainReviews = makeElement('div', 'reviews');

  const mainReviewsHeader = makeElement('div', 'reviews__header');
  mainReviewsHeader.textContent = postJson[5].reviews.header;
  mainReviews.append(mainReviewsHeader);

  const mainReviewsContent = makeElement('div', 'reviews__content');
  mainReviews.append(mainReviewsContent);

  const mainReviewsContentTimeline = makeElement('div', 'reviews__timeline');
  mainReviewsContent.append(mainReviewsContentTimeline);

  // const reviewsArray = postJson[5].reviews.posts;
  [...postJson[5].reviews.posts].forEach((post) => {
    const review = makeElement('div', 'reviews__review');

    const reviewInfo = makeReviewInfo(post);

    const reviewParagraph = makeElement('div', 'reviews__paragraph');
    reviewParagraph.textContent = post.paragraph;

    const reviewLink = makeElement('div', 'reviews__link');
    reviewLink.textContent = post.link;

    review.append(reviewInfo);
    review.append(reviewParagraph);
    review.append(reviewLink);
    mainReviewsContent.append(review);
  });

  const mainReviewsButton = makeElement('button', 'reviews__more');
  mainReviewsButton.textContent = postJson[5].reviews.buttonMore;
  mainReviews.append(mainReviewsButton);

  const mainReviewsFragment = document.createDocumentFragment();
  mainReviewsFragment.append(mainReviews);
  document.getElementsByClassName('main')[0].append(mainReviews);
}

function makeReviewInfo(post) {
  const reviewInfo = makeElement('div', 'reviews__info');

  const reviewAuthor = makeElement('div', 'reviews__author');

  reviewAuthor.textContent = post.author;
  reviewInfo.append(reviewAuthor);

  const reviewTime = makeReviewTime(post);
  reviewInfo.append(reviewTime);

  const reviewStars = makeReviewStars(post);
  reviewInfo.append(reviewStars);

  return reviewInfo;
}

function makeReviewTime(post) {
  const reviewTime = document.createElement('div');
  reviewTime.classList.add('reviews__time');

  const reviewTimeImg = document.createElement('img');
  reviewTimeImg.alt = 'time';
  reviewTimeImg.src = post.timeIcon;
  reviewTime.append(reviewTimeImg);

  const reviewTimeCounter = document.createElement('span');
  reviewTimeCounter.append(post.time);
  reviewTime.append(reviewTimeCounter);

  return reviewTime;
}

function makeReviewStars(post) {
  const reviewStars = document.createElement('div');
  reviewStars.classList.add('reviews__stars');

  const starsArray = post.stars.split(',');
  starsArray.forEach((star) => {
    const reviewStarsImg = document.createElement('img');
    reviewStarsImg.alt = 'star';
    reviewStarsImg.src = star;
    reviewStars.append(reviewStarsImg);
  });

  return reviewStars;
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

