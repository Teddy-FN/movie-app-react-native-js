import axios from "axios";
import { api_key, bearer_token } from "../constants";
const BASE_URL = "https://api.themoviedb.org/3";

// ENDPOINTS
const TRENDING_MOVIES = `${BASE_URL}/trending/all/day?api_key=${api_key}`;
const UPCOMING_MOVIES = `${BASE_URL}/movie/upcoming?api_key=${api_key}`;
const TOP_RATED_MOVIES = `${BASE_URL}/movie/top_rated?api_key=${api_key}`;

// FALL BACK MOVIE IMAGE
// fallback images
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

// API CALL
const API_CALL = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataTrendingMovies = () => {
  return API_CALL(TRENDING_MOVIES);
};

export const fetchDataUpcomingMovies = () => {
  return API_CALL(UPCOMING_MOVIES);
};

export const fetchDataTopRatedMovies = () => {
  return API_CALL(TOP_RATED_MOVIES);
};
