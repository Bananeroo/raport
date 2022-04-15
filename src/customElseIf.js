const customElseIf = (error, isLoaded, content) => {
  return error ? (
    <div>Error: {error.message}</div>
  ) : !isLoaded ? (
    <div>Loading...</div>
  ) : (
    content
  );
};
export default customElseIf;
