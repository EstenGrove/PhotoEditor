import { saveFile } from "./utils_files";
import { hasFilter } from "./utils_processing";
import { isEmptyObj } from "./utils_types";

const canvasContext = {
	direction: "ltr",
	fillStyle: "",
	filter: "",
	font: "10px sans-serif",
	globalAlpha: 1,
	globalCompositionOperation: "source-over",
	imageSmoothingEnabled: true,
	imageSmoothingQuality: "low",
	lineCap: "butt",
	lineDashOffset: 0,
	lineJoin: "miter",
	lineWidth: 1,
	miterLimit: 10,
	shadowBlur: 0,
	shadowColor: "rgba(0, 0, 0, 0)",
	shadowOffsetX: 0,
	shadowOffsetY: 0,
	strokeStyle: "#000000",
	textAlign: "start",
	textBaseline: "alphabetic",
};

/**
 * Accounts for the pixel ration & density of the user's device & screen & fixes blur.
 * @param {HTMLCanvasElement} canvas - Target canvas element to 'setup'.
 */
const setupCanvas = (canvas) => {
	// Get the device pixel ratio, falling back to 1.
	const dpr = window.devicePixelRatio || 1;
	// Get the size of the canvas in CSS pixels.
	const rect = canvas.getBoundingClientRect();
	// Give the canvas pixel dimensions of their CSS
	// size * the device pixel ratio.
	canvas.width = rect.width * dpr;
	canvas.height = rect.height * dpr;
	const ctx = canvas.getContext("2d");
	// Scale all drawing operations by the dpr, so you
	// don't have to worry about the difference.
	ctx.scale(dpr, dpr);
	return ctx;
};

/**
 * Rotates an image on a canvas element.
 * @param {Number} deg - An angle to rotate in degrees
 * @param {HTMLImageElement} imgEl - An <img/> element reference.
 * @param {HTMLCanvasElement} canvasRef - A <canvas/> element reference.
 *
 * ✅ Currently Working Version!!
 */
const rotateCanvas = (deg, imgEl, canvasRef) => {
	const context = canvasRef.getContext("2d");
	const imgWidth = imgEl.offsetWidth;
	const imgHeight = imgEl.offsetHeight;
	canvasRef.width = 1200;
	canvasRef.height = 700;

	// JUST ADDED, MAYBE REMOVE
	// clear position & reset
	context.save();
	// rotate canvas source around circular axis (ie Math.PI)
	context.translate(imgWidth / 2, imgHeight / 2);
	// context.rotate(Math.PI / 2);
	context.rotate((deg * Math.PI) / 180);
	// redraw rotated img to canvas
	context.drawImage(imgEl, -(imgWidth / 2), -(imgHeight / 2));
	context.restore();
};

/**
 * @description - Converts canvas to blob, then triggers file download.
 * @param {HTMLCanvasElement} canvasEl - Target canvas element whose 'src' will be converted.
 * @param {String} filename - A filename w/ extension (ie 'MyFile.png')
 */
const saveImgFromCanvas = (canvasEl, filename = `MyImage.png`) => {
	return canvasEl.toBlob((blob) => saveFile(blob, filename));
};

/**
 * Converts canvas source to a dataURL via built-in canvas method.
 * @param {HTMLCanvasElement} canvasRef - Reference to canvas element.
 * @param {Object} options - Object settings for dataURL function
 * @param {String} options.mimeType - Target mimeType for dataURL.
 * @param {String} options.quality - Target quality for dataURL. Value: 0.0 - 1.0
 */
const getCanvasDataUrlAsJPEG = (canvasRef, options = {}) => {
	const { mimeType = "image/jpeg", quality = 1.0 } = options;

	return canvasRef.toDataURL(mimeType, quality);
};

/**
 * @description - Clone an '<img/>' source and draw onto a '<canvas/>' element.
 * @param {HTMLImageElement} sourceImg - An img element to be cloned to the canvas.
 * @param {HTMLCanvasElement} targetCanvas - The 'target' canvas to draw the image to.
 */
const cloneImgToCanvas = (sourceImg, targetCanvas) => {
	const context = targetCanvas.getContext("2d");
	// get image size
	const imgWidth = sourceImg.offsetWidth;
	const imgHeight = sourceImg.offsetHeight;
	// set canvas height to same size as image
	targetCanvas.width = imgWidth;
	targetCanvas.height = imgHeight;
	// draw image to canvas
	context.drawImage(sourceImg, 0, 0, imgWidth, imgWidth);
};

