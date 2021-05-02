import apiKey from "../../not-tracked/apikey.js";
const form = document.querySelector(".form");
const formInput = document.querySelector(".form__input");
const booksNumberText = document.querySelector(".my-books__number");
const bestSellerItems = document.querySelectorAll(".nytimes__item");

class App {
  constructor() {
    form.addEventListener("submit", this._addBook.bind(this));
  }

  _addBook(e) {
    e.preventDefault();
    const bookTitle = formInput.value;
    if (!bookTitle) return;
    this._fetchBook(bookTitle);
  }

  async _fetchBook(title) {
    const res = await fetch(
      `http://openlibrary.org/search.json?title=${title}`
    );
    const data = await res.json();
    if (data.numFound > 0) {
      console.log(data);
    } else {
      //
      alert(
        `The book title: ${title.toUpperCase()} has not been found. Enter a new book title`
      );
    }
  }
}

const app = new App();

// include the html template in here
const renderBookInfo = (book) => {
  console.log(book.rank);
  console.log(book.book_image);
  console.log(book.title);
  console.log(book.author);
  console.log(book.description);
  console.log(book.buy_links);
};
const getEbookBestSellers = async () => {
  const res = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/e-book-fiction.json?api-key=${apiKey}`
  );

  const data = await res.json();
  console.log(data.results.books[0]);
  data.results.books.forEach((book) => renderBookInfo(book));
};

// getEbookBestSellers();

// class Book {
// constructor(title, author)
// }

// for every added book, add an event listener to the item
// listen for click on btn

// add an event listener on every bestseller
// and show description on click
// class App {}

// my-books html template
// need to change the styling for read and unread

/* <li class="my-books__item">
<div class="my-books__heading">
  <h3 class="my-books__title">another dope book tile</h3>
  <a href="#" class="my-books__btn read">read</a>
</div>
<div class="my-books__description">
  <p class="my-books__text">first lastname</p>
  <p class="my-books__text">category</p>
  <p class="my-books__text">1989</p>
</div>
</li> */

// ntytimes html template
// changes styles from show to none

/* <li class="nytimes__item">
<div class="nytimes__heading">
  <span class="nytimes__rank"> 2 </span>
  <img src="" alt="" class="nytimes__img" />
  <h3 class="nytimes__title">great book title</h3>
  <h3 class="nytimes__author">name author
    <span class="nytimes__icon">
      <i class="fas fa-chevron-right"></i>
    </span>
  </h3>
  
</div>
<div class="nytimes__description">
  <p class="nytimes__text">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui
    distinctio nesciunt at. Corporis suscipit eos reiciendis
    necessitatibus amet sunt error.
  </p>
  <div class="nytimes__links">
    <a href="#" class="nytimes__link">link name</a>
    <a href="#" class="nytimes__link">link name</a>
    <a href="#" class="nytimes__link">link name</a>
    <a href="#" class="nytimes__link">link name</a>
    <a href="#" class="nytimes__link">link name</a>
    <a href="#" class="nytimes__link">link name</a>
  </div>
</div>
</li> */
