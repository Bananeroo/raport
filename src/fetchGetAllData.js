async function fetchGetAllData(url, setIsLoaded, setItems, setError) {
  try {
    const response = await fetch("http://localhost:8080/" + url);
    const jsonResponse = await response.json();
    if (response.ok) {
      setIsLoaded(true);
      setItems(jsonResponse);
    } else {
      setIsLoaded(true);
      setError(jsonResponse);
    }
  } catch (error) {
    setIsLoaded(true);
    setError(error);
  }
}

export default fetchGetAllData;
