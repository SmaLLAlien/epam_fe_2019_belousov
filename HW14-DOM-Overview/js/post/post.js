const xmlhttp = new XMLHttpRequest();
let data = {};
xmlhttp.onreadystatechange = getData;

xmlhttp.open('GET', 'js/post/data-post.json', false);
xmlhttp.send();

function getData() {
  if (this.readyState === 4 && this.status === 200) {
    data = JSON.parse(this.responseText);
  }
}

const header = document.getElementById('home');

/** ******************************************************************************/
// SECTION PAGE HEAD

const containerHead = document.createElement('div');
containerHead.classList.add('container');
header.insertAdjacentElement('afterend',containerHead);

const rowHead = document.createElement('div');
rowHead.classList.add('row');
containerHead.insertAdjacentElement('afterbegin', rowHead);

const sectionPageHead = document.createElement('section');
sectionPageHead.classList.add('page-head');
rowHead.append(sectionPageHead);

const pageHeadTitle = document.createElement('h1');
pageHeadTitle.classList.add('page-head__title');
sectionPageHead.append(pageHeadTitle);
pageHeadTitle.textContent = data[0].pageHead.title;

const pageHeadHeader = document.createElement('div');
pageHeadHeader.classList.add('page-head__header');
sectionPageHead.append(pageHeadHeader);

const pageHeadHeaderPhoto = document.createElement('div');
pageHeadHeaderPhoto.classList.add('page-head__photo');
pageHeadHeader.append(pageHeadHeaderPhoto);

const pageHeadHeaderPhotoImg = document.createElement('img');
pageHeadHeaderPhotoImg.alt = 'author';
pageHeadHeaderPhotoImg.src = data[0].pageHead.src;
pageHeadHeaderPhoto.append(pageHeadHeaderPhotoImg);

const pageHeadHeaderInfo = document.createElement('div');
pageHeadHeaderInfo.classList.add('page-head__info');
pageHeadHeader.append(pageHeadHeaderInfo);

const pageHeadHeaderInfoName = document.createElement('div');
pageHeadHeaderInfoName.classList.add('page-head__name');
pageHeadHeaderInfoName.textContent = data[0].pageHead.name;
pageHeadHeaderInfo.append(pageHeadHeaderInfoName);

const pageHeadHeaderInfoRates = document.createElement('div');
pageHeadHeaderInfoRates.classList.add('page-head__rates');
pageHeadHeaderInfo.append(pageHeadHeaderInfoRates);

// RATES
const pageHeadHeaderInfoRatesDate = document.createElement('div');
pageHeadHeaderInfoRatesDate.classList.add('page-head__date');
pageHeadHeaderInfoRatesDate.textContent = data[0].pageHead.date;
pageHeadHeaderInfoRates.append(pageHeadHeaderInfoRatesDate);

const pageHeadHeaderInfoRatesTime = document.createElement('div');
pageHeadHeaderInfoRatesTime.classList.add('page-head__time');
pageHeadHeaderInfoRatesTime.textContent = data[0].pageHead.time;
pageHeadHeaderInfoRates.append(pageHeadHeaderInfoRatesTime);

const pageHeadHeaderInfoRatesComments = document.createElement('div');
pageHeadHeaderInfoRatesComments.classList.add('page-head__comments');
pageHeadHeaderInfoRates.append(pageHeadHeaderInfoRatesComments);

const pageHeadHeaderInfoRatesCommentsImg = document.createElement('img');
pageHeadHeaderInfoRatesCommentsImg.classList.add('post__icon');
pageHeadHeaderInfoRatesCommentsImg.alt = 'icon-comments';
pageHeadHeaderInfoRatesCommentsImg.src = data[0].pageHead.commentsIcon;
pageHeadHeaderInfoRatesComments.append(pageHeadHeaderInfoRatesCommentsImg);

const pageHeadHeaderInfoRatesCommentsCount = document.createElement('span');
pageHeadHeaderInfoRatesCommentsCount.textContent = data[0].pageHead.commentCount;
pageHeadHeaderInfoRatesComments.append(pageHeadHeaderInfoRatesCommentsCount);

