/**
 * @description 635 - OXML coef., 20 - 20th of a Point
 * @param val
 * @returns {{value: number, unit: string}}
 */
export default function (val = 0) {
    return {
        value: val / (635 * 20),
        unit: 'pt'
    };
};