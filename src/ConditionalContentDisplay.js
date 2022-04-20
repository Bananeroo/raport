function ConditionalContentDisplay(props) {
  const { error, isLoaded, content } = props;
  return error ? (
    <div>Error: {error.message}</div>
  ) : !isLoaded ? (
    <div>Loading...</div>
  ) : (
    content
  );
}
export default ConditionalContentDisplay;
