const source = $('#post-template').html();
// eslint-disable-next-line no-undef
const template = Handlebars.compile(source);

// jQuery grabbers
const $postsDiv = $('.posts');
const $submitBtn = $('#submit-post');
const $postForm = $('.post-form');
const $nameInput = $('#name');
const $textInput = $('#text');

// data
const postsArr = [
  {
    name: 'Nathan',
    text: 'I like beer',
    likes: 0,
    editing: false,
  },
];

// main & helper functions
const renderPosts = () => {
  $postsDiv.empty();

  for (const postObj of postsArr) {
    $postsDiv.append(template(postObj));
  }
};

const createPost = (name, text) => {
  postsArr.push({
    name,
    text,
    likes: 0,
    editing: false,
  });

  renderPosts();
};

const submitPost = () => {
  const name = $nameInput.val();
  const text = $textInput.val();

  if (!name || !text) {
    alert('Fields cannot be blank.');
    return;
  }

  createPost(name, text);
  $postForm.trigger('reset');
};

const findIndex = (target) => $(target).closest('.post').index();

const editPost = (index, newText) => {
  postsArr[index].text = newText;
  postsArr[index].editing = false;
  renderPosts();
};

const doneEditing = (target) => {
  const index = findIndex(target);
  const newText = $(target).val();
  editPost(index, newText);
};

// event listeners
// submit post
$submitBtn.on('click', () => submitPost());

// upvote
$postsDiv.on('click', '.upvote-btn', (e) => {
  const index = findIndex(e.currentTarget);
  postsArr[index].likes += 1;
  renderPosts();
});

// downvote
$postsDiv.on('click', '.downvote-btn', (e) => {
  const index = findIndex(e.currentTarget);
  postsArr[index].likes -= 1;
  renderPosts();
});

// edit post
$postsDiv.on('click', '.edit-btn', (e) => {
  const index = findIndex(e.currentTarget);
  postsArr[index].editing = true;
  renderPosts();
});
$postsDiv.on('blur', '.edit', (e) => doneEditing(e.currentTarget));
$postsDiv.on('keypress', '.edit', (e) => {
  if (e.keyCode === 13) {
    doneEditing(e.currentTarget);
  }
});

// delete post
$postsDiv.on('click', '.delete-btn', (e) => {
  const index = findIndex(e.currentTarget);
  postsArr.splice(index, 1);
  renderPosts();
});

renderPosts();
