import {IChartData, IStock} from '../interfaces/types';
export default interface IStocks {
    formatStockData(stocskDataSet: IStock[]): IChartData[];
    getRange(): number;
    getStocksData(): IStock[];
    getStocksChartData(): IChartData[];
    fetchStocksData() : Promise<void>;
}
