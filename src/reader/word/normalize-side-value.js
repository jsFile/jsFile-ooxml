import JsFile from 'JsFile';
const {formatPropertyName} = JsFile.Engine;
const sides = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    start: 'start',
    right: 'right',
    end: 'end'
};

export default function normalizeSideValue (value) {
    const capitalizedValue = formatPropertyName(value, {capitalize: true});
    return sides[capitalizedValue] || capitalizedValue;
}