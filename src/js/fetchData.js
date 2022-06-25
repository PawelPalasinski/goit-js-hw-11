import axios from 'axios';

export async function fetchDataAsync(searchTerm) {
  try {
    const baseURL = 'https://pixabay.com/api/';
    const key = '28143013-44919de38ad9e5402793063fb';
    const perPage = 40;
    const page = 1;
    let response = await axios.get(
      `${baseURL}?key=${key}&q=${searchTerm}&image_type="photo"&per_page=${perPage}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}
