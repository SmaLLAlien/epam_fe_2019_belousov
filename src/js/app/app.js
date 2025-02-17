import '../../scss/app/app-main.scss';
import mediator from '../mediator';
import {VideoPost, AudioPost, PicturePost, TextPost} from '../postClass.js';

document.addEventListener('DOMContentLoaded', main);
function main() {
  getData()
    .then((response) => response.json())
    // eslint-disable-next-line max-statements
    .then((response) => {
      const posts = new Map();
      for (let i = 0; i < response.length; i++) {
        const author = response[i].author;
        const temp = [];
        for (let j = 0; j < response.length; j++) {
          // eslint-disable-next-line max-depth
          if (response[i].author === response[j].author) {
            temp.push(response[j]);
            posts.set(author, temp);
          }
        }
      }
      mediator.subscribe('authorClicked', makeTitleUpSection);
      mediator.subscribe('authorClicked', makeTitleAsideSection);
      mediator.subscribe('titleClicked', highlightUpTitle);
      mediator.subscribe('titleClicked', makeSectionPost);
      const wrapper = document.querySelector('.wrapper');
      const footer = document.querySelector('.footer');
      const appWrapper = makeAppWraper(posts);

      wrapper.append(appWrapper);
      wrapper.append(footer);
    });
}

function getData() {
  const url = 'http://localhost:3000/api/articles';
  return fetch(url, {
    method: 'GET',
  });
}

const makeElement = (elementType, elementClass) => {
  const element = document.createElement(elementType);
  element.classList.add(elementClass);
  return element;
};

function makeAppWraper(posts) {
  const appWrapper = makeElement('section', 'appWrapper');
  const authorUpSection = makeAuthorUp(posts);
  const mainSection = makeSectionMain(posts);
  appWrapper.append(authorUpSection);
  appWrapper.append(mainSection);
  return appWrapper;
}

function makeAuthorUp(posts) {
  const section = makeElement('section', 'author-up');
  const container = makeElement('div', 'author-up__container');
  container.addEventListener('click', ({target, currentTarget}) => {
    if (currentTarget === container && target !== container) {
      const previousCurrentAuthor = currentTarget.querySelector('currentAuthor');
      if (previousCurrentAuthor) {
        previousCurrentAuthor.classList.remove('currentAuthor');
      }
      target.classList.add('currentAuthor');
      const author = target.textContent;
      mediator.publish('authorClicked', {posts, author});
    }
  });

  if (posts.size) {
    for (const author of posts.keys()) {
      const authorDiv = makeElement('div', 'author-up__author');
      authorDiv.textContent = author;
      container.append(authorDiv);
    }
  }
  section.append(container);
  return section;
}

// eslint-disable-next-line max-statements
function makeTitleUpSection({posts, author}) {
  const authorSection = document.querySelector('.author-up');
  const titleSection = authorSection.querySelector('.titleUp');
  if (titleSection) {
    titleSection.remove();
  }

  const section = makeElement('div', 'titleUp');
  const container = makeElement('div', 'titleUp__container');
  if (posts.get(author)) {
    const articles = posts.get(author);
    articles.forEach((article) => {
      const titleDiv = makeElement('div', 'titleUp__title');
      titleDiv.textContent = article.title;
      container.append(titleDiv);
    });
  }

  [...authorSection.firstElementChild.children].forEach((authorDiv) => {
    if (authorDiv.textContent === author) {
      authorDiv.classList.add('currentAuthor');
    } else {
      authorDiv.classList.remove('currentAuthor');
    }
  });
  container.addEventListener('click', ({target, currentTarget}) => {
    if (currentTarget === container && target !== container) {
      target.classList.add('currentTitle');
      const title = target.textContent;
      mediator.publish('titleClicked', {posts, author, title});
    }
  });
  section.append(container);
  authorSection.append(section);
  return section;
}

