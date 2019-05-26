import {CurrencyEnum} from './currencyEnum';
export interface IRate {
    rate: number;
    date: string;
    from: CurrencyEnum;
    to: CurrencyEnum;
}