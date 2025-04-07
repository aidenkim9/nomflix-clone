const API_KEY = "30f13121bc59f1b8f60a03f4d5c57300";
const BASE_PATH = "https://api.themoviedb.org/3";

export async function getMovies() {
  const json = await (
    await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getUpcomming() {
  const json = await (
    await fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getTopRated() {
  const json = await (
    await fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getTrendingMovie() {
  const json = await (
    await fetch(`${BASE_PATH}/trending/movie/day?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getSearchMedia(type: string, keyword: string) {
  const json = await (
    await fetch(
      `${BASE_PATH}/search/${type}?query=${keyword}&api_key=${API_KEY}`
    )
  ).json();
  return json;
}

export async function getOnAirTv() {
  const json = await (
    await fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getAringToDayTv() {
  const json = await (
    await fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getTopRatedTv() {
  const json = await (
    await fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getTrendingTv() {
  const json = await (
    await fetch(`${BASE_PATH}/trending/tv/day?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getMediaDetail(mediaType: string, mediaId: string) {
  const json = await (
    await fetch(`${BASE_PATH}/${mediaType}/${mediaId}?api_key=${API_KEY}`)
  ).json();
  return json;
}
