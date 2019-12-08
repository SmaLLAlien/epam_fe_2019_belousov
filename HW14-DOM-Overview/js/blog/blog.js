const xmlhttp = new XMLHttpRequest();
let data = {};
xmlhttp.onreadystatechange = getData;

xmlhttp.open('GET', 'js/blog/data-blog.json', false);
xmlhttp.send();

function getData() {
  if (this.readyState === 4 && this.status === 200) {
    data = JSON.parse(this.responseText);
  }
}

const wrapper = document.getElementsByClassName('wrapper')[0];

/** ******************************************************************************/
// SECTION BLOG

const fragmentHeader = document.createDocumentFragment();
const sectionBlog = document.createElement('section');
sectionBlog.classList.add('blog');
// header.insertAdjacentElement('afterend', sectionBlog);
sectionBlog.id = 'blog';

const blogTop = document.createElement('div');
blogTop.classList.add('blog__top');
sectionBlog.append(blogTop);

const blogTopHeader = document.createElement('h2');
blogTopHeader.classList.add('blog__header');
blogTop.insertAdjacentElement('afterbegin', blogTopHeader);
blogTopHeader.textContent = data[0].blog.header;

const blogTopFigure = document.createElement('div');
blogTopFigure.classList.add('blog__figure');
blogTop.append(blogTopFigure);

const containerBlog = document.createElement('div');
containerBlog.classList.add('container');
sectionBlog.append(containerBlog);

const rowBlog = document.createElement('div');
rowBlog.classList.add('row');
containerBlog.insertAdjacentElement('afterbegin', rowBlog);

const blogSearch = document.createElement('div');
blogSearch.classList.add('blog__search');
rowBlog.append(blogSearch);

const blogSearchInput = document.createElement('input');
blogSearchInput.classList.add('blog__input');
blogSearch.append(blogSearchInput);
blogSearch.type = 'search';
blogSearchInput.placeholder = 'Search by author';

/** ******************************************************************************/
// SECTION POSTS
const fragmentPosts = fragmentHeader.cloneNode();
const sectionPosts = document.createElement('section');
// sectionBlog.insertAdjacentElement('afterend', sectionPosts);
fragmentPosts.append(sectionPosts);
sectionPosts.id = 'posts';

const containerPosts = document.createElement('div');
containerPosts.classList.add('container');
sectionPosts.append(containerPosts);

const rowPosts = document.createElement('div');
rowPosts.classList.add('row');
containerPosts.insertAdjacentElement('afterbegin', rowPosts);

const sectionPostsPosts = document.createElement('div');
sectionPostsPosts.classList.add('posts');
rowPosts.append(sectionPostsPosts);

const postsOfArray = data[1].psts;

postsOfArray.forEach((postJson) => {
  const post = document.createElement('div');
  post.classList.add('post');

  const postPreview = makePreview();
  const postDescription = makePostDescription(postJson);
  const objParamToCheckPostType = {postJson, postPreview, postDescription,post};
  checkpostType(objParamToCheckPostType);

  post.append(postPreview);
  post.append(postDescription);
  sectionPostsPosts.append(post);
});

function makePreview() {
  const postPreview = document.createElement('div');
  postPreview.classList.add('post__preview');
  return postPreview;
}

function checkpostType({postJson, postPreview, postDescription, post}) {
  // check what the type of post and add needed class and some elements such as video or music
  if (postJson.type === 'video') {
    post.classList.add('post--video');
    const videoPost = makeVideoPlayer(postJson);
    postPreview.append(videoPost);
  }
  if (postJson.type === 'audio') {
    post.classList.add('post--audio');
    const postDescriptionParagraphTopMusicContainer = makeMusicPlayer(postJson);
    postDescription.querySelector('.post__top').insertAdjacentElement('afterend', postDescriptionParagraphTopMusicContainer);
  }

  if (postJson.type === 'pic') {
    post.classList.add('post--pic');
  }

  if (postJson.type === 'txt') {
    post.classList.add('post--txt');
  }
}

function makeMusicPlayer(postJson) {
  // if type music player
  const postDescriptionParagraphTopMusicContainer = document.createElement('div');
  postDescriptionParagraphTopMusicContainer.classList.add('post__audio');

  const postDescriptionParagraphTopMusicContainerAudio = document.createElement('audio');
  postDescriptionParagraphTopMusicContainerAudio.controls = true;
  postDescriptionParagraphTopMusicContainerAudio.src = postJson.src;
  postDescriptionParagraphTopMusicContainer.append(postDescriptionParagraphTopMusicContainerAudio);
  return postDescriptionParagraphTopMusicContainer;
}

function makeVideoPlayer(postJson) {
  // if type video player
  const videoPost = document.createElement('video');
  videoPost.src = postJson.src;
  videoPost.poster = postJson.poster;
  videoPost.controls = true;
  return videoPost;
}

function makePostDescriptionHeader(postJson) {
  // add user photo
  const postDescriptionHeader = document.createElement('div');
  postDescriptionHeader.classList.add('post__header');

  const postDescriptionHeaderPhoto = document.createElement('div');
  postDescriptionHeaderPhoto.classList.add('post__photo');

  const postDescriptionHeaderPhotoImg = document.createElement('img');
  postDescriptionHeaderPhotoImg.src = postJson.photo;
  postDescriptionHeaderPhoto.append(postDescriptionHeaderPhotoImg);
  postDescriptionHeader.append(postDescriptionHeaderPhoto);
  return postDescriptionHeader;
}

