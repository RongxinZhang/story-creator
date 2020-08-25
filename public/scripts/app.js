$(document).ready(function() {

  // stringify user input before parsing in to prevent XSS
  const escape = function(str) {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };
  // sample input object "contribution":
  // { username: "skater_boy", content: "He stood up and stared", created_at: 2020-07-28 00:00:00, }
  const createPostElement = function(contribution) {
    let $contribution = `
      <article>
        <header>
          <div>
            <h5>${contribution.username}</h5>
          </div>
        </header>
        <div>
          <p>${escape(contribution.content)}</p>
        </div>
        <footer>
          <div>${contribution.created_at}</div>
          <div>//insert like icon</div>
        </footer>
      </article>
    `;
    return $contribution;
  }

  const renderPosts = function(posts) {
    $('#posts-container').empty();

    for (const post of posts) {
      const $post = createPostElement(post);
      $('#posts-container').prepend($post);
    }
  };

  const loadPosts = function() {
    const url = $(location).attr("href");
    const storyId = url.slice(-6);
    $.getJSON(`/api/story/${storyId}/contributions`)
      .then((posts) => {
        renderPosts(posts);
      });
  }

  // initial load of all contribution posts in db
  loadPosts();
});


