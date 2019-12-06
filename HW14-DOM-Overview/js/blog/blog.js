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

const header = document.getElementById('home');

/** ******************************************************************************/
// SECTION BLOG

const sectionBlog = document.createElement('section');
sectionBlog.classList.add('blog');
header.insertAdjacentElement('afterend', sectionBlog);
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

const sectionPosts = document.createElement('section');
sectionBlog.insertAdjacentElement('afterend', sectionPosts);
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

for (let i = 0; i < 4; i++) {
  const post = document.createElement('div');
  post.classList.add('post');

  const postPreview = document.createElement('div');
  postPreview.classList.add('post__preview');

  const postDescription = document.createElement('div');
  postDescription.classList.add('post__description');

  // POST DESCRIPTION
  // POST HEADER
  const postDescriptionHeader = document.createElement('div');
  postDescriptionHeader.classList.add('post__header');

  const postDescriptionHeaderPhoto = document.createElement('div');
  postDescriptionHeaderPhoto.classList.add('post__photo');

  const postDescriptionHeaderPhotoImg = document.createElement('img');
  postDescriptionHeaderPhoto.append(postDescriptionHeaderPhotoImg);
  postDescriptionHeader.append(postDescriptionHeaderPhoto);

  // POST INFO
  const postDescriptionHeaderInfo = document.createElement('div');
  postDescriptionHeaderInfo.classList.add('post__info');
  postDescriptionHeader.append(postDescriptionHeaderInfo);

  const postDescriptionHeaderInfoName = document.createElement('div');
  postDescriptionHeaderInfoName.classList.add('post__name');
  postDescriptionHeaderInfo.append(postDescriptionHeaderInfoName);

  const postDescriptionHeaderInfoRates = document.createElement('div');
  postDescriptionHeaderInfoRates.classList.add('post__rates');
  postDescriptionHeaderInfo.append(postDescriptionHeaderInfoRates);

  // RATES
  const postDescriptionHeaderInfoRatesDate = document.createElement('div');
  postDescriptionHeaderInfoRatesDate.classList.add('post__date');
  postDescriptionHeaderInfoRates.append(postDescriptionHeaderInfoRatesDate);

  const postDescriptionHeaderInfoRatesTime = document.createElement('div');
  postDescriptionHeaderInfoRatesTime.classList.add('post__time');
  postDescriptionHeaderInfoRates.append(postDescriptionHeaderInfoRatesTime);

  const postDescriptionHeaderInfoRatesComments = document.createElement('div');
  postDescriptionHeaderInfoRatesComments.classList.add('post__comments');
  postDescriptionHeaderInfoRates.append(postDescriptionHeaderInfoRatesComments);

  const postDescriptionHeaderInfoRatesCommentsImg = document.createElement('img');
  postDescriptionHeaderInfoRatesCommentsImg.classList.add('post__icon');
  postDescriptionHeaderInfoRatesCommentsImg.alt = 'icon-comments';
  postDescriptionHeaderInfoRatesCommentsImg.src = 'img/blog/a-icon-comment.svg';
  postDescriptionHeaderInfoRatesComments.append(postDescriptionHeaderInfoRatesCommentsImg);

  const postDescriptionHeaderInfoRatesCommentsCount = document.createElement('span');
  postDescriptionHeaderInfoRatesComments.append(postDescriptionHeaderInfoRatesCommentsCount);

  const postDescriptionHeaderInfoRatesStars = document.createElement('div');
  postDescriptionHeaderInfoRatesStars.classList.add('post__stars');
  postDescriptionHeaderInfoRates.append(postDescriptionHeaderInfoRatesStars);

  for (let i = 0; i < 5; i++) {
    const img = document.createElement('img');
    img.alt = 'star';
    postDescriptionHeaderInfoRatesStars.append(img);
  }

  // POST PARAGRAPH
  const postDescriptionParagraph = document.createElement('div');
  postDescriptionParagraph.classList.add('post__paragraph');

  const postDescriptionParagraphTop = document.createElement('div');
  postDescriptionParagraphTop.classList.add('post__top');
  postDescriptionParagraph.append(postDescriptionParagraphTop);

  if (i === 2) {
    const postDescriptionParagraphTopMusicContainer = document.createElement('div');
    postDescriptionParagraphTopMusicContainer.classList.add('post__audio');

    const postDescriptionParagraphTopMusicContainerAudio = document.createElement('audio');
    postDescriptionParagraphTopMusicContainerAudio.controls = true;
    postDescriptionParagraphTopMusicContainerAudio.src = data[1].posts.postAudio.src;
    postDescriptionParagraphTopMusicContainer.append(postDescriptionParagraphTopMusicContainerAudio);

    postDescriptionParagraphTop.insertAdjacentElement('afterend', postDescriptionParagraphTopMusicContainer);
  }

  const postDescriptionParagraphText = document.createElement('div');
  postDescriptionParagraphText.classList.add('post__text');
  postDescriptionParagraph.append(postDescriptionParagraphText);

  const postDescriptionButton = document.createElement('button');
  postDescriptionButton.classList.add('post__button');
  postDescriptionButton.textContent = 'Read more';

  post.append(postPreview);
  post.append(postDescription);
  postDescription.append(postDescriptionHeader);
  postDescription.append(postDescriptionParagraph);
  postDescription.append(postDescriptionButton);
  sectionPostsPosts.insertAdjacentElement('afterbegin', post);
}

