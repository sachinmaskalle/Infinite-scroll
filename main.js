const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// show initial posts
showPosts();

// get posts
async function getPosts() {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
      `;
    postsContainer.appendChild(postElement);
  });
}

// Show loading spinner , fetch more posts
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');
    // increment page number and call showPosts again
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

function filterPosts(e) {
  const searchedTerm = e.target.value.toUpperCase();

  const posts = document.querySelectorAll('.post');
  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const postbody = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(searchedTerm) > 1 || postbody.indexOf(searchedTerm) > 1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// listen for window scroll event
window.addEventListener('scroll', e => {
  console.log(e);

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);
