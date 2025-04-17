const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector("input");
const rangeInput = document.getElementById("range");
const rangeValue = document.getElementById("range-value");

let allBooks = [];
let numberToShow = parseInt(rangeInput.value);

function displayBooks(books) {
    const cardsHTML = books.slice(0, numberToShow).map(book => {
        const title = book.title || "Titre inconnu";
        const author = book.author_name?.[0] || "Auteur inconnu";
        const edition_count = book.edition_count || "Nombre d’éditions inconnu";


        const cover = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "image/placeholder.png";

        return `
      <div class="card">
        <img src="${cover}" alt="${title}" />
        <h3>${title}</h3>
        <p>${author}</p>
        <p>${edition_count} éditions publiées</p>
      </div>
    `;
    });

    cardContainer.innerHTML = cardsHTML.join("");
}

function fetchBooks(query = "the lord of the rings") {
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
            allBooks = data.docs;
            displayBooks(allBooks);
        })
        .catch(err => {
            cardContainer.innerHTML = "<p>Erreur dans les livres</p>";
            console.error(err);
        });
}

rangeInput.addEventListener("input", () => {
    numberToShow = parseInt(rangeInput.value);
    rangeValue.textContent = numberToShow;
    displayBooks(allBooks);
});

searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    if (query.length > 2) {
        fetchBooks(query);
    } else if (query.length === 0) {
        fetchBooks();
    }
});

fetchBooks();