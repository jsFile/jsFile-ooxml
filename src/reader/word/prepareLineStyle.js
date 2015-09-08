export default function (style) {
    if (!style || style === 'none' || style === 'nil') {
        style = 'none';
    } else if (style.includes('dash')) {
        style = 'dashed';
    } else if (style.includes('dot')) {
        style = 'dotted';
    } else if (style.includes('double')) {
        style = 'double';
    } else if (style.includes('inset')) {
        style = 'inset';
    } else if (style.includes('outset')) {
        style = 'outset';
    } else {
        style = 'solid';
    }

    return style;
}