import Composite from '../core/Composite';
import { SUCCESS, STATUS_COUNT_TEMP, ERROR, RUNNING, FAILURE } from '../constants';

/**
 * The Parallel node ticks its children sequentially no matter what
 * the child returns. If all children return the success state, the
 * Parallel also returns `SUCCESS`.
 * @module b3
 * @class Parallel
 * @extends Composite
 **/

export default class Parallel extends Composite {

    /**
     * Creates an instance of Parallel.
     * @param {Object} params 
     * @param {Array} params.children 
     * @memberof Parallel
     */
    constructor({ children = [] } = {}) {
        super({
            name: 'Parallel',
            children
        });
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        let counter = STATUS_COUNT_TEMP.reset();
        for (var i = 0; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);
            counter[status]++;
        }
        if (counter[RUNNING] > 0) return RUNNING;
        if (counter[ERROR] > 0) return ERROR;
        if (counter[FAILURE] > 0) return FAILURE;
        return SUCCESS;
    }
};