const pageHeadHeaderInfoRatesStars = document.createElement('div');
pageHeadHeaderInfoRatesStars.classList.add('page-head__stars');
pageHeadHeaderInfoRates.append(pageHeadHeaderInfoRatesStars);

for (let i = 0; i < 5; i++) {
  const img = document.createElement('img');
  img.alt = 'star';
  pageHeadHeaderInfoRatesStars.append(img);
}

const starsImgArray = [...pageHeadHeaderInfoRates.querySelectorAll('.page-head__stars > img')];
starsImgArray.forEach((img, index) => {
  img.src = data[0].pageHead.stars.split(',')[index];
});

/** ******************************************************************************/
// SECTION MAIN

const containerMain = document.createElement('div');
containerMain.classList.add('container');
containerHead.insertAdjacentElement('afterend',containerMain);

const rowMain = document.createElement('div');
rowMain.classList.add('row');
containerMain.insertAdjacentElement('afterbegin', rowMain);

const main = document.createElement('main');
main.classList.add('main');
rowMain.insertAdjacentElement('afterbegin', main);

/** ******************************************************************************/
// SECTION MAIN CONTENT
const mainContent = document.createElement('div');
mainContent.classList.add('content');
main.append(mainContent);

const post = document.createElement('div');
post.classList.add('post');
mainContent.append(post);

// POST PREVIEW
const postPreview = document.createElement('div');
postPreview.classList.add('post__preview');
post.append(postPreview);

const postPreviewImg = document.createElement('img');
postPreviewImg.classList.add('post__poster');
postPreviewImg.alt = 'poster';
postPreviewImg.src = data[1].post.preview;
postPreview.append(postPreviewImg);

// POST AUDIO
const postAudio = document.createElement('div');
postAudio.classList.add('post__audio');
post.append(postAudio);

const postAudioPlayer = document.createElement('audio');
postAudioPlayer.controls = true;
postAudioPlayer.src = data[1].post.audio;
postAudio.append(postAudioPlayer);

// POST TEXT
const postText = document.createElement('div');
postText.classList.add('post__text');
post.append(postText);

const postParagraphFirst = document.createElement('p');
postParagraphFirst.classList.add('post__paragraph');
postParagraphFirst.innerHTML = data[1].post.paragraphFirst;
postText.append(postParagraphFirst);

const spanBold = postParagraphFirst.querySelector('.post__paragraph > span');
spanBold.classList.add('post__bold');

const postParagraphSecond = document.createElement('p');
postParagraphSecond.classList.add('post__paragraph');
postParagraphSecond.textContent = data[1].post.paragraphSecond;
postText.append(postParagraphSecond);

const postParagraphThird = document.createElement('p');
postParagraphThird.classList.add('post__paragraph');
postParagraphThird.innerHTML = data[1].post.paragraphThird;
postText.append(postParagraphThird);

const spanBoldThird = postParagraphThird.querySelector('.post__paragraph > span');
spanBoldThird.classList.add('post__bold');

const postParagraphHeaderFirst = document.createElement('h2');
postParagraphHeaderFirst.classList.add('post__header');
postParagraphHeaderFirst.textContent = data[1].post.headerFirst;
postText.append(postParagraphHeaderFirst);

const postParagraphFourth = document.createElement('p');
postParagraphFourth.classList.add('post__paragraph');
postParagraphFourth.textContent = data[1].post.paragraphFourth;
postText.append(postParagraphFourth);

const postParagraphFives = document.createElement('p');
postParagraphFives.classList.add('post__paragraph');
postParagraphFives.innerHTML = data[1].post.paragraphFives;
postText.append(postParagraphFives);

const delText = postParagraphFives.querySelector('.post__paragraph > del');
delText.classList.add('post__crossed');

const postParagraphQuote = document.createElement('p');
postParagraphQuote.classList.add('post__quote');
postParagraphQuote.textContent = data[1].post.quote;
postText.append(postParagraphQuote);

const postParagraphHeaderSecond = document.createElement('h2');
postParagraphHeaderSecond.classList.add('post__header');
postParagraphHeaderSecond.textContent = data[1].post.headerSecond;
postText.append(postParagraphHeaderSecond);

