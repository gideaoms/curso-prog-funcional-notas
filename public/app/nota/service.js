import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, pipe } from '../utils/operators-helpers.js';
import { Maybe } from '../utils/maybe.js';

const API = 'http://localhost:3000/notas';

const getItemsFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
const filterItemByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.codigo === code));
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((total, item) => total + item.valor, 0));

export const notasService = {
    listAll() {
        return fetch(API)
            .then(handleStatus)
            .then(notas => Maybe.of(notas))
            .catch(err => {
                console.error(err);
                return Promise.reject('Não foi possível obter as notas fiscais');
            });
    },
    sumItems(code) {
        const filterItems = partialize(filterItemByCode, code);
        const sumItems = pipe(getItemsFromNotas, filterItems, sumItemsValue);
        return this.listAll().then(sumItems).then(result => result.getOrElse(0));
    }
};