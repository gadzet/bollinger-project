import CChart from './classes/CChart';

class App {
	private _chart: CChart;

	constructor(chart: CChart) {
		this._chart = chart;
	}
	public setup(): void {
        this._chart.render();
    }
}

window.onload = () => {
    const $select: HTMLSelectElement = <HTMLSelectElement>document.getElementById('js-stock-select');
    let selectedStock: string  = $select.options[$select.selectedIndex].value;
	let app = new App(new CChart(selectedStock));
    app.setup();
    
    $select.addEventListener('change', (e)  => {
        selectedStock = (<HTMLInputElement>e.target).value;
        let app = new App(new CChart(selectedStock));
        app.setup();
    });
}