/**
 * @description - Creates a temp clone of the image file then converts it to a dataURL.
 * @param {File} fileSrc - A file blob, as uploaded from a input[type="file"]
 * @param {HTMLCanvasElement} canvasRef - A React 'ref' to a canvas element (ie 'ref.current').
 * @returns {FileBlob} - Returns an objectURL ready for use.
 */
const copyImgToCanvas = (fileSrc, canvasRef) => {
	const context = canvasRef.getContext("2d");
	const reader = new FileReader();
	// create temp img, read the img's file source & draw to canvas
	reader.onload = (e) => {
		const img = new Image();
		img.onload = () => {
			canvasRef.width = img.width;
			canvasRef.height = img.height;
			context.drawImage(img, 0, 0);
		};
		img.src = e.target.result;
	};
	// convert to dataURL
	return reader.readAsDataURL(fileSrc);
};

/**
 * Clears a canvas. Like a 'reset'
 * - NOTE: if no 'targetSize' is provided canvas will retain current dimensions.
 * @param {HTMLCanvasElement} canvasRef - Reference to a canvas.
 */
const clearCanvas = (canvasRef) => {
	const ctx = canvasRef.getContext("2d");
	const width = canvasRef.width;
	const height = canvasRef.height;
	ctx.clearRect(0, 0, width, height);
};

///////////////////////////////////////////////////////
/////////////////// UNTESTED UTILS ///////////////////
///////////////////////////////////////////////////////

// ctx.drawImage(imgEl, dx, dy)
// ctx.drawImage(imgEl, dx, dy, dWidth, dHeight)
// ctx.drawImage(imgEl, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

/**
 * Arguments of "drawImage":
 * - 'ctx.drawImage(imgEl, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)'
 */
const dimensions = {
	// source image
	sx: 0, // x-axis point (eg top-left)
	sy: 0, // y-axis point from top
	sWidth: 0, // width of source img
	sHeight: 0, // height of source img
	// destination canvas: where on the canvas and what size
	dx: 0,
	dy: 0,
	dWidth: 0,
	dHeight: 0,
};

/**
 * Crops an image via canvas with custom dimensions.
 * @param {HTMLImageElement} imgEl - A reference to an <img/> element.
 * @param {HTMLCanvasElement} canvasRef - A reference to a <canvas/> el.
 * @param {Object} cropDimensions - Object containing args for drawImage()
 * @property {Number} sx - The x-axis position from the source img.
 * @property {Number} sy - The y-axis position from the source img.
 * @property {Number} sWidth - Width of the source img.
 * @property {Number} sHeight - Height of the source img.
 * @property {Number} dx - The x-axis position for the destination canvas image.
 * @property {Number} dy - The y-axis position for the destination canvas image.
 * @property {Number} dWidth - Width of the destination canvas image.
 * @property {Number} dHeight - Height of the destination canvas image.
 * @property {Number} canvasWidth - Width of the surrounding canvas element.
 * @property {Number} canvasHeight - Height of the surrounding canvas element.
 * ✅ Currently Working Version!!
 */
const cropImgOnCanvas = (imgEl, canvasRef, cropDimensions = {}) => {
	const {
		sx,
		sy,
		sWidth,
		sHeight,
		dx,
		dy,
		dWidth,
		dHeight,
		canvasWidth,
		canvasHeight,
	} = cropDimensions;

	const ctx = canvasRef.getContext("2d");
	canvasRef.width = canvasWidth;
	canvasRef.height = canvasHeight;
	ctx.drawImage(
		imgEl, // source image
		sx, // source x-position (from left)
		sy, // source y-position (from top)
		sWidth, // source width
		sHeight, // source height
		dx, // destination x-position (from left)
		dy, // destination y-position (from top)
		dWidth, // final width
		dHeight // final height
	);
	ctx.restore();
};

const cropCanvasAsHidden = (canvasRef, cropDimensions = {}) => {
	const {
		sx,
		sy,
		sWidth,
		sHeight,
		dx,
		dy,
		dWidth,
		dHeight,
		canvasWidth,
		canvasHeight,
	} = cropDimensions;

	const ctx = canvasRef.getContext("2d");
	canvasRef.width = canvasWidth;
	canvasRef.height = canvasHeight;
	ctx.drawImage(
		canvasRef, // source image
		sx, // source x-position (from left)
		sy, // source y-position (from top)
		sWidth, // source width
		sHeight, // source height
		dx, // destination x-position (from left)
		dy, // destination y-position (from top)
		dWidth, // final width
		dHeight // final height
	);
	ctx.restore();
};

