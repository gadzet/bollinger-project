import CStocks from './CStocks';
import {CMath} from './CMath';
import {IChartData, IStock} from '../interfaces/types';
import IBollingerStocks from '../interfaces/IBollingerStocks';

/**
 * @class CBollingerStocks
 * @classdesc Class representing bollinger stocks methodology
 * @extends CStocks
 * @implements IBollingerStocks
 */
export default class CBollingerStocks extends CStocks implements IBollingerStocks {
    private _simpleMovingAverageData: IChartData[];
	private _upperBandData : IChartData[];
    private _lowerBandData : IChartData[];
    /**
     * @desc sets the band data
     * @param string companyName -  selected stock company name
    */
    constructor(companyName: string) {
        super(companyName);
        // this could probably be implemented in a smarter way
        this.fetchStocksData().then(() => {
            this._setUpperBandData(this.getStocksData());
            this._setSMAData(this._getSimpleMovingAverage(this.getStocksData()));
		    this._setLowerBandData(this.getStocksData());
        });
	}
	/**
     * @desc Calculates Upper and Lower Bollinger chart data from stock data
     * @param IStock[] stocksData - list of stocks with date and price
     * @return number - sum of values
    */
    private _calculateBollingerBandData(stocksData: IStock[], accumulator: Function): IStock[] {
		return this._mapStocks(stocksData, this._calculateBollingerBand.bind(null, accumulator));
	}
	/**
     * @desc Calculates single bollinger band
     * @param Function accumulator - acumulates the values 
	 * @param number[] stockInterval - list of in the specified range
     * @return number - bollinger upper/lower band value
    */
	private _calculateBollingerBand(accumulator: Function ,stockInterval: number[]): number {
		return accumulator(CMath.MeanFromArray(stockInterval), (CMath.StandardDeviationFromArray(stockInterval) * 2));
	}
	/**
     * @desc Setter function that sets simple moving average data
     * @param IStock[] simpleMovingAverageData - list of sma data
     * @return void
    */
	private _setSMAData(simpleMovingAverageData: IStock[]): void {
		this._simpleMovingAverageData = this.formatStockData(simpleMovingAverageData);
	}
	/**
     * @desc Setter function that sets bollinger upper chart data
     * @param IStock[] stocksData - list of stocks with date and price
     * @return void
    */
	private _setUpperBandData(stocksData: IStock[]): void {
		this._upperBandData = this.formatStockData(this._calculateBollingerBandData(stocksData, CMath.Sum));
	}
	/**
     * @desc Setter function that sets bollinger lower chart data
     * @param IStock[] stocksData - list of stocks with date and price
     * @return void
    */
	private _setLowerBandData(stocksData: IStock[]): void {
		this._lowerBandData = this.formatStockData(this._calculateBollingerBandData(stocksData, CMath.Subtract));
	}

	private _mapStocks(stocksData: IStock[], callback: any) {
		return stocksData.map((stockData: IStock, index): IStock => {
			const stockInterval: number[] =  stocksData.slice(index, (this.getRange()+index))
				.map((stock: IStock) => (stock.last));
			return {...stockData, last: callback(stockInterval)};
		});	
	} 

	/**
	 * @desc Calculates SMA by cutting array into range chunks and calulating the average of it
	 * @param IStock[] simpleMovingAverageData - list of sma data
	 * @return void
	*/
	private _getSimpleMovingAverage(stocksData: IStock[]): IStock[] {
		return this._mapStocks(stocksData, CMath.MeanFromArray)
	}
	/**
     * @desc Getter function
     * @return IChartData[] - bollinger upper band data
    */
	public getUpperBandData(): IChartData[] {
		return this._upperBandData;
	}
	/**
     * @desc Getter function
     * @return IChartData[] - bollinger lower band data
    */
	public getLowerBandData(): IChartData[] {
		return this._lowerBandData;
	}
	/**
     * @desc Getter function
     * @return IChartData[] - bollinger middle band data
    */
	public getSMAData(): IChartData[] {
		return this._simpleMovingAverageData;
	}
}