const postParagraphSixes = document.createElement('p');
postParagraphSixes.classList.add('post__paragraph');
postParagraphSixes.innerHTML = data[1].post.paragraphSixes;
postText.append(postParagraphSixes);

const replaceLink = postParagraphSixes.querySelector('.post__paragraph > a');
replaceLink.classList.add('post__underline');

// POST CONTROLS
const postControls = document.createElement('div');
postControls.classList.add('post__controls');
post.append(postControls);

const postControlsLike = document.createElement('div');
postControlsLike.classList.add('post__likes');
postControls.append(postControlsLike);

const postControlsLikeIcon = document.createElement('img');
postControlsLikeIcon.classList.add('post__like');
postControlsLikeIcon.alt = 'like';
postControlsLikeIcon.src = data[1].post.like;
postControlsLike.append(postControlsLikeIcon);

const postControlsLikeCounter = document.createElement('span');
postControlsLikeCounter.textContent = data[1].post.likesCounter;
postControlsLike.append(postControlsLikeCounter);

const postControlsSocIcons = document.createElement('div');
postControlsSocIcons.classList.add('post__soc-icons');
postControls.append(postControlsSocIcons);

for (let i = 0; i < 3; i++) {
  const icon = document.createElement('div');
  icon.classList.add('post__soc-icon');

  const iconImg = document.createElement('img');

  icon.append(iconImg);
  postControlsSocIcons.append(icon);
}

const iconImgArray = [...postControlsSocIcons.querySelectorAll('.post__soc-icon > img')];
iconImgArray[0].src = data[1].post.facebook;
iconImgArray[0].alt = 'facebook';
iconImgArray[1].src = data[1].post.insta;
iconImgArray[1].alt = 'instagram';
iconImgArray[2].src = data[1].post.basket;
iconImgArray[2].alt = 'basket';

/** ******************************************************************************/
// SECTION MAIN ASIDE
const mainAside = document.createElement('aside');
mainAside.classList.add('aside');
main.append(mainAside);

// LATEST POST
const latest = document.createElement('div');
latest.classList.add('latest');
mainAside.append(latest);

const latestHeader = document.createElement('div');
latestHeader.classList.add('latest__header');
latestHeader.textContent = data[2].aside.header;
latest.append(latestHeader);

for (let i = 0; i < 2; i++) {
  const post = document.createElement('div');
  post.classList.add('latest__post');

  const sidePost = document.createElement('div');
  sidePost.classList.add('side-post');

  const sidePostPreview = document.createElement('div');
  sidePostPreview.classList.add('side-post__preview');

  const sidePostContent = document.createElement('div');
  sidePostContent.classList.add('side-post__content');

  const sidePostContentHeader = document.createElement('div');
  sidePostContentHeader.textContent = data[2].aside.asidePost.header;
  sidePostContentHeader.classList.add('side-post__header');

  const sidePostContentInfo = document.createElement('div');
  sidePostContentInfo.classList.add('side-post__info');

  const sidePostContentInfoRates = document.createElement('div');
  sidePostContentInfoRates.classList.add('side-post__rates');

  const sidePostContentInfoRatesDate = document.createElement('div');
  sidePostContentInfoRatesDate.classList.add('side-post__date');
  sidePostContentInfoRatesDate.textContent = data[2].aside.asidePost.date;

  const sidePostContentInfoRatesTime = document.createElement('div');
  sidePostContentInfoRatesTime.classList.add('side-post__time');
  sidePostContentInfoRatesTime.textContent = data[2].aside.asidePost.time;

  const sidePostContentInfoRatesComments = document.createElement('div');
  sidePostContentInfoRatesComments.classList.add('side-post__comments');

  const sidePostContentInfoRatesCommentsIcon = document.createElement('img');
  sidePostContentInfoRatesCommentsIcon.alt = 'icon-comments';
  sidePostContentInfoRatesCommentsIcon.src = data[2].aside.asidePost.iconComments;
  sidePostContentInfoRatesCommentsIcon.classList.add('side-post__icon');

  const sidePostContentInfoRatesCommentsCounter = document.createElement('span');
  sidePostContentInfoRatesCommentsCounter.textContent = data[2].aside.asidePost.commentsCounter;

  sidePostContentInfoRatesComments.append(sidePostContentInfoRatesCommentsIcon);
  sidePostContentInfoRatesComments.append(sidePostContentInfoRatesCommentsCounter);
  sidePostContentInfoRates.append(sidePostContentInfoRatesDate);
  sidePostContentInfoRates.append(sidePostContentInfoRatesTime);
  sidePostContentInfoRates.append(sidePostContentInfoRatesComments);
  sidePostContentInfo.append(sidePostContentInfoRates);
  sidePostContent.append(sidePostContentHeader);
  sidePostContent.append(sidePostContentInfo);
  sidePost.append(sidePostPreview);
  sidePost.append(sidePostContent);
  post.append(sidePost);
  latest.append(post);
}

