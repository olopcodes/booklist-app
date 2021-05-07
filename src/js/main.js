// import bestseller from "./bestsellers.js";

const form = document.querySelector(".form");
let myBooks = [];
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
    window.addEventListener("load", this._loadSavedBooks.bind(this));

    form.addEventListener("submit", this._addBook.bind(this));
    myBooksList.addEventListener(
      "click",
      this._deleteAndReadFromMyBooks.bind(this)
    );
  }

  async _addBook(e) {
    e.preventDefault();
    if (!formInput.value) return;
    const bookTitle = formInput.value;
    if (!bookTitle) return;
    await this._fetchBook(bookTitle).then((data) => {
      const hasDuplicate = this._findDuplicates(data);
      const testOne = hasDuplicate === undefined && myBooks.length === 0;
      if (testOne || hasDuplicate === -1) {
        this._addToMyBooks(data, myBooks);
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

  _updateMyBooks(booksArr) {
    myBooksNumber.textContent = myBooks.length;
    myBooksList.innerHTML = "";
    myBooks.forEach((book) => this._renderBook(book));
    this._setLocalStorage(booksArr);
  }

  _addToMyBooks(newBook, booksArr) {
    this._renderBook(newBook);
    const book = new Book(
      newBook.id,
      newBook.title,
      newBook.author,
      newBook.year
    );
    myBooks.push(book);
    this._updateMyBooks(booksArr);
  }

  _setLocalStorage(booksArr) {
    localStorage.setItem("myBooks", JSON.stringify(booksArr));
  }

  _getLocalStorage() {
    const myBooksJSON = localStorage.getItem("myBooks");
    try {
      return myBooksJSON ? JSON.parse(myBooksJSON) : [];
    } catch (e) {
      return [];
    }
  }

  _loadSavedBooks() {
    myBooks = this._getLocalStorage();
    if (myBooks.length > 0) {
      const readBooks = myBooks.find((b) => b.read === true);
      // console.log(readBooks);
      myBooks.forEach((book) => {
        this._renderBook(book);
        if (book.read) {
          document
            .querySelector(`[data-id = "${book.id}"]`)
            .classList.add("read");
          myBooksNumber.textContent = myBooks.length - 1;
        } else {
          myBooksNumber.textContent = myBooks.length;
        }
      });
    }
  }

  _deleteAndReadFromMyBooks(e) {
    e.preventDefault();
    const { id, index } = this._findIndexId(e);
    if (e.target.id === "delete") {
      myBooks.splice(index, 1);
      this._updateMyBooks();
    } else if (e.target.id === "read") {
      this._readUpdate(e, id);
    }
  }

  _findIndexId(el) {
    const id = el.target.closest("li").dataset.id;
    const index = myBooks.findIndex((oldbook) => oldbook.id === id);
    return { id, index };
  }

  _readUpdate(el, id) {
    const book = myBooks.find((b) => b.id === id);

    if (el.target.closest("li").classList.contains("read")) {
      el.target.closest("li").classList.remove("read");
      document.querySelector(".my-books__btn").textContent = "unread";
      book.read = false;
      myBooksNumber.textContent = this._filterByRead().length;
    } else {
      el.target.closest("li").classList.add("read");
      document.querySelector(".my-books__btn").textContent = "read";
      book.read = true;
      console.log(this._filterByRead().length);
      myBooksNumber.textContent =
        myBooks.length - this._filterByRead("yes").length;
    }

    this._setLocalStorage(myBooks);
  }

  _filterByRead(option) {
    if (option === "yes") {
      return myBooks.filter((b) => b.read === true);
    } else {
      return myBooks.filter((b) => b.read === false);
    }
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
          <a id="read"href="#" class="my-books__btn">unread</a>
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
