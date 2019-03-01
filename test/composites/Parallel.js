import {stub, spy} from 'sinon';
import {assert} from 'chai';
import Parallel from '../../src/composites/Parallel';
import {FAILURE, SUCCESS, RUNNING} from '../../src/constants';

suite('Composite: Parallel', function() {
    var getNode = function(status) {
        var _execute = stub();
        _execute.returns(status);

        return {'_execute': _execute};
    }

    var getTick = function() {
        return {
            'tickNode': spy()
        };
    }

    test('Name', function() {
        assert.equal(new Parallel().name, 'Parallel');
    });

    test('Success', function() {
        var node1 = getNode(SUCCESS);
        var node2 = getNode(SUCCESS);
        var node3 = getNode(SUCCESS);

        var parallel = new Parallel({children:[node1, node2, node3]});
        var status = parallel.tick(getTick());

        assert.equal(status, SUCCESS);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
    });

    test('Failure', function() {
        var node1 = getNode(SUCCESS);
        var node2 = getNode(SUCCESS);
        var node3 = getNode(FAILURE);
        var node4 = getNode(SUCCESS);

        var parallel = new Parallel({children:[node1, node2, node3, node4]});
        var status = parallel.tick(getTick());

        assert.equal(status, FAILURE);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
        assert.isTrue(node4._execute.calledOnce);
    });

    test('Running', function() {
        var node1 = getNode(SUCCESS);
        var node2 = getNode(SUCCESS);
        var node3 = getNode(RUNNING);
        var node4 = getNode(SUCCESS);

        var parallel = new Parallel({children:[node1, node2, node3, node4]});
        var status = parallel.tick(getTick());

        assert.equal(status, RUNNING);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
        assert.isTrue(node4._execute.calledOnce);
    });
});
