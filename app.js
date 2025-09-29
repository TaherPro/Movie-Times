import { searchMovies, getMovieDetails, getPopularMovies } from "./api.js";
import { renderMovies, renderPagination, showMovieDetails, closeModal } from "./ui.js";

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

// fetch and render
async function fetchAndRenderMovies() {
    const data = await searchMovies(currentQuery, currentPage);
    renderMovies(data.results, gallery);
    totalPages = data.total_pages;
    renderPagination(currentPage, totalPages, pagination);
}

async function fetchAndRenderPopular() {
    const data = await getPopularMovies(currentPage);
    renderMovies(data.results, gallery);
    totalPages = data.total_pages;
    renderPagination(currentPage, totalPages, pagination);
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
        if (movie) showMovieDetails(movie, modal, movieInfo);
    }
});

closeBtn.addEventListener("click", () => closeModal(modal));
