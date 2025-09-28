// const API_KEY = "";
// const BASE_URL = "";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gallery = document.getElementById("gallery");
const pagination = document.getElementById("pagination");
const modal = document.getElementById("movie-details");
const movieInfo = document.getElementById("movie-info");
const closeBtn = document.getElementById("close-modal");

let currentQuery = "";
let currentPage = 1;
let totalPages = 1;

async function searchMovies(query, page = 1) {
    try {
        const res = await fetch(`${BASE_URL}/seach/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
        if (!res.ok) throw("Faild to fetch movies");
        return await res.json();
    } catch (err) {
        console.err(err);
        return {results: [], total_pages: 0};
    }
}

async function getPopularMovies(page = 1) {
    try {
        const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        if (!res.ok) throw(`Failed to fetch popular movies`);
        return await res.json();
    } catch (err) {
        console.err(err);
        return { results: [], total_pages: 0};;
    }
}

async function getMovieDetails(id) {
    try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        if (!res.ok) throw ("Faild to fetch movie details");
        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}
// ui functions
function renderMovies(movies) {
    gallery.innerHTML = movies.map(movie => `
        <div class="movie-card" data-id="${movie.id}">
            <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.palceholder.com/200x300?text=No+Image'}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
            <p> ${movie.vote_average}</p>
        </div>`).join("");
}


function renderPagination() {
    pagination.innerHTML = `
        ${currentPage > 1 ? `<button class="page-btn" data-page="${currentPage-1}">Prev</button>` : ""}
        <span>Page ${currentPage} of ${totalPages}</span>
        ${currentPage < totalPages ? `<button class="page-btn" data-page="${currentPage+1}">Next</button>` : ""}`;
 }

function showMovieDetails(movie) {
  movieInfo.innerHTML = `
    <h2>${movie.title}</h2>
    <p><strong>Release:</strong> ${movie.release_date}</p>
    <p><strong>Rating:</strong> ${movie.vote_average}</p>
    <p>${movie.overview}</p>`;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

// fetch and render
async function fetchAndRenderMovies() {
    const data = await searchMovies(currentQuery, currentPage);
    renderMovies(data.results);
    totalPages = data.total_pages;
    renderPagination();
}

async function fetchAndRenderPopular() {
    const data = await getPopularMovies(currentPage);
    renderMovies(data.results);
    totalPages = data.total_pages;
    renderPagination();
}

// Event Listeners
window.addEventListener("DOMContentLoaded", fetchAndRenderPopular);

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    currentQuery = searchInput.value.trim();
    currentPage = 1;
    if (currentQuery) await fetchAndRenderMovies();
});

pagination.addEventListener("click", async (e) => {
    if (e.target.classList.contains("page-btn")) {
        currentPage = parseInt(e.target.dataset.page);
        if (currentQuery) await fetchAndRenderMovies();
        else await fetchAndRenderPopular();
    }
});

gallery.addEventListener("click", async (e) => {
    const card = e.target.closest(".movie-card");
    if (card) {
        const movie = await getMovieDetails(card.dataset.id);
        if (movie) showMovieDetails(movie);
    }
});

closeBtn.addEventListener("click", closeModal);