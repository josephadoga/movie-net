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
const searchButton = select('.create');
const searchDialog = select('.search-dialog');
const searchDialogList = select('.search-dialog-list');
const selectedMovie = select('.selected-movie');

const matchesFound = [];
function search() {
    if (input.value.length > 2) {
        searchDialog.classList.add('visible');
        for (let i = 0; i < movies.length; i++) {
            const currentMovie = movies[i].title;

            if (input.value.split('').some(char => currentMovie.includes(char))) {
                searchDialogList.innerHTML += `<li>${currentMovie}</li>`;
            }
        }
    } else {
        searchDialog.classList.remove('visible');
    }

    setTimeout(() => {
        search();
    }, 1000);
}

listen('input', input, function() {
    search();
});