export const VERSION = '0.2.2';
export const SUCCESS = 1;
export const FAILURE = 2;
export const RUNNING = 3;
export const ERROR = 4;
export const COMPOSITE = 'composite';
export const DECORATOR = 'decorator';
export const ACTION = 'action';
export const CONDITION = 'condition';

export class Counter {
    /**
     * 
     * @param  {...any} keys keys
     */
    constructor(...keys) {
        this._keys = keys;
        this.reset();
    }

    reset() {
        for (let i in this._keys) {
            this[this._keys[i]] = 0;
        }
        return this;
    }
};

export let STATUS_COUNT_TEMP = new Counter(SUCCESS, FAILURE, RUNNING, ERROR);