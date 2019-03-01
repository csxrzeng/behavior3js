import Composite from '../core/Composite';
import { Counter, SUCCESS, STATUS_COUNT_TEMP, ERROR, RUNNING, FAILURE } from '../constants';

/**
 * MemParallel is similar to Parallel node, but when a child returns a
 * `RUNNING` state, its index is recorded and in the next tick the
 * MemPriority call the child recorded directly, without calling previous
 * children again.
 *
 * @module b3
 * @class MemParallel
 * @extends Composite
 **/

export default class MemParallel extends Composite {

    /**
     * Creates an instance of MemParallel.
     * @param {Object} params 
     * @param {Array} params.children 
     * @memberof MemParallel
     */
    constructor({ children = [] } = {}) {
        super({
            name: 'MemParallel',
            title: '记忆平行',
            children
        });
    }

    /**
     * Open method.
     * @method open
     * @param {b3.Tick} tick A tick instance.
     **/
    open(tick) {
        var counter = tick.blackboard.get('statusCounter', tick.tree.id, this.id);
        if (!counter) {
            counter = new Counter(SUCCESS, FAILURE, RUNNING, ERROR);
            tick.blackboard.set('statusCounter', counter, tick.tree.id, this.id);
        }
        else {
            counter.reset();
        }
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        var counter = tick.blackboard.get('statusCounter', tick.tree.id, this.id);
        for (var i = 0; i < this.children.length; i++) {
            var node = this.children[i];
            if (!tick.blackboard.get("isOpen", tick.tree.id, node.id)) {
                var status = node._execute(tick);
                counter[status]++;
            }
        }
        if (counter[RUNNING] > 0) return RUNNING;
        if (counter[ERROR] > 0) return ERROR;
        if (counter[FAILURE] > 0) return FAILURE;
        return SUCCESS;
    }
};
