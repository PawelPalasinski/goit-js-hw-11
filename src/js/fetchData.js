import axios from 'axios';
const axiosRequest = require('axios');


// export function fetchData(searchTerm) {
//   const baseURL = 'https://pixabay.com/api/';
//   const key = '28143013-44919de38ad9e5402793063fb';
//   axiosRequest
//     .get(`${baseURL}?key=${key}&q=${searchTerm}`)
//     .then(response => {
//       return response;
//     })
//     .catch(error => {
//       `ERRPR ${error}`;
//     });
// }

// fetchDataAsync('cat');

async function fetchDataAsync(searchTerm) {
  try {
    const baseURL = 'https://pixabay.com/api/';
    const key = '28143013-44919de38ad9e5402793063fb';
    let response = await axiosRequest.get(
      `${baseURL}?key=${key}&q=${searchTerm}`
    );
    return response;
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}


fetchDataAsync('cat');