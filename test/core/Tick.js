import {assert} from 'chai';
import Tick from '../../src/core/Tick';
// store open children
// call debug

suite('Core: Tick', function() {
    test('Initialization', function() {
        var tick = new Tick();

        assert.equal(tick._nodeCount, 0);
        assert.deepEqual(tick._openNodes, {});
    });

    test('Updating tick info on enter', function() {
        var tick = new Tick();
        var node = {'id': 'node1'}

        tick._enterNode(node);
        assert.equal(tick._nodeCount, 1);
        assert.deepEqual(tick._openNodes, {'node1':node});
        assert.strictEqual(tick._openNodes['node1'], node);
    });

    test('Updating tick info on close', function() {
        var tick = new Tick();
        var node = {'id': 'node1'}

        tick._nodeCount = 1;
        tick._openNodes = {[node.id]:node};

        tick._closeNode(node);
        assert.equal(tick._nodeCount, 1);
        assert.deepEqual(tick._openNodes, {});
    });

    test.skip('Callbacks calling debug');
});