const latestButton = document.createElement('button');
latestButton.classList.add('latest__button');
latestButton.textContent = data[2].aside.button;
latest.append(latestButton);

// CATEGORIES
const categories = document.createElement('div');
categories.classList.add('categories');
mainAside.append(categories);

const categoriesHeader = document.createElement('div');
categoriesHeader.classList.add('categories__header');
categoriesHeader.textContent = data[3].categories.header;
categories.append(categoriesHeader);

for (let i = 0; i < 5; i++) {
  const categoriesItems = document.createElement('div');
  categoriesItems.classList.add('categories__items');

  const categoriesItemsInput = document.createElement('input');
  categoriesItemsInput.classList.add('categories__input');
  categoriesItemsInput.type = 'checkbox';

  const categoriesItemsLabel = document.createElement('label');
  categoriesItemsLabel.classList.add('categories__label');

  if (i === 0) {
    categoriesItemsInput.id = data[3].categories.items.item1.id;
    categoriesItemsLabel.htmlFor = data[3].categories.items.item1.id;
    categoriesItemsLabel.textContent = data[3].categories.items.item1.label;
  }
  if (i === 1) {
    categoriesItemsInput.id = data[3].categories.items.item2.id;
    categoriesItemsLabel.htmlFor = data[3].categories.items.item2.id;
    categoriesItemsLabel.textContent = data[3].categories.items.item2.label;
  }
  if (i === 2) {
    categoriesItemsInput.id = data[3].categories.items.item3.id;
    categoriesItemsLabel.htmlFor = data[3].categories.items.item3.id;
    categoriesItemsLabel.textContent = data[3].categories.items.item3.label;
  }
  if (i === 3) {
    categoriesItemsInput.id = data[3].categories.items.item4.id;
    categoriesItemsLabel.htmlFor = data[3].categories.items.item4.id;
    categoriesItemsLabel.textContent = data[3].categories.items.item4.label;
  }
  if (i === 4) {
    categoriesItemsInput.id = data[3].categories.items.item5.id;
    categoriesItemsLabel.htmlFor = data[3].categories.items.item5.id;
    categoriesItemsLabel.textContent = data[3].categories.items.item5.label;
  }

  const categoriesItemsList = document.createElement('ul');
  categoriesItemsList.classList.add('categories__list');

  categoriesItems.append(categoriesItemsInput);
  categoriesItems.append(categoriesItemsLabel);
  categoriesItems.append(categoriesItemsList);
  categories.append(categoriesItems);
}

const categoriesItemsListArray = [...categories.querySelectorAll('.categories__list')];
const names = data[3].categories.items.links.split(',');

categoriesItemsListArray.forEach((ul) => {
  for (let i = 0; i < 3; i++) {
    const item = document.createElement('li');
    item.classList.add('categories__item');

    const itemLink = document.createElement('a');
    itemLink.src = '#';
    itemLink.classList.add('categories__link');
    itemLink.textContent = names[i];

    item.append(itemLink);
    ul.append(item);
  }
});

// TAGS
const tags = document.createElement('div');
tags.classList.add('tags');
mainAside.append(tags);

const tagsHead = document.createElement('div');
tagsHead.classList.add('tags__head');
tagsHead.textContent = data[4].tags.head;
tags.append(tagsHead);

