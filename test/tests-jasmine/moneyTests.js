import {formatCurrency} from '../../script/util/money.js';

describe('Test suite: formatCurrency',() => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95') ;
        console.log('hello');
    });
});