const ratios = {
	scaleX: 2,
	scaleY: 2,
};

const scaleImgOnCanvas = (imgEl, canvasRef, scaleRatios = { ...ratios }) => {
	const { scaleX, scaleY } = scaleRatios;

	const ctx = canvasRef.getContext("2d");
	const imgWidth = imgEl.offsetWidth;
	const imgHeight = imgEl.offsetHeight;
	canvasRef.width = imgWidth * scaleX;
	canvasRef.height = imgHeight * scaleY;
	ctx.scale(scaleX, scaleY);
	ctx.drawImage(imgEl, 0, 0);
};

const size = {
	width: 1200,
	height: 600,
};

const copyAndScaleToCanvas = (fileSrc, canvasRef) => {
	const context = canvasRef.getContext("2d");
	const reader = new FileReader();
	reader.onload = (e) => {
		const img = new Image();
		img.onload = () => {
			const imgWidth = img.width;
			const imgHeight = img.height;
			const targetWidth = imgWidth * 2;
			const targetHeight = imgHeight * 2;
			canvasRef.width = targetWidth;
			canvasRef.height = targetHeight;
			// draw image to scale
			context.scale(2, 2);
			context.drawImage(
				img,
				0,
				0,
				imgWidth,
				imgHeight,
				0,
				0,
				targetWidth,
				targetHeight
			);
			img.src = e.target.result;
		};
	};
	return reader.readAsDataURL(fileSrc);
};

/**
 * Copys a File instance to canvas w/ custom dimensions.
 * @param {Any} fileSrc - A file source, typically a File instance.
 * @param {HTMLCanvasElement} canvasRef - A ref to a canvas element.
 * @param {Object} targetSize - Contains target dimensions (eg 'width' and 'height')
 */
const copyImgToCanvas2 = (fileSrc, canvasRef, targetSize = { ...size }) => {
	const context = canvasRef.getContext("2d");
	const reader = new FileReader();
	// create temp img, read the img's file source & draw to canvas
	reader.onload = (e) => {
		const img = new Image();
		img.onload = () => {
			const { width, height } = targetSize;
			context.drawImage(
				img,
				0, // sx
				0, // sy
				img.width,
				img.height,
				0, // dx
				0, // dy
				width,
				height
			);
		};
		img.src = e.target.result;
	};
	// convert to dataURL
	return reader.readAsDataURL(fileSrc);
};

//////////////////////////////////////////////////////
////////////// MORE EXPERIMENTAL UTILS //////////////
//////////////////////////////////////////////////////

/**
 * Rotates an image on a canvas element.
 * @param {Number} deg - An angle to rotate in degrees
 * @param {HTMLImageElement} imgEl - An <img/> element reference.
 * @param {HTMLCanvasElement} canvasRef - A <canvas/> element reference.
 *
 * ✅ Currently Working Version!!
 * - Note: the 'dx' and 'dy' should change everytime rotation
 */
const rotateCanvas2 = (deg, imgEl, canvasRef) => {
	const context = canvasRef.getContext("2d");
	const imgWidth = imgEl.offsetWidth;
	const imgHeight = imgEl.offsetHeight;

	const width = 1200;
	const height = 700;

	canvasRef.width = width;
	canvasRef.height = height;

	// JUST ADDED, MAYBE REMOVE
	// clear position & reset
	context.save();
	// rotate canvas source around circular axis (ie Math.PI)
	context.translate(width / 2, height / 2);
	// context.rotate(Math.PI / 2);
	context.rotate((deg * Math.PI) / 180);
	// redraw rotated img to canvas
	context.drawImage(
		imgEl, // img el
		-(width / 2),
		-(height / 2),
		width,
		height
	);
	context.restore();
};

const filterMap = {
	blur: "(15px)",
	contrast: "(200%)",
	brightness: "(300%)",
	grayscale: "(100%)",
	"hue-rotate": "(180deg)",
	invert: "(100%)",
	saturate: "(100%)",
	sepia: "(100%)",
	"drop-shadow": "(16px 16px 20px green)",
};

