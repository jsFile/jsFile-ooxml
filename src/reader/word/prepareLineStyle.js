export default function (style) {
    if (!style || style === 'none' || style === 'nil') {
        style = 'none';
    } else if (style.indexOf('dash') >= 0) {
        style = 'dashed';
    } else if (style.indexOf('dot') >= 0) {
        style = 'dotted';
    } else if (style.indexOf('double') >= 0) {
        style = 'double';
    } else if (style.indexOf('inset') >= 0) {
        style = 'inset';
    } else if (style.indexOf('outset') >= 0) {
        style = 'outset';
    } else {
        style = 'solid';
    }

    return style;
}