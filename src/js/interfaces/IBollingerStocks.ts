import {IChartData, IStock} from '../interfaces/types';

export default interface IBollingerStocks {
    getUpperBandData(): IChartData[];
    getLowerBandData(): IChartData[];
    getSMAData(): IChartData[];
}