const postsArray = [...sectionPostsPosts.querySelectorAll('.post')];
postsArray[0].classList.add('post--video');
postsArray[1].classList.add('post--audio');
postsArray[2].classList.add('post--pic');
postsArray[3].classList.add('post--txt');

const poststPreviewArray = [...sectionPostsPosts.querySelectorAll('.post__preview')];
const videoPost = document.createElement('video');
videoPost.src = data[1].posts.postVideo.src;
videoPost.poster = data[1].posts.postVideo.poster;
videoPost.controls = true;
poststPreviewArray[0].append(videoPost);

const postsPhotoArray = [...sectionPostsPosts.querySelectorAll('.post__photo > img')];
postsPhotoArray.forEach((img) => img.alt = 'author');
postsPhotoArray[0].src = data[1].posts.postVideo.photo;
postsPhotoArray[1].src = data[1].posts.postAudio.photo;
postsPhotoArray[2].src = data[1].posts.postPic.photo;
postsPhotoArray[3].src = data[1].posts.postText.photo;

const postsNameArray = [...sectionPostsPosts.querySelectorAll('.post__name')];
postsNameArray[0].textContent = data[1].posts.postVideo.name;
postsNameArray[1].textContent = data[1].posts.postAudio.name;
postsNameArray[2].textContent = data[1].posts.postPic.name;
postsNameArray[3].textContent = data[1].posts.postText.name;

const postsDateArray = [...sectionPostsPosts.querySelectorAll('.post__date')];
postsDateArray[0].textContent = data[1].posts.postVideo.date;
postsDateArray[1].textContent = data[1].posts.postAudio.date;
postsDateArray[2].textContent = data[1].posts.postPic.date;
postsDateArray[3].textContent = data[1].posts.postText.date;

const postsTimeArray = [...sectionPostsPosts.querySelectorAll('.post__time')];
postsTimeArray[0].textContent = data[1].posts.postVideo.time;
postsTimeArray[1].textContent = data[1].posts.postAudio.time;
postsTimeArray[2].textContent = data[1].posts.postPic.time;
postsTimeArray[3].textContent = data[1].posts.postText.time;

const postsCommentsCountArray = [...sectionPostsPosts.querySelectorAll('.post__comments > span')];
postsCommentsCountArray[0].textContent = data[1].posts.postVideo.commentsCount;
postsCommentsCountArray[1].textContent = data[1].posts.postAudio.commentsCount;
postsCommentsCountArray[2].textContent = data[1].posts.postPic.commentsCount;
postsCommentsCountArray[3].textContent = data[1].posts.postText.commentsCount;

const postsStarsArray = [...sectionPostsPosts.querySelectorAll('.post__stars')];

const starsImgArrayVideo = [...postsStarsArray[0].querySelectorAll('.post__stars > img')];
starsImgArrayVideo.forEach((img, index) => {
  img.src = data[1].posts.postVideo.stars.split(',')[index];
});

const starsImgArrayAudio = [...postsStarsArray[1].querySelectorAll('.post__stars > img')];
starsImgArrayAudio.forEach((img, index) => {
  img.src = data[1].posts.postAudio.stars.split(',')[index];
});

const starsImgArrayPic = [...postsStarsArray[2].querySelectorAll('.post__stars > img')];
starsImgArrayPic.forEach((img, index) => {
  img.src = data[1].posts.postPic.stars.split(',')[index];
});

const starsImgArrayText = [...postsStarsArray[3].querySelectorAll('.post__stars > img')];
starsImgArrayText.forEach((img, index) => {
  img.src = data[1].posts.postText.stars.split(',')[index];
});

const postsParagrapthTopArray = [...sectionPostsPosts.querySelectorAll('.post__top')];
postsParagrapthTopArray[0].textContent = data[1].posts.postVideo.paragraphTop;
postsParagrapthTopArray[1].textContent = data[1].posts.postAudio.paragraphTop;
postsParagrapthTopArray[2].textContent = data[1].posts.postPic.paragraphTop;
postsParagrapthTopArray[3].textContent = data[1].posts.postText.paragraphTop;

const postsParagrapthTextArray = [...sectionPostsPosts.querySelectorAll('.post__text')];
postsParagrapthTextArray[0].textContent = data[1].posts.postVideo.text;
postsParagrapthTextArray[1].textContent = data[1].posts.postAudio.text;
postsParagrapthTextArray[2].textContent = data[1].posts.postPic.text;
postsParagrapthTextArray[3].textContent = data[1].posts.postText.text;

const postMoreButton = document.createElement('button');
postMoreButton.classList.add('posts__load');
postMoreButton.textContent = 'Read more';
sectionPostsPosts.append(postMoreButton);

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
