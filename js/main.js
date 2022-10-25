const formElement = document.getElementById('formElement');
const list = document.getElementById('list');

function populateData() {
  list.innerHTML = '';
  const allBooks = JSON.parse(localStorage.getItem('allBooks'));

  for (let i = 0; i < allBooks.length; i += 1) {
    list.innerHTML += `<div class="book">
    <span>${allBooks[i].title} <br/> ${allBooks[i].author}</span>
      <form action ="delete-book" class="remove-form" method="get">

    <input type="hidden" name="removeId" class="removeId" value="${allBooks[i].id}"></input>
      <input type="submit" value="Remove"></input>
    </form>
      </div>`;
  }
}

function addRemoveEvent() {
  setTimeout(() => {
    const removeBook = document.querySelectorAll('.remove-form');
    removeBook.forEach((book) => {
      book.addEventListener('submit', (event) => {
        event.preventDefault();
        const removeId = book.querySelector('.removeId').value;
        // removeBookfunc(removeId);
        const allBooks = JSON.parse(localStorage.getItem('allBooks'));
        const filtered = allBooks.filter(
          (book) => book.id !== Number(removeId),
        );
        localStorage.setItem('allBooks', JSON.stringify(filtered));
        populateData();
        addRemoveEvent();
      });
    });
  }, 300);
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleElement = document.getElementById('title');
  const authorElement = document.getElementById('author');

  let allBooks = JSON.parse(localStorage.getItem('allBooks'));
  if (allBooks === null) {
    allBooks = [];
  }
  //   console.log(allBooks);
  allBooks.push({
    id: Date.now(),
    title: titleElement.value,
    author: authorElement.value,
  });
  localStorage.setItem('allBooks', JSON.stringify(allBooks));
  populateData();
  addRemoveEvent();
});

window.onload = () => {
  populateData();
  addRemoveEvent();
};
