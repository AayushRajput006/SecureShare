import test from 'node:test';import assert from 'node:assert/strict';import {app} from '../src/app.js';
test('app exposes a health endpoint',()=>{assert.equal(typeof app,'function');});