/**
 * @description - Creates a targeted RegExp to match a canvas filter within a DOM string.
 * @param {String} - A string canvas filter (eg. 'blur', 'contrast' etc)
 * @returns {RegExp} - Returns created RegExp to match/replace the target filter.
 *
 * Pattern-to-Match: '<filter>(XXX%|XXXdeg|XXXpx)<excess-space>'
 * - Ex. 'blur(100%) '
 * - Ex. 'hue-rotate(180deg) '
 */
const getFilterRegex = (filter) => {
	switch (filter) {
		case "blur": {
			return /(blur\([a-z0-9%]{1,}\)\s)/gm;
		}
		case "contrast": {
			return /(contrast\([a-z0-9%]{1,}\)\s)/gm;
		}
		case "brightness": {
			return /(brightness\([a-z0-9%]{1,}\)\s)/gm;
		}
		case "grayscale": {
			return /(grayscale\([a-z0-9%]{1,}\)\s)/gm;
		}
		case "hue-rotate": {
			return /(hue-rotate\([a-z0-9%]{1,}\)\s)/gm;
		}
		case "invert": {
			return /(invert\([a-z0-9%]{1,}\)\s)/gm;
		}
		case "saturate": {
			return /(saturate\([a-z0-9%]{1,}\)\s)/gm;
		}
		case "sepia": {
			return /(sepia\([a-z0-9%]{1,}\)\s)/gm;
		}
		case "drop-shadow": {
			return /(drop-shadow\([a-z0-9%]{1,}\)\s)/gm;
		}
		default:
			throw new Error(`❌ Ooops! Invalid filter type:`, filter);
	}
};

// removes a filter(by name) from canvas filters (eg 'ctx.filter')
const removeFilter = (filterToRemove, currentFilters) => {
	const filterReg = getFilterRegex(filterToRemove);
	const match = currentFilters.match(filterReg);

	if (match?.[0]) {
		// removes target filter if already exists...
		// and removes excess space(s) if filter is in middle of several filters
		// ...eg. 'filter1(xx) filter2(xx) filter3(xx)'
		const purged = currentFilters.replace(filterReg, "");
		console.log(`Updated(purged):`, purged);
		return purged;
	} else {
		console.log(`Updated(clean):`, currentFilters);
		return currentFilters;
	}
};

// generates 'ctx.filter' set from 'imgSettings'
const generateFilters = (filters, filterMap = {}) => {
	return filters.reduce((all, filter) => {
		const setting = `${filter}${filterMap[filter]}`;
		all += ` ${setting}`;
		return all;
	}, "");
};

const addFilterToCanvas = (imgEl, canvasRef, options = {}) => {
	const { filter, filterVal } = options;
	const ctx = canvasRef.getContext("2d");
	const currentFilters = ctx.filter;
	const width = canvasRef.width;
	const height = canvasRef.height;

	if (hasFilter(filter, ctx)) {
		const newFilters = removeFilter(filter, currentFilters);
		ctx.filter = newFilters;
		return ctx.drawImage(imgEl, 0, 0, width, height);
	}

	switch (filter) {
		// in px or 0-10
		case "blur": {
			console.log(`Blur is being processed...`, filterVal + "px");
			ctx.filter = `blur(15px)`;
			return ctx.drawImage(imgEl, 0, 0, width, height);
		}
		case "contrast": {
			console.log(`Contrast is being processed...`, filterVal + "%");
			// ctx.filter = `contrast(${filterVal}%);`;
			ctx.filter = `contrast(200%)`;
			return ctx.drawImage(imgEl, 0, 0, width, height);
		}
		case "brightness": {
			console.log(`Brightness is being processed...`, filterVal + "%");
			// ctx.filter = `brightness(${filterVal}%)`;
			ctx.filter = `brightness(300%)`;
			return ctx.drawImage(imgEl, 0, 0, width, height);
		}
		case "grayscale": {
			console.log(`Grayscale is being processed...`, filterVal + "%");
			// ctx.filter = `grayscale(${filterVal}%)`;
			ctx.filter = `grayscale(100%)`;
			return ctx.drawImage(imgEl, 0, 0, width, height);
		}
		case "hue-rotate": {
			console.log(`Hue-Rotate is being processed...`, filterVal + "deg");
			// ctx.filter = `hue-rotate(${filterVal}deg)`;
			ctx.filter = `hue-rotate(180deg)`;
			return ctx.drawImage(imgEl, 0, 0, width, height);
		}
		case "invert": {
			console.log(`Invert is being processed...`, filterVal + "%");
			// ctx.filter = `invert(${filterVal}%)`;
			ctx.filter = `invert(100%)`;
			return ctx.drawImage(imgEl, 0, 0, width, height);
		}
		case "saturate": {
			console.log(`Saturate is being processed...`, filterVal + "%");
			// ctx.filter = `saturate(${filterVal}%)`;
			ctx.filter = `saturate(100%)`;
			return ctx.drawImage(imgEl, 0, 0, width, height);
		}
		case "sepia": {
			console.log(`Sepia is being processed...`, filterVal + "%");
			// ctx.filter = `sepia(${filterVal}%)`;
			ctx.filter = `sepia(100%)`;
			return ctx.drawImage(imgEl, 0, 0, width, height);
		}
		case "drop-shadow": {
			console.log(`Drop-Shadow is being processed...`, filterVal + "%");
			ctx.filter = `drop-shadow(16px 16px 20px green)`;
			return ctx.drawImage(imgEl, 0, 0, width, height);
		}

		default:
			return (ctx.filter = "none");
	}
};

