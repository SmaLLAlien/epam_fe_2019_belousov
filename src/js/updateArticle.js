export function updatePost(post) {
  const _wrapper = document.getElementsByClassName('wrapper')[0];
  const addFormFragment = createForm(post);
  _wrapper.style.display = 'none';
  document.body.prepend(addFormFragment);
}

// eslint-disable-next-line max-statements
function createForm(post) {
  const desc = post.desc;
  const form = makeElem('form', 'update');
  form.setAttribute('data-id', `${post._id}`);
  const fragment = document.createDocumentFragment();

  const title = makeElem('h2', 'update__title');
  title.textContent = 'Update article description';
  form.append(title);

  const keys = Object.keys(desc);
  keys.forEach((key) => {
    if (key !== 'time' && desc[key].length) {
      // dont display time and empty keys
      const tag = key.match(/[a-z]{6,}/g)[0];
      const textArea = makeElem('textarea', `update__${tag}`);
      textArea.value = desc[key];
      textArea.setAttribute('data-original-tag', `${tag}`);
      const descAddContainer = makeAddFieldsButtons();

      form.append(textArea);
      form.append(descAddContainer);
    }
  });

  const buttonsContainer = createButtons(post);
  form.append(buttonsContainer);
  fragment.append(form);

  return fragment;
}

// eslint-disable-next-line max-statements
function createButtons(post) {
  const buttonsContainer = makeElem('div', 'update__button-container');

  const addButton = makeElem('button', 'update__button');
  addButton.type = 'button';
  addButton.textContent = 'Update';
  addButton.addEventListener('click', buildArticle.bind(null, post));

  const resetButton = makeElem('button', 'update__reset-button');
  resetButton.type = 'reset';
  resetButton.textContent = 'Reset';

  const closeButton = makeElem('button', 'update__close-button');
  closeButton.type = 'button';
  closeButton.textContent = 'Close form';
  closeButton.addEventListener('click', closeForm);

  buttonsContainer.append(addButton);
  buttonsContainer.append(resetButton);
  buttonsContainer.append(closeButton);

  return buttonsContainer;
}

function makeAddFieldsButtons() {
  const descAddContainer = makeElem('div', 'update__desc-add');

  const descAddHeader = makeElem('button', 'update__add-btn');
  descAddHeader.textContent = 'Add header';
  descAddHeader.type = 'button';

  const descAddParagraph = makeElem('button', 'update__add-btn');
  descAddParagraph.textContent = 'Add paragraph';
  descAddParagraph.type = 'button';

  descAddContainer.prepend(descAddParagraph);
  descAddContainer.prepend(descAddHeader);

  descAddHeader.addEventListener('click', addHeader);
  descAddParagraph.addEventListener('click', addParagraph);

  return descAddContainer;
}

function addHeader(e) {
  e.preventDefault();
  const textArea = makeElem('textarea', 'update__header');
  textArea.setAttribute('data-original-tag', 'header');
  e.target.closest('div').before(textArea);
  return textArea;
}

function addParagraph(e) {
  e.preventDefault();
  const textArea = makeElem('textarea', 'update__paragraph');
  textArea.setAttribute('data-original-tag', 'paragraph');
  e.target.closest('div').before(textArea);
  return textArea;
}

function closeForm(event) {
  const form = event.target.closest('.update');
  const _wrapper = document.getElementsByClassName('wrapper')[0];
  _wrapper.style.display = 'flex';
  form.remove();
}

function buildArticle(post) {
  const articleDescription = {};
  const form = document.getElementsByClassName('update')[0];
  const textAreaArray = [...form.getElementsByTagName('textarea')];
  textAreaArray.forEach((textArea, index) => {
    if (textArea.value) {
      const tag = textArea.dataset.originalTag + index;
      articleDescription[tag] = textArea.value;
    }
  });
  post.desc = articleDescription;
  sendArticle(post);
}

function sendArticle(post) {
  const form = document.getElementsByClassName('update')[0];
  const url = `http://localhost:3000/api/update-articles/${form.dataset.id}`;
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = './blog.html';
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
}

const makeElem = (elementType, elementClass) => {
  const element = document.createElement(elementType);
  element.classList.add(elementClass);
  return element;
};
