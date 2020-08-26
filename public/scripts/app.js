$(function() {
  // get storyurl_id as storyId from url
  const url = $(location).attr("href");
  const storyId = url.slice(-6);
  
  // stringify user input before parsing in to prevent XSS
  const escape = function(str) {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };
  // sample input object "contribution":
  // { username: "skater_boy", content: "He stood up and stared", created_at: 2020-07-28 00:00:00, }
  const createPostElement = function(contribution) {
    
    // condition to check for append button.
    const appendButton = $("#markcomplete")[0]?
    `<div class="append-btn">Append to Story</div>`:
    ``;

    let $contribution = $(`
      <article class="contribution-container">
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
          <div class="like-btn"><i class="fas fa-thumbs-up"></i></div>
          <div class="likecount">${contribution.like_count}</div>
          ${appendButton}
        </footer>
      </article>
    `);

    $contribution.find('.like-btn').on('click', function(event){
      event.preventDefault();
      $.post(`/api/story/${storyId}/contributions/${contribution.id}`)
        .then(() => {
          loadPosts();
        })
    })

    $contribution.find('.append-btn').on('click', (event) => {
      event.preventDefault();
      // $.put(`/api/story/${storyId}/contributions/append/${contribution.id}`)
      return $.ajax({
        method: 'PUT',
        url: `/api/story/${storyId}/contributions/append/${contribution.id}`
      }).then(()=>{
          loadPosts();
        })
    })

    return $contribution;
  }

  const renderPosts = function(posts) {
    $('#posts-container').empty();

    for (const post of posts) {
      const $post = createPostElement(post);
      $('#posts-container').append($post);
    }
  };

  const appendContent = function(posts){
    // wrap all this in a function
    $('#appended-content').empty();

    for (const post of posts) {
      if (post.accepted) {
        const $element = $(`<div>${post.content}</div>`)[0]
        $('#appended-content')[0].prepend($element);
      }
    }
  };

  const loadPosts = function() {
    $.getJSON(`/api/story/${storyId}/contributions`)
      .then((posts) => {
        appendContent(posts);
        renderPosts(posts);
      });
  }

  // initial load of all contribution posts in db
  loadPosts();

  // POST request to submit contribution
  const $form = $('#new-post-form');
  const $errorMsg = $('.errormsg');
  
  $form.on('submit', (event) => {
    event.preventDefault();

    const serialized = $form.serialize();
    const $input = $('textarea').val();

    if (!$input) {
      $errorMsg.hide(350);
      $('#emptyfield').slideDown(700);
    } else {
      $errorMsg.hide(350);
      // empty input field upon submission
      $form.trigger('reset');
      // POST request in query string format
      $.post(`/api/story/${storyId}/contributions`, serialized)
       .then(() => {
         loadPosts();
       })
    }
  })

  // Mark story complete
  $('#markcomplete').on('click', (event) => {
    event.preventDefault();
    $form.hide(300);
    
    return $.ajax({
      method: 'PUT',
      url: `/api/story/${storyId}/complete`
    })

  })
});