/**
 * Zooms/scales an image on a canvas by specific values.
 * NOTE:
 * - "ZOOM-IN": to 'zoom-in' the scale MUST be greater than 1.0
 * - "ZOOM-OUT": to 'zoom-out' the scale MUST be less than 1.0
 * @param {HTMLImageElement} imgEl - Reference <img/> element, used as mirror.
 * @param {HTMLCanvasElement} canvasRef - Reference to target <canvas/> element.
 * @param {Object} scales - A 'settings' object with 'scaleX' and 'scaleY' values.
 */
const zoomImgOnCanvas = (imgEl, canvasRef, scales = {}) => {
	const { scaleX, scaleY } = scales;
	const ctx = canvasRef.getContext("2d");
	const canWidth = canvasRef.width;
	const canHeight = canvasRef.height;
	ctx.clearRect(0, 0, canWidth, canHeight);
	ctx.scale(scaleX, scaleY);
	ctx.drawImage(imgEl, 0, 0, canWidth, canHeight);
	ctx.restore();
};

// returns canvas pixels from target area or entire canvas
const getPixelData = (canvasRef, targetArea = {}) => {
	// set defaults if values are undefined
	const {
		x = 0,
		y = 0,
		width = canvasRef.width,
		height = canvasRef.height,
	} = targetArea;
	const ctx = canvasRef.getContext("2d");
	const pixels = ctx.getImageData(x, y, width, height);
	return pixels;
};

// gets a single pixel's data
const getPixel = (canvasRef, coords = {}) => {
	const { x, y } = coords;
	const ctx = canvasRef.getContext("2d");
	const pixel = ctx.getImageData(x, y, 1, 1);
	console.log("pixel:", pixel);
	console.log("pixel.data", pixel.data);
	return pixel;
};

const getPixelColor = (pixelData) => {
	const [zero, one, two, three] = pixelData.data;
	const rgba = `rgba(${zero}, ${one}, ${two}, ${three / 255})`;
	return rgba;
};

// font = '<size> <font-family>'
const drawTextToCanvas = (canvasRef, options = {}) => {
	const { text, font = "30px Open Sans", tx, ty } = options;
	const ctx = canvasRef.getContext("2d");
	const imgEl = new Image();
	ctx.drawImage(imgEl, 10, 10);
	ctx.font = font;
	ctx.fillText(text, tx, ty);
};

export {
	setupCanvas,
	rotateCanvas,
	saveImgFromCanvas,
	cloneImgToCanvas,
	copyImgToCanvas,
	clearCanvas,
	getCanvasDataUrlAsJPEG,
	// experimental utils
	cropImgOnCanvas,
	cropCanvasAsHidden,
	scaleImgOnCanvas,
	copyImgToCanvas2,
	copyAndScaleToCanvas,
	rotateCanvas2,
	addFilterToCanvas,
	drawTextToCanvas,
	// filters
	generateFilters,
	getPixelData,
	getPixel,
	getPixelColor,
	// zoom in/out image
	zoomImgOnCanvas,
};

export { dimensions, filterMap };

// filter utils
export { getFilterRegex, removeFilter };
