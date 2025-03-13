
const APILINK = 'http://www.omdbapi.com/?apikey=32914675&s=avengers';
const SEARCHAPI = 'http://www.omdbapi.com/?apikey=32914675&s=';

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

returnMovies(APILINK);

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function (data) {
            if (data.Search) {  // Check if data.Search exists
                console.log(data.Search);
                data.Search.forEach(element => {
                    const div_card = document.createElement('div');
                    div_card.setAttribute('class', 'card');

                    const div_row = document.createElement('div');
                    div_row.setAttribute('class', 'row');

                    const div_column = document.createElement('div');
                    div_column.setAttribute('class', 'column');

                    const image = document.createElement('img');
                    image.setAttribute('class', 'thumbnail');
                    image.setAttribute('id', 'image');

                    const title = document.createElement('h3');
                    title.setAttribute('id', 'title');

                    const center = document.createElement('center');

                    title.innerHTML = `${element.Title}`;
                    image.src = element.Poster !== "N/A" ? element.Poster : "no-image.png"; // Handle missing posters

                    center.appendChild(image);
                    div_card.appendChild(center);
                    div_card.appendChild(title);
                    div_column.appendChild(div_card);
                    div_row.appendChild(div_column);
                    main.appendChild(div_row);
                });
            } else {
                main.innerHTML = "<h2>No results found</h2>";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
    const searchItem = search.value.trim();
    if (searchItem) {
        returnMovies(`${SEARCHAPI}${encodeURIComponent(searchItem)}`);
    }
});
