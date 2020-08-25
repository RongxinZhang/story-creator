$(() => {

  // stringify user input before parsing in to prevent XSS
  const escape = function(str) {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };

  const createPostElement = function (contribution) {
    let $contribution = `
      <article>
        <header>
        </header>
        <div>
        </div>
        <footer>
        </footer>
      </article>
    `;
  }
});
