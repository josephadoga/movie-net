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


function displayMovie() {
    for(let i = 0; i < movies.length; i++) {
        if (movies[i].title === input.value) {
            console.log(movies[i].title)
            selectedMovie.classList.add('visible');
            let moviegenre = ``;
            for (let j = 0; j < movies[i].genre.length; j++) {
                moviegenre += `<p>${movies[i].genre[j]}</p>`;
            }

            selectedMovie.innerHTML = `
            <div class="movie-image">
                <figure>
                    <img src="${movies[i].poster}">
                </figure>
            </div>
            <div class="movie-content">
                <h2>${movies[i].title}</h2>
                <div class="movie-details flex space-between">
                    <p>${movies[i].year}</p>
                    <div class="circle"></div>
                    <p>${movies[i].runningTime}</p>
                </div>
                <article>
                    <p>
                        ${movies[i].description}
                    </p>
                </article>
                <div class="genre flex gap-10">
                    ${moviegenre}
                </div>
            </div>
            `
        }
    }
}

function clearInput() {
    input.value = '';
}


listen('input', input, function() {
    search();
    selection();
});

listen('click', searchButton, function() {
    displayMovie()
    clearInput();
});