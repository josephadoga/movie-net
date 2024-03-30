/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*                                                       */
/*  Joseph Adoga (2024)                                  */
/*  github.com/josephadoga                               */
/*                                                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

import movies from '../data/movies.js';
'use strict'

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
  
function select(selector) {
    return document.querySelector(selector);
}

const input = select('.input');
const searchButton = select('.search-movie');
const searchDialog = select('.search-dialog');
const searchDialogList = select('.search-dialog-list');
const selectedMovie = select('.selected-movie');

const matchesFound = [];


function search() {
    searchDialogList.innerHTML = '';
    matchesFound.length = 0;
    let inputSearch = input.value.trim().toLowerCase();
    if (inputSearch.length > 2) {
        for (let i = 0; i < movies.length; i++) {
            const currentMovie = movies[i].title;

            if (currentMovie.trim().toLowerCase().includes(inputSearch)) {
                searchDialog.classList.add('visible');
                searchDialogList.innerHTML += `<li class="movie">${currentMovie}</li>`;
                matchesFound.push(currentMovie);
            }
        }
        if (matchesFound.length === 0) {
            searchDialog.classList.add('visible');
            searchDialogList.innerHTML += `<li class="notfound">Movie not found</li>`;
        }
    } else {
        searchDialog.classList.remove('visible');
    }
}

function whenClicked(event) {
    const clickedMovieTitle = event.target.textContent;
    input.value = clickedMovieTitle;
    searchDialog.classList.remove('visible');
}

function selection() {
    const movieListItems = document.querySelectorAll('.movie');
    movieListItems.forEach(item => {
        item.addEventListener('click', whenClicked);
    });
}


listen('input', input, function() {
    search();
    selection();
});

listen('click', searchButton, function() {
    selectedMovie.classList.add('visible');
});