import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const API_KEY = "a938d1ea3920cdfe5813e65f9411db6d"

const options = {
  headers: {'user-key': API_KEY}
};

export const getRestaurantsBySearch = (searchKey) => {
  return axios.get(`https://developers.zomato.com/api/v2.1/search?entity_type=city&q=${searchKey}`, options);
}