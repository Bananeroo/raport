async function fetchGetAllData(url, setIsLoaded, setItems, setError) {
  return await fetch("http://localhost:8080/" + url).then((res) => res.json());
}

export default fetchGetAllData;
