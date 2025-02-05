import {formatCurrency} from '../../test/money.js';

describe('Tesst suite: formatCurrency',() => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95') ;
    });
});