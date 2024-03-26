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

const searchDialog = select('.search-dialog');
const selectedMovie = select('.selected-movie');