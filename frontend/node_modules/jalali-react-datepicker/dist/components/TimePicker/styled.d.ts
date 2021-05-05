export declare const Clock: import("styled-components").StyledComponent<"div", import("../../types").styledThemes, {}, never>;
export declare const MinuteWithAnimation: import("styled-components").StyledComponent<"div", import("../../types").styledThemes, {}, never>;
export interface INumbersProps {
    idx: number;
    clockHalfWidth?: number;
    numbersPadd?: number;
    top?: string;
    insideHour?: boolean;
    isSelectedNumber?: boolean;
}
export declare const Numbers: import("styled-components").StyledComponent<"span", import("../../types").styledThemes, INumbersProps, never>;
export interface IStyledHandProps {
    value: number;
    isInsideHour: boolean;
    isSelectingHour: boolean;
}
export declare const StyledHand: import("styled-components").StyledComponent<"div", import("../../types").styledThemes, IStyledHandProps, never>;
export declare const HandCircle: import("styled-components").StyledComponent<"div", import("../../types").styledThemes, {
    isSelectingHour: boolean;
}, never>;
