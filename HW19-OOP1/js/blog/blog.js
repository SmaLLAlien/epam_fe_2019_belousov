import {makeAddPostElement} from '../addPost.js';

function main() {
  const url = 'http://localhost:3000/api/list';
  const urlBlog = 'js/blog/data-blog.json';

  const getData = (url) => {
    return fetch(url, {
      method: 'GET',
    });
  };

  const requests = [getData(url), getData(urlBlog)];
  Promise.all(requests)
    .then((responses) => {
      return Promise.all(responses.map((response) => response.json()));
    })
    .then((responses) => {
      const data = responses[1];
      makeSectionBlog(data);

      const posts = responses[0];
      makeSectionPosts(posts);
      makePostMoreButton();

      const footer = document.getElementsByClassName('footer')[0];
      const wrapper = document.getElementsByClassName('wrapper')[0];
      wrapper.append(footer);
      makeToHome();
      makeAddPostElement();
    })
    .catch((error) => {
      alert(`${error.message} check if you run server`);
    });
}

document.addEventListener('DOMContentLoaded', main);

const makeElement = (elementType, elementClass) => {
  const element = document.createElement(elementType);
  element.classList.add(elementClass);
  return element;
};

/** ******************************************************************************/
// SECTION BLOG

function makeSectionBlog(data) {
  const fragmentHeader = document.createDocumentFragment();
  const sectionBlog = makeElement('section', 'blog');
  sectionBlog.id = 'blog';

  const blogTop = makeBlogTop(data);
  sectionBlog.append(blogTop);

  const containerBlog = makeElement('div', 'container');
  sectionBlog.append(containerBlog);

  const rowBlog = makeElement('div', 'row');
  containerBlog.insertAdjacentElement('afterbegin', rowBlog);

  const blogSearch = makeInputSearch();
  rowBlog.append(blogSearch);

  fragmentHeader.append(sectionBlog);
  const wrapper = document.getElementsByClassName('wrapper')[0];
  wrapper.append(fragmentHeader);
}

function makeBlogTop(data) {
  const blogTop = makeElement('div', 'blog__top');

  const blogTopHeader = makeElement('h2', 'blog__header');
  blogTop.insertAdjacentElement('afterbegin', blogTopHeader);
  blogTopHeader.textContent = data[0].blog.header;

  const blogTopFigure = makeElement('div','blog__figure');
  blogTop.append(blogTopFigure);

  return blogTop;
}

function makeInputSearch() {
  const blogSearch = makeElement('div', 'blog__search');

  const blogSearchInput = makeElement('input', 'blog__input');
  blogSearch.append(blogSearchInput);
  blogSearch.type = 'search';
  blogSearchInput.placeholder = 'Search by author';

  return blogSearch;
}

/** ******************************************************************************/
// SECTION POSTS
function makeSectionPosts(posts) {
  const fragmentPosts = document.createDocumentFragment();
  const sectionPosts = document.createElement('section');
  fragmentPosts.append(sectionPosts);
  sectionPosts.id = 'posts';

  const containerPosts = makeElement('div', 'container');
  sectionPosts.append(containerPosts);

  const rowPosts = makeElement('div', 'row');
  containerPosts.insertAdjacentElement('afterbegin', rowPosts);

  const sectionPostsPosts = makeElement('div', 'posts');
  rowPosts.append(sectionPostsPosts);

  const postsOfArray = [...posts];

  postsOfArray.forEach((postJson) => {
    const post = makeElement('div', 'post');

    const postPreview = makePreview(postJson);
    const postDescription = makePostDescription(postJson);
    const objParamToCheckPostType = {postJson, postPreview, postDescription,post};
    checkpostType(objParamToCheckPostType);

    post.append(postPreview);
    post.append(postDescription);
    sectionPostsPosts.append(post);
  });

  const wrapper = document.getElementsByClassName('wrapper')[0];
  fragmentPosts.append(sectionPosts);
  wrapper.append(fragmentPosts);
}

function makePreview(postJson) {
  const postPreview = makeElement('div', 'post__preview');
  postPreview.style.background = `url(${postJson.urlPreview}) no-repeat center center/cover`;
  postPreview.style.backgroundOrigin = 'content-box';
  postPreview.style.backgroundClip = 'content-box';
  postPreview.classList.add('preview');
  return postPreview;
}

function checkpostType({postJson, postPreview, postDescription, post}) {
  // check what the type of post and add needed class and some elements such as video or music
  if (postJson.type === 'Video') {
    post.classList.add('post--video');
    const videoPost = makeVideoPlayer(postJson);
    postPreview.append(videoPost);
  }
  if (postJson.type === 'Audio') {
    post.classList.add('post--audio');
    const postDescriptionParagraphTopMusicContainer = makeMusicPlayer(postJson);
    postDescription.querySelector('.post__top').insertAdjacentElement('afterend', postDescriptionParagraphTopMusicContainer);
  }

  if (postJson.type === 'Picture') {
    post.classList.add('post--pic');
  }

  if (postJson.type === 'Text') {
    post.classList.add('post--txt');
  }
}

