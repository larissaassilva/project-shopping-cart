import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

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

const mensErro = () => {
  const elementError = document.createElement('span');
  elementError.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  elementError.className = 'error';
  secProduc.appendChild(elementError);
};

Promise.all([
  addCarregando(),
]).then(() => {
  removeEle();
}).catch(() => {
  mensErro();
});

const resultLocal = getSavedCartIDs();

const local = () => {
  resultLocal.forEach(async (id) => {
    const products = await fetchProduct(id);
    const result = createCartProductElement(products);
    const ol = document.querySelector('.cart__products');
    ol.appendChild(result);
  });
};

window.onload = () => local();
