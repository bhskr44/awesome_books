const formElement = document.getElementById('formElement');
const list = document.getElementById('list');

function populateData() {
  list.innerHTML = '';
  let allBooks = JSON.parse(localStorage.getItem('allBooks'));
  console.log(allBooks);

  for (let i = 0; i < allBooks.length; i += 1) {
    list.innerHTML +=
      `<div class="book">
    <span>"` +
      allBooks[i].title +
      `" By ` +
      allBooks[i].author +
      `</span>
    <input type="hidden" name="removeId" value="` +
      allBooks[i].id +
      `"></input>
      <input type="submit" value="Remove"></input>
  </div>`;
  }
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleElement = document.getElementById('title');
  const authorElement = document.getElementById('author');

  let allBooks = JSON.parse(localStorage.getItem('allBooks'));
  if (allBooks === null) {
    allBooks = new Array();
  }
  //   console.log(allBooks);
  allBooks.push({
    id: Date.now(),
    title: titleElement.value,
    author: authorElement.value,
  });
  localStorage.setItem('allBooks', JSON.stringify(allBooks));
  populateData();
});

window.onload = () => {
  new Promise(function (resolve, error) {
    populateData();
  }).then(() => {
    console.log('hello');
    const removeElemnt = document.getElementById('removeform');
    removeElemnt.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Hi');
      //   const removeId = document.getElementById('removeId');

      //   console.log('RemoveId' + removeId.value);
    });
  });
};

// setTimeout(()=>{}, 1000);
