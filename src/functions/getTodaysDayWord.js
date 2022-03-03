const getTodaysDayWord = () => {
  const event = new Date();

  const options = {
    weekday: "long",
  };

  const dateWords = event.toLocaleDateString("es-ES", options);

  return dateWords;
};

export default getTodaysDayWord;
