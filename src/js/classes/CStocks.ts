import {IChartData, IStock} from '../interfaces/types';
import IStocks from '../interfaces/IStocks';

/**
 * @class CStocks
 * @classdesc Class stocks
 * @implements IStocks
 */
export default class CStocks implements IStocks {
	private _companyName : string;
	private _stocksDataPromise : Promise<[]> ;
	private _stocksData : IStock[] ;
	private _range: number = 20; // could be setted if dynamic
    /**
     * @desc sets up stock data promise
     * @param string companyName -  selected stock company name
    */
	constructor(companyName: string = 'Oslo_STL') {
		this._companyName = companyName;
		this._stocksDataPromise = this._setStocksDataContract();
	}
	/**
     * @desc Formats stock data into chart data
     * @param IStock[] chart data - from backend 
     * @return IChartData[] - stock data converted into chart data
    */
	public formatStockData(stocskDataSet: IStock[]): IChartData[] {
		return stocskDataSet.map((item: IStock) => {
			return {
				x: (new Date(item.date)),
				y: item.last
			};
		});
	}
	/**
     * @desc Getter function
     * @return number - day range
    */
	public getRange(): number {
		return this._range;
	}
	/**
     * @desc Getter function
     * @return IStock[] - stocks data
    */
	public getStocksData(): IStock[] {
		return this._stocksData;
	}
	/**
     * @desc Getter function
     * @return IChartData[] - formated stocks data
    */
	public getStocksChartData(): IChartData[] {
		return this.formatStockData(this._stocksData);
	}
	/**
     * @desc Setter function, sets stocks data in original format
     * @param IStock[] stocksData - stock data from backend
     * @return void
    */
	private _setStocksData(stocksData: IStock[]): void {
		this._stocksData = stocksData;
	}
	/**
     * @desc Setter function, sets stocks promise
     * @return Promise<[]> - stocks data promise
    */
	private async _setStocksDataContract(): Promise<[]> {
		return await import(`../data/${this._companyName}.json`);
	}
	public fetchStocksData() : Promise<void> {
		return this._stocksDataPromise
			   	.then((dataSet: IStock[]) => {
				   this._setStocksData(dataSet);
			   	}).catch(() => {
					throw new Error('404 Dataset not found');
				});
   }
}
