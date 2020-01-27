
const makeElem = (elementType, elementClass) => {
  const element = document.createElement(elementType);
  element.classList.add(elementClass);
  return element;
};

export function makeAddPostElement() {
  const addPostContainer = makeElem('div', 'add-post');

  const addPostButton = makeElem('button', 'add-post__button');
  addPostButton.textContent = 'Add new post';

  const addPostfragment = document.createDocumentFragment();
  addPostContainer.append(addPostButton);

  addPostfragment.append(addPostContainer);
  const documentHeader = document.getElementById('home');

  documentHeader.after(addPostfragment);

  addPostButton.addEventListener('click', showForm);
}

function showForm() {
  const _wrapper = document.getElementsByClassName('wrapper')[0];
  const addFromFragment = createForm();
  _wrapper.style.display = 'none';
  document.body.prepend(addFromFragment);
}

const onSubmit = (event) => {
  event.preventDefault();
  const ref = 'http://localhost:3000/api/create-article';

  const data = new Date(event.target.date.value.toString()).toDateString().substring(4);

  const type = event.target.postType.value;
  const url = event.target.url.value;
  const urlPreview = event.target.urlPreview.value || 'img/post/poster.jpg';
  const title = event.target.title.value;
  const author = event.target.author.value;
  const date = data;
  const desc = getDataFromDescription();
  const quote = event.target.quote.value;
  const additionalInfo = {
    id: Date.now(),
    likesCounter: 0,
    facebook: 'img/blog/a-icon-facebook.svg',
    insta: 'img/blog/a-icon-instagram.svg',
    basket: 'img/blog/a-icon-dribbble.svg',
    commentsIcon: 'img/post/a-icon-comment.svg',
    stars: 'img/blog/Star-2.svg,img/blog/Star-2.svg,img/blog/Star-2.svg,img/blog/Star-2.svg,img/blog/Star-2.svg',
    authorPhoto: 'img/blog/Sarah.png',
    like: 'img/post/a-icon-like-1.svg',
    time: desc.time,
    commentsCount: 0,
  };

  const obj = {type, url, urlPreview, title, author, date, desc, quote};
  Object.assign(obj, additionalInfo);

  sendPost(ref, JSON.stringify(obj))
    .then((res) => {
      if (res.ok) {
        const _wrapper = document.getElementsByClassName('wrapper')[0];
        _wrapper.style.display = 'block';
        const form = document.getElementsByClassName('add-form')[0];
        form.remove();
        window.location.href = `./post.html?q=${obj.id}`;
      }
    })
    .catch((error) => {alert(error);});
};

function getDataFromDescription() {
  const obj = {};
  const descContent = document.querySelector('.add-form__desc-content');
  const contentDivs = [...descContent.children];
  let len = 0; // to count time to read
  const speed = 300; // letters per minute
  contentDivs.forEach((elem, index) => {
    // add data to obj with keys: headers and paragraph
    if (elem.classList.contains('add-form__desc-header-container')) {
      obj[`header${index}`] = elem.getElementsByClassName('add-form__dec-header')[0].value;
    } else {
      obj[`paragraph${index}`] = elem.getElementsByClassName('add-form__dec-field')[0].value;
      len += obj[`paragraph${index}`].length;
    }
  });
  obj.time = `${(len / speed).toFixed(0)} min read`; // count time to read post
  return obj;
}

const sendPost = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
};

