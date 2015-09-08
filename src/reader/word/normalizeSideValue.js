const sides = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    start: 'start',
    right: 'right',
    end: 'end'
};

export default function (value) {
    let capitalizedValue = this.formatPropertyName(value, {capitalize: true});
    return sides[capitalizedValue] || capitalizedValue;
}