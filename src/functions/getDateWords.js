const getDateWords = ({ date }) => {
  const event = new Date(date);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateWords = event.toLocaleDateString("es-ES", options);

  return dateWords;
};

export default getDateWords;