function createForm() {// eslint-disable-line max-statements
  // TYPE
  const form = makeElem('form', 'add-form');

  const selectPostType = makeElem('select', 'add-form__type');
  selectPostType.id = 'postType';
  selectPostType.addEventListener('change', addFields);

  const typesArray = ['Video', 'Audio', 'Text', 'Picture'];
  for (let i = 0; i < typesArray.length; i++) {
    const option = makeElem('option', 'add-form__options');
    option.textContent = typesArray[i];
    selectPostType.append(option);
  }

  form.append(selectPostType);

  const containersClases = ['add-form__link-container', 'add-form__preview-container', 'add-form__title-container', 'add-form__author-container', 'add-form__date-container'];
  const labelClases = ['add-form__link-label', 'add-form__link-label', 'add-form__title-label', 'add-form__author-label', 'add-form__date-label'];
  const inputClases = ['add-form__link-field', 'add-form__link-field', 'add-form__title-field', 'add-form__author-field', 'add-form__date-field'];
  const typesFieldArray = ['url', 'url', 'text', 'text', 'date'];
  const idFieldArray = ['url', 'urlPreview', 'title', 'author', 'date'];
  const textLabelArray = ['Insert link to video', 'Insert link to Video poster image', 'Title', 'Author', 'Date'];

  for (let i = 0; i < containersClases.length; i++) {
    const container = makeElem('div', containersClases[i]);
    const label = makeElem('label', labelClases[i]);
    const input = makeElem('input', inputClases[i]);
    input.type = typesFieldArray[i];
    input.id = idFieldArray[i];
    label.htmlFor = idFieldArray[i];
    label.textContent = textLabelArray[i];

    if (idFieldArray[i] === 'title') {
      input.required = true;
      input.addEventListener('blur', titleValidation);
    }

    if (idFieldArray[i] === 'date') {
      input.readOnly = true;
      const date = new Date();
      input.value = date.toISOString().substr(0, 10);
    }

    container.append(label);
    container.append(input);
    form.append(container);
  }

  // DESCRIPTION
  const descContainer = makeElem('div', 'add-form__desc-container');
  const descLabel = makeElem('label', 'add-form__desc-label');

  descLabel.textContent = 'Description';
  descLabel.htmlFor = 'date';

  const descAddContainer = makeElem('div', 'add-form__desc-add');

  const descAddHeader = makeElem('button', 'add-form__add-btn');
  descAddHeader.textContent = 'Add header';
  descAddHeader.type = 'button';

  const descAddParagraph = makeElem('button', 'add-form__add-btn');
  descAddParagraph.textContent = 'Add paragraph';
  descAddParagraph.type = 'button';

  descAddContainer.prepend(descAddParagraph);
  descAddContainer.prepend(descAddHeader);

  descAddHeader.addEventListener('click', addHeader);
  descAddParagraph.addEventListener('click', addParagraph);

  const descAddContentContainer = makeElem('div', 'add-form__desc-content');

  descContainer.append(descLabel);
  descContainer.append(descAddContainer);
  descContainer.append(descAddContentContainer);
  // descContainer.append(descInput);
  form.append(descContainer);

  const quoteContainer = makeElem('div', 'add-form__quote-container');
  const quoteLabel = makeElem('label', 'add-form__quote-label');
  quoteLabel.textContent = 'Quote';
  const quoteInput = makeElem('textarea', 'add-form__quote-field');
  quoteInput.rows = 10;
  quoteInput.rows = 20;
  quoteInput.id = 'quote';

  quoteContainer.append(quoteLabel);
  quoteContainer.append(quoteInput);
  form.append(quoteContainer);

  const buttonsContainer = makeElem('div', 'add-form__button-container');

  const addButton = makeElem('button', 'add-form__button');
  addButton.type = 'submit';
  addButton.textContent = 'ADD';

  const resetButton = makeElem('button', 'add-form__reset-button');
  resetButton.type = 'reset';
  resetButton.textContent = 'Reset';

  const closeButton = makeElem('button', 'add-form__close-button');
  closeButton.type = 'button';
  closeButton.textContent = 'Close form';
  closeButton.addEventListener('click', closeForm);

  buttonsContainer.append(addButton);
  buttonsContainer.append(resetButton);
  buttonsContainer.append(closeButton);

  form.append(buttonsContainer);

  const addFromFragment = document.createDocumentFragment();
  addFromFragment.append(form);

  form.addEventListener('submit', onSubmit);

  return addFromFragment;
}

