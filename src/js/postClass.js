import {updatePost} from './updateArticle';

export class Post {
  constructor(obj) {
    this.data = obj;
    this.postBlog = this._makeElement('div', 'post');
  }

  _makeElement(elementType, elementClass) {
    const element = document.createElement(elementType);
    element.classList.add(elementClass);
    return element;
  }

  blogPost(parent) {// eslint-disable-line max-statements
    const makeElement = this._makeElement.bind(this);
    const postJson = this.data;
    const post = this.postBlog;
    const self = this;
    this.postBlogPreview = makePreview(postJson);
    this.postBlogDescription = makePostDescription(postJson);

    this.postBlog.append(this.postBlogPreview);
    this.postBlog.append(this.postBlogDescription);
    parent.append(post);

    function makePreview(postJson) {
      const postPreview = makeElement('div', 'post__preview');
      postPreview.style.background = `url(${postJson.urlPreview}) no-repeat center center/cover`;
      postPreview.style.backgroundOrigin = 'content-box';
      postPreview.style.backgroundClip = 'content-box';
      postPreview.classList.add('preview');
      return postPreview;
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
      postDescriptionHeaderInfoRatesCommentsImg.setAttribute('alt', 'icon-comments');
      postDescriptionHeaderInfoRatesCommentsImg.setAttribute('src', 'img/blog/a-icon-comment.svg');

      postDescriptionHeaderInfoRatesComments.append(postDescriptionHeaderInfoRatesCommentsImg);

      const postDescriptionHeaderInfoRatesCommentsCount = document.createElement('span');
      postDescriptionHeaderInfoRatesCommentsCount.textContent = postJson.commentsCount;
      postDescriptionHeaderInfoRatesComments.append(postDescriptionHeaderInfoRatesCommentsCount);

      return postDescriptionHeaderInfoRatesComments;
    }

    function postDescriptionHeaderInfoRatesStar(postJson) {
      // add number of post stars
      const MAX_STARS_AMOUNT = 5;
      const postDescriptionHeaderInfoRatesStars = makeElement('div', 'post__stars');

      for (let i = 0; i < MAX_STARS_AMOUNT; i++) {
        const img = document.createElement('img');

        img.setAttribute('alt', 'star');
        img.setAttribute('src', `${postJson.stars.split(',')[i]}`);
        postDescriptionHeaderInfoRatesStars.append(img);
      }

      return postDescriptionHeaderInfoRatesStars;
    }

    function getText({desc, type}) {
      let paragraph = '';
      for (const text in desc) {
        // get first paragraph

        if (text.match(/[a-z]{4,}/g)[0] === 'paragraph') {
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
      self.postDescriptionButton = makeElement('button', 'post__button');
      self.postDescriptionButton.setAttribute('data-post-id', postJson._id);
      self.postDescriptionButton.textContent = 'Read more';
      // self.postDescriptionButton.addEventListener('click', () => window.location.href = `./post.html?q=${postJson.id}`);
      return self.postDescriptionButton;
    }

    function makePostDeleteButton(postJson) {
      // add  delete post button
      self.postDeleteButton = makeElement('button', 'post__button');
      self.postDeleteButton.setAttribute('data-post-id', postJson._id);
      self.postDeleteButton.textContent = 'Delete post';
      return self.postDeleteButton;
    }

    function makePostUpdateButton(postJson) {
      // add  update  post button
      self.postUpdateButton = makeElement('button', 'post__button');
      self.postUpdateButton.setAttribute('data-post-id', postJson._id);
      self.postUpdateButton.textContent = 'Update post';
      return self.postUpdateButton;
    }

    // eslint-disable-next-line max-statements
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

      const postDeleteButton = makePostDeleteButton(postJson);
      postDescription.append(postDeleteButton);

      const posUpdateButton = makePostUpdateButton(postJson);
      postDescription.append(posUpdateButton);

      return postDescription;
    }
  }

  deletePost(event) {
    const reason = event.detail.reason;
    if (reason === 'deletePost') {
      const id = this.postDeleteButton.getAttribute('data-post-id');
      const url = `http://localhost:3000/api/delete-articles/${id}`;
      fetch(url, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
        .then((res) => res.json())
        .then(() => {
          const post = this.postDeleteButton.closest('.post');
          post.remove();
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }

  _getId(event) {
    return event.target.getAttribute('data-post-id');
  }

  addListeners() {
    this.postDescriptionButton.addEventListener('click', (event) => window.location.href = `post.html?q=${this._getId(event)}`);
    this.postDeleteButton.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      $.fn.modal('error','Are you sure you want to delete this post?', ['ok', 'cancel'], 'deletePost');
      document.body.addEventListener('modalClosed', this.deletePost.bind(this), {once: true});
    });
    this.postUpdateButton.addEventListener('click', () => {
      updatePost(this.data);
    });
  }

  fullPostHead() {
    const data = this.data;
    const makeElement = this._makeElement.bind(this);

    const fragmentHeader = document.createDocumentFragment();
    this.containerHead = makePageHead(data);
    fragmentHeader.append(this.containerHead);
    return fragmentHeader;

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

      return containerHead;
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
      const MAX_STARS_AMOUNT = 5;
      const pageHeadHeaderInfoRatesStars = makeElement('div', 'page-head__stars');

      for (let i = 0; i < MAX_STARS_AMOUNT; i++) {
        const img = document.createElement('img');
        img.setAttribute('alt', 'star');
        img.setAttribute('src', `${data.stars.split(',')[i]}`);
        pageHeadHeaderInfoRatesStars.append(img);
      }

      return pageHeadHeaderInfoRatesStars;
    }
  }

  fullPostContent(parent) {// eslint-disable-line max-statements
    const makeElement = this._makeElement.bind(this);
    const data = this.data;
    this.fullPostBody = makeElement('div', 'post');
    const post = this.fullPostBody;

    // POST PREVIEW
    this.postPagePreview = makeElement('div', 'post__preview');
    post.append(this.postPagePreview);

    // POST TEXT
    const postText = makePostText(data);
    post.append(postText);

    // POST CONTROLS
    const postControls = makePostControls(data);
    post.append(postControls);

    parent.append(this.fullPostBody);

    return this.fullPostBody;

    function makePostText(data) {
      const postText = makeElement('div', 'post__text');

      for (const text in data.desc) {
        if (text.match(/[a-z]{4,}/g)[0] === 'paragraph') {
          const postParagraph = makeElement('p', 'post__paragraph');
          postParagraph.append(data.desc[text]);
          postText.append(postParagraph);
        }
        if (text.match(/[a-z]{4,}/g)[0] === 'header') {
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
        icon.setAttribute('alt', 'social');

        postControlsSocIcons.append(icon);
      }
      return postControls;
    }

    function makeLikes(data) {
      const postControlsLike = makeElement('div', 'post__likes');

      const postControlsLikeIcon = makeElement('img', 'post__like');
      postControlsLikeIcon.setAttribute('alt', 'like');
      postControlsLikeIcon.setAttribute('src', `${data.like}`);
      postControlsLike.append(postControlsLikeIcon);

      const postControlsLikeCounter = document.createElement('span');
      postControlsLikeCounter.textContent = data.likesCounter;
      postControlsLike.append(postControlsLikeCounter);

      return postControlsLike;
    }
  }
}

export class VideoPost extends Post {
  addBlogVideo() {
    const postJson = this.data;
    this.postBlog.classList.add('post--video');
    const videoPost = makeVideoPlayer(postJson);
    this.postBlogPreview.append(videoPost);

    function makeVideoPlayer(postJson) {
      // if type video player
      const videoPost = document.createElement('video');
      videoPost.src = postJson.url;
      videoPost.poster = postJson.urlPreview;
      videoPost.controls = true;
      return videoPost;
    }
  }

  addPostPageVideo() {
    const postPreview = this.postPagePreview;
    const post = this.fullPostBody;
    const data = this.data;

    makeVideo(postPreview, post, data);

    function makeVideo(postPreview, post, data) {
      // if video type => make video player and poster img
      const postVideoPlayer = document.createElement('video');
      postVideoPlayer.controls = true;
      postVideoPlayer.src = data.url;
      postVideoPlayer.poster = data.urlPreview;
      postPreview.append(postVideoPlayer);
    }
  }

  renderBlogPost(parent) {
    this.blogPost(parent);
    this.addBlogVideo();
    this.addListeners();
  }

  renderPostPageContent(parent) {
    this.fullPostContent(parent);
    this.addPostPageVideo();
  }

  renderPostPageHead() {
    return this.fullPostHead();
  }
}

export class AudioPost extends Post {
  addBlogAudio() {
    const postJson = this.data;
    this.postBlog.classList.add('post--audio');
    const postDescriptionParagraphTopMusicContainer = makeMusicPlayer.call(this, postJson);
    this.postBlogDescription.querySelector('.post__top').insertAdjacentElement('afterend', postDescriptionParagraphTopMusicContainer);

    function makeMusicPlayer(postJson) {
      // if type music player
      const postDescriptionParagraphTopMusicContainer = this._makeElement('div', 'post__audio');

      const postDescriptionParagraphTopMusicContainerAudio = document.createElement('audio');
      postDescriptionParagraphTopMusicContainerAudio.controls = true;
      postDescriptionParagraphTopMusicContainerAudio.src = postJson.url;
      postDescriptionParagraphTopMusicContainer.append(postDescriptionParagraphTopMusicContainerAudio);
      return postDescriptionParagraphTopMusicContainer;
    }
  }

  addPostPageAudio() {
    const postPreview = this.postPagePreview;
    const post = this.fullPostBody;
    const data = this.data;
    const makeElement = this._makeElement;
    makeAudio(postPreview, post, data);

    function makeAudio(postPreview, post, data) {
      // if audio type => make audio player and preview img
      const postPreviewImg = makeElement('img', 'post__poster');
      postPreviewImg.setAttribute('alt', 'poster');
      postPreviewImg.setAttribute('src', `${data.urlPreview}`);
      postPreview.append(postPreviewImg);

      const postAudio = makeElement('div', 'post__audio');
      postPreview.append(postAudio);

      const postAudioPlayer = document.createElement('audio');
      postAudioPlayer.controls = true;
      postAudioPlayer.src = data.url;
      postAudio.append(postAudioPlayer);
    }
  }

  renderBlogPost(parent) {
    this.blogPost(parent);
    this.addBlogAudio();
    this.addListeners();
  }

  renderPostPageHead() {
    return this.fullPostHead();
  }

  renderPostPageContent(parent) {
    this.fullPostContent(parent);
    this.addPostPageAudio();
  }
}

export class PicturePost extends Post {
  constructor(obj) {
    super(obj);
    this.postBlog.classList.add('post--pic');
  }

  renderBlogPost(parent) {
    this.blogPost(parent);
    this.addListeners();
  }

  renderPostPageHead() {
    return this.fullPostHead();
  }

  renderPostPageContent(parent) {
    this.fullPostContent(parent);
  }
}

export class TextPost extends Post {
  constructor(obj) {
    super(obj);
    this.postBlog.classList.add('post--txt');
  }

  renderBlogPost(parent) {
    this.blogPost(parent);
    this.addListeners();
  }

  renderPostPageHead() {
    return this.fullPostHead();
  }

  renderPostPageContent(parent) {
    this.fullPostContent(parent);
  }
}
