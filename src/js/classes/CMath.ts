/**
 * @class CMath
 * @classdesc Class/module containing relevant math methods
 */
export class CMath {
    /**
     * @desc Sums array value
     * @param number[] list - total values
     * @return number - total of values
    */
    public static TotalFromArray(list: number[]): number {
        return list.reduce((prevNum, currNum) => (prevNum + currNum));
    }
    /**
     * @desc Gets average of number
     * @param number numberSum - Sum of total numbers
     * @param number totalNumbers - Total numbers
     * @return number - Average
    */
    public static Mean(numberSum: number, totalNumbers: number): number {
        return numberSum / totalNumbers;
    }
    /**
     * @desc Sums array value
     * @param number[] - total values
     * @return number - total of values
    */
    public static MeanFromArray(list: number[]): number {
        return CMath.Mean(CMath.TotalFromArray(list), list.length)
    }
    /**
     * @desc Sums arguments
     * @param number[] args - list of values
     * @return number - sum of values
    */
    public static Sum(...args: number[]): number {
        return args.reduce((prevNum:number, currNum: number) => (prevNum + currNum));
    }
    /**
     * @desc Subtracts arguments
     * @param number[] args - list of values
     * @return number - subtraction result
    */
    public static Subtract(...args: number[]): number {
        return args.reduce((prevNum:number, currNum: number) => (prevNum - currNum));
    }
    /**
     * @desc Calculates variance and standard deviation from array
     * @param number[] - total values
     * @return number - deviation
    */
    public static StandardDeviationFromArray(list: number[]): number {
        const mean = CMath.MeanFromArray(list);
        const deviations = list.map((stockPrice) => (Math.pow(Math.abs(stockPrice - mean), 2)));
        const variance = CMath.TotalFromArray(deviations) / (deviations.length -1);
        const standardDeviation = Math.sqrt(variance);
        
        return standardDeviation;
    }
}