function addHeader(e) {
  e.preventDefault();
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('add-form__desc-header-container');

  const headerLabel = document.createElement('div');
  headerLabel.textContent = 'header';

  const headerInput = document.createElement('input');
  headerInput.type = 'text';

  headerLabel.classList.add('add-form__desc-label');
  headerInput.classList.add('add-form__dec-header');

  headerLabel.append(headerInput);
  headerContainer.append(headerLabel);

  const parent = document.querySelector('.add-form__desc-content');
  parent.append(headerContainer);
}

function addParagraph(e) {
  e.preventDefault();
  const paragraphContainer = document.createElement('div');
  paragraphContainer.classList.add('add-form__desc-paragraph-container');

  const paragraphLabel = document.createElement('div');
  paragraphLabel.textContent = 'paragraph';
  const paragraphInput = document.createElement('textarea');

  paragraphLabel.classList.add('add-form__desc-label');
  paragraphInput.classList.add('add-form__dec-field');

  paragraphContainer.append(paragraphLabel);
  paragraphContainer.append(paragraphInput);

  const parent = document.querySelector('.add-form__desc-content');
  parent.append(paragraphContainer);
}

function addFields(e) {
  const previewContainer = document.getElementsByClassName('add-form__preview-container')[0];
  const contentLinkContainer = document.getElementsByClassName('add-form__link-container')[0];
  const labelLink = contentLinkContainer.querySelector('.add-form__link-label');
  const labelPreview = previewContainer.querySelector('.add-form__link-label');

  if (e.target.value === 'Video') {
    showBlock(previewContainer, contentLinkContainer);
    labelLink.textContent = 'Insert link to Video';
    labelPreview.textContent = 'Insert link to Video poster image';
  } else if (e.target.value === 'Audio') {
    showBlock(previewContainer, contentLinkContainer);
    labelLink.textContent = 'Insert link to Audio';
    labelPreview.textContent = 'Insert link to post preview image';
  } else if (e.target.value === 'Picture') {
    previewContainer.style.display = 'block';
    contentLinkContainer.style.display = 'none';
    labelPreview.textContent = 'Insert link to post preview image';
  } else {
    hideBlock(previewContainer, contentLinkContainer);
  }
}

function showBlock(previewContainer, contentLinkContainer) {
  previewContainer.style.display = 'block';
  contentLinkContainer.style.display = 'block';
}

function hideBlock(previewContainer, contentLinkContainer) {
  previewContainer.style.display = 'none';
  contentLinkContainer.style.display = 'none';
}

function closeForm(event) {
  const form = event.target.closest('.add-form');
  const _wrapper = document.getElementsByClassName('wrapper')[0];
  _wrapper.style.display = 'block';
  form.remove();
}

/** ******************************************************************/
// TITTLE VALIDATION

function titleValidation(event) {
  const title = event.target.value;
  const check = validateTitle(title);
  const span = makeElem('div', 'add-form__title-error-text');
  span.style.color = 'red';
  span.style.margin = '-20px 0 20px 0';
  if (!event.target.parentElement.getElementsByClassName('add-form__title-error-text')[0]) {
    event.target.parentElement.append(span);
  }

  if (check) {
    event.target.classList.remove('add-form__error');
    document.forms[0].getElementsByClassName('add-form__button')[0].disabled = false;
    event.target.parentElement.getElementsByClassName('add-form__title-error-text')[0].innerHTML = '';
  } else {
    event.target.classList.add('add-form__error');
    document.forms[0].getElementsByClassName('add-form__button')[0].disabled = true;
    event.target.parentElement.getElementsByClassName('add-form__title-error-text')[0].textContent = 'Title is Incorrect';
  }
}

function validateTitle(title) {
  const regExp = /^[A-Z]([a-zA-Z?\- !:.,]{5,59})$/g;
  return regExp.test(title);
}
