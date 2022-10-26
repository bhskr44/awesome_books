class Books {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.books = localStorage.getItem('allBooks')
      ? JSON.parse(localStorage.getItem('allBooks'))
      : [];
  }

  removeBook(id) {
    let allBooks = JSON.parse(localStorage.getItem('allBooks'));
    let filtered = allBooks.filter((book) => book.id !== Number(id));
    localStorage.setItem('allBooks', JSON.stringify(filtered));
  }

  saveBook(title, author) {
    let allBooks = JSON.parse(localStorage.getItem('allBooks'));
    if (allBooks === null) {
      allBooks = [];
    }
    allBooks.push({
      id: Date.now(),
      title: title,
      author: author,
    });
    localStorage.setItem('allBooks', JSON.stringify(allBooks));
  }
}

let bookObj = new Books();
const formElement = document.getElementById('formElement');
formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleElement = document.getElementById('title');
  const authorElement = document.getElementById('author');
  bookObj.saveBook(titleElement.value, authorElement.value);
  //   bookObj.populateData();
});

window.onload = () => {
  //   bookObj.populateData();
};
