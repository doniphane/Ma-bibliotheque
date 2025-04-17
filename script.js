const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector("input");
const rangeInput = document.getElementById("range");
const rangeValue = document.getElementById("range-value");
const sortDateBtn = document.getElementById("sort-date");
const sortAlphaBtn = document.getElementById("sort-alpha");
const sortAlphaBtninverse = document.getElementById("sort-date-inverse");

let allBooks = [];
let numberToShow = parseInt(rangeInput.value);

function displayBooks(books) {
    const cardsHTML = books.slice(0, numberToShow).map(book => {
        const title = book.title || "Titre inconnu";
        const author = book.author_name?.[0] || "Auteur inconnu";
        const edition_count = book.edition_count || "Nombre d’éditions inconnu";
        const first_publish_year = book.first_publish_year || "Date de l’éditions est inconnu";
        const cover = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "image/placeholder.png";

        return `
        <div class="card">
          <img src="${cover}" alt="${title}" />
          <h3>${title}</h3>
          <p>${author}</p>
          <p>${edition_count} éditions publiées</p>
          <p>${first_publish_year}</p>
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
    const query = e.target.value.trim().toLowerCase();
    const filteredBooks = allBooks.filter(book =>
        book.title?.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
});


sortDateBtn.addEventListener("click", () => {
    const sorted = [...allBooks].sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    displayBooks(sorted);
});

sortAlphaBtninverse.addEventListener("click", () => {
    const sorted = [...allBooks].sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
    displayBooks(sorted);
});


sortAlphaBtn.addEventListener("click", () => {
    const sorted = [...allBooks].sort((a, b) => {
        const titleA = a.title?.toLowerCase() || "";
        const titleB = b.title?.toLowerCase() || "";
        return titleA.localeCompare(titleB);
    });
    displayBooks(sorted);
});


fetchBooks();