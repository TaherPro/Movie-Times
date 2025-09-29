export function renderMovies(movies, gallery) {
    gallery.innerHTML = movies.map(movie => `
        <div class="movie-card" data-id="${movie.id}">
            <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average}</p>
        </div>
        `).join("");
}

export function renderPagination(page, totalPages, pagination) {
  let html = "";

  // prev button 
  if (page > 1) {
    html += `<button class="page-btn" data-page="${page-1}">Prev</button>`;
  }
  // page numbers to show max 10 pages at a time
  const maxPagesToShow = 10;
  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="page-btn ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }
  // next button
  if (page < totalPages) {
    html += `<button class="page-btn" data-page="${page+1}">Next</button>`;
  }
  pagination.innerHTML = html;
}

export function showMovieDetails(movie, modalEl, infoEl) {
  infoEl.innerHTML = `
    <h2>${movie.title}</h2>
    <p><strong>Release:</strong> ${movie.release_date}</p>
    <p><strong>Rating:</strong> ${movie.vote_average}</p>
    <p>${movie.overview}</p>`;
  modalEl.classList.remove("hidden");
}

export function closeModal(modalEl) {
  modalEl.classList.add("hidden");
}
