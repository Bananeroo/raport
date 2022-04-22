function ConditionalContentDisplay(props) {
  const { status } = props;

  return status === "failed" ? (
    <div>Nie udało się wczytać danych !!</div>
  ) : status === "loading" ? (
    <div>Loading...</div>
  ) : status === "success" ? (
    props.children
  ) : (
    ""
  );
}
export default ConditionalContentDisplay;
