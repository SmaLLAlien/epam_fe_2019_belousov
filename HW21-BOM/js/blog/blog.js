import {makeAddPostElement} from '../addPost.js';
import {VideoPost, AudioPost, PicturePost, TextPost} from '../postClass.js';

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
      localStorage.setItem('data', JSON.stringify(posts));
      if (window.location.search) {
        makeSectionPosts(JSON.parse(localStorage.getItem('search')));
      } else {
        makeSectionPosts(JSON.parse(localStorage.getItem('data')));
      }

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

  const blogSearch = makeInputSearch(data);
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
  blogSearchInput.type = 'search';
  blogSearchInput.placeholder = 'Search';

  blogSearchInput.addEventListener('blur', removeInvalidClass);

  function removeInvalidClass(event) {
    if (event.target.value) {
      event.target.classList.remove('blog__input--invalid');
    }
  }

  const blogSearchButtonAuthor = makeSearchButton('author');
  const blogSearchButtonTitle = makeSearchButton('title');
  blogSearch.append(blogSearchButtonAuthor);
  blogSearch.append(blogSearchButtonTitle);

  blogSearchButtonAuthor.addEventListener('click', () => {
    findAuthor(blogSearchInput);
  });
  blogSearchButtonTitle.addEventListener('click', () => {
    findTitle(blogSearchInput);
  });

  return blogSearch;
}

function makeSearchButton(whatToFind) {
  const blogSearchButtonAuthor = makeElement('button', 'blog__find');
  blogSearchButtonAuthor.type = 'button';
  blogSearchButtonAuthor.textContent = `Find ${whatToFind}`;

  return blogSearchButtonAuthor;
}

function findAuthor(input) {
  let searchResultData = [];
  if (input.value) {
    input.classList.remove('blog__input--invalid');
    const allPostsArray = JSON.parse(localStorage.getItem('data'));
    searchResultData = allPostsArray.filter((post) => {
      const regexp = new RegExp(input.value, 'gi');
      if (post.author.match(regexp)) {
        return post;
      }
    });
  } else {
    input.classList.add('blog__input--invalid');
  }
  if (searchResultData.length) {
    window.location.search = `author=${input.value};`;
    localStorage.setItem('search', JSON.stringify(searchResultData));
    makeSectionPosts(searchResultData);
  } else if (input.value) {
    showNoPostMessage();
  }
}

function findTitle(input) {
  let searchResultData = [];
  if (input.value) {
    input.classList.remove('blog__input--invalid');
    const allPostsArray = JSON.parse(localStorage.getItem('data'));
    searchResultData = allPostsArray.filter((post) => {
      const regexp = new RegExp(input.value, 'gi');
      if (post.title.match(regexp)) {
        return post;
      }
    });
  } else {
    input.classList.add('blog__input--invalid');
  }
  if (searchResultData.length) {
    window.location.search = `title=${input.value};`;
    localStorage.setItem('search', JSON.stringify(searchResultData));
    makeSectionPosts(searchResultData);
  } else if (input.value) {
    showNoPostMessage();
  }
}

function showNoPostMessage() {
  const div = makeElement('div', 'no-message');
  div.textContent = 'Oops! There is no such post';
  document.body.append(div);
  setTimeout(() => {
    div.remove();
  },1000);
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
    if (postJson.type === 'Audio') {
      const audioPost = new AudioPost(postJson);
      audioPost.renderBlogPost(sectionPostsPosts);
    } else if (postJson.type === 'Video') {
      const videoPost = new VideoPost(postJson);
      videoPost.renderBlogPost(sectionPostsPosts);
    } else if (postJson.type === 'Picture') {
      const picturePost = new PicturePost(postJson);
      picturePost.renderBlogPost(sectionPostsPosts);
    } else {
      const textPost = new TextPost(postJson);
      textPost.renderBlogPost(sectionPostsPosts);
    }
  });

  const wrapper = document.getElementsByClassName('wrapper')[0];
  fragmentPosts.append(sectionPosts);
  wrapper.append(fragmentPosts);
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

