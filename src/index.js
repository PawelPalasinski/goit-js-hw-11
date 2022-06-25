import axios from 'axios';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchDataAsync } from './js/fetchData';

const getBtn = document.querySelector(".search-form>button");
const form = document.querySelector('.search-form__input-container');

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
console.log(qSelected.value.trim());

const searchData = e => {
    const searchTerm = qSelected.value.trim();

    fetchDataAsync(searchTerm)
      .then(data => {
        dataFound(data);
      })
      .catch(error => {
        if (searchTerm !== '') {
          console.log('no data to display');
        }
      });
    e.preventDefault();
};

// function dataFound(data) {
//     const dataToDisplay = data.map({webformatURL} => `adres obrazka: ${webformatURL}`);
//     return console.log(dataToDisplay);
// }


function pixebayData(data) {
    return (searchData.innerHTML = data.map(
        item => `<div> ${largeImageURL} </div>`
    ).join(''));
}


form.addEventListener('submit', searchData);