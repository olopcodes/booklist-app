import apiKey from "../../not-tracked/apikey";
// (async () => {
//   await this.handleMessage(msg);
//   this.pendingMsgs--;
//   if (cancelled && this.pendingMsgs === 0) {
//     await chan.close();
//     await this.amqpConnectionPool.release(conn);
//   }
// })();

// include the html template in here
const renderBookInfo = (book) => {
  console.log(book.rank);
  console.log(book.book_image);
  console.log(book.title);
  console.log(book.author);
  console.log(book.description);
  console.log(book.buy_links[0].name);
  console.log(book.buy_links[0].url);
};
const getEbookBestSellers = async () => {
  const res = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/e-book-fiction.json?api-key=${apiKey}`
  );

  const data = await res.json();
  console.log(data.results.books[0]);
  data.results.books.forEach((book) => renderBookInfo(book));
};

getEbookBestSellers();

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
