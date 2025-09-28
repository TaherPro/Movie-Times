const API_KEY = "";
const BASE_URL = "";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gallery = document.getElementById("gallery");
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