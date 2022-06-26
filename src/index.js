// Imports: SimpleLightbox, Notiflix & Axios

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import axios from 'axios';

// HTML elements

const searchContainer = document.querySelector('.search-container');
const searchQuery = document.querySelector('input[name="searchQuery"]');
const upBtn = document.querySelector('.up-btn');
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

// Needed to query the Pixabay API

const baseURL = 'https://pixabay.com/api/';
const key = '28143013-44919de38ad9e5402793063fb';
let perPage = 40;
let page = 0;
let name = searchQuery.value;

// Needed to hide "load more" and "arrow up" buttons

loadBtn.style.display = 'none';
upBtn.style.display = 'none';

// Fetch images from Pixabay API using Axios

async function fetchImages(name, page) {
  try {
    const response = await axios.get(
      `${baseURL}?key=${key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.log('ERROR: ' + error);
  }
}

// Handling the "submit" button event

async function eventHandler(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  loadBtn.style.display = 'none';

  page = 1;
  name = searchQuery.value;

  fetchImages(name, page)
    .then(name => {
      let totalPages = name.totalHits / perPage;

      if (name.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${name.totalHits} images.`);
        renderGallery(name);
        new SimpleLightbox('.gallery a');
        upBtn.style.display = 'block';
        upBtn.addEventListener('click', () => {
          searchContainer.scrollIntoView({
            behavior: 'smooth',
          });
        });

        if (page < totalPages) {
          loadBtn.style.display = 'block';
        } else {
          loadBtn.style.display = 'none';
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        gallery.innerHTML = '';
      }
    })
    .catch(error => console.log('ERROR: ' + error));
}

searchForm.addEventListener('submit', eventHandler);

// Funktion for markup for HTML gallery element

function renderGallery(name) {
  const markup = name.hits
    .map(hit => {
      return `<div class="photo-card">

        <a class="gallery-item" href="${hit.largeImageURL}">
          <img
            class="gallery__image"
            src="${hit.webformatURL}"
            alt="${hit.tags}"
            loading="lazy"
        /></a>

        <div class="info">
          <div class="info__box">
            <p class="info-item">
              <b class="material-symbols-outlined">thumb_up</b>
            </p>
            <p class="info-counter">${hit.likes}</p>
          </div>

          <div class="info__box">
            <p class="info-item">
              <b class="material-symbols-outlined">visibility</b>
            </p>
            <p class="info-counter">${hit.views}</p>
          </div>

          <div class="info__box">
            <p class="info-item">
              <b class="material-symbols-outlined">forum</b>
            </p>
            <p class="info-counter">${hit.comments}</p>
          </div>

          <div class="info__box">
            <p class="info-item">
              <b class="material-symbols-outlined">download</b>
            </p>
            <p class="info-counter">${hit.downloads}</p>
          </div>

        </div>
      </div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

// Load more button - function 

loadBtn.addEventListener(
  'click',
  () => {
    name = searchQuery.value;
    page += 1;
    fetchImages(name, page).then(name => {
      let totalPages = name.totalHits / perPage;
      renderGallery(name);
      new SimpleLightbox('.gallery a');
      if (page >= totalPages) {
        loadBtn.style.display = 'none';
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    });
  },
  true
);