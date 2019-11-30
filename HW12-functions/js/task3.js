const listOfPosts2 = [
  {
    id: 1,
    post: 'some post1',
    title: 'title 1',
    author: 'Ivanov',
    comments: [
      {
        id: 1.1,
        comment: 'some comment1',
        title: 'title 1',
        author: 'Rimus',
      },
      {
        id: 1.2,
        comment: 'some comment2',
        title: 'title 2',
        author: 'Uncle',
      },
    ],
  },
  {
    id: 2,
    post: 'some post2',
    title: 'title 2',
    author: 'Ivanov',
    comments: [
      {
        id: 1.1,
        comment: 'some comment1',
        title: 'title 1',
        author: 'Rimus',
      },
      {
        id: 1.2,
        comment: 'some comment2',
        title: 'title 2',
        author: 'Uncle',
      },
      {
        id: 1.3,
        comment: 'some comment3',
        title: 'title 3',
        author: 'Rimus',
      },
    ],
  },
  {
    id: 3,
    post: 'some post3',
    title: 'title 3',
    author: 'Rimus',
  },
  {
    id: 4,
    post: 'some post4',
    title: 'title 4',
    author: 'Uncle',
  },

];

function getQuntityPostsByAuthor(listOfPosts2, userAuthor = 'Rimus') {
  let postsCounter = 0;
  let commentsCounter = 0;
  listOfPosts2.forEach(({author, comments}) => {
    if (author === userAuthor) {
      postsCounter++;
    }
    if (comments) {
      comments.forEach(({author: commentsAuthor}) => {
        if (userAuthor === commentsAuthor) {
          commentsCounter++;
        }
      });
    }
  });
  return {post: postsCounter, comments: commentsCounter};
}
getQuntityPostsByAuthor (listOfPosts2, 'Rimus');