function highlightUpTitle({title}) {
  const titleUpContainer = document.querySelector('.titleUp__container');
  [...titleUpContainer.children].forEach((titleDiv) => {
    if (titleDiv.textContent === title) {
      titleDiv.classList.add('currentTitle');
    } else {
      titleDiv.classList.remove('currentTitle');
    }
  });

  const titleAsideContainer = document.querySelector('.list__title-container');
  [...titleAsideContainer.children].forEach((titleDiv) => {
    if (titleDiv.textContent === title) {
      titleDiv.classList.add('currentTitle');
    } else {
      titleDiv.classList.remove('currentTitle');
    }
  });
}

function makeSectionMain(posts) {
  const main = makeElement('section', 'main');
  const post = makeElement('div', 'posts');
  const defaultPicture = makeElement('img', 'posts__default');
  defaultPicture.src = 'https://miro.medium.com/max/3200/1*J1DCNQGwBsRPRS5t0bhoig.jpeg';
  post.append(defaultPicture);
  post.id = 'postContainer';
  const aside = makeSectionAside(posts);

  main.append(post);
  main.append(aside);

  return main;
}

function makeSectionPost({posts, author, title}) {
  const postContainer = document.getElementById('postContainer');
  postContainer.innerHTML = '';
  const articlesArray = posts.get(author);
  articlesArray.forEach((article) => {
    if (article.title === title) {
      const post = returnNeededTypePost(article);
      post.renderBlogPost(postContainer);
    }
  });
}

function makeSectionAside(posts) {
  const section = makeElement('section', 'aside');
  const container = makeElement('div', 'list');
  // eslint-disable-next-line complexity,max-statements
  container.addEventListener('click', ({target, currentTarget}) => {
    if (currentTarget === container && target.classList.contains('list__author')) {
      const previousCurrentAuthor = currentTarget.querySelector('.currentAuthor');
      if (previousCurrentAuthor) {
        previousCurrentAuthor.classList.remove('currentAuthor');
      }
      target.classList.add('currentAuthor');
      const author = target.textContent;
      target.setAttribute('data-author', `${author}`);
      mediator.publish('authorClicked', {posts, author});
    } else if (currentTarget === container && target.classList.contains('list__title')) {
      const previousCurrent = currentTarget.querySelector('.currentTitle');
      if (previousCurrent) {
        previousCurrent.classList.remove('currentTitle');
      }
      target.classList.add('currentTitle');
      const author = target.closest('.list__item').querySelector('.currentAuthor').textContent;

      const title = target.textContent;
      mediator.publish('titleClicked', {posts, author, title});
    }
  });

  if (posts.size) {
    for (const author of posts.keys()) {
      const authorContainer = makeElement('div', 'list__item');
      const authorDiv = makeElement('div', 'list__author');
      authorDiv.textContent = author;
      authorContainer.append(authorDiv);
      container.append(authorContainer);
    }
  }
  section.append(container);
  return section;
}

function makeTitleAsideSection({posts, author}) {
  const authorSection = document.querySelector('.list');
  const asidePostBlockArray = [...document.getElementsByClassName('list__author')];

  const titleSection = authorSection.querySelector('.list__title-container');
  if (titleSection) {
    titleSection.remove();
  }

  const titleAside = makeElement('div', 'list__title-container');
  if (posts.get(author)) {
    const articles = posts.get(author);
    articles.forEach((article) => {
      const titleDiv = makeElement('div', 'list__title');
      titleDiv.textContent = article.title;
      titleAside.append(titleDiv);
    });
  }

  asidePostBlockArray.forEach((blockAuthor) => {
    if (blockAuthor.textContent === author) {
      blockAuthor.classList.add('currentAuthor');
      blockAuthor.after(titleAside);
    } else {
      blockAuthor.classList.remove('currentAuthor');
    }
  });
}

function returnNeededTypePost(post) {
  switch (post.type) {
    case 'Audio': return new AudioPost(post);
    case 'Video': return new VideoPost(post);
    case 'Picture': return new PicturePost(post);
    case 'Text': return new TextPost(post);
  }
}