const tagsButtons = document.createElement('div');
tagsButtons.classList.add('tags__buttons');
tags.append(tagsButtons);

const buttonsContent = data[4].tags.buttons.split(',');

for (let i = 0; i < 13; i++) {
  const button = document.createElement('button');
  button.classList.add('tags__button');
  button.textContent = buttonsContent[i];
  tagsButtons.append(button);
}

/** ******************************************************************************/
// SECTION MAIN REVIEWS
const mainReviews = document.createElement('div');
mainReviews.classList.add('reviews');
main.append(mainReviews);

const mainReviewsHeader = document.createElement('div');
mainReviewsHeader.classList.add('reviews__header');
mainReviewsHeader.textContent = data[5].reviews.header;
mainReviews.append(mainReviewsHeader);

const mainReviewsContent = document.createElement('div');
mainReviewsContent.classList.add('reviews__content');
mainReviews.append(mainReviewsContent);

const mainReviewsContentTimeline = document.createElement('div');
mainReviewsContentTimeline.classList.add('reviews__timeline');
mainReviewsContent.append(mainReviewsContentTimeline);

for (let i = 0; i < 3; i++) {
  const review = document.createElement('div');
  review.classList.add('reviews__review');

  const reviewInfo = document.createElement('div');
  reviewInfo.classList.add('reviews__info');

  const reviewAuthor = document.createElement('div');
  reviewAuthor.classList.add('reviews__author');
  reviewInfo.append(reviewAuthor);

  const reviewStars = document.createElement('div');
  reviewStars.classList.add('reviews__stars');
  reviewInfo.append(reviewStars);

  const reviewTime = document.createElement('div');
  reviewTime.classList.add('reviews__time');
  reviewInfo.append(reviewTime);

  const reviewTimeImg = document.createElement('img');
  reviewTimeImg.alt = 'time';
  reviewTimeImg.src = data[5].reviews.timeIcon;
  reviewTime.append(reviewTimeImg);

  const reviewParagraph = document.createElement('div');
  reviewParagraph.classList.add('reviews__paragraph');

  const reviewLink = document.createElement('div');
  reviewLink.textContent = data[5].reviews.link;
  reviewLink.classList.add('reviews__link');

  review.append(reviewInfo);
  review.append(reviewParagraph);
  review.append(reviewLink);
  mainReviewsContent.append(review);
}

const authorsArray = [...mainReviewsContent.querySelectorAll('.reviews__author')];
authorsArray[0].textContent = data[5].reviews.post1.author;
authorsArray[1].textContent = data[5].reviews.post2.author;
authorsArray[2].textContent = data[5].reviews.post3.author;

const timeArray = [...mainReviewsContent.querySelectorAll('.reviews__time')];
timeArray[0].append(data[5].reviews.post1.time);
timeArray[1].append(data[5].reviews.post2.time);
timeArray[2].append(data[5].reviews.post3.time);

const paragraphArray = [...mainReviewsContent.querySelectorAll('.reviews__paragraph')];
paragraphArray[0].textContent = data[5].reviews.post1.paragraph;
paragraphArray[1].textContent = data[5].reviews.post2.paragraph;
paragraphArray[2].textContent = data[5].reviews.post3.paragraph;

const starsReviewsImgArray = [...mainReviewsContent.querySelectorAll('.reviews__stars')];
starsReviewsImgArray.forEach((divStar, index) => {
  const post = `post${index + 1}`;
  const starsArray = data[5].reviews[post].stars.split(',');
  for (let i = 0; i < 5; i++) {
    const reviewStarsImg = document.createElement('img');
    reviewStarsImg.alt = 'star';
    reviewStarsImg.src = starsArray[i];
    divStar.append(reviewStarsImg);
  }
});

const mainReviewsButton = document.createElement('button');
mainReviewsButton.classList.add('reviews__more');
mainReviewsButton.textContent = data[5].reviews.buttonMore;
mainReviews.append(mainReviewsButton);

/** ******************************************************************************/
// TO HOME

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

document.body.append(toHome);