function makePostDescriptionHeaderInfo(postJson) {
  // add author name
  const postDescriptionHeaderInfo = document.createElement('div');
  postDescriptionHeaderInfo.classList.add('post__info');

  const postDescriptionHeaderInfoName = document.createElement('div');
  postDescriptionHeaderInfoName.classList.add('post__name');
  postDescriptionHeaderInfoName.textContent = postJson.name;
  postDescriptionHeaderInfo.append(postDescriptionHeaderInfoName);
  return postDescriptionHeaderInfo;
}

function makeInfoRates(postJson) {
  // add info about post: date, time, call func comments
  const postDescriptionHeaderInfoRates = document.createElement('div');
  postDescriptionHeaderInfoRates.classList.add('post__rates');

  // RATES
  const postDescriptionHeaderInfoRatesDate = document.createElement('div');
  postDescriptionHeaderInfoRatesDate.classList.add('post__date');
  postDescriptionHeaderInfoRatesDate.textContent = postJson.date;
  postDescriptionHeaderInfoRates.append(postDescriptionHeaderInfoRatesDate);

  const postDescriptionHeaderInfoRatesTime = document.createElement('div');
  postDescriptionHeaderInfoRatesTime.classList.add('post__time');
  postDescriptionHeaderInfoRatesTime.textContent = postJson.time;
  postDescriptionHeaderInfoRates.append(postDescriptionHeaderInfoRatesTime);

  const postDescriptionHeaderInfoRatesComments = makePostDescriptionHeaderInfoRatesComments(postJson);
  postDescriptionHeaderInfoRates.append(postDescriptionHeaderInfoRatesComments);

  const postDescriptionHeaderInfoRatesStars = postDescriptionHeaderInfoRatesStar(postJson);
  postDescriptionHeaderInfoRates.append(postDescriptionHeaderInfoRatesStars);

  return postDescriptionHeaderInfoRates;
}

function makePostDescriptionHeaderInfoRatesComments(postJson) {
  // add number of comments
  const postDescriptionHeaderInfoRatesComments = document.createElement('div');
  postDescriptionHeaderInfoRatesComments.classList.add('post__comments');

  const postDescriptionHeaderInfoRatesCommentsImg = document.createElement('img');
  postDescriptionHeaderInfoRatesCommentsImg.classList.add('post__icon');
  postDescriptionHeaderInfoRatesCommentsImg.alt = 'icon-comments';
  postDescriptionHeaderInfoRatesCommentsImg.src = 'img/blog/a-icon-comment.svg';
  postDescriptionHeaderInfoRatesComments.append(postDescriptionHeaderInfoRatesCommentsImg);

  const postDescriptionHeaderInfoRatesCommentsCount = document.createElement('span');
  postDescriptionHeaderInfoRatesCommentsCount.textContent = postJson.commentsCount;
  postDescriptionHeaderInfoRatesComments.append(postDescriptionHeaderInfoRatesCommentsCount);

  return postDescriptionHeaderInfoRatesComments;
}

function postDescriptionHeaderInfoRatesStar(postJson) {
  // add number of post stars
  const postDescriptionHeaderInfoRatesStars = document.createElement('div');
  postDescriptionHeaderInfoRatesStars.classList.add('post__stars');

  for (let i = 0; i < 5; i++) {
    const img = document.createElement('img');
    img.alt = 'star';
    img.src = postJson.stars.split(',')[i];
    postDescriptionHeaderInfoRatesStars.append(img);
  }

  return postDescriptionHeaderInfoRatesStars;
}

function makeDescriptionParagraph(postJson) {
  // add post paragraph header and main text
  const postDescriptionParagraph = document.createElement('div');
  postDescriptionParagraph.classList.add('post__paragraph');

  const postDescriptionParagraphTop = document.createElement('div');
  postDescriptionParagraphTop.classList.add('post__top');
  postDescriptionParagraphTop.textContent = postJson.paragraphTop;
  postDescriptionParagraph.append(postDescriptionParagraphTop);

  const postDescriptionParagraphText = document.createElement('div');
  postDescriptionParagraphText.classList.add('post__text');
  postDescriptionParagraphText.textContent = postJson.text;
  postDescriptionParagraph.append(postDescriptionParagraphText);

  return postDescriptionParagraph;
}

function makePostDescriptionButton() {
  // add button to read more
  const postDescriptionButton = document.createElement('button');
  postDescriptionButton.classList.add('post__button');
  postDescriptionButton.textContent = 'Read more';

  return postDescriptionButton;
}

function makePostDescription(postJson) {
  const postDescription = document.createElement('div');
  postDescription.classList.add('post__description');

  const postDescriptionHeader = makePostDescriptionHeader(postJson);
  postDescription.append(postDescriptionHeader);

  // POST INFO
  const postDescriptionHeaderInfo = makePostDescriptionHeaderInfo(postJson);
  postDescriptionHeader.append(postDescriptionHeaderInfo);

  const postDescriptionHeaderInfoRates = makeInfoRates(postJson);
  postDescriptionHeaderInfo.append(postDescriptionHeaderInfoRates);

  // POST PARAGRAPH
  const postDescriptionParagraph = makeDescriptionParagraph(postJson);
  postDescription.append(postDescriptionParagraph);

  const postDescriptionButton = makePostDescriptionButton();
  postDescription.append(postDescriptionButton);

  return postDescription;
}

const postMoreButton = document.createElement('button');
postMoreButton.classList.add('posts__load');
postMoreButton.textContent = 'Read more';
sectionPostsPosts.append(postMoreButton);

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

fragmentHeader.append(sectionBlog);
wrapper.append(fragmentHeader);

fragmentPosts.append(sectionPosts);
wrapper.append(fragmentPosts);

const footer = document.getElementsByClassName('footer')[0];
wrapper.append(footer);
