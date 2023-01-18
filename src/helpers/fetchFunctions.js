export const fetchProduct = async (ProductID) => {
  if (!ProductID) {
    throw Error('ID não informado');
  }
  const response = await fetch(`https://api.mercadolibre.com/items/${ProductID}`);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (QUERY) => {
  if (QUERY === undefined) {
    throw Error('Termo de busca não informado');
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);
  const data = await response.json();
  return data.results;
};
