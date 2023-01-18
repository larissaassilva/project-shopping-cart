import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const addChild = async () => {
  const fetchList = await fetchProductsList('computador');
  return fetchList.forEach((element) => {
    const secProduc = document.querySelector('.products');
    secProduc.appendChild(createProductElement(element));
  });
};

addChild();
