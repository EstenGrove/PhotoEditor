import { isEmptyVal } from "./utils_types";

const hexToHSL = (H) => {
	// Convert hex to RGB first
	let r = 0,
		g = 0,
		b = 0;
	if (H.length === 4) {
		r = "0x" + H[1] + H[1];
		g = "0x" + H[2] + H[2];
		b = "0x" + H[3] + H[3];
	} else if (H.length === 7) {
		r = "0x" + H[1] + H[2];
		g = "0x" + H[3] + H[4];
		b = "0x" + H[5] + H[6];
	}
	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	if (delta === 0) h = 0;
	else if (cmax === r) h = ((g - b) / delta) % 6;
	else if (cmax === g) h = (b - r) / delta + 2;
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0) h += 360;

	l = (cmax + cmin) / 2;
	s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return "hsl(" + h + "," + s + "%," + l + "%)";
};

const hslToHex = (h, s, l) => {
	h /= 360;
	s /= 100;
	l /= 100;
	let r, g, b;
	if (s === 0) {
		r = g = b = l; // achromatic
	} else {
		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	const toHex = (x) => {
		const hex = Math.round(x * 255).toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	};
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// COLOR CONVERTERS //
const rgbToHex = ({ r, g, b }) => {
	r = Number(r);
	g = Number(g);
	b = Number(b);

	return ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
};

// returns string color (eg. 'rgb(x, x, x)')
const hexToRGB = (hex) => {
	let alpha = false;
	let h = hex.slice(hex.startsWith("#") ? 1 : 0);

	if (h.length === 3) h = [...h].map((x) => x + x).join("");
	else if (h.length === 8) alpha = true;
	h = parseInt(h, 16);
	return (
		"rgb" +
		(alpha ? "a" : "") +
		"(" +
		(h >>> (alpha ? 24 : 16)) +
		", " +
		((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
		", " +
		((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
		(alpha ? `, ${h & 0x000000ff}` : "") +
		")"
	);
};

/**
 * Extracts just the 'R', 'G' and 'B' values from an rgb string.
 * @param {String} rgb - A string RGB color (eg. 'rgb(254, 68, 192)')
 * @returns {Object} - Returns an object w/ rgb as values.
 */
const extractRGB = (rgb) => {
	if (isEmptyVal(rgb) || !rgb) return { r: "0", g: "0", b: "0" };
	const reg = /^(rgb\((?<r>[0-9]{1,3}), (?<g>[0-9]{1,3}), (?<b>[0-9]{1,3}))\)/gm;
	const matches = reg.exec(rgb);
	return matches?.groups;
};
/**
 * Removes the '#' from a hex color code string.
 * @param {String} hex - A string hex color (eg. '#e84855')
 */
const removeHexHash = (hex) => {
	return hex.slice("#")[1];
};
/**
 * Removes the hash(#) in a hex color code.
 * @param {String} colorCode - A hex color code to be converted.
 */
const removeHex = (colorCode) => {
	if (isEmptyVal(colorCode)) return "";
	const hex = /^(#)/;
	return colorCode.replace(hex, "");
};

// capitalizes each letter in a string
const capitalize = (str) => {
	return str.toUpperCase();
};
const capitalizeFirst = (str) => {
	const [first, ...rest] = str;
	const cap = capitalize(first);
	const merged = rest.join("");
	return `${cap}${merged}`;
};

// CANVAS FILTERS //

// matches a given regex pattern
const matchesPattern = (val, pattern) => {
	const newPattern = new RegExp(pattern);
	const isMatch = newPattern.test(val);
	return isMatch;
};

// checks if a filter is already applied to a canvas
const hasFilter = (filter, context) => {
	const allFilters = context.filter;
	const filterReg = new RegExp(filter);

	const alreadyExists = matchesPattern(allFilters, filterReg);
	console.log(`Already Exists:`, alreadyExists);
	return alreadyExists;
};

export { removeHex, removeHexHash, capitalize, capitalizeFirst };
export {
	// hex to XXXX
	hexToHSL,
	hexToRGB,
	// rgb to XXXX
	rgbToHex,
	extractRGB,
	// hsl to XXXX
	hslToHex,
};

export { hasFilter, matchesPattern };
