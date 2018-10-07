import * as Chart from 'chart.js';
import CBollingerStocks from './CBollingerStocks';
import IChart from '../interfaces/IChart';

export default class CChart implements IChart {
	private _canvas: HTMLCanvasElement;
	private _ctx: CanvasRenderingContext2D;
	private _height: number = window.innerHeight;
	private _width: number = window.innerWidth;
	private _stocks: CBollingerStocks;
	private _selectedStock: string;
	
	/**
     * @desc sets up canvas and selectedStock
     * @param string companyName -  selected stock company name
    */
	constructor(selectedStock: string) {
		this._setupCanvas();
		this._selectedStock = selectedStock;
	}
	/**
     * @desc sets up canvas
	 * @returns void
    */
	private _setupCanvas(): void {
		this._canvas = <HTMLCanvasElement>document.getElementById('chart');
		this._canvas.width = this._width;
		this._canvas.height = this._height;
		this._ctx = this._canvas.getContext('2d');
	}
	/**
     * @desc fetches stock data and renders the chart
	 * @returns void
    */
	public render(): void {
		this._stocks = new CBollingerStocks(this._selectedStock);
		this._stocks.fetchStocksData().then(() => {
			new Chart(this._ctx, {
				type: 'line',
				data: {
				    datasets: [
					{
						label: 'Stock price',
						fill: false,
						data: this._stocks.getStocksChartData(),
						pointRadius: 0,
						borderColor: '#1a5ecc'
					},
					{
						label: 'Simple moving average',
						fill: false,
						data: this._stocks.getSMAData(),
						pointRadius: 0,
						borderColor: 'salmon'
					},
					{
						label: 'Upper band data',
						fill: false,
						data: this._stocks.getUpperBandData(),
						pointRadius: 0,
						borderColor: 'green'
					},
					{
						label: 'Lower band data',
						fill: false,
						data: this._stocks.getLowerBandData(),
						pointRadius: 0,
						borderColor: 'red'
					}
					
				]
				},
				options: {
				    responsive: false,
				    scales: {
					xAxes: [{
						type: 'time',
						time: {
						    unit: 'week',
						}
					    }]			 
				    }
				}
			});
		});
	}
}