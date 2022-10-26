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

  populateData() {
    const list = document.getElementById('list');
    list.innerHTML = '';
    let allBooks = JSON.parse(localStorage.getItem('allBooks'));
    if (allBooks === null) {
      allBooks = [];
    }
    if (allBooks.length > 0) {
      list.classList.add('list');
    } else {
      list.classList.remove('list');
    }

    for (let i = 0; i < allBooks.length; i += 1) {
      list.innerHTML +=
        `<div class="book">
        <span>"` +
        allBooks[i].title +
        `" by ` +
        allBooks[i].author +
        `</span>
          <form action ="delete-book" class="remove-form" method="get">
    
        <input type="hidden" name="removeId" class="removeId" value="` +
        allBooks[i].id +
        `"></input>
          <input type="submit" value="Remove"></input>
        </form>
          </div>`;
    }

    const removeBookEle = document.querySelectorAll('.remove-form');

    removeBookEle.forEach((key) => {
      key.addEventListener('submit', (event) => {
        event.preventDefault();
        this.removeBook(key.querySelector('.removeId').value);
        this.populateData();
      });
    });
  }
}

let bookObj = new Books();
const formElement = document.getElementById('formElement');
formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleElement = document.getElementById('title');
  const authorElement = document.getElementById('author');
  bookObj.saveBook(titleElement.value, authorElement.value);
  bookObj.populateData();
});

window.onload = () => {
  bookObj.populateData();
};

// Neww

const date = document.querySelector('.date');
setInterval(() => {
  date.innerHTML = new Date();
}, 1000);

const listSection = document.querySelector('#list');
const formSection = document.querySelector('#form-section');
const contactSection = document.querySelector('#contact-section');
const listBtn = document.querySelector('#menu-list');
const addFormBtn = document.querySelector('#menu-addnew');
const contactBtn = document.querySelector('#menu-contact');

const toggleWindow = () => {
  listBtn.addEventListener('click', () => {
    formSection.classList.add('hide');
    contactSection.classList.add('hide');
    listSection.classList.remove('hide');
    listBtn.classList.add('active');
    addFormBtn.classList.remove('active');
    contactBtn.classList.remove('active');
  });

  addFormBtn.addEventListener('click', () => {
    formSection.classList.remove('hide');
    contactSection.classList.add('hide');
    listSection.classList.add('hide');
    listBtn.classList.remove('active');
    addFormBtn.classList.add('active');
    contactBtn.classList.remove('active');
  });

  contactBtn.addEventListener('click', () => {
    formSection.classList.add('hide');
    contactSection.classList.remove('hide');
    listSection.classList.add('hide');
    listBtn.classList.remove('active');
    addFormBtn.classList.remove('active');
    contactBtn.classList.add('active');
  });
};
toggleWindow();
