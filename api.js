const API_KEY = "";
const BASE_URL = "";


// seach movei by query
export async function searchMovies(query, page = 1) {
    try {
        const res = await fetch(`${BASE_URL}/seach/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
        if (!res.ok) throw (`Faild to fetch movies`);
        return await res.json();
    } catch (err) {
        console.error(err);
        return { results: [], total_pages: 0};
    } 
}

// get movie details by id
export async function getMovieDetails(id) {
    try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        if (!res.ok) throw(`Faild to fetch movie details`);
        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

// get popular movies (page 1 by default) 
export async function getPopularMovies(page = 1) {
    try {
        const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        if (!res.ok) throw ("Faild to fetch popular movies");
        return await res.json();
    } catch (err) {
        console.error(err);
        return {results: [], total_pages: 0};
    }
}