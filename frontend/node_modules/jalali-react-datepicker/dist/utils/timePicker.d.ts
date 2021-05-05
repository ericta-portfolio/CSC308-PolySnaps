/**
 * numberPosition functions
 * These functions find position X-axis and Y-axis from half of the clock width
 * Its start from 30 deg and each time this degree increase as much as 30 deg
 */
export declare function numberPositionX(idx: number, width?: number, padding?: number): number;
export declare function numberPositionY(idx: number, width?: number, padding?: number): number;
export declare const center: {
    x: number;
    y: number;
};
export declare const radianToDeg: (rad: any) => number;
export declare const calculateOffset: (elem: any) => {
    offsetX: any;
    offsetY: any;
};
export declare const getValue: (deg: number, delta: number, steps: any) => number;
/**
 * calculate the value from where the mouse clicked or tapped
 * step1: calculate deg from the center of the circle not (0, 0)
 * step1-1: calculate deg with atan2 but instead of using atan2 in this way (y, x) -
 * I used atan2(x, y) because atan2(y, x) get an angel from (0, 0) not the center of the circle
 * step-2: decrease atan2 by Math.PI because-
 * this function returns two degrees that one of them is valid and another isn't. like 90 deg and -90deg and -90deg should be 270
 * step3: delta: determine the distance of each place that is clicked by the user. calculating the distance between the center of the circle
 * step4: make value by division deg into the hour or minutes angles. in the hour is 30 deg and in minutes is 6 deg
 */
interface IGetAngelValues {
    value: number;
    delta: number;
}
export declare const getAngelValues: (e: React.MouseEvent | React.TouchEvent, steps?: number) => IGetAngelValues;
export declare const hours: number[];
export declare const hours24: number[];
export declare const minutes: number[];
export {};
