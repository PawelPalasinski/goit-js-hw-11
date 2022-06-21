// const perPage = 12;

// const fetchUsers = async () => {
//   const baseUrl =
//     'https://pixabay.com/api/?key=28143013-44919de38ad9e5402793063fb';
//   const q = await fetch(`${baseUrl}/q`);
//   const imageType = await fetch(`${baseUrl}/image_type`);
//   const orientation = await fetch(`${baseUrl}/orientation`);

//   const firstUser = await firstResponse.json();
//   const secondUser = await secondResponse.json();
//   const thirdUser = await thirdResponse.json();

//   console.log(firstUser, secondUser, thirdUser);
// };

// fetchUsers();

export function fetchData(searchTerm) {
  const baseURL = 'https://pixabay.com/api/';
  const key = '28143013-44919de38ad9e5402793063fb';
  return fetch(`${baseURL}?key=${key}&q=${searchTerm}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(`${error.name}: ${error.message}`));
}
