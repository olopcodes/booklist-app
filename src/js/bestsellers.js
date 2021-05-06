import apiKey from "../../not-tracked/apikey";
const nyTimesList = document.querySelector(".nytimes__list");

(async () => {
  const res = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/e-book-fiction.json?api-key=${apiKey}`
  );
  const data = await res.json();
  data.results.books.forEach((b) => renderBestseller(b));
  const nyTimesItems = document.querySelectorAll(".nytimes__item");
  nyTimesItems.forEach((i, index) => {
    i.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("nytimes__icon-icon") ||
        e.target.classList.contains("nytimes__icon")
      ) {
        toggleDescription(index);
      }
    });
  });
})();

// need the index inorder to move the others
function toggleDescription(index) {
  const descriptions = document.querySelectorAll(".nytimes__description");
  descriptions[index].classList.toggle("show");
  // console.log(descriptions);
  // descriptions.forEach((d) => console.log(d.classList));
  const icons = document.querySelectorAll(".nytimes__icon");
  icons[index].classList.toggle("show");
}

// include the html template in here
const renderBestseller = (book) => {
  nyTimesList.innerHTML += `
  <li class="nytimes__item">
  <div class="nytimes__heading">
  <img src="${book.book_image}" alt="an image of ${book.title}" class="nytimes__img" />

    <span class="nytimes__rank">${book.rank}</span>
    <div class="nytimes__details">
    <h3 class="nytimes__title">${book.title}</h3>
    <h3 class="nytimes__author">${book.author}
      <span class="nytimes__icon">
        <i class="fas fa-chevron-right nytimes__icon-icon"></i>
      </span>
    </h3>
    </div>
    
    
  </div>
  <div class="nytimes__description">
    <p class="nytimes__text">
      ${book.description}
    </p>
    <div class="nytimes__links">
      <a href="${book.buy_links[0].url}" class="nytimes__link">${book.buy_links[0].name}</a>
      <a href="${book.buy_links[1].url}" class="nytimes__link">${book.buy_links[1].name}</a>
      <a href="${book.buy_links[2].url}" class="nytimes__link">${book.buy_links[2].name}</a>
      <a href="${book.buy_links[3].url}" class="nytimes__link">${book.buy_links[3].name}</a>
      <a href="${book.buy_links[4].url}" class="nytimes__link">${book.buy_links[4].name}</a>
      <a href="${book.buy_links[5].url}" class="nytimes__link">${book.buy_links[5].name}</a>
    </div>
  </div>
  </li> 
  
  `;
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

// ntytimes html template
// changes styles from show to none
