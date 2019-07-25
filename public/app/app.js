import './utils/array-helpers.js';
import { log, timeoutPromise, delay, retry } from './utils/promise-helpers.js';
import { notasService as service } from './nota/service.js';
import { takeUntil, debounceTime, partialize, pipe } from './utils/operators-helpers.js';
import { EventEmitter } from './utils/event-emitter.js';

const operations = pipe(
    partialize(takeUntil, 3),
    partialize(debounceTime, 500)
);

const action = operations(() =>
    retry(3, 3000, () => timeoutPromise(200, service.sumItems('2143')))
        .then(total => EventEmitter.emit('itensTotalizados', total))
        .catch(log)
);

document
    .querySelector('#myButton')
    .onclick = action