import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';
import { it } from 'mocha';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  test('fetchProduct é uma função ?', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  test('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  test('fetch é chamado com o endpoint correto ao executar a função fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  test('O retorno da função fetchProduct com o argumento do produto "MLB1405519561" é uma estrutura de dados igual ao objeto produto', async () => {
    const expec = await fetchProduct('MLB1405519561');
    expect(expec).toEqual(product);
  })

  test('Ao chamar a função fetchProduct sem argumento, retorna um erro com a mensagem', async () => {
    await expect(fetchProduct()).rejects.toThrowError('ID não informado');
  });
});