function makeMusicPlayer(postJson) {
  // if type music player
  const postDescriptionParagraphTopMusicContainer = makeElement('div', 'post__audio');

  const postDescriptionParagraphTopMusicContainerAudio = document.createElement('audio');
  postDescriptionParagraphTopMusicContainerAudio.controls = true;
  postDescriptionParagraphTopMusicContainerAudio.src = postJson.url;
  postDescriptionParagraphTopMusicContainer.append(postDescriptionParagraphTopMusicContainerAudio);
  return postDescriptionParagraphTopMusicContainer;
}

function makeVideoPlayer(postJson) {
  // if type video player
  const videoPost = document.createElement('video');
  videoPost.src = postJson.url;
  videoPost.poster = postJson.urlPreview;
  videoPost.controls = true;
  return videoPost;
}

function makePostDescriptionHeader(postJson) {
  // add user photo
  const postDescriptionHeader = makeElement('div', 'post__header');

  const postDescriptionHeaderPhoto = makeElement('div', 'post__photo');

  const postDescriptionHeaderPhotoImg = document.createElement('img');
  postDescriptionHeaderPhotoImg.src = postJson.authorPhoto;
  postDescriptionHeaderPhoto.append(postDescriptionHeaderPhotoImg);
  postDescriptionHeader.append(postDescriptionHeaderPhoto);
  return postDescriptionHeader;
}

function makePostDescriptionHeaderInfo(postJson) {
  // add author name
  const postDescriptionHeaderInfo = makeElement('div', 'post__info');

  const postDescriptionHeaderInfoName = makeElement('div', 'post__name');
  postDescriptionHeaderInfoName.textContent = postJson.author;
  postDescriptionHeaderInfo.append(postDescriptionHeaderInfoName);
  return postDescriptionHeaderInfo;
}

function makeInfoRates(postJson) {
  // add info about post: date, time, call func comments
  const postDescriptionHeaderInfoRates = makeElement('div', 'post__rates');

  // RATES
  const postDescriptionHeaderInfoRatesDate = makeElement('div', 'post__date');
  postDescriptionHeaderInfoRatesDate.textContent = postJson.date;
  postDescriptionHeaderInfoRates.append(postDescriptionHeaderInfoRatesDate);

  const postDescriptionHeaderInfoRatesTime = makeElement('div', 'post__time');
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
  const postDescriptionHeaderInfoRatesComments = makeElement('div', 'post__comments');

  const postDescriptionHeaderInfoRatesCommentsImg = makeElement('img', 'post__icon');
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
  const postDescriptionHeaderInfoRatesStars = makeElement('div', 'post__stars');

  for (let i = 0; i < 5; i++) {
    const img = document.createElement('img');
    img.alt = 'star';
    img.src = postJson.stars.split(',')[i];
    postDescriptionHeaderInfoRatesStars.append(img);
  }

  return postDescriptionHeaderInfoRatesStars;
}

function getText({desc, type}) {
  let paragraph = '';
  for (const text in desc) {
    // get first paragraph
    if (text.substring(0, text.length - 1) === 'paragraph') {
      paragraph = desc[text];
      break;
    }
  }
  // slice text
  if (type === 'Text') {
    paragraph = `${paragraph.substr(0, 300)}...`;
  } else {
    paragraph = `${paragraph.substr(0, 100)}...`;
  }

  return paragraph;
}

function makeDescriptionParagraph(postJson) {
  const text = getText(postJson);
  // add post paragraph header and main text
  const postDescriptionParagraph = makeElement('div', 'post__paragraph');

  const postDescriptionParagraphTop = makeElement('div', 'post__top');
  postDescriptionParagraphTop.textContent = postJson.title;
  postDescriptionParagraph.append(postDescriptionParagraphTop);

  const postDescriptionParagraphText = makeElement('div', 'post__text');
  postDescriptionParagraphText.textContent = text;
  postDescriptionParagraph.append(postDescriptionParagraphText);

  return postDescriptionParagraph;
}

function makePostDescriptionButton(postJson) {
  // add button to read more
  const postDescriptionButton = makeElement('button', 'post__button');
  postDescriptionButton.setAttribute('data-post-id', postJson.id);
  postDescriptionButton.textContent = 'Read more';
  postDescriptionButton.addEventListener('click', () => window.location.href = `./post.html?q=${postJson.id}`);
  return postDescriptionButton;
}

function makePostDescription(postJson) {
  const postDescription = makeElement('div', 'post__description');

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

  const postDescriptionButton = makePostDescriptionButton(postJson);
  postDescription.append(postDescriptionButton);

  return postDescription;
}

function makePostMoreButton() {
  const postMoreButton = makeElement('button', 'posts__load');
  postMoreButton.textContent = 'Read more';
  document.getElementsByClassName('posts')[0].append(postMoreButton);
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

