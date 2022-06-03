const getCardsArrayExpDate = (json, date) => {
  const datePattern = /^(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])\-\d{4}$/;
  const isValidDate = datePattern.test(date.trim());
  if (!isValidDate) {
    return null;
  }

  const normalizeDate = (rawDate) =>
    new Date(rawDate.split('-').reverse().join('-'));

  const clientInfo = JSON.parse(json);
  const cards = clientInfo.CardInfo;

  const filteredCards = cards.filter(
    (card) => normalizeDate(card.ExpDate) > normalizeDate(date),
  );

  if (filteredCards.length === 0) {
    return null;
  }

  return filteredCards.map((card) => {
    const cardNumber = card.CardNumber;

    return cardNumber.substring(cardNumber.length - 4);
  });
};
