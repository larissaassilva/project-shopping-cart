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

const secProduc = document.querySelector('.products');

const addCarregando = async () => {
  const newEle = document.createElement('span');
  newEle.className = 'loading';
  newEle.innerText = 'carregando...';
  secProduc.appendChild(newEle);
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  return response;
};

const removeEle = async () => {
  const remove = document.querySelector('.loading');
  secProduc.removeChild(remove);
};

Promise.all([
  addCarregando(),
]).then(() => {
  removeEle();
});
