import * as styledComponents from "styled-components";
import { IDatePickerTheme, IRangeDatePickerTheme, styledThemes } from "./types";
export declare const defaultRangeTheme: IRangeDatePickerTheme;
export declare const defaultDatePickerTheme: IDatePickerTheme;
declare const styled: styledComponents.ThemedStyledInterface<styledThemes>, ThemeProvider: styledComponents.BaseThemeProviderComponent<styledThemes, styledThemes>, keyframes: (strings: TemplateStringsArray | styledComponents.CSSKeyframes, ...interpolations: styledComponents.SimpleInterpolation[]) => styledComponents.Keyframes;
export { ThemeProvider, keyframes };
export default styled;
