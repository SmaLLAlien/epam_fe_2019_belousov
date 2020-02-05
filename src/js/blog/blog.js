import '../../scss/blog/blog-main.scss';
import '../modal';

import {makeAddPostElement} from '../addPost.js';
import {VideoPost, AudioPost, PicturePost, TextPost} from '../postClass.js';

function main() {
  const url = 'http://localhost:3000/api/articles';
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
    // eslint-disable-next-line max-statements
    .then((responses) => {
      const data = responses[1];
      makeSectionBlog(data);

      const posts = responses[0];
      localStorage.setItem('posts', JSON.stringify(posts));
      if (window.location.search) {
        const filter = window.location.search.match(/[a-z]+/)[0];
        const filteredPosts = findPosts(posts, JSON.parse(localStorage.getItem('search')), filter);
        showFilter(filter);
        makeSectionPosts(filteredPosts);
      } else {
        makeSectionPosts(posts);
      }

      makePostMoreButton();

      const footer = document.getElementsByClassName('footer')[0];
      const wrapper = document.getElementsByClassName('wrapper')[0];
      wrapper.append(footer);
      makeToHome();
      makeAddPostElement();
      showSubscribeModal();
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

function findPosts(posts, searchValue, searchedProperty) {
  const regexp = new RegExp(searchValue, 'gi');
  return posts.filter((post) => {
    if (post[searchedProperty].match(regexp)) {
      return post;
    }
  });
}

/** ******************************************************************************/
// SECTION BLOG

function showSubscribeModal() {
  const title = 'Subscribe to this blog and be the first to know about updates';
  // eslint-disable-next-line no-undef
  $.fn.modal('success', `${title}`, ['ok', 'cancel'], 'subscribe', 10000);
}

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
    const allPostsArray = JSON.parse(localStorage.getItem('posts'));
    searchResultData = findPosts(allPostsArray, input.value, 'author');
  } else {
    input.classList.add('blog__input--invalid');
  }
  if (searchResultData.length) {
    window.history.pushState('', '', `Blog.html?author=${input.value};`);
    localStorage.setItem('search', JSON.stringify(input.value));
    makeSectionPosts(searchResultData);
    showFilter('author');
  } else if (input.value) {
    showNoPostMessage();
  }
}

function findTitle(input) {
  let searchResultData = [];
  if (input.value) {
    input.classList.remove('blog__input--invalid');
    const allPostsArray = JSON.parse(localStorage.getItem('posts'));
    searchResultData = findPosts(allPostsArray, input.value, 'title');
  } else {
    input.classList.add('blog__input--invalid');
  }
  if (searchResultData.length) {
    window.history.pushState('', '', `Blog.html?title=${input.value};`);
    localStorage.setItem('search', JSON.stringify(input.value));
    makeSectionPosts(searchResultData);
    showFilter('title');
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

function showFilter(value) {
  const blogSearch = document.getElementsByClassName('blog__search')[0];
  const div = makeElement('div', 'filter');
  const divValue = makeElement('div', 'filter__value');
  divValue.textContent = value;
  div.addEventListener('click', removeFilter);

  div.append(divValue);
  blogSearch.after(div);
}

function removeFilter() {
  this.removeEventListener('click', removeFilter);
  this.remove();
  window.history.pushState('', '', 'Blog.html');
  makeSectionPosts(JSON.parse(localStorage.getItem('posts')));
}

/** ******************************************************************************/
// SECTION POSTS
// eslint-disable-next-line max-statements
function makeSectionPosts(posts) {
  const sectionPosts = document.getElementById('posts');
  const postsOfArray = [...posts];
  if (sectionPosts) {
    const sectionPostsPosts = sectionPosts.getElementsByClassName('posts')[0];
    sectionPostsPosts.innerHTML = '';

    postsOfArray.forEach((postJson) => {
      const post = returnNeededTypePost(postJson);
      post.renderBlogPost(sectionPostsPosts);
    });
  } else {
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
    if (posts.length) { // check if there is any post
      postsOfArray.forEach((postJson) => {
        const post = returnNeededTypePost(postJson);
        post.renderBlogPost(sectionPostsPosts);
      });
      // listen to delete post
      sectionPosts.addEventListener('noPostLeft', () => makeNoPostBlock(sectionPostsPosts));
    } else {
      makeNoPostBlock(sectionPostsPosts);
    }

    const wrapper = document.getElementsByClassName('wrapper')[0];
    fragmentPosts.append(sectionPosts);
    wrapper.append(fragmentPosts);
  }
}

function returnNeededTypePost(post) {
  switch (post.type) {
    case 'Audio': return new AudioPost(post);
    case 'Video': return new VideoPost(post);
    case 'Picture': return new PicturePost(post);
    case 'Text': return new TextPost(post);
  }
}

function makePostMoreButton() {
  const postMoreButton = makeElement('button', 'posts__load');
  postMoreButton.textContent = 'Read more';
  document.getElementsByClassName('posts')[0].append(postMoreButton);
}

function makeNoPostBlock(parent) {
  const div = makeElement('div', 'posts__absent');
  div.textContent = 'There are no articles here, you can add new by clicking the button above';
  parent.prepend(div);
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
