import axios from 'axios';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchData } from './js/fetchData';

const getBtn = document.querySelector(".search-form>button");

// const getData = () => {
//     axios.get(
//         `https://pixabay.com/api/?key=28143013-44919de38ad9e5402793063fb`
//     ).then(response => {
//         console.log(response);
//     })
//     .catch((error) => console.log(error));
// };

// getBtn.addEventListener('click', function (e) {
//     e.preventDefault();
//     getData();
// });

qSelected = document.querySelector(".search-form__input-container>input");

const searchData = e => {
    const searchTerm = qSelected.value.trim();

    fetchData(searchTerm)
        .then(data => {
            dataFound(data);
        })
        .catch(error => {
            if (searchTerm !== '') {
            console.log('no data to display')
        }
        })
    e.preventDefault();
}