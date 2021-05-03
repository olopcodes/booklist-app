import apiKey from "../../not-tracked/apikey.js";
const form = document.querySelector(".form");
const myBooks = [];
const myBooksList = document.querySelector(".my-books__list");
const formInput = document.querySelector(".form__input");
const myBooksNumber = document.querySelector(".my-books__number");
const bestSellerItems = document.querySelectorAll(".nytimes__item");

class Book {
  constructor(id, title, author, year) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = false;
  }
}
class App {
  constructor() {
    // on load to render books already saved
    window.addEventListener("load", (e) => {
      console.log("hey");
    });

    form.addEventListener("submit", this._addBook.bind(this));
    myBooksList.addEventListener("click", this._deleteFromMyBooks.bind(this));
  }

  async _addBook(e) {
    e.preventDefault();
    const bookTitle = formInput.value;
    if (!bookTitle) return;
    await this._fetchBook(bookTitle).then((data) => {
      const hasDuplicate = this._findDuplicates(data);
      const testOne = hasDuplicate === undefined && myBooks.length === 0;
      if (testOne || hasDuplicate === -1) {
        this._addToMyBooks(data);
      } else {
        // create an alert
        console.log("duplicate");
      }
      formInput.value = "";
    });
  }

  _findDuplicates(book) {
    if (myBooks.length > 0) {
      return myBooks
        .filter((oldbook) => oldbook.title === book.title)
        .findIndex((oldBook) => oldBook.author === book.author);
    }
  }

  _addToMyBooks(book) {
    myBooks.push(book);
  }

  _updateMyBooks() {
    myBooksNumber.textContent = myBooks.length;
    myBooksList.innerHTML = "";
    myBooks.forEach((book) => this._renderBook(book));
  }

  _addToMyBooks(newBook) {
    this._renderBook(newBook);
    const book = new Book(
      newBook.id,
      newBook.title,
      newBook.author,
      newBook.year
    );
    myBooks.push(book);
    this._updateMyBooks();
  }

  _deleteFromMyBooks(e) {
    const { id, index } = this._findIndexId(e);
    if (e.target.id === "delete") {
      myBooks.splice(index, 1);
      this._updateMyBooks();
    }
  }

  _findIndexId(el) {
    const id = el.target.closest("li").dataset.id;
    const index = myBooks.findIndex((oldbook) => oldbook.id === id);
    return { id, index };
  }

  async _fetchBook(title) {
    const res = await fetch(`http://openlibrary.org/search.json?q=${title}`);
    const data = await res.json();
    if (data.numFound > 0) {
      return {
        id: (Date.now() + "").slice(-10),
        title: data.docs[0].title,
        author: data.docs[0].author_name[0],
        year: data.docs[0].first_publish_year,
      };
    } else {
      // create a popup
      alert(
        `The book title: ${title.toUpperCase()} has not been found. Enter a new book title`
      );
    }
  }

  _renderBook(book) {
    myBooksList.innerHTML += `
      <li class="my-books__item" data-id = ${book.id}>
      <div class="my-books__heading">
        <h3 class="my-books__title">${book.title}</h3>
        <div class="my-books__btns">
          <a href="#" class="my-books__btn">unread</a>
          <a id="delete" href="#" class="my-books__delete">delete</a>
        </div>
      </div>
      <div class="my-books__description">
        <p class="my-books__text">${book.author}</p>
        <p class="my-books__text">${book.year}</p>
      </div>
    </li>
      `;
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
        <h3 class="my-books__title">dope book tile</h3>
        <div class="my-books__btns">
          <a href="#" class="my-books__btn">unread</a>
          <a href="#" class="my-books__delete">delete</a>
        </div>
      </div>
      <div class="my-books__description">
        <p class="my-books__text">first lastname</p>
        <p class="my-books__text">category</p>
        <p class="my-books__text">1999</p>
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
